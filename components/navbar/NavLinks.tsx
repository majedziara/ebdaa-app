import { navbarLinks } from "@/constants/navigation";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";

export default function NavLinks() {
  const t = useTranslations("Navbar");
  const navbarContent = navbarLinks.map((item) => ({
    title: t(item.key),
    link: item.link,
  }));
  return (
    <>
      {navbarContent.map((item, index) => (
        <div key={index} className="relative block group">
          <Link
            href={item.link}
            className="text-secondary group-hover:text-primary transition-colors duration-300"
          >
            {item.title}
          </Link>
          <div className="relative after:absolute after:right-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-primary after:transition-all group-hover:after:w-full"></div>
        </div>
      ))}
    </>
  );
}
