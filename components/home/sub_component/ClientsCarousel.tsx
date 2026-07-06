import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getDirection } from "@/i18n/getDirection";
import { useLocale } from "next-intl";
import Image from "next/image";

export default function ClientsCarousel() {
  const locale = useLocale();
  const dir = getDirection(locale);

  return (
    <Carousel
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
