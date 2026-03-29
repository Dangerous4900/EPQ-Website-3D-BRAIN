import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useStore } from '../store/useStore';
import { BrainParts } from './BrainParts';

export function BrainModel() {
  const groupRef = useRef<THREE.Group>(null);
  const { setModelLoaded, autoRotate } = useStore();

  useEffect(() => {
    setModelLoaded(true);
  }, [setModelLoaded]);

  useFrame((state) => {
    if (groupRef.current) {
      // Idle rotation
      if (autoRotate) {
        groupRef.current.rotation.y += 0.005;
      }
      
      // Mouse parallax
      const mouseX = (state.pointer.x * Math.PI) / 10;
      const mouseY = (state.pointer.y * Math.PI) / 10;
      
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, mouseY, 0.05);
      groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, -mouseX * 0.5, 0.05);
    }
  });

  return (
    <group ref={groupRef}>
      <BrainParts />
    </group>
  );
}
