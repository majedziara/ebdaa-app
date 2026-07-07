import type { Metadata } from "next";
import { Rubik, Zain } from "next/font/google";
import "../globals.css";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getDirection } from "@/i18n/getDirection";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Navbar from "@/components/navbar/Navbar";
import { Toaster } from "sonner";
import FooterSection from "@/components/FooterSection";
import ScrollButton from "@/components/ScrollButton";
import LanguageButton from "@/components/LanguageButton";
import { getLocale } from "next-intl/server";

export const rubik = Rubik({
  subsets: ["arabic", "latin"],
  variable: "--font-rubik",
});

export const zain = Zain({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "700", "800", "900"],
  variable: "--font-zain",
});

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();

  const isArabic = locale === "ar";

  return {
    title: isArabic
      ? "إبداع | الدعاية والإعلان والحلول الرقمية"
      : "Ebdaa | Advertising, Branding & Digital Solutions",

    description: isArabic
      ? "إبداع شركة متخصصة في الدعاية والإعلان والهوية البصرية وإدارة المحتوى والتسويق الرقمي وتطوير المواقع الإلكترونية، نقدم حلولًا إبداعية تساعد الشركات على بناء حضور قوي وتحقيق نمو مستدام."
      : "Since 2003, Ebdaa has been delivering advertising, branding, content creation, digital marketing, and web development solutions that help businesses build strong brands and achieve sustainable growth.",
  };
}

export default async function RootLayout({
  params,
  children,
}: Readonly<{
  params: Promise<{ locale: string }>;
  children: React.ReactNode;
}>) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  const dir = getDirection(locale);

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html
      lang={locale}
      dir={dir}
      data-scroll-behavior="smooth"
      className={`${rubik.variable} ${zain.variable} h-full antialiased`}
    >
      <body className="min-h-screen overflow-x-hidden relative flex flex-col">
        <NextIntlClientProvider>
          <Toaster richColors position="top-right" />
          <Navbar />
          {children}
          <FooterSection />
          <ScrollButton />
          <LanguageButton />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
