import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { navbarLinks } from "@/constants/navigation";
import SubscribeForm from "./SubscribeForm";
import { siteConfig } from "@/lib/site";
import { Code2, Sparkles } from "lucide-react";

export default function FooterSection() {
  const socialAccounts = [
    { icon: FaFacebook, href: siteConfig.social.facebook, label: "Facebook" },
    { icon: FaInstagram, href: siteConfig.social.instagram, label: "Instagram" },
    { icon: FaWhatsapp, href: siteConfig.social.whatsapp, label: "WhatsApp" },
  ];
  const t = useTranslations("footer");
  const navT = useTranslations("Navbar");
  return (
    <footer className="text-white/85 py-12 px-4 md:py-12 md:px-24 w-full bg-[#1e1e1e] overflow-hidden relative">
      <div className="shapes pointer-events-none">
        <div className="absolute rtl:right-3 ltr:left-3 top-3 opacity-10">
          <Code2 size={120} className="animate-[spin_20s_linear_infinite]" />
        </div>

        <div className="absolute rtl:left-10 ltr:right-10 bottom-30 opacity-10">
          <Sparkles size={100} className="animate-pulse" />
        </div>
      </div>

      <div className="footer grid grid-cols-1 md:grid-cols-3 gap-12 mt-6">
        <div className="h-full w-full flex flex-col gap-3">
          <Image
            src={"/logo.svg"}
            alt="Ebdaa | إبداع"
            sizes="(max-width: 768px) 50vw, 17vw"
            width={709}
            height={591}
            className="w-1/2 h-auto"
            loading="lazy"
          />
          <p>{t("title")}</p>
          <div className="social-media-accounts flex gap-2">
            {socialAccounts.map((account, index) => {
              const Icon = account.icon;
              return (
                <Link key={index} href={account.href} target="_blank" rel="noopener noreferrer" aria-label={account.label}>
                  <Icon
                    size={24}
                    className="text-white hover:text-primary duration-500"
                  />
                </Link>
              );
            })}
          </div>
        </div>
        <div className="h-full w-full flex flex-col gap-3">
          <h2 style={{ fontFamily: "var(--font-rubik)" }} className="text-white font-semibold text-2xl">{t("company")}</h2>
          {navbarLinks.map((item, index) => (
            <Link
              key={index}
              href={item.link}
              className="hover:text-primary duration-500"
            >
              <span>{navT(item.key)}</span>
            </Link>
          ))}
        </div>
        <div className="h-full w-full flex flex-col gap-3">
          <h2 style={{ fontFamily: "var(--font-rubik)" }} className="text-white font-semibold text-2xl">
            {t("newsletter")}
          </h2>
          <SubscribeForm />
        </div>
      </div>
      <div className="copyright flex flex-col items-center justify-center mt-12 gap-4 relative">
        <div className="absolute top-0 right-1/3 w-8 aspect-square rounded-full bg-primary/50 animate-float-large-soft-3" />

        <hr className="bg-white w-full" />
        <p style={{ fontFamily: "var(--font-zain)" }} className="font-semibold text-md">
          {t("copyright", {
            year: new Date().getFullYear(),
          })}
        </p>
      </div>
    </footer>
  );
}
