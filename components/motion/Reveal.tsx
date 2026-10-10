"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

type Direction = "up" | "down" | "left" | "right" | "none";
type RevealStyle = CSSProperties & Record<`--reveal-${string}`, string>;

// Share one observer instead of registering a separate scroll listener per item.
const callbacks = new WeakMap<Element, (visible: boolean) => void>();
let observer: IntersectionObserver | undefined;

function observe(element: Element, callback: (visible: boolean) => void) {
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        callbacks.get(entry.target)?.(entry.isIntersecting);
      }
    },
    { threshold: 0.3 },
  );
  callbacks.set(element, callback);
  observer.observe(element);
  return () => {
    observer?.unobserve(element);
    callbacks.delete(element);
  };
}

export default function Reveal({
  children,
  duration = 0.8,
  delay = 0,
  onlyOnce = false,
  direction = "up",
  scale = false,
  blur = false,
  eager = false,
  className = "",
}: {
  children: React.ReactNode;
  duration?: number;
  delay?: number;
  onlyOnce?: boolean;
  direction?: Direction;
  scale?: boolean;
  blur?: boolean;
  eager?: boolean;
  className?: string;
}) {
  const element = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(eager);
  const [startup, setStartup] = useState(eager);

  useEffect(() => {
    if (!element.current) return;
    let revealed = eager;
    const stopObserving = observe(element.current, (inView) => {
      if (onlyOnce && revealed) return;
      if (inView) revealed = true;
      setVisible(inView);
    });
    // The initial CSS animation may finish before hydration attaches listeners.
    const frame = requestAnimationFrame(() => {
      const animations = element.current?.getAnimations() ?? [];
      if (eager && animations.every((animation) => animation.playState === "finished")) {
        setStartup(false);
      }
    });
    return () => {
      cancelAnimationFrame(frame);
      stopObserving();
    };
  }, [eager, onlyOnce]);

  const movement = {
    up: ["0px", "40px"],
    down: ["0px", "-40px"],
    left: ["40px", "0px"],
    right: ["-40px", "0px"],
    none: ["0px", "0px"],
  }[direction];

  const style: RevealStyle = {
    position: "relative",
    isolation: "isolate",
    "--reveal-x": movement[0],
    "--reveal-y": movement[1],
    "--reveal-scale": scale ? "0.95" : "1",
    "--reveal-duration": `${duration}s`,
    "--reveal-delay": `${delay}s`,
  };

  return (
    <div
      ref={element}
      className={`reveal ${blur ? "reveal-blur" : ""} ${className}`}
      data-visible={visible}
      data-startup={startup}
      onAnimationEnd={(event) => {
        if (event.target === event.currentTarget) setStartup(false);
      }}
      style={style}
    >
      {children}
    </div>
  );
}
