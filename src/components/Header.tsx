import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  Calendar, 
  Menu, 
  X, 
  ShieldCheck, 
  MapPin, 
  Clock, 
  HeartPulse, 
  ArrowRight 
} from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';

interface HeaderProps {
  onOpenBooking: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenHealthChecker?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  onOpenBooking, 
  activeSection, 
  onNavigate,
  onOpenHealthChecker 
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Exactly the 4 pages specified by the user
  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'services', label: 'Services' },
    { id: 'contact', label: 'Contact' },
  ];

  // Close menus on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  const handleOpenBookingAction = () => {
    onOpenBooking();
    setMobileMenuOpen(false);
  };

  const handleOpenHealthCheckerAction = () => {
    if (onOpenHealthChecker) {
      onOpenHealthChecker();
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* 1. Refined Top Information Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1.5 sm:gap-4 text-center sm:text-left">
          {/* Accreditation and Location */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-3 text-slate-300">
            <span className="inline-flex items-center gap-1.5 text-emerald-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 shrink-0" strokeWidth={2} />
              <span>HEFAMAA Accredited Healthcare Facility</span>
            </span>
            <span className="text-slate-600 hidden sm:inline" aria-hidden="true">|</span>
            <span className="inline-flex items-center gap-1.5 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" strokeWidth={2} />
              <span>Plot 14, Victoria Island, Lagos</span>
            </span>
          </div>

          {/* Emergency & Acute Care Telephone */}
          <div className="flex items-center justify-center gap-3">
            <a 
              href="tel:+23418909999" 
              className="group inline-flex items-center gap-1.5 text-slate-200 hover:text-white transition-colors font-medium whitespace-nowrap"
              title="24/7 Acute Care & Emergency Line"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <Phone className="w-3.5 h-3.5 text-emerald-400 group-hover:text-emerald-300 shrink-0" strokeWidth={2} />
              <span>Emergency:</span>
              <span className="font-semibold text-emerald-300">+234 1 890 9999</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs transition-shadow">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-20 px-4 sm:px-6 lg:px-8">
          
          {/* Left: Brand Identity & Redesigned Logo */}
          <button 
            onClick={() => handleNavClick('home')}
            className="group flex items-center gap-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 rounded-lg shrink-0 cursor-pointer"
            aria-label="Winnie's Clinic Homepage"
          >
            {/* Architectural & Medical Cross Emblem */}
            <div className="w-10 h-10 rounded-xl bg-emerald-800 text-white flex items-center justify-center shadow-sm group-hover:bg-emerald-900 transition-colors shrink-0">
              <svg 
                viewBox="0 0 24 24" 
                className="w-5 h-5 text-emerald-200" 
                fill="currentColor"
                aria-hidden="true"
              >
                {/* Modern rounded cross motif */}
                <path d="M10 3a2 2 0 0 1 4 0v5h5a2 2 0 1 1 0 4h-5v5a2 2 0 1 1-4 0v-5H5a2 2 0 1 1 0-4h5V3z" />
              </svg>
            </div>
            
            {/* Typographic Identity */}
            <div className="flex flex-col">
              <span className="font-display text-xl sm:text-2xl font-bold tracking-tight text-slate-900 group-hover:text-emerald-900 transition-colors leading-none">
                Winnie's Clinic
              </span>
              <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-widest text-emerald-800 mt-1">
                Medical Centre · Lagos
              </span>
            </div>
          </button>

          {/* Center: The 4 Designated Navigation Links (Home, About Us, Services, Contact) */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10 text-sm font-medium text-slate-700">
            {navLinks.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative py-2 text-sm tracking-normal transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 rounded ${
                    isActive 
                      ? 'text-emerald-800 font-semibold' 
                      : 'text-slate-600 hover:text-emerald-800'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span 
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-700 rounded-full animate-in fade-in duration-200" 
                      aria-hidden="true" 
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right: Primary Action / Book Consultation Button */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <button
              onClick={handleOpenBookingAction}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-emerald-800 hover:bg-emerald-900 active:bg-emerald-950 rounded-lg shadow-xs transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-700 cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-emerald-200 shrink-0" strokeWidth={2} />
              <span>Book Consultation</span>
            </button>
          </div>

          {/* Mobile Right: Hamburger Toggle Button (No awkward button in middle!) */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2.5 text-slate-700 hover:text-emerald-800 hover:bg-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 transition-colors cursor-pointer"
              aria-label="Open Navigation Menu"
              aria-expanded={mobileMenuOpen}
            >
              <Menu className="w-6 h-6" strokeWidth={2} />
            </button>
          </div>
        </div>
      </header>

      {/* 3. Mobile Navigation Full Drawer / Modal Dropdown */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden animate-in fade-in duration-200">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Menu Panel */}
          <div className="fixed inset-y-0 right-0 w-full max-w-xs sm:max-w-sm bg-white shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-250">
            {/* Drawer Header */}
            <div>
              <div className="flex items-center justify-between p-5 border-b border-slate-200 bg-slate-50/50">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-800 text-white flex items-center justify-center shadow-xs">
                    <svg viewBox="0 0 24 24" className="w-4 h-4 text-emerald-200" fill="currentColor">
                      <path d="M10 3a2 2 0 0 1 4 0v5h5a2 2 0 1 1 0 4h-5v5a2 2 0 1 1-4 0v-5H5a2 2 0 1 1 0-4h5V3z" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-display font-bold text-base text-slate-900 block leading-tight">
                      Winnie's Clinic
                    </span>
                    <span className="text-[10px] uppercase tracking-wider text-emerald-800 font-semibold">
                      Medical Centre
                    </span>
                  </div>
                </div>

                {/* Close Button Inside Drawer */}
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-200/60 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 transition-colors cursor-pointer"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" strokeWidth={2} />
                </button>
              </div>

              {/* Navigation Links inside Mobile Drawer */}
              <nav className="p-5 space-y-1">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 px-3 pb-2">
                  Navigation
                </p>
                {navLinks.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`w-full text-left px-3 py-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-between cursor-pointer ${
                        isActive
                          ? 'bg-emerald-50 text-emerald-900 font-semibold border-l-4 border-emerald-700'
                          : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                      }`}
                    >
                      <span>{item.label}</span>
                      <ArrowRight className="w-4 h-4 text-slate-400" />
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Bottom Actions inside Mobile Drawer */}
            <div className="p-5 border-t border-slate-200 bg-slate-50/70 space-y-4">
              {/* Primary Book Consultation Action inside Dropdown */}
              <div>
                <button
                  onClick={handleOpenBookingAction}
                  className="w-full py-3 px-4 text-center text-sm font-semibold text-white bg-emerald-800 hover:bg-emerald-900 active:bg-emerald-950 rounded-xl shadow-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-emerald-200" />
                  <span>Book Consultation</span>
                </button>
              </div>

              {/* Secondary Health Checker Action if available */}
              {onOpenHealthChecker && (
                <button
                  onClick={handleOpenHealthCheckerAction}
                  className="w-full py-2.5 px-4 text-center text-xs font-medium text-emerald-900 bg-emerald-100/70 hover:bg-emerald-100 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <HeartPulse className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Check Symptoms & Vitals</span>
                </button>
              )}

              {/* Contact & Hours Quick Summary */}
              <div className="pt-2 text-xs space-y-1.5 text-slate-600">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                  <a href="tel:+23418909999" className="font-semibold text-slate-900 hover:text-emerald-800">
                    +234 1 890 9999 (24/7)
                  </a>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
                  <span className="text-[11px] text-slate-600 leading-snug">
                    Plot 14, Victoria Island, Lagos
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
