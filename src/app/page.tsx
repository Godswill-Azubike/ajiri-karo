import EnvelopeHero from "@/components/EnvelopeHero";
import Countdown from "@/components/Countdown";
import OurStory from "@/components/OurStory";
import Events from "@/components/Events";
import DressCode from "@/components/DressCode";
import Gifts from "@/components/Gifts";
import Footer from "@/components/Footer";
import FloatingPetals from "@/components/FloatingPetals";
import MusicToggle from "@/components/MusicToggle";
import SmoothScroll from "@/components/SmoothScroll";
import Ambience from "@/components/Ambience";
import Divider from "@/components/Divider";
import LoveBirds from "@/components/LoveBirds";
import RingsClink from "@/components/RingsClink";
import WelcomeGate from "@/components/WelcomeGate";

export default function Home() {
  return (
    <main className="relative overflow-x-clip">
      <SmoothScroll />
      <WelcomeGate />
      <Ambience />
      <FloatingPetals />
      <LoveBirds />
      <EnvelopeHero />
      <Countdown />
      <RingsClink />
      <Divider />
      <OurStory />
      <Divider />
      <Events />
      <Divider />
      <DressCode />
      <Divider />
      <Gifts />
      <Footer />
      <MusicToggle />
    </main>
  );
}
