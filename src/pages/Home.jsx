import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { OverviewSection } from "@/components/OverviewSection";
import { ResidenceSection } from "@/components/ResidenceSection";
import { FacilitiesSection } from "@/components/FacilityCard";
import { LocationMap } from "@/components/LocationMap";
import { VirtualTour } from "@/components/VirtualTour";
import { GalleryLightbox } from "@/components/GalleryLightbox";
import { Testimonials } from "@/components/TestimonialCard";
import { ContactSection } from "@/components/LeadForm";
import { Footer } from "@/components/Footer";

export default function Home() {
  const { hash } = useLocation();
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return undefined;
    }
    const timer = setTimeout(() => document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" }), 150);
    return () => clearTimeout(timer);
  }, [hash]);
  return (
    <main data-testid="home-page">
      <Navbar />
      <HeroSection />
      <OverviewSection />
      <ResidenceSection />
      <FacilitiesSection />
      <LocationMap />
      <VirtualTour />
      <GalleryLightbox />
      <Testimonials />
      <ContactSection />
      <Footer />
    </main>
  );
}
