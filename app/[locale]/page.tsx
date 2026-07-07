import AboutSection from "@/components/home/AboutSection";
import ClientsSection from "@/components/home/ClientsSection";
import ContactInfoSection from "@/components/home/ContactInfoSection";
import ContactSection from "@/components/home/ContactSection";
import HeroSection from "@/components/home/HeroSection";
import ServicesSection from "@/components/home/ServicesSection";
import ShortServicesSection from "@/components/home/ShortServicesSection";

export default function Home() {
  return (
    <div className="h-[2000px]">
      <main className="relative w-screen box-border">
        {/* <h1>نصمم لكم تجربة متكاملة</h1> */}
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
