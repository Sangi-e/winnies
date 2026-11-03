import React, { useState } from 'react';
import { Calendar, Languages, Award, Clock, ArrowRight, Stethoscope } from 'lucide-react';
import { DOCTORS, Doctor } from '../data/clinicData';
import { formatCurrency } from '../utils/clinicLogic';

interface TeamSectionProps {
  onSelectDoctorForBooking: (doctor: Doctor) => void;
  onOpenPhotoModal: (imgSrc: string, title: string, caption: string) => void;
}

export const TeamSection: React.FC<TeamSectionProps> = ({
  onSelectDoctorForBooking,
  onOpenPhotoModal,
}) => {
  const [filterDepartment, setFilterDepartment] = useState<string>('all');

  const filterOptions = [
    { id: 'all', label: 'All Specialists' },
    { id: 'cardiology', label: 'Cardiology' },
    { id: 'internal-med', label: 'Internal Medicine' },
    { id: 'surgery', label: 'Surgical Sciences' },
    { id: 'pediatrics', label: 'Pediatrics' },
    { id: 'obstetrics', label: "Women's Health" },
    { id: 'diagnostics', label: 'Pathology & Lab' },
  ];

  const filteredDoctors = filterDepartment === 'all'
    ? DOCTORS
    : DOCTORS.filter((d) => d.departmentId === filterDepartment);

  return (
    <section id="team" className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-800 mb-2">
              <span>Our Medical Specialists</span>
              <span aria-hidden="true">·</span>
              <span>Distinguished African Faculty</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 text-balance">
              Board-Certified Clinicians Dedicated to Patient Dignity
            </h2>
            <p className="mt-3 text-base text-slate-600">
              Meet our team of male and female African physicians, surgeons, pediatricians, and clinical scientists committed to empathetic communication and evidence-based healing.
            </p>
          </div>

          {/* Interactive Specialty Filter Buttons */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-white rounded-xl border border-slate-200 shadow-xs">
            {filterOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setFilterDepartment(opt.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                  filterDepartment === opt.id
                    ? 'bg-emerald-700 text-white shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Doctor Profiles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDoctors.map((doc: Doctor) => (
            <div
              key={doc.id}
              className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col group"
            >
              {/* Doctor Editorial Portrait Frame */}
              <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                <img
                  src={doc.image}
                  alt={`Portrait of ${doc.name}, ${doc.role} at Winnie's Clinic`}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

                {/* Unboxed Metadata Badge */}
                <div className="absolute top-3 left-3">
                  <span className="text-[11px] font-semibold text-white bg-slate-900/80 backdrop-blur-xs px-2.5 py-1 rounded-md">
                    {doc.departmentName}
                  </span>
                </div>

                <div className="absolute bottom-3 inset-x-4 text-white">
                  <span className="text-[11px] text-emerald-300 font-medium">
                    {doc.experienceYears} Years Clinical Experience
                  </span>
                  <div className="font-display text-lg font-bold text-white">
                    {doc.name}
                  </div>
                  <div className="text-xs text-slate-300">
                    {doc.title}
                  </div>
                </div>
              </div>

              {/* Bio & Clinical Credentials */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-semibold text-emerald-800">
                    {doc.role}
                  </div>

                  <p className="mt-2.5 text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {doc.bio}
                  </p>

                  {/* Qualifications & Languages */}
                  <div className="mt-4 pt-3 border-t border-slate-100 space-y-2">
                    <div className="flex items-start gap-1.5 text-xs text-slate-700">
                      <Award className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="line-clamp-2">{doc.qualifications}</span>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <Languages className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>Speaks: {doc.languages.join(', ')}</span>
                    </div>
                  </div>

                  {/* Doctor Featured Quote */}
                  <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs italic text-slate-600">
                    "{doc.featuredQuote}"
                  </div>
                </div>

                {/* Consultation Fee & Booking CTA */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="block text-[10px] uppercase tracking-wider text-slate-400 font-medium">Fee</span>
                    <span className="font-display text-base font-bold text-slate-900 tabular-nums">
                      {formatCurrency(doc.consultationFee, 'USD')}
                    </span>
                  </div>

                  <button
                    onClick={() => onSelectDoctorForBooking(doc)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-xs transition-colors"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Book with {doc.name.split(' ')[1]}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
