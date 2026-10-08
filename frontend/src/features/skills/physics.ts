// A tiny 2D circle-physics world: gravity, rolling, ball-to-ball collisions,
// a cursor that shoves balls aside, and drag-to-throw. No dependencies.

export type Body = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  angle: number;
  /** Has fallen inside the box (the ceiling only applies after this). */
  entered: boolean;
};

export type Pointer = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  active: boolean;
  /** Index of the body being dragged, or -1. */
  grabbed: number;
};

const GRAVITY = 2200; // px/s²
const RESTITUTION = 0.45; // bounciness of collisions
const WALL_BOUNCE = 0.5;
const FLOOR_FRICTION = 0.985; // per step, while touching the floor
const AIR_DRAG = 0.9995;
const POINTER_RADIUS = 28;
const POINTER_PUSH = 0.9;
const MAX_SPEED = 3200;
const SELF_RIGHTING = 4; // pulls labels back upright, like a weighted toy

export const STEP = 1 / 120;

export function createBodies(radii: number[], width: number, height: number): Body[] {
  return radii.map((r, i) => ({
    x: r + Math.random() * Math.max(1, width - 2 * r),
    // Stagger above the box so they rain in instead of exploding apart.
    y: -r - i * (height / radii.length) * 0.6 - Math.random() * 40,
    vx: (Math.random() - 0.5) * 200,
    vy: 0,
    r,
    angle: Math.random() * 0.6 - 0.3,
    entered: false,
  }));
}

function clampSpeed(b: Body) {
  const speed = Math.hypot(b.vx, b.vy);
  if (speed > MAX_SPEED) {
    b.vx = (b.vx / speed) * MAX_SPEED;
    b.vy = (b.vy / speed) * MAX_SPEED;
  }
}

export function step(bodies: Body[], pointer: Pointer, width: number, height: number, dt = STEP) {
  // 1. Integrate forces.
  for (let i = 0; i < bodies.length; i++) {
    const b = bodies[i];

    if (i === pointer.grabbed) {
      // Spring the grabbed ball toward the cursor; its velocity becomes the throw.
      b.vx = ((pointer.x - b.x) / dt) * 0.35;
      b.vy = ((pointer.y - b.y) / dt) * 0.35;
    } else {
      b.vy += GRAVITY * dt;
      b.vx *= AIR_DRAG;
      b.vy *= AIR_DRAG;
    }

    clampSpeed(b);
    b.x += b.vx * dt;
    b.y += b.vy * dt;
  }

  // 2. Cursor shoves balls out of its way, transferring its own motion.
  if (pointer.active && pointer.grabbed === -1) {
    for (const b of bodies) {
      const dx = b.x - pointer.x;
      const dy = b.y - pointer.y;
      const dist = Math.hypot(dx, dy) || 0.001;
      const overlap = b.r + POINTER_RADIUS - dist;
      if (overlap <= 0) continue;

      const nx = dx / dist;
      const ny = dy / dist;
      b.x += nx * overlap;
      b.y += ny * overlap;
      const push = Math.max(0, pointer.vx * nx + pointer.vy * ny);
      b.vx += nx * (push * POINTER_PUSH + 60);
      b.vy += ny * (push * POINTER_PUSH + 60);
    }
  }

  // 3. Ball-to-ball collisions (mass ∝ area).
  for (let i = 0; i < bodies.length; i++) {
    for (let j = i + 1; j < bodies.length; j++) {
      const a = bodies[i];
      const b = bodies[j];
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const minDist = a.r + b.r;
      const distSq = dx * dx + dy * dy;
      if (distSq >= minDist * minDist) continue;

      const dist = Math.sqrt(distSq) || 0.001;
      const nx = dx / dist;
      const ny = dy / dist;
      const ma = i === pointer.grabbed ? Infinity : a.r * a.r;
      const mb = j === pointer.grabbed ? Infinity : b.r * b.r;
      const invA = ma === Infinity ? 0 : 1 / ma;
      const invB = mb === Infinity ? 0 : 1 / mb;
      const invSum = invA + invB || 1;

      // Separate the overlap in proportion to inverse mass.
      const overlap = minDist - dist;
      a.x -= nx * overlap * (invA / invSum);
      a.y -= ny * overlap * (invA / invSum);
      b.x += nx * overlap * (invB / invSum);
      b.y += ny * overlap * (invB / invSum);

      // Exchange momentum along the contact normal.
      const approach = (b.vx - a.vx) * nx + (b.vy - a.vy) * ny;
      if (approach >= 0) continue;
      const impulse = (-(1 + RESTITUTION) * approach) / invSum;
      a.vx -= impulse * invA * nx;
      a.vy -= impulse * invA * ny;
      b.vx += impulse * invB * nx;
      b.vy += impulse * invB * ny;
    }
  }

  // 4. Walls, floor, ceiling — and roll the label with the ball.
  for (const b of bodies) {
    if (b.x < b.r) {
      b.x = b.r;
      b.vx = Math.abs(b.vx) * WALL_BOUNCE;
    } else if (b.x > width - b.r) {
      b.x = width - b.r;
      b.vx = -Math.abs(b.vx) * WALL_BOUNCE;
    }

    if (b.y > height - b.r) {
      b.y = height - b.r;
      b.vy = -Math.abs(b.vy) * WALL_BOUNCE;
      if (Math.abs(b.vy) < 40) b.vy = 0;
      b.vx *= FLOOR_FRICTION;
    }

    if (b.y > b.r) b.entered = true;
    if (b.entered && b.y < b.r) {
      b.y = b.r;
      b.vy = Math.abs(b.vy) * WALL_BOUNCE;
    }

    // Roll with horizontal motion, then settle upright so labels stay readable.
    b.angle += (b.vx * dt) / b.r - Math.sin(b.angle) * SELF_RIGHTING * dt;
  }
}

/** Throws every ball upward — the "shake" button. */
export function shake(bodies: Body[]) {
  for (const b of bodies) {
    b.vx += (Math.random() - 0.5) * 1400;
    b.vy -= 900 + Math.random() * 900;
  }
}

export function hitTest(bodies: Body[], x: number, y: number) {
  for (let i = bodies.length - 1; i >= 0; i--) {
    const b = bodies[i];
    if ((b.x - x) ** 2 + (b.y - y) ** 2 <= b.r * b.r) return i;
  }
  return -1;
}
