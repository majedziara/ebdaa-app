"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getDirection } from "@/i18n/getDirection";
import Autoplay from "embla-carousel-autoplay";
import { useLocale } from "next-intl";
import Image from "next/image";
import { useRef } from "react";

export default function ClientsCarousel() {
  const locale = useLocale();
  const dir = getDirection(locale);

  const plugin = useRef(
    Autoplay({
      delay: 2000, // كل ثانيتين
      stopOnInteraction: false, // يكمل بعد السحب
      stopOnMouseEnter: true, // يتوقف عند مرور الماوس
    }),
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      dir={dir}
      opts={{
        direction: dir,
        align: "start",
        loop: true,
      }}
      className="flex justify-center items-center max-w-full"
    >
      <CarouselContent>
        {Array.from({ length: 19 }).map((_, index) => (
          <CarouselItem key={index} className="basis-1/3 lg:basis-1/5">
            <div className="p-1">
              <div className="flex rounded-2xl shadow-lg aspect-square items-center justify-center p-6">
                <Image
                  src={`/assets/images/clients/client-${index + 1}.webp`}
                  width={500}
                  height={500}
                  loading="lazy"
                  alt={`client ${index + 1}`}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-2 md:-left-12" />
      <CarouselNext className="right-2 md:-right-12" />
    </Carousel>
  );
}
