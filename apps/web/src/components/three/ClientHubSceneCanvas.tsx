"use client";

import { Line, RoundedBox, Text } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import type { Group } from "three";

type Vector3Tuple = [number, number, number];

const MODULES: Array<{ name: string; position: Vector3Tuple; color: string }> = [
  { name: "QuotePilot", position: [-2.9, 1.18, -0.16], color: "#7dd3fc" },
  { name: "ReserveFlow", position: [-2.58, -0.88, -0.1], color: "#bfdbfe" },
  { name: "CommerceKit", position: [2.74, 1.04, -0.12], color: "#f8e7b7" },
  { name: "EventPass", position: [2.82, -0.62, -0.14], color: "#c4b5fd" },
  { name: "SupportDesk", position: [0.18, -1.72, -0.18], color: "#a7f3d0" },
];

function ModuleChip({
  position,
  label,
  color,
  active,
}: {
  position: Vector3Tuple;
  label: string;
  color: string;
  active: boolean;
}) {
  const ref = useRef<Group>(null);

  useFrame(({ clock }) => {
    if (!ref.current) {
      return;
    }

    ref.current.position.y = position[1] + Math.sin(clock.elapsedTime * 0.62 + position[0]) * (active ? 0.01 : 0.035);
  });

  return (
    <group ref={ref} position={position}>
      <RoundedBox args={[1.16, 0.46, 0.12]} radius={0.14} smoothness={5}>
        <meshStandardMaterial color="#111827" roughness={0.34} metalness={0.08} emissive={color} emissiveIntensity={active ? 0.18 : 0.08} />
      </RoundedBox>
      <Text position={[0, 0, 0.07]} fontSize={0.08} color="#f8fafc" anchorX="center" anchorY="middle">
        {label}
      </Text>
    </group>
  );
}

function FilesCard() {
  return (
    <group position={[-1.72, 0.68, 0.1]} rotation={[0.03, 0.26, -0.08]}>
      <RoundedBox args={[1.42, 0.88, 0.12]} radius={0.1} smoothness={4}>
        <meshStandardMaterial color="#1b2736" roughness={0.45} metalness={0.08} />
      </RoundedBox>
      <Text position={[-0.42, 0.16, 0.07]} fontSize={0.08} color="#a5b4c9" anchorX="left">
        Files
      </Text>
      <Text position={[-0.42, -0.02, 0.07]} fontSize={0.1} color="#ffffff" anchorX="left">
        Handoff pack
      </Text>
      <Text position={[-0.42, -0.2, 0.07]} fontSize={0.075} color="#cbd5e1" anchorX="left">
        Scope, assets, proposal
      </Text>
    </group>
  );
}

function MessagesCard() {
  return (
    <group position={[1.76, 0.62, 0.08]} rotation={[0.05, -0.28, 0.08]}>
      <RoundedBox args={[1.52, 0.92, 0.12]} radius={0.12} smoothness={4}>
        <meshStandardMaterial color="#dfe7f3" roughness={0.28} metalness={0.03} />
      </RoundedBox>
      <Text position={[-0.46, 0.18, 0.07]} fontSize={0.08} color="#4f6b8b" anchorX="left">
        Messages
      </Text>
      <Text position={[-0.46, 0, 0.07]} fontSize={0.09} color="#17212b" anchorX="left">
        Decision needed
      </Text>
      <Text position={[-0.46, -0.18, 0.07]} fontSize={0.075} color="#4b5b6a" anchorX="left">
        Launch copy approval
      </Text>
    </group>
  );
}

function MilestoneRail({ active }: { active: boolean }) {
  const points: Vector3Tuple[] = [
    [-1.22, -1.18, 0.08],
    [-0.4, -1.18, 0.08],
    [0.42, -1.18, 0.08],
    [1.24, -1.18, 0.08],
  ];

  return (
    <group>
      <Line points={points} color="#7dd3fc" lineWidth={1.6} transparent opacity={active ? 0.96 : 0.6} />
      {points.map((point, index) => (
        <group key={index} position={point}>
          <mesh>
            <sphereGeometry args={[0.07 + index * 0.008, 24, 24]} />
            <meshStandardMaterial color={index < 3 ? "#bfdbfe" : "#f8fafc"} emissive="#38bdf8" emissiveIntensity={active ? 0.34 : 0.14} />
          </mesh>
        </group>
      ))}
      <Text position={[0, -1.42, 0.08]} fontSize={0.08} color="#cbd5e1" anchorX="center">
        Milestones
      </Text>
    </group>
  );
}

