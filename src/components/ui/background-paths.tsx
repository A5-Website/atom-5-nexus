"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef, useMemo, useState, useCallback } from "react";
import * as THREE from "three";
import { motion } from "framer-motion";

interface NodeData {
  position: [number, number, number];
  connections: number[];
}

interface ActiveFlow {
  startIndex: number;
  endIndex: number;
  startTime: number;
  generation: number;
}

function FlowingGlow({ 
  start, 
  end, 
  startTime
}: { 
  start: [number, number, number]; 
  end: [number, number, number]; 
  startTime: number;
}) {
  const lineRef = useRef<THREE.Line>(null);
  
  useFrame((state) => {
    if (!lineRef.current) return;
    
    const elapsedTime = state.clock.elapsedTime - startTime;
    const duration = 3; // Slower duration
    const t = Math.min(elapsedTime / duration, 1);
    
    if (t >= 1) {
      // Hide the line when animation is complete
      lineRef.current.visible = false;
      return;
    }
    
    lineRef.current.visible = true;
    
    // Calculate segment length (smaller segment)
    const segmentLength = 0.05;
    const startT = Math.max(0, t - segmentLength / 2);
    const endT = Math.min(1, t + segmentLength / 2);
    
    // Interpolate positions
    const startPos = new THREE.Vector3(
      start[0] + (end[0] - start[0]) * startT,
      start[1] + (end[1] - start[1]) * startT,
      start[2] + (end[2] - start[2]) * startT
    );
    
    const endPos = new THREE.Vector3(
      start[0] + (end[0] - start[0]) * endT,
      start[1] + (end[1] - start[1]) * endT,
      start[2] + (end[2] - start[2]) * endT
    );
    
    const positions = new Float32Array([
      startPos.x, startPos.y, startPos.z,
      endPos.x, endPos.y, endPos.z
    ]);
    
    lineRef.current.geometry.setAttribute(
      'position',
      new THREE.BufferAttribute(positions, 3)
    );
    lineRef.current.geometry.attributes.position.needsUpdate = true;
    
    // Fade out as it approaches end
    const opacity = Math.sin(t * Math.PI) * 0.9;
    if (lineRef.current.material instanceof THREE.LineBasicMaterial) {
      lineRef.current.material.opacity = opacity;
    }
  });
  
  const geometry = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    const positions = new Float32Array([...start, ...end]);
    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geom;
  }, [start, end]);
  
  const material = useMemo(() => {
    return new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 1 });
  }, []);
  
  return <primitive object={new THREE.Line(geometry, material)} ref={lineRef} />;
}

interface NodeDataExtended extends NodeData {
  size: number;
}

