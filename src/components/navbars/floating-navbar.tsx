"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

const ITEMS = [
  { label: "Home", href: "#" },
  { label: "Hotels", href: "#" },
  { label: "Transportation", href: "#" },
  { label: "Packages", href: "#" },
  { label: "About", href: "#" },
];

const logo = {
  url: "/",
  title: "Markata",
};

const FloatingNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <section className="absolute top-5 left-1/2 z-50 w-[min(90%,700px)] -translate-x-1/2 rounded-full border bg-background/70 backdrop-blur-md lg:top-12">
      <div className="flex items-center justify-between px-6 py-3">
        <a href={logo.url} className="flex shrink-0 items-center gap-2" title={logo.title}>
          <span className="text-xl font-bold text-primary font-[var(--font-display)]">Markata</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="max-lg:hidden">
          <ul className="flex items-center space-x-8">
            {ITEMS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Auth Buttons */}
        <div className="flex items-center gap-2.5">
          <Button className="max-lg:hidden">
            <span className="relative z-10">Book Now</span>
          </Button>

          {/* Hamburger Menu Button (Mobile Only) */}
          <button
            className="relative flex size-8 text-muted-foreground lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            <div className="absolute top-1/2 left-1/2 block w-[18px] -translate-x-1/2 -translate-y-1/2">
              <span
                aria-hidden="true"
                className={`absolute block h-0.5 w-full rounded-full bg-current transition duration-500 ease-in-out ${isMenuOpen ? "rotate-45" : "-translate-y-1.5"}`}
              ></span>
              <span
                aria-hidden="true"
                className={`absolute block h-0.5 w-full rounded-full bg-current transition duration-500 ease-in-out ${isMenuOpen ? "opacity-0" : ""}`}
              ></span>
              <span
                aria-hidden="true"
                className={`absolute block h-0.5 w-full rounded-full bg-current transition duration-500 ease-in-out ${isMenuOpen ? "-rotate-45" : "translate-y-1.5"}`}
              ></span>
            </div>
          </button>
        </div>
      </div>

      {/*  Mobile Menu Navigation */}
      <div
        className={cn(
          "fixed inset-x-0 top-[calc(100%+1rem)] flex flex-col rounded-2xl border bg-background p-6 transition-all duration-300 ease-in-out lg:hidden",
          isMenuOpen
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-4 opacity-0",
        )}
      >
        <nav className="flex flex-1 flex-col divide-y divide-border">
          {ITEMS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="py-4 text-base font-medium text-primary transition-colors first:pt-0 last:pb-0 hover:text-primary/80"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>
        
        <div className="mt-6 pt-6 border-t">
          <Button className="w-full" onClick={() => setIsMenuOpen(false)}>
            Book Now
          </Button>
        </div>
      </div>
    </section>
  );
};

export { FloatingNavbar };