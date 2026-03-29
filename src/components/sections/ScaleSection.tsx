import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useStore } from '../../store/useStore';
import { Maximize, Minimize } from 'lucide-react';

export function ScaleSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { setCurrentSection, setScaleLevel } = useStore();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const scaleTextY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCurrentSection(4);
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [setCurrentSection]);

  const handleScaleChange = (level: number) => {
    setScaleLevel(level);
  };

  return (
    <section 
      ref={sectionRef}
      className="relative w-full min-h-[150vh] flex flex-col items-center justify-center px-8 md:px-24 py-24"
    >
      <motion.div 
        style={{ y: scaleTextY, opacity }}
        className="sticky top-1/2 -translate-y-1/2 z-10 w-full max-w-4xl flex flex-col md:flex-row items-center justify-between gap-12"
      >
        <div className="glass-panel p-8 md:p-12 flex-1">
          <h2 className="text-4xl md:text-5xl font-serif mb-6">Comparative Scale</h2>
          <p className="text-white/60 leading-relaxed mb-8">
            The human brain contains approximately 86 billion neurons, forming over 100 trillion synaptic connections. This rivals the number of stars in the Milky Way galaxy.
          </p>
          
          <div className="flex gap-4">
            <button 
              onClick={() => handleScaleChange(0)}
              className="glass-button flex-1 flex flex-col items-center justify-center gap-2 py-4"
            >
              <Maximize size={20} className="text-blue-400" />
              <span className="text-xs uppercase tracking-wider">Macro</span>
            </button>
            <button 
              onClick={() => handleScaleChange(1)}
              className="glass-button flex-1 flex flex-col items-center justify-center gap-2 py-4"
            >
              <Minimize size={20} className="text-purple-400" />
              <span className="text-xs uppercase tracking-wider">Micro</span>
            </button>
          </div>
        </div>

        <div className="flex-1 space-y-6">
          <div className="glass-panel p-6 border-l-4 border-l-blue-500">
            <h3 className="text-3xl font-mono mb-2">86 Billion</h3>
            <p className="text-sm text-white/50 uppercase tracking-widest">Neurons</p>
          </div>
          <div className="glass-panel p-6 border-l-4 border-l-purple-500">
            <h3 className="text-3xl font-mono mb-2">100 Trillion</h3>
            <p className="text-sm text-white/50 uppercase tracking-widest">Synapses</p>
          </div>
          <div className="glass-panel p-6 border-l-4 border-l-white/20">
            <h3 className="text-3xl font-mono mb-2">1.4 kg</h3>
            <p className="text-sm text-white/50 uppercase tracking-widest">Average Weight</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
