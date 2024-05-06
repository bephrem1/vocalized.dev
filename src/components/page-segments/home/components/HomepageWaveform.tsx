import * as THREE from 'three';

import { FunctionComponent, useEffect, useRef, useState } from 'react';

import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls.js';
import { useOpacity } from '../../../../hooks/animation';

interface HomepageWaveformProps {
  fadeInDelayMs?: number;
}

const HomepageWaveform: FunctionComponent<HomepageWaveformProps> = ({ fadeInDelayMs = 2000 }) => {
  const mountRef = useRef(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const controlsRef = useRef(null);
  const clockRef = useRef(new THREE.Clock());

  useEffect(() => {
    const init = () => {
      const mount = mountRef.current;

      // create scene
      const scene = new THREE.Scene();
      scene.background = new THREE.Color('#0a0a0a');
      scene.fog = new THREE.FogExp2('#ffffff', 0.0001);

      // create camera
      const camera = new THREE.PerspectiveCamera(
        70,
        window.innerWidth / window.innerHeight,
        1,
        20000
      );
      camera.position.y = 800;

      // create renderer
      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
      mount.appendChild(renderer.domElement);

      // Create controls
      const controls = new FirstPersonControls(camera, renderer.domElement);
      controls.enabled = false;

      // Save references
      sceneRef.current = scene;
      rendererRef.current = renderer;
      controlsRef.current = controls;

      // Add resize event listener
      window.addEventListener('resize', onWindowResize);

      // Add mesh to the scene
      const geometry = new THREE.PlaneGeometry(20000, 20000, 600, 1);
      geometry.rotateX(-Math.PI / 6);
      const texture = new THREE.TextureLoader().load('textures/water.jpg');
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(5, 5);
      texture.colorSpace = THREE.SRGBColorSpace;
      const material = new THREE.MeshBasicMaterial({ color: 0xaefcd5, map: texture });
      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      // Set initialized to true
      setIsInitialized(true);
    };

    const onWindowResize = () => {
      const { innerWidth, innerHeight } = window;
      const camera = controlsRef.current.object;
      camera.aspect = innerWidth / innerHeight;
      camera.updateProjectionMatrix();
      rendererRef.current.setSize(innerWidth, innerHeight);
      controlsRef.current.handleResize();
    };

    if (!isInitialized) {
      init();
    }

    const animate = () => {
      if (!isInitialized) return;

      requestAnimationFrame(animate);
      render();
    };

    const render = () => {
      const delta = clockRef.current.getDelta();
      const time = clockRef.current.getElapsedTime() * 20;
      const scene = sceneRef.current;
      const geometry = scene ? scene.children[0].geometry : null; // Check if scene exists and has children
      const position = geometry ? geometry.attributes.position : null; // Check if geometry exists

      if (position) {
        for (let i = 0; i < position.count; i++) {
          const y = 35 * Math.sin(i / 5 + (time + i) / 7);
          position.setY(i, y);
        }

        position.needsUpdate = true;
      }

      controlsRef.current.update(delta);
      rendererRef.current.render(scene, controlsRef.current.object);
    };

    animate();

    return () => {
      window.removeEventListener('resize', onWindowResize);
    };
  }, [isInitialized]);

  const opacity = useOpacity({ fadeInDelayMs, start: 0, end: 1 });

  return <div ref={mountRef} style={{ opacity }} />;
};

export default HomepageWaveform;
