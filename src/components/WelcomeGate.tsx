"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type Lenis from "lenis";
import { wedding } from "@/config/wedding";
import { OPEN_EVENT } from "./EnvelopeHero";
import { Flower } from "./Flowers";

/**
 * Full-screen cover shown when the site loads. Browsers only allow sound after the visitor taps,
 * so this one tap ("Open Invitation") is what starts the music right away.
 */
export default function WelcomeGate() {
  const [open, setOpen] = useState(true);

  // Keep the page still behind the cover.
  useEffect(() => {
    if (!open) return;
    const lenis = (window as unknown as { lenis?: Lenis }).lenis;
    lenis?.stop();
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      (window as unknown as { lenis?: Lenis }).lenis?.start();
      document.documentElement.style.overflow = prev;
    };
  }, [open]);

  const enter = () => {
    // Dispatched synchronously inside the tap, so the music player may start with sound.
    window.dispatchEvent(new Event(OPEN_EVENT));
    setOpen(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="gate"
          role="dialog"
          aria-label="Open the invitation"
          onClick={enter}
          className="fixed inset-0 z-[70] flex cursor-pointer flex-col items-center justify-center overflow-hidden px-6 text-center"
          style={{ background: "radial-gradient(ellipse at 50% 40%, #8e2a5a 0%, #6c1d45 45%, #3d0f27 100%)" }}
          exit={{ opacity: 0, scale: 1.08, filter: "blur(10px)" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* soft glows */}
          <div className="pointer-events-none absolute -top-1/4 -left-1/4 h-[70vh] w-[70vh] rounded-full bg-[radial-gradient(closest-side,rgba(217,140,184,0.35),transparent)]" />
          <div className="pointer-events-none absolute -right-1/4 -bottom-1/4 h-[70vh] w-[70vh] rounded-full bg-[radial-gradient(closest-side,rgba(185,162,227,0.3),transparent)]" />

          {/* slowly turning flowers */}
          {[
            { cls: "-top-8 -left-8", size: 150, color: "#d98cb8", inner: "#f5d3e6", dur: 40 },
            { cls: "top-16 left-24 hidden sm:block", size: 70, color: "#d9c9f2", inner: "#efe6fb", dur: 30 },
            { cls: "-right-10 -bottom-10", size: 170, color: "#d98cb8", inner: "#f5d3e6", dur: 46 },
            { cls: "right-28 bottom-20 hidden sm:block", size: 80, color: "#b9a2e3", inner: "#efe6fb", dur: 34 },
            { cls: "bottom-24 -left-6", size: 70, color: "#d9c9f2", inner: "#efe6fb", dur: 36 },
            { cls: "top-24 -right-4", size: 64, color: "#f2c6dd", inner: "#fff", dur: 32 },
          ].map((f, i) => (
            <motion.div
              key={i}
              className={`pointer-events-none absolute opacity-80 ${f.cls}`}
              initial={{ scale: 0, rotate: -40 }}
              animate={{ scale: 1, rotate: 320 }}
              transition={{ scale: { duration: 1.4, delay: 0.2 + i * 0.1, ease: [0.22, 1, 0.36, 1] }, rotate: { duration: f.dur, repeat: Infinity, ease: "linear" } }}
            >
              <Flower size={f.size} color={f.color} inner={f.inner} />
            </motion.div>
          ))}

          <motion.div
            className="relative z-10 flex flex-col items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-[0.62rem] font-semibold tracking-[0.26em] text-lilac uppercase sm:text-xs sm:tracking-[0.4em]">You are invited to the wedding of</p>
            <h1 className="mt-3 font-script text-6xl font-bold text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.25)] sm:text-8xl">
              {wedding.bride} <span className="text-blush">&amp;</span> {wedding.groom}
            </h1>
            <div className="my-5 flex items-center gap-3 text-blush/80">
              <span className="h-px w-12 bg-current" />
              <span>♥</span>
              <span className="h-px w-12 bg-current" />
            </div>
            <p className="font-serif text-lg font-semibold text-white/90 italic sm:text-xl">{wedding.displayDate}</p>
            <p className="mt-1 text-xs font-semibold tracking-[0.3em] text-blush uppercase">{wedding.city}</p>

            <motion.button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                enter();
              }}
              className="relative mt-10 flex cursor-pointer items-center gap-3 rounded-full bg-white px-8 py-4 font-semibold tracking-wide text-plum shadow-[0_15px_40px_-10px_rgba(0,0,0,0.5)]"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span
                className="absolute inset-0 rounded-full ring-2 ring-white/70"
                animate={{ scale: [1, 1.25], opacity: [0.8, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
              />
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="M3 7l9 6 9-6" />
              </svg>
              Open Invitation
            </motion.button>
            <p className="mt-5 flex items-center gap-2 text-[0.7rem] tracking-[0.2em] text-white/60 uppercase">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
                <path d="M9 18V6l11-2v12" stroke="currentColor" strokeWidth="1.5" fill="none" />
                <circle cx="6.5" cy="18" r="2.5" />
                <circle cx="17.5" cy="16" r="2.5" />
              </svg>
              Best enjoyed with sound on
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
