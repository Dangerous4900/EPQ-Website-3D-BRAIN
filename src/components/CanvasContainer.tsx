import { Canvas } from '@react-three/fiber';
import { Environment, CameraControls, Preload } from '@react-three/drei';
import { Suspense, useRef, useEffect } from 'react';
import { BrainModel } from './BrainModel';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { useStore } from '../store/useStore';

function CameraController() {
  const cameraControlsRef = useRef<CameraControls>(null);
  const { resetCameraTrigger } = useStore();

  useEffect(() => {
    if (cameraControlsRef.current && resetCameraTrigger > 0) {
      cameraControlsRef.current.setLookAt(0, 0, 20, 0, 0, 0, true);
    }
  }, [resetCameraTrigger]);

  return (
    <CameraControls 
      ref={cameraControlsRef}
      makeDefault
      minDistance={2}
      maxDistance={100}
    />
  );
}

export function CanvasContainer() {
  return (
    <Canvas
      camera={{ position: [0, 0, 20], fov: 45 }}
      gl={{ antialias: true, alpha: true, localClippingEnabled: true }}
      dpr={[1, 2]}
    >
      <color attach="background" args={['#000000']} />
      
      <ambientLight intensity={0.05} />
      <directionalLight position={[10, 10, 5]} intensity={0.5} />
      <directionalLight position={[-10, -10, -5]} intensity={0.2} />
      
      <Suspense fallback={null}>
        <BrainModel />
        <Environment preset="city" />
        <Preload all />
      </Suspense>

      <EffectComposer enableNormalPass={false}>
        <Bloom 
          luminanceThreshold={0.6} 
          mipmapBlur 
          intensity={0.4} 
        />
      </EffectComposer>

      <CameraController />
    </Canvas>
  );
}
