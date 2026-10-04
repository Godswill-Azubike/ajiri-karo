import type { Metadata, Viewport } from "next";
import { Great_Vibes, Playfair_Display, Poppins } from "next/font/google";
import { wedding } from "@/config/wedding";
import "./globals.css";

const greatVibes = Great_Vibes({ weight: "400", subsets: ["latin"], variable: "--font-great-vibes" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const poppins = Poppins({ weight: ["300", "400", "500", "600"], subsets: ["latin"], variable: "--font-poppins" });

export const metadata: Metadata = {
  title: `${wedding.bride} & ${wedding.groom} — We're Getting Married!`,
  description: `Join us on ${wedding.displayDate} in ${wedding.city}. ${wedding.hashtag}`,
  openGraph: {
    title: `${wedding.bride} & ${wedding.groom} are getting married 💍`,
    description: `${wedding.displayDate} · ${wedding.city}`,
  },
};

export const viewport: Viewport = { themeColor: "#f8c8d0" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${greatVibes.variable} ${playfair.variable} ${poppins.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
