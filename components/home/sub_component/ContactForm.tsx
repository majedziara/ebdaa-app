"use client";

import * as z from "zod/mini";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { toast } from "sonner";

type FormData = {
  name: string;
  email: string;
  phoneNumber: string;
  subject: string;
  message: string;
};

export default function ContactForm() {
  const t = useTranslations("contactSection");

  // 🧠 schema inside component to access i18n
  const schema = z.object({
    name: z.string().check(z.minLength(2, t("nameRequired"))),
    email: z.email(t("emailRequired")),
    phoneNumber: z.string().check(z.minLength(8, t("phoneNumberRequired"))),
    subject: z.string().check(z.minLength(2, t("subjectRequired"))),
    message: z.string().check(z.minLength(10, t("messageToShort"))),
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    if (isLoading) return;
    const form = event.currentTarget;
    const result = schema.safeParse(Object.fromEntries(new globalThis.FormData(form)));
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof FormData, string>> = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof FormData;
        fieldErrors[field] ??= issue.message;
      }
      setErrors(fieldErrors);
      const firstField = result.error.issues[0]?.path[0];
      if (typeof firstField === "string") {
        (form.elements.namedItem(firstField) as HTMLElement | null)?.focus();
      }
      return;
    }
    setErrors({});
    const data = result.data;
    setIsLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        toast.error(t("error"));
        return;
      }

      toast.success(t("success"));
      form.reset();
    } catch {
      toast.error(t("error"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form noValidate aria-busy={isLoading} onSubmit={onSubmit} className="space-y-6">
      {/* Row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field
          id="contact-name"
          autoComplete="name"
          placeholder={t("name")}
          error={errors.name}
          name="name"
        />

        <Field
          id="contact-email"
          type="email"
          autoComplete="email"
          placeholder={t("email")}
          error={errors.email}
          name="email"
        />
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field
          id="contact-phone"
          type="tel"
          autoComplete="tel"
          placeholder={t("phoneNumber")}
          error={errors.phoneNumber}
          name="phoneNumber"
        />

        <Field
          id="contact-subject"
          placeholder={t("subject")}
          error={errors.subject}
          name="subject"
        />
      </div>

      {/* Message */}
      <div>
        <label htmlFor="contact-message" className="sr-only">{t("message")}</label>
        <Textarea
          id="contact-message"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          placeholder={t("message")}
          className="min-h-37.5 resize-none"
          name="message"
        />

        {errors.message && (
          <p id="contact-message-error" role="alert" className="text-red-600 text-sm mt-1">{errors.message}</p>
        )}
      </div>

      {/* Submit */}
      <Button type="submit" className="w-full md:w-auto" disabled={isLoading}>
        {isLoading ? t("loading") : t("sendBtn")}
      </Button>
    </form>
  );
}

/* =========================
   🧩 Field Component
========================= */

type FieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  error?: string;
};

function Field({ error, ...props }: FieldProps) {
  return (
    <div>
      <label htmlFor={props.id} className="sr-only">{props.placeholder}</label>
      <Input
        {...props}
        aria-invalid={!!error}
        aria-describedby={error ? `${props.id}-error` : undefined}
        className="
          transition
          focus:ring-2 focus:ring-primary/20
        "
      />

      {error && <p id={`${props.id}-error`} role="alert" className="text-red-600 text-sm mt-1">{error}</p>}
    </div>
  );
}