function MainWorkspaceCard({ active }: { active: boolean }) {
  return (
    <group position={[0, -0.02, 0.22]}>
      <RoundedBox args={[3.24, 2.12, 0.2]} radius={0.16} smoothness={5} castShadow receiveShadow>
        <meshPhysicalMaterial color="#dfe9f6" roughness={0.26} metalness={0.03} transparent opacity={0.2} transmission={0.72} thickness={0.35} />
      </RoundedBox>

      <RoundedBox args={[3.02, 1.88, 0.05]} radius={0.14} smoothness={5} position={[0, 0, 0.11]}>
        <meshStandardMaterial color="#14202f" roughness={0.32} metalness={0.1} />
      </RoundedBox>

      <mesh position={[0, 0.72, 0.12]}>
        <planeGeometry args={[2.46, 0.28]} />
        <meshBasicMaterial color="#93c5fd" transparent opacity={0.08} />
      </mesh>

      <Text position={[-1.1, 0.72, 0.14]} fontSize={0.1} color="#9cb7d6" anchorX="left">
        Northline Workspace
      </Text>
      <Text position={[-1.1, 0.38, 0.14]} fontSize={0.2} color="#f8fafc" anchorX="left">
        Client portal nucleus
      </Text>
      <Text position={[-1.1, 0.08, 0.14]} fontSize={0.09} color="#d0deef" anchorX="left" maxWidth={1.9}>
        Files, messages, milestones, and handoff stay centered on one client record.
      </Text>

      <Text position={[-1.1, -0.5, 0.14]} fontSize={0.08} color="#8fb3d8" anchorX="left">
        Files
      </Text>
      <Text position={[-1.1, -0.7, 0.14]} fontSize={0.1} color="#ffffff" anchorX="left">
        24 linked assets
      </Text>

      <Text position={[0.14, -0.5, 0.14]} fontSize={0.08} color="#8fb3d8" anchorX="left">
        Messages
      </Text>
      <Text position={[0.14, -0.7, 0.14]} fontSize={0.1} color="#ffffff" anchorX="left">
        Decision needed
      </Text>

      <group position={[1.04, -0.62, 0.14]}>
        <RoundedBox args={[0.76, 0.44, 0.08]} radius={0.12} smoothness={4}>
          <meshStandardMaterial color={active ? "#1f8a70" : "#234c62"} roughness={0.3} metalness={0.08} emissive={active ? "#1f8a70" : "#234c62"} emissiveIntensity={active ? 0.22 : 0.08} />
        </RoundedBox>
        <Text position={[0, 0.02, 0.06]} fontSize={0.12} color="#ffffff" anchorX="center">
          82%
        </Text>
      </group>
    </group>
  );
}

function ClientWorkspaceScene() {
  const rootRef = useRef<Group>(null);
  const [active, setActive] = useState(false);
  const [hoveredModule, setHoveredModule] = useState<number | null>(null);

  useFrame(({ clock, pointer }) => {
    if (!rootRef.current) {
      return;
    }

    rootRef.current.position.y = Math.sin(clock.elapsedTime * 0.52) * 0.06;
    rootRef.current.position.z = active ? 0.14 : 0;
    rootRef.current.rotation.x = 0.14 + pointer.y * 0.05 + Math.sin(clock.elapsedTime * 0.16) * 0.01;
    rootRef.current.rotation.y = -0.34 + pointer.x * 0.08;
    rootRef.current.rotation.z = -0.01;
  });

  return (
    <group>
      <mesh position={[0, -1.98, -0.3]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[7, 4.6]} />
        <shadowMaterial transparent opacity={0.18} />
      </mesh>

      <mesh position={[0, 0.2, -1.26]}>
        <planeGeometry args={[7.2, 5]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.05} />
      </mesh>

      <group
        ref={rootRef}
        onPointerOver={(event) => {
          event.stopPropagation();
          setActive(true);
        }}
        onPointerOut={() => setActive(false)}
      >
        <MainWorkspaceCard active={active} />
        <FilesCard />
        <MessagesCard />
        <MilestoneRail active={active} />

        {MODULES.map((module, index) => (
          <group key={module.name}>
            <Line
              points={[[0, -0.02, 0.2], module.position]}
              color={module.color}
              lineWidth={1.2}
              transparent
              opacity={hoveredModule === index || active ? 0.9 : 0.3}
            />
            <group
              onPointerOver={(event) => {
                event.stopPropagation();
                setHoveredModule(index);
                setActive(true);
              }}
              onPointerOut={() => setHoveredModule(null)}
            >
              <ModuleChip position={module.position} label={module.name} color={module.color} active={hoveredModule === index || active} />
            </group>
          </group>
        ))}
      </group>
    </group>
  );
}

export default function ClientHubSceneCanvas() {
  return (
    <Canvas
      className="h-full w-full"
      style={{ width: "100%", height: "100%" }}
      shadows
      dpr={[1, 1.4]}
      camera={{ position: [0, 0.18, 6.8], fov: 34 }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
    >
      <color attach="background" args={["#111827"]} />
      <ambientLight intensity={0.78} />
      <directionalLight position={[-3.4, 4.8, 4.8]} intensity={2.0} color="#eff6ff" castShadow />
      <directionalLight position={[3.4, -1.2, 3.2]} intensity={0.92} color="#bae6fd" />
      <pointLight position={[2.1, 1.1, 2.6]} intensity={0.76} color="#60a5fa" />
      <pointLight position={[-2.1, 0.4, 2.5]} intensity={0.58} color="#cbd5e1" />
      <ClientWorkspaceScene />
    </Canvas>
  );
}
