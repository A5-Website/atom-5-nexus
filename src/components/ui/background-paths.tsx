"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

interface Synapse {
  id: string;
  x: number;
  y: number;
  pulseDelay: number;
}

interface DendritePath {
  id: string;
  d: string;
  thickness: number;
  synapses: Synapse[];
}

function NeuralNetwork() {
  const { dendrites, synapses, signals } = useMemo(() => {
    const paths: DendritePath[] = [];
    const allSynapses: Synapse[] = [];
    const allSignals: { id: string; pathD: string; delay: number; duration: number }[] = [];
    let synapseCounter = 0;
    
    // Helper to generate branching dendrites
    const generateBranch = (
      startX: number,
      startY: number,
      angle: number,
      length: number,
      thickness: number,
      depth: number,
      id: string
    ) => {
      if (depth > 3 || length < 40) return;
      
      const endX = startX + Math.cos(angle) * length;
      const endY = startY + Math.sin(angle) * length;
      
      // Create smooth organic curve
      const controlX = startX + Math.cos(angle) * length * 0.5 + (Math.random() - 0.5) * 40;
      const controlY = startY + Math.sin(angle) * length * 0.5 + (Math.random() - 0.5) * 40;
      
      const pathD = `M${startX},${startY} Q${controlX},${controlY} ${endX},${endY}`;
      
      // Add synapse at end point (connection point)
      const synapse: Synapse = {
        id: `synapse-${synapseCounter++}`,
        x: endX,
        y: endY,
        pulseDelay: Math.random() * 8,
      };
      allSynapses.push(synapse);
      
      // Add action potential signals along this path
      const numSignals = Math.floor(Math.random() * 2) + 1;
      for (let i = 0; i < numSignals; i++) {
        allSignals.push({
          id: `${id}-signal-${i}`,
          pathD,
          delay: Math.random() * 10,
          duration: 2 + Math.random() * 1.5,
        });
      }
      
      paths.push({
        id,
        d: pathD,
        thickness,
        synapses: [synapse],
      });
      
      // Branch out - fewer branches for simpler structure
      const numBranches = depth === 0 ? 2 : Math.random() > 0.5 ? 1 : 2;
      
      for (let i = 0; i < numBranches; i++) {
        const angleVariation = (Math.random() - 0.5) * Math.PI * 0.7;
        const newAngle = angle + angleVariation;
        const newLength = length * (0.65 + Math.random() * 0.15);
        const newThickness = thickness * 0.75;
        
        generateBranch(
          endX,
          endY,
          newAngle,
          newLength,
          newThickness,
          depth + 1,
          `${id}-${i}`
        );
      }
    };
    
    // Generate fewer, larger neural trees
    const startPoints = [
      { x: 80, y: 180, angle: Math.PI / 6 },
      { x: 240, y: 100, angle: Math.PI / 2.5 },
      { x: 400, y: 200, angle: -Math.PI / 4 },
      { x: 150, y: 300, angle: -Math.PI / 6 },
      { x: 350, y: 50, angle: Math.PI / 3 },
    ];
    
    startPoints.forEach((point, idx) => {
      const thickness = 2.5 + Math.random() * 1.5; // Thicker highways
      const length = 80 + Math.random() * 40; // Larger lengths
      generateBranch(point.x, point.y, point.angle, length, thickness, 0, `dendrite-${idx}`);
    });
    
    return { dendrites: paths, synapses: allSynapses, signals: allSignals };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none opacity-70">
      <svg
        className="w-full h-full text-foreground"
        viewBox="0 0 480 360"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        <title>Neural Network Pathways</title>
        
        {/* Dendrite paths */}
        {dendrites.map((dendrite) => (
          <motion.path
            key={dendrite.id}
            d={dendrite.d}
            stroke="currentColor"
            strokeWidth={dendrite.thickness}
            fill="none"
            strokeOpacity={0.6}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: 1,
              opacity: [0.5, 0.7, 0.5],
            }}
            transition={{
              pathLength: {
                duration: 2.5,
                ease: "easeOut",
              },
              opacity: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
          />
        ))}
        
        {/* Synaptic nodes - glow and pulse */}
        {synapses.map((synapse) => (
          <g key={synapse.id}>
            {/* Glow effect */}
            <motion.circle
              cx={synapse.x}
              cy={synapse.y}
              r="6"
              fill="currentColor"
              opacity="0.3"
              initial={{ scale: 0.8, opacity: 0.2 }}
              animate={{
                scale: [0.8, 1.3, 0.8],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 2.5,
                delay: synapse.pulseDelay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            {/* Core node */}
            <motion.circle
              cx={synapse.x}
              cy={synapse.y}
              r="2.5"
              fill="currentColor"
              opacity="0.9"
              initial={{ scale: 0.9 }}
              animate={{
                scale: [0.9, 1.1, 0.9],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 2.5,
                delay: synapse.pulseDelay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </g>
        ))}
        
        {/* Action potential signals - small traveling dots */}
        {signals.map((signal) => (
          <motion.circle
            key={signal.id}
            r="1.5"
            fill="currentColor"
            opacity="0.95"
            initial={{ offsetDistance: "0%", opacity: 0 }}
            animate={{
              offsetDistance: ["0%", "100%"],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: signal.duration,
              delay: signal.delay,
              repeat: Infinity,
              ease: "linear",
              repeatDelay: 4 + Math.random() * 3,
            }}
            style={{
              offsetPath: `path('${signal.pathD}')`,
            }}
          />
        ))}
      </svg>
    </div>
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
        <NeuralNetwork />
      </div>

      <div className="relative z-10 px-8">
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
