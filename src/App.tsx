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
import { useStore } from './store/useStore';
import { AnimatePresence } from 'framer-motion';

export default function App() {
  const [isEmbed, setIsEmbed] = useState(false);
  const [isTransparent, setIsTransparent] = useState(false);
  const { isModelLoaded } = useStore();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setIsEmbed(params.get('embed') === 'true');
    setIsTransparent(params.get('transparent') === 'true');
  }, []);

  return (
    <ErrorBoundary>
      <div className={`relative w-full ${isTransparent ? 'bg-transparent' : 'bg-black'} text-white h-screen font-sans overflow-hidden`}>
        {/* Responsive Custom Cursor with Glow Effect */}
        <CustomCursor />

        {/* Loading overlay */}
        <AnimatePresence>
          {!isModelLoaded && !isTransparent && <NeuralLoader />}
        </AnimatePresence>

        {/* 3D Canvas Background */}
        <div className="absolute inset-0 z-0 bg-neutral-950">
          <CanvasErrorBoundary>
            <CanvasContainer transparent={isTransparent} />
          </CanvasErrorBoundary>
        </div>

        {/* UI Overlay for Search and Info - Hidden in embed mode */}
        {!isEmbed && <BrainExplorerUI />}
        
        {/* Tutorial Overlay - Hidden in embed mode */}
        {!isEmbed && <TutorialOverlay />}
      </div>
    </ErrorBoundary>
  );
}

