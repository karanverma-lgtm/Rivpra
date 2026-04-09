"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

const capabilities = [
  {
    label: "Tablet Section",
    value: "374.50 Million Tablets",
    color: "#0583F2",
  },
  {
    label: "Capsule Section",
    value: "46.80 Million Capsules",
    color: "#1EB7D9",
  },
  {
    label: "Liquid Section",
    value: "15.60 Million Bottles",
    color: "#D9CD2B",
  },
  {
    label: "Sachet Section",
    value: "3.12 Million Sachets",
    color: "#F2A81D",
  },
  {
    label: "Dry Powder Suspension",
    value: "4.68 Million Bottles",
    color: "#0583F2",
  },
  {
    label: "Tubes Section",
    value: "5.0 Million Tubes",
    color: "#1EB7D9",
  },
  {
    label: "Lotion Section",
    value: "1.0 Million Bottles",
    color: "#D9CD2B",
  },
];

const images = Array.from(
  { length: 14 },
  (_, i) => `/Unit/infrastructure_${i + 1}.jpg`
);
const track = [...images, ...images];

export default function ManufacturingUnit() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="manufacturing"
      className="relative overflow-hidden bg-[#080808] py-28"
    >
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
      <div className="pointer-events-none absolute -left-40 top-1/4 h-96 w-96 rounded-full bg-[#0583F2]/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 bottom-1/4 h-96 w-96 rounded-full bg-[#1EB7D9]/8 blur-[100px]" />

      <div ref={ref} className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="mb-4 inline-block rounded-full border border-[#0583F2]/40 bg-[#0583F2]/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-[#1EB7D9]">
            Manufacturing
          </span>
          <h2 className="mb-3 text-4xl font-black text-white lg:text-6xl">
            We are committed to delivering{" "}
            <span className="bg-gradient-to-r from-[#0583F2] to-[#1EB7D9] bg-clip-text text-transparent">
              quality products
            </span>
          </h2>
          <p className="mt-2 text-base font-semibold text-[#F2A81D]">
            Best Contract Manufacturing Pharmaceutical Company in India
          </p>
        </motion.div>

        {/* ── Two-column body ── */}
        <div className="mb-20 grid gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left — description */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex flex-col gap-5"
          >
            <p className="text-sm font-light leading-relaxed text-white/60 lg:text-base">
              Our Ultra-modern facility at{" "}
              <span className="font-medium text-white">SIDCUL, Haridwar</span>{" "}
              complies with the{" "}
              <span className="font-medium text-[#1EB7D9]">WHO-cGMP &amp; GMP</span>{" "}
              standards and is spread over a{" "}
              <span className="font-medium text-white">3600 sq. area</span>. We
              have collaborated with the best API manufacturers and are equipped
              with the latest machinery to ensure timely deliveries and superior
              quality of products that have helped us to reinforce our position
              in the field of pharmaceuticals. We have got the best Air handling
              unit in the whole of Uttarakhand.
            </p>
            <p className="text-sm font-light leading-relaxed text-white/50 lg:text-base">
              Our people are constantly being upgraded with the technical
              know-how and latest breakthroughs in the pharma industry so as to
              implement high-quality systems across our manufacturing facilities
              thus ensuring consistent quality and efficacy of our products.
            </p>

            {/* Badge row */}
            <div className="flex flex-wrap gap-3 pt-2">
              {["WHO-cGMP", "GMP Certified", "ISO 9001:2015", "SIDCUL Haridwar", "In-House Testing"].map(
                (b) => (
                  <span
                    key={b}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs font-medium text-white/60"
                  >
                    {b}
                  </span>
                )
              )}
            </div>
          </motion.div>

          {/* Right — capabilities */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h3 className="mb-6 text-lg font-bold text-white">
              Our Capabilities{" "}
              <span className="text-xs font-normal text-white/40">
                (per shift per annum)
              </span>
            </h3>

            {/* Capability rows */}
            <div className="flex flex-col gap-3">
              {/* Top non-capacity items */}
              {[
                "Ultra-modern facility as per GMP standards spread over 3600 sq. area",
                "World-class machinery with high production plant capacity",
                "In-house product testing",
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.06 }}
                  className="flex items-start gap-3"
                >
                  <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#0583F2]" />
                  <span className="text-sm text-white/60">{item}</span>
                </motion.div>
              ))}

              {/* Capacity cards */}
              <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
                {capabilities.map((cap, i) => (
                  <motion.div
                    key={cap.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.5 + i * 0.07 }}
                    className="group rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 transition-all duration-300 hover:border-white/15 hover:bg-white/[0.05]"
                  >
                    {/* accent top bar */}
                    <div
                      className="mb-2 h-0.5 w-6 rounded-full"
                      style={{ background: cap.color }}
                    />
                    <div
                      className="text-base font-black leading-tight"
                      style={{ color: cap.color }}
                    >
                      {cap.value}
                    </div>
                    <div className="mt-1 text-[10px] font-medium uppercase tracking-wider text-white/40">
                      {cap.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Image Marquee ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="mb-5 text-xs font-medium uppercase tracking-widest text-white/30">
            Our Facility
          </p>

          <div className="relative overflow-hidden">
            {/* Fade edges */}
            <div
              className="pointer-events-none absolute left-0 top-0 z-10 h-full w-32 from-[#080808] to-transparent"
              style={{
                background: "linear-gradient(to right, #080808 40%, transparent)",
              }}
            />
            <div
              className="pointer-events-none absolute right-0 top-0 z-10 h-full w-32"
              style={{
                background: "linear-gradient(to left, #080808 40%, transparent)",
              }}
            />

            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
              className="flex gap-4 w-max"
            >
              {track.map((src, i) => (
                <div
                  key={i}
                  className="group relative h-52 w-80 flex-shrink-0 overflow-hidden rounded-2xl border border-white/10"
                >
                  <Image
                    src={src}
                    alt={`Rivpra facility ${(i % 14) + 1}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="320px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/60 via-transparent to-transparent" />
                  <div className="absolute inset-0 bg-[#0583F2]/0 transition-colors duration-500 group-hover:bg-[#0583F2]/10" />
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
