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

export default function App() {
  const [isEmbed, setIsEmbed] = useState(false);
  const [isTransparent, setIsTransparent] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setIsEmbed(params.get('embed') === 'true');
    setIsTransparent(params.get('transparent') === 'true');
  }, []);

  return (
    <ErrorBoundary>
      <div className={`relative w-full ${isTransparent ? 'bg-transparent' : 'bg-black'} text-white h-screen font-sans overflow-hidden`}>
        {/* 3D Canvas Background */}
        <div className="absolute inset-0 z-0">
          <CanvasContainer transparent={isTransparent} />
        </div>

        {/* UI Overlay for Search and Info - Hidden in embed mode */}
        {!isEmbed && <BrainExplorerUI />}
        
        {/* Tutorial Overlay - Hidden in embed mode */}
        {!isEmbed && <TutorialOverlay />}
      </div>
    </ErrorBoundary>
  );
}

