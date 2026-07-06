import { useTranslations } from "next-intl";
<<<<<<< HEAD
import Reveal from "../motion/Reveal";
import ClientsCarousel from "./sub_component/ClientsCarousel";

export default function ClientsSection() {
  const t = useTranslations("clientsSection");
=======
import React from "react";
import Reveal from "../motion/Reveal";
import ClientsCarousel from "./sub_component/ClientsCarousel";
import Autoplay from "embla-carousel-react";
import { useInView } from "motion/react";

export default function ClientsSection() {
  const t = useTranslations("clientsSection");
  const plugin = React.useRef(
    Autoplay({
      delay: 3000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    }),
  );
  const ref = React.useRef(null);
  const isInView = useInView(ref);

  React.useEffect(() => {
    if (!isInView) plugin.current.stop();
    else plugin.current.reset();
  }, [isInView]);
>>>>>>> c052080081031f3234c53c10c20c32bbda3aebb1

  return (
    <div
      id="services"
      className="flex flex-col gap-6 py-12 px-4 md:py-12 md:px-24 w-full items-center justify-center relative text-center"
    >
      <div className="text-3xl text-secondary opacity-20 blur-[2px] top-12 absolute">
        {t("clients")}
      </div>
      <Reveal delay={0.5}>
        <h2 className="text-primary font-semibold">{t("clients")}</h2>
      </Reveal>
      <Reveal delay={0.6}>
        <h3 className="text-2xl font-extrabold">{t("clientsTitle")}</h3>
      </Reveal>
      <Reveal delay={0.7}>
        <h4 className="text-md text-secondary">{t("clientsDescription")}</h4>
        <div className="mt-4 relative flex justify-center">
          <div className="w-96 h-0.5 rounded-full bg-primary-dark" />
          <div className="absolute w-12 h-4 bg-background -mt-2" />
          <div className="absolute w-4 h-4 rounded-full bg-primary-dark -mt-2" />
        </div>
      </Reveal>
      <ClientsCarousel />
    </div>
  );
}
