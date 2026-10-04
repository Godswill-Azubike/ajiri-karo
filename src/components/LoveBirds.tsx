"use client";

import { useEffect, useState } from "react";

/** One dove facing right. The two wings flap from the shoulder, slightly out of phase. */
function Dove({ flapDelay = 0 }: { flapDelay?: number }) {
  const wing = (delay: number): React.CSSProperties => ({
    transformBox: "view-box",
    transformOrigin: "62px 44px",
    animation: `dove-flap 0.9s ease-in-out ${delay}s infinite`,
  });
  return (
    <svg viewBox="0 0 120 80" className="h-full w-full overflow-visible drop-shadow-[0_6px_8px_rgba(108,29,69,0.18)]">
      {/* far wing */}
      <path d="M56 44 C58 26 70 12 88 8 C82 20 78 30 70 44Z" fill="#e6dcf7" stroke="#cbb7ec" strokeWidth="0.8" style={wing(flapDelay + 0.08)} />
      {/* tail */}
      <path d="M34 47 L8 40 L15 48 L5 56 L36 53Z" fill="#fff" stroke="#d9c9f2" strokeWidth="0.8" />
      {/* body + head */}
      <path
        d="M30 47 C40 37 62 35 78 39 C88 41 93 36 97 32 C103 29 110 31 112 36 C108 37 104 40 101 44 C93 54 71 58 51 56 C43 55 35 52 30 47Z"
        fill="#fff"
        stroke="#d9c9f2"
        strokeWidth="0.8"
      />
      <path d="M112 36 L119 37.6 L111.5 39.4Z" fill="#c2588f" />
      <circle cx="104.5" cy="35" r="1.3" fill="#6c1d45" />
      <path d="M44 52 C56 55 74 54 88 48" stroke="#ede3fa" strokeWidth="1.2" fill="none" />
      {/* near wing */}
      <path d="M52 45 C55 22 70 6 94 2 C86 16 82 28 74 45Z" fill="#fff" stroke="#d9c9f2" strokeWidth="0.8" style={wing(flapDelay)} />
      <path d="M60 40 C64 26 72 16 84 10" stroke="#ede3fa" strokeWidth="1" fill="none" style={wing(flapDelay)} />
    </svg>
  );
}

/** Two doves that fly across the page together every so often. */
export default function LoveBirds() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setShow(true);
  }, []);

  if (!show) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden" aria-hidden>
      <style>{`
        @keyframes dove-flap {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(-0.55); }
        }
        /* Fly across in the first 40% of the cycle, then rest off-screen until the next pass. */
        @keyframes dove-flight {
          0%   { transform: translate3d(-25vw, 42vh, 0) rotate(-6deg); }
          10%  { transform: translate3d(12vw, 30vh, 0) rotate(-10deg); }
          20%  { transform: translate3d(42vw, 34vh, 0) rotate(2deg); }
          30%  { transform: translate3d(72vw, 22vh, 0) rotate(-8deg); }
          40%  { transform: translate3d(120vw, 12vh, 0) rotate(-12deg); }
          100% { transform: translate3d(120vw, 12vh, 0) rotate(-12deg); }
        }
        @keyframes dove-bob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
      {[
        { delay: 2.5, offset: "0px", size: "w-24 h-16 sm:w-36 sm:h-24", flap: 0 },
        { delay: 3.1, offset: "44px", size: "w-20 h-14 sm:w-32 sm:h-20", flap: 0.35 },
      ].map((b, i) => (
        <div
          key={i}
          className="absolute top-0 left-0 will-change-transform"
          style={{ animation: `dove-flight 38s linear ${b.delay}s infinite`, transform: "translate3d(-25vw, 42vh, 0)" }}
        >
          <div style={{ marginTop: b.offset, animation: `dove-bob 2.2s ease-in-out ${i * 0.5}s infinite` }} className={b.size}>
            <Dove flapDelay={b.flap} />
          </div>
        </div>
      ))}
    </div>
  );
}
