"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { wedding } from "@/config/wedding";
import SectionTitle from "./SectionTitle";
import { FlowerCorner } from "./Flowers";
import { hearts } from "./confetti";
import { CalendarIcon, PinIcon, eventIcons } from "./Icons";
import { scrollToY } from "./SmoothScroll";

type WeddingEvent = (typeof wedding.events)[number];

// Google reads a leading "Km 2" as a distance and switches to directions mode, so drop it for map searches.
const mapQuery = (e: WeddingEvent) =>
  ("mapQuery" in e && typeof e.mapQuery === "string" && e.mapQuery) ||
  `${e.address.replace(/^\s*km\s*[\d.]+\s*,?\s*/i, "")}, ${wedding.mapRegion}`;
const directionsUrl = (e: WeddingEvent) =>
  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(mapQuery(e))}`;
const embedUrl = (e: WeddingEvent) =>
  `https://maps.google.com/maps?q=${encodeURIComponent(mapQuery(e))}&z=15&output=embed`;

function calendarUrl() {
  const start = new Date(wedding.date);
  const end = new Date(start.getTime() + 8 * 3_600_000);
  const fmt = (d: Date) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const first = wedding.events[0];
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `${wedding.bride} & ${wedding.groom}'s Wedding`,
    dates: `${fmt(start)}/${fmt(end)}`,
    details: `We can't wait to celebrate with you! ${wedding.hashtag}`,
    location: first ? mapQuery(first) : wedding.city,
  });
  return `https://calendar.google.com/calendar/render?${params}`;
}

export default function Events() {
  const [active, setActive] = useState(0);
  const mapRef = useRef<HTMLDivElement>(null);
  const current = wedding.events[active];

  const showOnMap = (i: number) => {
    setActive(i);
    const el = mapRef.current;
    if (el) scrollToY(el.getBoundingClientRect().top + window.scrollY - 120, 1.4);
  };

  return (
    <section className="relative overflow-hidden px-5 py-20 sm:py-28">
      <FlowerCorner position="tl" />
      <FlowerCorner position="br" />
      <SectionTitle kicker="Join us" title="When & Where" />

      <motion.div
        className="relative z-10 mx-auto flex max-w-4xl flex-wrap justify-center gap-6 sm:gap-8"
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.15 }}
        transition={{ staggerChildren: 0.18 }}
      >
        {wedding.events.map((e, i) => {
          const Icon = eventIcons[e.icon as keyof typeof eventIcons] ?? eventIcons.church;
          return (
            <motion.article
              key={e.title}
              variants={{ hidden: { opacity: 0, y: 50 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="card relative w-full max-w-sm overflow-hidden rounded-[2rem] px-7 pt-10 pb-8 text-center"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-lilac via-magenta to-plum" />
              <div className="pointer-events-none absolute inset-3 rounded-[1.5rem] border border-magenta/15" />

              <motion.div
                className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blush/70 to-lavender/70 text-plum ring-1 ring-magenta/20"
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.6 }}
              >
                <Icon className="h-11 w-11" />
              </motion.div>

              <h3 className="mt-5 font-serif text-[1.65rem] font-semibold text-plum">{e.title}</h3>
              <p className="mt-3 text-[0.7rem] font-semibold tracking-[0.18em] text-magenta uppercase sm:tracking-[0.25em]">{e.date}</p>
              <p className="mt-1 font-serif text-2xl font-semibold text-magenta italic">{e.time}</p>

              <div className="mx-auto my-5 flex items-center justify-center gap-2 text-lilac">
                <span className="h-px w-10 bg-current" />
                <span className="text-xs">✦</span>
                <span className="h-px w-10 bg-current" />
              </div>

              <p className="font-serif text-lg font-semibold text-plum">{e.venue}</p>
              <p className="mt-1 text-sm leading-relaxed font-medium text-plum/75">{e.address}</p>

              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <a
                  href={directionsUrl(e)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-magenta to-plum px-5 py-2.5 text-sm font-medium text-white shadow-md shadow-magenta/25 transition-transform active:scale-95 sm:hover:-translate-y-0.5"
                >
                  <PinIcon className="h-4 w-4" /> Directions
                </a>
                <button
                  type="button"
                  onClick={() => showOnMap(i)}
                  className="cursor-pointer rounded-full border border-magenta/40 bg-white/60 px-5 py-2.5 text-sm font-medium text-plum transition active:scale-95 sm:hover:bg-white"
                >
                  View map
                </button>
              </div>
            </motion.article>
          );
        })}
      </motion.div>

      <motion.div
        className="relative z-10 mt-10 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.8 }}
      >
        <a
          href={calendarUrl()}
          target="_blank"
          rel="noreferrer"
          onClick={(ev) => hearts({ x: ev.clientX / window.innerWidth, y: ev.clientY / window.innerHeight })}
          className="inline-flex items-center gap-2 rounded-full border border-magenta/50 bg-white/70 px-6 py-3 text-sm font-medium tracking-wide text-plum shadow-sm transition active:scale-95 sm:hover:bg-plum sm:hover:text-white"
        >
          <CalendarIcon className="h-5 w-5" /> Add to Calendar
        </a>
      </motion.div>

      {current && (
        <motion.div
          ref={mapRef}
          className="relative z-10 mx-auto mt-14 max-w-4xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          {wedding.events.length > 1 && (
            <div className="mx-auto mb-5 flex w-fit rounded-full bg-white/70 p-1 shadow-sm ring-1 ring-magenta/15">
              {wedding.events.map((e, i) => (
                <button
                  key={e.title}
                  type="button"
                  onClick={() => setActive(i)}
                  className={`relative cursor-pointer rounded-full px-4 py-2 text-xs font-medium tracking-wider uppercase transition-colors sm:px-6 sm:text-sm ${
                    active === i ? "text-white" : "text-plum/70"
                  }`}
                >
                  {active === i && (
                    <motion.span
                      layoutId="map-tab"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-magenta to-plum"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className="relative">{e.title}</span>
                </button>
              ))}
            </div>
          )}

          <div className="rounded-[2rem] bg-gradient-to-br from-lilac via-magenta to-plum p-1 shadow-2xl shadow-plum/20">
            <div className="relative h-80 overflow-hidden rounded-[1.75rem] bg-lavender sm:h-[26rem]">
              <AnimatePresence mode="wait">
                <motion.iframe
                  key={active}
                  title={`Map: ${current.venue}`}
                  src={embedUrl(current)}
                  className="absolute inset-0 h-full w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                />
              </AnimatePresence>
            </div>
          </div>
          <p className="mt-4 text-center text-sm text-plum/70">
            <span className="font-medium text-plum">{current.venue}</span> · {current.address}
          </p>
        </motion.div>
      )}
    </section>
  );
}
