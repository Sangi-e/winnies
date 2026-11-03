import React, { useState } from 'react';
import { BookOpen, ShieldCheck, ChevronRight, CheckCircle2, Phone, Mail, MapPin, Send } from 'lucide-react';
import { PATIENT_GUIDES, CLINIC_INFO, TESTIMONIALS } from '../data/clinicData';

interface PatientResourcesSectionProps {
  onOpenBooking: () => void;
}

export const PatientResourcesSection: React.FC<PatientResourcesSectionProps> = ({ onOpenBooking }) => {
  const [selectedGuideId, setSelectedGuideId] = useState<string>(PATIENT_GUIDES[0].id);
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryMsg, setInquiryMsg] = useState('');
  const [inquirySuccess, setInquirySuccess] = useState(false);

  const activeGuide = PATIENT_GUIDES.find(g => g.id === selectedGuideId) || PATIENT_GUIDES[0];

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inquiryName.trim() && inquiryEmail.trim()) {
      setInquirySuccess(true);
      setTimeout(() => {
        setInquirySuccess(false);
        setInquiryName('');
        setInquiryEmail('');
        setInquiryMsg('');
      }, 5000);
    }
  };

  return (
    <section id="resources" className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-800 mb-2">
            <span>Patient Resources & Education</span>
            <span aria-hidden="true">·</span>
            <span>Preventive Wellness</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 text-balance">
            Empowering Families Through Clear Clinical Guidance
          </h2>
          <p className="mt-4 text-base text-slate-600 leading-relaxed">
            Good clinical outcomes begin with informed, confident patients. Browse our doctor-authored guides, pre-visit preparations, and transparent healthcare coverage information.
          </p>
        </div>

        {/* Patient Guides Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          {/* Guide Titles List */}
          <div className="lg:col-span-4 space-y-2.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-3">
              Doctor-Authored Guides
            </span>
            {PATIENT_GUIDES.map((guide) => {
              const isActive = guide.id === selectedGuideId;
              return (
                <button
                  key={guide.id}
                  onClick={() => setSelectedGuideId(guide.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-all text-xs sm:text-sm ${
                    isActive
                      ? 'bg-emerald-50 border-emerald-300 text-slate-900 shadow-xs'
                      : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
                    <span className="font-medium text-emerald-800">{guide.category}</span>
                    <span>{guide.readTime}</span>
                  </div>
                  <div className="font-display font-semibold text-slate-900">
                    {guide.title}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Guide Reader */}
          <div className="lg:col-span-8 bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200">
            <div className="flex items-center gap-2 text-xs text-emerald-800 font-semibold mb-2">
              <span>{activeGuide.category}</span>
              <span aria-hidden="true">·</span>
              <span>{activeGuide.readTime}</span>
            </div>

            <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900">
              {activeGuide.title}
            </h3>

            <p className="mt-3 text-sm text-slate-600 leading-relaxed">
              {activeGuide.summary}
            </p>

            <div className="mt-6 pt-5 border-t border-slate-200">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 block mb-3">
                Key Clinical Takeaways:
              </span>
              <ul className="space-y-3">
                {activeGuide.bulletPoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <span className="text-xs text-slate-500">
                Authored by Winnie's Clinic Clinical Advisory Board
              </span>
              <button
                onClick={onOpenBooking}
                className="px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-xs transition-colors whitespace-nowrap self-start sm:self-auto"
              >
                Discuss with a Specialist
              </button>
            </div>
          </div>
        </div>

        {/* Patient Testimonials Strip */}
        <div className="mb-16 pt-12 border-t border-slate-200">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800 block mb-1">
              Verified Patient Experiences
            </span>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900">
              Caring for Generations of African Families
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between"
              >
                <p className="text-xs sm:text-sm text-slate-600 italic leading-relaxed">
                  "{t.quote}"
                </p>

                <div className="mt-6 pt-4 border-t border-slate-100">
                  <div className="font-display font-bold text-sm text-slate-900">
                    {t.author}
                  </div>
                  <div className="text-xs text-slate-500">
                    {t.role} · {t.location}
                  </div>
                  <div className="text-[11px] font-medium text-emerald-700 mt-1">
                    Care Department: {t.department}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact & Clinic Location Details */}
        <div id="contact" className="bg-slate-900 text-white rounded-2xl p-8 sm:p-10 border border-slate-800">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-6 space-y-5">
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400 block">
                Visit & Contact Winnie's Clinic
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
                Victoria Island Medical Center
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed max-w-lg">
                Conveniently located in the heart of Victoria Island with dedicated patient parking, wheelchair accessible access ramps, and round-the-clock security.
              </p>

              <div className="space-y-3 pt-2 text-xs sm:text-sm text-slate-300">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{CLINIC_INFO.address}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>General Appointments: {CLINIC_INFO.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-red-400 shrink-0" />
                  <span className="text-red-300 font-semibold">{CLINIC_INFO.emergencyHotline}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{CLINIC_INFO.email}</span>
                </div>
              </div>
            </div>

            {/* Quick General Inquiry Form */}
            <div className="lg:col-span-6 bg-slate-800/80 p-6 sm:p-7 rounded-xl border border-slate-700">
              <h4 className="font-display text-base font-bold text-white mb-1">
                Direct Patient Relations Inquiry
              </h4>
              <p className="text-xs text-slate-400 mb-4">
                Have a question regarding insurance cover, laboratory tests, or specialist availability? Send us a message.
              </p>

              {inquirySuccess ? (
                <div className="p-4 bg-emerald-950/80 border border-emerald-500/50 rounded-lg text-emerald-200 text-xs sm:text-sm">
                  Thank you! Your message has been received by Winnie's Clinic outpatient relations desk. We will call or email you shortly.
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="space-y-3.5">
                  <div>
                    <input
                      type="text"
                      placeholder="Your Full Name"
                      value={inquiryName}
                      onChange={(e) => setInquiryName(e.target.value)}
                      required
                      className="w-full text-xs sm:text-sm bg-slate-900/90 border border-slate-700 rounded-lg px-3.5 py-2 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Email Address or Phone"
                      value={inquiryEmail}
                      onChange={(e) => setInquiryEmail(e.target.value)}
                      required
                      className="w-full text-xs sm:text-sm bg-slate-900/90 border border-slate-700 rounded-lg px-3.5 py-2 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <textarea
                      rows={3}
                      placeholder="How can our clinical team assist you?"
                      value={inquiryMsg}
                      onChange={(e) => setInquiryMsg(e.target.value)}
                      required
                      className="w-full text-xs sm:text-sm bg-slate-900/90 border border-slate-700 rounded-lg px-3.5 py-2 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Message to Patient Relations</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
