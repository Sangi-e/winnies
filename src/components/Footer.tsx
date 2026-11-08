import React from 'react';
import { CLINIC_INFO } from '../data/clinicData';
import { Phone, Mail, MapPin, MessageSquare, ArrowRight } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenBooking }) => {
  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          
          {/* Brand Column (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-800 text-white flex items-center justify-center shadow-xs border border-emerald-700/50 shrink-0">
                <svg viewBox="0 0 24 24" className="w-4 h-4 text-emerald-200" fill="currentColor">
                  <path d="M10 3a2 2 0 0 1 4 0v5h5a2 2 0 1 1 0 4h-5v5a2 2 0 1 1-4 0v-5H5a2 2 0 1 1 0-4h5V3z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-display text-lg font-bold text-white tracking-tight leading-tight">
                  Winnie's Clinic
                </span>
                <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-semibold">
                  Medical Centre · Okigwe, Imo State
                </span>
              </div>
            </div>
            
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Providing patient-centred healthcare in Umuchima, Okigwe, Imo State. Guided by professional rigor, clinical empathy, and modern medical standards.
            </p>
          </div>

          {/* Quick Navigation Links */}
          <div>
            <h4 className="font-display font-semibold text-white uppercase tracking-wider text-[11px] mb-3">
              Navigation
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors text-left cursor-pointer"
                >
                  About Us (Winnie's Clinic)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Our Medical Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('why-choose')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Why Choose Winnie's
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('facilities')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Inside Our Clinic
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('health-insights')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Health Insights & Guides
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Contact & Location
                </button>
              </li>
            </ul>
          </div>

          {/* Medical Services */}
          <div>
            <h4 className="font-display font-semibold text-white uppercase tracking-wider text-[11px] mb-3">
              Medical Services
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Internal & Adult Medicine
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Surgical Consultations
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Obstetrics & Women's Health
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Pediatrics & Child Wellness
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Diagnostic Laboratory
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('booking')}
                  className="text-emerald-400 font-semibold hover:text-emerald-300 transition-colors inline-flex items-center gap-1 cursor-pointer pt-1"
                >
                  <span>Book an Appointment</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Information & Hours */}
          <div>
            <h4 className="font-display font-semibold text-white uppercase tracking-wider text-[11px] mb-3">
              Contact & Hours
            </h4>
            <div className="space-y-2.5 text-slate-400 text-xs">
              <div>
                <p className="text-white font-medium">Outpatient Clinic:</p>
                <p>Mon – Sat: 7:30 AM – 8:00 PM</p>
              </div>

              <div>
                <p className="text-emerald-400 font-medium">Acute Emergency & Triage:</p>
                <p className="text-white">Open 24 Hours / 7 Days</p>
              </div>

              <div className="pt-1 space-y-1">
                <a
                  href="tel:+2348037392730"
                  className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-semibold transition-colors block"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>+234-8037-3927-30 (24/7)</span>
                </a>

                <a
                  href="tel:+2348037392730"
                  className="inline-flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors block"
                >
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span>+234-8037-3927-30 (General)</span>
                </a>

                <a
                  href="mailto:info@winniesclinic.com"
                  className="inline-flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors block"
                >
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span>info@winniesclinic.com</span>
                </a>

                <a
                  href="https://wa.me/2348037392730?text=Hello%20Winnie's%20Clinic,%20I%20would%20like%20to%20enquire%20about%20a%20consultation."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors block"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp Chat</span>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Quiet Bottom Strip */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} Winnie's Clinic Ltd. All rights reserved.
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-slate-400 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-emerald-500" />
              <span>Holy Ghost Bomb Junction, Umuchima, Okigwe, Imo State</span>
            </span>
            <span className="text-slate-700">|</span>
            <span className="text-slate-400 hover:text-white transition-colors cursor-pointer">
              Privacy Policy
            </span>
            <span className="text-slate-700">|</span>
            <span className="text-slate-400 hover:text-white transition-colors cursor-pointer">
              Terms & Conditions
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
