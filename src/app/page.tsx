import { FloatingNavbar } from "@/components/navbars/floating-navbar";
import { GlassmorphicHero } from "@/components/heros/glassmorphic-hero";
import { AsymmetricBentoLayout } from "@/components/bentos/asymmetric-bento-layout";
import { TabControlledGallery } from "@/components/gallery/tab-controlled-gallery";
import { MasonryTestimonialGrid } from "@/components/testimonials/masonry-testimonial-grid";
import { InteractiveGraphStats } from "@/components/stats/interactive-graph-stats";
import { GradientOverlayCta } from "@/components/cta/gradient-overlay-cta";
import TabbedBookingForm from "@/components/booking/tabbed-booking-form";
import { NewsletterFooter } from "@/components/footers/newsletter-footer";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <FloatingNavbar />
      <GlassmorphicHero />
      <div className="py-16">
        <TabbedBookingForm />
      </div>
      <AsymmetricBentoLayout />
      <TabControlledGallery />
      <MasonryTestimonialGrid />
      <InteractiveGraphStats />
      <GradientOverlayCta />
      <NewsletterFooter />
    </main>
  );
}