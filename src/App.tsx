/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { CanvasContainer } from './components/CanvasContainer';
import { BrainExplorerUI } from './components/ui/BrainExplorerUI';
import { TutorialOverlay } from './components/ui/TutorialOverlay';
import { ErrorBoundary } from './components/ErrorBoundary';
import { CanvasErrorBoundary } from './components/CanvasErrorBoundary';
import { CustomCursor } from './components/ui/CustomCursor';
import { NeuralLoader } from './components/ui/NeuralLoader';
import { HomePage } from './components/ui/HomePage';
import { AboutPage } from './components/ui/AboutPage';
import { NotFoundPage } from './components/ui/NotFoundPage';
import { WhiteSpiralBackground } from './components/ui/WhiteSpiralBackground';
import { useStore } from './store/useStore';
import { AnimatePresence, motion } from 'framer-motion';

export default function App() {
  const [isEmbed, setIsEmbed] = useState(false);
  const [isTransparent, setIsTransparent] = useState(false);
  const { isModelLoaded } = useStore();
  const [activeTab, setActiveTab] = useState<'home' | 'brain' | 'about' | '404'>('home');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setIsEmbed(params.get('embed') === 'true');
    setIsTransparent(params.get('transparent') === 'true');

    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '' || hash === '#home') {
        setActiveTab('home');
      } else if (hash === '#brain') {
        setActiveTab('brain');
      } else if (hash === '#about') {
        setActiveTab('about');
      } else if (hash.startsWith('#')) {
        setActiveTab('404');
      } else {
        setActiveTab('home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (tab: 'home' | 'brain' | 'about') => {
    window.location.hash = tab;
  };

  return (
    <ErrorBoundary>
      <div className={`relative w-full ${isTransparent ? 'bg-transparent' : 'bg-[#09090b]'} text-white h-screen font-sans overflow-hidden flex flex-col`}>
        {/* Responsive Custom Cursor with Glow Effect */}
        <CustomCursor />

        {/* Loading overlay */}
        <AnimatePresence>
          {!isModelLoaded && !isTransparent && activeTab === 'brain' && <NeuralLoader />}
        </AnimatePresence>

        {/* 3D Canvas Background - Remains loaded for seamless transitions */}
        <div className="absolute inset-0 z-0 bg-black">
          <CanvasErrorBoundary>
            <CanvasContainer transparent={isTransparent} />
          </CanvasErrorBoundary>
        </div>

        {/* White Spiral Gradient Background Layer - Rendered on Home/About/404 only */}
        {activeTab !== 'brain' && (
          <WhiteSpiralBackground />
        )}

        {/* Transparent Dimming Veil: Dims and blurs the 3D model when viewing text pages */}
        <div 
          className={`absolute inset-0 z-10 pointer-events-none transition-all duration-[1200ms] ${
            activeTab === 'brain' 
              ? 'opacity-0 backdrop-blur-none bg-transparent' 
              : 'opacity-100 backdrop-blur-[24px] bg-[#0c0c0e]/55'
          }`} 
        />

        {/* Transparent Navigation Bar - Floating elegantly at the top */}
        {!isEmbed && (
          <header className="absolute top-0 inset-x-0 z-50 h-20 border-b border-white/5 flex items-center justify-between px-6 md:px-12 backdrop-blur-xs select-none">
            {/* Branding Logo Area */}
            <button 
              onClick={() => handleNavigate('home')} 
              className="flex items-center hover:opacity-80 transition-all text-left font-sans cursor-pointer"
            >
              <div>
                <span className="text-lg font-normal tracking-wide text-white">3D-BRAIN</span>
              </div>
            </button>

            {/* Main Tabs List */}
            <nav className="flex items-center gap-1 md:gap-2">
              {(['home', 'brain', 'about'] as const).map((tab) => {
                const isActive = activeTab === tab;
                const label = tab === 'brain' ? '3D Brain' : tab;
                return (
                  <button
                    key={tab}
                    onClick={() => handleNavigate(tab)}
                    className={`relative px-4 py-1.5 rounded-full text-xs font-medium tracking-wide uppercase transition-all duration-300 font-sans cursor-pointer ${
                      isActive 
                        ? 'text-black font-semibold' 
                        : 'text-white/60 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {/* Sliding White Capsule Active Tab Pill Indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="activeTabPill"
                        className="absolute inset-0 bg-white rounded-full -z-10"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                    {label}
                  </button>
                );
              })}
            </nav>
          </header>
        )}

        {/* Render main page content modules */}
        {activeTab !== 'brain' && (
          <div className="relative z-20 flex-1 w-full overflow-hidden pointer-events-auto">
            <AnimatePresence mode="wait">
              {activeTab === 'home' && (
                <motion.div
                  key="home"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 overflow-y-auto"
                >
                  <HomePage onNavigate={handleNavigate} />
                </motion.div>
              )}

              {activeTab === 'about' && (
                <motion.div
                  key="about"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 overflow-y-auto"
                >
                  <AboutPage onNavigate={handleNavigate} />
                </motion.div>
              )}

              {activeTab === '404' && (
                <motion.div
                  key="404"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 overflow-y-auto"
                >
                  <NotFoundPage onNavigate={handleNavigate} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Float 3D Brain Explorer elements at root level for unobstructed interactions */}
        {activeTab === 'brain' && !isEmbed && (
          <>
            <BrainExplorerUI />
            <TutorialOverlay />
          </>
        )}
      </div>
    </ErrorBoundary>
  );
}

