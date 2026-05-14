import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StatsStrip from "@/components/StatsStrip";
import Welcome from "@/components/Welcome";
import About from "@/components/About";
import Strengths from "@/components/Strengths";
import Services from "@/components/Services";
import ManufacturingUnit from "@/components/ManufacturingUnit";
import Quality from "@/components/Quality";
import Exports from "@/components/Exports";
import Markets from "@/components/Markets";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-white text-slate-950">
      <Navbar />
      <Hero />
      <StatsStrip />
      <Welcome />
      <About />
      <Strengths />
      <Services />
      <ManufacturingUnit />
      <Quality />
      <Exports />
      <Markets />
      <Contact />
      <Footer />
    </main>
  );
}
