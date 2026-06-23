import { useTranslations } from "next-intl";
import Reveal from "../motion/Reveal";
import ServicesFeatures from "./sub_component/ServicesFeatures";

export default function ServicesSection() {
  const t = useTranslations("servicesSection");
  return (
    <div
      id="services"
      className="flex flex-col gap-6 py-12 px-4 md:py-12 md:px-24 w-full items-center justify-center relative text-center"
    >
      <div className="text-3xl text-secondary opacity-20 blur-[2px] top-12 absolute">
        {t("services")}
      </div>
      <Reveal delay={0.5}>
        <h2 className="text-primary font-semibold">{t("services")}</h2>
      </Reveal>
      <Reveal delay={0.6}>
        <h3 className="text-2xl font-extrabold">{t("servicesTitle")}</h3>
      </Reveal>
      <Reveal delay={0.7}>
        <h4 className="text-md text-secondary">{t("servicesDescription")}</h4>
      </Reveal>
      <ServicesFeatures />
    </div>
  );
}
