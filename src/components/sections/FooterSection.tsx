import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../../store/useStore';
import { Github, Twitter, Linkedin, Heart } from 'lucide-react';

export function FooterSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { setCurrentSection } = useStore();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCurrentSection(7);
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
      className="relative w-full min-h-screen flex flex-col justify-end bg-gradient-to-t from-black via-black/80 to-transparent pb-12 pt-48 px-8 md:px-24"
    >
      <div className="z-10 w-full max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass-panel p-12 md:p-16 mb-12 text-center"
        >
          <h2 className="text-4xl md:text-6xl font-serif mb-6">Brain Health Matters</h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto leading-relaxed mb-10">
            Understanding the brain is the first step to protecting it. Stay curious, keep learning, and support neuroscience research.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="glass-button w-full sm:w-auto px-8 py-4 text-sm uppercase tracking-widest font-medium bg-white/10 hover:bg-white/20">
              Explore More
            </button>
            <button className="glass-button w-full sm:w-auto px-8 py-4 text-sm uppercase tracking-widest font-medium border-blue-500/50 text-blue-300 hover:bg-blue-500/10">
              Support Research
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pt-12 border-t border-white/10">
          <div className="md:col-span-2">
            <h3 className="text-xl font-serif mb-4 flex items-center gap-2">
              <Heart className="text-red-400" size={20} />
              NeuroViz
            </h3>
            <p className="text-sm text-white/40 max-w-sm leading-relaxed">
              An interactive 3D exploration of the human brain, built with React, Three.js, and GSAP.
            </p>
          </div>
          
          <div>
            <h4 className="text-xs uppercase tracking-widest text-white/50 mb-4">Links</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li><a href="#" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Methodology</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Data Sources</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest text-white/50 mb-4">Connect</h4>
            <div className="flex gap-4">
              <a href="#" className="text-white/50 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-white/50 hover:text-white transition-colors">
                <Github size={20} />
              </a>
              <a href="#" className="text-white/50 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 text-center text-xs text-white/30">
          &copy; {new Date().getFullYear()} NeuroViz. All rights reserved. Not for medical diagnostic use.
        </div>
      </div>
    </section>
  );
}
