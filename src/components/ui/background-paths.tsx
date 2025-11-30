"use client";

import { motion } from "framer-motion";

function IntricateCircuits() {
    const generateChipCircuits = () => {
        const elements = [];
        const gridSpacing = 8;
        const cols = 60;
        const rows = 50;
        
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const x = col * gridSpacing;
                const y = row * gridSpacing;
                const progress = col / cols; // 0 left (circuits), 1 right (neural)
                
                // Left side: Dense chip-like circuits
                if (progress < 0.4) {
                    // Horizontal traces in groups
                    if (row % 3 === 0 && Math.random() > 0.2) {
                        const length = gridSpacing * (3 + Math.floor(Math.random() * 5));
                        elements.push({
                            id: `h-${row}-${col}`,
                            d: `M${x},${y} L${x + length},${y}`,
                            type: 'circuit',
                        });
                        // Parallel traces
                        if (Math.random() > 0.5) {
                            elements.push({
                                id: `h2-${row}-${col}`,
                                d: `M${x},${y + 2} L${x + length},${y + 2}`,
                                type: 'circuit',
                            });
                        }
                    }
                    
                    // Vertical traces
                    if (col % 4 === 0 && Math.random() > 0.3) {
                        const length = gridSpacing * (2 + Math.floor(Math.random() * 4));
                        elements.push({
                            id: `v-${row}-${col}`,
                            d: `M${x},${y} L${x},${y + length}`,
                            type: 'circuit',
                        });
                    }
                    
                    // Square IC chip outlines
                    if (row % 8 === 0 && col % 10 === 0 && Math.random() > 0.6) {
                        const size = gridSpacing * 3;
                        elements.push({
                            id: `chip-${row}-${col}`,
                            d: `M${x},${y} L${x + size},${y} L${x + size},${y + size} L${x},${y + size} Z`,
                            type: 'chip',
                        });
                    }
                }
                
                // Middle: Transition zone
                else if (progress >= 0.4 && progress < 0.7) {
                    if (Math.random() > 0.5) {
                        const angle = Math.random() * Math.PI;
                        const length = gridSpacing * (2 + Math.random() * 3);
                        const endX = x + Math.cos(angle) * length;
                        const endY = y + Math.sin(angle) * length;
                        elements.push({
                            id: `trans-${row}-${col}`,
                            d: `M${x},${y} L${endX},${endY}`,
                            type: 'transition',
                        });
                    }
                }
                
                // Right side: Neural network (organic curves)
                else {
                    if (Math.random() > 0.6) {
                        const curveLength = gridSpacing * (3 + Math.random() * 4);
                        const controlX = x + curveLength / 2 + (Math.random() - 0.5) * 20;
                        const controlY = y + (Math.random() - 0.5) * 30;
                        const endX = x + curveLength;
                        const endY = y + (Math.random() - 0.5) * 20;
                        
                        elements.push({
                            id: `neural-${row}-${col}`,
                            d: `M${x},${y} Q${controlX},${controlY} ${endX},${endY}`,
                            type: 'neural',
                        });
                    }
                }
            }
        }
        
        return elements;
    };
    
    const circuits = generateChipCircuits();

    return (
        <div className="absolute inset-0 pointer-events-none opacity-50">
            <svg
                className="w-full h-full text-foreground"
                viewBox="0 0 480 400"
                fill="none"
                preserveAspectRatio="xMidYMid slice"
            >
                <title>Circuit to Neural Network</title>
                {circuits.map((element) => (
                    <motion.path
                        key={element.id}
                        d={element.d}
                        stroke="currentColor"
                        strokeWidth={
                            element.type === 'chip' ? 0.5 :
                            element.type === 'neural' ? 0.4 :
                            element.type === 'transition' ? 0.35 :
                            0.3
                        }
                        fill={element.type === 'chip' ? 'none' : 'none'}
                        strokeOpacity={0.6}
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{
                            pathLength: [0, 1],
                            opacity: element.type === 'neural' ? [0.3, 0.7, 0.3] : [0.4, 0.6, 0.4],
                        }}
                        transition={{
                            pathLength: {
                                duration: element.type === 'neural' ? 6 + Math.random() * 4 : 10 + Math.random() * 5,
                                repeat: Number.POSITIVE_INFINITY,
                                ease: "linear",
                                delay: Math.random() * 8,
                            },
                            opacity: {
                                duration: 4 + Math.random() * 3,
                                repeat: Number.POSITIVE_INFINITY,
                                ease: "easeInOut",
                                delay: Math.random() * 5,
                            },
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
                <IntricateCircuits />
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
