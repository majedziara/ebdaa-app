"use client";

import { m } from "motion/react";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

export default function MenuButton() {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("Accessibility");

  useEffect(() => {
    document.body.dataset.opened = String(isOpen);
    if (!isOpen) return;
    const closeMenu = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        document.getElementById("menu-toggle")?.focus();
      }
    };
    const closeOnLink = (event: MouseEvent) => {
      if (event.target instanceof Element && event.target.closest("#mobile-navigation a")) {
        setIsOpen(false);
      }
    };
    document.addEventListener("keydown", closeMenu);
    document.addEventListener("click", closeOnLink);
    return () => {
      document.removeEventListener("keydown", closeMenu);
      document.removeEventListener("click", closeOnLink);
    };
  }, [isOpen]);

  return (
    <button
      id="menu-toggle"
      type="button"
      aria-label={t("menu")}
      aria-expanded={isOpen}
      aria-controls="mobile-navigation"
      onClick={() => setIsOpen((prev) => !prev)}
      className="relative flex h-10 w-10 items-center justify-center cursor-pointer"
    >
      <m.span
        className="absolute h-0.5 w-6 bg-current rounded-full"
        animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 0 : -8 }}
      />

      <m.span
        className="absolute h-0.5 w-6 bg-current rounded-full"
        animate={{ opacity: isOpen ? 0 : 1, scaleX: isOpen ? 0 : 1 }}
      />

      <m.span
        className="absolute h-0.5 w-6 bg-current rounded-full"
        animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? 0 : 8 }}
      />
    </button>
  );
}
