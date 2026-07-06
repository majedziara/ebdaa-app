<<<<<<< HEAD
"use client";
=======
>>>>>>> c052080081031f3234c53c10c20c32bbda3aebb1
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getDirection } from "@/i18n/getDirection";
<<<<<<< HEAD
import Autoplay from "embla-carousel-autoplay";
import { useLocale } from "next-intl";
import Image from "next/image";
import { useRef } from "react";
=======
import { useLocale } from "next-intl";
import Image from "next/image";
>>>>>>> c052080081031f3234c53c10c20c32bbda3aebb1

export default function ClientsCarousel() {
  const locale = useLocale();
  const dir = getDirection(locale);

<<<<<<< HEAD
  const plugin = useRef(
    Autoplay({
      delay: 2000, // كل ثانيتين
      stopOnInteraction: false, // يكمل بعد السحب
    }),
  );

  return (
    <Carousel
      plugins={[plugin.current]}
=======
  return (
    <Carousel
>>>>>>> c052080081031f3234c53c10c20c32bbda3aebb1
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
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
