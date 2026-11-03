import React, { useState } from 'react';
import { 
  ArrowRight, 
  Stethoscope, 
  Activity, 
  Baby, 
  Heart, 
  FlaskConical, 
  Calendar,
  CheckCircle2
} from 'lucide-react';
import { CLINIC_IMAGES } from '../data/clinicData';

interface ServicesSectionProps {
  onSelectDepartmentForBooking: (deptId: string) => void;
  onOpenPhotoModal?: (imageSrc: string, title: string, caption: string) => void;
}

interface ServiceItem {
  id: string;
  name: string;
  shortDesc: string;
  leadSpecialist: string;
  keyCareAreas: string[];
  image: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectDepartmentForBooking,
  onOpenPhotoModal,
}) => {
  const [activeServiceId, setActiveServiceId] = useState<string>('internal-med');

  // Confirmed clinical services
  const services: ServiceItem[] = [
    {
      id: 'internal-med',
      name: 'Internal Medicine & Comprehensive Wellness',
      shortDesc: 'Routine adult outpatient consultations, chronic illness co-management (hypertension, diabetes), and detailed preventive health assessments.',
      leadSpecialist: 'Dr. Abraham Adu (Internal & Preventive Medicine)',
      keyCareAreas: [
        'Preventive Health Audits & Screenings',
        'Hypertension & Blood Pressure Care',
        'Diabetes Education & Monitoring',
        'Adult Acute Illness Consultations'
      ],
      image: CLINIC_IMAGES.consultationCare,
      icon: Stethoscope,
    },
    {
      id: 'surgery',
      name: 'Surgical Sciences & Consultations',
      shortDesc: 'Pre-operative evaluations, day-case minor procedures, and minimally invasive surgical consultations performed in modern sterile theatres.',
      leadSpecialist: 'Dr. Folashade Adeleke (Minimally Invasive Surgery)',
      keyCareAreas: [
        'General & Laparoscopic Consultations',
        'Day-Case Ambulatory Interventions',
        'Wound Care & Sterile Dressing Clinic',
        'Post-Operative Recovery Supervision'
      ],
      image: CLINIC_IMAGES.operatingTheatre,
      icon: Activity,
    },
    {
      id: 'obstetrics',
      name: "Obstetrics & Women's Health",
      shortDesc: 'Comprehensive antenatal supervision, routine gynecological screening, pre-conception guidance, and supportive maternal care.',
      leadSpecialist: "Dr. Chidimma Okoro (Obstetrics & Women's Health)",
      keyCareAreas: [
        'Dedicated Antenatal Clinic',
        'Well-Woman Annual Health Checks',
        'Fetal Sonography & Monitoring',
        'Postpartum Guidance & Nurturing'
      ],
      image: CLINIC_IMAGES.heroSlide2Nursing,
      icon: Heart,
    },
    {
      id: 'pediatrics',
      name: 'Pediatrics & Child Wellness',
      shortDesc: 'Compassionate pediatric consultations for infants and children, developmental milestone evaluations, and gentle childhood wellness care.',
      leadSpecialist: 'Dr. Kwame Mensah (Pediatrics & Child Wellness)',
      keyCareAreas: [
        'Well-Baby Milestones & Growth Checks',
        'Childhood Immunization Guidance',
        'Pediatric Respiratory & Allergy Care',
        'Family Health Orientation'
      ],
      image: CLINIC_IMAGES.teamSpecialists,
      icon: Baby,
    },
    {
      id: 'diagnostics',
      name: 'Clinical Diagnostics & Laboratory',
      shortDesc: 'Reliable on-site diagnostic assays, hematology, and clinical chemistry supporting rapid medical decision making.',
      leadSpecialist: 'Dr. Tendai Moyo (Pathology & Diagnostics)',
      keyCareAreas: [
        'Full Blood Count & Metabolic Panels',
        'Lipid, Liver & Kidney Profiles',
        'Routine Urinalysis & Microbiology',
        'Same-Day Confidential Reports'
      ],
      image: CLINIC_IMAGES.consultationCare,
      icon: FlaskConical,
    },
  ];

  const activeService = services.find(s => s.id === activeServiceId) || services[0];

  return (
    <section 
      id="services" 
      className="py-20 lg:py-28 bg-slate-50 border-t border-b border-slate-200/80 scroll-mt-20"
      aria-labelledby="services-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 lg:mb-16">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-800">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-700" />
              <span>Medical Services</span>
            </div>
            <h2 
              id="services-heading"
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-[1.18]"
            >
              Healthcare Designed Around Your Needs.
            </h2>
            <p className="text-base text-slate-600 font-normal">
              Each clinical service is delivered with unhurried attentiveness, modern diagnostic tools, and qualified medical practitioners.
            </p>
          </div>

          <button
            onClick={() => onSelectDepartmentForBooking(activeService.id)}
            className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-800 hover:text-emerald-950 transition-colors group self-start md:self-end"
          >
            <span>Book a Specialist Consultation</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Editorial Layout: Interactive Service Showcase (Avoids repetitive cards) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Service Selector Menu (5 cols on lg) */}
          <div className="lg:col-span-5 space-y-2.5">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 px-3 pb-1">
              Select Clinical Department
            </p>
            {services.map((service) => {
              const isSelected = service.id === activeServiceId;
              const IconComponent = service.icon;
              return (
                <button
                  key={service.id}
                  onClick={() => setActiveServiceId(service.id)}
                  className={`w-full text-left p-4 sm:p-5 rounded-xl transition-all cursor-pointer flex items-center justify-between border ${
                    isSelected
                      ? 'bg-white border-emerald-700 shadow-md ring-1 ring-emerald-700/20'
                      : 'bg-white/60 hover:bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                  aria-selected={isSelected}
                >
                  <div className="flex items-center gap-3.5 pr-2">
                    <div className={`p-2.5 rounded-lg shrink-0 transition-colors ${
                      isSelected 
                        ? 'bg-emerald-800 text-white' 
                        : 'bg-slate-100 text-slate-600'
                    }`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className={`text-sm sm:text-base font-semibold leading-snug ${
                        isSelected ? 'text-slate-900' : 'text-slate-800'
                      }`}>
                        {service.name}
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                        {service.leadSpecialist}
                      </p>
                    </div>
                  </div>

                  <ArrowRight className={`w-4 h-4 shrink-0 transition-transform ${
                    isSelected ? 'text-emerald-800 translate-x-1' : 'text-slate-300'
                  }`} />
                </button>
              );
            })}
          </div>

          {/* Right Column: Editorial Featured Service Panel (7 cols on lg) */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-lg transition-all duration-300">
            {/* Visual Image Banner with Subtle Caption */}
            <div className="relative h-64 sm:h-72 overflow-hidden bg-slate-900">
              <img
                src={activeService.image}
                alt={activeService.name}
                className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-103"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
              
              <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-white">
                <div>
                  <span className="text-[11px] uppercase tracking-wider font-semibold text-emerald-300">
                    Active Clinical Department
                  </span>
                  <h4 className="font-display text-lg sm:text-xl font-bold">
                    {activeService.name}
                  </h4>
                </div>

                {onOpenPhotoModal && (
                  <button
                    onClick={() => onOpenPhotoModal(activeService.image, activeService.name, activeService.shortDesc)}
                    className="text-xs text-slate-200 hover:text-white bg-black/40 hover:bg-black/60 px-3 py-1.5 rounded-md backdrop-blur-xs transition-colors cursor-pointer"
                  >
                    View Photo
                  </button>
                )}
              </div>
            </div>

            {/* Service Details & Care Areas */}
            <div className="p-6 sm:p-8 space-y-6">
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {activeService.shortDesc}
              </p>

              {/* Key Care Areas */}
              <div className="space-y-3">
                <h5 className="text-xs font-semibold uppercase tracking-wider text-slate-900">
                  Key Clinical Scope & Procedures
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeService.keyCareAreas.map((careArea, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                      <span>{careArea}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Strip */}
              <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                <div className="text-xs text-slate-500">
                  Directed by <span className="font-semibold text-slate-700">{activeService.leadSpecialist}</span>
                </div>

                <button
                  onClick={() => onSelectDepartmentForBooking(activeService.id)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-emerald-800 hover:bg-emerald-900 active:bg-emerald-950 rounded-lg shadow-sm transition-colors cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-emerald-200" />
                  <span>Schedule Consultation</span>
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
