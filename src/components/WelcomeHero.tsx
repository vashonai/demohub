import React, { useState } from "react";
import {
  Sparkles,
  ArrowDown,
  Globe,
  Cpu,
  Rocket,
  CheckCircle2,
  ExternalLink,
  Code2,
  Layers,
  Mail,
  ShieldCheck,
  ChevronRight,
  Info
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";

interface WelcomeHeroProps {
  onExploreClick: () => void;
  totalProjects: number;
}

export function WelcomeHero({ onExploreClick, totalProjects }: WelcomeHeroProps) {
  const [aboutOpen, setAboutOpen] = useState(false);

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pb-20">
      {/* Decorative ambient background glows */}
      <div
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[360px] bg-gradient-to-tr from-sky-400/20 via-indigo-500/15 to-purple-500/20 blur-[100px] -z-10 rounded-full opacity-80"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-48 right-0 w-[300px] h-[300px] bg-gradient-to-br from-indigo-500/10 to-transparent blur-[80px] -z-10 rounded-full"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-5xl text-center">
        {/* Welcome Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-sky-500/10 via-indigo-500/10 to-purple-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs sm:text-sm font-semibold mb-6 shadow-xs backdrop-blur-xs">
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
          <span>Welcome to Aivora Labs</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.12] mb-6">
          High-Converting{" "}
          <span className="bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
            Websites &amp; Landing Pages
          </span>{" "}
          For Customer Businesses
        </h1>

        {/* Mission Statement: What Aivora Labs is about */}
        <p className="text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-9 font-normal">
          <strong className="text-foreground font-semibold">Aivora Labs</strong> builds custom websites and high-converting landing pages for businesses. We help companies establish a commanding web presence, elevate their brand, and turn visitors into clients with fast, mobile-first design.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 mb-14">
          <Button
            size="lg"
            onClick={onExploreClick}
            className="h-12 px-7 text-sm font-semibold rounded-xl bg-gradient-to-r from-sky-600 via-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/20 hover:opacity-95 hover:shadow-indigo-500/30 transition-all gap-2"
          >
            <span>Explore Our Work</span>
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={() => setAboutOpen(true)}
            className="h-12 px-6 text-sm font-medium rounded-xl border-muted-foreground/20 hover:bg-muted/60 transition-colors gap-2"
          >
            <Info className="w-4 h-4 text-muted-foreground" />
            <span>About Aivora Labs</span>
          </Button>
        </div>

        {/* Capabilities / Value Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-left pt-2">
          {/* Card 1 */}
          <div className="group relative p-6 rounded-2xl border border-muted/80 bg-card/70 backdrop-blur-md shadow-xs hover:shadow-md hover:border-indigo-500/30 transition-all duration-300">
            <div className="w-11 h-11 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <Globe className="w-5 h-5" />
            </div>
            <div className="text-xs font-bold text-sky-600 dark:text-sky-400 uppercase tracking-widest mb-1">
              Web Presence
            </div>
            <h3 className="text-base font-semibold text-foreground mb-2">
              Customer Business Websites
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Complete, bespoke business websites engineered to articulate your company’s services, build authority, and convert prospective customers.
            </p>
          </div>

          {/* Card 2 */}
          <div className="group relative p-6 rounded-2xl border border-muted/80 bg-card/70 backdrop-blur-md shadow-xs hover:shadow-md hover:border-indigo-500/30 transition-all duration-300">
            <div className="w-11 h-11 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <Rocket className="w-5 h-5" />
            </div>
            <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-1">
              Conversions
            </div>
            <h3 className="text-base font-semibold text-foreground mb-2">
              High-Converting Landing Pages
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Laser-focused single-page landing pages optimized for marketing campaigns, product launches, lead capture, and immediate customer inquiries.
            </p>
          </div>

          {/* Card 3 */}
          <div className="group relative p-6 rounded-2xl border border-muted/80 bg-card/70 backdrop-blur-md shadow-xs hover:shadow-md hover:border-indigo-500/30 transition-all duration-300">
            <div className="w-11 h-11 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-widest mb-1">
              Excellence
            </div>
            <h3 className="text-base font-semibold text-foreground mb-2">
              Mobile-First &amp; Live Demos
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Fluid mobile responsiveness, luxury typography, and interactive live previews that demonstrate exactly how each site operates.
            </p>
          </div>
        </div>

        {/* Proof / Trust Strip */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-muted-foreground border-y border-border/50 py-4">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>Interactive Live Demos</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-indigo-500" />
            <span>Production-Grade Code</span>
          </div>
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-purple-500" />
            <span>{totalProjects}+ Curated Projects</span>
          </div>
        </div>
      </div>

      {/* About Aivora Labs Modal Dialog */}
      <Dialog open={aboutOpen} onOpenChange={setAboutOpen}>
        <DialogContent className="sm:max-w-xl p-6 sm:p-8">
          <DialogHeader className="mb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 text-xs font-medium w-fit mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Digital Product Studio
            </div>
            <DialogTitle className="text-2xl font-bold tracking-tight">
              About Aivora Labs
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              Learn about our engineering philosophy, capabilities, and how we build.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-5 text-sm text-foreground/90 leading-relaxed">
            <div>
              <h4 className="font-semibold text-foreground mb-1 flex items-center gap-2">
                <Code2 className="w-4 h-4 text-sky-500" />
                Our Mission
              </h4>
              <p className="text-muted-foreground text-xs sm:text-sm">
                Aivora Labs accelerates digital transformation by delivering resilient, aesthetically refined web and AI software. We bridge the divide between theoretical concepts and usable, live deployed products that solve complex challenges.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-muted/40 border border-muted space-y-2">
              <h4 className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">
                Core Engineering Capabilities
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                  Full-Stack Web Applications
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                  AI &amp; LLM Automation Workflows
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                  Cloud Infrastructure &amp; APIs
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                  Scalable UI/UX Engineering
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-1 flex items-center gap-2">
                <Mail className="w-4 h-4 text-purple-500" />
                Partner With Us
              </h4>
              <p className="text-muted-foreground text-xs sm:text-sm">
                Interested in building or collaborating on a new digital product? Explore the live demos below to see our capabilities in action.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-5 border-t mt-6">
            <span className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} Aivora Labs
            </span>
            <Button
              size="sm"
              onClick={() => {
                setAboutOpen(false);
                onExploreClick();
              }}
              className="gap-1.5"
            >
              <span>View Projects</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
