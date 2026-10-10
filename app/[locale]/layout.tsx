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
import { getMetadata } from "@/lib/metadata";
import StructuredData from "@/components/seo/StructuredData";
import GoogleAnalytics from "@/components/seo/GoogleAnalytics";
import { setRequestLocale } from "next-intl/server";
import MotionProvider from "@/components/motion/MotionProvider";
import { Suspense } from "react";
import RouteLoading from "@/components/RouteLoading";

export const rubik = Rubik({
  subsets: ["arabic", "latin"],
  variable: "--font-rubik",
});

export const zain = Zain({
  subsets: ["arabic", "latin"],
  weight: ["400", "700", "800"],
  variable: "--font-zain",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  return getMetadata(locale);
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
  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      dir={dir}
      data-scroll-behavior="smooth"
      className={`${rubik.variable} ${zain.variable} h-full antialiased`}
    >
      <body className="min-h-screen overflow-x-hidden relative flex flex-col">
        <a href="#main-content" className="skip-link">
          {locale === "ar" ? "تخطي إلى المحتوى" : "Skip to content"}
        </a>
        <StructuredData locale={locale} />
        <Suspense fallback={<RouteLoading />}>
          <NextIntlClientProvider>
            <MotionProvider>
              <Toaster richColors position="top-right" />
              <Navbar />
              {children}
              <FooterSection />
              <ScrollButton />
              <LanguageButton />
            </MotionProvider>
          </NextIntlClientProvider>
        </Suspense>
        <GoogleAnalytics />
      </body>
    </html>
  );
}
