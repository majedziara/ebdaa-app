// components/GradientCircle.tsx
import { cn } from "@/lib/utils";

type GradientCircleProps = {
  className?: string;
};

export default function GradientCircle({ className }: GradientCircleProps) {
  return (
    <div
      className={cn(
        `
        absolute
        w-24
        aspect-square
        rounded-full
        bg-linear-to-b
        from-primary
        via-[#c6373d]
        to-[#5f1d1f]
        animate-spin-slow
        opacity-80
        blur-2xs
        origin-[55%_55%]
        z-10
        `,
        className,
      )}
    />
  );
}
