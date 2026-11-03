import React, { useState } from 'react';
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
  Maximize2, 
  Edit3, 
  Check, 
  X,
  Building,
  HelpCircle
} from 'lucide-react';
import { CLINIC_IMAGES, CLINIC_INFO } from '../data/clinicData';

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
  // Placeholder management state allowing clinic administrators to edit and preview missing unverified details
  const [isEditingPlaceholders, setIsEditingPlaceholders] = useState<boolean>(false);
  const [foundingDetails, setFoundingDetails] = useState<string>(
    'Winnie\'s Clinic was established to address community health needs in Umuchima, Okigwe with patient-centred medical care.'
  );
  const [facilitySize, setFacilitySize] = useState<string>(
    'Outpatient consultation chambers, procedure rooms, and a dedicated patient reception lounge.'
  );
  const [leadershipNote, setLeadershipNote] = useState<string>(
    'Clinical directorship and senior medical governance information will be published here upon official administrative verification.'
  );

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

              {/* Editable Information Notice & Placeholder Accordion */}
              <div className="mt-8 p-5 rounded-xl bg-emerald-50/60 border border-emerald-200 text-xs">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-2.5">
                    <Info className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-emerald-950 block text-sm">
                        Verified Information Notice
                      </span>
                      <p className="text-emerald-900/80 mt-1 leading-relaxed">
                        In accordance with our strict data transparency standards, we do not publish unverified historical dates, ownership claims, or unverifiable statistics. Unfilled institutional records are clearly marked below as editable placeholders.
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsEditingPlaceholders(!isEditingPlaceholders)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-800 text-white font-medium hover:bg-emerald-900 transition-colors shrink-0 cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>{isEditingPlaceholders ? 'Done Editing' : 'Customize Placeholders'}</span>
                  </button>
                </div>

                {/* Editable Placeholders Content Area */}
                <div className="mt-5 space-y-4 pt-4 border-t border-emerald-200/80">
                  
                  {/* Placeholder 1: Founding Date & Background */}
                  <div>
                    <div className="flex items-center justify-between text-slate-700 font-semibold mb-1">
                      <span className="flex items-center gap-1.5">
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 uppercase tracking-wider font-mono">
                          Placeholder
                        </span>
                        <span>Founding & Historical Background</span>
                      </span>
                    </div>
                    {isEditingPlaceholders ? (
                      <textarea
                        value={foundingDetails}
                        onChange={(e) => setFoundingDetails(e.target.value)}
                        rows={2}
                        className="w-full text-xs p-2.5 bg-white border border-emerald-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                      />
                    ) : (
                      <div className="p-3 bg-white/80 rounded-lg border border-dashed border-emerald-300 text-slate-600 italic">
                        {foundingDetails}
                        <span className="block not-italic text-[11px] text-slate-400 mt-1">
                          [Clinic administration may update founding year and historical milestones as verified records are issued]
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Placeholder 2: Governance & Clinical Leadership */}
                  <div>
                    <div className="flex items-center justify-between text-slate-700 font-semibold mb-1">
                      <span className="flex items-center gap-1.5">
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 uppercase tracking-wider font-mono">
                          Placeholder
                        </span>
                        <span>Governance & Clinical Directorship</span>
                      </span>
                    </div>
                    {isEditingPlaceholders ? (
                      <textarea
                        value={leadershipNote}
                        onChange={(e) => setLeadershipNote(e.target.value)}
                        rows={2}
                        className="w-full text-xs p-2.5 bg-white border border-emerald-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                      />
                    ) : (
                      <div className="p-3 bg-white/80 rounded-lg border border-dashed border-emerald-300 text-slate-600 italic">
                        {leadershipNote}
                        <span className="block not-italic text-[11px] text-slate-400 mt-1">
                          [Official leadership profiles will be presented once formally ratified by the clinical board]
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Placeholder 3: Physical Facility Capacity */}
                  <div>
                    <div className="flex items-center justify-between text-slate-700 font-semibold mb-1">
                      <span className="flex items-center gap-1.5">
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 uppercase tracking-wider font-mono">
                          Placeholder
                        </span>
                        <span>Facility Scope & Physical Capacity</span>
                      </span>
                    </div>
                    {isEditingPlaceholders ? (
                      <textarea
                        value={facilitySize}
                        onChange={(e) => setFacilitySize(e.target.value)}
                        rows={2}
                        className="w-full text-xs p-2.5 bg-white border border-emerald-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                      />
                    ) : (
                      <div className="p-3 bg-white/80 rounded-lg border border-dashed border-emerald-300 text-slate-600 italic">
                        {facilitySize}
                        <span className="block not-italic text-[11px] text-slate-400 mt-1">
                          [Detailed architectural blueprints and bed capacity figures to be entered upon facility audits]
                        </span>
                      </div>
                    )}
                  </div>

                </div>
              </div>

            </div>

            {/* Right Column: Visual Feature (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-slate-100 relative">
                <img
                  src={CLINIC_IMAGES.modernReception}
                  alt="Modern patient lounge and reception area at Winnie's Clinic, Umuchima, Okigwe"
                  className="w-full h-[380px] sm:h-[440px] object-cover"
                  referrerPolicy="no-referrer"
                />
                
                {/* Photo Caption Badge distinguishing genuine facility */}
                <div className="p-4 bg-white border-t border-slate-200">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-800">
                      Actual Winnie's Clinic Space
                    </span>
                    <button
                      onClick={() => onOpenPhotoModal(
                        CLINIC_IMAGES.modernReception,
                        "Winnie's Clinic Reception Lounge",
                        "Actual clinic facility photograph: Outpatient lounge and reception at Holy Ghost Bomb Junction, Umuchima, Okigwe, Imo State."
                      )}
                      className="text-slate-400 hover:text-slate-700 transition-colors p-1"
                      title="Inspect full-resolution photo"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 mt-1">
                    Reception & Patient Outpatient Lounge
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Holy Ghost Bomb Junction, Umuchima, Okigwe, Imo State · Designed for acoustic privacy and welcoming care.
                  </p>
                </div>
              </div>

              {/* Quick Summary Card */}
              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-2">
                <div className="font-semibold text-slate-900 text-sm">Key Operating Details</div>
                <div className="flex items-center justify-between py-1 border-b border-slate-200">
                  <span>Outpatient Consultations:</span>
                  <span className="font-medium text-slate-900">Mon – Sat (7:30 AM – 8:00 PM)</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-slate-200">
                  <span>Acute Care Triage:</span>
                  <span className="font-medium text-emerald-700">24 Hours / 7 Days</span>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span>Emergency Line:</span>
                  <a href="tel:+2348037392730" className="font-bold text-slate-900 hover:text-emerald-800">
                    +234-8037-3927-30
                  </a>
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
          5. OUR ENVIRONMENT
          - Visual section introducing clinic environment
          - Actual Winnie's Clinic photos used where available
          - Clearly distinguishes illustrative stock photography from actual clinic facilities
      -------------------------------------------------------------- */}
      <section className="py-20 lg:py-28 bg-slate-50/70 border-b border-slate-200" aria-labelledby="environment-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mb-14 space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-800">
              <Building className="w-3.5 h-3.5" />
              <span>Physical Sanctuary</span>
            </div>

            <h2 
              id="environment-heading"
              className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 leading-tight text-balance"
            >
              Our Environment
            </h2>

            <p className="text-base text-slate-600 leading-relaxed font-normal">
              A serene clinical atmosphere plays an important role in healing. We maintain clean, quiet, and well-lit spaces that reduce healthcare anxiety and provide a peaceful setting for consultations.
            </p>
          </div>

          {/* Section 5A: Actual Winnie's Clinic Facilities Showcase */}
          <div className="mb-14">
            <div className="flex items-center justify-between pb-3 mb-6 border-b border-slate-200">
              <div>
                <h3 className="font-display text-xl font-bold text-slate-900">
                  Actual Winnie's Clinic Facility Spaces
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Verified photographs of our premises located at Holy Ghost Bomb Junction, Umuchima, Okigwe, Imo State.
                </p>
              </div>
              <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-100/80 px-2.5 py-1 rounded-md">
                Verified Facilities
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Space 1: Modern Reception */}
              <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs flex flex-col justify-between group">
                <div className="relative h-56 overflow-hidden bg-slate-100">
                  <img
                    src={CLINIC_IMAGES.modernReception}
                    alt="Actual Winnie's Clinic Reception and Outpatient Lounge in Umuchima, Okigwe"
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded">
                    Actual Clinic Space
                  </div>
                  <button
                    onClick={() => onOpenPhotoModal(
                      CLINIC_IMAGES.modernReception,
                      "Reception & Outpatient Lounge",
                      "Actual Winnie's Clinic facility photograph: Okigwe outpatient reception lounge."
                    )}
                    className="absolute top-3 right-3 p-1.5 rounded-lg bg-black/60 text-white hover:bg-black/80 transition-colors"
                    title="Enlarge photograph"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="p-5">
                  <h4 className="font-display text-base font-bold text-slate-900">
                    Reception & Outpatient Lounge
                  </h4>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                    Airy reception area with dedicated seating, digital check-in terminal, and supportive patient relations desk.
                  </p>
                </div>
              </div>

              {/* Space 2: Consultation Suite */}
              <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs flex flex-col justify-between group">
                <div className="relative h-56 overflow-hidden bg-slate-100">
                  <img
                    src={CLINIC_IMAGES.consultationCare}
                    alt="Actual Winnie's Clinic Consultation Chamber"
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded">
                    Actual Clinic Space
                  </div>
                  <button
                    onClick={() => onOpenPhotoModal(
                      CLINIC_IMAGES.consultationCare,
                      "Private Consultation Suite",
                      "Actual Winnie's Clinic facility photograph: Sound-insulated doctor's examination room."
                    )}
                    className="absolute top-3 right-3 p-1.5 rounded-lg bg-black/60 text-white hover:bg-black/80 transition-colors"
                    title="Enlarge photograph"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="p-5">
                  <h4 className="font-display text-base font-bold text-slate-900">
                    Private Consultation Chambers
                  </h4>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                    Acoustically insulated suites designed for confidential, quiet dialogue between patient and physician.
                  </p>
                </div>
              </div>

              {/* Space 3: Sterile Operating Suite */}
              <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs flex flex-col justify-between group">
                <div className="relative h-56 overflow-hidden bg-slate-100">
                  <img
                    src={CLINIC_IMAGES.operatingTheatre}
                    alt="Actual Winnie's Clinic Operating Theatre and Day Procedure Suite"
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded">
                    Actual Clinic Space
                  </div>
                  <button
                    onClick={() => onOpenPhotoModal(
                      CLINIC_IMAGES.operatingTheatre,
                      "Sterile Procedure Suite",
                      "Actual Winnie's Clinic facility photograph: Equipped procedure suite for minor and elective care."
                    )}
                    className="absolute top-3 right-3 p-1.5 rounded-lg bg-black/60 text-white hover:bg-black/80 transition-colors"
                    title="Enlarge photograph"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="p-5">
                  <h4 className="font-display text-base font-bold text-slate-900">
                    Sterile Procedure Suites
                  </h4>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                    Equipped with positive pressure airflow, surgical lighting, and sterile scrub stations for outpatient minor procedures.
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Section 5B: Illustrative Stock Photography (Explicitly Disclosed) */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-slate-500 shrink-0" />
                <h4 className="font-display text-base font-bold text-slate-900">
                  Illustrative Clinical Imagery (Stock Representation)
                </h4>
              </div>
              <span className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md self-start sm:self-auto">
                Stock Photography Notice
              </span>
            </div>

            <p className="text-xs text-slate-600 mt-3 mb-6 max-w-2xl leading-relaxed">
              To illustrate our general medical concepts and clinical ethos, the following images represent stock healthcare photography and are explicitly distinguished from our actual physical facility.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Illustrative Image 1 */}
              <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={CLINIC_IMAGES.heroSlide2Nursing}
                    alt="Illustrative stock photograph: Inpatient nursing and supportive care concept"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-2.5 left-2.5 bg-slate-900/85 text-amber-300 text-[10px] font-semibold px-2 py-0.5 rounded">
                    Illustrative Stock Photo
                  </div>
                </div>
                <div className="p-4 text-xs">
                  <span className="font-semibold text-slate-900 block">
                    Nursing & Patient Care Model
                  </span>
                  <span className="text-slate-500 block text-[11px] mt-0.5">
                    Stock representation of compassionate patient-nurse dialogue.
                  </span>
                </div>
              </div>

              {/* Illustrative Image 2 */}
              <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={CLINIC_IMAGES.heroSlide1Surgical}
                    alt="Illustrative stock photograph: Multi-specialist clinical team coordination concept"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-2.5 left-2.5 bg-slate-900/85 text-amber-300 text-[10px] font-semibold px-2 py-0.5 rounded">
                    Illustrative Stock Photo
                  </div>
                </div>
                <div className="p-4 text-xs">
                  <span className="font-semibold text-slate-900 block">
                    Clinical Team Coordination Model
                  </span>
                  <span className="text-slate-500 block text-[11px] mt-0.5">
                    Stock representation of multidisciplinary healthcare discussions.
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

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
