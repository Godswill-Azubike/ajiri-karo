import confetti from "canvas-confetti";

// Own instance without the web worker: the worker path throws on window resize.
let instance: confetti.CreateTypes | null = null;
const fire: confetti.CreateTypes = Object.assign(
  (opts?: confetti.Options) => (instance ??= confetti.create(undefined, { resize: true, useWorker: false }))(opts),
  { reset: () => instance?.reset() },
);

const colors = ["#6e8b3d", "#f2c6dd", "#a3307e", "#b9a2e3", "#c2588f", "#d9c9f2", "#ffffff", "#8e2a5a"];

// Phones get lighter bursts so confetti celebrates without burying the text.
const density = () => (typeof window !== "undefined" && window.innerWidth < 640 ? 0.45 : 1);

const reduced = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function burst(origin = { x: 0.5, y: 0.5 }) {
  if (reduced()) return;
  const d = density();
  fire({ particleCount: Math.round(140 * d), spread: 100, startVelocity: 45, origin, colors, scalar: 1.1, ticks: 160 });
  fire({ particleCount: Math.round(40 * d), spread: 120, origin, colors, shapes: ["circle"], scalar: 0.8, ticks: 160 });
}

export function sideCannons(durationMs = 2500) {
  if (reduced()) return;
  const end = Date.now() + durationMs * density();
  const count = density() < 1 ? 2 : 4;
  (function frame() {
    fire({ particleCount: count, angle: 60, spread: 60, origin: { x: 0, y: 0.7 }, colors, ticks: 150 });
    fire({ particleCount: count, angle: 120, spread: 60, origin: { x: 1, y: 0.7 }, colors, ticks: 150 });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
}

export function hearts(origin = { x: 0.5, y: 0.5 }) {
  if (reduced()) return;
  const heart = confetti.shapeFromPath({
    path: "M167 72c19,-38 37,-56 75,-56 42,0 76,33 76,75 0,76 -76,151 -151,227 -76,-76 -151,-151 -151,-227 0,-42 33,-75 75,-75 38,0 57,18 76,56z",
  });
  fire({ particleCount: 40, spread: 80, origin, shapes: [heart], colors: ["#c2588f", "#b9a2e3", "#a3307e"], scalar: 1.6 });
}

/** A small, gentle shimmer of round sparkles. */
export function sparkle(origin = { x: 0.5, y: 0.5 }) {
  if (reduced()) return;
  fire({
    particleCount: Math.round(36 * density()),
    spread: 70,
    startVelocity: 22,
    gravity: 0.6,
    ticks: 120,
    origin,
    shapes: ["circle"],
    scalar: 0.7,
    colors: ["#b9a2e3", "#d98cb8", "#ffffff", "#a3307e"],
  });
}
