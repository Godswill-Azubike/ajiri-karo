"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { wedding } from "@/config/wedding";
import SectionTitle from "./SectionTitle";
import { FlowerCorner } from "./Flowers";
import { hearts } from "./confetti";
import { GiftIcon } from "./Icons";

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
    <section className="relative overflow-hidden px-5 py-20 sm:py-28">
      <FlowerCorner position="tl" />
      <SectionTitle kicker="With love" title="Gifts" />
      <motion.div
        className="relative z-10 mx-auto max-w-md card rounded-[2rem] p-8 text-center"
        initial={{ opacity: 0, y: 50, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blush/70 to-lavender/70 text-plum ring-1 ring-magenta/20"
          animate={{ rotate: [0, -6, 6, -4, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 2.5 }}
        >
          <GiftIcon className="h-11 w-11" />
        </motion.div>
        <p className="mt-4 text-plum/80">{wedding.gifts.note}</p>
        <dl className="mt-6 space-y-3">
          {wedding.gifts.accounts.map((a) => (
            <div key={a.label} className="flex items-center justify-between gap-3 rounded-2xl bg-cream/80 px-4 py-3 ring-1 ring-magenta/10 text-left">
              <div>
                <dt className="text-xs tracking-widest text-mauve uppercase">{a.label}</dt>
                <dd className="font-semibold text-plum">{a.value}</dd>
              </div>
              {"copy" in a && a.copy && (
                <button
                  type="button"
                  onClick={(ev) => copy(a.value, ev)}
                  className="shrink-0 cursor-pointer rounded-full bg-gradient-to-r from-magenta to-plum px-4 py-1.5 text-sm text-white shadow transition-transform hover:scale-105 active:scale-95"
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
