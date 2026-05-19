"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

const accreditations = [
  "WHO-GMP",
  "ISO 9001-2015",
  "AIRP IVORY COAST",
  "PPB KENYA ACCREDITED",
  "NAFDAC NIGERIA",
  "MOH AFGHANISTAN",
  "FDA PHILIPPINES",
  "MOH AZERBAIJAN",
  "MOH CAMBODIA",
  "FDA VIETNAM",
  "MOH YEMEN",
  "MOH KAZAKHSTAN",
  "MOH IRAQ",
  "MOH KOSOVO",
  "EFDA ETHIOPIA",
];

const countries = [
  "Azerbaijan", "Bolivia", "Botswana", "Cambodia", "Dominican Republic",
  "Georgia", "Guatemala", "Kenya", "Kosovo", "Myanmar",
  "Nepal", "Nigeria", "Uzbekistan",
];

// All 24 badge images
const badgeImages = [
  "1-1-268x300.png","1-2-268x300.png","1-3-268x300.png","1-4-268x300.png",
  "1-5-268x300.png","1-6-268x300.png","1-7-268x300.png","1-8-268x300.png",
  "1-9-268x300.png","1-10-268x300.png","1-11.png","1-12.png",
  "1-13.png","1-14.png","1-15.png","1-16.png",
  "1-17.png","1-18.png","1-19.png","1-20.png",
  "1-21-268x300.png","1-22-268x300.png","1-23-268x300.png","1-24-268x300.png",
].map((f) => `/exports/${f}`);

// Two rows for the marquee — split evenly
const row1 = [...badgeImages.slice(0, 12), ...badgeImages.slice(0, 12)];
const row2 = [...badgeImages.slice(12), ...badgeImages.slice(12)];

const accentColors = ["#1fb8e5", "#f6b11b", "#ddd82a", "#f6b11b"];

export default function Exports() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="exports" className="relative w-full overflow-hidden bg-white py-12">
      {/* Grid bg */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
      {/* Glow blobs */}
      <div className="pointer-events-none absolute -left-40 top-1/3 h-96 w-96 rounded-full bg-[#1fb8e5]/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 bottom-1/3 h-96 w-96 rounded-full bg-[#f6b11b]/8 blur-[100px]" />

      <div ref={ref} className="relative mx-auto max-w-7xl px-6 lg:px-8">

        {/* ── Header ── */}
        <div className="mb-16 grid gap-10 lg:grid-cols-2 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="mb-4 inline-block rounded-full border border-[#1fb8e5]/40 bg-[#1fb8e5]/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-[#f6b11b]">
              Global Reach
            </span>
            <h2 className="mb-6 text-4xl font-black leading-tight text-slate-950 lg:text-6xl">
              Our{" "}
              <span className="bg-gradient-to-r from-[#1fb8e5] to-[#f6b11b] bg-clip-text text-transparent">
                Exports
              </span>
            </h2>
            <p className="text-sm font-light leading-relaxed text-slate-600 lg:text-base">
              Having spread our wings in the domestic market, we aim high to
              provide accessible healthcare to people around the globe. We are
              rapidly expanding in{" "}
              <span className="font-medium text-slate-950">
                Asia, Africa, Latin America, and European countries
              </span>{" "}
              and have many accreditations to our credit.
            </p>
          </motion.div>

          {/* Country pills */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="flex flex-wrap content-start gap-2"
          >
            <p className="mb-2 w-full text-xs font-medium uppercase tracking-widest text-slate-400">
              Countries We Serve
            </p>
            {countries.map((c, i) => (
              <span
                key={c}
                className="rounded-full border px-3 py-1 text-xs font-medium"
                style={{
                  borderColor: `${accentColors[i % 4]}40`,
                  color: accentColors[i % 4],
                  background: `${accentColors[i % 4]}0D`,
                }}
              >
                {c}
              </span>
            ))}
            <span className="rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-500">
              & many more…
            </span>
          </motion.div>
        </div>

        {/* ── Global Footprints Heading ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-10 text-center"
        >
          <h3 className="text-2xl font-black text-slate-950 lg:text-3xl">
            Our{" "}
            <span className="bg-gradient-to-r from-[#ddd82a] to-[#f6b11b] bg-clip-text text-transparent">
              Global Footprints
            </span>
          </h3>
          <p className="mx-auto mt-3 max-w-lg text-sm text-slate-500 leading-relaxed">
            We are expanding our operations across the globe &amp; attained the
            following accreditations
          </p>
        </motion.div>

        {/* ── Accreditation text pills scroll ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="relative mb-10 overflow-hidden"
        >
          <div
            className="pointer-events-none absolute left-0 top-0 z-10 h-full w-28"
            style={{ background: "linear-gradient(to right,#ffffff 40%,transparent)" }}
          />
          <div
            className="pointer-events-none absolute right-0 top-0 z-10 h-full w-28"
            style={{ background: "linear-gradient(to left,#ffffff 40%,transparent)" }}
          />
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, duration: 22, ease: "linear" }}
            className="flex gap-3 w-max"
          >
            {[...accreditations, ...accreditations].map((acc, i) => {
              const color = accentColors[i % 4];
              return (
                <span
                  key={i}
                  className="flex-shrink-0 rounded-full px-5 py-2 text-xs font-semibold whitespace-nowrap"
                  style={{
                    border: `1px solid ${color}40`,
                    background: `${color}12`,
                    color,
                  }}
                >
                  {acc}
                </span>
              );
            })}
          </motion.div>
        </motion.div>

        {/* ── Badge image marquees (two rows) ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col gap-4"
        >
          {/* Row 1 — scroll right */}
          <div className="relative overflow-hidden">
            <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-28" style={{ background: "linear-gradient(to right,#ffffff 30%,transparent)" }} />
            <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-28" style={{ background: "linear-gradient(to left,#ffffff 30%,transparent)" }} />
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, duration: 35, ease: "linear" }}
              className="flex gap-4 w-max"
            >
              {row1.map((src, i) => (
                <div
                  key={i}
                  className="group relative h-28 w-28 flex-shrink-0 overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:border-[#1fb8e5]/40 hover:bg-slate-50"
                >
                  <Image
                    src={src}
                    alt={`Accreditation ${(i % 12) + 1}`}
                    fill
                    className="object-contain p-3 transition-transform duration-500 group-hover:scale-110"
                    sizes="112px"
                  />
                </div>
              ))}
            </motion.div>
          </div>

          {/* Row 2 — scroll left (reverse) */}
          <div className="relative overflow-hidden">
            <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-28" style={{ background: "linear-gradient(to right,#ffffff 30%,transparent)" }} />
            <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-28" style={{ background: "linear-gradient(to left,#ffffff 30%,transparent)" }} />
            <motion.div
              animate={{ x: ["-50%", "0%"] }}
              transition={{ repeat: Infinity, duration: 35, ease: "linear" }}
              className="flex gap-4 w-max"
            >
              {row2.map((src, i) => (
                <div
                  key={i}
                  className="group relative h-28 w-28 flex-shrink-0 overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:border-[#f6b11b]/40 hover:bg-slate-50"
                >
                  <Image
                    src={src}
                    alt={`Accreditation ${(i % 12) + 13}`}
                    fill
                    className="object-contain p-3 transition-transform duration-500 group-hover:scale-110"
                    sizes="112px"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
