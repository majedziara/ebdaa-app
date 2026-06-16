// navbar-scroll.tsx
"use client";

import { useScroll, useMotionValueEvent } from "motion/react";

export function NavbarScroll() {
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    document.body.dataset.scrolled = y > 40 ? "true" : "false";
  });

  return null;
}
