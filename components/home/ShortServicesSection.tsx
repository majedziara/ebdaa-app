import { useTranslations } from "next-intl";
import Image from "next/image";
import Reveal from "../motion/Reveal";

type Item = {
  title: string;
  description: string;
};

const imgs = [
  "/assets/images/short-services/graphic-design.webp",
  "/assets/images/short-services/ads.webp",
  "/assets/images/short-services/computer-science.webp",
];

export default function ShortServicesSection() {
  const t = useTranslations("ShortServices");
  const items = t.raw("items");
  return (
    <div className="flex items-stretch justify-center gap-6 py-12 md:px-24 px-4 -mt-24 max-md:mt-0 flex-wrap overflow-visible w-full relative z-10">
      {items.map((item: Item, index: number) => (
        <Reveal
          className="p-6 max-lg:basis-[calc(50%-12px)] max-md:basis-full bg-white shadow-2xl flex flex-row flex-1 gap-3 rounded-2xl items-stretch relative overflow-hidden group cursor-default"
          key={index}
          direction={index % 2 === 0 ? "down" : "up"}
          // onlyOnce={false}
          delay={0.5 + index / 10}
        >
          <div className="absolute h-full bg-linear-to-b from-primary via-[#c6373d] to-[#5f1d1f] opacity-90 rounded-t-2xl left-0 right-0 -bottom-full group-hover:bottom-0 group-active:bottom-0 duration-500" />
          <Image
            src={imgs[index]}
            alt={item.title}
            width={400}
            height={400}
            className="w-1/4 z-20 object-contain"
          />
          <div className="flex-1 flex flex-col gap-4 justify-evenly">
            <h4 className="group-hover:opacity-0 group-active:opacity-0 duration-200 delay-200 text-lg font-medium">
              {item.title}
            </h4>
            <p className="group-hover:opacity-0 group-active:opacity-0 duration-200 delay-200 text-md text-mist-600">
              {item.description}
            </p>
            <span className="absolute opacity-0 group-hover:opacity-100 group-active:opacity-100 top-1/2 -translate-y-1/2 text-lg font-medium text-white delay-200 duration-300">
              {item.title}
            </span>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
