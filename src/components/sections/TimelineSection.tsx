import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useStore } from '../../store/useStore';
import { History } from 'lucide-react';

const milestones = [
  { year: 1848, title: "Phineas Gage", desc: "Frontal lobe discovery via iron rod accident." },
  { year: 1906, title: "Ramón y Cajal", desc: "Neuron doctrine established, proving brain is made of discrete cells." },
  { year: 1953, title: "Patient H.M.", desc: "Hippocampus removed, revealing its role in memory formation." },
  { year: 1990, title: "Decade of the Brain", desc: "fMRI technology revolutionizes non-invasive brain imaging." },
  { year: 2013, title: "Human Connectome", desc: "Project launched to map all neural connections in the human brain." }
];

export function TimelineSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { setCurrentSection, setTimelineYear } = useStore();
  const [activeIdx, setActiveIdx] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCurrentSection(6);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [setCurrentSection]);

  // Update active year based on scroll
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => {
      const idx = Math.min(
        Math.floor(v * milestones.length),
        milestones.length - 1
      );
      if (idx !== activeIdx) {
        setActiveIdx(idx);
        setTimelineYear(milestones[idx].year);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress, activeIdx, setTimelineYear]);

  return (
    <section 
      ref={sectionRef}
      className="relative w-full h-[300vh] bg-black"
    >
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        
        <div className="absolute top-24 left-8 md:left-24 z-20 flex items-center gap-4">
          <History className="text-blue-400" size={32} />
          <h2 className="text-4xl font-serif">Neuroscience Timeline</h2>
        </div>

        {/* Progress Bar */}
        <div className="absolute top-48 left-0 w-full h-1 bg-white/10 z-20">
          <motion.div 
            className="h-full bg-blue-500"
            style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
          />
        </div>

        <div className="relative z-10 w-full overflow-hidden flex items-center h-full pt-24">
          <motion.div 
            ref={containerRef}
            style={{ x }}
            className="flex gap-12 md:gap-24 px-8 md:px-24"
          >
            {milestones.map((m, i) => (
              <div 
                key={i}
                className={`relative shrink-0 w-[300px] md:w-[400px] transition-all duration-500 ${
                  i === activeIdx ? 'opacity-100 scale-105' : 'opacity-40 scale-95'
                }`}
              >
                <div className="glass-panel p-8 h-full border-t-4 border-t-blue-500">
                  <h3 className="text-5xl font-mono mb-4 text-blue-300">{m.year}</h3>
                  <h4 className="text-xl font-medium mb-3 text-white/90">{m.title}</h4>
                  <p className="text-white/60 leading-relaxed text-sm">{m.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
