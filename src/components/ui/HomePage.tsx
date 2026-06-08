import { motion } from 'framer-motion';
import { 
  Navigation, 
  ShieldCheck, 
  Cpu, 
  Database, 
  Activity, 
  Layers, 
  Workflow, 
  Shuffle, 
  Thermometer, 
  Zap, 
  Maximize2 
} from 'lucide-react';

import { specsCategories } from './specsData';

interface HomePageProps {
  onNavigate: (tab: 'home' | 'brain' | 'about') => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  // Container stagger effects for top hero area
  const heroContainerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.1, delayChildren: 0.1 } 
    },
  } as any;

  const heroItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: "easeOut" } 
    },
  } as any;

  const heroImageContainerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      transition: { duration: 1.2, ease: "easeOut" } 
    },
  } as any;

  // Premium scroll fade/slide variants for specs sections
  const specRowVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    }
  } as any;

  return (
    <motion.div
      variants={heroContainerVariants}
      initial="hidden"
      animate="visible"
      className="relative z-10 w-full max-w-6xl mx-auto px-6 py-24 min-h-screen text-white flex flex-col justify-center gap-24 font-sans select-none overflow-y-auto pb-32"
    >
      {/* High-Concept Brand Header */}
      <motion.div variants={heroItemVariants} className="text-center max-w-4xl mx-auto space-y-6 pt-10">
        <h1 className="text-5xl md:text-8xl font-normal tracking-tight leading-none text-white font-sans uppercase">
          3D-<span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/20 font-bold">BRAIN</span>
        </h1>
        
        <p className="text-base md:text-lg font-light text-white/70 max-w-3xl mx-auto leading-relaxed">
          A compact, immersive 3D brain model that reveals structure and function at millimeter scale: layered cortical surfaces, deep nuclei, major white-matter tracts and vasculature rendered with anatomically faithful geometry and adaptive transparency. Navigate from whole‑brain organization to circuit-level landmarks (hippocampus, thalamus, motor strip), inspect connectivity pathways, and query functional annotations (language, memory, sensorimotor). Built for real‑time exploration and integration with VR/AR or simulation pipelines, it’s a tool for insight—making the brain’s architecture and dynamics intuitively visible while preserving clinical and research-grade anatomical fidelity.
        </p>

        {/* Action Controls */}
        <div className="pt-4 flex justify-center gap-4 flex-wrap">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onNavigate('brain')}
            className="px-8 py-4 rounded-full bg-white text-black font-semibold text-sm hover:bg-neutral-200 transition-all flex items-center gap-2 group relative cursor-pointer shadow-white/5 shadow-2xl"
          >
            Launch 3D Brain
            <Navigation size={16} className="group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform text-black/80" />
            <div className="absolute inset-0 rounded-full bg-white/20 blur opacity-0 group-hover:opacity-100 transition-all -z-10" />
          </motion.button>
        </div>
      </motion.div>

      {/* Feature Bento Grid (Slightly modernized with glass) */}
      <motion.div variants={heroItemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl border border-white/10 bg-[#0c0c0e]/30 backdrop-blur-[24px] flex flex-col gap-4">
          <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/80">
            <Shuffle size={18} />
          </div>
          <div>
            <h3 className="text-base font-medium text-white mb-1.5">3-Plane Planar Slicing</h3>
            <p className="text-xs text-white/50 leading-relaxed font-light">
              Slice along Sagittal, Horizontal, or Coronal cross-sections. Fully adjust depth in real-time to inspect physical, color-coded structure depths.
            </p>
          </div>
        </div>

        <div className="p-6 rounded-2xl border border-white/10 bg-[#0c0c0e]/30 backdrop-blur-[24px] flex flex-col gap-4">
          <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/80">
            <Layers size={18} />
          </div>
          <div>
            <h3 className="text-base font-medium text-white mb-1.5">Region Isolation</h3>
            <p className="text-xs text-white/50 leading-relaxed font-light">
              Isolate cortical networks like the Limbic System or Cerebral Cortex. Dim unselected components so complex neural nodes stay readable.
            </p>
          </div>
        </div>

        <div className="p-6 rounded-2xl border border-white/10 bg-[#0c0c0e]/30 backdrop-blur-[24px] flex flex-col gap-4">
          <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/80">
            <Zap size={18} />
          </div>
          <div>
            <h3 className="text-base font-medium text-white mb-1.5">Metal Shaders</h3>
            <p className="text-xs text-white/50 leading-relaxed font-light">
              Engage high-contrast metallic and premium transmission-glass overlays to map structural contours under cinematic light conditions.
            </p>
          </div>
        </div>
      </motion.div>

      {/* HARDWARE OVERVIEW SPLITTER SECTION */}
      <div className="border-t border-white/10 pt-16 flex flex-col items-center gap-4 text-center">
        <span className="font-mono text-xs text-white/40 uppercase tracking-[0.3em]">Cranial Specifications</span>
        <h2 className="text-3xl md:text-5xl font-light tracking-tight">ENGINEERING SHEETS && ARCHITECTURE</h2>
        <p className="text-sm text-white/50 max-w-xl leading-relaxed">
          Scrolling down reveals the dynamic physical parameters, hardware cores, synaptic matrices, and cooling configurations representing the optimal adult Homo sapiens node.
        </p>
      </div>

      {/* DYNAMIC SCROLL SPECS LIST */}
      <div className="space-y-24">
        {specsCategories.map((cat, index) => {
          const isEven = index % 2 === 0;
          return (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-120px" }}
              variants={specRowVariants}
              className="glass-panel relative w-full overflow-hidden p-6 md:p-8 lg:p-10 flex flex-col lg:flex-row gap-8 lg:gap-12 items-center bg-[#0c0c0e]/30 shadow-[0_12px_40px_rgba(0,0,0,0.6)] border border-white/10 backdrop-blur-[24px] group"
            >
              {/* Dynamic Live White Plasma Background */}
              <div className="absolute inset-0 -z-10 overflow-hidden bg-transparent pointer-events-none">
                <motion.div
                  className="absolute -top-24 -left-24 w-80 h-80 bg-white/[0.04] rounded-full blur-[90px]"
                  animate={{
                    x: [0, 40, -30, 0],
                    y: [0, -30, 40, 0],
                    scale: [1, 1.15, 0.95, 1],
                  }}
                  transition={{
                    duration: 10 + index * 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <motion.div
                  className="absolute -bottom-24 -right-24 w-96 h-96 bg-white/[0.035] rounded-full blur-[100px]"
                  animate={{
                    x: [0, -50, 40, 0],
                    y: [0, 40, -50, 0],
                    scale: [1.1, 0.9, 1.2, 1.1],
                  }}
                  transition={{
                    duration: 14 + index * 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                />
                <motion.div
                  className="absolute top-1/4 left-1/3 w-72 h-72 bg-white/[0.02] rounded-full blur-[80px]"
                  animate={{
                    scale: [0.85, 1.1, 0.9, 0.85],
                    opacity: [0.2, 0.4, 0.2]
                  }}
                  transition={{
                    duration: 12 + index * 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index % 2 === 0 ? 0 : 2
                  }}
                />
              </div>

              {/* One Side: Image Graphic Container */}
              <div className={`w-full lg:w-1/2 flex flex-col justify-center ${isEven ? 'lg:order-first' : 'lg:order-last'}`}>
                <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden border border-white/10 bg-black/45 shadow-2xl">
                  {/* Holographic scanner active state label overlay */}
                  <div className="absolute top-3 left-3 px-2 py-1 bg-black/75 backdrop-blur-md rounded border border-white/10 flex items-center gap-1.5 font-mono text-[8px] text-white/60 z-20">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/80 animate-pulse" />
                    RENDER_NODE: {cat.scanId}
                  </div>

                  <img 
                    src={cat.image} 
                    alt={cat.title} 
                    referrerPolicy="no-referrer"
                    className={`w-full h-full object-cover select-none transition-transform duration-700 ease-out ${
                      cat.scanId === "HOUSING_SCAN_01" ? "-rotate-90 scale-[1.33]" : ""
                    }`}
                  />
                  
                  {/* Subtle soft white focus overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>

              {/* Other Side: Detailed Technical Specifications */}
              <div className="w-full lg:w-1/2 flex flex-col gap-5">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded bg-white/5 border border-white/10 text-white/70">
                      {cat.icon}
                    </div>
                    <span className="font-mono text-[9px] uppercase text-white/40 tracking-[0.25em]">{`SYSTEM_NODE_0${index + 1}`}</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-normal tracking-tight text-white">{cat.title}</h3>
                  <p className="text-xs text-white/40 font-light">{cat.subtitle}</p>
                </div>

                {/* Glass panel list inside options box */}
                <div className="bg-[#0c0c0e]/40 border border-white/10 rounded-xl overflow-hidden backdrop-blur-[24px] shadow-inner">
                  <div className="p-3 border-b border-white/10 flex justify-between bg-white/[0.04] backdrop-blur-[24px] font-mono text-[8px] uppercase tracking-widest text-white/40">
                    <span>HARDWARE COMPONENT</span>
                    <span>RESOLUTION BOUNDS</span>
                  </div>

                  <div className="divide-y divide-white/5">
                    {cat.specs.map((item, keyId) => (
                      <div 
                        key={keyId} 
                        className="p-3 flex items-center justify-between gap-4 cursor-default"
                      >
                        <span className="text-xs font-mono text-white/40 uppercase tracking-wide">
                          {item.key}
                        </span>
                        <span className="text-xs font-light text-white/85 text-right max-w-[200px] sm:max-w-none font-sans">
                          {item.val}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* EPIC CALL TO ACTION BANNER */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-120px" }}
        variants={specRowVariants}
        className="w-full relative mt-12 overflow-hidden"
      >
        <div className="glass-panel p-10 md:p-16 text-center space-y-8 border border-white/10 relative bg-[#0c0c0e]/30 backdrop-blur-[24px] shadow-inner">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[1px] bg-gradient-to-r from-transparent via-[#38bdf8]/40 to-transparent" />
          <div className="absolute -top-12 -left-12 w-32 h-32 bg-[#38bdf8]/5 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none" />
          
          <div className="space-y-3 max-w-2xl mx-auto">
            <h3 className="text-3xl md:text-5xl font-light tracking-tight text-white leading-tight">EXPLORE THE REAL YOU</h3>
            <p className="text-xs md:text-sm text-white/40 font-light leading-relaxed">
              Activate the system compiler and step inside a full-scale cinematic WebGL spatial rendering. Rotate lobes, perform sagittal slicing, and analyze modular neural structures.
            </p>
          </div>

          <div className="flex justify-center pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onNavigate('brain')}
              className="px-8 py-4 rounded-full bg-white text-black font-semibold text-sm hover:bg-neutral-200 transition-all flex items-center gap-2 group relative cursor-pointer"
            >
              Enter 3D WebGL Brain
              <Navigation size={16} className="group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform text-black/80" />
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* System Footer Label - Visible at the bottom of the Home tab */}
      <motion.div 
        variants={heroItemVariants} 
        className="text-center text-[10px] text-white/40 uppercase tracking-[0.25em] font-mono flex items-center justify-center gap-2 border-t border-white/10 pt-12 pb-8 mt-12 w-full"
      >
        S50839 EPQ PROJECT 2025-2026 • I USE ARCH BTW V4.90
      </motion.div>
    </motion.div>
  );
}
