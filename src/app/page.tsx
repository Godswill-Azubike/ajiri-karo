import EnvelopeHero from "@/components/EnvelopeHero";
import Countdown from "@/components/Countdown";
import OurStory from "@/components/OurStory";
import Events from "@/components/Events";
import DressCode from "@/components/DressCode";
import Gallery from "@/components/Gallery";
import Gifts from "@/components/Gifts";
import Footer from "@/components/Footer";
import FloatingPetals from "@/components/FloatingPetals";
import MusicToggle from "@/components/MusicToggle";
import SmoothScroll from "@/components/SmoothScroll";

export default function Home() {
  return (
    <main className="relative overflow-x-clip">
      <SmoothScroll />
      <FloatingPetals />
      <EnvelopeHero />
      <Countdown />
      <OurStory />
      <Events />
      <DressCode />
      <Gallery />
      <Gifts />
      <Footer />
      <MusicToggle />
    </main>
  );
}
