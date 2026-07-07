"use client";
import { useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";

export default function LanguageButton() {
  const locale = useLocale();
  const languages = [
    {
      locale: "en",
      text: "English",
      icon: "united-states-flag.webp",
    },
    {
      locale: "ar",
      text: "العربية",
      icon: "saudi-flag.webp",
    },
  ];

  return (
    <div className="fixed bottom-0 translate-y-1/2 right-28 focus-within:translate-y-0 hover:translate-y-0 duration-500 w-fit rounded-t-4xl py-3 px-2 bg-[#f1f1f1] text-black flex flex-col gap-4 z-30">
      {languages.map((lang, index) => (
        <Link
          href={lang.locale}
          // locale={lang.locale}
          key={index}
          onClick={(e) => {
            if (lang.locale === locale) e.preventDefault();
          }}
          className={`flex gap-2 px-3 py-2 rounded-lg ${locale !== lang.locale ? "cursor-pointer hover:bg-white" : "cursor-auto"}`}
        >
          <Image
            width={512}
            height={512}
            src={`/assets/images/flags/${lang.icon}`}
            alt={lang.text}
            className="w-8"
          />
          <span>{lang.locale}</span>
        </Link>
      ))}
    </div>
  );
}
