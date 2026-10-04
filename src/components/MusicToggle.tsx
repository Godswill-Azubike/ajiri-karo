"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { wedding } from "@/config/wedding";
import { OPEN_EVENT } from "./EnvelopeHero";

export default function MusicToggle() {
  const audio = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const userMuted = useRef(false);

  useEffect(() => {
    const tryPlay = () => {
      if (userMuted.current || !audio.current || !audio.current.paused) return;
      audio.current.volume = 0.5;
      audio.current.play().then(() => setPlaying(true)).catch(() => {});
    };
    // Browsers only allow audio after a tap/click/key, so try on the envelope opening and on the first interaction.
    window.addEventListener(OPEN_EVENT, tryPlay);
    window.addEventListener("pointerdown", tryPlay, { once: true });
    window.addEventListener("keydown", tryPlay, { once: true });
    return () => {
      window.removeEventListener(OPEN_EVENT, tryPlay);
      window.removeEventListener("pointerdown", tryPlay);
      window.removeEventListener("keydown", tryPlay);
    };
  }, []);

  if (!wedding.music) return null;

  const toggle = () => {
    const a = audio.current;
    if (!a) return;
    if (a.paused) {
      userMuted.current = false;
      a.play().then(() => setPlaying(true)).catch(() => {});
    } else {
      userMuted.current = true;
      a.pause();
      setPlaying(false);
    }
  };

  return (
    <>
      <audio ref={audio} src={wedding.music} loop preload="none" />
      <motion.button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Pause music" : "Play music"}
        className="fixed right-4 bottom-4 z-40 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-gradient-to-br from-rose to-gold text-2xl text-white shadow-xl ring-4 ring-white/70"
        initial={{ scale: 0 }}
        animate={{ scale: 1, rotate: playing ? 360 : 0 }}
        transition={playing ? { rotate: { duration: 6, repeat: Infinity, ease: "linear" } } : { type: "spring" }}
        whileTap={{ scale: 0.9 }}
      >
        {playing ? "♫" : "🔇"}
      </motion.button>
    </>
  );
}
