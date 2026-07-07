"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type FormData = {
  email: string;
};

export default function SubscribeForm() {
  const t = useTranslations("footer");

  const schema = z.object({
    email: z.string().email(t("emailRequired")),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        toast.error(result.message);
        return;
      }

      toast.success(result.message);
      reset();
    } catch {
      toast.error(t("error"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col lg:flex-row gap-3 w-full"
    >
      <div className="flex-1">
        <Input
          type="email"
          placeholder={t("emailPlaceholder")}
          className="
            h-12
            bg-white/10
            border-white/20
            text-white
            placeholder:text-white/50
            focus:ring-2
            focus:ring-primary/20
            p-4
          "
          {...register("email")}
        />

        {errors.email && (
          <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="h-12 px-6 whitespace-nowrap cursor-pointer duration-500"
      >
        {isLoading ? t("loading") : t("subscribe")}
      </Button>
    </form>
  );
}
