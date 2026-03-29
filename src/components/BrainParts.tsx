import { useRef, useMemo, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';
import { useStore } from '../store/useStore';
import modelsList from '../modelsList.json';

// Create a very fine noise texture for the matte clay material
const noiseTexture = (() => {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const context = canvas.getContext('2d');
  if (context) {
    const imageData = context.createImageData(512, 512);
    for (let i = 0; i < imageData.data.length; i += 4) {
      // Very fine, subtle noise
      const val = 240 + Math.random() * 15; 
      imageData.data[i] = val;
      imageData.data[i + 1] = val;
      imageData.data[i + 2] = val;
      imageData.data[i + 3] = 255;
    }
    context.putImageData(imageData, 0, 0);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(12, 12); // High repeat for very fine grain
  return tex;
})();

// Preload all models
modelsList.forEach((model) => {
  useGLTF.preload(`/models/${model}`);
});

export function BrainParts() {
  const { selectedPart, focusedPart, setSelectedPart, searchQuery, xRayMode, isDissected, partSettings, initPartSettings, exportTrigger, fadeUnselected, transparencyLevel, sliceX, sliceY, glassyMode } = useStore();
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    initPartSettings(modelsList);
  }, [initPartSettings]);

  useEffect(() => {
    if (exportTrigger > 0 && groupRef.current) {
      const exporter = new GLTFExporter();
      exporter.parse(
        groupRef.current,
        (gltf) => {
          const blob = new Blob([gltf as ArrayBuffer], { type: 'application/octet-stream' });
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.style.display = 'none';
          link.href = url;
          link.download = 'brain_model.glb';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        },
        (error) => {
          console.error('An error happened during export:', error);
        },
        { binary: true }
      );
    }
  }, [exportTrigger]);

  const handlePartClick = (id: string) => {
    setSelectedPart(id === selectedPart ? null : id);
  };

  const isSearching = searchQuery.trim().length > 0;
  const query = searchQuery.toLowerCase();

  return (
    <group ref={groupRef}>
      {modelsList.map((model) => {
        const settings = partSettings[model];
        if (settings && !settings.visible) return null;

        return (
          <BrainPartWrapper 
            key={model} 
            url={model} 
            selectedPart={selectedPart}
            focusedPart={focusedPart}
            isSearching={isSearching}
            query={query}
            xRayMode={xRayMode}
            isDissected={isDissected}
            transparencyLevel={transparencyLevel}
            sliceX={sliceX}
            sliceY={sliceY}
            fadeUnselected={fadeUnselected}
            glassyMode={glassyMode}
            customName={settings?.customName || model.replace('.glb', '')}
            onClick={handlePartClick}
          />
        );
      })}
    </group>
  );
}

