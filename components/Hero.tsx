"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function ParticleField() {
  const mesh = useRef<THREE.Points>(null);
  const elapsed = useRef(0);
  const count = 3000;

  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  const palette = [
    new THREE.Color("#0583F2"),
    new THREE.Color("#1EB7D9"),
    new THREE.Color("#D9CD2B"),
    new THREE.Color("#F2A81D"),
  ];

  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    const c = palette[Math.floor(Math.random() * palette.length)];
    colors[i * 3] = c.r;
    colors[i * 3 + 1] = c.g;
    colors[i * 3 + 2] = c.b;
  }

  useFrame((_state, delta) => {
    elapsed.current += delta;
    if (mesh.current) {
      mesh.current.rotation.y = elapsed.current * 0.04;
      mesh.current.rotation.x = Math.sin(elapsed.current * 0.02) * 0.1;
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
      />
    </points>
  );
}

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
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.6, ease: "power3.out" },
        "-=0.4"
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0D0D0D]">
      {/* Three.js Particle Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
          <ambientLight intensity={0.5} />
          <ParticleField />
        </Canvas>
      </div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#0D0D0D]/60 via-transparent to-[#0D0D0D]" />
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#0D0D0D]/80 via-transparent to-[#0D0D0D]/40" />

      {/* Glow blob */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#0583F2]/10 rounded-full blur-[120px] z-10 pointer-events-none" />

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-8 pt-24">
        <div className="max-w-4xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#0583F2]/40 bg-[#0583F2]/10 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-[#1EB7D9] animate-pulse" />
            <span className="text-[#1EB7D9] text-xs font-semibold tracking-widest uppercase">
              ISO Certified · WHO-cGMP Compliant · Est. 2008
            </span>
          </motion.div>

          {/* Headline */}
          <h1
            ref={titleRef}
            className="opacity-0 text-5xl sm:text-6xl lg:text-8xl font-black text-white leading-[0.95] tracking-tight mb-6"
          >
            A{" "}
            <span
              ref={wordRef}
              className="inline-block bg-gradient-to-r from-[#0583F2] via-[#1EB7D9] to-[#0583F2] bg-clip-text text-transparent bg-[length:200%_100%] animate-gradient-shift"
            >
              Trusted
            </span>
            <br />
            Healthcare
            <br />
            <span className="text-white/40">Partner</span>
          </h1>

          {/* Subtext */}
          <p
            ref={subtitleRef}
            className="opacity-0 text-lg lg:text-xl text-white/60 max-w-2xl mb-10 leading-relaxed font-light"
          >
            Integrated pharmaceutical company delivering highly effective,
            affordable medicines. Debt-free & profit-making since{" "}
            <span className="text-[#F2A81D] font-medium">2008</span> — from
            Haridwar to the world.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 mb-20">
            <button
              onClick={handleCTA}
              className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-[#0583F2] to-[#1EB7D9] text-white font-semibold text-sm tracking-wide overflow-hidden hover:shadow-2xl hover:shadow-[#0583F2]/30 transition-shadow duration-300"
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
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
            <button
              onClick={() =>
                document
                  .querySelector("#contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="px-8 py-4 rounded-full border border-white/20 text-white/80 font-semibold text-sm tracking-wide hover:border-[#0583F2]/60 hover:text-white hover:bg-white/5 transition-all duration-300"
            >
              Partner With Us
            </button>
          </div>

          {/* Stats */}
          <div
            ref={statsRef}
            className="grid grid-cols-3 sm:grid-cols-6 gap-6 pb-12 border-t border-white/10 pt-8"
          >
            {[
              { value: "13+", label: "Years of Experience" },
              { value: "800+", label: "Product SKUs" },
              { value: "100+", label: "Clients" },
              { value: "600+", label: "Formulations" },
              { value: "15+", label: "Accreditations" },
              { value: "20+", label: "Global Markets Presence" },
            ].map((stat) => (
              <div key={stat.label} className="opacity-0">
                <div className="text-3xl lg:text-4xl font-black text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-white/40 text-xs tracking-widest uppercase font-medium leading-tight">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-white/30 text-xs tracking-widest uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-px h-12 bg-gradient-to-b from-[#0583F2] to-transparent"
        />
      </motion.div>
    </section>
  );
}
