/**
 * @fileoverview Escena 3D interactiva con figuras geométricas y logo cubo
 * @description Renderiza figuras geométricas flotantes y cubo con logo centrado
 * @author Herasi Silva
 * @version 1.9.0
 */

"use client";

import { useRef, Suspense, useState, useEffect } from "react";
import { Canvas, useFrame, useThree, useLoader } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

// ============================================================================
// TIPOS
// ============================================================================

interface GeometricShapeProps {
  position: [number, number, number];
  color: string;
  speed?: number;
  shape: "box" | "sphere" | "torus" | "octahedron" | "cone";
  size?: number;
}

// ============================================================================
// HOOK PARA DETECTAR MÓVIL
// ============================================================================

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile;
}

// ============================================================================
// COMPONENTES
// ============================================================================

function MouseFollower({ children }: { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null);
  const { mouse } = useThree();

  useFrame(() => {
    if (group.current) {
      group.current.rotation.x = THREE.MathUtils.lerp(
        group.current.rotation.x,
        mouse.y * 0.15,
        0.05
      );
      group.current.rotation.y = THREE.MathUtils.lerp(
        group.current.rotation.y,
        mouse.x * 0.15,
        0.05
      );
    }
  });

  return <group ref={group}>{children}</group>;
}

function GeometricShape({ position, color, speed = 1, shape, size = 0.3 }: GeometricShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01 * speed;
      meshRef.current.rotation.y += 0.01 * speed;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position}>
        {shape === "box" && <boxGeometry args={[size, size, size]} />}
        {shape === "sphere" && <sphereGeometry args={[size * 0.6, 32, 32]} />}
        {shape === "torus" && <torusGeometry args={[size * 0.5, size * 0.2, 16, 32]} />}
        {shape === "octahedron" && <octahedronGeometry args={[size * 0.6]} />}
        {shape === "cone" && <coneGeometry args={[size * 0.5, size, 32]} />}
        <meshStandardMaterial
          color={color}
          metalness={0.8}
          roughness={0.2}
          emissive={color}
          emissiveIntensity={0.15}
        />
      </mesh>
    </Float>
  );
}

function LogoCube({ isMobile }: { isMobile: boolean }) {
  const cubeRef = useRef<THREE.Mesh>(null);
  const texture = useLoader(THREE.TextureLoader, "/images/logo-herasi.png");

  // Tamaño responsivo: más pequeño en móvil
  const cubeSize = isMobile ? 1.2 : 1.8;
  const cubeY = isMobile ? 0.8 : 1.2;

  useFrame((state) => {
    if (cubeRef.current) {
      cubeRef.current.rotation.y += 0.008;
      cubeRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  // Crear materiales para las 6 caras
  const materials = [
    new THREE.MeshStandardMaterial({ map: texture, metalness: 0.5, roughness: 0.3 }),
    new THREE.MeshStandardMaterial({ map: texture, metalness: 0.5, roughness: 0.3 }),
    new THREE.MeshStandardMaterial({ map: texture, metalness: 0.5, roughness: 0.3 }),
    new THREE.MeshStandardMaterial({ map: texture, metalness: 0.5, roughness: 0.3 }),
    new THREE.MeshStandardMaterial({ map: texture, metalness: 0.5, roughness: 0.3 }),
    new THREE.MeshStandardMaterial({ map: texture, metalness: 0.5, roughness: 0.3 }),
  ];

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.2}>
      <mesh ref={cubeRef} position={[0, cubeY, 0]} material={materials}>
        <boxGeometry args={[cubeSize, cubeSize, cubeSize]} />
      </mesh>
    </Float>
  );
}

function FloatingShapes({ isMobile }: { isMobile: boolean }) {
  // Posiciones ajustadas para móvil (más cerca del centro)
  const desktopShapes: GeometricShapeProps[] = [
    { position: [-4, 2.5, -2], color: "#ea580c", speed: 0.8, shape: "octahedron", size: 0.45 },
    { position: [-3.2, 1.8, -3], color: "#fb923c", speed: 1.1, shape: "box", size: 0.35 },
    { position: [4, 2.2, -2], color: "#fb923c", speed: 1.2, shape: "box", size: 0.45 },
    { position: [3.5, 2.8, -3], color: "#c2410c", speed: 0.7, shape: "sphere", size: 0.4 },
    { position: [-4, -2, -2], color: "#c2410c", speed: 0.6, shape: "torus", size: 0.5 },
    { position: [-3, -2.8, -3], color: "#ea580c", speed: 0.9, shape: "sphere", size: 0.35 },
    { position: [4, -2.5, -2], color: "#ea580c", speed: 1, shape: "octahedron", size: 0.4 },
    { position: [3, -1.8, -3], color: "#fb923c", speed: 1.3, shape: "cone", size: 0.4 },
    { position: [-5, 0, -3], color: "#fb923c", speed: 0.5, shape: "sphere", size: 0.3 },
    { position: [5, 0.5, -2.5], color: "#c2410c", speed: 0.8, shape: "torus", size: 0.35 },
    { position: [0, 3.5, -3], color: "#ea580c", speed: 0.7, shape: "box", size: 0.3 },
    { position: [0, -3.5, -3], color: "#c2410c", speed: 1.1, shape: "octahedron", size: 0.35 },
  ];

  const mobileShapes: GeometricShapeProps[] = [
    { position: [-1.8, 2.2, -2], color: "#ea580c", speed: 0.8, shape: "octahedron", size: 0.3 },
    { position: [-1.5, -0.5, -3], color: "#fb923c", speed: 1.1, shape: "box", size: 0.25 },
    { position: [1.8, 2, -2], color: "#fb923c", speed: 1.2, shape: "box", size: 0.3 },
    { position: [1.5, -0.8, -3], color: "#c2410c", speed: 0.7, shape: "sphere", size: 0.25 },
    { position: [-1.2, -2.5, -2], color: "#c2410c", speed: 0.6, shape: "torus", size: 0.3 },
    { position: [1.2, -2.3, -2], color: "#ea580c", speed: 1, shape: "octahedron", size: 0.25 },
    { position: [0, 3, -3], color: "#ea580c", speed: 0.7, shape: "box", size: 0.2 },
    { position: [0, -3.2, -3], color: "#c2410c", speed: 1.1, shape: "sphere", size: 0.2 },
  ];

  const shapes = isMobile ? mobileShapes : desktopShapes;

  return (
    <>
      {shapes.map((shape, index) => (
        <GeometricShape key={index} {...shape} />
      ))}
    </>
  );
}

function Scene({ isMobile }: { isMobile: boolean }) {
  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} color="#ffffff" />
      <directionalLight position={[-5, -5, -5]} intensity={0.5} color="#ea580c" />
      <pointLight position={[0, 0, 5]} intensity={0.5} color="#fb923c" />

      <MouseFollower>
        <Suspense fallback={null}>
          <LogoCube isMobile={isMobile} />
        </Suspense>
        <FloatingShapes isMobile={isMobile} />
      </MouseFollower>
    </>
  );
}

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

export default function Scene3D() {
  const isMobile = useIsMobile();

  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: isMobile ? 55 : 50 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <Scene isMobile={isMobile} />
    </Canvas>
  );
}