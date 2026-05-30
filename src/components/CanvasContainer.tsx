import { Canvas } from '@react-three/fiber';
import { Environment, CameraControls, Preload } from '@react-three/drei';
import { Suspense, useRef, useEffect, useState } from 'react';
import { BrainModel } from './BrainModel';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { useStore } from '../store/useStore';

function CameraController() {
  const cameraControlsRef = useRef<CameraControls>(null);
  const { resetCameraTrigger, cameraView, setAutoRotate, zoomInTrigger, zoomOutTrigger } = useStore();
  
  useEffect(() => {
    if (cameraControlsRef.current && zoomInTrigger > 0) {
      cameraControlsRef.current.dolly(5, true);
    }
  }, [zoomInTrigger]);

  useEffect(() => {
    if (cameraControlsRef.current && zoomOutTrigger > 0) {
      cameraControlsRef.current.dolly(-5, true);
    }
  }, [zoomOutTrigger]);

  useEffect(() => {
    if (cameraControlsRef.current && resetCameraTrigger > 0) {
      cameraControlsRef.current.setLookAt(0, 0, 20, 0, 0, 0, true);
    }
  }, [resetCameraTrigger]);

  useEffect(() => {
    if (cameraControlsRef.current) {
      switch (cameraView) {
        case 'coronal':
          cameraControlsRef.current.setLookAt(0, 0, 20, 0, 0, 0, true);
          setAutoRotate(false);
          break;
        case 'sagittal':
          cameraControlsRef.current.setLookAt(20, 0, 0, 0, 0, 0, true);
          setAutoRotate(false);
          break;
        case 'horizontal':
          cameraControlsRef.current.setLookAt(0, 20, 0, 0, 0, 0, true);
          setAutoRotate(false);
          break;
        case 'default':
          // Don't force a position on default unless reset is triggered
          break;
      }
    }
  }, [cameraView, setAutoRotate]);

  return (
    <CameraControls 
      ref={cameraControlsRef}
      makeDefault
      minDistance={2}
      maxDistance={100}
    />
  );
}

export function CanvasContainer({ transparent = false }: { transparent?: boolean }) {
  const { glassyMode } = useStore();
  const [webglSupported, setWebglSupported] = useState<boolean | null>(null);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      setWebglSupported(!!gl);
    } catch (e) {
      setWebglSupported(false);
    }
  }, []);

  if (webglSupported === false) {
    throw new Error("Unable to create a WebGL context. AllowWebgl2:false or hardware limitations restrict context creation in this environment.");
  }

  return (
    <Canvas
      camera={{ position: [0, 0, 20], fov: 45, far: 2000 }}
      gl={{ 
        antialias: true, 
        alpha: true, 
        localClippingEnabled: true,
        precision: 'mediump'
      }}
      onCreated={({ gl }) => {
        if (gl && gl.debug) {
          gl.debug.checkShaderErrors = false;
        }
      }}
      dpr={1}
      onPointerLeave={() => useStore.getState().setHoveredPart(null)}
    >
      <fog attach="fog" args={['#000000', 50, 500]} />
      {!transparent && <color attach="background" args={['#000000']} />}
      
      <ambientLight intensity={glassyMode ? 0.35 : 0.5} />
      <directionalLight position={[10, 10, 5]} intensity={glassyMode ? 2.5 : 1.5} />
      <directionalLight position={[-10, -10, -5]} intensity={glassyMode ? 1.2 : 0.8} />
      
      <Suspense fallback={null}>
        <BrainModel />
        {glassyMode && <Environment preset="studio" />}
        <Preload all />
      </Suspense>

      <CameraController />
    </Canvas>
  );
}
