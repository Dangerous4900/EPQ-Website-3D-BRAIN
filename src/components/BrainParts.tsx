import { useRef, useMemo, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';
import { useStore, regionsMap } from '../store/useStore';
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
      // More varied noise for a grainier look
      const val = 150 + Math.random() * 105; 
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
  tex.repeat.set(24, 24); // More repeat for finer, denser grain
  return tex;
})();

// Preload all models
modelsList.forEach((model) => {
  // Use absolute path for preloading
  const modelUrl = `/models/${model}`;
  useGLTF.preload(modelUrl);
});

export function BrainParts() {
  const { selectedPart, focusedPart, setSelectedPart, searchQuery, meshMode, isDissected, partSettings, initPartSettings, exportTrigger, fadeUnselected, transparencyLevel, sliceX, sliceY, sliceZ, glassyMode } = useStore();
  const groupRef = useRef<THREE.Group>(null);

  // Shared clipping planes to reduce resource overhead
  const clippingPlanes = useMemo(() => [
    new THREE.Plane(new THREE.Vector3(-1, 0, 0), 30),
    new THREE.Plane(new THREE.Vector3(0, -1, 0), 30),
    new THREE.Plane(new THREE.Vector3(0, 0, -1), 30)
  ], []);

  const [clipPlaneX, clipPlaneY, clipPlaneZ] = clippingPlanes;

  // Update clipping planes in one place
  useFrame(() => {
    clipPlaneX.constant = sliceX;
    clipPlaneY.constant = sliceY;
    clipPlaneZ.constant = sliceZ;
  });

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
            meshMode={meshMode}
            isDissected={isDissected}
            transparencyLevel={transparencyLevel}
            sliceX={sliceX}
            sliceY={sliceY}
            sliceZ={sliceZ}
            fadeUnselected={fadeUnselected}
            glassyMode={glassyMode}
            clippingPlanes={clippingPlanes}
            customName={settings?.customName || model.replace('.glb', '')}
            onClick={handlePartClick}
          />
        );
      })}
    </group>
  );
}

