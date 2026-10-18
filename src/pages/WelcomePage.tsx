import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Navbar } from "@/src/components/Navbar";
import { Button } from "@/src/components/ui/button";
import {
  Sparkles,
  ArrowRight,
  Globe,
  Rocket,
  CheckCircle2,
  ExternalLink,
  Code2,
  ArrowDown,
  Layers,
  Palette,
  Monitor,
  Smartphone,
  ChevronDown,
  Zap,
  ShieldCheck,
  Check
} from "lucide-react";

export default function WelcomePage() {
  const navigate = useNavigate();

  // ─── Reactive State: Solution Switcher ───
  const [selectedSolution, setSelectedSolution] = useState<"website" | "landing">("website");

  // ─── Reactive State: Interactive FAQ Accordion ───
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // ─── Reactive State: Active Metric Card Hover ───
  const [hoveredMetric, setHoveredMetric] = useState<number | null>(null);

  const scrollToAbout = () => {
    document.getElementById("about-section")?.scrollIntoView({ behavior: "smooth" });
  };

  const solutions = {
    website: {
      badge: "Full Web Presence",
      title: "Customer Business Website",
      headline: "Position Your Company as an Industry Authority",
      description:
        "A bespoke multi-page web platform designed for growing companies and service agencies looking to showcase offerings, build trust, and win corporate clients.",
      features: [
        "Multi-page architecture with dedicated service & portfolio pages",
        "Lead capture forms & direct inquiry integration",
        "Search engine optimization (SEO) & ultra-fast page speeds",
        "Full mobile responsiveness tailored for touch devices"
      ],
      sampleName: "AgileLab HQ",
      sampleUrl: "https://www.agilelabhq.com",
      sampleTag: "Live Client Deployment"
    },
    landing: {
      badge: "Maximum Conversion",
      title: "High-Converting Landing Page",
      headline: "Turn Ad Clicks & Visitors into Paying Inquiries",
      description:
        "A laser-focused, high-velocity single-page sales funnel engineered for marketing campaigns, product launches, or focused service offerings.",
      features: [
        "Persuasive visual hierarchy focused on one clear call-to-action",
        "Lightning-fast load speed (95+ Google PageSpeed score)",
        "Editorial luxury typography & high-impact aesthetics (like Rea Desynz)",
        "Seamless mobile checkout, call, or form submission experience"
      ],
      sampleName: "Rea Desynz",
      sampleUrl: "https://rea-desynz.vercel.app",
      sampleTag: "Live Studio Landing Page"
    }
  };

  const activeSol = solutions[selectedSolution];

  const faqs = [
    {
      q: "How fast can Aivora Labs design and deploy our website?",
      a: "High-converting single-page landing pages are typically engineered and live within 3–7 business days. Full multi-page business websites generally take 2–3 weeks depending on custom assets, copywriting, and integrations."
    },
    {
      q: "How do you guarantee the website converts visitors into clients?",
      a: "We structure every layout around conversion science: immediate value proposition above the fold, strong trust proof, compelling benefits, and frictionless inquiry buttons so visitors take immediate action."
    },
    {
      q: "Can we preview the live website while it's being developed?",
      a: "Yes! Every project includes a live deployment sandbox link so you can click, navigate, and test your website on your phone, tablet, and computer in real time throughout development."
    },
    {
      q: "Will our website look and function flawlessly on mobile phones?",
      a: "Over 70% of business web traffic is mobile. We engineer every site mobile-first with touch-friendly navigation, zero lag, and responsive typography that feels as fluid as a native mobile application."
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground flex flex-col overflow-x-hidden">
      {/* Navigation Bar */}
      <Navbar />

      <main className="flex-1 w-full">
        {/* ─── Hero Section with Motion Animations ─── */}
        <section className="relative overflow-hidden pt-6 sm:pt-10 pb-8 sm:pb-12">
          {/* Animated decorative glow orb */}
          <motion.div
            animate={{
              scale: [1, 1.08, 1],
              opacity: [0.7, 0.85, 0.7]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[90vw] max-w-[900px] h-[380px] bg-gradient-to-tr from-sky-400/20 via-indigo-500/15 to-purple-500/20 blur-[120px] -z-10 rounded-full"
            aria-hidden="true"
          />

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-5xl">
            {/* Status Pill Badge with Spring Animation */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 text-[11px] sm:text-xs font-semibold mb-3 sm:mb-4 shadow-sm"
            >
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <Sparkles className="w-3.5 h-3.5 text-sky-400 shrink-0" />
              <span className="tracking-wide">WEBSITES &amp; LANDING PAGES STUDIO</span>
            </motion.div>

            {/* Wix-Style Bold Headline with Reveal Animation */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground leading-[1.06] mb-3"
            >
              Create a website that grows your business{" "}
              <span className="bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
                without limits.
              </span>
            </motion.h1>

            {/* Sub-headline */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.16 }}
              className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-6 font-normal"
            >
              We design and build bespoke, high-converting websites and landing pages tailored specifically for customer businesses.
            </motion.p>

            {/* Action Buttons with Micro-Hover Feedback */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.24 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8 w-full max-w-md mx-auto sm:max-w-none"
            >
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
                <Button
                  size="lg"
                  onClick={() => navigate("/work")}
                  className="group w-full sm:w-auto h-12 px-8 text-sm font-semibold rounded-full bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 hover:opacity-90 shadow-lg shadow-neutral-900/10 transition-all gap-2"
                >
                  <span>See Our Client Work</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={scrollToAbout}
                  className="w-full sm:w-auto h-12 px-7 text-sm font-semibold rounded-full border border-border/80 hover:bg-muted/70 transition-all gap-2"
                >
                  <span>What We Build</span>
                  <ArrowDown className="w-4 h-4 text-muted-foreground" />
                </Button>
              </motion.div>
            </motion.div>

            {/* Reactive 4-Column Metric Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.32 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 p-3 sm:p-4 rounded-2xl border border-muted bg-card/80 backdrop-blur-md text-left"
            >
              {[
                { title: "100% Bespoke", desc: "Custom Tailored Design", color: "text-foreground" },
                { title: "High Impact", desc: "Conversion Focused", color: "text-indigo-600 dark:text-indigo-400" },
                { title: "Mobile-First", desc: "Pixel-Perfect Touch UX", color: "text-foreground" },
                { title: "100% Live", desc: "Verifiable Deployments", color: "text-emerald-600 dark:text-emerald-400" }
              ].map((metric, idx) => (
                <motion.div
                  key={idx}
                  onMouseEnter={() => setHoveredMetric(idx)}
                  onMouseLeave={() => setHoveredMetric(null)}
                  whileHover={{ y: -3, scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  className={`p-2 rounded-xl transition-all cursor-default ${
                    hoveredMetric === idx
                      ? "bg-muted/60 ring-1 ring-indigo-500/30"
                      : "bg-transparent"
                  }`}
                >
                  <div className={`text-xl sm:text-2xl font-bold tracking-tight ${metric.color}`}>
                    {metric.title}
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-muted-foreground font-medium uppercase tracking-wider mt-0.5">
                    {metric.desc}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ─── Reactive Solution Switcher: Compare What We Build ─── */}
        <section className="py-8 sm:py-12 border-t bg-muted/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="text-center mb-6">
              <span className="text-xs uppercase tracking-luxury font-bold text-indigo-600 dark:text-indigo-400 block mb-1.5">
                Interactive Comparison
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground mb-2">
                Choose the right solution for your business.
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto">
                Toggle between our two core offerings to see features, use cases, and live client examples.
              </p>
            </div>

            {/* Solution Toggle Pills */}
            <div className="flex items-center justify-center gap-2 mb-6 p-1 bg-muted rounded-full w-fit mx-auto border border-border/60">
              <button
                onClick={() => setSelectedSolution("website")}
                className={`relative px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                  selectedSolution === "website"
                    ? "bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Business Websites
              </button>
              <button
                onClick={() => setSelectedSolution("landing")}
                className={`relative px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                  selectedSolution === "landing"
                    ? "bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                High-Converting Landing Pages
              </button>
            </div>

            {/* Reactive Solution Details Card with Smooth Spring Transition */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedSolution}
                initial={{ opacity: 0, y: 12, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.98 }}
                transition={{ duration: 0.25 }}
                className="rounded-3xl border border-neutral-300/80 dark:border-neutral-800 bg-card p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-6">
                  <div className="flex-1">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 text-[11px] uppercase tracking-wider font-bold mb-3">
                      <Zap className="w-3 h-3 text-indigo-500" />
                      <span>{activeSol.badge}</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                      {activeSol.headline}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {activeSol.description}
                    </p>
                  </div>

                  {/* Quick Live Client Badge */}
                  <div className="p-4 rounded-2xl bg-muted/50 border border-muted sm:w-64 shrink-0 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                        Featured Live Example
                      </span>
                      <h4 className="font-bold text-base text-foreground mb-1">
                        {activeSol.sampleName}
                      </h4>
                      <p className="text-xs text-muted-foreground mb-3">
                        {activeSol.sampleTag}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => window.open(activeSol.sampleUrl, "_blank", "noopener,noreferrer")}
                      className="rounded-full h-8 text-xs font-semibold gap-1.5 w-full bg-foreground text-background hover:opacity-90"
                    >
                      <span>Visit Live Website</span>
                      <ExternalLink className="w-3 h-3" />
                    </Button>
                  </div>
                </div>

                {/* Features Checklist */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-5 border-t border-muted">
                  {activeSol.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-foreground">
                      <div className="w-4 h-4 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3" />
                      </div>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* ─── Wix-Style Bento Grid ─── */}
        <section id="about-section" className="py-10 sm:py-14 border-t">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
              <span className="text-xs uppercase tracking-luxury font-bold text-indigo-600 dark:text-indigo-400 block mb-1.5">
                Our Capabilities
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground mb-2.5">
                Everything your business needs to win online.
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-normal">
                At Aivora Labs, we build modern websites and high-converting landing pages tailored specifically for customer businesses.
              </p>
            </div>

            {/* Bento Grid with Motion Hover */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-5 mb-10">
              {/* Bento Card 1: Business Websites (7 cols) */}
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="md:col-span-7 p-6 sm:p-8 rounded-3xl border border-muted/80 bg-card shadow-xs flex flex-col justify-between hover:border-indigo-500/30 hover:shadow-md transition-all"
              >
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 text-sky-700 dark:text-sky-300 text-[11px] uppercase tracking-wider font-bold mb-4">
                    Full Web Architecture
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                    Customer Business Websites
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-normal mb-5">
                    Complete, bespoke multi-page business websites engineered to establish authority, present your company’s services, and convert high-ticket client inquiries.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-muted">
                  <div className="flex items-center gap-2 text-xs font-medium text-foreground">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>Multi-Page Service Architecture</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-medium text-foreground">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>SEO &amp; High-Speed Performance</span>
                  </div>
                </div>
              </motion.div>

              {/* Bento Card 2: High-Converting Landing Pages (5 cols) */}
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="md:col-span-5 p-6 sm:p-8 rounded-3xl border border-muted/80 bg-card shadow-xs flex flex-col justify-between hover:border-indigo-500/30 hover:shadow-md transition-all"
              >
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 text-[11px] uppercase tracking-wider font-bold mb-4">
                    Lead Generation
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                    High-Converting Landing Pages
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-normal mb-5">
                    Focused single-page sales and campaign landing pages designed with persuasive hierarchy to drive immediate calls and inquiries.
                  </p>
                </div>
                <div className="pt-4 border-t border-muted">
                  <div className="flex items-center gap-2 text-xs font-medium text-foreground">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>Optimized for Advertising &amp; Campaigns</span>
                  </div>
                </div>
              </motion.div>

              {/* Bento Card 3: Mobile-First Experience (5 cols) */}
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="md:col-span-5 p-6 sm:p-8 rounded-3xl border border-muted/80 bg-card shadow-xs flex flex-col justify-between hover:border-indigo-500/30 hover:shadow-md transition-all"
              >
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 text-purple-700 dark:text-purple-300 text-[11px] uppercase tracking-wider font-bold mb-4">
                    Mobile Perfection
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    Mobile-First UI/UX Design
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-normal mb-4">
                    Over 70% of traffic comes from mobile phones. We engineer every component to feel responsive, tactile, and effortless on handheld screens.
                  </p>
                </div>
                <div className="pt-3 border-t border-muted flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Smartphone className="w-3.5 h-3.5 text-purple-500" /> Touch Optimized</span>
                  <span className="flex items-center gap-1"><Monitor className="w-3.5 h-3.5 text-sky-500" /> 4K Ready</span>
                </div>
              </motion.div>

              {/* Bento Card 4: Verified Deployments (7 cols) */}
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="md:col-span-7 p-6 sm:p-8 rounded-3xl border border-muted/80 bg-card shadow-xs flex flex-col justify-between hover:border-indigo-500/30 hover:shadow-md transition-all"
              >
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 text-[11px] uppercase tracking-wider font-bold mb-4">
                    100% Transparency
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                    Verifiable Live Deployments
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-normal mb-5">
                    We don’t hide behind static Figma mockups. Every project we engineer features active live links and real interactive iframe previews for complete verification.
                  </p>
                </div>
                <div className="pt-4 border-t border-muted flex items-center justify-between">
                  <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                    Explore Our Client Work
                  </span>
                  <Button
                    size="sm"
                    variant="link"
                    className="p-0 h-auto text-xs font-semibold text-foreground hover:text-indigo-600 gap-1"
                    onClick={() => navigate("/work")}
                  >
                    <span>View Showcase</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ─── Featured Work Spotlight: AgileLab HQ & Rea Desynz ─── */}
        <section className="py-10 sm:py-14 border-t bg-muted/15">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            <div className="text-center mb-6 sm:mb-8">
              <span className="text-xs uppercase tracking-luxury font-bold text-indigo-600 dark:text-indigo-400 block mb-1.5">
                Client Deployments
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
                Featured Client Deployments
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
              {/* Card 1: AgileLab HQ */}
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
                className="rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-card shadow-xs overflow-hidden flex flex-col justify-between hover:shadow-xl hover:border-indigo-500/30 transition-all"
              >
                <div className="p-6 sm:p-7">
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 rounded-full bg-sky-500/10 text-sky-700 dark:text-sky-300 text-[10px] uppercase tracking-wider font-bold">
                      Customer Business Website
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Live
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    AgileLab HQ
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-normal mb-5">
                    A premier digital solutions and software development agency website designed to present enterprise services, technical talent, and attract high-value corporate clients.
                  </p>
                </div>
                <div className="px-6 sm:px-7 pb-6 pt-0 flex flex-wrap items-center gap-2 border-t pt-4">
                  <Button
                    size="sm"
                    onClick={() => window.open("https://www.agilelabhq.com", "_blank", "noopener,noreferrer")}
                    className="rounded-full px-5 h-9 text-xs font-semibold gap-1.5 w-full sm:w-auto"
                  >
                    <span>Visit Live Website</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate("/work")}
                    className="rounded-full px-5 h-9 text-xs font-medium w-full sm:w-auto"
                  >
                    <span>Showcase Details</span>
                  </Button>
                </div>
              </motion.div>

              {/* Card 2: Rea Desynz */}
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
                className="rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-card shadow-xs overflow-hidden flex flex-col justify-between hover:shadow-xl hover:border-purple-500/30 transition-all"
              >
                <div className="p-6 sm:p-7">
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-700 dark:text-purple-300 text-[10px] uppercase tracking-wider font-bold">
                      Brand &amp; Creative Studio Landing Page
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Live
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    Rea Desynz
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-normal mb-5">
                    A creative branding and marketing studio website crafted with editorial typography to establish an authoritative visual presence and convert prospective design clients.
                  </p>
                </div>
                <div className="px-6 sm:px-7 pb-6 pt-0 flex flex-wrap items-center gap-2 border-t pt-4">
                  <Button
                    size="sm"
                    onClick={() => window.open("https://rea-desynz.vercel.app", "_blank", "noopener,noreferrer")}
                    className="rounded-full px-5 h-9 text-xs font-semibold gap-1.5 w-full sm:w-auto"
                  >
                    <span>Visit Live Website</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate("/work")}
                    className="rounded-full px-5 h-9 text-xs font-medium w-full sm:w-auto"
                  >
                    <span>Showcase Details</span>
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ─── Reactive FAQ Accordion Section ─── */}
        <section className="py-10 sm:py-14 border-t">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
            <div className="text-center mb-8">
              <span className="text-xs uppercase tracking-luxury font-bold text-indigo-600 dark:text-indigo-400 block mb-1.5">
                Client Questions
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground mb-2">
                Frequently Asked Questions
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Everything you need to know about partnering with Aivora Labs.
              </p>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <motion.div
                    key={idx}
                    className="rounded-2xl border border-muted/80 bg-card overflow-hidden transition-colors"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full p-4 sm:p-5 flex items-center justify-between text-left gap-4 hover:bg-muted/30 transition-colors"
                    >
                      <span className="text-sm sm:text-base font-semibold text-foreground">
                        {faq.q}
                      </span>
                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="shrink-0 text-muted-foreground"
                      >
                        <ChevronDown className="w-4 h-4" />
                      </motion.div>
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                        >
                          <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 text-xs sm:text-sm text-muted-foreground leading-relaxed border-t border-muted/40 mt-1">
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── Wix-Style High-Impact Closing Banner ─── */}
        <section className="py-10 sm:py-14 border-t">
          <div className="container mx-auto px-4 max-w-4xl">
            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
              className="relative rounded-3xl bg-neutral-950 text-white p-8 sm:p-12 text-center overflow-hidden shadow-2xl"
            >
              <div
                className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-gradient-to-r from-sky-500/20 via-indigo-500/20 to-purple-500/20 blur-[90px] rounded-full"
                aria-hidden="true"
              />
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-3">
                Ready to build a website that sets your business apart?
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400 mb-6 max-w-xl mx-auto font-normal">
                Explore our live customer deployments or view our portfolio showcase to see the high-impact websites and landing pages we build.
              </p>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="inline-block">
                <Button
                  size="lg"
                  onClick={() => navigate("/work")}
                  className="rounded-full h-12 px-8 text-sm font-semibold bg-white text-black hover:bg-neutral-200 shadow-xl gap-2 transition-all"
                >
                  <span>Explore The Showcase</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-5 sm:py-6 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <img src="/logo.svg" alt="Aivora Labs Logo" className="w-6 h-6" />
              <span className="font-bold text-xs sm:text-sm tracking-wide bg-gradient-to-r from-sky-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                AIVORA LABS
              </span>
            </div>
            <div className="text-[11px] sm:text-xs text-muted-foreground font-light">
              © {new Date().getFullYear()} Aivora Labs. All rights reserved.
            </div>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <button onClick={() => navigate("/work")} className="hover:text-foreground transition-colors font-medium">
                Our Work
              </button>
              <button onClick={scrollToAbout} className="hover:text-foreground transition-colors font-medium">
                About
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
