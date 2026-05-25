import type { Transition, Variants } from "motion/react";

export const sectionSpring: Transition = {
  type: "spring",
  stiffness: 140,
  damping: 24,
  mass: 0.9,
};

export const staggerReveal: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

export const revealUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: sectionSpring,
  },
};

export const revealScale: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: sectionSpring,
  },
};

export const floatY: Variants = {
  initial: { y: 0 },
  animate: {
    y: [-6, 6, -6],
    transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
  },
};
