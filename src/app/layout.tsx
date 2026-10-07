import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import { wedding } from "@/config/wedding";
import "./globals.css";

// Fonts are bundled in ./fonts (no Google Fonts download at build or run time).
const dancing = localFont({
  src: "./fonts/DancingScript-normal.woff2",
  weight: "400 700",
  variable: "--font-dancing",
  display: "swap",
});
const playfair = localFont({
  src: [
    { path: "./fonts/PlayfairDisplay-normal.woff2", weight: "400 900", style: "normal" },
    { path: "./fonts/PlayfairDisplay-italic.woff2", weight: "400 900", style: "italic" },
  ],
  variable: "--font-playfair",
  display: "swap",
});
const montserrat = localFont({
  src: "./fonts/Montserrat-normal.woff2",
  weight: "300 700",
  variable: "--font-montserrat",
  display: "swap",
});

// Share previews (WhatsApp etc.) need absolute image URLs. On Vercel the production domain is detected
// automatically; set NEXT_PUBLIC_SITE_URL (e.g. https://ajiriandkaro.com) if you add a custom domain.
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000");

const shareTitle = `${wedding.bride} & ${wedding.groom} are getting married 💍`;
const shareDescription = `You're invited! Join us on ${wedding.displayDate} in ${wedding.city}. Tap to open your invitation 💌 ${wedding.hashtag}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${wedding.bride} & ${wedding.groom} — We're Getting Married!`,
  description: shareDescription,
  openGraph: {
    type: "website",
    url: "/",
    siteName: `${wedding.bride} & ${wedding.groom}`,
    title: shareTitle,
    description: shareDescription,
    locale: "en_NG",
  },
  twitter: {
    card: "summary_large_image",
    title: shareTitle,
    description: shareDescription,
  },
};

export const viewport: Viewport = { themeColor: "#f2c6dd" };

// Some browser extensions (e.g. Bitdefender: bis_skin_checked, bis_register, __processed_*) stamp attributes
// onto every element before React hydrates, which trips Next's dev hydration-mismatch overlay.
// In development, strip them as they appear. (Production never shows that overlay, so this is dev-only.)
const stripExtensionAttrs = `(function(){
  var bad=function(n){return n.indexOf('bis_')===0||n.indexOf('__processed_')===0;};
  var clean=function(el){if(!el.attributes)return;for(var i=el.attributes.length-1;i>=0;i--){var n=el.attributes[i].name;if(bad(n))el.removeAttribute(n);}};
  var mo=new MutationObserver(function(ms){for(var i=0;i<ms.length;i++){var m=ms[i];
    if(m.type==='attributes'&&bad(m.attributeName))m.target.removeAttribute(m.attributeName);
    else if(m.type==='childList')m.addedNodes.forEach(function(n){if(n.nodeType===1){clean(n);n.querySelectorAll&&n.querySelectorAll('*').forEach(clean);}});}});
  mo.observe(document.documentElement,{attributes:true,childList:true,subtree:true});
  document.querySelectorAll('*').forEach(clean);
  setTimeout(function(){mo.disconnect();},15000);
})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning: browser extensions add attributes to <html>/<body> before React loads.
    <html lang="en" className={`${dancing.variable} ${playfair.variable} ${montserrat.variable}`} suppressHydrationWarning>
      <body className="font-sans" suppressHydrationWarning>
        {process.env.NODE_ENV === "development" && (
          <Script id="strip-extension-attrs" strategy="beforeInteractive">
            {stripExtensionAttrs}
          </Script>
        )}
        {children}
      </body>
    </html>
  );
}
