"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import Reveal from "../motion/Reveal";
import ContactForm from "./sub_component/ContactForm";
import GradientCircle from "./sub_component/GradientCircle";

export default function ContactSection() {
  const t = useTranslations("contactSection");

  return (
    <section
      id="contact"
      className="
        flex flex-col items-center justify-center
        gap-12 py-12 px-4 md:py-12 md:px-24 w-full relative
      "
    >
      <div className="text-3xl text-secondary opacity-20 blur-[2px] top-12 absolute">
        {t("contact")}
      </div>
      {/* 🧠 Title */}
      <Reveal>
        <h2 className="text-primary font-semibold">{t("contact")}</h2>
      </Reveal>

      {/* 📦 Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center w-full">
        {/* 🖼️ Image */}
        <Reveal delay={0.1}>
          <GradientCircle
            className="bottom-10
        rtl:-right-4
        ltr:-left-4"
          />
          <div className="overflow-hidden rounded-xl relative">
            <Image
              src="/assets/images/contact/contact.webp"
              alt="contact us"
              width={1000}
              height={700}
              className="
                w-full h-full object-cover
                transition-transform duration-500
                hover:scale-[1.02]
              "
              loading="eager"
            />
          </div>
        </Reveal>

        {/* ✨ Text + Form */}
        <div className="flex flex-col gap-6">
          <Reveal delay={0.2}>
            <h3 className="text-3xl font-bold">{t("contactTitle")}</h3>
          </Reveal>

          <Reveal delay={0.3}>
            <h4 className="text-md font-medium text-foreground/70 leading-relaxed">
              {t("contactDescription")}
            </h4>
          </Reveal>

          {/* 🧾 Form (focus element) */}
          <Reveal delay={0.4}>
            <div
              className="
                mt-4 p-6 rounded-xl
                bg-background shadow-md
                border border-foreground/10
              "
            >
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
