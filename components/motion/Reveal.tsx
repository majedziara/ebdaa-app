"use client";

import { motion } from "motion/react";

type Direction = "up" | "down" | "left" | "right" | "none";

export default function Reveal({
  children,
  duration = 0.8,
  delay = 0,
  onlyOnce = false,
  direction = "up",
  scale = false,
  blur = false,
  className,
}: {
  children: React.ReactNode;
  duration?: number;
  delay?: number;
  onlyOnce?: boolean;
  direction?: Direction;
  scale?: boolean;
  blur?: boolean;
  className?: string;
}) {
  const getInitial = () => {
    const base = { opacity: 0 };

    const movement = {
      up: { y: 40 },
      down: { y: -40 },
      left: { x: 40 },
      right: { x: -40 },
      none: {},
    };

    return {
      ...base,
      ...movement[direction],
      ...(scale ? { scale: 0.95 } : {}),
      ...(blur ? { filter: "blur(8px)" } : {}),
    };
  };

  const getAnimate = () => {
    return {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
    };
  };

  return (
    <motion.div
      className={className}
      initial={getInitial()}
      whileInView={getAnimate()}
      viewport={{ once: onlyOnce, amount: 0.3 }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
