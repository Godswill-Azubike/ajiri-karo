import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { wedding } from "@/config/wedding";

// The preview card shown when the link is shared (WhatsApp, iMessage, Facebook, X…).
// Generated once at build time from the wedding config, so it always matches the site.
export const alt = `${wedding.bride} & ${wedding.groom} are getting married · ${wedding.displayDate}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const plum = "#6c1d45";
const magenta = "#a3307e";

function Flower({ size: s, color, inner, rotate = 0 }: { size: number; color: string; inner: string; rotate?: number }) {
  const petals = [0, 60, 120, 180, 240, 300];
  return (
    <svg width={s} height={s} viewBox="-50 -50 100 100" style={rotate ? { transform: `rotate(${rotate}deg)` } : {}}>
      {petals.map((r) => (
        <ellipse key={`o${r}`} cx="0" cy="-24" rx="15" ry="25" fill={color} transform={`rotate(${r})`} />
      ))}
      {petals.map((r) => (
        <ellipse key={`i${r}`} cx="0" cy="-14" rx="9" ry="15" fill={inner} transform={`rotate(${r + 30})`} />
      ))}
      <circle r="9" fill={magenta} />
      <circle r="4" fill="#fbeaf3" />
    </svg>
  );
}

function Leaf({ rotate }: { rotate: number }) {
  return (
    <svg width="34" height="68" viewBox="0 0 40 80" style={{ transform: `rotate(${rotate}deg)` }}>
      <path d="M20 0 C40 25 40 55 20 80 C0 55 0 25 20 0Z" fill="#7f9c4a" />
      <path d="M20 5 L20 75" stroke="#5c7832" strokeWidth="1.5" />
    </svg>
  );
}

function Bouquet({ flip }: { flip?: boolean }) {
  return (
    <div style={{ display: "flex", position: "relative", width: 230, height: 230, ...(flip ? { transform: "rotate(180deg)" } : {}) }}>
      <div style={{ display: "flex", position: "absolute", left: 120, top: -6 }}><Leaf rotate={-60} /></div>
      <div style={{ display: "flex", position: "absolute", left: -4, top: 110 }}><Leaf rotate={150} /></div>
      <div style={{ display: "flex", position: "absolute", left: -30, top: -30 }}><Flower size={150} color="#d98cb8" inner="#f5d3e6" /></div>
      <div style={{ display: "flex", position: "absolute", left: 95, top: 10 }}><Flower size={86} color="#d9c9f2" inner="#efe6fb" rotate={20} /></div>
      <div style={{ display: "flex", position: "absolute", left: 4, top: 96 }}><Flower size={92} color="#8e2a5a" inner="#f2c6dd" rotate={10} /></div>
    </div>
  );
}

export default async function OpengraphImage() {
  const fonts = join(process.cwd(), "src/app/og-fonts");
  const [script, serifItalic, sans] = await Promise.all([
    readFile(join(fonts, "DancingScript-Bold.ttf")),
    readFile(join(fonts, "PlayfairDisplay-SemiBoldItalic.ttf")),
    readFile(join(fonts, "Montserrat-SemiBold.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #f8e1ee 0%, #fcf5f9 45%, #ece4fa 100%)",
          position: "relative",
          fontFamily: "Montserrat",
        }}
      >
        {/* floral corners */}
        <div style={{ display: "flex", position: "absolute", left: 0, top: 0 }}><Bouquet /></div>
        <div style={{ display: "flex", position: "absolute", right: 0, bottom: 0 }}><Bouquet flip /></div>

        {/* invitation card */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: 900,
            height: 520,
            background: "rgba(255,255,255,0.92)",
            borderRadius: 36,
            border: `3px solid ${magenta}`,
            boxShadow: "0 30px 80px rgba(108,29,69,0.25)",
            position: "relative",
          }}
        >
          <div style={{ display: "flex", position: "absolute", top: 14, left: 14, right: 14, bottom: 14, borderRadius: 26, border: "1.5px solid rgba(163,48,126,0.35)" }} />

          <div style={{ display: "flex", fontSize: 22, letterSpacing: 8, color: magenta, textTransform: "uppercase" }}>
            You&apos;re invited to the wedding of
          </div>
          <div style={{ display: "flex", fontFamily: "Dancing Script", fontSize: 150, color: plum, lineHeight: 1.15, marginTop: 6 }}>
            {wedding.bride} &amp; {wedding.groom}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 18, color: "#b9a2e3", marginTop: 4 }}>
            <div style={{ display: "flex", width: 110, height: 2, background: "#b9a2e3" }} />
            <svg width="30" height="28" viewBox="0 0 24 22">
              <path d="M12 21s-9-5.6-9-12A5 5 0 0 1 12 6a5 5 0 0 1 9 3c0 6.4-9 12-9 12z" fill={magenta} />
            </svg>
            <div style={{ display: "flex", width: 110, height: 2, background: "#b9a2e3" }} />
          </div>
          <div style={{ display: "flex", fontFamily: "Playfair Display", fontStyle: "italic", fontSize: 46, color: plum, marginTop: 18 }}>
            {wedding.displayDate}
          </div>
          <div style={{ display: "flex", fontSize: 26, letterSpacing: 5, color: magenta, marginTop: 12, textTransform: "uppercase" }}>
            {wedding.displayTime} · {wedding.city}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 26,
              padding: "10px 28px",
              borderRadius: 999,
              background: `linear-gradient(90deg, ${magenta}, ${plum})`,
              color: "white",
              fontSize: 22,
              letterSpacing: 2,
            }}
          >
            {wedding.hashtag}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Dancing Script", data: script, weight: 700, style: "normal" },
        { name: "Playfair Display", data: serifItalic, weight: 600, style: "italic" },
        { name: "Montserrat", data: sans, weight: 600, style: "normal" },
      ],
    },
  );
}
