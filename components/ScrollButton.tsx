"use client";

import { useEffect, useState } from "react";
import { ArrowBigUp } from "lucide-react";

export default function ScrollButton() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      // behavior: "smooth",
    });
  };

  return (
    <div
      onClick={scrollToTop}
      className={`
        fixed
        right-5
        bottom-0
        z-50
        cursor-pointer
        p-5
        bg-black
        w-fit
        rounded-t-4xl
        duration-500
        transition-all
        ${
          show
            ? "translate-y-0 opacity-100"
            : "translate-y-full opacity-0 pointer-events-none"
        }
      `}
    >
      <ArrowBigUp color="white" height={40} size={24} />
    </div>
  );
}
