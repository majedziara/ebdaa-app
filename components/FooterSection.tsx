import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { navbarLinks } from "@/constants/navigation";
import SubscribeForm from "./SubscribeForm";
import { Code2, Sparkles } from "lucide-react";

export default function FooterSection() {
  const socialAccounts = [
    { icon: FaFacebook, href: "https://facebook.com" },
    { icon: FaInstagram, href: "https://instagram.com" },
    { icon: FaWhatsapp, href: "https://wa.me/+972595634627" },
  ];
  const t = useTranslations("footer");
  const navT = useTranslations("Navbar");
  return (
    <div className="text-white/85 py-12 px-4 md:py-12 md:px-24 w-full bg-[#1e1e1e] overflow-hidden relative">
      <div className="shapes pointer-events-none">
        <div className="absolute right-3 top-3 opacity-10">
          <Code2 size={120} className="animate-[spin_20s_linear_infinite]" />
        </div>

        <div className="absolute left-10 bottom-30 opacity-10">
          <Sparkles size={100} className="animate-pulse" />
        </div>
      </div>

      <div className="footer grid grid-cols-1 md:grid-cols-3 gap-12 mt-6">
        <div className="h-full w-full flex flex-col gap-3">
          <Image
            src={"/logo.svg"}
            alt="logo"
            width={512}
            height={512}
            className="w-1/2 h-auto"
            loading="eager"
          />
          <p>{t("title")}</p>
          <div className="social-media-accounts flex gap-2">
            {socialAccounts.map((account, index) => {
              const Icon = account.icon;
              return (
                <Link key={index} href={account.href} target="_blank">
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
          <h4 className="text-white font-semibold text-2xl">{t("company")}</h4>
          {navbarLinks.map((item, index) => (
            <Link
              key={index}
              href={item.link}
              className="hover:text-primary duration-500"
            >
              <h5>{navT(item.key)}</h5>
            </Link>
          ))}
        </div>
        <div className="h-full w-full flex flex-col gap-3">
          <h4 className="text-white font-semibold text-2xl">
            {t("newsletter")}
          </h4>
          <SubscribeForm />
        </div>
      </div>
      <div className="copyright flex flex-col items-center justify-center mt-12 gap-4 relative">
        <div className="absolute top-0 right-1/3 w-8 aspect-square rounded-full bg-primary/50 animate-float-large-soft-3" />

        <hr className="bg-white w-full" />
        <h3 className="font-semibold text-md">
          {t("copyright", {
            year: new Date().getFullYear(),
          })}
        </h3>
      </div>
    </div>
  );
}
