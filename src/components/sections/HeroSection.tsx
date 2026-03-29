import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useStore } from '../../store/useStore';

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { setCurrentSection } = useStore();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCurrentSection(0);
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [setCurrentSection]);

  return (
    <section 
      ref={sectionRef}
      className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/5 via-black to-black opacity-60" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
        className="z-10 text-center max-w-4xl px-6"
      >
        <h1 className="text-6xl md:text-8xl font-serif tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50">
          The Human Brain
        </h1>
        <p className="text-xl md:text-2xl font-light text-white/60 max-w-2xl mx-auto leading-relaxed">
          Explore the most complex structure in the known universe through interactive 3D visualization.
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs uppercase tracking-[0.2em] text-white/40 font-mono">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown className="text-white/40" size={24} />
        </motion.div>
      </motion.div>
    </section>
  );
}
