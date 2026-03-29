/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import { CanvasContainer } from './components/CanvasContainer';
import { BrainExplorerUI } from './components/ui/BrainExplorerUI';
import { TutorialOverlay } from './components/ui/TutorialOverlay';

export default function App() {
  return (
    <div className="relative w-full bg-black text-white h-screen font-sans overflow-hidden">
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 z-0">
        <CanvasContainer />
      </div>

      {/* UI Overlay for Search and Info */}
      <BrainExplorerUI />
      
      {/* Tutorial Overlay */}
      <TutorialOverlay />
    </div>
  );
}

