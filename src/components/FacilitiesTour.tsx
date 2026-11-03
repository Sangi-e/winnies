import React, { useState } from 'react';
import { 
  Building2, 
  Maximize2, 
  Check, 
  Calendar,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { CLINIC_IMAGES } from '../data/clinicData';

interface FacilitiesTourProps {
  onOpenPhotoModal?: (imageSrc: string, title: string, caption: string) => void;
  onOpenBooking: () => void;
}

interface FacilitySpace {
  id: string;
  name: string;
  category: string;
  shortDesc: string;
  image: string;
  specs: string[];
}

export const FacilitiesTour: React.FC<FacilitiesTourProps> = ({
  onOpenPhotoModal,
  onOpenBooking,
}) => {
  const [selectedSpaceId, setSelectedSpaceId] = useState<string>('reception');

  const spaces: FacilitySpace[] = [
    {
      id: 'reception',
      name: "Reception & Outpatient Lounge",
      category: 'Patient Welcome & Registration',
      shortDesc: 'Bright, airy reception featuring natural oak finishes, comfortable seating, multilingual patient relations staff, and discreet check-in.',
      image: CLINIC_IMAGES.modernReception,
      specs: [
        'Dedicated Outpatient Seating',
        'Digital Queue & Records Terminal',
        'Wheelchair Accessible Corridors',
        'Complimentary Hydration & Tea Bar'
      ],
    },
    {
      id: 'consultation',
      name: 'Modern Consultation Suites',
      category: 'Clinical Examination & Diagnosis',
      shortDesc: 'Private, sound-insulated consultation chambers designed for unhurried conversations between physician and patient.',
      image: CLINIC_IMAGES.consultationCare,
      specs: [
        'Acoustically Insulated Walls',
        'Ergonomic Examination Couches',
        'Direct Natural Daylight',
        'Integrated Diagnostic Screening Units'
      ],
    },
    {
      id: 'theatre',
      name: 'Sterile Operating Theatres & Day Suites',
      category: 'Surgical & Sterile Care',
      shortDesc: 'Modern operating theatres equipped for day-case surgical procedures, general surgery, and laparoscopic interventions.',
      image: CLINIC_IMAGES.operatingTheatre,
      specs: [
        'HEPA Filtered Positive Airflow',
        'Advanced LED Surgical Lighting',
        'HD Laparoscopic Towers',
        'Dedicated Sterile Scrub Bays'
      ],
    },
    {
      id: 'atrium',
      name: 'Multidisciplinary Collaboration Atrium',
      category: 'Clinical Review & Coordination',
      shortDesc: 'The central clinical coordination hall where doctors, surgeons, nurses, and pharmacists confer to provide coordinated patient care.',
      image: CLINIC_IMAGES.teamSpecialists,
      specs: [
        'Interdisciplinary Conference Space',
        'Direct Access to Clinical Wings',
        'On-Site Clinical Support Stations',
        'Air-Conditioned Patient Amenities'
      ],
    },
  ];

  const activeSpace = spaces.find(s => s.id === selectedSpaceId) || spaces[0];

  return (
    <section 
      id="facilities" 
      className="py-20 lg:py-28 bg-white scroll-mt-20 overflow-hidden"
      aria-labelledby="facilities-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12 lg:mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs font-semibold uppercase tracking-wider">
            <Building2 className="w-3.5 h-3.5" />
            <span>Inside Winnie's Clinic</span>
          </div>

          <h2 
            id="facilities-heading"
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-[1.18]"
          >
            A Welcoming Environment for Your Healthcare Journey.
          </h2>

          <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            Every clinical zone at Winnie's Clinic has been designed for patient comfort, acoustic privacy, and spotless hygiene. Take a visual walk through our Victoria Island facility.
          </p>
        </div>

        {/* Premium Editorial Photo Gallery */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Featured Photo (8 cols on lg) */}
          <div className="lg:col-span-8 bg-slate-900 rounded-2xl overflow-hidden shadow-xl border border-slate-200 relative group">
            <div className="relative h-[340px] sm:h-[460px] lg:h-[520px] overflow-hidden">
              <img
                src={activeSpace.image}
                alt={activeSpace.name}
                className="w-full h-full object-cover object-center transition-all duration-700 ease-out group-hover:scale-102"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent pointer-events-none" />

              {/* Enlarge / Full Inspection Lightbox button */}
              {onOpenPhotoModal && (
                <button
                  onClick={() => onOpenPhotoModal(activeSpace.image, activeSpace.name, activeSpace.shortDesc)}
                  className="absolute top-4 right-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/50 hover:bg-black/75 text-white text-xs font-medium backdrop-blur-xs transition-colors cursor-pointer"
                  title="View full resolution image"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Enlarge Photo</span>
                </button>
              )}

              {/* Caption Overlay */}
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-300">
                  {activeSpace.category}
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-bold">
                  {activeSpace.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-200 max-w-xl leading-relaxed">
                  {activeSpace.shortDesc}
                </p>
              </div>
            </div>

            {/* Specifications Bar beneath image */}
            <div className="p-4 sm:p-5 bg-slate-900 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-slate-300">
              {activeSpace.specs.map((spec, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="truncate">{spec}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Supporting Thumbnails / Showcase Selector (4 cols on lg) */}
          <div className="lg:col-span-4 space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 px-2 pb-1">
              Explore Clinic Spaces
            </p>

            {spaces.map((space) => {
              const isSelected = space.id === selectedSpaceId;
              return (
                <button
                  key={space.id}
                  onClick={() => setSelectedSpaceId(space.id)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer flex items-center gap-3.5 ${
                    isSelected
                      ? 'bg-emerald-50/70 border-emerald-600 shadow-sm ring-1 ring-emerald-600/20'
                      : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                  }`}
                >
                  <img
                    src={space.image}
                    alt={space.name}
                    className="w-16 h-14 sm:w-20 sm:h-16 rounded-lg object-cover shrink-0 border border-slate-200"
                  />
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-800 block">
                      {space.category}
                    </span>
                    <h4 className="text-xs sm:text-sm font-semibold text-slate-900 truncate">
                      {space.name}
                    </h4>
                    <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                      {space.shortDesc}
                    </p>
                  </div>
                  <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${
                    isSelected ? 'text-emerald-700 translate-x-0.5' : 'text-slate-300'
                  }`} />
                </button>
              );
            })}

            {/* Quick in-clinic booking card */}
            <div className="pt-4">
              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-emerald-800 font-semibold text-xs">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  <span>Visiting Our Clinic</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our facility welcomes outpatients and planned consultations in Victoria Island. Schedule ahead for priority consultation slots.
                </p>
                <button
                  onClick={onOpenBooking}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 transition-colors cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5 text-emerald-200" />
                  <span>Book In-Person Visit</span>
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
