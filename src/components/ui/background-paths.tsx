"use client";

import { motion } from "framer-motion";

function CircuitPattern() {
    // Generate intricate circuit board patterns
    const generateCircuitPaths = () => {
        const paths = [];
        const gridSize = 20;
        const spacing = 15;
        
        // Create grid-based circuit traces
        for (let row = 0; row < gridSize; row++) {
            for (let col = 0; col < gridSize; col++) {
                const x = col * spacing;
                const y = row * spacing;
                const progress = col / gridSize; // 0 on left, 1 on right
                
                // Circuit traces (horizontal and vertical lines)
                if (Math.random() > 0.3) {
                    const horizontal = Math.random() > 0.5;
                    const length = spacing * (1 + Math.floor(Math.random() * 3));
                    
                    if (horizontal) {
                        paths.push({
                            id: `h-${row}-${col}`,
                            d: `M${x},${y} L${x + length},${y}`,
                            type: 'trace',
                            progress,
                        });
                    } else {
                        paths.push({
                            id: `v-${row}-${col}`,
                            d: `M${x},${y} L${x},${y + length}`,
                            type: 'trace',
                            progress,
                        });
                    }
                }
                
                // Add junction nodes
                if (Math.random() > 0.7) {
                    paths.push({
                        id: `node-${row}-${col}`,
                        x,
                        y,
                        type: 'node',
                        progress,
                    });
                }
                
                // Add more organic curves on the right side
                if (progress > 0.6 && Math.random() > 0.5) {
                    const curveLength = spacing * 2;
                    paths.push({
                        id: `curve-${row}-${col}`,
                        d: `M${x},${y} Q${x + curveLength/2},${y - spacing} ${x + curveLength},${y}`,
                        type: 'neural',
                        progress,
                    });
                }
            }
        }
        
        return paths;
    };
    
    const paths = generateCircuitPaths();

    return (
        <div className="absolute inset-0 pointer-events-none opacity-40">
            <svg
                className="w-full h-full text-foreground"
                viewBox="0 0 300 300"
                fill="none"
                preserveAspectRatio="xMidYMid slice"
            >
                <title>Circuit Board</title>
                {paths.map((path) => {
                    if (path.type === 'node') {
                        return (
                            <motion.circle
                                key={path.id}
                                cx={path.x}
                                cy={path.y}
                                r={path.progress > 0.6 ? 1.5 : 1}
                                fill="currentColor"
                                initial={{ opacity: 0.3 }}
                                animate={{
                                    opacity: [0.3, 0.8, 0.3],
                                    scale: [0.9, 1.1, 0.9],
                                }}
                                transition={{
                                    duration: 3 + Math.random() * 2,
                                    repeat: Number.POSITIVE_INFINITY,
                                    delay: Math.random() * 2,
                                }}
                            />
                        );
                    }
                    
                    return (
                        <motion.path
                            key={path.id}
                            d={path.d}
                            stroke="currentColor"
                            strokeWidth={path.type === 'neural' ? 0.6 : 0.4}
                            strokeOpacity={0.6}
                            fill="none"
                            initial={{ pathLength: 0 }}
                            animate={{
                                pathLength: [0, 1, 0],
                                opacity: [0.3, 0.7, 0.3],
                            }}
                            transition={{
                                duration: 8 + Math.random() * 8,
                                repeat: Number.POSITIVE_INFINITY,
                                ease: "linear",
                                delay: Math.random() * 5,
                            }}
                        />
                    );
                })}
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
                <CircuitPattern />
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
