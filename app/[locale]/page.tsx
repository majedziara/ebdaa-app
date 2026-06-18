import HeroSection from "@/components/home/HeroSection";

export default function Home() {
  return (
    <div className="h-[2000px]">
      <main className="relative w-screen overflow-hidden box-border">
        {/* <h1>نصمم لكم تجربة متكاملة</h1> */}
        <HeroSection />
      </main>
    </div>
  );
}