function NeuralNetwork3D() {
  const [activeFlows, setActiveFlows] = useState<ActiveFlow[]>([]);
  const [currentTime, setCurrentTime] = useState(0);
  
  // Create texture for soft-edged nodes
  const nodeTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d')!;
    
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.5)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);
    
    const texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, []);
  
  const nodes: NodeDataExtended[] = useMemo(() => {
    const nodeList: NodeDataExtended[] = [];
    const numNodes = 200;
    
    // Generate random node positions in 3D space with size variations
    for (let i = 0; i < numNodes; i++) {
      nodeList.push({
        position: [
          (Math.random() - 0.5) * 25,
          (Math.random() - 0.5) * 25,
          (Math.random() - 0.5) * 25,
        ],
        connections: [],
        size: 0.15 + Math.random() * 0.25, // Random sizes between 0.15 and 0.4
      });
    }
    
    // Create connections between nearby nodes
    for (let i = 0; i < nodeList.length; i++) {
      const maxConnections = 4 + Math.floor(Math.random() * 4);
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
  
  useFrame((state) => {
    setCurrentTime(state.clock.elapsedTime);
  });
  
  const handleNodeClick = useCallback((nodeIndex: number) => {
    console.log('Node clicked:', nodeIndex);
    const newFlows: ActiveFlow[] = [];
    const visited = new Set<number>();
    const queue: Array<{ index: number; generation: number }> = [{ index: nodeIndex, generation: 0 }];
    const maxGenerations = 3; // Degrees of separation
    const flowProbability = 0.6; // Chance to propagate to connected node
    
    while (queue.length > 0) {
      const current = queue.shift()!;
      
      if (visited.has(current.index) || current.generation > maxGenerations) continue;
      visited.add(current.index);
      
      const node = nodes[current.index];
      
      // Propagate to connected nodes
      for (const connectedIndex of node.connections) {
        if (!visited.has(connectedIndex) && Math.random() < flowProbability) {
          newFlows.push({
            startIndex: current.index,
            endIndex: connectedIndex,
            startTime: currentTime + current.generation * 0.3, // Stagger by generation
            generation: current.generation + 1,
          });
          
          if (current.generation < maxGenerations) {
            queue.push({ index: connectedIndex, generation: current.generation + 1 });
          }
        }
      }
    }
    
    console.log('Created flows:', newFlows.length);
    setActiveFlows(prev => [...prev, ...newFlows]);
    
    // Clean up old flows after duration
    setTimeout(() => {
      setActiveFlows(prev => prev.filter(flow => !newFlows.includes(flow)));
    }, 4000);
  }, [nodes, currentTime]);
  
  const connections = useMemo(() => {
    const lines: Array<{
      start: [number, number, number];
      end: [number, number, number];
      curve: THREE.CatmullRomCurve3;
      opacity: number;
      key: string;
    }> = [];
    
    nodes.forEach((node, i) => {
      node.connections.forEach((connIndex) => {
        const start = new THREE.Vector3(...node.position);
        const end = new THREE.Vector3(...nodes[connIndex].position);
        
        // Create a curved path instead of straight line
        const midPoint = new THREE.Vector3()
          .addVectors(start, end)
          .multiplyScalar(0.5);
        
        // Add random offset to midpoint for curve
        midPoint.x += (Math.random() - 0.5) * 2;
        midPoint.y += (Math.random() - 0.5) * 2;
        midPoint.z += (Math.random() - 0.5) * 2;
        
        const curve = new THREE.CatmullRomCurve3([start, midPoint, end]);
        
        lines.push({
          start: node.position,
          end: nodes[connIndex].position,
          curve,
          opacity: 0.1 + Math.random() * 0.2, // Random opacity between 0.1 and 0.3
          key: `${i}-${connIndex}`,
        });
      });
    });
    
    return lines;
  }, [nodes]);
  
  return (
    <>
      {/* Node sprites with soft edges - clickable */}
      {nodes.map((node, i) => (
        <sprite 
          key={`node-${i}`} 
          position={node.position}
          scale={[node.size, node.size, 1]}
          onClick={(e) => {
            e.stopPropagation();
            handleNodeClick(i);
          }}
        >
          <spriteMaterial 
            map={nodeTexture}
            transparent
            opacity={0.7 + Math.random() * 0.3}
            depthWrite={false}
          />
        </sprite>
      ))}
      
      {/* Connection lines - curved with random fading */}
      {connections.map((conn) => {
        const points = conn.curve.getPoints(20); // Get 20 points along the curve
        const positions = new Float32Array(points.length * 3);
        points.forEach((point, i) => {
          positions[i * 3] = point.x;
          positions[i * 3 + 1] = point.y;
          positions[i * 3 + 2] = point.z;
        });
        
        return (
          <line key={conn.key}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={points.length}
                array={positions}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial color="#ffffff" opacity={conn.opacity} transparent />
          </line>
        );
      })}
      
      {/* Active flowing glows */}
      {activeFlows.map((flow, i) => (
        <FlowingGlow
          key={`flow-${flow.startIndex}-${flow.endIndex}-${flow.startTime}-${i}`}
          start={nodes[flow.startIndex].position}
          end={nodes[flow.endIndex].position}
          startTime={flow.startTime}
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
          camera={{ position: [0, 0, 30], fov: 60 }}
          style={{ background: 'transparent' }}
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={0.8} />
          <NeuralNetwork3D />
          <OrbitControls 
            enableDamping
            dampingFactor={0.05}
            minDistance={15}
            maxDistance={50}
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
