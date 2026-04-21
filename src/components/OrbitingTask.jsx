import React, { useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Text, DragControls } from '@react-three/drei';
import * as THREE from 'three';

export default function OrbitingTask({ task, index, total, onDelete, onDragStateChange }) {
  const groupRef = useRef();
  const [isDragging, setIsDragging] = useState(false);
  const { camera } = useThree();
  
  const startAngle = (index / total) * Math.PI * 2;
  const radius = 2.5; 
  const speed = 0.5;

  useFrame((state) => {
    if (!groupRef.current) return;
    
    if (!isDragging) {
      const t = state.clock.getElapsedTime();
      const currentAngle = startAngle + (t * speed);
      
      groupRef.current.position.x = Math.cos(currentAngle) * radius;
      groupRef.current.position.z = Math.sin(currentAngle) * radius;
      groupRef.current.position.y = Math.sin(t * 2 + index) * 0.2 + 0.5;
    }
    
    groupRef.current.lookAt(camera.position);
  });

  const handleDragStart = () => {
    setIsDragging(true);
    if (onDragStateChange) onDragStateChange(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    if (onDragStateChange) onDragStateChange(false);
    
    // Check distance to black hole (positioned at [4, -3, 0])
    const blackHolePos = new THREE.Vector3(4, -3, 0);
    // Use world position to avoid nested group matrix issues
    const worldPos = new THREE.Vector3();
    groupRef.current.getWorldPosition(worldPos);
    
    if (worldPos.distanceTo(blackHolePos) < 2.5) {
      if (onDelete) onDelete(task.id);
    }
  };

  return (
    <DragControls onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <group ref={groupRef}>
        <mesh position={[0, -0.3, 0]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial 
            color={isDragging ? "#ef4444" : "#F59E0B"} 
            emissive={isDragging ? "#ef4444" : "#F59E0B"}
            emissiveIntensity={1.5}
            toneMapped={false}
          />
        </mesh>
        
        <Text
          color={isDragging ? "#ef4444" : "#ffffff"}
          fontSize={0.2}
          maxWidth={2}
          lineHeight={1}
          letterSpacing={0.02}
          textAlign="center"
          anchorX="center"
          anchorY="middle"
        >
          {task.text}
        </Text>
      </group>
    </DragControls>
  );
}
