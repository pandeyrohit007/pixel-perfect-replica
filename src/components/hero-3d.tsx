import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function Girders() {
  const group = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.05;
  });
  const bars = Array.from({ length: 14 });
  return (
    <group ref={group}>
      {bars.map((_, i) => {
        const angle = (i / bars.length) * Math.PI * 2;
        const r = 4.5;
        return (
          <Float key={i} speed={1 + (i % 3)} rotationIntensity={0.3} floatIntensity={0.6}>
            <mesh position={[Math.cos(angle) * r, Math.sin(angle * 1.3) * 1.5, Math.sin(angle) * r]} rotation={[angle, angle * 0.5, 0]}>
              <boxGeometry args={[0.15, 2.2, 0.15]} />
              <meshStandardMaterial color="#f59e0b" metalness={0.7} roughness={0.3} emissive="#f59e0b" emissiveIntensity={0.15} />
            </mesh>
          </Float>
        );
      })}
    </group>
  );
}

function Blob() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.15;
      ref.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });
  return (
    <mesh ref={ref} position={[0, 0, -2]}>
      <icosahedronGeometry args={[2.2, 4]} />
      <MeshDistortMaterial color="#1d4ed8" distort={0.4} speed={1.5} metalness={0.6} roughness={0.2} />
    </mesh>
  );
}

export function Hero3D() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return (
    <Canvas
      className="!absolute inset-0"
      camera={{ position: [0, 0, 8], fov: 55 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />
      <pointLight position={[-5, -3, -2]} intensity={0.8} color="#f59e0b" />
      <Blob />
      <Girders />
    </Canvas>
  );
}
