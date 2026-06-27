"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import Image from "next/image";

const heroWords = ["Reliable", "Trusted", "Innovative", "ISO-Certified"];

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const wordIndex = useRef(0);
  const wordRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });

    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 60, skewY: 3 },
      { opacity: 1, y: 0, skewY: 0, duration: 1, ease: "power4.out" }
    )
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.5"
      )
      .fromTo(
        statsRef.current?.children ?? [],
        { opacity: 0, y: 40, scale: 0.8 },
        { opacity: 1, y: 0, scale: 1, stagger: 0.15, duration: 1, ease: "back.out(1.5)" },
        "-=0.2"
      );

    // word cycling
    const interval = setInterval(() => {
      if (!wordRef.current) return;
      gsap.to(wordRef.current, {
        opacity: 0,
        y: -10,
        duration: 0.3,
        onComplete: () => {
          wordIndex.current = (wordIndex.current + 1) % heroWords.length;
          if (wordRef.current) {
            wordRef.current.textContent = heroWords[wordIndex.current];
            gsap.fromTo(
              wordRef.current,
              { opacity: 0, y: 10 },
              { opacity: 1, y: 0, duration: 0.3 }
            );
          }
        },
      });
    }, 2200);

    return () => clearInterval(interval);
  }, []);

  const handleCTA = () => {
    document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative flex min-h-screen w-full items-start lg:items-center overflow-hidden bg-white">
      {/* Subtle background glow blobs */}
      <div className="pointer-events-none absolute -left-40 top-1/4 h-[500px] w-[500px] rounded-full bg-[#1fb8e5]/8 blur-[140px]" />
      <div className="pointer-events-none absolute -right-40 bottom-1/4 h-[400px] w-[400px] rounded-full bg-[#f6b11b]/6 blur-[120px]" />
      <div className="pointer-events-none absolute right-1/4 top-1/3 h-[300px] w-[300px] rounded-full bg-[#ddd82a]/5 blur-[100px]" />

      {/* Content */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 lg:px-8 pt-24 lg:pt-32 pb-8">
        {/* ── Two-column grid ── */}
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-12">
          {/* ── Left Column — Text ── */}
          <div className="pt-4">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#1fb8e5]/40 bg-[#1fb8e5]/10 mb-5"
            >
              <span className="w-2 h-2 rounded-full bg-[#f6b11b] animate-pulse" />
              <span className="text-[#f6b11b] text-xs font-semibold tracking-widest uppercase">
                Powered By Innovation, Driven By Science · Est. 2008
              </span>
            </motion.div>

            {/* Headline */}
            <h1
              ref={titleRef}
              className="opacity-0 text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-6xl font-black text-slate-950 leading-[0.95] tracking-tight mb-5"
            >
              A{" "}
              <span
                ref={wordRef}
                className="inline-block bg-gradient-to-r from-[#1fb8e5] via-[#f6b11b] to-[#1fb8e5] bg-clip-text text-transparent bg-[length:200%_100%] animate-gradient-shift"
              >
                Trusted
              </span>
              <br />
              Pharmaceutical
              <br />
              <span className="text-slate-500">Partner</span>
            </h1>

            {/* Subtext */}
            <p
              ref={subtitleRef}
              className="opacity-0 text-base lg:text-lg text-slate-600 max-w-md mb-8 leading-relaxed font-light"
            >
              Integrated pharmaceutical company delivering highly effective,
              affordable medicines. Debt-free & profit-making since{" "}
              <span className="text-[#f6b11b] font-medium">2008</span> — from
              Haridwar to the world.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <button
                onClick={handleCTA}
                className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-[#1fb8e5] to-[#f6b11b] text-slate-950 font-semibold text-sm tracking-wide overflow-hidden hover:shadow-2xl hover:shadow-[#1fb8e5]/30 transition-shadow duration-300"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Discover Rivpra
                  <svg
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-white/45 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </button>
              <button
                onClick={() =>
                  document
                    .querySelector("#contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="px-8 py-4 rounded-full border border-slate-300 text-slate-700 font-semibold text-sm tracking-wide hover:border-[#1fb8e5]/60 hover:text-slate-950 hover:bg-slate-50 transition-all duration-300"
              >
                Partner With Us
              </button>
            </div>
          </div>

          {/* ── Right Column — Tablet-In-Tablet Technology Image with Premium Floating & Glassmorphism ── */}
          <div className="relative w-full flex items-center justify-center p-4">
            
            {/* Ambient Animated Glows behind the card */}
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.6, 0.8, 0.6]
              }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-tr from-[#1fb8e5]/20 via-[#ddd82a]/10 to-[#f6b11b]/15 blur-3xl pointer-events-none -z-10"
            />

            {/* Main Floating Glassmorphic Container */}
            <motion.div
              animate={{ y: [0, -16, 0] }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative w-full rounded-[2rem] border border-white/50 bg-white/20 p-3 shadow-2xl backdrop-blur-md overflow-visible"
            >
              {/* Image wrap with skew reflections */}
              <div className="relative rounded-[1.5rem] overflow-hidden bg-slate-100 border border-slate-200">
                <Image
                  src="/tablet-in-tablet.jpg"
                  alt="India's First Tablet-In-Tablet Technology"
                  width={1000}
                  height={625}
                  priority
                  className="w-full h-auto object-cover rounded-[1.5rem]"
                />

                {/* Glossy Reflection Sweep */}
                <motion.div
                  className="absolute inset-0 w-[60%] h-full bg-gradient-to-r from-transparent via-white/50 to-transparent -skew-x-12 pointer-events-none"
                  initial={{ left: "-60%" }}
                  animate={{ left: "160%" }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatDelay: 3.5,
                    ease: "easeInOut",
                  }}
                />
              </div>

              {/* Parallax Floating Badge 1: Top-Left */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -left-4 z-20 rounded-2xl border border-white/60 bg-white/80 backdrop-blur-md px-4 py-2 shadow-lg text-slate-900 flex items-center gap-2"
              >
                <span className="h-2 w-2 rounded-full bg-[#1fb8e5] animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-wider">First in India</span>
              </motion.div>

              {/* Parallax Floating Badge 2: Bottom-Right */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -bottom-4 -right-4 z-20 rounded-2xl border border-white/60 bg-white/80 backdrop-blur-md px-4 py-2 shadow-lg text-slate-900 flex items-center gap-2"
              >
                <span className="h-2 w-2 rounded-full bg-[#f6b11b] animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-wider">WHO-cGMP Certified</span>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* ── Stats — Full width below both columns ── */}
        <div
          ref={statsRef}
          className="mt-8 lg:mt-12 grid grid-cols-2 gap-y-8 gap-x-4 sm:grid-cols-3 lg:grid-cols-6 pb-4 border-t border-slate-200 pt-8"
        >
          {[
            { value: "19+", label: "Years of Experience" },
            { value: "800+", label: "Product SKUs" },
            { value: "100+", label: "Clients" },
            { value: "600+", label: "Formulations" },
            { value: "15+", label: "Accreditations" },
            { value: "20+", label: "Global Markets Presence" },
          ].map((stat) => (
            <div 
              key={stat.label} 
              className="opacity-0 flex flex-col items-center lg:items-start text-center lg:text-left group"
            >
              <div className="text-4xl lg:text-5xl font-black bg-gradient-to-br from-slate-900 to-slate-600 bg-clip-text text-transparent mb-1.5 transition-transform duration-300 group-hover:scale-110 group-hover:from-[#1fb8e5] group-hover:to-[#f6b11b]">
                {stat.value}
              </div>
              <div className="text-slate-500 text-[10px] sm:text-xs tracking-widest uppercase font-bold leading-relaxed max-w-[120px] lg:max-w-none">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
