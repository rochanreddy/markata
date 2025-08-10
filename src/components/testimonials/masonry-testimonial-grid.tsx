"use client";

import { Star } from "lucide-react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { useSimpleScroll } from "@/hooks/use-simple-scroll";

import { cn } from "@/lib/utils";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";

interface DataItem {
  name: string;
  avatar: string;
  content: string;
  location: string;
  margin?: string;
}

const DATA: DataItem[] = [
  {
    name: "Sarah Mitchell",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=Sarah%20Mitchell",
    content:
      "The hotel booking was seamless and the property in Goa exceeded our expectations. The transport arranged by Markata was punctual and comfortable. Our family had an unforgettable vacation!",
    location: "Goa, India",
    margin: "mt-6",
  },
  {
    name: "David Thompson",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=David%20Thompson",
    content:
      "Booked a complete Rajasthan package through Markata. The heritage hotels, guided tours, and bus transfers were all perfectly coordinated. Exceptional service from start to finish!",
    location: "Rajasthan, India",
  },
  {
    name: "Priya Sharma",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=Priya%20Sharma",
    content:
      "The bus tickets from Delhi to Manali were booked instantly, and the luxury coach was incredibly comfortable. The mountain resort recommended by Markata was absolutely stunning.",
    location: "Manali, India",
    margin: "mt-4",
  },
  {
    name: "Michael Rodriguez",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=Michael%20Rodriguez",
    content:
      "Kerala backwaters package was a dream come true. The houseboat stay, authentic cuisine, and seamless transportation made our honeymoon truly special. Highly recommend Markata!",
    location: "Kerala, India",
  },
  {
    name: "Emma Wilson",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=Emma%20Wilson",
    content:
      "Solo traveler here - Markata made everything so easy! Hotel bookings in Mumbai, train tickets to Pune, and local transport recommendations. Felt safe and well-cared for throughout.",
    location: "Mumbai, India",
  },
  {
    name: "Raj Patel",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=Raj%20Patel",
    content:
      "Business trip to Bangalore made effortless with Markata. Airport transfers, premium hotel booking, and reliable transport for meetings. Professional service that I can trust.",
    location: "Bangalore, India",
  },
  {
    name: "Lisa Chen",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=Lisa%20Chen",
    content:
      "Golden Triangle tour package was phenomenal! Hotels in Delhi, Agra, and Jaipur were top-notch, and the guided tours revealed incredible history. Worth every penny!",
    location: "Delhi, India",
  },
  {
    name: "James Anderson",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=James%20Anderson",
    content:
      "Spiritual journey to Rishikesh made perfect by Markata. Riverside accommodation, yoga retreats, and peaceful transport arrangements. A transformative experience for our group.",
    location: "Rishikesh, India",
  },
  {
    name: "Anisha Gupta",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=Anisha%20Gupta",
    content:
      "Family reunion in Udaipur organized flawlessly! Palace hotel bookings, group transport, and sightseeing packages - everything was coordinated perfectly. Outstanding customer service!",
    location: "Udaipur, India",
  },
];

const MasonryTestimonialGrid = () => {
  const headerAnimation = useSimpleScroll({ delay: 0, animation: 'slideUp' });
  const gridAnimation = useSimpleScroll({ delay: 200, animation: 'fadeIn' });

  return (
    <section className="bg-background py-32">
      <div className="container">
        {/* Title */}
        <div 
          ref={headerAnimation.ref}
          style={headerAnimation.style}
          className="flex flex-col items-center gap-6 px-4 sm:px-8"
        >
          <h2 className="mb-2 text-center text-3xl font-semibold lg:text-5xl">
            What Our Travelers Say
          </h2>
        </div>

        <div 
          ref={gridAnimation.ref}
          style={gridAnimation.style}
          className="after:bg-linear-to-t after:from-background relative mt-14 w-full px-4 after:absolute after:inset-x-0 after:-bottom-2 after:h-96 sm:px-8 md:px-16 lg:px-32"
        >
          <ResponsiveMasonry
            columnsCountBreakPoints={{ 350: 1, 768: 2, 1024: 3 }}
          >
            <Masonry gutter="20px" columnsCount={3}>
              {DATA.map((testimonial, idx) => (
                <Card
                  key={`testimonial-${idx}-${testimonial.name}`}
                  className={cn(
                    "rounded-xl p-5 shadow-sm border hover:shadow-lg hover:border-primary/20 transition-all duration-500 hover:scale-[1.02]",
                    // Use responsive visibility classes that work consistently on both server and client
                    idx > 3 && idx <= 5 && "hidden md:block",
                    idx > 5 && "hidden lg:block",
                    testimonial.margin
                  )}
                >
                  <div className="mb-4 flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={`star-${idx}-${i}`} className="fill-primary text-primary h-4 w-4" />
                    ))}
                  </div>

                  <div className="text-foreground mt-4 text-sm">
                    <q>{testimonial.content}</q>
                  </div>

                  <div className="mt-4 flex items-center gap-2">
                    <Avatar className="ring-muted size-9 rounded-full ring-1">
                      <AvatarImage
                        src={testimonial.avatar}
                        alt={testimonial.name}
                      />
                    </Avatar>
                    <div className="text-sm">
                      <p className="font-medium">{testimonial.name}</p>
                      <p className="text-muted-foreground text-xs">{testimonial.location}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </Masonry>
          </ResponsiveMasonry>
        </div>
      </div>
    </section>
  );
};

export { MasonryTestimonialGrid };