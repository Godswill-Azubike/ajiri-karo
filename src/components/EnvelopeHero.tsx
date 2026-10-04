"use client";

import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { wedding } from "@/config/wedding";
import { burst, sideCannons } from "./confetti";
import { Flower } from "./Flowers";
import { scrollToY } from "./SmoothScroll";

export const OPEN_EVENT = "wedding:open";

function InvitationCard() {
  return (
    <div className="paper relative w-[min(90vw,430px)] rounded-2xl p-2 shadow-[0_30px_80px_-20px_rgba(122,42,58,0.45)]">
      <div className="relative rounded-xl border-2 border-magenta/70 px-5 py-7 text-center sm:px-8 sm:py-9">
        <div className="pointer-events-none absolute inset-1.5 rounded-lg border border-magenta/40" />
        <Flower size={44} className="absolute -left-4 -top-4" />
        <Flower size={34} petals={5} color="#d9c9f2" inner="#efe6fb" className="absolute -right-3 -top-3" />
        <Flower size={34} petals={8} color="#8e2a5a" className="absolute -bottom-3 -left-3" />
        <Flower size={44} className="absolute -bottom-4 -right-4" />

        <p className="text-[0.65rem] tracking-[0.35em] text-mauve uppercase sm:text-xs">Save the date</p>
        <h1 className="mt-3 font-script leading-none font-bold">
          <span className="shimmer-text block py-1 text-6xl sm:text-7xl">{wedding.bride}</span>
          <span className="block text-3xl font-semibold text-mauve">&amp;</span>
          <span className="shimmer-text block py-1 text-6xl sm:text-7xl">{wedding.groom}</span>
        </h1>
        <p className="mx-auto mt-4 max-w-xs font-serif text-sm italic text-plum/80 sm:text-base">{wedding.inviteLine}</p>
        <div className="mx-auto my-5 flex items-center justify-center gap-3 text-magenta">
          <span className="h-px w-12 bg-magenta/60" />♥<span className="h-px w-12 bg-magenta/60" />
        </div>
        <p className="font-serif text-lg font-bold text-plum sm:text-2xl">{wedding.displayDate}</p>
        <p className="mt-1 text-sm font-semibold tracking-widest text-magenta uppercase">
          {wedding.displayTime} · {wedding.city}
        </p>
      </div>
    </div>
  );
}

function StaticHero() {
  return (
    <section className="flex min-h-[100svh] items-center justify-center px-4 py-16">
      <InvitationCard />
    </section>
  );
}

