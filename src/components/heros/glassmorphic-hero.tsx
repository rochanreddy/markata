"use client"

import { ChevronRight } from "lucide-react";
import { useSimpleScroll } from "@/hooks/use-simple-scroll";

import { Button } from "@/components/ui/button";

const GlassmorphicHero = () => {
  const titleAnimation = useSimpleScroll({ delay: 300, animation: 'slideUp' });
  const descriptionAnimation = useSimpleScroll({ delay: 500, animation: 'slideUp' });
  const buttonsAnimation = useSimpleScroll({ delay: 700, animation: 'slideUp' });
  const trustedAnimation = useSimpleScroll({ delay: 900, animation: 'fadeIn' });

  return (
    <section className="relative py-32 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900">
      {/* Travel destination background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
          alt="Beautiful tropical destination"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      
      <div className="overflow-hidden border-b border-muted/20">
        <div className="container relative z-10">
          <div className="mx-auto flex max-w-5xl flex-col items-center">
            <div className="z-10 items-center text-center backdrop-blur-sm bg-white/10 rounded-2xl p-8 border border-white/20 shadow-2xl">
              <div 
                ref={titleAnimation.ref}
                style={titleAnimation.style}
              >
                <h1 className="mb-8 text-4xl font-semibold text-pretty lg:text-7xl text-white">
                  Discover Your Next Adventure with Markata
                </h1>
              </div>
              <div 
                ref={descriptionAnimation.ref}
                style={descriptionAnimation.style}
              >
                <p className="mx-auto max-w-3xl text-white/90 lg:text-xl leading-relaxed">
                  Premium travel experiences across luxury hotels, comfortable transportation, and curated destination packages. Your journey begins here.
                </p>
              </div>
              <div 
                ref={buttonsAnimation.ref}
                style={buttonsAnimation.style}
                className="mt-14 flex w-full flex-col justify-center gap-3 sm:flex-row"
              >
                <Button className="group transition-all rounded-full w-40 duration-300 hover:scale-105 hover:shadow-lg bg-primary hover:bg-primary/90">
                  Start Your Journey
                  <ChevronRight className="ml-2 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button
                  variant="ghost"
                  className="group transition-all duration-300 hover:bg-white/20 hover:scale-105 text-white border-white/30 hover:border-white/50"
                >
                  View Packages
                  <ChevronRight className="ml-2 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </div>
          </div>
          
          {/* Trusted by travelers section */}
          <div className="relative mt-28 text-center">
            <div className="mx-auto max-w-2xl">
              <div 
                ref={trustedAnimation.ref}
                style={trustedAnimation.style}
                className="flex items-center justify-center gap-4 text-white/80"
              >
                <div className="flex -space-x-2">
                  <img
                    src="https://images.unsplash.com/photo-1494790108755-2616b612b5c5?w=40&h=40&fit=crop&crop=face"
                    alt="Traveler"
                    className="w-8 h-8 rounded-full border-2 border-white/30"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face"
                    alt="Traveler"
                    className="w-8 h-8 rounded-full border-2 border-white/30"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face"
                    alt="Traveler"
                    className="w-8 h-8 rounded-full border-2 border-white/30"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
                    alt="Traveler"
                    className="w-8 h-8 rounded-full border-2 border-white/30"
                  />
                  <div className="w-8 h-8 rounded-full bg-white/20 border-2 border-white/30 flex items-center justify-center text-xs font-medium">
                    +
                  </div>
                </div>
                <p className="text-lg font-medium">
                  Trusted by 50,000+ travelers worldwide
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { GlassmorphicHero };