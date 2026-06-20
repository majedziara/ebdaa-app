"use client";

import Image, { ImageProps } from "next/image";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useState } from "react";

type InteractiveImageProps = {
  className?: string;
  overlay?: boolean;
  scale?: number;
  blur?: number;
  perspective?: number;
} & ImageProps;

export default function InteractiveImage({
  className,
  overlay = true,
  scale = 1.03,
  perspective = 1000,
  ...props
}: InteractiveImageProps) {
  const [hovered, setHovered] = useState<boolean>(false);

  // 🎯 motion values (performance-friendly)
  const rotateX = useSpring(useMotionValue(0), {
    stiffness: 120,
    damping: 20,
  });

  const rotateY = useSpring(useMotionValue(0), {
    stiffness: 120,
    damping: 20,
  });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>): void => {
    const rect = e.currentTarget.getBoundingClientRect();

    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    const rotateXVal = (y - 0.5) * -6; // subtle tilt
    const rotateYVal = (x - 0.5) * 6;

    rotateX.set(rotateXVal);
    rotateY.set(rotateYVal);
  };

  const reset = (): void => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <div
      className={`relative overflow-hidden rounded-xl ${className}`}
      style={{ perspective }}
      onMouseMove={handleMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        reset();
      }}
    >
      {/* 🖼️ Image */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformPerspective: perspective,
        }}
        animate={{
          scale: hovered ? scale : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 120,
          damping: 18,
        }}
        className="w-full h-full"
      >
        <Image {...props} className="object-cover w-full h-full" />
      </motion.div>

      {/* 🌑 Subtle overlay */}
      {overlay && (
        <div className="pointer-events-none absolute inset-0 bg-black/10" />
      )}
    </div>
  );
}
