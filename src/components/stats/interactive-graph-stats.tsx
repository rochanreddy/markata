"use client";

import NumberFlow from "@number-flow/react";
import { motion, useInView } from "motion/react";
import { ArrowLeftRight, Users, MapPin, Headphones, Star } from "lucide-react";
import React, { useEffect, useMemo, useRef, useState } from "react";

import { Button } from "@/components/ui/button";

const InteractiveGraphStats = () => {
  const [showThisYear, setShowThisYear] = useState(false);
  const [stats, setStats] = useState({
    thisYear: {
      HappyTravelers: 0,
      Destinations: 0,
      CustomerSupport: 0,
      SatisfactionRate: 0,
    },
    allTime: {
      HappyTravelers: 0,
      Destinations: 0,
      CustomerSupport: 0,
      SatisfactionRate: 0,
    },
  });

  const ref = useRef(null);
  const isInView = useInView(ref);

  const finalStats = useMemo(
    () => ({
      thisYear: {
        HappyTravelers: 12.5,
        Destinations: 85,
        CustomerSupport: 24,
        SatisfactionRate: 98,
      },
      allTime: {
        HappyTravelers: 50,
        Destinations: 200,
        CustomerSupport: 24,
        SatisfactionRate: 99,
      },
    }),
    []
  );

  useEffect(() => {
    if (isInView) {
      setStats(finalStats);
    }
  }, [isInView, finalStats]);

  return (
    <section className="py-32 bg-background">
      <div className="container flex justify-center">
        <div className="flex w-full flex-col justify-between gap-4 lg:flex-row">
          <div className="w-full lg:w-1/3">
            <h1 className="w-full font-display text-6xl font-medium">
              Trusted by Travelers Worldwide
            </h1>
            <div className="mt-10 lg:w-[115%]">
              <Graph />
            </div>
          </div>
          <div ref={ref} className="flex w-full flex-col items-end lg:w-1/2">
            <h1 className="font-display text-8xl leading-0 lg:text-[10rem]">
              <NumberFlow
                value={
                  showThisYear
                    ? stats.thisYear.HappyTravelers
                    : stats.allTime.HappyTravelers
                }
                suffix="K+"
                className="font-display"
              />
            </h1>
            <div className="mb-6 flex flex-col items-center justify-center gap-6 lg:flex-row lg:gap-17">
              <p>Happy travelers exploring the world with confidence</p>
              <Button
                variant="secondary"
                className="group text-md flex w-fit items-center justify-center gap-2 rounded-full px-6 py-1 tracking-tight shadow-none transition-all duration-300 ease-out active:scale-95"
                onClick={() => setShowThisYear(!showThisYear)}
              >
                <span>{showThisYear ? "All Time" : "This Year"}</span>
                <ArrowLeftRight className="size-4 -rotate-45 transition-all ease-out group-hover:ml-3 group-hover:rotate-0" />
              </Button>
            </div>
            <div className="mt-auto mb-10 grid w-full grid-cols-2 gap-14">
              <div className="text-left">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="size-5 text-primary" />
                </div>
                <h2 className="text-4xl font-medium lg:text-6xl">
                  <NumberFlow
                    value={
                      showThisYear
                        ? stats.thisYear.HappyTravelers
                        : stats.allTime.HappyTravelers
                    }
                    suffix="K+"
                  />
                </h2>
                <p className="text-muted-foreground/70">Happy Travelers</p>
              </div>
              <div className="text-right">
                <div className="flex items-center justify-end gap-2 mb-2">
                  <MapPin className="size-5 text-primary" />
                </div>
                <h2 className="text-4xl font-medium lg:text-6xl">
                  <NumberFlow
                    value={
                      showThisYear
                        ? stats.thisYear.Destinations
                        : stats.allTime.Destinations
                    }
                    suffix="+"
                  />
                </h2>
                <p className="text-muted-foreground/70">Destinations</p>
              </div>
              <div className="text-left">
                <div className="flex items-center gap-2 mb-2">
                  <Headphones className="size-5 text-primary" />
                </div>
                <h2 className="text-4xl font-medium lg:text-6xl">
                  <NumberFlow
                    value={
                      showThisYear
                        ? stats.thisYear.CustomerSupport
                        : stats.allTime.CustomerSupport
                    }
                    suffix="/7"
                  />
                </h2>
                <p className="text-muted-foreground/70">Customer Support</p>
              </div>
              <div className="text-right">
                <div className="flex items-center justify-end gap-2 mb-2">
                  <Star className="size-5 text-primary" />
                </div>
                <h2 className="text-4xl font-medium lg:text-6xl">
                  <NumberFlow
                    value={
                      showThisYear
                        ? stats.thisYear.SatisfactionRate
                        : stats.allTime.SatisfactionRate
                    }
                    suffix="%"
                  />
                </h2>
                <p className="text-muted-foreground/70">Satisfaction Rate</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { InteractiveGraphStats };

function Graph() {
  return (
    <div className="wrapper">
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 644 388"
        initial={{
          clipPath: "inset(0px 100% 0px 0px)",
        }}
        animate={{
          clipPath: "inset(0px 0% 0px 0px)",
        }}
        transition={{
          duration: 1,
          type: "spring",
          damping: 18,
        }}
      >
        <g clipPath="url(#grad)">
          <path
            d="M1 350C1 350 83.308 320 114.735 280C146.162 240 189.504 200 235.952 160C273.548 120 294.469 100 329.733 80C409.879 50 452.946 40 483.874 30C514.802 25 635.97 15 644 10"
            stroke="var(--color-primary)"
            strokeWidth="2"
          />
          <path
            d="M113.912 280C82.437 320 1 350 1 350V388H644V10C635.957 15 514.601 25 483.625 30C452.649 40 409.515 50 329.245 80C293.926 100 272.973 120 235.318 160C188.798 200 145.388 240 113.912 280Z"
            fill="url(#grad)"
          />
        </g>
        <defs>
          <linearGradient
            id="grad"
            x1="321.5"
            y1="0.476773"
            x2="321.5"
            y2="387.477"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="var(--color-primary)" stopOpacity="0.4" />
            <stop offset="1" stopColor="var(--color-primary)" stopOpacity="0" />
          </linearGradient>
        </defs>
      </motion.svg>
    </div>
  );
}