function BrainPartWrapper({ 
  url, selectedPart, focusedPart, isSearching, query, xRayMode, isDissected, transparencyLevel, sliceX, sliceY, fadeUnselected, glassyMode, customName, onClick 
}: { 
  url: string, selectedPart: string | null, focusedPart: string | null, isSearching: boolean, query: string, xRayMode: boolean, isDissected: boolean, transparencyLevel: number, sliceX: number, sliceY: number, fadeUnselected: boolean, glassyMode: boolean, customName: string, onClick: (id: string) => void 
}) {
  const { scene } = useGLTF(`/models/${url}`);
  const clonedScene = useMemo(() => scene.clone(), [scene]);
  const primitiveRef = useRef<THREE.Object3D>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const clipPlaneX = useMemo(() => new THREE.Plane(new THREE.Vector3(1, 0, 0), 10), []);
  const clipPlaneY = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 1, 0), 10), []);

  // Calculate center for dissection
  const center = useMemo(() => {
    const box = new THREE.Box3().setFromObject(clonedScene);
    const c = new THREE.Vector3();
    box.getCenter(c);
    return c;
  }, [clonedScene]);

  // Find the first mesh to get its name
  const meshName = useMemo(() => {
    let name = url.replace('.glb', '');
    clonedScene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh && child.name) {
        // Use the first mesh name we find
        if (name === url.replace('.glb', '')) {
          name = child.name;
        }
      }
    });
    return name;
  }, [clonedScene, url]);

  let isSelected = selectedPart === url;
  let isFaded = false;

  if (isSearching) {
    if (customName.toLowerCase().includes(query)) {
      isSelected = true;
    } else if (fadeUnselected || focusedPart) {
      isFaded = true;
    }
  } else if (selectedPart && !isSelected && (fadeUnselected || focusedPart)) {
    isFaded = true;
  }

  // Apply materials based on state
  useMemo(() => {
    clonedScene.name = customName;
    clonedScene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.name = customName + "_mesh"; // Name the mesh for easy identification later
        
        // Clone material to not affect other instances if any
        if (!mesh.userData.originalMaterial) {
          mesh.userData.originalMaterial = mesh.material;
        }
        
        const originalMat = mesh.userData.originalMaterial as THREE.MeshStandardMaterial;
        
        // Determine if we actually need alpha transparency
        // If we only need glass transmission, we can keep transparent: false to fix depth sorting/flickering
        const needsAlpha = isFaded || xRayMode || (transparencyLevel < 1 && !isSelected);
        
        let mat: THREE.Material;
        
        if (glassyMode) {
          mat = new THREE.MeshPhysicalMaterial({
            map: originalMat.map,
            normalMap: originalMat.normalMap,
            roughness: 0.15,
            metalness: 0.9, // Metallic glass
            transmission: 0.9, // Glass-like transparency
            ior: 1.5, // Index of refraction for glass
            thickness: 2.0, // Volume simulation
            clearcoat: 1.0,
            clearcoatRoughness: 0.1,
            transparent: needsAlpha,
            depthWrite: !needsAlpha, // Write to depth buffer when opaque to prevent flickering
          });
        } else {
          mat = originalMat.clone() as THREE.MeshStandardMaterial;
          mat.transparent = needsAlpha;
          mat.depthWrite = !needsAlpha;
          
          // Matte Clay / Velvety Bisque finish
          mat.roughness = 1.0; // Completely non-reflective/Lambertian
          mat.metalness = 0.0; // No shininess
          mat.bumpMap = noiseTexture;
          mat.bumpScale = 0.002; // Very fine grain
        }
        
        const physMat = mat as THREE.MeshPhysicalMaterial;
        const stdMat = mat as THREE.MeshStandardMaterial;
        
        if (xRayMode && isSelected) {
          if (glassyMode) physMat.transmission = 0;
          mat.opacity = 0.8;
          stdMat.color = new THREE.Color('#001133');
          stdMat.emissive = new THREE.Color('#00ffff');
          stdMat.emissiveIntensity = 2;
          stdMat.wireframe = true;
        } else if (isSelected || (isHovered && !selectedPart && !xRayMode)) {
          stdMat.emissiveIntensity = 0;
          stdMat.color = new THREE.Color(glassyMode ? '#ff3333' : '#c29b57'); // Red for glassy selected, muted gold/soft amber for solid
          if (glassyMode) physMat.transmission = 0.6; // Slightly more solid when selected
          mat.opacity = transparencyLevel < 1 && !isSelected ? transparencyLevel : 1;
          stdMat.wireframe = false;
        } else if (isFaded) {
          if (glassyMode) physMat.transmission = 0;
          mat.opacity = xRayMode ? 0.05 : 0.05;
          stdMat.color = new THREE.Color('#222222');
          stdMat.emissiveIntensity = 0;
          stdMat.wireframe = xRayMode;
        } else {
          if (glassyMode) physMat.transmission = xRayMode ? 0 : 0.9;
          mat.opacity = xRayMode ? 0.2 : transparencyLevel;
          stdMat.color = new THREE.Color(glassyMode ? '#f5f5f0' : '#e8e0ce'); // Bone white / pale cream for solid unselected
          stdMat.emissiveIntensity = 0;
          stdMat.wireframe = xRayMode;
        }
        
        mat.clippingPlanes = [clipPlaneX, clipPlaneY];
        mat.clipShadows = true;
        
        mesh.material = mat;
      }
    });
  }, [clonedScene, isSelected, isHovered, isFaded, xRayMode, transparencyLevel, customName, clipPlaneX, clipPlaneY, selectedPart, glassyMode]);

  // Animate dissection and update clipping plane
  useFrame((state) => {
    clipPlaneX.constant = sliceX;
    clipPlaneY.constant = sliceY;
    
    if (primitiveRef.current) {
      if (xRayMode && isSelected) {
        const time = state.clock.getElapsedTime();
        // Fast, erratic pulsing like electricity
        const pulse = Math.pow(Math.sin(time * 30), 2) * 0.5 + Math.pow(Math.sin(time * 45 + 1), 2) * 0.5;
        primitiveRef.current.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            if (mesh.material && !Array.isArray(mesh.material)) {
              (mesh.material as THREE.MeshPhysicalMaterial).emissiveIntensity = 0.5 + pulse * 3;
            }
          }
        });
      }

      const targetPos = new THREE.Vector3();
      if (isDissected) {
        // Move outwards from center (0,0,0) based on the part's center
        const dir = center.clone().normalize();
        targetPos.copy(dir).multiplyScalar(8); // Dissection distance increased to make it more open
      }
      primitiveRef.current.position.lerp(targetPos, 0.05);
    }
  });

  return (
    <primitive 
      ref={primitiveRef}
      object={clonedScene} 
      onClick={(e: any) => {
        e.stopPropagation();
        onClick(url);
      }}
      onPointerOver={(e: any) => {
        e.stopPropagation();
        setIsHovered(true);
        if (!selectedPart) {
          document.body.style.cursor = 'pointer';
        }
      }}
      onPointerOut={(e: any) => {
        e.stopPropagation();
        setIsHovered(false);
        document.body.style.cursor = 'auto';
      }}
    />
  );
}