function BrainPartWrapper({ 
  url, selectedPart, focusedPart, isSearching, query, meshMode, isDissected, transparencyLevel, sliceX, sliceY, sliceZ, fadeUnselected, glassyMode, clippingPlanes, customName, onClick 
}: { 
  url: string, selectedPart: string | null, focusedPart: string | null, isSearching: boolean, query: string, meshMode: boolean, isDissected: boolean, transparencyLevel: number, sliceX: number, sliceY: number, sliceZ: number, fadeUnselected: boolean, glassyMode: boolean, clippingPlanes: THREE.Plane[], customName: string, onClick: (id: string) => void 
}) {
  const { activeRegion, partSettings, hoveredPart, setHoveredPart } = useStore();
  const settings = partSettings[url];
  // Use absolute path for loading
  const modelUrl = `/models/${url}`;
  const { scene } = useGLTF(modelUrl);
  const clonedScene = useMemo(() => scene.clone(), [scene]);
  const primitiveRef = useRef<THREE.Object3D>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const isSlicing = useMemo(() => sliceX < 29.9 || sliceY < 29.9 || sliceZ < 29.9, [sliceX, sliceY, sliceZ]);

  const isSubcorticalPart = useMemo(() => {
    // These specific IDs should NOT be solid inner parts anymore (requested to be moved from inner/solid to outer/transparent)
    const excludeFromInner = [
      '7.2.1.2.0.glb', 
      '7.2.2.0.0.glb', 
      '7.3.0.0.0.glb', // Fourth Ventricle
      '9.2.0.0.0.glb', // Middle cerebellar peduncles
      '4.3.0.0.0.glb', // Brain stem : Pons
      '4.1.0.0.0.glb', // Medulla oblongata
      '4.1.2.0.0.glb', // Medulla oblongata : Olive
      '4.1.1.0.0.glb', // Medulla oblongata : Pyramid
      '3.2.0.0.0.glb', // Medulla Oblongata
      '9.1.0.0.0.glb', // Corpus Callosum
      '9.3.0.0.0.glb',
      '1.1.5.5.0.glb',
      '4.8.1.0.0.glb',
      '4.8.2.0.0.glb',
      '6.12.0.0.0.glb',
      '7.2.1.1.0.glb',
      '4.8.3.0.0.glb'
    ];
    if (excludeFromInner.includes(url)) return false;

    // Specific requested solid parts that might have "outer" prefixes
    const specificSolidPaths = [
      '2.4.1.1.0.glb',
      '2.4.1.2.0.glb',
      '2.4.1.3.0.glb',
      '2.4.1.4.0.glb', // Dentate nucleus
      '3.2.1.0.0.glb', // Mammillary bodies
      '3.3.0.0.0.glb',
      '3.4.2.0.0.glb', // Thalamic nuclei
      '3.4.6.0.0.glb',
      '3.4.7.0.0.glb',
      '4.2.2.0.0.glb',
      '4.2.5.0.0.glb',
      '4.2.6.0.0.glb',
      '4.2.7.0.0.glb',
      '1.1.6.4.1.glb',
      '1.1.6.4.2.1.glb',
      '1.1.6.4.2.2.glb',
      '1.1.6.4.2.3.glb',
      '1.1.10.0.0.glb'
    ];
    if (specificSolidPaths.includes(url)) return true;

    // Do NOT include parts that were explicitly moved to Transparent Outer
    const transparentOuterPaths = [
      '7.2.1.2.0.glb', '7.2.2.0.0.glb', '7.3.0.0.0.glb',
      '9.2.0.0.0.glb', '9.1.0.0.0.glb', '9.3.0.0.0.glb',
      '4.3.0.0.0.glb', '4.1.0.0.0.glb', '4.1.1.0.0.glb', '4.1.2.0.0.glb',
      '3.2.0.0.0.glb', '6.12.0.0.0.glb'
    ];
    if (transparentOuterPaths.includes(url)) return false;

    // Parts starting with these prefixes are inner/subcortical/brainstem
    // These remain solid/opaque even when transparency slider is used
    const subcorticalPrefixes = ['3.', '4.', '5.', '6.', '7.', '9.', '0.'];
    if (subcorticalPrefixes.some(p => url.startsWith(p))) return true;
    
    // Specific inner parts in the 1.x region that should be solid
    const innerSolidPrefixes = [
      '1.1.5.1.', // Cingulate Gyrus
      '1.1.5.2.', // Cingulate Gyrus subparts
      '1.1.5.3.', // Hippocampus / Amygdala
      '1.1.5.4.',
      '1.1.5.5.',
      '1.1.4.3.', // Parahippocampal gyrus
      '1.1.1.1.', // Parahippocampal gyrus (alternate IDs)
    ];
    if (innerSolidPrefixes.some(p => url.startsWith(p))) return true;
    
    return false;
  }, [url]);

  const isOuterPart = useMemo(() => {
    // We check isSubcorticalPart first to avoid overlap for things like Dentate Nucleus
    if (isSubcorticalPart) return false;

    // Broad lobe prefixes for full visibility and transparency control
    if (url.startsWith('1.1.1.')) return true; // Frontal Lobe
    if (url.startsWith('1.1.2.')) return true; // Parietal Lobe
    if (url.startsWith('1.1.3.')) return true; // Occipital Lobe
    if (url.startsWith('1.1.4.')) return true; // Temporal Lobe
    if (url.startsWith('2.')) return true;     // Cerebellum

    // Newly requested visible parts (Outer/Transparency)
    const activeOuterPrefixes = [
      '1.1.6.', '1.1.7.', '1.1.8.', '1.1.9.', '1.1.10.'
    ];
    if (activeOuterPrefixes.some(p => url.startsWith(p))) return true;

    // Specific Whitelist for other parts affected by transparency
    const specificWhitelist = [
      '7.2.2.0.0.glb',
      '7.2.1.2.0.glb',
      '7.3.0.0.0.glb',
      '9.2.0.0.0.glb', // Middle cerebellar peduncles
      '9.1.0.0.0.glb', // Corpus Callosum
      '9.3.0.0.0.glb',
      '4.3.0.0.0.glb', // Brain stem : Pons
      '4.1.0.0.0.glb', // Medulla oblongata
      '4.1.1.0.0.glb', // Medulla oblongata : Pyramid
      '4.1.2.0.0.glb', // Medulla oblongata : Olive
      '3.2.0.0.0.glb', // Medulla Oblongata
      '6.12.0.0.0.glb'
    ];
    
    if (specificWhitelist.includes(url)) return true;
    
    return false;
  }, [url, isSubcorticalPart]);

  // "Remove the rest" - hide any part that is not in the outer whitelist and not in the subcortical list
  const isActuallyVisible = useMemo(() => {
    // Special rule: Only show 1.1.1.1.3 and 1.1.1.1.1 when Parahippocampal gyrus (1.1.1.1.2.glb) is selected
    if (url === '1.1.1.1.1.glb' || url === '1.1.1.1.3.glb') {
      return selectedPart === '1.1.1.1.2.glb';
    }

    // Explicit check for blacklisted items
    const blacklist = [
      '1.1.5.0.0.glb', 
      '1.1.7.0.0.glb',
      '1.1.8.0.0.glb',
      '4.0.0.0.0.glb', 
      '4.3.2.0.0.glb',
      '5.5.6.0.0.glb',
      '7.2.1.1.0.glb',
      '7.2.1.0.0.glb',
      '7.1.1.0.0.glb',
      '7.1.2.0.0.glb',
      '2.1.1.0.0.glb',
      '1.1.3.1.1.glb',
      '1.1.3.2.0.glb',
      '4.8.3.0.0.glb',
      '7.2.1.2.0.glb',
      '1.1.1.8.0.glb',
      '1.1.1.7.0.glb',
      '1.1.3.3.0.glb',
      '6.12.0.0.0.glb',
      '1.1.4.6.1.glb',
      '9.1.0.0.0.glb',
    ];
    if (blacklist.includes(url)) return false;

    // If ID matches customName AND it is NOT one of the catch-all regions (which we want to show), hide it.
    // However, this might be hiding too much. Let's instead hide ONLY if it's NOT in our customNames list.
    // Wait, the user wants nameless parts removed. 
    // This is essentially same as: if (!customNames[id]) hide it.
    const isInitialized = Object.keys(partSettings).length > 0;
    if (isInitialized) {
      if (!settings || url.replace('.glb', '') === customName) {
        return false;
      }
    }
    
    if (isOuterPart) return true;
    if (isSubcorticalPart) return true;
    return false;
  }, [url, isOuterPart, isSubcorticalPart, selectedPart, customName, partSettings, settings]);

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

  const isPartInActiveRegion = useMemo(() => {
    if (!activeRegion) return true;
    return regionsMap[activeRegion]?.partIds.includes(url);
  }, [activeRegion, url]);

  let isSelected = selectedPart === url;
  let isFaded = false;

  // 1. Regions Interactive Isolation (from Perfect state):
  // When a region is active, only parts within that region can be hovered or clicked. Other parts are faded and non-interactive.
  if (activeRegion && !isPartInActiveRegion) {
    isFaded = true;
  }

  // 2. Global fade logic:
  // If fadeUnselected is active, fade anything that isn't selected or matches search.
  if (fadeUnselected) {
    const isAnyActive = selectedPart || isSearching;
    if (isAnyActive) {
      const isCurrentActive = isSelected;
      if (isSearching) {
        if (customName.toLowerCase().includes(query)) {
          // Keep search matches illuminated
          isFaded = false;
        } else if (!isCurrentActive) {
          isFaded = true;
        }
      } else if (!isCurrentActive) {
        isFaded = true;
      }
    }
  }

  // Initial setup for the meshes in the cloned scene + backfaces for solid capping fill
  useEffect(() => {
    clonedScene.frustumCulled = false;
    
    const meshes: THREE.Mesh[] = [];
    clonedScene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh && !child.userData.isBackface) {
        meshes.push(child as THREE.Mesh);
      }
    });
    
    meshes.forEach((mesh) => {
      mesh.frustumCulled = false;
      mesh.geometry.computeBoundingBox();
      mesh.geometry.computeBoundingSphere();
      
      if (!mesh.userData.originalMaterial) {
        mesh.userData.originalMaterial = mesh.material;
      }
      
      // Try to find if a backface mesh already exists
      let backfaceMesh = mesh.userData.backfaceMesh as THREE.Mesh;
      if (!backfaceMesh) {
        // Create a basic material for backfaces that will be dynamically colored to match parent color under slicing
        const backMat = new THREE.MeshBasicMaterial({
          color: new THREE.Color('#FFFFFF'),
          side: THREE.BackSide,
          clippingPlanes: clippingPlanes,
          transparent: true,
          opacity: 1.0,
        });

        backfaceMesh = new THREE.Mesh(mesh.geometry, backMat);
        backfaceMesh.frustumCulled = false;
        backfaceMesh.userData.isBackface = true;
        mesh.userData.backfaceMesh = backfaceMesh;
        mesh.add(backfaceMesh);
      }
    });
  }, [clonedScene, clippingPlanes, isOuterPart]);

  // Apply materials and visibility based on state
  useEffect(() => {
    clonedScene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (mesh.userData.isBackface) {
          return; // Skip backface mesh in main materials/visibility traversal!
        }
        const originalMat = mesh.userData.originalMaterial as THREE.MeshStandardMaterial;
        if (!originalMat) {
          return; // Guard in case originalMaterial is not yet setup
        }
        
        // Reuse or create the optimized material
        let mat = mesh.userData.managedMaterial as THREE.MeshStandardMaterial;
        
        const currentMatIsPhysical = mat && (mat instanceof THREE.MeshPhysicalMaterial);
        
        // Use physical material if glassyMode is on OR if it's an outer part that is semi-transparent
        const needsPhysicalMat = glassyMode || (isOuterPart && transparencyLevel < 0.99);

        if (!mat || (needsPhysicalMat && !currentMatIsPhysical) || (!needsPhysicalMat && currentMatIsPhysical)) {
          if (mat) mat.dispose();
          
          if (needsPhysicalMat) {
            const physMat = new THREE.MeshPhysicalMaterial();
            (THREE.MeshStandardMaterial.prototype.copy as any).call(physMat, originalMat);
            physMat.transmission = (isOuterPart && transparencyLevel < 0.99) ? 1.0 - transparencyLevel : 0.0;
            physMat.thickness = (isOuterPart && transparencyLevel < 0.99) ? 1.5 : 0.0;
            physMat.roughness = glassyMode ? 0.15 : (originalMat.roughness ?? 0.2);
            physMat.metalness = glassyMode ? 0.95 : (originalMat.metalness ?? 0.1);
            physMat.clearcoat = glassyMode ? 1.0 : 0.0;
            physMat.clearcoatRoughness = 0.1;
            physMat.ior = 1.5;
            mat = physMat;
          } else {
            mat = originalMat.clone() as THREE.MeshStandardMaterial;
          }
          
          if (isOuterPart) {
            mat.onBeforeCompile = (shader) => {
              shader.uniforms.uIsSlicing = { value: isSlicing ? 1.0 : 0.0 };
              
              shader.vertexShader = 'varying vec3 vLocalPosition;\nvarying vec3 vLocalNormal;\n' + shader.vertexShader;
              shader.vertexShader = shader.vertexShader.replace(
                '#include <begin_vertex>',
                `
                #include <begin_vertex>
                vLocalPosition = vec3(position);
                vLocalNormal = vec3(normal);
                `
              );

              shader.fragmentShader = 'varying vec3 vLocalPosition;\nvarying vec3 vLocalNormal;\nuniform float uIsSlicing;\n' + shader.fragmentShader;
              shader.fragmentShader = shader.fragmentShader.replace(
                '#include <color_fragment>',
                `
                #include <color_fragment>
                float d = dot(normalize(vLocalPosition), normalize(vLocalNormal));
                if (uIsSlicing > 0.5 && d <= 0.0) {
                  // Interior cavity rendered as solid white to fill hollow spaces!
                  diffuseColor = vec4(1.0, 1.0, 1.0, 1.0);
                }
                `
              );
              mesh.userData.shader = shader;
            };
          }

          mat.clippingPlanes = clippingPlanes;
          mat.clipShadows = false; 
          mesh.userData.managedMaterial = mat;
          mesh.material = mat;
        }

        // Update properties - MUST be FrontSide for solid interior capping overlay logic to render perfectly!
        mat.side = THREE.FrontSide;

        if (mesh.userData.shader) {
          mesh.userData.shader.uniforms.uIsSlicing.value = isSlicing ? 1.0 : 0.0;
        }

        // CRITICAL FIX: Only let outer parts be transparent under transparencyLevel.
        // Inner parts remain completely solid and write to depth buffer to prevent flickering/sorting issues.
        const needsAlpha = isFaded || meshMode || (isOuterPart && transparencyLevel < 1 && !isSelected);
        
        // Update basic properties WITHOUT re-creating the material
        mat.transparent = needsAlpha;
        mat.depthWrite = !needsAlpha || (!meshMode && !isOuterPart && !isFaded);
        mat.depthTest = true;
        // Disable polygon offset to prevent depth displacement "cracks" and gaps between adjacent parts!
        mat.polygonOffset = false;

        if (meshMode && isSelected) {
          mat.opacity = 0.8;
          mat.color.set('#001133');
          mat.emissive.set('#00ffff');
          mat.emissiveIntensity = 1.0;
          mat.wireframe = true;
        } else if (isSelected) {
          mat.emissiveIntensity = 0.2;
          if (isOuterPart) {
            mat.emissive.set('#8b7355');
            mat.color.set('#b8956e'); // bronze gold focus for outer lobes
          } else {
            mat.emissive.set('#4d2600');
            mat.color.set('#8B5A2B'); // rich warm brown for selected inner parts
          }
          mat.opacity = 1;
          mat.wireframe = false;
          if (mat instanceof THREE.MeshPhysicalMaterial) {
            mat.transmission = 0;
            mat.metalness = glassyMode ? 0.95 : 0.2;
            mat.roughness = glassyMode ? 0.1 : 0.4;
            mat.clearcoat = glassyMode ? 1.0 : 0.0;
          } else {
            mat.metalness = glassyMode ? 0.9 : 0.2;
            mat.roughness = glassyMode ? 0.1 : 0.4;
          }
        } else if (isHovered && !meshMode && !fadeUnselected) {
          mat.color.set('#c9a882'); // Uniform elegant gold/tan bronze hover highlight for all parts
          mat.opacity = 1;
          mat.wireframe = false;
          mat.emissiveIntensity = 0;
          if (mat instanceof THREE.MeshPhysicalMaterial) {
            mat.transmission = 0;
            mat.metalness = glassyMode ? 0.95 : 0.15;
            mat.roughness = glassyMode ? 0.1 : 0.45;
            mat.clearcoat = glassyMode ? 1.0 : 0.0;
          } else {
            mat.metalness = glassyMode ? 0.95 : 0.15;
            mat.roughness = glassyMode ? 0.1 : 0.45;
          }
        } else if (isFaded) {
          mat.opacity = 0.04;
          if (isOuterPart) {
            mat.color.set('#FAF9F6'); // Elegant alabaster for unselected faded outer parts
          } else {
            mat.color.set('#D8C3A5'); // Beige for unselected faded inner parts to keep identity
          }
          mat.emissive.set('#000000');
          mat.emissiveIntensity = 0; 
          mat.wireframe = meshMode;
          if (mat instanceof THREE.MeshPhysicalMaterial) {
            mat.transmission = 0;
            mat.roughness = 0.9;
            mat.metalness = 0.1;
            mat.clearcoat = 0;
          } else {
            mat.roughness = 0.9;
            mat.metalness = 0.1;
          }
        } else {
          // Normal state unselected
          if (isOuterPart) {
            mat.opacity = meshMode ? 0.2 : transparencyLevel;
            if (glassyMode && mat instanceof THREE.MeshPhysicalMaterial) {
               // If glassy mode is on and outer parts are transparent:
               if (transparencyLevel < 0.99) {
                 mat.transmission = 1.0 - transparencyLevel;
                 mat.opacity = 1.0; // PBR transmission uses full opacity
                 mat.thickness = 1.5;
                 mat.roughness = 0.15;
                 mat.ior = 1.5;
               } else {
                 mat.transmission = 0.0;
                 mat.opacity = 1.0;
                 mat.thickness = 0.0;
                 mat.roughness = 0.15;
               }
            } else {
               if (mat instanceof THREE.MeshPhysicalMaterial) {
                 mat.transmission = 0.0;
               }
            }
          } else {
            mat.opacity = meshMode ? 0.2 : 1.0;
            if (mat instanceof THREE.MeshPhysicalMaterial) {
               mat.transmission = 0.0;
            }
          }
          
          if (isOuterPart) {
            mat.color.set('#FAF9F6'); // Elegant alabaster default color for unselected outer lobes
          } else {
            mat.color.set('#D8C3A5'); // Elegant beige default color for unselected inner subcortical parts
          }
          mat.emissiveIntensity = 0;
          mat.wireframe = !!meshMode;

          if (mat instanceof THREE.MeshPhysicalMaterial) {
            mat.metalness = glassyMode ? 0.95 : 0.1;
            mat.roughness = glassyMode ? 0.15 : 0.5;
            mat.clearcoat = glassyMode ? 1.0 : 0.0;
          } else {
            mat.metalness = glassyMode ? 0.95 : 0.1;
            mat.roughness = glassyMode ? 0.15 : 0.5;
          }
        }

        // Handle backface mesh for solid capping look
        let backfaceMesh = mesh.userData.backfaceMesh as THREE.Mesh;
        if (backfaceMesh) {
          backfaceMesh.visible = child.visible && isSlicing && !meshMode;
          if (backfaceMesh.visible) {
            const backMat = backfaceMesh.material as THREE.MeshBasicMaterial;
            backMat.clippingPlanes = clippingPlanes;
            
            if (mat && 'color' in mat) {
              backMat.color.copy((mat as any).color);
            } else {
              backMat.color.set('#FFFFFF');
            }
            
            // Adjust opacity dynamically to fill interior gaps completely and look perfect
            backMat.opacity = isSelected ? 1.0 : (isFaded ? 0.15 : 1.0);
            backMat.transparent = backMat.opacity < 1.0;
            backMat.depthWrite = true; // Write depth for proper overlap sorting
            backMat.depthTest = mat.depthTest;
          }
        }

        // Notify Three.js if compiler-changing properties changed to avoid solid white or disappearing glitches
        const prevTransparent = mesh.userData.prevTransparent;
        const prevWireframe = mesh.userData.prevWireframe;
        const prevSide = mesh.userData.prevSide;

        if (prevTransparent !== mat.transparent || prevWireframe !== mat.wireframe || prevSide !== mat.side) {
          mat.needsUpdate = true;
          mesh.userData.prevTransparent = mat.transparent;
          mesh.userData.prevWireframe = mat.wireframe;
          mesh.userData.prevSide = mat.side;
        }

        // Handle visibility - only hide if completely invisible and not needed
        if (isOuterPart && transparencyLevel <= 0 && !isSelected && !isHovered && !meshMode && !isSearching) {
          child.visible = false;
        } else {
          child.visible = true;
        }
      }
    });

    return () => {
      // In case we want to cleanup specific state on dependency change
    };
  }, [
    clonedScene, 
    isSelected, 
    isHovered, 
    isFaded, 
    meshMode, 
    transparencyLevel, 
    glassyMode, 
    isSearching, 
    isSlicing, 
    sliceX,
    sliceY,
    sliceZ,
    selectedPart, 
    focusedPart, 
    hoveredPart, 
    fadeUnselected, 
    clippingPlanes
  ]);

  // Animate dissection
  useFrame(() => {
    if (!primitiveRef.current) return;
    
    const targetPos = new THREE.Vector3();
    if (isDissected) {
      // Move outwards from center (0,0,0) based on the part's center
      const dir = center.clone().normalize();
      targetPos.copy(dir).multiplyScalar(8); 
    }
    
    // Only lerp if we are not at target to save cycles
    if (primitiveRef.current.position.distanceToSquared(targetPos) > 0.0001) {
      primitiveRef.current.position.lerp(targetPos, 0.05);
    }
  });

  // Cleanup hovered state on unmount
  useEffect(() => {
    return () => {
      if (hoveredPart === url) {
        setHoveredPart(null);
      }
    };
  }, [url, hoveredPart, setHoveredPart]);

  const currentOpacity = isOuterPart ? (meshMode ? 0.2 : (glassyMode ? 1 : transparencyLevel)) : (meshMode ? 0.2 : 1.0);
  
  // Disable hover/interactions on outer parts only when they are transparent AND we are not slicing.
  // When slicing, we allow full interaction to let users hover and select cut elements easily.
  const isInteractionsDisabled = isOuterPart && transparencyLevel < 0.99 && !isSlicing;

  // Update dynamic slicing constants and wrap raycasting in Three.js mesh to ignore clipped points
  clonedScene.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      const mesh = child as THREE.Mesh;
      mesh.userData.sliceX = sliceX;
      mesh.userData.sliceY = sliceY;
      mesh.userData.sliceZ = sliceZ;
      mesh.userData.isSlicing = isSlicing;
      
      if (!mesh.userData.originalRaycast) {
        mesh.userData.originalRaycast = mesh.raycast;
      }
      
      mesh.raycast = function(raycaster, intersects) {
        const originalIntersectsLength = intersects.length;
        this.userData.originalRaycast.call(this, raycaster, intersects);
        
        const isSlicingVal = this.userData.isSlicing;
        const sliceValX = this.userData.sliceX ?? 30;
        const sliceValY = this.userData.sliceY ?? 30;
        const sliceValZ = this.userData.sliceZ ?? 30;
        
        if (isSlicingVal && intersects.length > originalIntersectsLength) {
          for (let i = intersects.length - 1; i >= originalIntersectsLength; i--) {
            const hit = intersects[i];
            const point = hit.point;
            
            let isClipped = false;
            const eps = 0.001; // Extremely precise epsilon for perfect slicing alignment
            if (sliceValX < 29.9 && point.x > sliceValX + eps) isClipped = true;
            if (sliceValY < 29.9 && point.y > sliceValY + eps) isClipped = true;
            if (sliceValZ < 29.9 && point.z > sliceValZ + eps) isClipped = true;
            
            if (isClipped) {
              intersects.splice(i, 1);
            }
          }
        }
      };
    }
  });

  if (!isActuallyVisible) return null;

  return (
    <primitive 
      ref={primitiveRef}
      object={clonedScene} 
      renderOrder={isOuterPart ? 0 : 1} // Render inner parts after outer parts
      onClick={(e: any) => {
        if (!isPartInActiveRegion) return;
        if (isInteractionsDisabled && !isSelected) return; 
        e.stopPropagation();
        onClick(url);
      }}
      onPointerOver={(e: any) => {
        if (!isPartInActiveRegion) return;
        if (isInteractionsDisabled) return;
        
        e.stopPropagation();
        setIsHovered(true);
        setHoveredPart(url);
        document.body.style.cursor = 'pointer';
      }}
      onPointerMove={(e: any) => {
        if (!isPartInActiveRegion) return;
        if (isInteractionsDisabled) return;
        
        e.stopPropagation();
        if (!isHovered) {
          setIsHovered(true);
          setHoveredPart(url);
          document.body.style.cursor = 'pointer';
        }
      }}
      onPointerOut={(e: any) => {
        e.stopPropagation();
        setIsHovered(false);
        if (useStore.getState().hoveredPart === url) {
          setHoveredPart(null);
        }
        document.body.style.cursor = 'auto';
      }}
    />
  );
}
