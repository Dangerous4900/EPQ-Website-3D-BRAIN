import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../../store/useStore';
import { ChevronRight, Brain } from 'lucide-react';

const lobes = [
  {
    id: 'frontal',
    name: 'Frontal Lobe',
    pronunciation: '/ˈfrʌntəl loʊb/',
    functions: ['Executive function', 'Motor control', 'Problem solving', 'Social behavior'],
    fact: 'The frontal lobe is the last part of the brain to fully develop, usually in the mid-20s.',
    connections: '15.2 Billion',
  },
  {
    id: 'parietal',
    name: 'Parietal Lobe',
    pronunciation: '/pəˈraɪɪtəl loʊb/',
    functions: ['Sensory perception', 'Spatial awareness', 'Navigation', 'Language processing'],
    fact: 'Damage to the right parietal lobe can cause "hemispatial neglect," where a person ignores the left side of their world.',
    connections: '12.4 Billion',
  },
  {
    id: 'temporal',
    name: 'Temporal Lobe',
    pronunciation: '/ˈtɛmpərəl loʊb/',
    functions: ['Auditory processing', 'Memory formation', 'Language comprehension', 'Emotion regulation'],
    fact: 'The hippocampus, crucial for forming new memories, is located deep within the temporal lobe.',
    connections: '14.1 Billion',
  },
  {
    id: 'occipital',
    name: 'Occipital Lobe',
    pronunciation: '/ɒkˈsɪpɪtəl loʊb/',
    functions: ['Visual processing', 'Color recognition', 'Depth perception', 'Motion detection'],
    fact: 'Despite being the smallest lobe, it dedicates massive resources to processing visual information from the eyes.',
    connections: '8.9 Billion',
  },
];

export function DeepDiveSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { setCurrentSection, setActiveLobe } = useStore();
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCurrentSection(2);
          setActiveLobe(lobes[activeTab].id);
        } else {
          setActiveLobe(null);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [setCurrentSection, setActiveLobe, activeTab]);

  const lobe = lobes[activeTab];

  return (
    <section 
      ref={sectionRef}
      className="relative w-full min-h-screen flex items-center justify-start px-8 md:px-24 py-24"
    >
      <div className="w-full max-w-2xl z-10 flex flex-col md:flex-row gap-8">
        
        {/* Navigation Tabs */}
        <div className="flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-4 md:pb-0 shrink-0">
          {lobes.map((l, i) => (
            <button
              key={l.id}
              onClick={() => {
                setActiveTab(i);
                setActiveLobe(l.id);
              }}
              className={`text-left px-4 py-3 rounded-lg transition-all duration-300 whitespace-nowrap ${
                activeTab === i 
                  ? 'bg-white/10 text-white border-l-2 border-blue-400' 
                  : 'text-white/40 hover:text-white/80 hover:bg-white/5 border-l-2 border-transparent'
              }`}
            >
              <span className="font-mono text-xs uppercase tracking-wider block mb-1 opacity-60">0{i + 1}</span>
              <span className="font-medium">{l.name}</span>
            </button>
          ))}
        </div>

        {/* Content Panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="glass-panel p-8 md:p-12 flex-1"
          >
            <div className="flex items-center gap-4 mb-2">
              <Brain className="text-blue-400" size={32} />
              <h2 className="text-4xl font-serif">{lobe.name}</h2>
            </div>
            <p className="font-mono text-sm text-white/40 mb-8">{lobe.pronunciation}</p>

            <div className="space-y-8">
              <div>
                <h3 className="text-xs uppercase tracking-[0.2em] text-white/50 mb-4">Key Functions</h3>
                <ul className="space-y-3">
                  {lobe.functions.map((func, i) => (
                    <li key={i} className="flex items-start gap-3 text-white/80">
                      <ChevronRight className="text-blue-400 shrink-0 mt-0.5" size={16} />
                      <span className="leading-relaxed">{func}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-blue-900/20 border border-blue-500/20 rounded-xl p-6">
                <h3 className="text-xs uppercase tracking-[0.2em] text-blue-400 mb-2">Did You Know?</h3>
                <p className="text-sm text-white/70 leading-relaxed italic">"{lobe.fact}"</p>
              </div>

              <div className="flex items-center justify-between border-t border-white/10 pt-6">
                <span className="text-sm text-white/50">Neural Connections</span>
                <span className="font-mono text-xl text-white">{lobe.connections}</span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
