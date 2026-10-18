import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/src/components/ui/button";
import { ArrowRight, Menu, X, Sparkles } from "lucide-react";

export function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isHome = location.pathname === "/";
  const isWork = location.pathname === "/work" || location.pathname === "/showcase" || location.pathname === "/projects";

  const handleNav = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 sm:h-15 items-center justify-between">
          {/* Logo & Brand Name */}
          <div
            className="flex items-center gap-2.5 sm:gap-3 cursor-pointer select-none"
            onClick={() => handleNav("/")}
          >
            <img
              src="/logo.svg"
              alt="Aivora Labs Logo"
              className="w-8 h-8 sm:w-9 sm:h-9 shrink-0"
            />
            <div className="flex flex-col">
              <h1 className="text-base sm:text-lg font-bold tracking-tight leading-tight bg-gradient-to-r from-sky-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                AIVORA LABS
              </h1>
              <span className="text-[9px] sm:text-[10px] font-semibold text-muted-foreground uppercase tracking-[0.18em] leading-none">
                Websites &amp; Landing Pages
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-2">
            <Button
              variant={isHome ? "secondary" : "ghost"}
              size="sm"
              className="text-xs font-semibold rounded-full h-8 px-4 transition-all"
              onClick={() => handleNav("/")}
            >
              Home
            </Button>
            <Button
              variant={isWork ? "secondary" : "ghost"}
              size="sm"
              className="text-xs font-semibold rounded-full h-8 px-4 transition-all"
              onClick={() => handleNav("/work")}
            >
              Our Work
            </Button>

            {isHome ? (
              <Button
                size="sm"
                className="ml-2 h-8 px-5 text-xs font-semibold rounded-full bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 shadow-sm hover:opacity-90 gap-1.5"
                onClick={() => handleNav("/work")}
              >
                <span>View Projects</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            ) : (
              <Button
                variant="outline"
                size="sm"
                className="ml-2 h-8 px-4 text-xs font-semibold rounded-full border-muted-foreground/20 hover:bg-muted/50"
                onClick={() => handleNav("/")}
              >
                About Aivora
              </Button>
            )}
          </nav>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center md:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 text-muted-foreground hover:text-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b bg-background/98 backdrop-blur px-4 pt-2 pb-6 space-y-2 animate-in slide-in-from-top-2 duration-200 shadow-xl">
          <div className="flex flex-col gap-1.5">
            <Button
              variant={isHome ? "secondary" : "ghost"}
              className="w-full justify-start text-sm font-medium h-11 px-4 rounded-xl"
              onClick={() => handleNav("/")}
            >
              Home
            </Button>
            <Button
              variant={isWork ? "secondary" : "ghost"}
              className="w-full justify-start text-sm font-medium h-11 px-4 rounded-xl"
              onClick={() => handleNav("/work")}
            >
              Our Work (Showcase)
            </Button>
            <div className="pt-2">
              <Button
                className="w-full h-11 text-sm font-semibold rounded-xl bg-gradient-to-r from-sky-600 via-indigo-600 to-purple-600 text-white shadow-md gap-2"
                onClick={() => handleNav("/work")}
              >
                <span>Explore Live Projects</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
