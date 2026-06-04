"use client";

import { rotatingRoles } from "@/constants/hero";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

export function HeroRotatingRole() {
  const reduced = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % rotatingRoles.length);
    }, 2800);
    return () => clearInterval(id);
  }, [reduced]);

  const role = rotatingRoles[index];

  if (reduced) {
    return (
      <span className="font-medium text-accent">{rotatingRoles[0]}</span>
    );
  }

  return (
    <span className="relative inline-block min-w-[14rem] align-baseline sm:min-w-[16rem]">
      <AnimatePresence mode="wait">
        <motion.span
          key={role}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block font-medium text-accent"
        >
          {role}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
