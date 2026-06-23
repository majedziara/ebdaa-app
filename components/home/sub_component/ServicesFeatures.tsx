"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useLocale, useTranslations } from "next-intl";
import { Star, TriangleRight } from "lucide-react";
import {
  Palette,
  Megaphone,
  Share2,
  Video,
  Code2,
  TrendingUp,
} from "lucide-react";
import { getDirection } from "@/i18n/getDirection";

export const serviceIcons = {
  Palette,
  Megaphone,
  Share2,
  Video,
  Code2,
  TrendingUp,
};

type Item = {
  title: string;
  description: string;
  features: string[];
  icon: keyof typeof serviceIcons;
};

export default function ServicesFeatures() {
  const t = useTranslations("servicesSection");
  const items: Item[] = t.raw("items");

  const locale = useLocale();
  const dir = getDirection(locale);

  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const CARD_WIDTH = 480;
  const GAP = 24;

  const totalDistance = (items.length - 1) * (CARD_WIDTH + GAP);

  // حركة من اليسار لليمين أثناء النزول
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    dir === "rtl" ? [0, totalDistance] : [0, -totalDistance],
  );

  const displayItems = dir === "rtl" ? [...items].reverse() : items;
  return (
    <div ref={containerRef} className="relative h-[350vh] w-full">
      <div className="sticky top-10 h-screen overflow-hidden flex items-center">
        <motion.div
          style={{ x }}
          dir="ltr"
          className="flex gap-6 ps-8 will-change-transform"
        >
          {displayItems.map((item, index) => {
            const Icon = serviceIcons[item.icon] ?? Palette;

            return (
              <div
                key={index}
                dir={dir}
                className="
                  shrink-0
                  w-120
                  h-130
                  overflow-hidden
                bg-[#1e1e1e]
                  rounded-t-[80px]
                  text-white
                  px-16
                  pt-24
                  pb-16
                  flex
                  flex-col
                  justify-evenly
                  items-center
                  gap-4
                  relative
                  group
                "
              >
                <div className="absolute right-0 top-full w-full h-full rounded-t-[80px] bg-linear-to-tr from-primary via-[#c6373d] to-[#5f1d1f] opacity-50 duration-500 group-hover:top-0 group-hover:scale-100 scale-90 z-10" />
                <div className="absolute top-8 right-10 text-8xl font-black text-white/5">
                  0{dir === "rtl" ? items.length - index : index + 1}
                </div>
                <div className="p-5 duration-500 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 group-hover:bg-white z-20">
                  <Icon size={32} className="text-primary" />
                </div>

                <h3 className="text-2xl font-bold z-20 text-center">
                  {item.title}
                </h3>

                <h4 className="text-lg z-20 text-center">{item.description}</h4>

                <hr className="w-full duration-500 group-hover:border-primary" />

                <div className="w-full flex flex-col gap-3 z-20">
                  {item.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3 relative">
                      <TriangleRight
                        size={24}
                        strokeWidth={0}
                        className="absolute fill-white/10 group-hover:fill-primary duration-700"
                      />

                      <Star size={16} className="z-20 shrink-0" />

                      <span className="text-xl z-20">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
