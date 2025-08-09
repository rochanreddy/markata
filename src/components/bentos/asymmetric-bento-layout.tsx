"use client";

import { Hotel, Bus, Package, Headphones } from "lucide-react";
import { useSimpleScroll } from "@/hooks/use-simple-scroll";

interface Feature {
  title: string;
  description: string;
  image: string;
}

interface AsymmetricBentoLayoutProps {
  heading?: string;
  description?: string;
  feature1?: Feature;
  feature2?: Feature;
  feature3?: Feature;
  feature4?: Feature;
}

const AsymmetricBentoLayout = ({
  heading = "Our Travel Services",
  description = "Everything you need for the perfect journey",
  feature1 = {
    title: "Luxury Hotels",
    description:
      "Premium accommodations with world-class amenities and exceptional service for your comfort.",
    image:
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  feature2 = {
    title: "Comfortable Transportation",
    description:
      "Safe, reliable, and comfortable travel with modern vehicles and professional drivers.",
    image:
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1969&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  feature3 = {
    title: "Curated Packages",
    description:
      "Thoughtfully designed travel packages that combine the best destinations, stays, and experiences.",
    image:
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  feature4 = {
    title: "24/7 Support",
    description:
      "Round-the-clock customer assistance to ensure your journey is smooth and worry-free.",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
}: AsymmetricBentoLayoutProps) => {
  const headerAnimation = useSimpleScroll({ delay: 0, animation: 'slideUp' });
  const feature1Animation = useSimpleScroll({ delay: 200, animation: 'fadeIn' });
  const feature2Animation = useSimpleScroll({ delay: 400, animation: 'fadeIn' });
  const feature3Animation = useSimpleScroll({ delay: 600, animation: 'fadeIn' });
  const feature4Animation = useSimpleScroll({ delay: 800, animation: 'fadeIn' });
  
  const getIcon = (title: string) => {
    switch (title) {
      case "Luxury Hotels":
        return <Hotel className="h-6 w-6 text-primary" />;
      case "Comfortable Transportation":
        return <Bus className="h-6 w-6 text-primary" />;
      case "Curated Packages":
        return <Package className="h-6 w-6 text-primary" />;
      case "24/7 Support":
        return <Headphones className="h-6 w-6 text-primary" />;
      default:
        return null;
    }
  };

  return (
    <section className="py-32 bg-background">
      <div className="container">
        <div 
          ref={headerAnimation.ref}
          style={headerAnimation.style}
          className="mb-24 flex flex-col items-center gap-6"
        >
          <h1 className="text-center text-3xl font-semibold lg:max-w-3xl lg:text-5xl">
            {heading}
          </h1>
          <p className="text-center text-lg font-medium text-muted-foreground md:max-w-4xl lg:text-xl">
            {description}
          </p>
        </div>
        <div className="relative flex justify-center">
          <div className="border-muted2 relative flex w-full flex-col border md:w-1/2 lg:w-full">
            <div className="relative flex flex-col lg:flex-row">
              <div 
                ref={feature1Animation.ref}
                style={feature1Animation.style}
                className="border-muted2 flex flex-col justify-between border-b border-solid p-10 lg:w-3/5 lg:border-r lg:border-b-0 hover:bg-muted/50 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  {getIcon(feature1.title)}
                  <h2 className="text-xl font-semibold">{feature1.title}</h2>
                </div>
                <p className="text-muted-foreground">{feature1.description}</p>
                <img
                  src={feature1.image}
                  alt={feature1.title}
                  className="mt-8 aspect-[1.5] h-full w-full object-cover lg:aspect-[2.4] rounded-lg transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div 
                ref={feature2Animation.ref}
                style={feature2Animation.style}
                className="flex flex-col justify-between p-10 lg:w-2/5 hover:bg-muted/50 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  {getIcon(feature2.title)}
                  <h2 className="text-xl font-semibold">{feature2.title}</h2>
                </div>
                <p className="text-muted-foreground">{feature2.description}</p>
                <img
                  src={feature2.image}
                  alt={feature2.title}
                  className="mt-8 aspect-[1.45] h-full w-full object-cover rounded-lg transition-transform duration-500 hover:scale-105"
                />
              </div>
            </div>
            <div className="border-muted2 relative flex flex-col border-t border-solid lg:flex-row">
              <div 
                ref={feature3Animation.ref}
                style={feature3Animation.style}
                className="border-muted2 flex flex-col justify-between border-b border-solid p-10 lg:w-2/5 lg:border-r lg:border-b-0 hover:bg-muted/50 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  {getIcon(feature3.title)}
                  <h2 className="text-xl font-semibold">{feature3.title}</h2>
                </div>
                <p className="text-muted-foreground">{feature3.description}</p>
                <img
                  src={feature3.image}
                  alt={feature3.title}
                  className="mt-8 aspect-[1.45] h-full w-full object-cover rounded-lg transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div 
                ref={feature4Animation.ref}
                style={feature4Animation.style}
                className="flex flex-col justify-between p-10 lg:w-3/5 hover:bg-muted/50 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  {getIcon(feature4.title)}
                  <h2 className="text-xl font-semibold">{feature4.title}</h2>
                </div>
                <p className="text-muted-foreground">{feature4.description}</p>
                <img
                  src={feature4.image}
                  alt={feature4.title}
                  className="mt-8 aspect-[1.5] h-full w-full object-cover lg:aspect-[2.4] rounded-lg transition-transform duration-500 hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { AsymmetricBentoLayout };