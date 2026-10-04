"use client";

import { motion } from "framer-motion";
import { wedding } from "@/config/wedding";
import SectionTitle from "./SectionTitle";
import { FlowerCorner } from "./Flowers";
import { hearts } from "./confetti";

function calendarUrl() {
  const start = new Date(wedding.date);
  const end = new Date(start.getTime() + 8 * 3_600_000);
  const fmt = (d: Date) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `${wedding.bride} & ${wedding.groom}'s Wedding`,
    dates: `${fmt(start)}/${fmt(end)}`,
    details: `We can't wait to celebrate with you! ${wedding.hashtag}`,
    location: wedding.city,
  });
  return `https://calendar.google.com/calendar/render?${params}`;
}

export default function Events() {
  return (
    <section className="relative overflow-hidden px-4 py-24">
      <FlowerCorner position="tl" />
      <FlowerCorner position="br" />
      <SectionTitle kicker="Join us" title="When & Where" />

      <motion.div
        className="relative z-10 mx-auto grid max-w-5xl gap-6 md:grid-cols-3"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ staggerChildren: 0.18 }}
      >
        {wedding.events.map((e) => (
          <motion.article
            key={e.title}
            variants={{ hidden: { opacity: 0, y: 60, scale: 0.9 }, show: { opacity: 1, y: 0, scale: 1 } }}
            transition={{ type: "spring", stiffness: 70, damping: 14 }}
            whileHover={{ y: -10 }}
            className="group relative overflow-hidden rounded-3xl bg-white/85 p-7 text-center shadow-xl ring-1 ring-blush backdrop-blur"
          >
            <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-blush via-gold to-rose" />
            <motion.div
              className="text-5xl"
              animate={{ y: [0, -6, 0], rotate: [0, -6, 6, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              {e.icon}
            </motion.div>
            <h3 className="mt-4 font-serif text-2xl text-wine">{e.title}</h3>
            <p className="mt-3 font-semibold text-rose">{e.date}</p>
            <p className="text-sm tracking-widest text-wine/70 uppercase">{e.time}</p>
            <div className="mx-auto my-4 h-px w-16 bg-gold/50" />
            <p className="font-medium text-wine">{e.venue}</p>
            <p className="mt-1 text-sm text-wine/70">{e.address}</p>
            <a
              href={e.mapUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-rose to-gold px-5 py-2 text-sm font-medium text-white shadow-md transition-transform hover:scale-105"
            >
              📍 Open in Maps
            </a>
          </motion.article>
        ))}
      </motion.div>

      <motion.div
        className="relative z-10 mt-10 text-center"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
      >
        <a
          href={calendarUrl()}
          target="_blank"
          rel="noreferrer"
          onClick={(ev) => hearts({ x: ev.clientX / window.innerWidth, y: ev.clientY / window.innerHeight })}
          className="inline-flex items-center gap-2 rounded-full border-2 border-gold bg-white/70 px-6 py-3 font-medium text-wine shadow-md transition hover:bg-gold hover:text-white"
        >
          🗓️ Add to Calendar
        </a>
      </motion.div>

      <motion.div
        className="relative z-10 mx-auto mt-12 max-w-5xl overflow-hidden rounded-3xl p-1.5 shadow-2xl"
        style={{ background: "linear-gradient(135deg,#f8c8d0,#c9a24d,#d9667b)" }}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <iframe
          title="Venue map"
          src={`https://maps.google.com/maps?q=${encodeURIComponent(wedding.mapEmbedQuery)}&z=14&output=embed`}
          className="h-72 w-full rounded-[1.25rem] sm:h-96"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </motion.div>
    </section>
  );
}
