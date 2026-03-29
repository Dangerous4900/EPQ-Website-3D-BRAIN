import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../../store/useStore';
import { Info } from 'lucide-react';

export function DissectionSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { setCurrentSection, setDissected } = useStore();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCurrentSection(1);
          setDissected(true);
        } else {
          setDissected(false);
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [setCurrentSection, setDissected]);

  return (
    <section 
      ref={sectionRef}
      className="relative w-full min-h-screen flex items-center justify-end px-8 md:px-24 py-24"
    >
      <div className="w-full max-w-md z-10 space-y-8">
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="glass-panel p-8"
        >
          <h2 className="text-4xl font-serif mb-4 text-white/90">Anatomical Dissection</h2>
          <p className="text-white/60 leading-relaxed mb-6 font-light">
            The human brain is divided into distinct lobes, each responsible for different cognitive functions. As you scroll, the model separates to reveal the inner structures.
          </p>
          
          <div className="space-y-4">
            {['Frontal Lobe', 'Parietal Lobe', 'Temporal Lobe', 'Occipital Lobe', 'Cerebellum', 'Brainstem'].map((lobe, i) => (
              <div key={lobe} className="flex items-center gap-3 text-sm text-white/80 border-b border-white/10 pb-2 last:border-0">
                <div className="w-2 h-2 rounded-full bg-blue-400/50" />
                <span className="font-medium tracking-wide">{lobe}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="glass-panel p-4 flex items-start gap-3 border-l-4 border-l-blue-500"
        >
          <Info className="text-blue-400 shrink-0 mt-0.5" size={18} />
          <p className="text-xs text-white/70 leading-relaxed">
            The X-ray shader reveals internal structures like the hippocampus and amygdala, which are crucial for memory and emotion.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
