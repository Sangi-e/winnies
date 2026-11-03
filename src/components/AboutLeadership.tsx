import React from 'react';
import { Award, Users, Stethoscope, CheckCircle2 } from 'lucide-react';
import { CLINIC_IMAGES } from '../data/clinicData';

interface AboutLeadershipProps {
  onOpenBooking: () => void;
}

export const AboutLeadership: React.FC<AboutLeadershipProps> = ({ onOpenBooking }) => {
  return (
    <section id="about" className="scroll-mt-20 py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-800 mb-2">
            <span>Our Ethos & Team</span>
            <span aria-hidden="true">·</span>
            <span>Pan-African Healthcare Excellence</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 text-balance">
            Rooted in African Medical Leadership, Driven by Global Clinical Rigor
          </h2>
          <p className="mt-4 text-base text-slate-600 leading-relaxed">
            Winnie's Clinic was founded to provide African families with healthcare that honors their dignity, respects their time, and applies the most rigorous clinical methodologies available today.
          </p>
        </div>

        {/* Feature Editorial Group Photograph Showcase */}
        <div className="relative rounded-2xl overflow-hidden bg-slate-900 shadow-lg border border-slate-200 mb-12">
          <div className="aspect-[16/9] sm:aspect-[21/9] lg:aspect-[16/7] relative w-full overflow-hidden">
            <img
              src={CLINIC_IMAGES.teamSpecialists}
              alt="Multi-disciplinary African healthcare team of physicians, surgeons, nurses, and laboratory scientists at Winnie's Clinic medical center atrium"
              className="w-full h-full object-cover object-center"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
            {/* Scrim Overlay for Legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent pointer-events-none" />

            {/* Bottom Photo Caption & Institutional Context */}
            <div className="absolute bottom-0 inset-x-0 p-6 sm:p-8 text-white flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="max-w-2xl">
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                  Multidisciplinary Clinical Collaboration
                </span>
                <h3 className="font-display text-lg sm:text-2xl font-bold mt-1 text-white">
                  Physicians, Surgeons, and Specialist Nurses Working as One Team
                </h3>
                <p className="text-xs sm:text-sm text-slate-200 mt-2 line-clamp-2 sm:line-clamp-none">
                  Our morning interdisciplinary huddle brings together chief cardiologists, surgical specialists, matrons, and diagnostic scientists to evaluate complex patient cases collaboratively.
                </p>
              </div>

              <div className="shrink-0">
                <button
                  onClick={onOpenBooking}
                  className="px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-900 bg-white hover:bg-slate-100 rounded-lg shadow-sm transition-colors whitespace-nowrap"
                >
                  Schedule Appointment
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Asymmetric Core Clinical Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl p-6 sm:p-7 border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center mb-5">
                <Stethoscope className="w-5 h-5" />
              </div>
              <h4 className="font-display text-lg font-bold text-slate-900">
                01. Unhurried Consultations
              </h4>
              <p className="mt-2.5 text-sm text-slate-600 leading-relaxed">
                We reject 5-minute conveyor-belt appointments. Every Winnie's Clinic patient is allocated dedicated consultation time to address clinical history, familial predispositions, and lifestyle context.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-500 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Minimum 30-minute primary consultations</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 sm:p-7 border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center mb-5">
                <Award className="w-5 h-5" />
              </div>
              <h4 className="font-display text-lg font-bold text-slate-900">
                02. Certified Fellowships & Standards
              </h4>
              <p className="mt-2.5 text-sm text-slate-600 leading-relaxed">
                Our consultants hold fellowships with the West African College of Physicians (WACP), West African College of Surgeons (WACS), and international medical royal colleges.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-500 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Post-graduate certified specialists</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 sm:p-7 border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center mb-5">
                <Users className="w-5 h-5" />
              </div>
              <h4 className="font-display text-lg font-bold text-slate-900">
                03. Culturally Aware Family Medicine
              </h4>
              <p className="mt-2.5 text-sm text-slate-600 leading-relaxed">
                Our clinicians understand local dietary patterns, generational health concerns, and multi-lingual communication in English, Yoruba, Igbo, Hausa, Swahili, and French.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-500 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Multi-lingual African staff & translators</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
