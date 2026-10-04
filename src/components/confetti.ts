import confetti from "canvas-confetti";

// Own instance without the web worker: the worker path throws on window resize.
let instance: confetti.CreateTypes | null = null;
const fire: confetti.CreateTypes = Object.assign(
  (opts?: confetti.Options) => (instance ??= confetti.create(undefined, { resize: true, useWorker: false }))(opts),
  { reset: () => instance?.reset() },
);

const colors = ["#f8c8d0", "#c9a24d", "#e8cf8a", "#d9667b", "#ffd8be", "#ffffff", "#f49ac1"];

const reduced = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function burst(origin = { x: 0.5, y: 0.5 }) {
  if (reduced()) return;
  fire({ particleCount: 140, spread: 100, startVelocity: 45, origin, colors, scalar: 1.1 });
  fire({ particleCount: 40, spread: 120, origin, colors, shapes: ["circle"], scalar: 0.8 });
}

export function sideCannons(durationMs = 2500) {
  if (reduced()) return;
  const end = Date.now() + durationMs;
  (function frame() {
    fire({ particleCount: 4, angle: 60, spread: 60, origin: { x: 0, y: 0.7 }, colors });
    fire({ particleCount: 4, angle: 120, spread: 60, origin: { x: 1, y: 0.7 }, colors });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
}

export function hearts(origin = { x: 0.5, y: 0.5 }) {
  if (reduced()) return;
  const heart = confetti.shapeFromPath({
    path: "M167 72c19,-38 37,-56 75,-56 42,0 76,33 76,75 0,76 -76,151 -151,227 -76,-76 -151,-151 -151,-227 0,-42 33,-75 75,-75 38,0 57,18 76,56z",
  });
  fire({ particleCount: 40, spread: 80, origin, shapes: [heart], colors: ["#d9667b", "#f49ac1", "#c9a24d"], scalar: 1.6 });
}
