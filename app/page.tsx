import Navbar from "@/components/navbar"
import HeroSection from "@/components/hero-section"
import FeaturesSection from "@/components/features-section"
import EspDemoSection from "@/components/esp-demo-section"
import PricingSection from "@/components/pricing-section"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      {/* Global ambient purple gradient */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% -10%, oklch(0.40 0.22 300 / 0.25) 0%, transparent 60%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        <FeaturesSection />
        <EspDemoSection />
        <PricingSection />
        <Footer />
      </div>
    </main>
  )
}
