"use client";

import { useEffect, useRef, useState } from "react";
import { useSimpleScroll } from "@/hooks/use-simple-scroll";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const destinations = [
  {
    title: "Maldives Paradise",
    location: "Maldives", 
    description: "Crystal-clear waters and overwater bungalows in the heart of the Indian Ocean. Perfect for romantic getaways and luxury relaxation.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Beach Resorts",
  },
  {
    title: "Santorini Sunset",
    location: "Greece",
    description: "Iconic white-washed buildings overlooking the stunning Aegean Sea. Experience breathtaking sunsets and Mediterranean charm.",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Beach Resorts",
  },
  {
    title: "Swiss Alps Retreat",
    location: "Switzerland",
    description: "Majestic mountain peaks and pristine alpine lakes. Enjoy world-class skiing, hiking, and breathtaking panoramic views.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Mountain Retreats",
  },
  {
    title: "Himalayan Heights",
    location: "Nepal",
    description: "Towering peaks and serene mountain valleys. Experience trekking adventures and spiritual retreats in the world's highest mountains.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Mountain Retreats",
  },
  {
    title: "Tokyo Metropolitan",
    location: "Japan",
    description: "Modern skyscrapers blend with ancient traditions. Discover cutting-edge technology, incredible cuisine, and vibrant urban culture.",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "City Escapes",
  },
  {
    title: "New York Energy",
    location: "USA",
    description: "The city that never sleeps offers endless entertainment, world-class dining, and iconic landmarks around every corner.",
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "City Escapes",
  },
  {
    title: "Ancient Rome",
    location: "Italy",
    description: "Walk through millennia of history with ancient ruins, magnificent architecture, and timeless art treasures at every turn.",
    image: "https://images.unsplash.com/photo-1552832230-c0197040fd62?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Cultural Tours",
  },
  {
    title: "Machu Picchu Wonder",
    location: "Peru",
    description: "Discover the lost city of the Incas nestled high in the Andes. Experience ancient mystery and breathtaking mountain vistas.",
    image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Cultural Tours",
  },
];

const TabControlledGallery = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState("Beach Resorts");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [indicatorStyle, setIndicatorStyle] = useState({
    width: 0,
    left: 0,
  });

  const headerAnimation = useSimpleScroll({ delay: 0, animation: 'slideUp' });
  const tabsAnimation = useSimpleScroll({ delay: 200, animation: 'fadeIn' });
  const carouselAnimation = useSimpleScroll({ delay: 400, animation: 'slideUp' });

  const categories = ["Beach Resorts", "Mountain Retreats", "City Escapes", "Cultural Tours"];
  const filteredDestinations = destinations.filter(dest => dest.category === current);

  useEffect(() => {
    const currentIndex = categories.findIndex((category) => category === current);
    const activeTab = tabRefs.current[currentIndex];

    if (activeTab) {
      const { offsetWidth, offsetLeft } = activeTab;
      setIndicatorStyle({
        width: offsetWidth,
        left: offsetLeft,
      });
    }
  }, [current]);

  useEffect(() => {
    if (!api) {
      return;
    }

    api.scrollTo(0);

    const onSelect = () => {
      // Keep carousel in sync but don't change tabs automatically
    };
    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api, current]);

  return (
    <section className="overflow-hidden py-32 bg-background">
      <div className="container">
        <div 
          ref={headerAnimation.ref}
          style={headerAnimation.style}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Popular Destinations
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover breathtaking destinations around the world, from pristine beaches to majestic mountains and vibrant cities
          </p>
        </div>

        <Carousel
          setApi={setApi}
          className="[&>div[data-slot=carousel-content]]:overflow-visible"
        >
          <div className="flex items-center justify-between">
            <div 
              ref={tabsAnimation.ref}
              style={tabsAnimation.style}
            >
              <Tabs
                value={current}
                onValueChange={setCurrent}
                className="mb-8 flex justify-center"
              >
                <TabsList className="relative h-auto gap-6 bg-background">
                  {categories.map((category, idx) => (
                    <TabsTrigger
                      key={idx}
                      ref={(el) => {
                        tabRefs.current[idx] = el;
                      }}
                      value={category}
                      className="text-base transition-all duration-700 ease-out [&[data-state=active]]:shadow-none"
                    >
                      {category}
                    </TabsTrigger>
                  ))}
                  <div
                    className="absolute bottom-0 h-0.5 bg-primary transition-all duration-700 ease-out"
                    style={{
                      width: `${indicatorStyle.width}px`,
                      left: `${indicatorStyle.left}px`,
                    }}
                  />
                </TabsList>
              </Tabs>
            </div>
            <div className="hidden items-center gap-4 sm:flex">
              <CarouselPrevious className="static size-10 translate-0" />
              <CarouselNext className="static size-10 translate-0" />
            </div>
          </div>
          <div 
            ref={carouselAnimation.ref}
            style={carouselAnimation.style}
          >
            <CarouselContent className="max-w-4xl">
              {filteredDestinations.map((destination, idx) => (
                <CarouselItem key={idx} className="w-fit max-w-4xl">
                  <div className="relative grid h-full max-w-4xl gap-0 rounded-xl border border-border shadow-sm select-none md:max-h-[450px] md:grid-cols-2 overflow-hidden group hover:shadow-xl hover:border-primary/20 transition-all duration-500">
                    <div className="flex flex-col justify-between gap-4 p-6 sm:p-10">
                      <div>
                        <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 transition-all duration-300 group-hover:bg-primary/20">
                          {destination.location}
                        </div>
                        <h3 className="text-2xl font-bold text-foreground sm:text-3xl mb-4 transition-colors duration-300 group-hover:text-primary">
                          {destination.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {destination.description}
                        </p>
                      </div>
                      <button className="inline-flex items-center text-primary font-medium hover:text-primary/80 transition-all duration-300 w-fit group-hover:translate-x-1">
                        Explore Destination
                        <svg className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                    <div className="relative h-full min-h-[300px] md:min-h-[450px] overflow-hidden">
                      <img
                        src={destination.image}
                        alt={destination.title}
                        className="absolute inset-0 h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export { TabControlledGallery };