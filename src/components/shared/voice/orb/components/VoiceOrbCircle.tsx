import { Canvas } from '@react-three/fiber';
import OrbTextureMesh from './VoiceOrbTextureMesh';
import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import tinycolor from 'tinycolor2';

interface VoiceOrbCircleProps {
  color?: string;
  fadeInDelayMs?: number;
  fadeInDurationMs?: number;
  animateTextureMesh: boolean;
  speedRef: React.MutableRefObject<number>;
  intensityRef: React.MutableRefObject<number>;
}

const VoiceOrbCircle: React.FunctionComponent<VoiceOrbCircleProps> = React.memo(
  ({
    color,
    fadeInDelayMs = 1000,
    fadeInDurationMs = 1500,
    animateTextureMesh,
    speedRef,
    intensityRef
  }: VoiceOrbCircleProps) => {
    const floatAnimationDelay = fadeInDelayMs / 1000;
    const fadeInDelay = fadeInDelayMs / 1000;
    const fadeInDuration = fadeInDurationMs / 1000;

    return (
      <motion.div
        initial={{ y: 50 }}
        animate={{
          y: [0, -10, 0],
          transition: {
            delay: floatAnimationDelay,
            duration: 5,
            ease: 'easeInOut',
            repeat: Infinity, // repeat floating animation infinitely
            repeatType: 'mirror'
          }
        }}
        style={{ height: '100%', width: '100%' }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: {
              delay: fadeInDelay,
              duration: fadeInDuration
            }
          }}
          style={{ height: '100%', width: '100%' }}
        >
          <div
            style={{
              boxShadow: `0px 4px 40px 0px rgba(0, 0, 0, 0.25), 0 0 80px ${color}, 0 0 0px ${color}`,
              borderRadius: '9999px',
              width: '100%',
              height: '100%'
            }}
          >
            <div
              style={{
                overflow: 'hidden',
                borderRadius: '9999px',
                width: '100%',
                height: '100%'
              }}
            >
              <CircleMask color={color} />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{
                  opacity: animateTextureMesh ? 1 : 0,
                  transition: {
                    delay: 1,
                    duration: 0.5
                  }
                }}
                style={{ height: '100%', width: '100%' }}
              >
                {animateTextureMesh && (
                  <Canvas
                    gl={{
                      preserveDrawingBuffer: true,
                      premultipliedAlpha: false,
                      alpha: true,
                      // @ts-ignore
                      transparent: true,
                      antialias: true,
                      precision: 'highp',
                      powerPreference: 'high-performance'
                    }}
                    dpr={[2, 2]}
                    camera={{
                      fov: 75,
                      near: 0.1,
                      far: 1000,
                      position: [0, 0, 32]
                    }}
                    style={{ height: '100%', width: '100%' }}
                  >
                    <OrbTextureMesh color={color} speedRef={speedRef} intensityRef={intensityRef} />
                  </Canvas>
                )}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  },
  (p1, p2) => p1.animateTextureMesh === p2.animateTextureMesh
);

const CircleMask = ({ color }) => {
  return (
    <div
      style={{
        overflow: 'hidden',
        borderRadius: '9999px',
        position: 'absolute',
        zIndex: 2,
        width: '100%',
        height: '100%',
        background: `radial-gradient(
        54.75% 54.75% at 50% 50%,
        ${tinycolor(color).setAlpha(0).toRgbString()} 70.24%,
        ${tinycolor(color).setAlpha(0.6).toRgbString()} 100%
      ),
      linear-gradient(
        135deg,
        rgba(22, 35, 37, 0.54) 0%,
        ${tinycolor(color).setAlpha(0).toRgbString()} 100%
      ),
      radial-gradient(
        50% 50% at 50% 50%,
        ${tinycolor(color).setAlpha(0).toRgbString()} 0%,
        ${tinycolor(color).setAlpha(0.65).toRgbString()} 90.5%
      )`,
        backgroundBlendMode: 'normal, darken, normal'
      }}
    />
  );
};

export default VoiceOrbCircle;
