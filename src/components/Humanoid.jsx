import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Humanoid({ gravityMode, onClick }) {
  const groupRef = useRef();
  const headRef = useRef();
  const torsoRef = useRef();
  const innerCoreRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto';
  }, [hovered]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (groupRef.current) {
      if (!gravityMode) {
        groupRef.current.position.y = Math.sin(t) * 0.3;
      } else {
        groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, -2, 0.1);
      }
    }

    if (torsoRef.current && !gravityMode) {
      const breath = 1 + Math.sin(t * 2) * 0.02;
      torsoRef.current.scale.set(breath, breath, breath);
    }

    if (innerCoreRef.current) {
      innerCoreRef.current.rotation.x += 0.05;
      innerCoreRef.current.rotation.y += 0.05;
    }

    if (ring1Ref.current && ring2Ref.current) {
      ring1Ref.current.rotation.z += 0.01;
      ring2Ref.current.rotation.z -= 0.005;
    }

    if (headRef.current) {
      const mouse = state.mouse;
      headRef.current.lookAt(mouse.x * 5, mouse.y * 5 + 1.8, 5);
    }
  });

  const wireMat = (
    <meshStandardMaterial 
      color="#22d3ee" 
      wireframe 
      emissive="#116688" 
      emissiveIntensity={hovered ? 1.2 : 0.5} 
      transparent 
      opacity={0.8} 
    />
  );

  const solidMat = (
    <meshStandardMaterial 
      color="#0B0F1A" 
      emissive="#22d3ee" 
      emissiveIntensity={hovered ? 0.8 : 0.2} 
      metalness={0.9} 
      roughness={0.1} 
    />
  );

  return (
    <group 
      ref={groupRef} 
      onClick={(e) => { e.stopPropagation(); onClick(); }}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
      onPointerOut={() => setHovered(false)}
    >
      {/* Head */}
      <mesh ref={headRef} position={[0, 1.8, 0]}>
        <octahedronGeometry args={[0.4, 2]} />
        {wireMat}
      </mesh>

      {/* Torso */}
      <mesh ref={torsoRef} position={[0, 0.6, 0]}>
        <cylinderGeometry args={[0.5, 0.3, 1.5, 8, 4]} />
        {solidMat}
      </mesh>

      {/* Inner Core */}
      <mesh ref={innerCoreRef} position={[0, 0.8, 0]}>
        <icosahedronGeometry args={[0.2, 0]} />
        <meshBasicMaterial color="#22d3ee" />
      </mesh>

      {/* Left Arm */}
      <mesh position={[-0.8, 0.6, 0]} rotation={[0, 0, Math.PI / 6]}>
        <cylinderGeometry args={[0.1, 0.05, 1.2, 8]} />
        {wireMat}
      </mesh>

      {/* Right Arm */}
      <mesh position={[0.8, 0.6, 0]} rotation={[0, 0, -Math.PI / 6]}>
        <cylinderGeometry args={[0.1, 0.05, 1.2, 8]} />
        {wireMat}
      </mesh>

      {/* Left Leg */}
      <mesh position={[-0.3, -1, 0]}>
        <cylinderGeometry args={[0.15, 0.05, 1.5, 8]} />
        {solidMat}
      </mesh>

      {/* Right Leg */}
      <mesh position={[0.3, -1, 0]}>
        <cylinderGeometry args={[0.15, 0.05, 1.5, 8]} />
        {solidMat}
      </mesh>

      {/* Rings */}
      <mesh ref={ring1Ref} position={[0, 0.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.2, 0.02, 16, 100]} />
        <meshBasicMaterial color="#a855f7" transparent opacity={0.5} />
      </mesh>
      
      <mesh ref={ring2Ref} position={[0, 0.5, 0]} rotation={[Math.PI / 3, Math.PI / 4, 0]} scale={1.5}>
        <torusGeometry args={[1.2, 0.02, 16, 100]} />
        <meshBasicMaterial color="#3b82f6" transparent opacity={0.5} />
      </mesh>
    </group>
  );
}
