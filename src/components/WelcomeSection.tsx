import React from 'react';
import { ArrowRight, ShieldCheck, HeartHandshake } from 'lucide-react';

interface WelcomeSectionProps {
  onDiscoverClinic: () => void;
  onOpenBooking: () => void;
}

export const WelcomeSection: React.FC<WelcomeSectionProps> = ({
  onDiscoverClinic,
  onOpenBooking,
}) => {
  return (
    <section 
      id="about" 
      className="py-20 lg:py-28 bg-white scroll-mt-20 overflow-hidden"
      aria-labelledby="welcome-heading"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
            
            {/* Subtle Green Accent Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs font-semibold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
              <span>Welcome to Winnie's Clinic</span>
            </div>

            {/* Suggested Headline */}
            <h2 
              id="welcome-heading"
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-[1.18]"
            >
              Your Health Deserves Thoughtful Care.
            </h2>

            {/* Concise Introduction */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              At Winnie's Clinic, we believe healthcare begins with listening. We are dedicated to providing patient-centred medicine where every consultation is unhurried, clinical evaluations are thorough, and every individual is treated with warmth and dignity.
            </p>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Situated at Holy Ghost Bomb Junction, Umuchima, Okigwe, Imo State, our medical facility combines modern clinical amenities with experienced African physicians and nursing professionals committed to the physical and emotional well-being of you and your family.
            </p>

            {/* Clinical Philosophy Pillars */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100">
                <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">Professional Rigor</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Clinical practice guided by medical ethics and thorough diagnostics.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100">
                <HeartHandshake className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">Compassionate Attention</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Every patient concern is received with kindness and genuine care.</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={onDiscoverClinic}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-emerald-800 hover:bg-emerald-900 active:bg-emerald-950 rounded-lg shadow-sm transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700"
              >
                <span>Discover Our Clinic</span>
                <ArrowRight className="w-4 h-4 text-emerald-200" />
              </button>

              <button
                onClick={onOpenBooking}
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-slate-700 hover:text-emerald-800 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer border border-slate-200"
              >
                <span>Book Consultation</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  };
