import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StatsStrip from "@/components/StatsStrip";
import Welcome from "@/components/Welcome";
import Innovation from "@/components/Innovation";
import About from "@/components/About";
import VisionMission from "@/components/VisionMission";
import Strengths from "@/components/Strengths";
import DosageForms from "@/components/DosageForms";
import Services from "@/components/Services";
import TherapeuticAreas from "@/components/TherapeuticAreas";
import ManufacturingUnit from "@/components/ManufacturingUnit";
import Quality from "@/components/Quality";
import Exports from "@/components/Exports";
import Clients from "@/components/Clients";
import OteriaBrand from "@/components/OteriaBrand";
import Markets from "@/components/Markets";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-white text-slate-950 pb-20 lg:pb-0">
      <Navbar />
      <Hero />
      <StatsStrip />
      <Welcome />
      <Innovation />
      <About />
      <VisionMission />
      <Strengths />
      <DosageForms />
      <Services />
      <TherapeuticAreas />
      <ManufacturingUnit />
      <Quality />
      <Exports />
      <Clients />
      <OteriaBrand />
      <Markets />
      <Contact />
      <Footer />
    </main>
  );
}
