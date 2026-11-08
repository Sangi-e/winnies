import React, { useState, useEffect, useRef } from 'react';
import { 
  Phone, 
  Calendar, 
  Menu, 
  X, 
  MapPin, 
  ChevronDown, 
  HeartPulse, 
  Stethoscope, 
  Clock, 
  ArrowRight,
  Sparkles,
  Activity
} from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';

interface HeaderProps {
  onOpenBooking: () => void;
  onNavigateToBookingPage?: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenHealthChecker?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  onOpenBooking, 
  onNavigateToBookingPage,
  activeSection, 
  onNavigate,
  onOpenHealthChecker 
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bookingDropdownOpen, setBookingDropdownOpen] = useState(false);
  const [mobileBookingDropdownOpen, setMobileBookingDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Exactly the 4 pages specified by the user
  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'services', label: 'Services' },
    { id: 'contact', label: 'Contact' },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setBookingDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close menus on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        setBookingDropdownOpen(false);
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
    setBookingDropdownOpen(false);
  };

  const handleGoToBookingPage = () => {
    setBookingDropdownOpen(false);
    setMobileMenuOpen(false);
    if (onNavigateToBookingPage) {
      onNavigateToBookingPage();
    } else {
      onNavigate('booking');
    }
  };

  const handleOpenQuickModal = () => {
    setBookingDropdownOpen(false);
    setMobileMenuOpen(false);
    onOpenBooking();
  };

  const handleOpenHealthCheckerAction = () => {
    setBookingDropdownOpen(false);
    setMobileMenuOpen(false);
    if (onOpenHealthChecker) {
      onOpenHealthChecker();
    }
  };

  return (
    <>
      {/* 1. Refined Top Information Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1.5 sm:gap-4 text-center sm:text-left">
          {/* Clinic Location */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-3 text-slate-300">
            <span className="inline-flex items-center gap-1.5 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" strokeWidth={2} />
              <span>Holy Ghost Bomb Junction, Umuchima, Okigwe, Imo State</span>
            </span>
          </div>

          {/* Emergency & Acute Care Telephone */}
          <div className="flex items-center justify-center gap-3">
            <a 
              href="tel:+2348037392730" 
              className="group inline-flex items-center gap-1.5 text-slate-200 hover:text-white transition-colors font-medium whitespace-nowrap"
              title="24/7 Acute Care & Emergency Line"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <Phone className="w-3.5 h-3.5 text-emerald-400 group-hover:text-emerald-300 shrink-0" strokeWidth={2} />
              <span>Emergency:</span>
              <span className="font-semibold text-emerald-300">+234-8037-3927-30</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs transition-shadow">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-20 px-4 sm:px-6 lg:px-8">
          
          {/* Left: Brand Identity & Refined Custom Healthcare Logo */}
          <button 
            onClick={() => handleNavClick('home')}
            className="group flex items-center gap-3.5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 rounded-lg shrink-0 cursor-pointer"
            aria-label="Winnie's Clinic Homepage"
          >
            {/* Custom Medical Cross & Life Seal Logo */}
            <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-800 to-emerald-950 text-white flex items-center justify-center shadow-md ring-1 ring-emerald-900/10 group-hover:shadow-emerald-900/20 transition-all shrink-0">
              <svg 
                viewBox="0 0 24 24" 
                className="w-6 h-6 text-emerald-300" 
                fill="currentColor"
                aria-hidden="true"
              >
                {/* Modern clean medical cross */}
                <path d="M9.5 3a1.5 1.5 0 0 1 1.5-1.5h2a1.5 1.5 0 0 1 1.5 1.5v5.5H20a1.5 1.5 0 0 1 1.5 1.5v2a1.5 1.5 0 0 1-1.5 1.5h-5.5V19a1.5 1.5 0 0 1-1.5 1.5h-2A1.5 1.5 0 0 1 9.5 19v-5.5H4a1.5 1.5 0 0 1-1.5-1.5v-2A1.5 1.5 0 0 1 4 8.5h5.5V3z" />
              </svg>
              <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white" />
            </div>
            
            {/* Typographic Identity */}
            <div className="flex flex-col">
              <span className="font-display text-xl sm:text-2xl font-bold tracking-tight text-slate-900 group-hover:text-emerald-900 transition-colors leading-none">
                Winnie's Clinic
              </span>
              <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-widest text-emerald-800 mt-1">
                Specialist Medical Centre · Okigwe
              </span>
            </div>
          </button>

          {/* Center: The Exactly 4 Designated Navigation Links */}
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

          {/* Right: Book an Appointment Button */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <button
              onClick={handleGoToBookingPage}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-emerald-800 hover:bg-emerald-900 active:bg-emerald-950 rounded-xl transition-all shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-emerald-200 shrink-0" strokeWidth={2} />
              <span>Book an Appointment</span>
            </button>
          </div>

          {/* Mobile Right: Hamburger Toggle Button */}
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

      {/* 3. Mobile Navigation Full Drawer */}
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
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-800 to-emerald-950 text-white flex items-center justify-center shadow-xs">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 text-emerald-300" fill="currentColor">
                      <path d="M9.5 3a1.5 1.5 0 0 1 1.5-1.5h2a1.5 1.5 0 0 1 1.5 1.5v5.5H20a1.5 1.5 0 0 1 1.5 1.5v2a1.5 1.5 0 0 1-1.5 1.5h-5.5V19a1.5 1.5 0 0 1-1.5 1.5h-2A1.5 1.5 0 0 1 9.5 19v-5.5H4a1.5 1.5 0 0 1-1.5-1.5v-2A1.5 1.5 0 0 1 4 8.5h5.5V3z" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-display font-bold text-base text-slate-900 block leading-tight">
                      Winnie's Clinic
                    </span>
                    <span className="text-[10px] uppercase tracking-wider text-emerald-800 font-semibold">
                      Medical Centre · Okigwe
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
                  Navigation Pages
                </p>
                {navLinks.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`w-full flex items-center justify-between px-3 py-3 rounded-lg text-left text-base font-medium transition-colors cursor-pointer ${
                        isActive
                          ? 'bg-emerald-50 text-emerald-800 font-semibold border-l-4 border-emerald-700'
                          : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                      }`}
                    >
                      <span>{item.label}</span>
                      <ArrowRight className={`w-4 h-4 ${isActive ? 'text-emerald-700' : 'text-slate-400'}`} />
                    </button>
                  );
                })}

                {/* Mobile Book an Appointment Button */}
                <div className="pt-4 mt-2 border-t border-slate-200">
                  <button
                    onClick={handleGoToBookingPage}
                    className="w-full flex items-center justify-center gap-2.5 p-3.5 rounded-xl bg-emerald-800 text-white hover:bg-emerald-900 active:bg-emerald-950 transition-colors text-center font-semibold text-sm cursor-pointer shadow-sm"
                  >
                    <Calendar className="w-4 h-4 text-emerald-200 shrink-0" />
                    <span>Book an Appointment</span>
                  </button>
                </div>
              </nav>
            </div>

            {/* Drawer Footer with Emergency Line and Location */}
            <div className="p-5 border-t border-slate-200 bg-slate-50/70 space-y-3">
              <a 
                href="tel:+2348037392730" 
                className="flex items-center gap-3 p-3 bg-red-50 border border-red-200 rounded-xl text-red-900"
              >
                <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-700 shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-red-700 tracking-wider block">
                    24/7 Emergency Line
                  </span>
                  <span className="text-sm font-bold text-red-950 block">
                    +234-8037-3927-30
                  </span>
                </div>
              </a>

              <div className="text-xs text-slate-500 flex items-start gap-2 pt-1">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span>Holy Ghost Bomb Junction, Umuchima, Okigwe, Imo State</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
