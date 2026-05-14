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
    <section className="relative z-10 w-full overflow-hidden border-y border-slate-200 bg-white py-10">
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
        <span className="mb-2 inline-block rounded-full border border-[#1fb8e5]/40 bg-[#1fb8e5]/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-[#f6b11b]">
          Our Clients
        </span>
        <p className="mt-2 text-sm font-light text-slate-500">
          Driving technology for leading brands
        </p>
      </div>

      {/* Marquee track */}
      <div className="relative overflow-hidden">
        {/* Fade + blur edges */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-40 bg-gradient-to-r from-white via-white/80 to-transparent backdrop-blur-none" style={{maskImage: 'linear-gradient(to right, white 40%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to right, white 40%, transparent 100%)'}} />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-40 bg-gradient-to-l from-white via-white/80 to-transparent" style={{maskImage: 'linear-gradient(to left, white 40%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to left, white 40%, transparent 100%)'}} />

        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
          className="flex gap-4 w-max"
        >
          {track.map((src, i) => {
            const accent = ["#1fb8e5","#f6b11b","#ddd82a","#f6b11b"][i % 4];
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
