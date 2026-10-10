import AboutSection from "@/components/home/AboutSection";
import ClientsSection from "@/components/home/ClientsSection";
import ContactInfoSection from "@/components/home/ContactInfoSection";
import ContactSection from "@/components/home/ContactSection";
import HeroSection from "@/components/home/HeroSection";
import ServicesSection from "@/components/home/ServicesSection";
import ShortServicesSection from "@/components/home/ShortServicesSection";
import { setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  return (
    <div>
      <main id="main-content" tabIndex={-1} className="relative w-screen box-border">
        <HeroSection />
        <ShortServicesSection />
        <AboutSection />
        <ServicesSection />
        <ClientsSection />
        <ContactSection />
        <ContactInfoSection />
      </main>
    </div>
  );
}
