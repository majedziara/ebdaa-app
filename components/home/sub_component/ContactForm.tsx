"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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
    name: z.string().min(2, t("nameRequired")),
    email: z.string().email(t("emailRequired")),
    phoneNumber: z.string().min(8, t("phoneNumberRequired")),
    subject: z.string().min(2, t("subjectRequired")),
    message: z.string().min(10, t("messageToShort")),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = async (data: FormData): Promise<void> => {
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
      reset();
    } catch {
      toast.error(t("error"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field
          placeholder={t("name")}
          error={errors.name?.message}
          {...register("name")}
        />

        <Field
          placeholder={t("email")}
          error={errors.email?.message}
          {...register("email")}
        />
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field
          placeholder={t("phoneNumber")}
          error={errors.phoneNumber?.message}
          {...register("phoneNumber")}
        />

        <Field
          placeholder={t("subject")}
          error={errors.subject?.message}
          {...register("subject")}
        />
      </div>

      {/* Message */}
      <div>
        <Textarea
          placeholder={t("message")}
          className="min-h-37.5 resize-none"
          {...register("message")}
        />

        {errors.message && (
          <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
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
      <Input
        {...props}
        className="
          transition
          focus:ring-2 focus:ring-primary/20
        "
      />

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
