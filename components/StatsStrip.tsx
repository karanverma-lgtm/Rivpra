"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const clients = [
  "/clients/client_image_1.jpg",
  "/clients/client_image_2.jpg",
  "/clients/client_image_3.jpg",
  "/clients/client_image_4.jpg",
  "/clients/client_image_5.jpg",
  "/clients/client_image_6.jpg",
  "/clients/client_image_7.jpg",
  "/clients/client_image_8.jpg",
  "/clients/client_image_9.jpg",
  "/clients/client_image_10.jpg",
];

// Duplicate for seamless infinite scroll
const track = [...clients, ...clients];

export default function StatsStrip() {
  return (
    <section className="relative z-10 overflow-hidden bg-[#0D0D0D] border-y border-white/[0.06] py-10">
      {/* Subtle dot pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Heading */}
      <div className="relative mb-8 text-center">
        <span className="mb-2 inline-block rounded-full border border-[#0583F2]/40 bg-[#0583F2]/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-[#1EB7D9]">
          Our Clients
        </span>
        <p className="mt-2 text-sm font-light text-white/40">
          Driving technology for leading brands
        </p>
      </div>

      {/* Marquee track */}
      <div className="relative overflow-hidden">
        {/* Fade + blur edges */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-40 bg-gradient-to-r from-[#0D0D0D] via-[#0D0D0D]/80 to-transparent backdrop-blur-none" style={{maskImage: 'linear-gradient(to right, black 40%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to right, black 40%, transparent 100%)'}} />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-40 bg-gradient-to-l from-[#0D0D0D] via-[#0D0D0D]/80 to-transparent" style={{maskImage: 'linear-gradient(to left, black 40%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to left, black 40%, transparent 100%)'}} />

        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
          className="flex gap-4 w-max"
        >
          {track.map((src, i) => {
            const accent = ["#0583F2","#1EB7D9","#D9CD2B","#F2A81D"][i % 4];
            return (
              <div
                key={i}
                className="relative flex items-center justify-center flex-shrink-0 rounded-full px-6 py-3 whitespace-nowrap"
                style={{
                  border: `1px solid ${accent}33`,
                  background: `${accent}0D`,
                  width: 200,
                  height: 80,
                }}
              >
                <Image
                  src={src}
                  alt={`Client ${(i % clients.length) + 1}`}
                  fill
                  className="object-contain rounded-full p-3"
                  sizes="200px"
                />
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
