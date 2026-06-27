"use client";

import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Center } from "@react-three/drei";
import * as THREE from "three";

// ── 3D Tablet Scene Component ────────────────────────────────────────────────
interface TabletSceneProps {
  progress: number; // 0.0 to 1.0
  autoPlay: boolean;
}

function TabletScene({ progress, autoPlay }: TabletSceneProps) {
  const groupRef = useRef<THREE.Group>(null);
  const taurineRef = useRef<THREE.Mesh>(null);
  const nacRef = useRef<THREE.Mesh>(null);
  const leftHalfRef = useRef<THREE.Mesh>(null);
  const rightHalfRef = useRef<THREE.Mesh>(null);
  const innerCoreRef = useRef<THREE.Mesh>(null);

  const localTime = useRef(0);

  useFrame((state, delta) => {
    localTime.current += delta;
    
    // Slow auto-rotation of the entire group for depth perception
    if (groupRef.current) {
      groupRef.current.rotation.y = localTime.current * 0.25;
      groupRef.current.rotation.x = Math.sin(localTime.current * 0.15) * 0.15;
    }

    let p = progress;
    if (autoPlay) {
      // Create a 9-second looping lifecycle:
      // 0s - 2.5s: phase 0 (Separate & Float)
      // 2.5s - 4.5s: phase 1 (Assemble / Slide together)
      // 4.5s - 7.5s: phase 2 (Reveal inside / split open)
      // 7.5s - 9.0s: phase 3 (Re-combine & Separate)
      const t = (localTime.current % 9) / 9;
      if (t < 0.28) {
        // Separate (p = 0)
        p = 0;
      } else if (t >= 0.28 && t < 0.45) {
        // Linear transition from separate to assembled (p: 0 -> 0.5)
        const factor = (t - 0.28) / (0.45 - 0.28);
        p = factor * 0.5;
      } else if (t >= 0.45 && t < 0.52) {
        // Keep assembled (p = 0.5)
        p = 0.5;
      } else if (t >= 0.52 && t < 0.68) {
        // Transition from assembled to cutaway (p: 0.5 -> 1.0)
        const factor = (t - 0.52) / (0.68 - 0.52);
        p = 0.5 + factor * 0.5;
      } else if (t >= 0.68 && t < 0.85) {
        // Keep cutaway (p = 1.0)
        p = 1.0;
      } else {
        // Quick slide back and split (p: 1.0 -> 0.0)
        const factor = (t - 0.85) / (0.9 - 0.85);
        p = factor < 0.5 ? 1.0 - factor * 2 * 0.5 : 0.0;
      }
    }

    // Now map 'p' (0 to 1) to positions and visibilities
    // - p: 0.0 to 0.5 -> Separate to Assembled
    // - p: 0.5 to 1.0 -> Assembled to Cutaway/Split
    
    if (p < 0.5) {
      // Phase A: Merging
      // Map p (0 -> 0.5) to a scale (0 -> 1)
      const tMerge = p / 0.5;
      const ease = THREE.MathUtils.lerp;

      // Show whole tablets, hide cutaway halves
      if (taurineRef.current) {
        taurineRef.current.visible = true;
        taurineRef.current.position.set(ease(-2.2, 0, tMerge), 0, 0);
        // Fade opacity as it gets close and transitions to cutaway
        const mat = taurineRef.current.material as THREE.MeshStandardMaterial;
        mat.opacity = tMerge > 0.95 ? 0 : 1;
        mat.transparent = tMerge > 0.95;
      }
      if (nacRef.current) {
        nacRef.current.visible = true;
        nacRef.current.position.set(ease(2.2, 0, tMerge), 0, 0);
        const mat = nacRef.current.material as THREE.MeshStandardMaterial;
        mat.opacity = tMerge > 0.95 ? 0 : 1;
        mat.transparent = tMerge > 0.95;
      }

      if (leftHalfRef.current) leftHalfRef.current.visible = false;
      if (rightHalfRef.current) rightHalfRef.current.visible = false;
      if (innerCoreRef.current) innerCoreRef.current.visible = false;
      
    } else {
      // Phase B: Cutaway / Splitting
      // Map p (0.5 -> 1.0) to a scale (0 -> 1)
      const tSplit = (p - 0.5) / 0.5;
      const ease = THREE.MathUtils.lerp;

      // Hide whole tablets, show cutaway parts
      if (taurineRef.current) taurineRef.current.visible = false;
      if (nacRef.current) nacRef.current.visible = false;

      if (leftHalfRef.current) {
        leftHalfRef.current.visible = true;
        // Slide left half out
        leftHalfRef.current.position.set(ease(0, -0.7, tSplit), 0, 0);
      }
      if (rightHalfRef.current) {
        rightHalfRef.current.visible = true;
        // Slide right half out
        rightHalfRef.current.position.set(ease(0, 0.7, tSplit), 0, 0);
      }
      if (innerCoreRef.current) {
        innerCoreRef.current.visible = true;
        // Keep core in center
        innerCoreRef.current.position.set(0, 0, 0);
        // Give the core a nice subtle pulse glow when revealed
        const mat = innerCoreRef.current.material as THREE.MeshStandardMaterial;
        mat.emissiveIntensity = 0.3 + Math.sin(localTime.current * 4) * 0.15;
      }
    }
  });

  return (
    <group>
      {/* Lights inside the scene */}
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 5]} intensity={1.8} color="#fff" />
      <pointLight position={[-5, 3, 2]} intensity={0.8} color="#1fb8e5" />
      <pointLight position={[0, -5, 2]} intensity={1} color="#f6b11b" />

      {/* 1. Taurine (Orange Tablet) */}
      <mesh ref={taurineRef}>
        <cylinderGeometry args={[0.9, 0.9, 0.35, 32]} />
        <meshStandardMaterial 
          color="#f97316" 
          roughness={0.2} 
          metalness={0.1}
        />
      </mesh>

      {/* 2. N-Acetylcysteine (Red Core Tablet) */}
      <mesh ref={nacRef}>
        <cylinderGeometry args={[0.35, 0.35, 0.2, 32]} />
        <meshStandardMaterial 
          color="#dc2626" 
          roughness={0.2} 
          metalness={0.1}
        />
      </mesh>

      {/* 3. Combined Tablet-In-Tablet */}
      <group>
        {/* Cutaway: Left Half (Taurine Outer) */}
        <mesh ref={leftHalfRef}>
          <cylinderGeometry args={[0.9, 0.9, 0.35, 32, 1, false, Math.PI / 2, Math.PI]} />
          <meshStandardMaterial
            color="#f97316"
            roughness={0.2}
            metalness={0.1}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Cutaway: Right Half (Taurine Outer) */}
        <mesh ref={rightHalfRef}>
          <cylinderGeometry args={[0.9, 0.9, 0.35, 32, 1, false, -Math.PI / 2, Math.PI]} />
          <meshStandardMaterial
            color="#f97316"
            roughness={0.2}
            metalness={0.1}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Cutaway: Inner Red Core (Revealed) */}
        <mesh ref={innerCoreRef}>
          <cylinderGeometry args={[0.35, 0.35, 0.2, 32]} />
          <meshStandardMaterial
            color="#dc2626"
            roughness={0.1}
            metalness={0.2}
            emissive="#dc2626"
            emissiveIntensity={0.3}
          />
        </mesh>
      </group>
    </group>
  );
}

