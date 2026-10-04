"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useAnimate, useInView, useReducedMotion } from "framer-motion";
import { hearts, sparkle } from "./confetti";

const A = { cx: 124, cy: 112 }; // plain band
const B = { cx: 176, cy: 112 }; // engagement ring
const R = 40;

function Band({ cx, cy, gradient }: { cx: number; cy: number; gradient: string }) {
  return (
    <>
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={`url(#${gradient})`} strokeWidth="9" />
      <circle cx={cx} cy={cy} r={R + 3.2} fill="none" stroke="#fff" strokeOpacity="0.55" strokeWidth="0.9" />
      <circle cx={cx} cy={cy} r={R - 3.4} fill="none" stroke="#7a3f2f" strokeOpacity="0.25" strokeWidth="0.9" />
    </>
  );
}

const droplets = Array.from({ length: 14 }, (_, i) => {
  const angle = (i / 14) * Math.PI * 2 + (i % 2 ? 0.15 : 0);
  const dist = 60 + (i % 3) * 18;
  return { x: Math.cos(angle) * dist, y: Math.sin(angle) * dist, r: 2 + (i % 3), color: ["#b9a2e3", "#d98cb8", "#a3307e", "#f3c9b0"][i % 4] };
});

/** Two wedding rings fly in, clink together, interlock and splash sparkles. Tap to replay. */
export default function RingsClink() {
  const [scope, animate] = useAnimate();
  const box = useRef<HTMLDivElement>(null);
  const inView = useInView(box, { once: false, amount: 0.6 });
  const reduced = useReducedMotion();
  const [impact, setImpact] = useState(0);
  const running = useRef(false);

  const play = useCallback(async () => {
    if (running.current || !scope.current) return;
    running.current = true;
    const flyIn = { duration: 1.05, ease: [0.55, 0, 0.85, 0.35] as const };
    await Promise.all([
      animate(".ring-a", { x: [-230, 4], rotate: [-70, 0], opacity: [0, 1] }, flyIn),
      animate(".ring-b", { x: [230, -4], rotate: [70, 0], opacity: [0, 1] }, flyIn),
    ]);

    // Impact: ripple, droplets, sparkles, and a springy little recoil.
    setImpact((n) => n + 1);
    const rect = box.current?.getBoundingClientRect();
    if (rect) {
      const origin = { x: (rect.left + rect.width / 2) / window.innerWidth, y: (rect.top + rect.height * 0.55) / window.innerHeight };
      sparkle(origin);
      setTimeout(() => hearts(origin), 250);
    }
    await Promise.all([
      animate(".ring-a", { x: [4, -10, 0] }, { duration: 0.6, ease: "easeOut" }),
      animate(".ring-b", { x: [-4, 10, 0] }, { duration: 0.6, ease: "easeOut" }),
      animate(".shock", { scale: [0.2, 2.4], opacity: [0.7, 0] }, { duration: 1.1, ease: "easeOut" }),
      animate(".glint", { scale: [0, 1.3, 1], opacity: [0, 1, 1] }, { duration: 0.6, delay: 0.2 }),
    ]);
    running.current = false;
  }, [animate, scope]);

  useEffect(() => {
    if (!inView) {
      // Off-screen: hide the rings so they fly in fresh next time they come into view.
      if (!running.current && scope.current) animate(".ring-a, .ring-b, .glint", { opacity: 0 }, { duration: 0 });
      return;
    }
    if (reduced) {
      animate(".ring-a, .ring-b, .glint", { opacity: 1 }, { duration: 0 });
      return;
    }
    play();
  }, [inView, reduced, play, animate, scope]);

  return (
    <section className="relative px-5 pt-6 pb-10 text-center">
      <motion.p
        className="font-script text-[2.2rem] font-semibold text-mauve sm:text-5xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        Two hearts, one forever
      </motion.p>

      <div ref={box} className="relative mx-auto mt-2 w-[min(88vw,380px)]">
        <button type="button" onClick={play} aria-label="Replay the rings" className="block w-full cursor-pointer">
          <motion.svg
            ref={scope}
            viewBox="0 0 300 200"
            className="w-full overflow-visible"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <defs>
              <linearGradient id="rosegold" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#fbe3d2" />
                <stop offset="0.3" stopColor="#d9a183" />
                <stop offset="0.55" stopColor="#f6d0bb" />
                <stop offset="0.8" stopColor="#b97a5d" />
                <stop offset="1" stopColor="#f3c9b0" />
              </linearGradient>
              <linearGradient id="rosegold2" x1="1" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#fbe3d2" />
                <stop offset="0.35" stopColor="#c98d6f" />
                <stop offset="0.6" stopColor="#f8d9c6" />
                <stop offset="1" stopColor="#b5765a" />
              </linearGradient>
              <linearGradient id="gem" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#ffffff" />
                <stop offset="0.5" stopColor="#e6dcf7" />
                <stop offset="1" stopColor="#b9a2e3" />
              </linearGradient>
              <clipPath id="ring-a-top" clipPathUnits="userSpaceOnUse">
                <rect x={A.cx - 60} y={A.cy - 60} width="120" height="60" />
              </clipPath>
            </defs>

            {/* impact ripple */}
            <circle className="shock" cx="150" cy={A.cy} r="30" fill="none" stroke="#d98cb8" strokeWidth="2" opacity="0" />

            {/* ring A, ring B, then A's top half again on top so the rings look linked */}
            <g className="ring-a" opacity="0">
              <Band {...A} gradient="rosegold" />
            </g>
            <g className="ring-b" opacity="0">
              <Band {...B} gradient="rosegold2" />
              <path d={`M${B.cx - 9} ${B.cy - R - 4} L${B.cx} ${B.cy - R - 18} L${B.cx + 9} ${B.cy - R - 4} L${B.cx} ${B.cy - R + 6}Z`} fill="url(#gem)" stroke="#a58fd6" strokeWidth="0.8" />
              <path d={`M${B.cx - 9} ${B.cy - R - 4} H${B.cx + 9} M${B.cx} ${B.cy - R - 18} V${B.cy - R + 6}`} stroke="#fff" strokeWidth="0.7" opacity="0.8" />
              <g className="glint" opacity="0" style={{ transformOrigin: `${B.cx + 10}px ${B.cy - R - 18}px` }}>
                <path d={`M${B.cx + 10} ${B.cy - R - 30} L${B.cx + 12} ${B.cy - R - 20} L${B.cx + 22} ${B.cy - R - 18} L${B.cx + 12} ${B.cy - R - 16} L${B.cx + 10} ${B.cy - R - 6} L${B.cx + 8} ${B.cy - R - 16} L${B.cx - 2} ${B.cy - R - 18} L${B.cx + 8} ${B.cy - R - 20}Z`} fill="#fff">
                  <animate attributeName="opacity" values="1;0.3;1" dur="1.8s" repeatCount="indefinite" />
                </path>
              </g>
            </g>
            <g className="ring-a" opacity="0">
              <g clipPath="url(#ring-a-top)">
                <Band {...A} gradient="rosegold" />
              </g>
            </g>

            {/* splash droplets, re-created on every impact */}
            <g key={impact} transform={`translate(150 ${A.cy})`}>
              {impact > 0 &&
                droplets.map((d, i) => (
                  <motion.circle
                    key={i}
                    r={d.r}
                    fill={d.color}
                    initial={{ cx: 0, cy: 0, opacity: 1, scale: 1 }}
                    animate={{ cx: d.x, cy: d.y, opacity: 0, scale: 0.4 }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  />
                ))}
            </g>
          </motion.svg>
        </button>
      </div>
      <p className="text-[0.65rem] tracking-[0.35em] text-plum/50 uppercase">Tap the rings</p>
    </section>
  );
}
