import { ArrowLeft, ArrowRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import Reveal from "../motion/Reveal";
import { getDirection } from "@/i18n/getDirection";

export default function HeroSection() {
  const t = useTranslations("Hero");
  const locale = useLocale();
  const dir = getDirection(locale);
  return (
    <div
      id="home"
      className="w-screen
    bg-linear-to-br
from-rose-50
via-pink-100
to-violet-100
relative
px-12 py-16
max-md:px-3 max-md:py-6
overflow-hidden
"
      // from-white
      // via-rose-50
      // to-purple-100
    >
      <div className="lines absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="
    absolute
    left-[45%]
    top-0
    h-46
    w-0.5
    rounded-full
    bg-linear-to-b
    from-transparent
    via-primary/5
    to-secondary/5
    blur-[2px]
    animate-rain-line
  "
        />
        <div
          className="
    absolute
    left-[10%]
    top-[20%]
    h-52
    w-0.75
    rounded-full
    bg-linear-to-b
    from-transparent
    via-primary/5
    to-secondary/5
    blur-[2px]
    animate-rain-line
  "
        />
        <div
          className="
    absolute
    right-[35%]
    top-0
    h-46
    w-0.5
    rounded-full
    bg-linear-to-b
    from-transparent
    via-primary/5
    to-secondary/5
    blur-[2px]
    animate-rain-line-reverse
  "
        />
        <div
          className="
    absolute
    left-[55%]
    bottom-0
    h-46
    w-0.5
    rounded-full
    bg-linear-to-b
    from-transparent
    via-primary/5
    to-secondary/5
    blur-[2px]
    animate-rain-line
  "
        />
      </div>
      <div className="circles">
        <div
          className="
    absolute
    -top-30
    -right-30
    w-112.5
    aspect-square
    rounded-full
    border
    border-primary/10
    animate-float-large-soft
  "
        />
        <div
          className="
    absolute
    top-1/3
    left-1/3
    w-6
    aspect-square
    rounded-full
    bg-primary/10
    animate-float-organic-2
  "
        />
        <div
          className="
    absolute
    top-24
    right-24
    w-4
    aspect-square
    rounded-full
    bg-primary/10
    animate-float-large-soft-3
  "
        />
        <div className="absolute top-40 left-40 w-2 aspect-square rounded-full bg-primary/50 animate-float-organic-3" />
        <div className="absolute bottom-1/3 left-1/2 w-2 aspect-square rounded-full bg-primary/50 animate-float-large-soft-2" />
        <div className="absolute bottom-5 left-5 w-40 aspect-square rounded-full border border-primary/50 animate-float-organic" />
      </div>
      <div className="grid grid-cols-2 max-md:grid-cols-1 gap-6  w-full h-full pt-12 px-12 max-md:pt-28 items-center justify-between">
        <div className="content-col flex flex-col gap-6">
          <Reveal delay={0.5}>
            <h2
              className={`font-extrabold ${dir === "rtl" ? "text-5xl/relaxed max-lg:text-4xl/relaxed" : "text-5xl max-lg:text-4xl"}`}
            >
              {t("title1")}
              <br /> <span className="text-primary">{t("title2")}</span>
            </h2>
          </Reveal>
          <Reveal delay={1}>
            <h3 className="text-2xl/normal max-lg:text-xl">
              {t("description")}
            </h3>
          </Reveal>
          <Reveal delay={1.5}>
            <h4>
              <Link
                className="px-6 py-4 flex w-fit rounded-xl bg-primary relative group overflow-hidden text-white"
                href={"#contact"}
              >
                <div className="absolute h-full inset-0 w-0 top-0 right-0 group-hover:w-full bg-primary-dark transition-all duration-200" />
                <span className="flex items-center gap-2 z-10">
                  {t("startNow")}{" "}
                  {dir === "rtl" ? (
                    <ArrowLeft
                      size={20}
                      className="group-hover:animate-arrow-slide"
                    />
                  ) : (
                    <ArrowRight
                      size={20}
                      className="group-hover:animate-arrow-slide"
                    />
                  )}
                </span>
              </Link>
            </h4>
          </Reveal>
        </div>
        <Reveal delay={0.8} direction="right">
          <div className="image-col flex justify-center items-center h-96 max-md:h-62">
            <div
              className="rounded-full animate-spin-slow
bg-linear-to-br
from-rose-100
via-red-300
to-primary
 size-52
 absolute
 origin-custom
 max-md:size-32
 bottom-1/6"
            />
            <Image
              width={1000}
              height={600}
              quality={75}
              src={"/assets/images/hero/hero.webp"}
              alt="hero-ebdaa"
              loading="eager"
              className={`w-auto object-cover absolute h-96 max-md:h-72 ${dir === "ltr" ? "-bottom-20 max-sm:-bottom-12 lg:-bottom-24" : "-bottom-20 max-md:-bottom-8"}`}
            />
          </div>
        </Reveal>
      </div>
    </div>
  );
}
