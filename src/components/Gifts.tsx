"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { wedding } from "@/config/wedding";
import SectionTitle from "./SectionTitle";
import { FlowerCorner } from "./Flowers";
import { hearts } from "./confetti";

export default function Gifts() {
  const [copied, setCopied] = useState(false);

  const copy = async (value: string, ev: React.MouseEvent) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
    hearts({ x: ev.clientX / window.innerWidth, y: ev.clientY / window.innerHeight });
  };

  return (
    <section className="relative overflow-hidden px-4 py-24">
      <FlowerCorner position="tl" />
      <SectionTitle kicker="With love" title="Gifts" />
      <motion.div
        className="relative z-10 mx-auto max-w-md rounded-3xl bg-white/85 p-8 text-center shadow-2xl ring-1 ring-blush backdrop-blur"
        initial={{ opacity: 0, rotateY: 90 }}
        whileInView={{ opacity: 1, rotateY: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ type: "spring", stiffness: 50, damping: 12 }}
      >
        <motion.div
          className="text-5xl"
          animate={{ rotate: [0, -10, 10, -10, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 1.5 }}
        >
          🎁
        </motion.div>
        <p className="mt-4 text-wine/80">{wedding.gifts.note}</p>
        <dl className="mt-6 space-y-3">
          {wedding.gifts.accounts.map((a) => (
            <div key={a.label} className="flex items-center justify-between gap-3 rounded-xl bg-cream px-4 py-3 text-left">
              <div>
                <dt className="text-xs tracking-widest text-rose uppercase">{a.label}</dt>
                <dd className="font-medium text-wine">{a.value}</dd>
              </div>
              {"copy" in a && a.copy && (
                <button
                  type="button"
                  onClick={(ev) => copy(a.value, ev)}
                  className="shrink-0 cursor-pointer rounded-full bg-gradient-to-r from-rose to-gold px-4 py-1.5 text-sm text-white shadow transition-transform hover:scale-105 active:scale-95"
                >
                  {copied ? "Copied ♥" : "Copy"}
                </button>
              )}
            </div>
          ))}
        </dl>
      </motion.div>
    </section>
  );
}
