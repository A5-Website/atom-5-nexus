"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";
import { motion } from "framer-motion";

interface NodeData {
  position: [number, number, number];
  connections: number[];
}

function FlowingGlow({ 
  start, 
  end, 
  delay 
}: { 
  start: [number, number, number]; 
  end: [number, number, number]; 
  delay: number;
}) {
  const lineRef = useRef<THREE.Line>(null);
  
  useFrame((state) => {
    if (!lineRef.current) return;
    
    const time = (state.clock.elapsedTime + delay) % 1.5;
    const t = time / 1.5;
    
    // Calculate segment length (smaller segment)
    const segmentLength = 0.08;
    const startT = Math.max(0, t - segmentLength / 2);
    const endT = Math.min(1, t + segmentLength / 2);
    
    // Interpolate positions
    const startPos = [
      start[0] + (end[0] - start[0]) * startT,
      start[1] + (end[1] - start[1]) * startT,
      start[2] + (end[2] - start[2]) * startT,
    ];
    
    const endPos = [
      start[0] + (end[0] - start[0]) * endT,
      start[1] + (end[1] - start[1]) * endT,
      start[2] + (end[2] - start[2]) * endT,
    ];
    
    const positions = new Float32Array([...startPos, ...endPos]);
    lineRef.current.geometry.setAttribute(
      'position',
      new THREE.BufferAttribute(positions, 3)
    );
    
    // Pulse opacity
    const opacity = Math.sin(t * Math.PI) * 0.7 + 0.3;
    if (lineRef.current.material instanceof THREE.LineBasicMaterial) {
      lineRef.current.material.opacity = opacity;
    }
  });
  
  return (
    <primitive object={new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(...start),
        new THREE.Vector3(...end)
      ]),
      new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 1 })
    )} ref={lineRef} />
  );
}

function NeuralNetwork3D() {
  const nodes: NodeData[] = useMemo(() => {
    const nodeList: NodeData[] = [];
    const numNodes = 100;
    
    // Generate random node positions in 3D space
    for (let i = 0; i < numNodes; i++) {
      nodeList.push({
        position: [
          (Math.random() - 0.5) * 15,
          (Math.random() - 0.5) * 15,
          (Math.random() - 0.5) * 15,
        ],
        connections: [],
      });
    }
    
    // Create connections between nearby nodes
    for (let i = 0; i < nodeList.length; i++) {
      const maxConnections = 4 + Math.floor(Math.random() * 3);
      let connectionCount = 0;
      
      // Find nearby nodes to connect to
      const distances = nodeList
        .map((node, j) => {
          if (i === j) return null;
          const dx = node.position[0] - nodeList[i].position[0];
          const dy = node.position[1] - nodeList[i].position[1];
          const dz = node.position[2] - nodeList[i].position[2];
          return { index: j, distance: Math.sqrt(dx * dx + dy * dy + dz * dz) };
        })
        .filter((item): item is { index: number; distance: number } => item !== null)
        .sort((a, b) => a.distance - b.distance);
      
      for (const { index, distance } of distances) {
        if (connectionCount >= maxConnections) break;
        if (distance < 8) {
          nodeList[i].connections.push(index);
          connectionCount++;
        }
      }
    }
    
    return nodeList;
  }, []);
  
  const connections = useMemo(() => {
    const lines: Array<{
      start: [number, number, number];
      end: [number, number, number];
      key: string;
    }> = [];
    
    nodes.forEach((node, i) => {
      node.connections.forEach((connIndex) => {
        lines.push({
          start: node.position,
          end: nodes[connIndex].position,
          key: `${i}-${connIndex}`,
        });
      });
    });
    
    return lines;
  }, [nodes]);
  
  return (
    <>
      {/* Node spheres */}
      {nodes.map((node, i) => (
        <mesh key={`node-${i}`} position={node.position}>
          <sphereGeometry args={[0.08, 8, 8]} />
          <meshStandardMaterial 
            color="#ffffff" 
            emissive="#ffffff"
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}
      
      {/* Connection lines */}
      {connections.map((conn) => (
        <line key={conn.key}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array([...conn.start, ...conn.end])}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#ffffff" opacity={0.3} transparent />
        </line>
      ))}
      
      {/* Flowing glows */}
      {connections.map((conn, i) => (
        <FlowingGlow
          key={`glow-${conn.key}`}
          start={conn.start}
          end={conn.end}
          delay={i * 0.08}
        />
      ))}
    </>
  );
}

export function BackgroundPaths({
  title = "Background Paths",
}: {
  title?: string;
}) {
  const words = title.split(" ");

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-background">
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 0, 20], fov: 60 }}
          style={{ background: 'transparent' }}
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={0.8} />
          <NeuralNetwork3D />
          <OrbitControls 
            enableDamping
            dampingFactor={0.05}
            minDistance={10}
            maxDistance={40}
          />
        </Canvas>
      </div>

      <div className="relative z-10 px-8 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="max-w-2xl text-center"
        >
          <h1 className="text-3xl md:text-4xl font-display text-foreground leading-tight">
            {words.map((word, wordIndex) => (
              <span
                key={wordIndex}
                className="inline-block mr-3 last:mr-0"
              >
                {word.split("").map((letter, letterIndex) => (
                  <motion.span
                    key={`${wordIndex}-${letterIndex}`}
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      delay:
                        wordIndex * 0.08 +
                        letterIndex * 0.02,
                      type: "spring",
                      stiffness: 120,
                      damping: 20,
                    }}
                    className="inline-block"
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>
            ))}
          </h1>
        </motion.div>
      </div>
    </div>
  );
}
