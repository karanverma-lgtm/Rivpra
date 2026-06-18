"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";

const heroWords = ["Reliable", "Trusted", "Innovative", "ISO-Certified"];

const tabletInTabletBenefits = [
  {
    title: "Prevents Degradation",
    desc: "Isolates active ingredients to prevent drug degradation in the gastric environment."
  },
  {
    title: "Taste & Odor Masking",
    desc: "Conceals the bitter and unpleasant taste and odor of therapeutic compounds."
  },
  {
    title: "Rapid Onset of Action",
    desc: "Provides initial outer drug release for quick therapeutic onset."
  },
  {
    title: "Superior Stability",
    desc: "Eliminates layer separation issues commonly found in traditional bilayer tablets."
  },
  {
    title: "Differential Coating",
    desc: "Applies independent film coating and granulation technologies for each drug."
  },
  {
    title: "High Dose Accuracy",
    desc: "Achieves significantly higher weight variation accuracy compared to bilayer technology."
  }
];

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

          {/* ── Right Column — Glassmorphism Tablet-In-Tablet Technology Showcase ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative hidden lg:block"
          >
            {/* Glow behind card */}
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-[#1fb8e5]/20 via-[#f6b11b]/10 to-[#ddd82a]/10 blur-2xl" />

            {/* Premium Dark Glassmorphism card */}
            <div className="relative rounded-3xl border border-slate-800 bg-slate-950 p-6 sm:p-7 shadow-2xl overflow-hidden text-white">
              {/* Decorative corner blur */}
              <div className="absolute right-0 top-0 w-48 h-48 bg-[#1fb8e5]/10 rounded-full blur-3xl pointer-events-none" />
              
              {/* Top gradient bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#1fb8e5] via-[#f6b11b] to-[#ddd82a]" />

              <div className="relative z-10">
                {/* Header */}
                <div className="mb-5">
                  <span className="inline-block px-2.5 py-1 rounded-md bg-[#1fb8e5]/10 border border-[#1fb8e5]/30 text-[#1fb8e5] text-[10px] font-bold tracking-wider uppercase mb-3">
                    Advanced Drug Delivery
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black mb-3 leading-tight">
                    India's First <span className="text-transparent bg-gradient-to-r from-[#1fb8e5] to-[#f6b11b] bg-clip-text">Tablet-In-Tablet</span> Technology
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm font-light leading-relaxed">
                    Our proprietary core-in-cup technology allows multiple incompatible active ingredients to be combined safely within a single compact dose, preventing chemical cross-interaction.
                  </p>
                </div>

                {/* Benefits Grid */}
                <div className="grid grid-cols-2 gap-3 mb-5">
                  {tabletInTabletBenefits.map((benefit) => (
                    <div 
                      key={benefit.title} 
                      className="p-3 rounded-xl bg-slate-900/40 border border-slate-800/80 hover:border-[#1fb8e5]/40 transition-all duration-300 group/item"
                    >
                      <h4 className="text-slate-200 font-bold text-xs flex items-center gap-1.5 group-hover/item:text-[#1fb8e5] transition-colors">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#1fb8e5] flex-shrink-0" />
                        {benefit.title}
                      </h4>
                      <p className="text-slate-400 text-[10px] font-light mt-1 leading-normal">
                        {benefit.desc}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Footer highlights */}
                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <svg viewBox="0 0 24 24" className="w-4 h-4 flex-shrink-0 drop-shadow text-[#1fb8e5]">
                      <defs>
                        <linearGradient id="microGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#7dd3fc" />
                          <stop offset="100%" stopColor="#0284c7" />
                        </linearGradient>
                      </defs>
                      <path d="M5 20h14v2H5zm11-4.7L13 13V8h2V6h-6v2h2v5l-3 2.3V18h8z" fill="url(#microGrad)" />
                      <path d="M7 6c0-2.2 1.8-4 4-4s4 1.8 4 4" fill="none" stroke="url(#microGrad)" strokeWidth="1.5" />
                    </svg>
                    In-House Formulation & Dev
                  </span>
                  <span className="flex items-center gap-1.5">
                    <svg viewBox="0 0 24 24" className="w-4 h-4 flex-shrink-0 drop-shadow text-[#f6b11b]">
                      <defs>
                        <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#fef08a" />
                          <stop offset="100%" stopColor="#ca8a04" />
                        </linearGradient>
                      </defs>
                      <path d="M12 2C6.5 2 3 5 3 10c0 5.5 4.5 10 9 12 4.5-2 9-6.5 9-12 0-5-3.5-8-9-8zm0 17.8c-3.3-1.4-6.8-5-6.8-9.8 0-3.6 2.2-5.8 6.8-5.8s6.8 2.2 6.8 5.8c0 4.8-3.5 8.4-6.8 9.8z" fill="url(#shieldGrad)" />
                    </svg>
                    DCGI Approved Ranges
                  </span>
                </div>
              </div>
            </div>

            {/* Floating badge — bottom right */}
            <div className="absolute -bottom-3 -right-2 lg:right-4 flex items-center gap-2 rounded-full border border-slate-800 bg-slate-950 px-4 py-2 shadow-lg z-10">
              <span className="h-2 w-2 rounded-full bg-[#f6b11b] animate-pulse" />
              <span className="text-xs font-semibold tracking-wider text-[#f6b11b]">
                WHO-cGMP Certified
              </span>
            </div>
          </motion.div>
        </div>

        {/* ── Stats — Full width below both columns ── */}
        <div
          ref={statsRef}
          className="mt-8 lg:mt-12 grid grid-cols-2 gap-y-8 gap-x-4 sm:grid-cols-3 lg:grid-cols-6 pb-4 border-t border-slate-200 pt-8"
        >
          {[
            { value: "13+", label: "Years of Experience" },
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
