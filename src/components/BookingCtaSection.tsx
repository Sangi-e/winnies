import React from 'react';
import { Calendar, Phone, MessageSquare, Clock, ShieldCheck, ArrowRight } from 'lucide-react';
import { CLINIC_IMAGES } from '../data/clinicData';

interface BookingCtaSectionProps {
  onOpenBooking: () => void;
  onContactClick: () => void;
}

export const BookingCtaSection: React.FC<BookingCtaSectionProps> = ({
  onOpenBooking,
  onContactClick,
}) => {
  return (
    <section 
      id="booking-cta"
      className="py-20 lg:py-24 bg-gradient-to-br from-emerald-900 via-emerald-950 to-slate-950 text-white relative overflow-hidden"
      aria-labelledby="booking-cta-heading"
    >
      {/* Decorative ambient elements */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-emerald-600/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-emerald-400/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: CTA Content & Actions (7 cols on lg) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-emerald-800/60 border border-emerald-700/60 text-emerald-200 text-xs font-semibold uppercase tracking-wider">
              <Calendar className="w-3.5 h-3.5" />
              <span>Outpatient Appointments & Inquiries</span>
            </div>

            {/* Suggested Headline */}
            <h2 
              id="booking-cta-heading"
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight"
            >
              Your Journey to Better Health Starts Here.
            </h2>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-emerald-100/90 leading-relaxed font-normal max-w-xl">
              Whether you need a consultation or wish to make an enquiry, take the next step towards receiving the care you need.
            </p>

            {/* Key Reassurance Points */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-emerald-200/90">
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Dedicated, unhurried appointment slots</span>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Experienced clinical specialists & staff</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenBooking}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 text-sm sm:text-base font-bold text-emerald-950 bg-emerald-400 hover:bg-emerald-300 active:bg-emerald-500 rounded-xl shadow-lg shadow-emerald-950/50 transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <Calendar className="w-5 h-5 text-emerald-950" strokeWidth={2.2} />
                <span>Book an Appointment</span>
              </button>

              <a
                href="tel:+23418909999"
                className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-semibold text-white bg-white/10 hover:bg-white/20 active:bg-white/5 border border-white/20 rounded-xl transition-colors cursor-pointer"
                title="Call Winnie's Clinic"
              >
                <Phone className="w-4 h-4 text-emerald-300" />
                <span>Call the Clinic</span>
              </a>

              <a
                href="https://wa.me/23418909999?text=Hello%20Winnie's%20Clinic,%20I%20would%20like%20to%20enquire%20about%20a%20consultation."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-3.5 text-sm font-semibold text-emerald-200 hover:text-white hover:underline transition-colors cursor-pointer"
                title="Message on WhatsApp"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp Enquiry</span>
              </a>
            </div>
          </div>

          {/* Right Column: High-Quality Photographic Composition (5 cols on lg) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-emerald-700/50 bg-slate-900">
              <img
                src={CLINIC_IMAGES.heroSlide3Consultation}
                alt="Doctor consulting with patient at Winnie's Clinic"
                className="w-full h-80 sm:h-96 object-cover object-center"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent pointer-events-none" />
              
              <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700/70 text-xs text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-emerald-300">Outpatient Consultation Hours</p>
                    <p className="text-slate-300 text-[11px] mt-0.5">Mon – Sat: 7:30 AM – 8:00 PM</p>
                  </div>
                  <span className="text-[11px] font-semibold px-2 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                    24/7 Triage
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