// ── Main Showcase Component ──────────────────────────────────────────────────
export default function TabletInTabletShowcase() {
  const [progress, setProgress] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  // Monitor auto-play state for UI text updating
  const [activePhase, setActivePhase] = useState(0);

  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      const time = Date.now() / 1000;
      const t = (time % 9) / 9;
      if (t < 0.28) {
        setActivePhase(0); // Separated
      } else if (t >= 0.28 && t < 0.52) {
        setActivePhase(1); // Assembling / Assembled
      } else if (t >= 0.52 && t < 0.85) {
        setActivePhase(2); // Cutaway Reveal
      } else {
        setActivePhase(3); // Resetting
      }
    }, 100);

    return () => clearInterval(interval);
  }, [autoPlay]);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAutoPlay(false);
    const val = parseFloat(e.target.value);
    setProgress(val);
    if (val < 0.2) {
      setActivePhase(0);
    } else if (val >= 0.2 && val < 0.7) {
      setActivePhase(1);
    } else {
      setActivePhase(2);
    }
  };

  const getPhaseName = () => {
    switch (activePhase) {
      case 0:
        return "1. Separate Components";
      case 1:
        return "2. Assembly / Fusion";
      case 2:
        return "3. Revealed Cut-Section";
      default:
        return "Assembled Formulation";
    }
  };

  const getPhaseDesc = () => {
    switch (activePhase) {
      case 0:
        return "Taurine (Orange Active Outer Layer) & N-Acetylcysteine (Red Core) floating separately.";
      case 1:
        return "The red N-Acetylcysteine core merges inside the protective Taurine outer cup.";
      case 2:
        return "Cutaway view showing the N-Acetylcysteine core protected completely inside the Taurine tablet.";
      default:
        return "Core-in-cup setup prevents direct chemical interaction, maintaining full stability.";
    }
  };

  return (
    <div className="relative rounded-3xl border border-slate-800 bg-slate-950 p-6 sm:p-7 shadow-2xl overflow-hidden text-white max-w-full">
      {/* Top gradient accent */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#1fb8e5] via-[#f6b11b] to-red-500" />
      
      {/* Background glow glows */}
      <div className="absolute top-0 right-0 w-36 h-36 bg-[#1fb8e5]/10 rounded-full blur-[50px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-36 h-36 bg-red-500/5 rounded-full blur-[50px] pointer-events-none" />

      {/* Header Info */}
      <div className="mb-4">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1fb8e5]/10 border border-[#1fb8e5]/30 text-[#1fb8e5] text-[10px] font-bold tracking-wider uppercase mb-2.5">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
          First in India
        </span>
        <h3 className="text-xl sm:text-2xl font-black mb-2 leading-tight">
          Tablet-In-Tablet <span className="text-transparent bg-gradient-to-r from-[#1fb8e5] via-[#f6b11b] to-red-500 bg-clip-text">Technology</span>
        </h3>
        <p className="text-slate-400 text-xs font-light leading-relaxed">
          A novel bilayer formulation combining <strong className="text-orange-400">Taurine (500mg)</strong> + <strong className="text-red-400">N-Acetylcysteine (150mg/300mg)</strong> for enhanced stability, taste-masking, and superior therapeutic benefits.
        </p>
      </div>

      {/* ── 3D Canvas Area ── */}
      <div className="relative h-[240px] sm:h-[260px] w-full rounded-2xl bg-slate-900/50 border border-slate-800/80 overflow-hidden flex items-center justify-center">
        
        {/* Helper instructions overlay */}
        <div className="absolute top-3 left-3 z-10 bg-slate-950/70 border border-slate-800 px-3 py-1 rounded-lg pointer-events-none">
          <p className="text-[10px] font-semibold text-slate-300">
            {getPhaseName()}
          </p>
        </div>

        <div className="absolute top-3 right-3 z-10 flex gap-2">
          <button
            onClick={() => setAutoPlay(!autoPlay)}
            className={`px-2.5 py-1 rounded-md text-[10px] font-bold transition-colors ${
              autoPlay 
                ? "bg-[#1fb8e5] text-slate-950 hover:bg-[#1fb8e5]/80" 
                : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white"
            }`}
          >
            {autoPlay ? "⏸ Auto" : "▶ Play"}
          </button>
        </div>

        {/* 3D Canvas rendering standard React Three Fiber */}
        <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }} dpr={[1, 1.5]} gl={{ alpha: true }}>
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={1.5} />
          <Center>
            <TabletScene progress={progress} autoPlay={autoPlay} />
          </Center>
          <OrbitControls 
            enableZoom={false} 
            maxPolarAngle={Math.PI / 2 + 0.2} 
            minPolarAngle={Math.PI / 2 - 0.2}
          />
        </Canvas>

        {/* Float tags */}
        <div className="absolute bottom-3 left-3 z-10 max-w-[70%] bg-slate-950/70 border border-slate-800 px-3 py-1.5 rounded-lg pointer-events-none">
          <p className="text-[10px] font-light text-slate-400 leading-tight">
            {getPhaseDesc()}
          </p>
        </div>

        {/* 3D Drag tip */}
        <div className="absolute bottom-3 right-3 z-10 pointer-events-none">
          <span className="text-[9px] text-slate-500 uppercase tracking-widest bg-slate-950/30 px-2 py-0.5 rounded">
            Drag to Rotate
          </span>
        </div>
      </div>

      {/* Manual interactive slider */}
      <div className="mt-4 px-1 py-2 rounded-xl bg-slate-900/30 border border-slate-900/80 flex items-center gap-4">
        <span className="text-[10px] text-orange-400 font-bold ml-2">Separate</span>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={autoPlay ? (activePhase === 0 ? 0 : activePhase === 1 ? 0.5 : 1) : progress}
          onChange={handleSliderChange}
          className="flex-1 accent-[#1fb8e5] h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer"
          aria-label="Tablet assembly progress slider"
        />
        <span className="text-[10px] text-red-400 font-bold mr-2">Cutaway</span>
      </div>

      {/* Benefits bullets list */}
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-300">
        {[
          "Prevents drug degradation in gastric environments",
          "Conceals bitter/unpleasant taste and drug odour",
          "Initial outer release provides rapid onset of action",
          "Separation of layers does not occur (highly stable)",
          "Independent coating/granulation for each drug",
          "High accuracy in weight variation dose control"
        ].map((benefit, idx) => (
          <div key={idx} className="flex items-start gap-1.5">
            <span className="w-3.5 h-3.5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-[9px] mt-0.5 flex-shrink-0">✓</span>
            <span className="font-light leading-relaxed">{benefit}</span>
          </div>
        ))}
      </div>

      {/* Available strengths */}
      <div className="mt-5 pt-4 border-t border-slate-900">
        <h4 className="text-slate-400 text-[10px] font-bold tracking-widest uppercase mb-3">Available Strengths</h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {[
            { id: "1", title: "Taurine 500mg", detail: "+ NAC 150mg" },
            { id: "2", title: "Taurine 500mg", detail: "+ NAC 300mg" },
            { id: "3", title: "Pyridoxamine 75mg", detail: "+ NAC 300mg" }
          ].map((item) => (
            <div key={item.id} className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-[#f6b11b]/30 transition-all flex items-center gap-2">
              <span className="w-5 h-5 rounded-lg bg-slate-800 text-[#f6b11b] font-black text-xs flex items-center justify-center flex-shrink-0">{item.id}</span>
              <div>
                <p className="text-[10px] font-bold text-white leading-tight">{item.title}</p>
                <p className="text-[9px] font-light text-slate-400 leading-tight">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
