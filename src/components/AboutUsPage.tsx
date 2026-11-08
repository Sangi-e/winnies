import React, { useState, useEffect, useCallback } from 'react';
import { 
  Heart, 
  Shield, 
  Users, 
  Sparkles, 
  Clock, 
  MapPin, 
  Calendar, 
  ArrowRight, 
  Info, 
  CheckCircle2, 
  Building,
  Camera,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  X,
  Eye,
  ZoomIn
} from 'lucide-react';
import { CLINIC_IMAGES, CLINIC_INFO } from '../data/clinicData';

// Original clinic photographic records from project root
import win01Img from '../assets/gallery/WIN01.jpeg';
import win02Img from '../assets/gallery/WIN02.jpeg';
import win03Img from '../assets/gallery/WIN03.jpeg';
import win04Img from '../assets/gallery/WIN04.jpeg';
import win05Img from '../assets/gallery/WIN05.jpeg';

export interface GalleryMoment {
  id: string;
  fileLabel: string;
  src: string;
  fallbackSrc: string;
  tag: string;
  title: string;
  caption: string;
  aspectClass: string;
}

const GALLERY_MOMENTS: GalleryMoment[] = [
  {
    id: 'win-01',
    fileLabel: 'WIN01.jpeg',
    src: win01Img,
    fallbackSrc: '/WIN01.jpeg',
    tag: 'Staff & Patient Administration',
    title: 'Mrs Euphemia Kelechi',
    caption: 'Mrs Euphemia Kelechi, HMO Desk Officer at Winnie’s Clinic.',
    aspectClass: 'aspect-[4/5]',
  },
  {
    id: 'win-02',
    fileLabel: 'WIN02.jpeg',
    src: win02Img,
    fallbackSrc: '/WIN02.jpeg',
    tag: 'Health Leadership & Policy',
    title: 'Visit to Health Commissioner',
    caption: 'A visit to the Honourable Commissioner for Health in Umuahia, Abia State.',
    aspectClass: 'aspect-[4/5]',
  },
  {
    id: 'win-03',
    fileLabel: 'WIN03.jpeg',
    src: win03Img,
    fallbackSrc: '/WIN03.jpeg',
    tag: 'Clinical Governance & Auditing',
    title: 'Clinic Staff CQI Meeting',
    caption: 'A clinic staff meeting focused on folder auditing and Continuous Quality Improvement (CQI).',
    aspectClass: 'aspect-[16/10] sm:aspect-[16/9] lg:aspect-[16/10]',
  },
  {
    id: 'win-04',
    fileLabel: 'WIN04.jpeg',
    src: win04Img,
    fallbackSrc: '/WIN04.jpeg',
    tag: 'Public Relations & Advocacy',
    title: 'Winnie Omende',
    caption: 'Winnie Omende, Hospital Public Relations Officer and Social Media Mobilizer.',
    aspectClass: 'aspect-[4/5]',
  },
  {
    id: 'win-05',
    fileLabel: 'WIN05.jpeg',
    src: win05Img,
    fallbackSrc: '/WIN05.jpeg',
    tag: 'Medical Leadership & Assembly',
    title: 'Chief Medical Director (CMD)',
    caption: 'The Chief Medical Director (CMD) during the 2026 Physicians’ Week.',
    aspectClass: 'aspect-[3/4] lg:aspect-[4/5]',
  },
];

interface AboutUsPageProps {
  onOpenBooking: () => void;
  onExploreServices: () => void;
  onNavigateHome: () => void;
  onOpenPhotoModal: (imageSrc: string, title: string, caption: string) => void;
}

