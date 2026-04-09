"use client";

import { useRef, useMemo } from "react";
import { motion, useInView } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";

// ── DNA Double Helix ─────────────────────────────────────────────────────────
function DNAHelix() {
  const groupRef = useRef<THREE.Group>(null);
  const elapsed = useRef(0);

  const { strand1, strand2, rungPairs, atomsA, atomsB } = useMemo(() => {
    const turns = 3;
    const ppt = 14; // points per turn
    const total = turns * ppt;
    const R = 1.5;
    const H = 9;

    const s1: THREE.Vector3[] = [];
    const s2: THREE.Vector3[] = [];
    const rungPairs: [THREE.Vector3, THREE.Vector3][] = [];

    for (let i = 0; i <= total; i++) {
      const t = (i / total) * turns * Math.PI * 2;
      const y = (i / total) * H - H / 2;
      s1.push(new THREE.Vector3(R * Math.cos(t), y, R * Math.sin(t)));
      s2.push(new THREE.Vector3(R * Math.cos(t + Math.PI), y, R * Math.sin(t + Math.PI)));
      if (i % 4 === 0) {
        rungPairs.push([
          new THREE.Vector3(R * Math.cos(t), y, R * Math.sin(t)),
          new THREE.Vector3(R * Math.cos(t + Math.PI), y, R * Math.sin(t + Math.PI)),
        ]);
      }
    }

    // Atoms: every 2nd point on each strand
    const atomsA = s1.filter((_, i) => i % 2 === 0);
    const atomsB = s2.filter((_, i) => i % 2 === 0);

    return { strand1: s1, strand2: s2, rungPairs, atomsA, atomsB };
  }, []);

  useFrame((_state, delta) => {
    elapsed.current += delta;
    if (groupRef.current) {
      groupRef.current.rotation.y = elapsed.current * 0.22;
      groupRef.current.rotation.x = Math.sin(elapsed.current * 0.12) * 0.08;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Strand 1 — blue */}
      <Line points={strand1} color="#0583F2" lineWidth={2.5} />
      {/* Strand 2 — teal */}
      <Line points={strand2} color="#1EB7D9" lineWidth={2.5} />

      {/* Rungs — yellow */}
      {rungPairs.map((pair, i) => (
        <Line key={i} points={pair} color="#D9CD2B" lineWidth={1.2} opacity={0.6} transparent />
      ))}

      {/* Atoms on strand 1 */}
      {atomsA.map((pos, i) => (
        <mesh key={`a1-${i}`} position={pos}>
          <sphereGeometry args={[0.09, 12, 12]} />
          <meshStandardMaterial color="#0583F2" emissive="#0583F2" emissiveIntensity={1.2} />
        </mesh>
      ))}

      {/* Atoms on strand 2 */}
      {atomsB.map((pos, i) => (
        <mesh key={`a2-${i}`} position={pos}>
          <sphereGeometry args={[0.09, 12, 12]} />
          <meshStandardMaterial color="#1EB7D9" emissive="#1EB7D9" emissiveIntensity={1.2} />
        </mesh>
      ))}

      {/* Rung endpoint atoms — amber / yellow */}
      {rungPairs.map(([a, b], i) => (
        <group key={`rp-${i}`}>
          <mesh position={a}>
            <sphereGeometry args={[0.13, 12, 12]} />
            <meshStandardMaterial color="#F2A81D" emissive="#F2A81D" emissiveIntensity={1} />
          </mesh>
          <mesh position={b}>
            <sphereGeometry args={[0.13, 12, 12]} />
            <meshStandardMaterial color="#D9CD2B" emissive="#D9CD2B" emissiveIntensity={1} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
export default function Welcome() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="welcome"
      className="relative py-28 bg-[#0D0D0D] overflow-hidden"
    >
      {/* 3D DNA Helix Background */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-25">
        <Canvas
          camera={{ position: [0, 0, 7], fov: 55 }}
          dpr={[1, 1.5]}
          gl={{ alpha: true, antialias: true }}
        >
          <ambientLight intensity={0.4} />
          <pointLight position={[5, 5, 5]} intensity={1.5} color="#0583F2" />
          <pointLight position={[-5, -5, 5]} intensity={1} color="#1EB7D9" />
          <DNAHelix />
        </Canvas>
      </div>

      {/* Ambient glow left */}
      <div className="pointer-events-none absolute -left-48 top-1/3 h-[500px] w-[500px] rounded-full bg-[#0583F2]/10 blur-[120px] z-[1]" />
      {/* Ambient glow right */}
      <div className="pointer-events-none absolute -right-48 bottom-0 h-[400px] w-[400px] rounded-full bg-[#1EB7D9]/8 blur-[100px] z-[1]" />

      <div
        ref={ref}
        className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8"
      >
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          {/* ── Left Column ── */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            {/* Label badge */}
            <span className="mb-5 inline-block rounded-full border border-[#0583F2]/40 bg-[#0583F2]/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[#1EB7D9]">
              Welcome to Rivpra Formulation
            </span>

            <h2 className="mb-6 text-4xl font-black leading-tight text-white lg:text-5xl">
              A Trusted, Reliable
              <br />
              <span className="bg-gradient-to-r from-[#0583F2] to-[#1EB7D9] bg-clip-text text-transparent">
                Healthcare Partner
              </span>
            </h2>

            <p className="mb-5 text-base font-light leading-relaxed text-white/70 lg:text-lg">
              Rivpra Formulation is an integrated pharmaceutical company with
              core competency in the development and manufacture of highly
              effective and affordable medicines to treat various ailments and
              diseases.
            </p>

            <p className="mb-10 text-sm font-light leading-relaxed text-white/50 lg:text-base">
              Established in{" "}
              <span className="font-medium text-[#F2A81D]">2008</span>, Rivpra
              Formulations is a{" "}
              <span className="font-medium text-white">
                debt-free, profit-making
              </span>{" "}
              ISO-certified pharmaceutical company with a state-of-the-art
              infrastructure set up in compliance with{" "}
              <span className="font-medium text-white">WHO-cGMP</span>{" "}
              standards.
            </p>

            {/* CTA */}
            <motion.a
              href="#about"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#0583F2] to-[#1EB7D9] px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#0583F2]/30 transition-shadow hover:shadow-[#0583F2]/50"
            >
              View More
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </motion.a>
          </motion.div>

          {/* ── Right Column — YouTube Embed ── */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            className="relative"
          >
            {/* Glow behind video */}
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-[#0583F2]/20 to-[#1EB7D9]/10 blur-2xl" />

            {/* Video wrapper — 16:9 */}
            <div className="relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/60">
              {/* corner accent */}
              <div className="absolute left-0 top-0 h-12 w-12 rounded-br-2xl bg-gradient-to-br from-[#0583F2] to-[#1EB7D9] opacity-80" />

              <div className="relative aspect-video w-full">
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src="https://www.youtube.com/embed/AHv8a6qmiz8?rel=0&modestbranding=1"
                  title="Rivpra Formulations"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>

            {/* ISO badge */}
            <div className="absolute -bottom-4 -right-4 flex items-center gap-2 rounded-full border border-[#D9CD2B]/40 bg-[#0D0D0D] px-4 py-2 shadow-xl">
              <span className="h-2 w-2 rounded-full bg-[#D9CD2B]" />
              <span className="text-xs font-semibold tracking-wider text-[#D9CD2B]">
                ISO CERTIFIED · WHO-cGMP
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
