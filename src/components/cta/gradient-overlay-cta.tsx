"use client";

import { useEffect, useRef, useState } from "react";
import { useSimpleScroll } from "@/hooks/use-simple-scroll";
import { Button } from "@/components/ui/button";

export const GradientOverlayCta = () => {
  const ctaAnimation = useSimpleScroll({ delay: 200, animation: 'slideUp' });

  return (
    <section className="py-32 bg-background">
      <div className="container">
        <div 
          ref={ctaAnimation.ref}
          style={ctaAnimation.style}
          className="flex h-[620px] items-center justify-center overflow-hidden rounded-2xl bg-[linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.2)),url('https://images.pexels.com/photos/1591056/pexels-photo-1591056.jpeg')] bg-cover bg-center hover:shadow-2xl transition-all duration-700 hover:scale-[1.02]"
        >
          <div className="flex flex-col gap-8 p-4 text-center">
            <h2 className="text-primary-foreground text-5xl font-bold font-display">
              Ready to Start Your Adventure?
            </h2>
            <p className="text-primary-foreground text-lg font-body">
              Join thousands of satisfied travelers who've discovered amazing destinations with Markata. Book your perfect trip today.
            </p>
            <div className="flex flex-col justify-center gap-2 sm:flex-row">
              <Button size="lg" variant="default" className="hover:scale-105 transition-transform duration-300">
                Book Your Trip Now
              </Button>
              <Button size="lg" variant="secondary" className="hover:scale-105 transition-transform duration-300">
                Browse Packages
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};