export const AboutUsPage: React.FC<AboutUsPageProps> = ({
  onOpenBooking,
  onExploreServices,
  onNavigateHome,
  onOpenPhotoModal,
}) => {
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const handleOpenLightbox = (index: number) => {
    setActiveLightboxIndex(index);
  };

  const handleCloseLightbox = () => {
    setActiveLightboxIndex(null);
  };

  const handleNextPhoto = useCallback(() => {
    if (activeLightboxIndex === null) return;
    setActiveLightboxIndex((prev) => (prev !== null ? (prev + 1) % GALLERY_MOMENTS.length : null));
  }, [activeLightboxIndex]);

  const handlePrevPhoto = useCallback(() => {
    if (activeLightboxIndex === null) return;
    setActiveLightboxIndex((prev) => (prev !== null ? (prev - 1 + GALLERY_MOMENTS.length) % GALLERY_MOMENTS.length : null));
  }, [activeLightboxIndex]);

  useEffect(() => {
    if (activeLightboxIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleCloseLightbox();
      if (e.key === 'ArrowRight') handleNextPhoto();
      if (e.key === 'ArrowLeft') handlePrevPhoto();
    };
    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [activeLightboxIndex, handleNextPhoto, handlePrevPhoto]);
  return (
    <div className="bg-white text-slate-900 min-h-screen">
      
      {/* -------------------------------------------------------------
          1. ABOUT US HERO SECTION
          - Prominent healthcare photograph
          - Heading: "About Winnie’s Clinic"
          - Warm, professional, welcoming, and concise introduction
      -------------------------------------------------------------- */}
      <section className="relative bg-slate-900 text-white overflow-hidden" aria-labelledby="about-hero-heading">
        {/* Editorial Background Image with Measured Contrast Scrim */}
        <div className="absolute inset-0 z-0">
          <img
            src={CLINIC_IMAGES.heroSlide3Consultation}
            alt="Compassionate healthcare consultation at Winnie's Clinic"
            className="w-full h-full object-cover object-center brightness-60"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-slate-950/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-32">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs text-emerald-300 font-medium mb-6" aria-label="Breadcrumb">
            <button 
              onClick={onNavigateHome} 
              className="hover:text-white transition-colors cursor-pointer"
            >
              Home
            </button>
            <span aria-hidden="true" className="text-slate-500">/</span>
            <span className="text-slate-300" aria-current="page">About Us</span>
          </nav>

          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400" aria-hidden="true" />
              <span>Welcoming You to Thoughtful Healthcare</span>
            </div>

            <h1 
              id="about-hero-heading" 
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.12] text-balance"
            >
              About Winnie’s Clinic
            </h1>

            <p className="text-lg sm:text-xl text-slate-200 font-normal leading-relaxed max-w-2xl">
              Winnie’s Clinic is a healthcare institution committed to providing compassionate, patient-first medicine at Holy Ghost Bomb Junction, Umuchima, Okigwe, Imo State. We offer unhurried consultations, thorough clinical attention, and a welcoming sanctuary where your dignity and health come first.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Holy Ghost Bomb Junction, Umuchima, Okigwe, Imo State</span>
              </div>
              <span className="text-slate-600 hidden sm:inline" aria-hidden="true">·</span>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Comprehensive Outpatient & Emergency Triage</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          2. WHO WE ARE
          - Explaining identity and purpose
          - Uses only verified info from project
          - Leaves editable content placeholders where information is missing
      -------------------------------------------------------------- */}
      <section className="py-20 lg:py-28 bg-white border-b border-slate-200" aria-labelledby="who-we-are-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Narrative and verified identity (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-800">
                <Building className="w-3.5 h-3.5" />
                <span>Institutional Identity</span>
              </div>

              <h2 
                id="who-we-are-heading"
                className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 leading-tight text-balance"
              >
                A Dedicated Medical Sanctuary Built Around Patient Dignity
              </h2>

              <p className="text-base text-slate-700 leading-relaxed font-normal">
                Winnie’s Clinic operates as an outpatient and acute care medical facility located at Holy Ghost Bomb Junction, Umuchima, Okigwe, Imo State. The clinic was established with a clear mandate: to provide individuals and families with dependable, respectful, and transparent medical consultations in a supportive environment.
              </p>

              <p className="text-base text-slate-700 leading-relaxed font-normal">
                Rather than treating patients as case files or numbers in a queue, our clinical staff and support teams prioritize listening, understanding individual lifestyle contexts, and guiding patients through diagnostic evaluations with unhurried care.
              </p>

              {/* Verified Clinical Attributes */}
              <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-2 text-emerald-800 font-semibold text-sm mb-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>Location & Access</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Centrally situated at Holy Ghost Bomb Junction, Umuchima, Okigwe, providing accessible primary care, medical consultations, and emergency triage for local residents and families.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-2 text-emerald-800 font-semibold text-sm mb-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>Patient-Centred Focus</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Designed from the ground up for quiet privacy, hygiene, clear clinical communication, and minimal waiting times.
                  </p>
                </div>
              </div>

            </div>

            {/* Right Column: Key Operating Details */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-3">
                <div className="font-semibold text-slate-900 text-sm">Key Operating Details</div>
                <div className="flex items-center justify-between py-2 border-b border-slate-200">
                  <span>Outpatient Consultations:</span>
                  <span className="font-medium text-slate-900">Mon – Sat (7:30 AM – 8:00 PM)</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-slate-200">
                  <span>Acute Care Triage:</span>
                  <span className="font-medium text-emerald-700">24 Hours / 7 Days</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-slate-200">
                  <span>Emergency Line:</span>
                  <a href="tel:+2348037392730" className="font-bold text-slate-900 hover:text-emerald-800">
                    +234-8037-3927-30
                  </a>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span>Facility Location:</span>
                  <span className="font-medium text-slate-900 text-right">Holy Ghost Bomb Junction, Okigwe</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* -------------------------------------------------------------
          3. OUR APPROACH TO CARE
          - Thoughtful, patient-focused language
          - Does not claim unverified medical capabilities or certifications
          - Creative, non-repetitive layout
      -------------------------------------------------------------- */}
      <section className="py-20 lg:py-28 bg-slate-50/70 border-b border-slate-200" aria-labelledby="approach-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mb-14 space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-800">
              <Heart className="w-3.5 h-3.5" />
              <span>Clinical Philosophy</span>
            </div>

            <h2 
              id="approach-heading"
              className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 leading-tight text-balance"
            >
              Our Approach to Care
            </h2>

            <p className="text-base text-slate-600 leading-relaxed font-normal">
              Healthcare is deeply personal. We ground our daily practice in human empathy, thorough clinical evaluations, and attentive listening, ensuring that every patient feels respected and informed.
            </p>
          </div>

          {/* Asymmetric 4-Part Approach Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Approach Pillar 1 */}
            <div className="bg-white rounded-2xl p-7 border border-slate-200 shadow-xs flex flex-col justify-between">
              <div className="space-y-3">
                <div className="text-xs font-mono font-bold text-emerald-800 uppercase tracking-widest">
                  01 · Listening First
                </div>
                <h3 className="font-display text-xl font-bold text-slate-900">
                  Unhurried Patient Consultations
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  We believe accurate diagnosis begins with patience. Clinicians take the time to hear your concerns, family medical history, and daily lifestyle considerations before formulating any diagnostic or treatment plan.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Dedicated consultation time for every patient visit</span>
              </div>
            </div>

            {/* Approach Pillar 2 */}
            <div className="bg-white rounded-2xl p-7 border border-slate-200 shadow-xs flex flex-col justify-between">
              <div className="space-y-3">
                <div className="text-xs font-mono font-bold text-emerald-800 uppercase tracking-widest">
                  02 · Clarity & Respect
                </div>
                <h3 className="font-display text-xl font-bold text-slate-900">
                  Transparent Communication
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Medical terminology can be overwhelming. We explain observations, laboratory tests, and treatment pathways in straightforward language, empowering you to participate actively in decisions regarding your health.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Plain-language clinical summaries and guidance</span>
              </div>
            </div>

            {/* Approach Pillar 3 */}
            <div className="bg-white rounded-2xl p-7 border border-slate-200 shadow-xs flex flex-col justify-between">
              <div className="space-y-3">
                <div className="text-xs font-mono font-bold text-emerald-800 uppercase tracking-widest">
                  03 · Collaborative Focus
                </div>
                <h3 className="font-display text-xl font-bold text-slate-900">
                  Coordinated Care Delivery
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  When a health concern requires multiple perspectives, our consulting doctors, nurses, and laboratory personnel collaborate closely to review clinical progress and ensure seamless continuity of care.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Internal clinical reviews for complex health questions</span>
              </div>
            </div>

            {/* Approach Pillar 4 */}
            <div className="bg-white rounded-2xl p-7 border border-slate-200 shadow-xs flex flex-col justify-between">
              <div className="space-y-3">
                <div className="text-xs font-mono font-bold text-emerald-800 uppercase tracking-widest">
                  04 · Cultural Reverence
                </div>
                <h3 className="font-display text-xl font-bold text-slate-900">
                  Respect for Family & Community
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  We recognize the essential role that family, cultural traditions, and community values play in healing. Every interaction is guided by courtesy, empathy, and respect for individual identity.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Welcoming environment for patient companions and family</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* -------------------------------------------------------------
          4. OUR VALUES
          - Compassion, respect, professionalism, patient-centred care
          - Presented as guiding values, NOT certifications or achievements
      -------------------------------------------------------------- */}
      <section className="py-20 lg:py-28 bg-white border-b border-slate-200" aria-labelledby="values-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mb-14 space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-800">
              <Shield className="w-3.5 h-3.5" />
              <span>Ethical Foundation</span>
            </div>

            <h2 
              id="values-heading"
              className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 leading-tight text-balance"
            >
              Our Core Guiding Values
            </h2>

            <p className="text-base text-slate-600 leading-relaxed font-normal">
              These values represent our moral compass and daily commitment to every person who walks through our doors. They are the standards by which we measure our character, empathy, and service.
            </p>
          </div>

          {/* Elegant 4-Column Minimal Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            
            {/* Value 1: Compassion */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between hover:border-emerald-300 transition-colors">
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-100/70 text-emerald-800 flex items-center justify-center mb-4">
                  <Heart className="w-5 h-5" />
                </div>
                <h3 className="font-display text-lg font-bold text-slate-900 mb-2">
                  Compassion
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Approaching every patient with genuine kindness, attentive listening, and heartfelt emotional understanding during times of vulnerability.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-200/60 text-[11px] text-slate-500 font-medium">
                Guiding Principle · Empathy in Practice
              </div>
            </div>

            {/* Value 2: Respect */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between hover:border-emerald-300 transition-colors">
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-100/70 text-emerald-800 flex items-center justify-center mb-4">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="font-display text-lg font-bold text-slate-900 mb-2">
                  Respect
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Honoring each patient's dignity, personal background, privacy, and right to informed self-determination in all medical discussions.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-200/60 text-[11px] text-slate-500 font-medium">
                Guiding Principle · Dignity for All
              </div>
            </div>

            {/* Value 3: Professionalism */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between hover:border-emerald-300 transition-colors">
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-100/70 text-emerald-800 flex items-center justify-center mb-4">
                  <Shield className="w-5 h-5" />
                </div>
                <h3 className="font-display text-lg font-bold text-slate-900 mb-2">
                  Professionalism
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Upholding medical ethics, strict confidentiality, honesty in clinical advice, and diligent care across all administrative and medical duties.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-200/60 text-[11px] text-slate-500 font-medium">
                Guiding Principle · Ethical Rigor
              </div>
            </div>

            {/* Value 4: Patient-Centred Care */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between hover:border-emerald-300 transition-colors">
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-100/70 text-emerald-800 flex items-center justify-center mb-4">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="font-display text-lg font-bold text-slate-900 mb-2">
                  Patient-Centred Care
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Designing our consultation schedules, facility spaces, and follow-up support entirely around patient well-being and convenience.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-200/60 text-[11px] text-slate-500 font-medium">
                Guiding Principle · Focused on You
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* -------------------------------------------------------------
          5. MOMENTS AT WINNIE'S CLINIC (EDITORIAL GALLERY)
          - Titled: "Moments at Winnie’s Clinic"
          - Features authentic photographic archive: WIN01.jpeg to WIN05.jpeg
          - Verbatim captions 1 through 5
          - Varied proportions: landscape for clinical audit meeting, tall portraits for leadership & administration
          - Green-and-white healthcare brand identity
          - Full interactive lightbox with keyboard & thumbnail navigation
      -------------------------------------------------------------- */}
      <section 
        id="moments-gallery" 
        className="py-20 lg:py-28 bg-slate-50 border-b border-slate-200" 
        aria-labelledby="moments-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Heading */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 lg:mb-16">
            <div className="max-w-2xl space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-800">
                <Camera className="w-3.5 h-3.5" />
                <span>Photographic Archive</span>
              </div>

              <h2 
                id="moments-heading"
                className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-tight"
              >
                Moments at Winnie’s Clinic
              </h2>

              <p className="text-base text-slate-600 leading-relaxed font-normal">
                Authentic photographic records documenting clinical governance, leadership dialogues, continuous quality improvement, and dedicated patient care at our facility.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500 shrink-0">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
              <span>5 Verified Archive Photographs</span>
            </div>
          </div>

          {/* Editorial Asymmetric Grid */}
          <div className="space-y-8">
            
            {/* Top Row: Featured 2-Column Asymmetric Pair (Staff Meeting & CMD) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              
              {/* Feature 1: Staff Meeting (WIN03.jpeg) - Spans 7 cols */}
              <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all duration-300 flex flex-col overflow-hidden group">
                <div 
                  className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[16/10] overflow-hidden bg-slate-900 cursor-pointer"
                  onClick={() => handleOpenLightbox(2)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleOpenLightbox(2); }}}
                  aria-label="Enlarge photograph: Clinic staff meeting focused on folder auditing and Continuous Quality Improvement"
                >
                  <img
                    src={GALLERY_MOMENTS[2].src}
                    alt={GALLERY_MOMENTS[2].caption}
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (target.src !== GALLERY_MOMENTS[2].fallbackSrc) {
                        target.src = GALLERY_MOMENTS[2].fallbackSrc;
                      }
                    }}
                    className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/90 backdrop-blur-xs text-slate-900 text-xs font-semibold shadow-sm">
                      <Maximize2 className="w-3.5 h-3.5 text-emerald-700" />
                      <span>View in Full Lightbox</span>
                    </span>
                  </div>

                  {/* Corner Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-xs border border-white/20 text-white text-[11px] font-medium tracking-wide">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      {GALLERY_MOMENTS[2].tag}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span className="font-mono text-emerald-800 font-semibold">{GALLERY_MOMENTS[2].fileLabel}</span>
                      <span>Archive Record #3</span>
                    </div>
                    <p className="font-display text-base sm:text-lg font-semibold text-slate-900 leading-snug">
                      {GALLERY_MOMENTS[2].caption}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-slate-500">Continuous Quality Improvement (CQI)</span>
                    <button
                      onClick={() => handleOpenLightbox(2)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 hover:text-emerald-950 cursor-pointer group-hover:translate-x-0.5 transition-transform"
                    >
                      <span>Enlarge View</span>
                      <ZoomIn className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Feature 2: CMD during Physicians' Week (WIN05.jpeg) - Spans 5 cols */}
              <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all duration-300 flex flex-col overflow-hidden group">
                <div 
                  className="relative aspect-[3/4] sm:aspect-[4/3] lg:aspect-[4/5] overflow-hidden bg-slate-900 cursor-pointer"
                  onClick={() => handleOpenLightbox(4)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleOpenLightbox(4); }}}
                  aria-label="Enlarge photograph: The Chief Medical Director (CMD) during the 2026 Physicians’ Week"
                >
                  <img
                    src={GALLERY_MOMENTS[4].src}
                    alt={GALLERY_MOMENTS[4].caption}
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (target.src !== GALLERY_MOMENTS[4].fallbackSrc) {
                        target.src = GALLERY_MOMENTS[4].fallbackSrc;
                      }
                    }}
                    className="w-full h-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/90 backdrop-blur-xs text-slate-900 text-xs font-semibold shadow-sm">
                      <Maximize2 className="w-3.5 h-3.5 text-emerald-700" />
                      <span>View in Full Lightbox</span>
                    </span>
                  </div>

                  {/* Corner Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-xs border border-white/20 text-white text-[11px] font-medium tracking-wide">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      {GALLERY_MOMENTS[4].tag}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span className="font-mono text-emerald-800 font-semibold">{GALLERY_MOMENTS[4].fileLabel}</span>
                      <span>Archive Record #5</span>
                    </div>
                    <p className="font-display text-base sm:text-lg font-semibold text-slate-900 leading-snug">
                      {GALLERY_MOMENTS[4].caption}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-slate-500">Clinical Leadership</span>
                    <button
                      onClick={() => handleOpenLightbox(4)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 hover:text-emerald-950 cursor-pointer group-hover:translate-x-0.5 transition-transform"
                    >
                      <span>Enlarge View</span>
                      <ZoomIn className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

            </div>

            {/* Bottom Row: 3 Editorial Cards (Mrs Euphemia Kelechi, Health Commissioner, Winnie Omende) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Card 1: Mrs Euphemia Kelechi (WIN01.jpeg) */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all duration-300 flex flex-col overflow-hidden group">
                <div 
                  className="relative aspect-[4/5] overflow-hidden bg-slate-900 cursor-pointer"
                  onClick={() => handleOpenLightbox(0)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleOpenLightbox(0); }}}
                  aria-label="Enlarge photograph: Mrs Euphemia Kelechi, HMO Desk Officer at Winnie’s Clinic"
                >
                  <img
                    src={GALLERY_MOMENTS[0].src}
                    alt={GALLERY_MOMENTS[0].caption}
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (target.src !== GALLERY_MOMENTS[0].fallbackSrc) {
                        target.src = GALLERY_MOMENTS[0].fallbackSrc;
                      }
                    }}
                    className="w-full h-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/90 backdrop-blur-xs text-slate-900 text-xs font-semibold shadow-sm">
                      <Maximize2 className="w-3 h-3 text-emerald-700" />
                      <span>Enlarge</span>
                    </span>
                  </div>

                  <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-xs border border-white/20 text-white text-[10px] font-medium tracking-wide">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      {GALLERY_MOMENTS[0].tag}
                    </span>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span className="font-mono text-emerald-800 font-semibold">{GALLERY_MOMENTS[0].fileLabel}</span>
                      <span>Archive Record #1</span>
                    </div>
                    <p className="font-display text-sm sm:text-base font-semibold text-slate-900 leading-snug">
                      {GALLERY_MOMENTS[0].caption}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500">HMO Coordination</span>
                    <button
                      onClick={() => handleOpenLightbox(0)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-800 hover:text-emerald-950 cursor-pointer"
                    >
                      <span>View</span>
                      <ZoomIn className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Card 2: Commissioner for Health Visit (WIN02.jpeg) */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all duration-300 flex flex-col overflow-hidden group">
                <div 
                  className="relative aspect-[4/5] overflow-hidden bg-slate-900 cursor-pointer"
                  onClick={() => handleOpenLightbox(1)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleOpenLightbox(1); }}}
                  aria-label="Enlarge photograph: A visit to the Honourable Commissioner for Health in Umuahia, Abia State"
                >
                  <img
                    src={GALLERY_MOMENTS[1].src}
                    alt={GALLERY_MOMENTS[1].caption}
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (target.src !== GALLERY_MOMENTS[1].fallbackSrc) {
                        target.src = GALLERY_MOMENTS[1].fallbackSrc;
                      }
                    }}
                    className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/90 backdrop-blur-xs text-slate-900 text-xs font-semibold shadow-sm">
                      <Maximize2 className="w-3 h-3 text-emerald-700" />
                      <span>Enlarge</span>
                    </span>
                  </div>

                  <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-xs border border-white/20 text-white text-[10px] font-medium tracking-wide">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      {GALLERY_MOMENTS[1].tag}
                    </span>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span className="font-mono text-emerald-800 font-semibold">{GALLERY_MOMENTS[1].fileLabel}</span>
                      <span>Archive Record #2</span>
                    </div>
                    <p className="font-display text-sm sm:text-base font-semibold text-slate-900 leading-snug">
                      {GALLERY_MOMENTS[1].caption}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500">Government Relations</span>
                    <button
                      onClick={() => handleOpenLightbox(1)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-800 hover:text-emerald-950 cursor-pointer"
                    >
                      <span>View</span>
                      <ZoomIn className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Card 3: Winnie Omende (WIN04.jpeg) */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all duration-300 flex flex-col overflow-hidden group">
                <div 
                  className="relative aspect-[4/5] overflow-hidden bg-slate-900 cursor-pointer"
                  onClick={() => handleOpenLightbox(3)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleOpenLightbox(3); }}}
                  aria-label="Enlarge photograph: Winnie Omende, Hospital Public Relations Officer and Social Media Mobilizer"
                >
                  <img
                    src={GALLERY_MOMENTS[3].src}
                    alt={GALLERY_MOMENTS[3].caption}
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (target.src !== GALLERY_MOMENTS[3].fallbackSrc) {
                        target.src = GALLERY_MOMENTS[3].fallbackSrc;
                      }
                    }}
                    className="w-full h-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/90 backdrop-blur-xs text-slate-900 text-xs font-semibold shadow-sm">
                      <Maximize2 className="w-3 h-3 text-emerald-700" />
                      <span>Enlarge</span>
                    </span>
                  </div>

                  <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-xs border border-white/20 text-white text-[10px] font-medium tracking-wide">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      {GALLERY_MOMENTS[3].tag}
                    </span>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span className="font-mono text-emerald-800 font-semibold">{GALLERY_MOMENTS[3].fileLabel}</span>
                      <span>Archive Record #4</span>
                    </div>
                    <p className="font-display text-sm sm:text-base font-semibold text-slate-900 leading-snug">
                      {GALLERY_MOMENTS[3].caption}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500">Public Engagement</span>
                    <button
                      onClick={() => handleOpenLightbox(3)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-800 hover:text-emerald-950 cursor-pointer"
                    >
                      <span>View</span>
                      <ZoomIn className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* -------------------------------------------------------------
          MOMENTS LIGHTBOX MODAL (Full interactive gallery inspection)
      -------------------------------------------------------------- */}
      {activeLightboxIndex !== null && (
        <div 
          role="dialog"
          aria-modal="true"
          aria-labelledby="lightbox-caption"
          className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex flex-col justify-between p-3 sm:p-6"
        >
          {/* Lightbox Top Header */}
          <div className="flex items-center justify-between px-2 py-2 text-white">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-300 text-xs font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Moments at Winnie’s Clinic</span>
              </span>
              <span className="text-xs text-slate-400 font-medium">
                Photo {activeLightboxIndex + 1} of {GALLERY_MOMENTS.length}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="hidden sm:inline text-xs text-slate-400 mr-2">Use ← / → keys or Esc to close</span>
              <button
                onClick={handleCloseLightbox}
                className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-white hover:text-emerald-300 transition-colors cursor-pointer border border-slate-700"
                aria-label="Close photo preview"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Central Image & Navigation Viewport */}
          <div className="relative flex-1 flex items-center justify-center my-2 overflow-hidden px-4 sm:px-12">
            
            {/* Previous Button */}
            <button
              onClick={handlePrevPhoto}
              className="absolute left-2 sm:left-4 z-20 p-2 sm:p-3 rounded-full bg-slate-900/80 hover:bg-emerald-600 text-white border border-slate-700 hover:border-emerald-500 transition-all cursor-pointer backdrop-blur-xs"
              aria-label="Previous photograph"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Displayed Image */}
            <div className="relative max-h-[68vh] sm:max-h-[72vh] flex items-center justify-center">
              <img
                src={GALLERY_MOMENTS[activeLightboxIndex].src}
                alt={GALLERY_MOMENTS[activeLightboxIndex].caption}
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src !== GALLERY_MOMENTS[activeLightboxIndex].fallbackSrc) {
                    target.src = GALLERY_MOMENTS[activeLightboxIndex].fallbackSrc;
                  }
                }}
                className="max-h-[68vh] sm:max-h-[72vh] max-w-full w-auto object-contain rounded-xl shadow-2xl border border-slate-800"
              />
            </div>

            {/* Next Button */}
            <button
              onClick={handleNextPhoto}
              className="absolute right-2 sm:right-4 z-20 p-2 sm:p-3 rounded-full bg-slate-900/80 hover:bg-emerald-600 text-white border border-slate-700 hover:border-emerald-500 transition-all cursor-pointer backdrop-blur-xs"
              aria-label="Next photograph"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* Lightbox Bottom Caption Bar & Quick-Jump Strip */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 max-w-4xl mx-auto w-full backdrop-blur-md space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono font-bold text-emerald-400 uppercase tracking-wide">
                    {GALLERY_MOMENTS[activeLightboxIndex].fileLabel}
                  </span>
                  <span className="text-slate-500 text-xs">·</span>
                  <span className="text-xs text-slate-300 font-medium">
                    {GALLERY_MOMENTS[activeLightboxIndex].tag}
                  </span>
                </div>
                <p id="lightbox-caption" className="text-sm sm:text-base text-white font-medium leading-relaxed">
                  {GALLERY_MOMENTS[activeLightboxIndex].caption}
                </p>
              </div>

              <div className="shrink-0 flex items-center gap-2">
                <button
                  onClick={handleCloseLightbox}
                  className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-semibold transition-colors cursor-pointer"
                >
                  Close Viewer
                </button>
              </div>
            </div>

            {/* Thumbnail Jump Bar */}
            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-center gap-2 sm:gap-3 overflow-x-auto py-1">
              {GALLERY_MOMENTS.map((m, idx) => {
                const isCurrent = idx === activeLightboxIndex;
                return (
                  <button
                    key={m.id}
                    onClick={() => setActiveLightboxIndex(idx)}
                    className={`relative w-12 h-10 sm:w-16 sm:h-12 rounded-lg overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                      isCurrent 
                        ? 'border-emerald-400 ring-2 ring-emerald-500/40 scale-105' 
                        : 'border-slate-700 opacity-60 hover:opacity-100 hover:border-slate-500'
                    }`}
                    aria-label={`Jump to photo ${idx + 1}: ${m.fileLabel}`}
                  >
                    <img 
                      src={m.src} 
                      alt="" 
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (target.src !== m.fallbackSrc) target.src = m.fallbackSrc;
                      }}
                      className="w-full h-full object-cover" 
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------
          6. CLOSING CTA
          - Heading: "Your Health Deserves Thoughtful Care."
          - Buttons: "Explore Our Services" and "Book an Appointment"
      -------------------------------------------------------------- */}
      <section className="py-20 lg:py-24 bg-emerald-900 text-white relative overflow-hidden" aria-labelledby="about-cta-heading">
        {/* Subtle decorative background pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/80 border border-emerald-700/60 text-emerald-200 text-xs font-semibold uppercase tracking-wider">
            <span>Next Steps in Your Care</span>
          </div>

          <h2 
            id="about-cta-heading"
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight text-balance"
          >
            Your Health Deserves Thoughtful Care.
          </h2>

          <p className="text-base sm:text-lg text-emerald-100 max-w-2xl mx-auto font-normal leading-relaxed">
            Whether you are planning a routine check-up, need follow-up guidance on a current medical condition, or require an acute consultation, our clinic doors at Holy Ghost Bomb Junction, Umuchima, Okigwe are open.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            {/* Button 1: Explore Our Services */}
            <button
              onClick={onExploreServices}
              className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-emerald-950 bg-white hover:bg-emerald-50 rounded-xl shadow-md transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <span>Explore Our Services</span>
              <ArrowRight className="w-4 h-4 text-emerald-800" />
            </button>

            {/* Button 2: Book an Appointment */}
            <button
              onClick={onOpenBooking}
              className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-emerald-800 hover:bg-emerald-700 active:bg-emerald-950 rounded-xl shadow-md transition-all cursor-pointer border border-emerald-600/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            >
              <Calendar className="w-4 h-4 text-emerald-200" />
              <span>Book an Appointment</span>
            </button>
          </div>

          <div className="pt-6 text-xs text-emerald-300/80">
            Holy Ghost Bomb Junction, Umuchima, Okigwe, Imo State · Contact: {CLINIC_INFO.phone} · Emergency: {CLINIC_INFO.emergencyHotline}
          </div>
        </div>
      </section>

    </div>
  );
};
