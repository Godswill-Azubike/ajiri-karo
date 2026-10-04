"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import type Lenis from "lenis";
import { wedding } from "@/config/wedding";
import SectionTitle from "./SectionTitle";
import { FlowerCorner } from "./Flowers";

type Photo = (typeof wedding.gallery)[number];

const ease = [0.22, 1, 0.36, 1] as const;

function Arrow({ dir }: { dir: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {dir === "left" ? <path d="M15 5l-7 7 7 7" /> : <path d="M9 5l7 7-7 7" />}
    </svg>
  );
}

function Lightbox({ photos, index, onClose, onNavigate }: {
  photos: Photo[];
  index: number;
  onClose: () => void;
  onNavigate: (to: number) => void;
}) {
  const [dir, setDir] = useState(0);
  const photo = photos[index];
  const go = useCallback(
    (step: number) => {
      setDir(step);
      onNavigate((index + step + photos.length) % photos.length);
    },
    [index, photos.length, onNavigate],
  );

  // Keyboard: Esc closes, arrows navigate.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, onClose]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -70 || info.velocity.x < -500) go(1);
    else if (info.offset.x > 70 || info.velocity.x > 500) go(-1);
  };

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex flex-col items-center justify-center px-4 py-16"
      role="dialog"
      aria-modal="true"
      aria-label={`Photo ${index + 1} of ${photos.length}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Blurred, tinted page behind */}
      <div className="absolute inset-0 bg-plum/45 backdrop-blur-xl backdrop-saturate-150" onClick={onClose} />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse at center, transparent 30%, rgba(74,20,48,0.55) 100%)" }}
      />

      {/* Top bar */}
      <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-5 pt-5 text-white">
        <span className="font-serif text-sm font-semibold tracking-[0.25em]">
          {String(index + 1).padStart(2, "0")} <span className="text-white/50">/ {String(photos.length).padStart(2, "0")}</span>
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close preview"
          className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-white/15 ring-1 ring-white/30 transition hover:bg-white/25 active:scale-90"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>

      {/* Photo */}
      <div className="pointer-events-none relative z-10 flex w-full max-w-5xl flex-1 items-center justify-center">
        <AnimatePresence mode="popLayout" initial custom={dir}>
          <motion.figure
            key={index}
            custom={dir}
            variants={{
              enter: (d: number) =>
                d === 0
                  ? { opacity: 0, scale: 0.82, y: 40, rotate: -2, filter: "blur(10px)" }
                  : { opacity: 0, x: d * 120, scale: 0.94, filter: "blur(6px)" },
              center: { opacity: 1, x: 0, y: 0, scale: 1, rotate: 0, filter: "blur(0px)" },
              exit: (d: number) =>
                d === 0
                  ? { opacity: 0, scale: 0.9, y: 30, filter: "blur(8px)" }
                  : { opacity: 0, x: d * -120, scale: 0.94, filter: "blur(6px)" },
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.55, ease }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.5}
            onDragEnd={onDragEnd}
            className="pointer-events-auto flex cursor-grab touch-pan-y flex-col items-center active:cursor-grabbing"
          >
            <div className="rounded-[1.6rem] bg-white p-2 shadow-[0_40px_120px_-20px_rgba(20,0,10,0.7)] sm:p-2.5">
              <Image
                src={photo.src}
                alt={photo.caption}
                width={photo.w}
                height={photo.h}
                sizes="(max-width: 640px) 92vw, 70vw"
                quality={85}
                priority
                draggable={false}
                className="h-auto max-h-[68svh] w-auto max-w-[86vw] rounded-[1.1rem] object-contain select-none sm:max-h-[72svh] sm:max-w-[70vw]"
              />
            </div>
            <figcaption className="mt-5 text-center font-script text-3xl font-bold text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.35)] sm:text-4xl">
              {photo.caption}
            </figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>

      {/* Arrows */}
      {photos.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous photo"
            className="absolute top-1/2 left-3 z-10 hidden h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/15 text-white ring-1 ring-white/30 transition hover:bg-white/30 active:scale-90 sm:flex"
          >
            <Arrow dir="left" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next photo"
            className="absolute top-1/2 right-3 z-10 hidden h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/15 text-white ring-1 ring-white/30 transition hover:bg-white/30 active:scale-90 sm:flex"
          >
            <Arrow dir="right" />
          </button>
        </>
      )}

      {/* Dots */}
      <div className="absolute inset-x-0 bottom-6 z-10 flex justify-center gap-1">
        {photos.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Show photo ${i + 1}`}
            onClick={() => {
              setDir(i > index ? 1 : -1);
              onNavigate(i);
            }}
            className="cursor-pointer p-1"
          >
            <span className={`block h-1.5 rounded-full transition-all duration-300 ${i === index ? "w-6 bg-white" : "w-1.5 bg-white/45"}`} />
          </button>
        ))}
      </div>
      <p className="pointer-events-none absolute bottom-14 z-10 text-[0.6rem] tracking-[0.3em] text-white/60 uppercase sm:hidden">
        Swipe to browse
      </p>
    </motion.div>
  );
}

export default function Gallery() {
  const photos = wedding.gallery;
  const [open, setOpen] = useState<number | null>(null);
  const isOpen = open !== null;

  // Freeze page scrolling (and Lenis smooth scroll) while the preview is open.
  useEffect(() => {
    if (!isOpen) return;
    const lenis = (window as unknown as { lenis?: Lenis }).lenis;
    lenis?.stop();
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      lenis?.start();
      document.documentElement.style.overflow = prev;
    };
  }, [isOpen]);

  return (
    <section className="relative overflow-hidden px-5 py-20 sm:py-28">
      <FlowerCorner position="tl" />
      <FlowerCorner position="br" />
      <SectionTitle kicker="Moments" title="Our Gallery" />

      <div className="relative z-10 mx-auto max-w-5xl columns-2 gap-3 sm:gap-5 md:columns-3">
        {photos.map((p, i) => (
          <motion.button
            type="button"
            key={p.src}
            onClick={() => setOpen(i)}
            aria-label={`Open photo: ${p.caption}`}
            initial={{ opacity: 0, y: 50, scale: 0.94 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.9, ease, delay: (i % 3) * 0.08 }}
            className="group relative mb-3 block w-full cursor-pointer break-inside-avoid overflow-hidden rounded-2xl bg-lavender shadow-lg ring-4 ring-white sm:mb-5"
          >
            <Image
              src={p.src}
              alt={p.caption}
              width={p.w}
              height={p.h}
              sizes="(max-width: 768px) 50vw, 33vw"
              className="h-auto w-full transition-transform duration-700 ease-out group-hover:scale-105"
            />
            {/* hover hint (desktop) */}
            <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-plum/70 via-plum/0 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <span className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 p-3 text-left font-script text-xl font-bold text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
              {p.caption}
            </span>
            <span className="pointer-events-none absolute top-2.5 right-2.5 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-plum shadow-md transition-transform duration-300 group-hover:scale-110 sm:h-9 sm:w-9">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
              </svg>
            </span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {open !== null && <Lightbox photos={photos} index={open} onClose={() => setOpen(null)} onNavigate={setOpen} />}
      </AnimatePresence>
    </section>
  );
}
