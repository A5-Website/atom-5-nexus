"use client";

import { motion } from "framer-motion";

function MotherboardCircuits() {
    const generateMotherboardPattern = () => {
        const elements = [];
        const gridSpacing = 6;
        const cols = 80;
        const rows = 60;
        
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const x = col * gridSpacing;
                const y = row * gridSpacing;
                
                // Check if in middle zone for neural patterns
                const distanceFromCenter = Math.abs(col - cols/2) / (cols/2);
                const isMiddleZone = distanceFromCenter < 0.3;
                
                if (isMiddleZone && Math.random() > 0.7) {
                    // Neural organic curves in middle
                    const curveLength = gridSpacing * (4 + Math.random() * 6);
                    const controlX = x + curveLength / 2 + (Math.random() - 0.5) * 30;
                    const controlY = y + (Math.random() - 0.5) * 40;
                    const endX = x + curveLength;
                    const endY = y + (Math.random() - 0.5) * 30;
                    
                    elements.push({
                        id: `neural-${row}-${col}`,
                        d: `M${x},${y} Q${controlX},${controlY} ${endX},${endY}`,
                        type: 'neural',
                    });
                } else {
                    // Motherboard PCB traces everywhere else
                    
                    // Dense horizontal traces in groups
                    if (row % 2 === 0 && Math.random() > 0.15) {
                        const length = gridSpacing * (4 + Math.floor(Math.random() * 8));
                        elements.push({
                            id: `h-${row}-${col}`,
                            d: `M${x},${y} L${x + length},${y}`,
                            type: 'trace',
                        });
                        
                        // Parallel trace above/below
                        if (Math.random() > 0.4) {
                            const offset = Math.random() > 0.5 ? 1.5 : -1.5;
                            elements.push({
                                id: `h-par-${row}-${col}`,
                                d: `M${x},${y + offset} L${x + length},${y + offset}`,
                                type: 'trace',
                            });
                        }
                    }
                    
                    // Vertical traces
                    if (col % 3 === 0 && Math.random() > 0.2) {
                        const length = gridSpacing * (3 + Math.floor(Math.random() * 6));
                        elements.push({
                            id: `v-${row}-${col}`,
                            d: `M${x},${y} L${x},${y + length}`,
                            type: 'trace',
                        });
                    }
                    
                    // L-shaped traces (right angles like PCB routing)
                    if (Math.random() > 0.7) {
                        const hLen = gridSpacing * (2 + Math.floor(Math.random() * 4));
                        const vLen = gridSpacing * (2 + Math.floor(Math.random() * 4));
                        const dir = Math.random() > 0.5 ? 1 : -1;
                        elements.push({
                            id: `l-${row}-${col}`,
                            d: `M${x},${y} L${x + hLen},${y} L${x + hLen},${y + vLen * dir}`,
                            type: 'trace',
                        });
                    }
                    
                    // IC chip rectangles
                    if (row % 10 === 0 && col % 12 === 0 && Math.random() > 0.5) {
                        const width = gridSpacing * 6;
                        const height = gridSpacing * 4;
                        elements.push({
                            id: `chip-${row}-${col}`,
                            d: `M${x},${y} L${x + width},${y} L${x + width},${y + height} L${x},${y + height} Z`,
                            type: 'chip',
                        });
                        
                        // Chip pins
                        for (let pin = 0; pin < 8; pin++) {
                            const pinX = x + (pin * width / 7);
                            elements.push({
                                id: `pin-${row}-${col}-${pin}`,
                                d: `M${pinX},${y} L${pinX},${y - 3}`,
                                type: 'pin',
                            });
                        }
                    }
                    
                    // Resistor/capacitor patterns
                    if (Math.random() > 0.85) {
                        const compWidth = gridSpacing * 2;
                        elements.push({
                            id: `comp-${row}-${col}`,
                            d: `M${x},${y} L${x + 2},${y} L${x + 2},${y + 2} L${x + compWidth - 2},${y + 2} L${x + compWidth - 2},${y} L${x + compWidth},${y}`,
                            type: 'component',
                        });
                    }
                }
            }
        }
        
        return elements;
    };
    
    const circuits = generateMotherboardPattern();

    return (
        <div className="absolute inset-0 pointer-events-none opacity-60">
            <svg
                className="w-full h-full text-foreground"
                viewBox="0 0 480 360"
                fill="none"
                preserveAspectRatio="xMidYMid slice"
            >
                <title>Motherboard Circuits with Neural Network</title>
                {circuits.map((element) => (
                    <motion.path
                        key={element.id}
                        d={element.d}
                        stroke="currentColor"
                        strokeWidth={
                            element.type === 'chip' ? 1 :
                            element.type === 'neural' ? 0.8 :
                            element.type === 'pin' ? 0.6 :
                            element.type === 'component' ? 0.7 :
                            0.6
                        }
                        fill="none"
                        strokeOpacity={element.type === 'neural' ? 0.7 : 0.8}
                        strokeLinecap="square"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{
                            pathLength: [0, 1],
                            opacity: element.type === 'neural' ? [0.4, 0.8, 0.4] : [0.6, 0.8, 0.6],
                        }}
                        transition={{
                            pathLength: {
                                duration: element.type === 'neural' ? 5 + Math.random() * 3 : 12 + Math.random() * 8,
                                repeat: Number.POSITIVE_INFINITY,
                                ease: "linear",
                                delay: Math.random() * 10,
                            },
                            opacity: {
                                duration: 3 + Math.random() * 2,
                                repeat: Number.POSITIVE_INFINITY,
                                ease: "easeInOut",
                                delay: Math.random() * 4,
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
                <MotherboardCircuits />
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
