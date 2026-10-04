"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { wedding } from "@/config/wedding";
import { burst } from "./confetti";
import SectionTitle from "./SectionTitle";
import { FlowerCorner } from "./Flowers";

function diff(target: number) {
  const ms = Math.max(0, target - Date.now());
  return {
    Days: Math.floor(ms / 86_400_000),
    Hours: Math.floor(ms / 3_600_000) % 24,
    Minutes: Math.floor(ms / 60_000) % 60,
    Seconds: Math.floor(ms / 1000) % 60,
  };
}

function Tile({ label, value }: { label: string; value: number }) {
  const text = String(value).padStart(2, "0");
  return (
    <motion.div
      variants={{ hidden: { opacity: 0, y: 40, rotate: -8 }, show: { opacity: 1, y: 0, rotate: 0 } }}
      className="flex flex-col items-center"
    >
      <div className="relative flex h-20 w-[4.5rem] items-center justify-center overflow-hidden rounded-2xl bg-white/80 shadow-lg ring-2 ring-gold/40 backdrop-blur sm:h-28 sm:w-28">
        <div className="absolute inset-x-0 top-1/2 h-px bg-blush" />
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={text}
            initial={{ y: "-100%", opacity: 0, rotateX: 90 }}
            animate={{ y: "0%", opacity: 1, rotateX: 0 }}
            exit={{ y: "100%", opacity: 0, rotateX: -90 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="font-serif text-3xl font-bold text-rose sm:text-5xl"
          >
            {text}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="mt-2 text-xs tracking-[0.25em] text-wine/80 uppercase">{label}</span>
    </motion.div>
  );
}

export default function Countdown() {
  const target = new Date(wedding.date).getTime();
  const [time, setTime] = useState<ReturnType<typeof diff> | null>(null);

  useEffect(() => {
    setTime(diff(target));
    const id = setInterval(() => setTime(diff(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const t = time ?? { Days: 0, Hours: 0, Minutes: 0, Seconds: 0 };
  const isToday = time !== null && Object.values(time).every((v) => v === 0);

  return (
    <section className="relative overflow-hidden px-4 py-24">
      <FlowerCorner position="tl" />
      <FlowerCorner position="br" />
      <SectionTitle kicker="Counting down" title="Until We Say I Do" />
      <motion.div
        className="relative z-10 mx-auto flex max-w-2xl justify-center gap-3 sm:gap-6"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.6 }}
        transition={{ staggerChildren: 0.12 }}
        onViewportEnter={() => burst({ x: 0.5, y: 0.6 })}
      >
        {Object.entries(t).map(([label, value]) => (
          <Tile key={label} label={label} value={value} />
        ))}
      </motion.div>
      {isToday && (
        <p className="relative z-10 mt-8 text-center font-script text-4xl text-rose">Today is the day! 🎉</p>
      )}
    </section>
  );
}
