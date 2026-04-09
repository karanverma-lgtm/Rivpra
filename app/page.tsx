import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StatsStrip from "@/components/StatsStrip";
import Welcome from "@/components/Welcome";
import Strengths from "@/components/Strengths";
import Services from "@/components/Services";
import ManufacturingUnit from "@/components/ManufacturingUnit";
import Exports from "@/components/Exports";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-[#0D0D0D] min-h-screen">
      <Navbar />
      <Hero />
      <StatsStrip />
      <Welcome />
      <Strengths />
      <Services />
      <ManufacturingUnit />
      <Exports />
      <Contact />
      <Footer />
    </main>
  );
}
