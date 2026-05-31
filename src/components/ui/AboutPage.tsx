import { motion } from 'framer-motion';
import { BookOpen, Layers, Cpu, ShieldCheck, Heart, Sparkles, Navigation } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (tab: 'home' | 'brain' | 'about') => void;
}

export function AboutPage({ onNavigate }: AboutPageProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
  } as any;

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  } as any;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative z-10 w-full max-w-6xl mx-auto px-6 py-24 min-h-screen text-white flex flex-col gap-12 font-sans select-none overflow-y-auto pb-32"
    >
      {/* Page Header */}
      <motion.div variants={itemVariants} className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/50 text-xs font-mono font-medium tracking-wide">
          <BookOpen size={14} className="text-white/60" />
          ACADEMIC PROJECT DISCOURSE
        </div>
        <h1 className="text-4xl md:text-6xl font-serif tracking-tight text-white">
          About <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/40">EPQ-3D-BRAIN</span>
        </h1>
        <p className="text-sm md:text-base text-white/60 leading-relaxed font-light">
          A high-fidelity neuroscience platform built to examine structural brain topology, custom glioblastoma mapping, and subcortical network isolation. Developed for the Extended Project Qualification (EPQ).
        </p>
      </motion.div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: EPQ Definition & Scope */}
        <motion.div variants={itemVariants} className="lg:col-span-7 space-y-6">
          <div className="p-8 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-md shadow-xl space-y-6">
            <h2 className="text-xl md:text-2xl font-serif tracking-tight text-white flex items-center gap-2.5">
              <ShieldCheck size={20} className="text-white" />
              Project Objective & Research Scope
            </h2>
            <div className="space-y-4 text-xs md:text-sm text-white/70 leading-relaxed font-light">
              <p>
                The primary purpose of the <span className="text-white font-medium">EPQ-3D-BRAIN</span> project is to explore how interactive 3D media and WebGL physical shaders can overcome cognitive barriers in studying complicated subcortical anatomy. Traditional textbook diagrams confuse three-dimensional relationships, making structures like the ventricular system or basal ganglia difficult to visualize.
              </p>
              <p>
                By engineering a custom real-time WebGL slicing pipeline, our platform empowers scholars to perform virtual sagittal, horizontal, and coronal craniotomies inside the browser. Users can observe how subcortical regions (such as the thalamus and caudate nucleus) interact with external cranial structures without sacrificing physical context.
              </p>
            </div>
          </div>

          {/* Interactive Isolation & Regions Highlight */}
          <div className="p-8 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-md shadow-xl space-y-6">
            <h3 className="text-lg md:text-xl font-serif tracking-tight text-white flex items-center gap-2">
              <Layers size={18} className="text-white" />
              Structural Network Classification
            </h3>
            <p className="text-xs md:text-sm text-white/70 leading-relaxed font-light">
              The neural structures cataloged within the 3D model are dynamically grouped into five physiological functional divisions, accessible in the Regions panel:
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
              <li className="p-3.5 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-colors space-y-1">
                <span className="font-semibold text-white">Cerebrum (Telencephalon)</span>
                <p className="text-white/50 text-[11px] leading-relaxed">Responsible for conscious thought, sensory interpretation, and voluntary motor patterns.</p>
              </li>
              <li className="p-3.5 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-colors space-y-1">
                <span className="font-semibold text-white">Deep Brain (Diencephalon)</span>
                <p className="text-white/50 text-[11px] leading-relaxed">Houses the vital sensory routing hub (Thalamus) and metabolic regulators (Hypothalamus).</p>
              </li>
              <li className="p-3.5 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-colors space-y-1">
                <span className="font-semibold text-white">Limbic System (Emotion)</span>
                <p className="text-white/50 text-[11px] leading-relaxed">Features the Hippocampus and Amygdala pathways, mediating memory consolidation and reactions.</p>
              </li>
              <li className="p-3.5 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-colors space-y-1">
                <span className="font-semibold text-white">Hindbrain (Cerebellum & Stem)</span>
                <p className="text-white/50 text-[11px] leading-relaxed">Coordinates athletic motor accuracy (Cerebellum) and regulates autonomous cardiovascular cycles.</p>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Right Column: Tech Stack & Launch CTA */}
        <motion.div variants={itemVariants} className="lg:col-span-5 space-y-6">
          {/* Engineering card */}
          <div className="p-6 md:p-8 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-md shadow-xl space-y-4">
            <h3 className="text-lg font-serif text-white flex items-center gap-2">
              <Cpu size={18} className="text-white" />
              Visual Pipeline Stack
            </h3>
            <p className="text-xs text-white/60 leading-relaxed font-light">
              This application deploys high-end real-time computer graphics tools directly into the browser viewport:
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-white mt-1.5" />
                <div>
                  <h4 className="text-xs font-semibold text-white">Three.js / React Three Fiber</h4>
                  <p className="text-[11px] text-white/50">Powers high-performance matrix transforms, custom clipping geometries, and GLB parsing safely in parallel.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-white mt-1.5" />
                <div>
                  <h4 className="text-xs font-semibold text-white">Dynamic Physical Materials</h4>
                  <p className="text-[11px] text-white/50">Supports reflecting roughness parameters, transmission-glass refraction mapping, and custom physical metallic layers.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-white mt-1.5" />
                <div>
                  <h4 className="text-xs font-semibold text-white">Zustand Reactive Store</h4>
                  <p className="text-[11px] text-white/50">Handles global state synchrony across sidebars, slicing coordinates, list modifiers, and active regions without stutter.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats list card */}
          <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-md shadow-xl space-y-4">
            <h4 className="text-xs uppercase tracking-widest font-mono text-white/40 font-semibold">Cerebral Inventory</h4>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                <span className="block text-xl font-serif text-white font-medium">55+</span>
                <span className="text-[10px] text-white/40">Anatomical Models</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                <span className="block text-xl font-serif text-white font-medium">3</span>
                <span className="text-[10px] text-white/40">Slicing Planes</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                <span className="block text-xl font-serif text-white font-medium">10</span>
                <span className="text-[10px] text-white/40">Tutorial Steps</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                <span className="block text-xl font-serif text-white font-medium">100%</span>
                <span className="text-[10px] text-white/40">Client Physics</span>
              </div>
            </div>
          </div>

          {/* Big CTA Card */}
          <div className="p-6 rounded-2xl border border-amber-500/20 bg-amber-500/[0.03] space-y-4 text-center">
            <div className="mx-auto w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-400">
              <Sparkles size={18} />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-semibold text-white">Ready for Deep-Dive Analysis?</h4>
              <p className="text-xs text-white/50 max-w-xs mx-auto">
                Step inside the high-resolution interactive brain layout to dissect specific networks yourself.
              </p>
            </div>
            <button
              onClick={() => onNavigate('brain')}
              className="w-full py-2.5 rounded-xl bg-white text-black hover:bg-neutral-200 transition-colors text-xs font-semibold flex items-center justify-center gap-1.5 group select-none cursor-pointer"
            >
              <Navigation size={14} className="group-hover:translate-x-0.5 transition-transform" />
              Launch 3D Brain
            </button>
          </div>
        </motion.div>
      </div>

      {/* Progress Box (Full-width, premium reflective glass-panel container) */}
      <motion.div 
        variants={itemVariants} 
        className="w-full relative mt-8 overflow-hidden"
      >
        <div className="glass-panel p-8 md:p-12 border border-white/10 bg-[#0c0c0e]/30 backdrop-blur-[24px] rounded-2xl shadow-xl relative text-left">
          <div className="flex items-center gap-2.5 mb-5">
            <div className="h-5 w-1 bg-white/60 rounded-full" />
            <h4 className="text-base font-light tracking-wider text-white uppercase font-sans">Progress</h4>
          </div>
          
          <p className="text-xs md:text-sm text-white/75 font-light leading-relaxed font-sans">
            It took about a week each day over several months to complete the EPQ, totaling roughly 170 hours. I used hundreds of iterative prompts, learned the fundamentals of WebGL and web hosting, gathered and manually renamed 3D assets, and integrated them into a working website. The process was painstaking but rewarding — I gained practical skills in 3D asset management, graphics programming, deployment, and problem‑solving, and finished with a functional, well‑documented project that significantly expanded my technical toolkit.
          </p>
        </div>
      </motion.div>

      {/* References Box (Full-width reflective glass-panel container) */}
      <motion.div 
        variants={itemVariants} 
        className="w-full relative mt-8 overflow-hidden"
      >
        <div className="glass-panel p-8 md:p-12 border border-white/10 bg-[#0c0c0e]/30 backdrop-blur-[24px] rounded-2xl shadow-xl relative text-left space-y-6">
          <div className="flex items-center gap-2.5">
            <div className="h-5 w-1 bg-white/60 rounded-full" />
            <h4 className="text-base font-light tracking-wider text-white uppercase font-sans">References</h4>
          </div>
          
          <ul className="space-y-4 text-xs md:text-sm text-white/70 font-light leading-relaxed font-sans">
            <li className="pl-4 border-l border-white/10 space-y-1">
              <span className="text-white font-medium">Neurotorium.</span> (n.d.). 3D Brain Atlas. [online] Available at: <a href="https://neurotorium.org/tool/brain-atlas/" target="_blank" referrerPolicy="no-referrer" rel="noopener noreferrer" className="text-white/90 hover:underline">https://neurotorium.org/tool/brain-atlas/</a>.
              <p className="text-[11px] text-white/40 font-mono">— Resource used for acquiring and accurately referencing 3D brain asset mappings.</p>
            </li>
            <li className="pl-4 border-l border-white/10 space-y-1">
              <span className="text-white font-medium">Seung, S.</span> (2013). <span className="italic font-normal">Connectome: how the brain’s wiring makes us who we are.</span> London: Penguin.
              <p className="text-[11px] text-white/40 font-mono">— Inspired me to diverge from a traditional written research dissertation and build this interactive web artifact instead.</p>
            </li>
            <li className="pl-4 border-l border-white/10 space-y-1">
              <span className="text-white font-medium">Framer - A lightning fast interactive design tool</span> (2019). Framer - A lightning fast interactive design tool. [online] Framer.com. Available at: <a href="https://www.framer.com/" target="_blank" referrerPolicy="no-referrer" rel="noopener noreferrer" className="text-white/90 hover:underline">https://www.framer.com/</a>.
              <p className="text-[11px] text-white/40 font-mono">— Practical resource that taught me spatial UI relationships, layout choreography, and motion pacing.</p>
            </li>
            <li className="pl-4 border-l border-white/10 space-y-1">
              <span className="text-white font-medium">Tartarotti, E.</span> (2026). <span className="italic font-normal">The 7 Levels of Tech Design.</span> Enrico Tartarotti. Available at: <a href="https://youtu.be/FQVRfadJkJk?si=EubMO7SPWFngIXe6" target="_blank" referrerPolicy="no-referrer" rel="noopener noreferrer" className="text-white/90 hover:underline">https://youtu.be/FQVRfadJkJk?si=EubMO7SPWFngIXe6</a> [Accessed 31 May 2026].
              <p className="text-[11px] text-white/40 font-mono">— Strongly inspired the high-contrast aesthetic, deep carbon glass-morphism overlays, and physical-transmission UI styling.</p>
            </li>
          </ul>
        </div>
      </motion.div>

      {/* System Footer Label - Prominently positioned and comfortably padded at the bottom */}
      <motion.div 
        variants={itemVariants} 
        className="text-center text-[10px] text-white/40 uppercase tracking-[0.25em] font-mono flex items-center justify-center gap-2 border-t border-white/10 pt-12 pb-8 mt-12 w-full"
      >
        S50839 EPQ PROJECT 2025-2026 • I USE ARCH BTW V4.90
      </motion.div>
    </motion.div>
  );
}
