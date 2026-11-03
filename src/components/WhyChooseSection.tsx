import React from 'react';
import { HeartPulse, Stethoscope, HandHeart, Clock, Phone, ArrowUpRight } from 'lucide-react';

export const WhyChooseSection: React.FC = () => {
  const commitments = [
    {
      id: 'patient-centred',
      title: 'Patient-Centred Care',
      description: 'Your health, comfort and well-being come first.',
      detail: 'Consultations structured to ensure adequate time for unhurried conversations and holistic evaluations.',
      icon: HeartPulse,
      highlight: false,
    },
    {
      id: 'professional-healthcare',
      title: 'Professional Healthcare',
      description: 'Care delivered with attention and purpose.',
      detail: 'Practitioners adhering to established clinical rigor, modern diagnostics, and transparent patient communication.',
      icon: Stethoscope,
      highlight: false,
    },
    {
      id: 'compassion-dignity',
      title: 'Compassion & Dignity',
      description: 'Every patient deserves kindness, respect and attention.',
      detail: 'A healthcare culture built on empathy, acoustic privacy, and genuine respect for every patient and family.',
      icon: HandHeart,
      highlight: false,
    },
    {
      id: 'emergency-triage',
      title: '24/7 Acute Emergency Triage',
      description: 'Always available for urgent medical attention.',
      detail: 'Immediate medical stabilization and round-the-clock urgent triage ready at our Victoria Island facility.',
      icon: Clock,
      highlight: true,
      action: {
        label: '+234 1 890 9999',
        href: 'tel:+23418909999',
      }
    },
  ];

  return (
    <section 
      id="why-choose"
      className="py-20 lg:py-24 bg-slate-900 text-white relative overflow-hidden"
      aria-labelledby="why-choose-heading"
    >
      {/* Subtle background ambient glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-900/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-slate-800/40 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14 lg:mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-800/60 text-emerald-300 text-xs font-semibold uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Why Choose Winnie's Clinic</span>
          </div>
          
          <h2 
            id="why-choose-heading"
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight"
          >
            Care That Puts You First.
          </h2>

          <p className="text-sm sm:text-base text-slate-300 font-normal">
            Our clinical practice is anchored in four enduring commitments to every patient who walks through our doors.
          </p>
        </div>

        {/* Four-Column Layout on Desktop & Responsive on Mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {commitments.map((item) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.id}
                className={`p-6 sm:p-7 rounded-2xl transition-all duration-300 flex flex-col justify-between border ${
                  item.highlight
                    ? 'bg-gradient-to-b from-emerald-950/80 to-slate-900/95 border-emerald-600/60 shadow-lg shadow-emerald-950/40 relative ring-1 ring-emerald-500/30'
                    : 'bg-slate-800/50 hover:bg-slate-800/80 border-slate-700/60 hover:border-slate-600'
                }`}
              >
                <div>
                  {/* Top Bar with Icon & Badge */}
                  <div className="flex items-center justify-between mb-5">
                    <div className={`p-3 rounded-xl ${
                      item.highlight 
                        ? 'bg-emerald-600 text-white shadow-sm' 
                        : 'bg-emerald-950 border border-emerald-800/40 text-emerald-400'
                    }`}>
                      <IconComponent className="w-5 h-5" strokeWidth={2} />
                    </div>

                    {item.highlight && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-semibold tracking-wide border border-emerald-400/30">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                        24/7 Available
                      </span>
                    )}
                  </div>

                  {/* Title & Core Description */}
                  <h3 className="font-display text-lg font-bold text-white tracking-tight leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-sm font-medium text-emerald-300 mt-2 leading-relaxed">
                    {item.description}
                  </p>

                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    {item.detail}
                  </p>
                </div>

                {/* Optional Action Shortcut for Emergency */}
                {item.action && (
                  <div className="mt-6 pt-4 border-t border-emerald-800/40">
                    <a
                      href={item.action.href}
                      className="inline-flex items-center justify-between w-full p-2.5 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors group"
                      title="Direct 24/7 Emergency Dial"
                    >
                      <span className="flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-emerald-200" />
                        <span>Emergency Line: {item.action.label}</span>
                      </span>
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
