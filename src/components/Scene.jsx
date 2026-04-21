import React, { useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

import Humanoid from './Humanoid';
import OrbitingTask from './OrbitingTask';
import BlackHole from './BlackHole';
import * as THREE from 'three';

function Particles({ warpMode }) {
  const count = 2000;
  const meshRef = useRef();

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      pos[i] = (Math.random() - 0.5) * 30;
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    if (!meshRef.current) return;

    // Warp speed effect
    if (warpMode) {
      meshRef.current.position.z += 2;
      meshRef.current.scale.z = 20;
      if (meshRef.current.position.z > 15) {
        meshRef.current.position.z = -15;
      }
    } else {
      meshRef.current.position.z = THREE.MathUtils.lerp(meshRef.current.position.z, 0, 0.1);
      meshRef.current.scale.z = THREE.MathUtils.lerp(meshRef.current.scale.z, 1, 0.1);
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={warpMode ? 0.2 : 0.05}
        color="#22d3ee"
        transparent
        opacity={warpMode ? 0.8 : 0.6}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function HolographicScan({ active }) {
  const scanRef = useRef();

  useFrame((state) => {
    if (!scanRef.current) return;
    if (active) {
      scanRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 3) * 2;
      scanRef.current.visible = true;
    } else {
      scanRef.current.visible = false;
    }
  });

  return (
    <mesh ref={scanRef} rotation={[-Math.PI / 2, 0, 0]} visible={false}>
      <planeGeometry args={[5, 5]} />
      <meshBasicMaterial
        color="#22d3ee"
        transparent
        opacity={0.3}
        side={THREE.DoubleSide}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

function DynamicLights({ mood }) {
  const lightRef = useRef();

  const targetColors = useMemo(() => ({
    idle: new THREE.Color('#22d3ee'),
    thinking: new THREE.Color('#a855f7'),
    alert: new THREE.Color('#f59e0b')
  }), []);

  useFrame(() => {
    if (lightRef.current) {
      lightRef.current.color.lerp(targetColors[mood] || targetColors.idle, 0.05);
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight ref={lightRef} position={[2, 3, 2]} intensity={100} distance={20} />
      <pointLight position={[-2, -1, 2]} color="#a855f7" intensity={60} distance={20} />
      <pointLight position={[0, -3, -2]} color="#3b82f6" intensity={80} distance={20} />
    </>
  );
}

export default function Scene({ gravityMode, warpMode, scanMode, triggerPulse, onCharacterClick, aiMood = 'idle', tasks = [], onDeleteTask }) {
  const [orbitEnabled, setOrbitEnabled] = useState(true);

  return (
    <Canvas camera={{ position: [0, 1.5, 8], fov: warpMode ? 75 : 45 }}>
      <fog attach="fog" args={['#0b0f1a', warpMode ? 0.05 : 0.02]} />

      <DynamicLights mood={aiMood} />

      <Particles warpMode={warpMode} />

      <HolographicScan active={scanMode} />

      <Humanoid
        gravityMode={gravityMode}
        triggerPulse={triggerPulse}
        onClick={onCharacterClick}
      />
      
      <BlackHole position={[4, -3, 0]} />

      {tasks.map((task, idx) => (
        <OrbitingTask
          key={task.id}
          task={task}
          index={idx}
          total={tasks.length}
          onDelete={onDeleteTask}
          onDragStateChange={(isDragging) => setOrbitEnabled(!isDragging)}
        />
      ))}

      <OrbitControls
        enableDamping
        dampingFactor={0.05}
        maxDistance={15}
        minDistance={3}
        enabled={orbitEnabled}
        autoRotate={!warpMode && orbitEnabled}
        autoRotateSpeed={0.5}
        target={[0, 0, 0]}
      />
    </Canvas>
  );
}