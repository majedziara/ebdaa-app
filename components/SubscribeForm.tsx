"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import * as z from "zod/mini";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SubscribeForm() {
  const t = useTranslations("footer");

  const schema = z.object({
    email: z.email(t("emailRequired")),
  });

  const [emailError, setEmailError] = useState<string>();

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isLoading) return;
    const form = event.currentTarget;
    const parsed = schema.safeParse(Object.fromEntries(new FormData(form)));
    if (!parsed.success) {
      setEmailError(parsed.error.issues[0]?.message);
      (form.elements.namedItem("email") as HTMLElement | null)?.focus();
      return;
    }
    setEmailError(undefined);
    const data = parsed.data;
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
      form.reset();
    } catch {
      toast.error(t("error"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      noValidate
      aria-busy={isLoading}
      onSubmit={onSubmit}
      className="flex flex-col lg:flex-row gap-3 w-full"
    >
      <div className="flex-1">
        <label htmlFor="newsletter-email" className="sr-only">{t("emailPlaceholder")}</label>
        <Input
          id="newsletter-email"
          autoComplete="email"
          aria-invalid={!!emailError}
          aria-describedby={emailError ? "newsletter-email-error" : undefined}
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
          name="email"
        />

        {emailError && (
          <p id="newsletter-email-error" role="alert" className="text-red-400 text-sm mt-1">{emailError}</p>
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