export default function EnvelopeHero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const [opened, setOpened] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  // Spring-smoothed copy: a quick flick on a phone glides through the animation instead of jumping.
  // (Being JS-driven also opts out of native ScrollTimeline acceleration, which desyncs from Lenis.)
  const p = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.6, restDelta: 0.0005 });

  // Intro text + hint
  const introOpacity = useTransform(p, [0, 0.08], [1, 0]);
  const introY = useTransform(p, [0, 0.08], [0, -40]);

  // Wax seal pops off
  const sealScale = useTransform(p, [0.05, 0.1, 0.16], [1, 1.3, 0]);
  const sealRotate = useTransform(p, [0.05, 0.16], [0, 90]);
  const sealOpacity = useTransform(p, [0.12, 0.16], [1, 0]);

  // Flap opens (and drops behind the letter once past vertical)
  const flapRotate = useTransform(p, [0.12, 0.3], [0, 180]);
  const flapZ = useTransform(p, (v) => (v < 0.21 ? 30 : 0));

  // Letter rises out
  const letterY = useTransform(p, [0.28, 0.45], ["0%", "-85%"]);
  const letterOpacity = useTransform(p, [0.47, 0.52], [1, 0]);

  // Envelope sinks away
  const groupY = useTransform(p, [0.45, 0.62], ["0vh", "55vh"]);
  const groupScale = useTransform(p, [0.45, 0.62], [1, 0.8]);
  const groupOpacity = useTransform(p, [0.52, 0.62], [1, 0]);

  // Invitation card unfolds
  const cardOpacity = useTransform(p, [0.46, 0.56], [0, 1]);
  const cardScale = useTransform(p, [0.46, 0.6, 1], [0.45, 1, 0.94]);
  const cardY = useTransform(p, [0.46, 0.6], ["-18vh", "0vh"]);
  const cardRotateX = useTransform(p, [0.46, 0.6], [55, 0]);
  const cardPointer = useTransform(p, (v) => (v > 0.5 ? "auto" : "none"));

  const detailsHint = useTransform(p, [0.62, 0.7], [0, 1]);

  useMotionValueEvent(p, "change", (v) => {
    if (!opened && v > 0.5) {
      setOpened(true);
      burst({ x: 0.5, y: 0.45 });
      sideCannons(1800);
      window.dispatchEvent(new Event(OPEN_EVENT));
    }
  });

  const openWithTap = () => {
    // A tap is a user gesture, so music is allowed to start now.
    window.dispatchEvent(new Event(OPEN_EVENT));
    const el = ref.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    scrollToY(top + (el.offsetHeight - window.innerHeight) * 0.64);
  };

  if (reduced) return <StaticHero />;

  return (
    <section ref={ref} className="relative h-[330vh] sm:h-[380vh]">
      <div className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden" style={{ perspective: 1400 }}>
        {/* Intro heading */}
        <motion.div style={{ opacity: introOpacity, y: introY }} className="absolute top-[9svh] z-10 px-4 text-center">
          <p className="text-[0.62rem] tracking-[0.28em] text-mauve uppercase sm:text-xs sm:tracking-[0.45em]">You are invited to the wedding of</p>
          <p className="shimmer-text mt-1 py-1 font-script text-5xl font-bold sm:text-7xl">
            {wedding.bride} &amp; {wedding.groom}
          </p>
          <p className="mt-1 font-serif text-sm font-semibold tracking-[0.2em] text-plum/80 italic">{wedding.displayDate}</p>
        </motion.div>

        {/* Envelope */}
        <motion.div style={{ y: groupY, scale: groupScale, opacity: groupOpacity }} className="relative z-20">
          <motion.div
            initial={{ y: 80, opacity: 0, rotate: -6 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 50, damping: 12, delay: 0.2 }}
          >
            <motion.div
              animate={{ y: [0, -10, 0], rotate: [0, 1, 0, -1, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="relative aspect-[3/2] w-[min(88vw,460px)]"
              // Perspective here (not preserve-3d): Safari ignores z-index inside preserve-3d and would
              // draw the letter over the front pocket. The flap still gets a 3D swing from this perspective.
              style={{ perspective: 900 }}
            >
              {/* back / inside */}
              <div className="absolute inset-0 rounded-md bg-gradient-to-b from-[#a3307e] to-[#c46a9f] shadow-[0_30px_60px_-15px_rgba(122,42,58,0.5)]" />

              {/* flap */}
              <motion.div
                className="absolute inset-x-0 top-0 h-[58%] origin-top"
                style={{ rotateX: flapRotate, zIndex: flapZ }}
              >
                <svg viewBox="0 0 300 116" preserveAspectRatio="none" className="h-full w-full drop-shadow-md">
                  <defs>
                    <linearGradient id="flap" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0" stopColor="#e7b3d1" />
                      <stop offset="1" stopColor="#dc9cc2" />
                    </linearGradient>
                  </defs>
                  <path d="M0 0 H300 L158 112 Q150 118 142 112 Z" fill="url(#flap)" stroke="#cf8ab5" strokeWidth="1" />
                </svg>
              </motion.div>

              {/* letter peeking out */}
              <div className="absolute inset-x-[5%] bottom-[4%] z-10 flex h-[300%] items-end overflow-hidden">
                <motion.div
                  style={{ y: letterY, opacity: letterOpacity }}
                  className="paper flex h-[30%] w-full flex-col items-center justify-start rounded-md border border-magenta/40 pt-[6%] shadow-md"
                >
                  <p className="font-script text-3xl font-semibold text-mauve sm:text-4xl">You&apos;re Invited</p>
                  <div className="mt-1 flex items-center gap-2 text-magenta">
                    <span className="h-px w-10 bg-magenta/60" />♥<span className="h-px w-10 bg-magenta/60" />
                  </div>
                  <p className="mt-1 font-script text-2xl font-bold text-magenta">{wedding.initials}</p>
                </motion.div>
              </div>

              {/* front pocket */}
              <svg viewBox="0 0 300 200" preserveAspectRatio="none" className="absolute inset-0 z-20 h-full w-full">
                <path d="M0 0 L150 112 L0 200 Z" fill="#e4aacb" />
                <path d="M300 0 L150 112 L300 200 Z" fill="#e4aacb" />
                <path d="M0 200 L150 100 L300 200 Z" fill="#ecc0da" />
                <path d="M0 200 L150 100 L300 200" fill="none" stroke="#d699bd" strokeWidth="1" />
              </svg>

              {/* wax seal */}
              <motion.button
                type="button"
                onClick={openWithTap}
                aria-label="Open the invitation"
                style={{ scale: sealScale, rotate: sealRotate, opacity: sealOpacity }}
                className="absolute left-1/2 top-[50%] z-40 -ml-9 -mt-9 h-18 w-18 cursor-pointer"
                whileHover={{ scale: 1.08 }}
              >
                <motion.span
                  className="absolute inset-0 rounded-full bg-mauve/40"
                  animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
                  transition={{ duration: 1.6, repeat: Infinity }}
                />
                <svg viewBox="0 0 100 100" className="relative h-full w-full drop-shadow-lg">
                  <defs>
                    <radialGradient id="wax" cx="0.35" cy="0.3" r="0.8">
                      <stop offset="0" stopColor="#a3307e" />
                      <stop offset="1" stopColor="#6c1d45" />
                    </radialGradient>
                  </defs>
                  <path
                    d="M50 2 C60 6 66 2 74 8 C80 14 90 14 92 24 C96 32 98 40 96 50 C98 60 94 68 90 76 C86 86 78 88 70 94 C62 98 56 96 50 98 C42 98 34 98 28 92 C20 88 12 84 8 74 C4 66 2 58 4 50 C2 40 6 32 10 24 C14 14 22 12 30 6 C36 2 42 4 50 2Z"
                    fill="url(#wax)"
                  />
                  <circle cx="50" cy="50" r="32" fill="none" stroke="#b9a2e3" strokeWidth="1.5" opacity="0.8" />
                  <text x="50" y="60" textAnchor="middle" fontSize="24" fontWeight="700" fill="#f2c6dd" style={{ fontFamily: "var(--font-dancing)" }}>
                    {wedding.initials.replace(/\s/g, "")}
                  </text>
                </svg>
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Invitation card */}
        <motion.div
          style={{ opacity: cardOpacity, scale: cardScale, y: cardY, rotateX: cardRotateX, pointerEvents: cardPointer }}
          className="absolute z-30"
        >
          <InvitationCard />
        </motion.div>

        {/* Hints */}
        <motion.button
          type="button"
          onClick={openWithTap}
          style={{ opacity: introOpacity }}
          className="absolute bottom-[7svh] z-10 flex cursor-pointer flex-col items-center text-plum/80"
        >
          <span className="text-xs tracking-[0.3em] uppercase">Scroll or tap the seal</span>
          <motion.span animate={{ y: [0, 8, 0] }} transition={{ duration: 1.4, repeat: Infinity }} className="mt-2 text-2xl">
            ⌄
          </motion.span>
        </motion.button>
        <motion.div style={{ opacity: detailsHint }} className="absolute bottom-[3svh] z-10 flex flex-col items-center text-plum/70">
          <span className="text-[0.65rem] tracking-[0.3em] uppercase">Keep scrolling for details</span>
          <motion.span animate={{ y: [0, 6, 0] }} transition={{ duration: 1.4, repeat: Infinity }} className="text-xl">
            ⌄
          </motion.span>
        </motion.div>
      </div>
    </section>
  );
}
