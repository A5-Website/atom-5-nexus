"use client";

import { motion } from "framer-motion";

function FloatingPaths({ position }: { position: number }) {
    // Create paths that transition from circuits (left) to neural (right)
    const paths = Array.from({ length: 30 }, (_, i) => {
        const progress = i / 30; // 0 to 1, left to right
        
        // Circuit-like on left (angular, straight), neural on right (curved, organic)
        const circuitness = 1 - progress; // 1 on left, 0 on right
        const neuralness = progress; // 0 on left, 1 on right
        
        // Circuit paths: more angular, grid-like
        const circuitPath = `M-${380 - i * 5 * position} -${189 + i * 6}L-${
            312 - i * 5 * position
        } ${150 - i * 6}L${100 - i * 5 * position} ${343 - i * 6}L${
            684 - i * 5 * position
        } ${875 - i * 6}`;
        
        // Neural paths: curved, organic
        const neuralPath = `M-${380 - i * 5 * position} -${189 + i * 6}C-${
            380 - i * 5 * position
        } -${100 + i * 8} -${250 - i * 5 * position} ${216 - i * 4} ${
            152 - i * 5 * position
        } ${343 - i * 6}C${400 - i * 3 * position} ${500 - i * 8} ${
            616 - i * 5 * position
        } ${600 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`;
        
        // Blend between circuit and neural based on position
        const blendedPath = progress < 0.5 ? circuitPath : neuralPath;
        
        return {
            id: i,
            d: blendedPath,
            width: 0.5 + i * 0.03,
            progress,
        };
    });

    return (
        <div className="absolute inset-0 pointer-events-none">
            <svg
                className="w-full h-full text-foreground"
                viewBox="0 0 696 316"
                fill="none"
                preserveAspectRatio="xMidYMid slice"
            >
                <title>Neural Circuit Paths</title>
                {paths.map((path) => (
                    <motion.path
                        key={path.id}
                        d={path.d}
                        stroke="currentColor"
                        strokeWidth={path.width}
                        strokeOpacity={0.15 + path.id * 0.02}
                        initial={{ pathLength: 0.3, opacity: 0.6 }}
                        animate={{
                            pathLength: 1,
                            opacity: [0.3, 0.8, 0.3],
                            pathOffset: [0, 1, 0],
                        }}
                        transition={{
                            duration: 15 + Math.random() * 15,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "linear",
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
        <div className="relative min-h-screen w-full flex items-start justify-start overflow-hidden bg-background">
            <div className="absolute inset-0">
                <FloatingPaths position={1} />
                <FloatingPaths position={-1} />
            </div>

            <div className="relative z-10 px-8 pt-32">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    className="max-w-xl"
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
