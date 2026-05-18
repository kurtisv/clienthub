"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Line, Text } from "@react-three/drei";
import { useRef, useState } from "react";
import type { Group, Mesh } from "three";

const modules = [
  { name: "QuotePilot", position: [-3.2, 1.45, -0.7], color: "#93c5fd" },
  { name: "ReserveFlow", position: [-2.7, -1.18, -0.35], color: "#bfdbfe" },
  { name: "CommerceKit", position: [2.9, 1.22, -0.35], color: "#fde68a" },
  { name: "EventPass", position: [3.15, -0.72, -0.58], color: "#c4b5fd" },
  { name: "SupportDesk", position: [0.72, -2.05, -0.45], color: "#bbf7d0" },
] as const;

function FloatingProjectCard({ position, title, active }: { position: [number, number, number]; title: string; active: boolean }) {
  const meshRef = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    meshRef.current.position.y = position[1] + Math.sin(clock.elapsedTime * 0.8 + position[0]) * 0.045;
    meshRef.current.scale.setScalar(active ? 1.12 : 1);
  });

  return (
    <group position={position}>
      <mesh ref={meshRef}>
        <boxGeometry args={[1.45, 0.82, 0.08]} />
        <meshStandardMaterial color={active ? "#dbeafe" : "#334155"} transparent opacity={0.78} roughness={0.22} metalness={0.12} />
      </mesh>
      <Text position={[0, 0.03, 0.071]} fontSize={0.13} color="#f8fafc" anchorX="center" anchorY="middle" maxWidth={1.16}>
        {title}
      </Text>
    </group>
  );
}

function FileStack({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {[0, 1, 2].map((index) => (
        <mesh key={index} position={[0.05 * index, 0.08 * index, 0.08 * index]} rotation={[0.08, 0.1, -0.08]}>
          <boxGeometry args={[0.9, 0.58, 0.08]} />
          <meshStandardMaterial color={index === 2 ? "#dbeafe" : "#94a3b8"} roughness={0.34} metalness={0.08} />
        </mesh>
      ))}
    </group>
  );
}

function Timeline() {
  return (
    <group position={[0, -1.15, 0.45]}>
      <Line points={[[-1.2, 0, 0], [-0.4, 0, 0], [0.4, 0, 0], [1.2, 0, 0]]} color="#93c5fd" lineWidth={2} transparent opacity={0.75} />
      {[-1.2, -0.4, 0.4, 1.2].map((x, index) => (
        <mesh key={x} position={[x, 0, 0]}>
          <sphereGeometry args={[0.08 + index * 0.01, 24, 24]} />
          <meshStandardMaterial color={index < 3 ? "#bfdbfe" : "#f8fafc"} emissive="#1d4ed8" emissiveIntensity={0.35} />
        </mesh>
      ))}
    </group>
  );
}

function ClientHubCommandCenter() {
  const groupRef = useRef<Group>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  useFrame(({ clock, pointer }) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = pointer.x * 0.12 + Math.sin(clock.elapsedTime * 0.22) * 0.05;
    groupRef.current.rotation.x = -0.18 + pointer.y * 0.04;
  });

  return (
    <group ref={groupRef} rotation={[-0.18, -0.28, 0]}>
      <mesh position={[0, -0.35, 0]} receiveShadow>
        <boxGeometry args={[2.25, 1.1, 0.22]} />
        <meshStandardMaterial color="#0f172a" roughness={0.24} metalness={0.2} />
      </mesh>
      <mesh position={[0, -0.35, 0.24]}>
        <boxGeometry args={[1.64, 0.68, 0.08]} />
        <meshStandardMaterial color="#1e293b" emissive="#1d4ed8" emissiveIntensity={0.18} transparent opacity={0.9} />
      </mesh>
      <Text position={[0, -0.34, 0.34]} fontSize={0.16} color="#e0f2fe" anchorX="center" anchorY="middle">
        Client workspace
      </Text>

      {modules.map((module, index) => (
        <group key={module.name}>
          <Line points={[[0, -0.35, 0.32], module.position]} color={module.color} lineWidth={1.4} transparent opacity={hovered === index ? 0.95 : 0.34} />
          <mesh
            position={module.position}
            onPointerOver={(event) => {
              event.stopPropagation();
              setHovered(index);
            }}
            onPointerOut={() => setHovered(null)}
          >
            <sphereGeometry args={[hovered === index ? 0.18 : 0.13, 32, 32]} />
            <meshStandardMaterial color={module.color} emissive={module.color} emissiveIntensity={hovered === index ? 0.52 : 0.2} roughness={0.2} />
          </mesh>
          <Text position={[module.position[0], module.position[1] - 0.32, module.position[2]]} fontSize={0.11} color="#cbd5e1" anchorX="center">
            {module.name}
          </Text>
        </group>
      ))}

      <FloatingProjectCard position={[-1.25, 0.72, 0.28]} title="Brand refresh" active={hovered === 0} />
      <FloatingProjectCard position={[1.18, 0.62, 0.36]} title="Launch portal" active={hovered === 3} />
      <FileStack position={[-1.58, -1.16, 0.24]} />
      <Timeline />
    </group>
  );
}

export default function ClientHubSceneCanvas() {
  return (
    <Canvas className="min-h-[440px]" style={{ width: "100%", height: "440px" }} shadows dpr={[1, 1.5]} camera={{ position: [0, 0.2, 6.4], fov: 42 }} gl={{ antialias: true, powerPreference: "high-performance" }}>
      <color attach="background" args={["#111827"]} />
      <ambientLight intensity={0.85} />
      <directionalLight position={[2, 4, 5]} intensity={1.6} castShadow />
      <pointLight position={[-3, 2, 3]} intensity={1.3} color="#93c5fd" />
      <ClientHubCommandCenter />
    </Canvas>
  );
}
