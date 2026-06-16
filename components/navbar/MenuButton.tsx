"use client";

import { motion } from "motion/react";
import { useState } from "react";

export default function MenuButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <button
      onClick={() => {
        setIsOpen((prev) => {
          const next = !prev;
          document.body.dataset.opened = next ? "true" : "false";
          return next;
        });
      }}
      className="relative flex h-10 w-10 items-center justify-center cursor-pointer"
    >
      <motion.span
        className="absolute h-0.5 w-6 bg-current rounded-full"
        animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 0 : -8 }}
      />

      <motion.span
        className="absolute h-0.5 w-6 bg-current rounded-full"
        animate={{ opacity: isOpen ? 0 : 1, scaleX: isOpen ? 0 : 1 }}
      />

      <motion.span
        className="absolute h-0.5 w-6 bg-current rounded-full"
        animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? 0 : 8 }}
      />
    </button>
  );
}
