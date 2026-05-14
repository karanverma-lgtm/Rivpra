"use client";

import { useEffect, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function ParticleField() {
  const mesh = useRef<THREE.Points>(null);
  const elapsed = useRef(0);
  const count = 3000;

  const { positions, colors } = useMemo(() => {
    const nextPositions = new Float32Array(count * 3);
    const nextColors = new Float32Array(count * 3);
    const palette = [
      new THREE.Color("#1fb8e5"),
      new THREE.Color("#f6b11b"),
      new THREE.Color("#ddd82a"),
    ];

    for (let i = 0; i < count; i++) {
      nextPositions[i * 3] = (seededRandom(i * 4 + 1) - 0.5) * 20;
      nextPositions[i * 3 + 1] = (seededRandom(i * 4 + 2) - 0.5) * 20;
      nextPositions[i * 3 + 2] = (seededRandom(i * 4 + 3) - 0.5) * 20;
      const c = palette[Math.floor(seededRandom(i * 4 + 4) * palette.length)];
      nextColors[i * 3] = c.r;
      nextColors[i * 3 + 1] = c.g;
      nextColors[i * 3 + 2] = c.b;
    }

    return { positions: nextPositions, colors: nextColors };
  }, [count]);

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

function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

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
    <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-white">
      {/* Three.js Particle Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
          <ambientLight intensity={0.5} />
          <ParticleField />
        </Canvas>
      </div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-white/60 via-transparent to-white" />
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-white/80 via-transparent to-white/40" />

      {/* Glow blob */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#1fb8e5]/10 rounded-full blur-[120px] z-10 pointer-events-none" />

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-8 pt-24">
        <div className="max-w-4xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#1fb8e5]/40 bg-[#1fb8e5]/10 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-[#f6b11b] animate-pulse" />
            <span className="text-[#f6b11b] text-xs font-semibold tracking-widest uppercase">
              ISO Certified · WHO-cGMP Compliant · Est. 2008
            </span>
          </motion.div>

          {/* Headline */}
          <h1
            ref={titleRef}
            className="opacity-0 text-5xl sm:text-6xl lg:text-8xl font-black text-slate-950 leading-[0.95] tracking-tight mb-6"
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
            className="opacity-0 text-lg lg:text-xl text-slate-600 max-w-2xl mb-10 leading-relaxed font-light"
          >
            Integrated pharmaceutical company delivering highly effective,
            affordable medicines. Debt-free & profit-making since{" "}
            <span className="text-[#f6b11b] font-medium">2008</span> — from
            Haridwar to the world.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 mb-20">
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

          {/* Stats */}
          <div
            ref={statsRef}
            className="grid grid-cols-3 sm:grid-cols-6 gap-6 pb-12 border-t border-slate-200 pt-8"
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
                <div className="text-3xl lg:text-4xl font-black text-slate-950 mb-1">
                  {stat.value}
                </div>
                <div className="text-slate-500 text-xs tracking-widest uppercase font-medium leading-tight">
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
        <span className="text-slate-400 text-xs tracking-widest uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-px h-12 bg-gradient-to-b from-[#1fb8e5] to-transparent"
        />
      </motion.div>
    </section>
  );
}
