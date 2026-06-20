"use client";

import { useTranslations } from "next-intl";
import InteractiveImage from "./sub_component/InteractiveImage";
import Reveal from "../motion/Reveal";
import { aboutSectionData } from "@/constants/about";

export default function AboutSection() {
  const t = useTranslations("aboutSection");

  return (
    <section
      id="about"
      className="flex flex-col p-4 md:p-24 items-center justify-center text-center gap-12"
    >
      {/* 🔝 Top Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20 w-full items-center">
        {/* 🖼️ Image */}
        <Reveal delay={0.8} direction="up">
          <InteractiveImage
            src="/assets/images/about/about-2.webp"
            alt="about-2"
            width={1000}
            height={600}
            blur={4}
            scale={1.03}
            perspective={1000}
            loading="eager"
            overlay={false}
            className="w-full h-full aspect-video"
          />
        </Reveal>

        {/* ✨ Text */}
        <Reveal
          delay={0.8}
          direction="down"
          className="flex flex-col items-start text-start gap-5"
        >
          <div className="text-2xl text-secondary opacity-20 translate-y-2 absolute">
            {t("information")}
          </div>

          <h2 className="text-primary font-semibold">{t("about")}</h2>

          <h3 className="text-3xl font-bold">{t(aboutSectionData[0].title)}</h3>

          <h4 className="text-md font-medium leading-relaxed">
            {t(aboutSectionData[0].description)}
          </h4>
        </Reveal>
      </div>

      {/* 🔻 Bottom Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full items-stretch">
        {aboutSectionData.map((item, index) =>
          index > 0 ? (
            <Reveal
              key={index}
              delay={0.8}
              direction={index === 1 ? "up" : "down"}
            >
              <div className="flex flex-col gap-4 text-start">
                <h3 className="text-2xl font-bold">{t(item.title)}</h3>
                <h4 className="text-md font-medium leading-relaxed">
                  {t(item.description)}
                </h4>
              </div>
            </Reveal>
          ) : null,
        )}

        {/* 🖼️ Second Image */}
        <Reveal delay={0.8} direction="up">
          <InteractiveImage
            src="/assets/images/about/about-1.webp"
            alt="about-2"
            width={1000}
            height={600}
            blur={4}
            scale={1.03}
            perspective={1000}
            overlay={false}
            className="w-full h-full aspect-video"
          />
        </Reveal>
      </div>
    </section>
  );
}
