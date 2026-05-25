"use client";

import { commandMenuItems } from "@/constants/hero";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { AnimatePresence, motion } from "motion/react";
import { Command, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";

function CommandMenuOverlay({
  open,
  onClose,
  reduced,
}: {
  open: boolean;
  onClose: () => void;
  reduced: boolean;
}) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Light dim — keep page visible behind menu */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[200] bg-black/45 backdrop-blur-[3px]"
            onClick={onClose}
            aria-hidden
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command menu"
            initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: -12 }}
            animate={reduced ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: -8 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="fixed left-1/2 top-[max(5rem,10vh)] z-[201] w-[min(92vw,400px)] -translate-x-1/2 overflow-hidden rounded-2xl border border-border/80 bg-zinc-900 shadow-2xl ring-1 ring-white/10"
          >
            <div className="flex items-center justify-between border-b border-border/80 bg-zinc-900/95 px-4 py-3">
              <span className="font-mono text-xs text-zinc-400">Navigate</span>
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg p-1 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white"
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </div>
            <ul className="bg-zinc-900 p-2">
              {commandMenuItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    download={item.href.endsWith(".pdf") ? true : undefined}
                    onClick={onClose}
                    className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm text-zinc-100 transition-colors hover:bg-accent/15 hover:text-white"
                  >
                    <span>{item.label}</span>
                    <span className="font-mono text-xs text-zinc-500">
                      {item.shortcut}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <p className="border-t border-border/60 px-4 py-2.5 text-center font-mono text-[10px] text-zinc-500">
              Esc to close · ⌘K toggle
            </p>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export function HeroCommandMenu() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const reduced = usePrefersReducedMotion();

  const toggle = useCallback(() => setOpen((o) => !o), []);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        toggle();
      }
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [toggle, close]);

  return (
    <>
      <button
        type="button"
        onClick={toggle}
        className="relative z-10 flex items-center gap-2 rounded-full border border-border/80 bg-card/60 px-3 py-1.5 text-xs text-muted backdrop-blur-md transition-colors hover:border-accent/40 hover:text-foreground"
        aria-expanded={open}
        aria-label="Open command menu"
      >
        <Command size={14} className="text-accent" />
        <span className="hidden sm:inline">Quick nav</span>
        <kbd className="hidden rounded border border-border bg-background/80 px-1.5 py-0.5 font-mono text-[10px] sm:inline">
          ⌘K
        </kbd>
      </button>

      {mounted &&
        createPortal(
          <CommandMenuOverlay
            key="command-menu"
            open={open}
            onClose={close}
            reduced={reduced}
          />,
          document.body
        )}
    </>
  );
}
