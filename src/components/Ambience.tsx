"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Fixed background glows in the colours of the day, plus a thin scroll-progress line. */
export default function Ambience() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <>
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
        <div
          className="glow -top-[20vh] -left-[30vw] h-[70vh] w-[90vw]"
          style={{ background: "radial-gradient(closest-side, rgba(217,140,184,0.35), transparent)" }}
        />
        <div
          className="glow top-[30vh] -right-[35vw] h-[75vh] w-[95vw]"
          style={{ background: "radial-gradient(closest-side, rgba(185,162,227,0.38), transparent)", animationDelay: "-9s" }}
        />
        <div
          className="glow -bottom-[25vh] left-[5vw] h-[60vh] w-[80vw]"
          style={{ background: "radial-gradient(closest-side, rgba(163,48,126,0.14), transparent)", animationDelay: "-17s" }}
        />
      </div>
      <motion.div
        className="fixed inset-x-0 top-0 z-50 h-[3px] origin-left bg-gradient-to-r from-lilac via-magenta to-plum"
        style={{ scaleX: progress }}
        aria-hidden
      />
    </>
  );
}
