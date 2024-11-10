import { useLoader, useFrame } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { useRef, useState } from 'react';
import * as THREE from 'three';
import TWEEN from '@tweenjs/tween.js'


export default function Model() {
  const deoRef = useRef();
  const meshByNameRef = useRef([]);

  const [isHovered, setHovered] = useState(false);

 
  const handleClick = () => {
    if (isHovered) {
      const menuContent = document.querySelector('.info-content');
      const closeButton = menuContent.querySelector('.close-button');

      // Reset the translate and hide the content
      menuContent.style.transform = 'translateX(100%)';
      menuContent.style.display = 'none';

      // Show the content with animation
      menuContent.style.display = 'block';
      setTimeout(() => {
        menuContent.style.transform = 'translateX(0%)';
      }, 20);

      // Add event listener to close button
      closeButton.addEventListener('click', () => {
        // Hide the content with animation
        menuContent.style.transform = 'translateX(100%)';
        setTimeout(() => {
          menuContent.style.display = 'none';
        }, 400);
      });
    }
  };
  

  useFrame((state, delta) => {
    const meshes = meshByNameRef.current;
    // Animation
    meshes.forEach((mesh, index) => {
      if (mesh) {
        const delay = index * 0.5;
        const time = state.clock.getElapsedTime() - delay;
        mesh.position.y = 6 + -Math.sin(time) * 2;

        if (mesh.name === 'Object_6') {
          mesh.rotation.z = time;
          mesh.position.y = 0;
        }
        if (mesh.name === 'Sketchfab_model007') {
          mesh.rotation.z = time;
          mesh.position.y = 2.5;
        }

    
      }
    });

    // Raycast logic...
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(state.mouse, state.camera);
    raycaster.params.Points.threshold = 0.01; 

    const intersects = raycaster.intersectObject(deoObject6, true); 
    const intersects2 = raycaster.intersectObject(deoObject10, true); 

    if (intersects.length || intersects2.length > 0) {
      state.gl.domElement.style.cursor = 'pointer';

      setHovered(true);
    } else {
      state.gl.domElement.style.cursor = 'grab';

      setHovered(false);
    }
  });

  const model = useLoader(GLTFLoader, './exhibition.glb', (loader) => {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('./draco/');
    loader.setDRACOLoader(dracoLoader);
  });

  const deoObject1 = model.scene.getObjectByName('Cube002');
  const deoObject2 = model.scene.getObjectByName('Cube003');
  const deoObject3 = model.scene.getObjectByName('element3');
  const deoObject4 = model.scene.getObjectByName('element4');
  const deoObject7 = model.scene.getObjectByName('element5');
  const deoObject5 = model.scene.getObjectByName('logo');
  const deoObject6 = model.scene.getObjectByName('Object_6');
  const deoObject10 = model.scene.getObjectByName('Sketchfab_model007');

  // Raycast
  if (deoObject1 && deoObject2 && deoObject3 && deoObject4 && deoObject5 && deoObject6 && deoObject7 && deoObject10) {
    meshByNameRef.current = [deoObject1, deoObject2, deoObject3, deoObject4, deoObject5, deoObject6, deoObject7, deoObject10];
  }

  return (
    <group>
      <primitive object={model.scene} scale={0.5} onClick={handleClick} />
      {isHovered && <mesh onClick={handleClick} />}
    </group>
  );
}