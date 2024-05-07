import * as THREE from 'three';

import { ORB_FRAGMENT_SHADER, ORB_VERTEX_SHADER } from '.';
import React, { useRef } from 'react';

import { useFrame } from '@react-three/fiber';

const VoiceOrbTextureMesh = ({
  speedRef,
  intensityRef
}: {
  speedRef: React.MutableRefObject<number>;
  intensityRef: React.MutableRefObject<number>;
}) => {
  const mesh = useRef(null);

  useFrame((state) => {
    const { clock, mouse } = state;
    if (mesh.current) {
      mesh.current.material.uniforms.u_mouse.value = [mouse.x, mouse.y];
      mesh.current.material.uniforms.u_resolution.value = [
        window.innerWidth * window.devicePixelRatio,
        window.innerHeight * window.devicePixelRatio
      ];
      mesh.current.material.uniforms.u_intensity.value = intensityRef.current;
      mesh.current.material.uniforms.u_speed.value = speedRef.current;
      mesh.current.material.uniforms.u_time.value = clock.getElapsedTime();
    }
  });

  return (
    <mesh ref={mesh} position={[0, 0, 0]} scale={5} rotation={[-Math.PI / 2, 0, -1.5]}>
      <sphereGeometry args={[4, 1024, 1024]} />
      <shaderMaterial
        fragmentShader={ORB_FRAGMENT_SHADER}
        vertexShader={ORB_VERTEX_SHADER}
        uniforms={{
          u_intensity: { value: 0.764 },
          u_speed: { value: 0.056 },
          u_colors: {
            value: [
              new THREE.Vector4(0.36470588235294116, 0.996078431372549, 0.792156862745098, 1),
              new THREE.Vector4(0.07058823529411765, 0.0784313725490196, 0.09411764705882353, 1)
            ]
          },
          u_noise: { value: true },
          u_noise_color: { value: [1, 0, 0] },
          u_rotate: { value: true },
          u_time: { value: 0 },
          u_mouse: { value: [0, 0] },
          u_resolution: { value: [2048, 2048] }
        }}
        wireframe={false}
        wireframeLinewidth={0}
        dithering={false}
        // @ts-ignore
        flatShading={true}
        doubleSided={true}
        glslVersion="100"
      />
    </mesh>
  );
};

export default VoiceOrbTextureMesh;
