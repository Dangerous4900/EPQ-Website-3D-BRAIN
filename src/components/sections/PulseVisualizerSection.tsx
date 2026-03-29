import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../../store/useStore';
import { Activity } from 'lucide-react';

export function PulseVisualizerSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { setCurrentSection, setPulseActive, pulseActive } = useStore();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCurrentSection(3);
        } else {
          setPulseActive(false);
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [setCurrentSection, setPulseActive]);

  return (
    <section 
      ref={sectionRef}
      className="relative w-full min-h-screen flex items-center justify-center px-8 md:px-24 py-24"
    >
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-panel p-6 max-w-md text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Activity className="text-green-400" size={24} />
            <h2 className="text-2xl font-serif">Neural Network Pulse</h2>
          </div>
          <p className="text-sm text-white/60 leading-relaxed mb-6">
            Simulate real-time neural firing. Click anywhere on the brain model to trigger a signal propagation cascade across the neural pathways.
          </p>
          
          <button 
            onClick={() => setPulseActive(!pulseActive)}
            className={`glass-button w-full flex items-center justify-center gap-2 ${
              pulseActive ? 'bg-green-500/20 border-green-500/50 text-green-300' : ''
            }`}
          >
            {pulseActive ? (
              <>
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                Simulation Active
              </>
            ) : (
              'Start Simulation'
            )}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
