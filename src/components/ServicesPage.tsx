import React, { useState } from 'react';
import { 
  Stethoscope, 
  Heart, 
  Scissors, 
  Microscope, 
  Pill, 
  Activity, 
  HeartPulse, 
  Clock, 
  Calendar, 
  Phone, 
  ArrowRight, 
  CheckCircle2, 
  Maximize2, 
  Info, 
  X, 
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { CLINIC_IMAGES, CLINIC_INFO } from '../data/clinicData';

interface ServicesPageProps {
  onOpenBooking: (departmentId?: string) => void;
  onNavigateContact: () => void;
  onNavigateHome: () => void;
  onOpenPhotoModal: (imageSrc: string, title: string, caption: string) => void;
}

interface ServiceDetail {
  id: string;
  name: string;
  categoryTag: string;
  shortDesc: string;
  fullOverview: string;
  scopeOfCare: string[];
  patientGuidance: string[];
  availabilityNotice: string;
  image: string;
  imageLabel: string;
  isActualFacility: boolean;
  departmentId?: string;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  onOpenBooking,
  onNavigateContact,
  onNavigateHome,
  onOpenPhotoModal,
}) => {
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null);

  // The 7 verified service categories strictly as specified in requirements
  const services: Record<string, ServiceDetail> = {
    consultation: {
      id: 'consultation',
      name: 'General Medical Consultation',
      categoryTag: 'Primary Outpatient Assessment',
      shortDesc: 'Comprehensive patient assessment, personal health history evaluations, and unhurried clinical advice.',
      fullOverview: 'Our general medical consultations provide individuals and families with an attentive, unhurried space to discuss physical symptoms, routine health concerns, and ongoing wellness needs. Every consultation begins with active listening, thorough vitals review, and clinical examination.',
      scopeOfCare: [
        'Adult and family medical examinations',
        'Evaluation of acute and recurrent symptoms',
        'Routine health risk assessments and lifestyle guidance',
        'Review of previous medical records and diagnostic findings',
        'Clinical referrals for specialized surgical or diagnostic care'
      ],
      patientGuidance: [
        'Please bring any current prescription medications or supplements.',
        'Prepare a brief list of symptoms and how long they have been present.',
        'Arrive 15 minutes before your scheduled appointment for vitals recording.'
      ],
      availabilityNotice: 'Monday – Saturday: 7:30 AM – 8:00 PM (By appointment or outpatient registration)',
      image: CLINIC_IMAGES.consultationCare,
      imageLabel: 'Actual Winnie\'s Clinic Consultation Suite',
      isActualFacility: true,
      departmentId: 'internal-med',
    },
    maternity: {
      id: 'maternity',
      name: 'Maternity and Childbirth Care',
      categoryTag: 'Maternal & Newborn Care',
      shortDesc: 'Compassionate maternal care and childbirth services delivered with clinical dignity and warmth.',
      fullOverview: 'Winnie’s Clinic offers supportive maternity-related care and childbirth services designed to safeguard both mother and newborn throughout pregnancy, labor, and the postpartum transition. Our clinical teams provide compassionate bedside care, vital signs monitoring, and thoughtful guidance for growing families.',
      scopeOfCare: [
        'Maternity health checks and clinical monitoring',
        'Childbirth care and assisted delivery support',
        'Postnatal maternal recovery and newborn vitals observation',
        'Infant feeding, maternal wellness, and recovery advice',
        'Prompt referral for complex obstetric circumstances'
      ],
      patientGuidance: [
        'Family companions and support partners are warmly welcomed.',
        'Bring prior antenatal test results and medical documentation.',
        'Contact our 24/7 care team immediately if experiencing urgent signs or discomfort.'
      ],
      availabilityNotice: 'Scheduled maternal checks: Mon – Sat | Labor and Delivery Unit: 24/7 availability',
      image: CLINIC_IMAGES.maternityNewborn,
      imageLabel: 'Illustrative Maternal & Newborn Care Photography',
      isActualFacility: false,
      departmentId: 'obstetrics',
    },
    surgical: {
      id: 'surgical',
      name: 'Surgical Services',
      categoryTag: 'Sterile Procedure Suites',
      shortDesc: 'Sterile operating suites equipped for planned surgical procedures and minor interventions.',
      fullOverview: 'Our surgical department delivers carefully managed procedures conducted within sterile, HEPA-filtered operating suites. From pre-operative evaluations and sterile theater prep to post-procedure observation, our surgical teams adhere to disciplined clinical safety protocols to support smooth patient recovery.',
      scopeOfCare: [
        'Pre-operative medical assessments and patient consultation',
        'Elective and minor surgical interventions',
        'Sterile day-case procedures and local anesthesia care',
        'Post-operative wound observation, dressings, and recovery monitoring',
        'Structured post-discharge recovery guidance'
      ],
      patientGuidance: [
        'Follow all pre-procedure fasting and medication instructions provided by your doctor.',
        'Arrange for a responsible adult companion to escort you home following day procedures.',
        'Attend scheduled follow-up visits for wound evaluation and suture removal.'
      ],
      availabilityNotice: 'Elective surgeries: Mon – Fri by advance schedule | Acute surgical triage: 24/7',
      image: CLINIC_IMAGES.operatingTheatre,
      imageLabel: 'Actual Winnie\'s Clinic Operating Theatre',
      isActualFacility: true,
      departmentId: 'surgery',
    },
    laboratory: {
      id: 'laboratory',
      name: 'Laboratory and Diagnostic Services',
      categoryTag: 'Clinical Diagnostics',
      shortDesc: 'Essential clinical laboratory investigations supporting accurate diagnosis and treatment plans.',
      fullOverview: 'Accurate clinical diagnostics provide the backbone of dependable patient care. Winnie’s Clinic provides in-house laboratory testing and diagnostic support to assist our medical staff in evaluating blood markers, infections, organ function, and baseline health indicators with timely turnaround.',
      scopeOfCare: [
        'Clinical chemistry and metabolic screening',
        'Hematology and blood cell evaluations',
        'Infectious disease diagnostics and screening panels',
        'Urine and biological fluid analysis',
        'Diagnostic coordination with outpatient consulting physicians'
      ],
      patientGuidance: [
        'Inquire beforehand if fasting (water only) is required for your specific tests.',
        'Results are reviewed directly with your consulting physician for clear interpretation.',
        'Most routine diagnostic panels are processed on the same day.'
      ],
      availabilityNotice: 'Laboratory specimen collection: Mon – Sat 7:30 AM – 7:30 PM | Emergency assays: 24/7',
      image: CLINIC_IMAGES.laboratoryCare,
      imageLabel: 'Illustrative Clinical Laboratory Photography',
      isActualFacility: false,
      departmentId: 'diagnostics',
    },
    medication: {
      id: 'medication',
      name: 'Medication and Prescription Services',
      categoryTag: 'Clinical Pharmacology Guidance',
      shortDesc: 'Professional medication prescription, dosage instruction, and safe pharmaceutical guidance.',
      fullOverview: 'Following a medical evaluation, our physicians provide verified prescriptions and comprehensive patient guidance on medication usage, expected therapeutic outcomes, potential side effects, and safe storage. We ensure that patients thoroughly understand how and when to take their prescribed treatments.',
      scopeOfCare: [
        'Physician prescription issuance for outpatient care',
        'Medication reconciliation and allergy screening',
        'Patient dosage counseling and scheduling advice',
        'Chronic disease medication monitoring (hypertension, metabolic health)',
        'Clear guidance on potential drug interactions and lifestyle precautions'
      ],
      patientGuidance: [
        'Inform your doctor of all existing medications, traditional remedies, or allergies.',
        'Always complete prescribed courses of treatment as directed by your physician.',
        'Contact the clinic if you experience unexpected reactions to new medications.'
      ],
      availabilityNotice: 'Available during all outpatient medical consultations',
      image: CLINIC_IMAGES.heroDoctor,
      imageLabel: 'Clinical Consultation & Prescription Guidance',
      isActualFacility: true,
      departmentId: 'internal-med',
    },
    emergency: {
      id: 'emergency',
      name: 'Emergency and Acute Care',
      categoryTag: '24/7 Triage & Acute Assessment',
      shortDesc: 'Confirmed 24/7 acute triage and immediate medical evaluation for urgent patient needs.',
      fullOverview: 'Winnie’s Clinic maintains confirmed 24/7 Acute Emergency Triage at our Holy Ghost Bomb Junction, Umuchima facility in Okigwe. Our acute care team provides rapid patient evaluation, vital sign stabilization, urgent medical pain relief, and clinical triage. Note: The clinic provides immediate acute triage and assessment; patients requiring specialized tertiary intensive care (ICU) or advanced mobile trauma rescue are clinically stabilized and coordinated for appropriate transfer.',
      scopeOfCare: [
        'Immediate patient assessment and triage priority grading',
        'Acute pain management and symptom stabilization',
        'Emergency wound treatment and minor injury care',
        'Cardiovascular and respiratory vital sign monitoring',
        'Clinical stabilization and coordinated specialist care'
      ],
      patientGuidance: [
        'For life-threatening acute emergencies, call our 24/7 hotline directly: +234-8037-3927-30.',
        'Emergency walk-ins are prioritized immediately based on clinical triage criteria.',
        'A dedicated acute triage nursing officer is on duty 24 hours a day, 7 days a week.'
      ],
      availabilityNotice: 'Confirmed 24/7/365 availability at Holy Ghost Bomb Junction, Umuchima, Okigwe',
      image: CLINIC_IMAGES.heroSlide1Surgical,
      imageLabel: 'Illustrative Acute Care Collaboration Photography',
      isActualFacility: false,
      departmentId: 'cardiology',
    },
    patientCare: {
      id: 'patientCare',
      name: 'General Patient Care',
      categoryTag: 'Inpatient & Ambulatory Care',
      shortDesc: 'Holistic patient treatment, clinical observation, and compassionate nursing care.',
      fullOverview: 'General patient care at Winnie’s Clinic encompasses the broad spectrum of physical, emotional, and recovery support provided to our patients. Whether monitoring recovery after a minor procedure or administering intravenous therapies, our nursing and medical team focuses on dignity, comfort, and patient reassurance.',
      scopeOfCare: [
        'Bedside nursing observation and vital signs tracking',
        'Intravenous fluid administration and prescribed infusions',
        'Wound dressing, post-procedure monitoring, and physical comfort',
        'Patient education on disease prevention and home care',
        'Compassionate communication with patient families and companions'
      ],
      patientGuidance: [
        'Patients undergoing extended observation have access to clean, peaceful recovery spaces.',
        'Our nursing staff is readily accessible via bedside call points.',
        'Visitors are requested to observe quiet clinic hours to support patient rest.'
      ],
      availabilityNotice: 'Continuous outpatient support during operating hours & 24/7 for acute observation',
      image: CLINIC_IMAGES.heroSlide2Nursing,
      imageLabel: 'Illustrative Nursing and Bedside Care Photography',
      isActualFacility: false,
      departmentId: 'internal-med',
    },
  };

  return (
    <div className="bg-white text-slate-900 min-h-screen">
      
      {/* -------------------------------------------------------------
          1. SERVICES HERO
          - Heading: "Comprehensive Healthcare, Thoughtfully Delivered."
          - Supporting text: "From everyday medical consultations to maternity care, 
            surgical procedures and diagnostic services, Winnie’s Clinic is committed 
            to providing healthcare for different patient needs."
          - Prominent, high-quality healthcare photograph
      -------------------------------------------------------------- */}
      <section className="relative bg-slate-900 text-white overflow-hidden" aria-labelledby="services-hero-heading">
        {/* Prominent High-Resolution Editorial Photo Background with Scrim */}
        <div className="absolute inset-0 z-0">
          <img
            src={CLINIC_IMAGES.heroSlide3Consultation}
            alt="Compassionate Black African physician consulting attentively with a patient in a modern healthcare clinic"
            className="w-full h-full object-cover object-center brightness-60"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/85 to-slate-950/60" />
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
            <span className="text-slate-300" aria-current="page">Our Services</span>
          </nav>

          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400" aria-hidden="true" />
              <span>Dedicated Clinical Offerings</span>
            </div>

            {/* Exactly the required heading */}
            <h1 
              id="services-hero-heading" 
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.12] text-balance"
            >
              Comprehensive Healthcare, Thoughtfully Delivered.
            </h1>

            {/* Exactly the required supporting text */}
            <p className="text-lg sm:text-xl text-slate-200 font-normal leading-relaxed max-w-2xl">
              From everyday medical consultations to maternity care, surgical procedures and diagnostic services, Winnie’s Clinic is committed to providing healthcare for different patient needs.
            </p>

            {/* Direct Quick Action CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onOpenBooking()}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-slate-950 bg-white hover:bg-emerald-50 rounded-lg shadow-sm transition-colors cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-emerald-800" />
                <span>Book a Consultation</span>
              </button>

              <button
                onClick={onNavigateContact}
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700 rounded-lg transition-colors cursor-pointer"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>Call Front Desk (+234-8037-3927-30)</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          2. LARGE EDITORIAL FEATURES
          - Large editorial feature for Maternity and Childbirth Care
          - Large editorial feature for Surgical Services
      -------------------------------------------------------------- */}
      <section className="py-20 lg:py-28 bg-white border-b border-slate-200" aria-labelledby="editorial-features-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-800">
              <Heart className="w-3.5 h-3.5" />
              <span>Specialized Clinical Suites</span>
            </div>
            <h2 id="editorial-features-heading" className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 leading-tight">
              Featured Clinical Capabilities
            </h2>
            <p className="text-base text-slate-600 leading-relaxed font-normal">
              Our clinical facility at Holy Ghost Bomb Junction, Umuchima, Okigwe provides dedicated environments for maternity, childbirth, and surgical care, supported by compassionate nursing and medical oversight.
            </p>
          </div>

          {/* EDITORIAL FEATURE 1: MATERNITY AND CHILDBIRTH CARE */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            
            {/* Left Image (7 cols) */}
            <div className="lg:col-span-7 relative group">
              <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-xl bg-slate-100 relative">
                <img
                  src={CLINIC_IMAGES.maternityNewborn}
                  alt="Compassionate Black African midwife and doctor attending to a mother holding her newborn infant in a calm sunlit clinic room"
                  className="w-full h-[380px] sm:h-[460px] lg:h-[500px] object-cover object-center group-hover:scale-102 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                
                {/* Photo Caption Badge */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-slate-950/80 backdrop-blur-md border border-white/20 text-white flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-semibold text-emerald-300 uppercase tracking-wider block">
                      Maternal & Infant Care
                    </span>
                    <p className="text-xs text-slate-200 mt-0.5">
                      Attentive postpartum observation and newborn monitoring
                    </p>
                  </div>
                  <button
                    onClick={() => onOpenPhotoModal(
                      CLINIC_IMAGES.maternityNewborn,
                      "Maternity & Childbirth Care",
                      "Documentary healthcare photograph: Compassionate maternal and newborn care at Winnie's Clinic."
                    )}
                    className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                    title="Enlarge photograph"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Content (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-800">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-700" />
                <span>Maternal Sanctuary</span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 leading-snug">
                Maternity and Childbirth Care
              </h3>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                Winnie’s Clinic welcomes expectant mothers into a supportive, serene healthcare environment. Our clinical staff provides attentive monitoring during pregnancy, gentle labor guidance, and post-delivery care for both mother and newborn.
              </p>

              {/* Core Scope Points */}
              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span>Maternal health assessments and continuous vitals observation</span>
                </div>
                <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span>Supportive childbirth care and labor monitoring suites</span>
                </div>
                <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span>Newborn wellness evaluations and gentle postpartum care</span>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onOpenBooking('obstetrics')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-emerald-800 hover:bg-emerald-900 active:bg-emerald-950 rounded-lg shadow-sm transition-colors cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-emerald-200" />
                  <span>Book Maternal Consultation</span>
                </button>

                <button
                  onClick={() => setSelectedService(services.maternity)}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 hover:text-emerald-800 hover:bg-slate-50 border border-slate-200 rounded-lg transition-colors cursor-pointer"
                >
                  <span>Learn More</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>
              </div>

            </div>

          </div>

          {/* EDITORIAL FEATURE 2: SURGICAL SERVICES */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center pt-8 border-t border-slate-100">
            
            {/* Left Content (5 cols) - Inverted order for visual rhythm */}
            <div className="lg:col-span-5 space-y-6 order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-800">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-700" />
                <span>Sterile Surgical Suites</span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 leading-snug">
                Surgical Services
              </h3>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                Our surgical facilities feature modern, sterile operating suites designed for planned elective surgeries and day-case procedures. Each patient undergoes comprehensive pre-operative review followed by vigilant post-operative monitoring.
              </p>

              {/* Core Scope Points */}
              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span>Pre-operative clinical screening and risk evaluation</span>
                </div>
                <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span>Sterile day-case procedures and minor surgical interventions</span>
                </div>
                <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span>Dedicated recovery observation and structured wound management</span>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onOpenBooking('surgery')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-emerald-800 hover:bg-emerald-900 active:bg-emerald-950 rounded-lg shadow-sm transition-colors cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-emerald-200" />
                  <span>Book Surgical Consultation</span>
                </button>

                <button
                  onClick={() => setSelectedService(services.surgical)}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 hover:text-emerald-800 hover:bg-slate-50 border border-slate-200 rounded-lg transition-colors cursor-pointer"
                >
                  <span>Learn More</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>
              </div>

            </div>

            {/* Right Image (7 cols) */}
            <div className="lg:col-span-7 relative group order-1 lg:order-2">
              <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-xl bg-slate-900 relative">
                <img
                  src={CLINIC_IMAGES.operatingTheatre}
                  alt="Actual Winnie's Clinic operating theatre with modern surgical lighting and sterile instrumentation"
                  className="w-full h-[380px] sm:h-[460px] lg:h-[500px] object-cover object-center group-hover:scale-102 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                
                {/* Photo Caption Badge */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-slate-950/85 backdrop-blur-md border border-white/20 text-white flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-semibold text-emerald-300 uppercase tracking-wider block">
                      Actual Winnie's Clinic Operating Suite
                    </span>
                    <p className="text-xs text-slate-200 mt-0.5">
                      Sterile surgical room · Holy Ghost Bomb Junction, Umuchima, Okigwe, Imo State
                    </p>
                  </div>
                  <button
                    onClick={() => onOpenPhotoModal(
                      CLINIC_IMAGES.operatingTheatre,
                      "Sterile Operating Theatre",
                      "Actual facility photograph: Winnie's Clinic sterile surgical suite in Okigwe."
                    )}
                    className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                    title="Enlarge photograph"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* -------------------------------------------------------------
          3. ASYMMETRICAL GRID FOR REMAINING 5 SERVICES
          - General Medical Consultation
          - Laboratory and Diagnostic Services
          - Medication and Prescription Services
          - Emergency and Acute Care (Confirmed 24/7 Triage)
          - General Patient Care
      -------------------------------------------------------------- */}
      <section className="py-20 lg:py-28 bg-slate-50/70 border-b border-slate-200" aria-labelledby="general-services-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mb-14 space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-800">
              <Stethoscope className="w-3.5 h-3.5" />
              <span>Core Clinical Care</span>
            </div>

            <h2 id="general-services-heading" className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 leading-tight">
              Consultations, Diagnostics & Patient Care
            </h2>

            <p className="text-base text-slate-600 leading-relaxed font-normal">
              Everyday healthcare delivered with precision, ethical care, and respect for your time.
            </p>
          </div>

          {/* Asymmetrical Dynamic Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
            
            {/* SERVICE 1: General Medical Consultation (Spans 7 cols on md+) */}
            <div className="md:col-span-7 bg-white rounded-2xl p-7 sm:p-8 border border-slate-200 shadow-xs flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-emerald-800 uppercase tracking-widest">
                    01 · Outpatient Care
                  </span>
                  <span className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
                    Primary Assessment
                  </span>
                </div>

                <h3 className="font-display text-2xl font-bold text-slate-900">
                  General Medical Consultation
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed">
                  Attentive clinical dialogue and thorough physical examinations. Our physicians review your full health background, evaluate current symptoms, and explain diagnostic insights without rushing.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-slate-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Personalized medical evaluations</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Preventive screening advice</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Vital signs assessment</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Ongoing wellness coordination</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => onOpenBooking('internal-med')}
                  className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>Book Consultation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => setSelectedService(services.consultation)}
                  className="text-xs font-medium text-slate-500 hover:text-slate-800 cursor-pointer"
                >
                  View Details & Scope
                </button>
              </div>
            </div>

            {/* SERVICE 2: Emergency & Acute Care (Spans 5 cols on md+) */}
            <div className="md:col-span-5 bg-emerald-950 text-white rounded-2xl p-7 sm:p-8 border border-emerald-900 shadow-md flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="space-y-4 relative z-10">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
                    02 · 24/7 Availability
                  </span>
                  <span className="text-[10px] font-bold text-white bg-red-600/90 px-2 py-0.5 rounded-full uppercase tracking-wider">
                    24/7 Triage
                  </span>
                </div>

                <h3 className="font-display text-2xl font-bold text-white">
                  Emergency and Acute Care
                </h3>

                <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
                  Confirmed 24/7 Acute Emergency Triage at our Okigwe clinic. Rapid patient evaluation, vital signs stabilization, and immediate acute symptom relief when unexpected health issues arise.
                </p>

                <div className="p-3.5 rounded-xl bg-white/10 border border-white/10 text-xs text-emerald-100 space-y-1">
                  <div className="font-semibold text-white flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-emerald-300" />
                    <span>Emergency Hotline:</span>
                  </div>
                  <a href="tel:+2348037392730" className="font-bold text-emerald-300 hover:text-white text-sm block">
                    +234-8037-3927-30 (24/7 Acute Triage)
                  </a>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-emerald-900/60 flex items-center justify-between relative z-10">
                <button
                  onClick={() => setSelectedService(services.emergency)}
                  className="text-xs font-medium text-emerald-300 hover:text-white cursor-pointer"
                >
                  Triage Scope & Guidelines
                </button>
                <a
                  href="tel:+2348037392730"
                  className="px-3 py-1.5 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors"
                >
                  Call Triage
                </a>
              </div>
            </div>

            {/* SERVICE 3: Laboratory & Diagnostic Services (Spans 4 cols on md+) */}
            <div className="md:col-span-4 bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs flex flex-col justify-between group">
              <div className="relative h-44 overflow-hidden bg-slate-100">
                <img
                  src={CLINIC_IMAGES.laboratoryCare}
                  alt="Black African clinical laboratory scientist in white lab coat operating precision microscope"
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-2.5 left-2.5 bg-slate-900/80 text-white text-[10px] font-semibold px-2 py-0.5 rounded">
                  Clinical Diagnostics
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <span className="text-xs font-mono font-bold text-emerald-800 uppercase tracking-widest block mb-1">
                    03 · Diagnostics
                  </span>
                  <h3 className="font-display text-lg font-bold text-slate-900">
                    Laboratory Testing & Diagnostics
                  </h3>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                    Reliable blood panels, clinical chemistry, and biological evaluations supporting verified diagnoses.
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedService(services.laboratory)}
                    className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>Learn More</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* SERVICE 4: Medication and Prescription Services (Spans 4 cols on md+) */}
            <div className="md:col-span-4 bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center">
                  <Pill className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono font-bold text-emerald-800 uppercase tracking-widest block">
                  04 · Prescription Guidance
                </span>
                <h3 className="font-display text-lg font-bold text-slate-900">
                  Medication & Prescription Services
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Verified medical prescriptions accompanied by clear dosage instructions, allergy checks, and safe therapeutic guidance.
                </p>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-[11px] text-slate-500">
                  Patients receive comprehensive instructions on taking prescribed treatments safely.
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => setSelectedService(services.medication)}
                  className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>Learn More</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* SERVICE 5: General Patient Care (Spans 4 cols on md+) */}
            <div className="md:col-span-4 bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center">
                  <HeartPulse className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono font-bold text-emerald-800 uppercase tracking-widest block">
                  05 · Nursing & Recovery
                </span>
                <h3 className="font-display text-lg font-bold text-slate-900">
                  General Patient Care
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Holistic bedside nursing, vital signs tracking, wound dressing, and supportive patient comfort during recovery.
                </p>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-[11px] text-slate-500">
                  Attentive care ensuring patient dignity throughout outpatient visits and observation.
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => setSelectedService(services.patientCare)}
                  className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>Learn More</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* -------------------------------------------------------------
          4. APPOINTMENT CALL TO ACTION
          - Heading: "Your Health Deserves the Right Attention."
          - Supporting text: "Speak with Winnie’s Clinic about your healthcare 
            needs and available services."
          - Primary button: "Book an Appointment"
          - Secondary button: "Contact Us"
      -------------------------------------------------------------- */}
      <section className="py-20 lg:py-24 bg-emerald-900 text-white relative overflow-hidden" aria-labelledby="cta-heading">
        {/* Subtle radial texture background */}
        <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/80 border border-emerald-700/60 text-emerald-200 text-xs font-semibold uppercase tracking-wider">
            <span>Consultation & Care Inquiries</span>
          </div>

          {/* Exactly the required heading */}
          <h2 
            id="cta-heading"
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight text-balance"
          >
            Your Health Deserves the Right Attention.
          </h2>

          {/* Exactly the required supporting text */}
          <p className="text-base sm:text-lg text-emerald-100 max-w-2xl mx-auto font-normal leading-relaxed">
            Speak with Winnie’s Clinic about your healthcare needs and available services.
          </p>

          {/* Primary & Secondary Action Buttons */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onOpenBooking()}
              className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold text-emerald-950 bg-white hover:bg-emerald-50 rounded-xl shadow-md transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <Calendar className="w-4 h-4 text-emerald-800" />
              <span>Book an Appointment</span>
            </button>

            <button
              onClick={onNavigateContact}
              className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold text-white bg-emerald-800 hover:bg-emerald-700 active:bg-emerald-950 rounded-xl shadow-md transition-all cursor-pointer border border-emerald-600/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            >
              <Phone className="w-4 h-4 text-emerald-200" />
              <span>Contact Us</span>
            </button>
          </div>

          <div className="pt-6 text-xs text-emerald-300/80">
            Holy Ghost Bomb Junction, Umuchima, Okigwe, Imo State · General: {CLINIC_INFO.phone} · Acute Care: {CLINIC_INFO.emergencyHotline}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          SERVICE DETAIL INSPECTION MODAL (Learn More Drawer/Modal)
      -------------------------------------------------------------- */}
      {selectedService && (
        <div 
          role="dialog"
          aria-modal="true"
          aria-labelledby="service-modal-title"
          className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
        >
          <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden relative animate-in fade-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-800">
                  {selectedService.categoryTag}
                </span>
                <h3 id="service-modal-title" className="font-display text-lg font-bold text-slate-900">
                  {selectedService.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedService(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                aria-label="Close service details"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
              
              {/* Photo Banner if available */}
              <div className="relative rounded-xl overflow-hidden border border-slate-200 h-52 bg-slate-100">
                <img
                  src={selectedService.image}
                  alt={selectedService.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 left-2 right-2 p-2 rounded bg-slate-950/80 backdrop-blur-xs text-white text-[11px] flex items-center justify-between">
                  <span>{selectedService.imageLabel}</span>
                  {selectedService.isActualFacility && (
                    <span className="text-emerald-300 font-semibold text-[10px] uppercase tracking-wider">
                      Verified Facility
                    </span>
                  )}
                </div>
              </div>

              {/* Overview */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                  Service Overview
                </h4>
                <p className="text-sm text-slate-700 leading-relaxed font-normal">
                  {selectedService.fullOverview}
                </p>
              </div>

              {/* Scope of Care */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                  Clinical Scope & Inclusions
                </h4>
                <div className="space-y-2">
                  {selectedService.scopeOfCare.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Patient Preparation & Guidance */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Patient Guidance & Preparation</span>
                </h4>
                <div className="space-y-1.5 text-xs text-slate-600">
                  {selectedService.patientGuidance.map((guidance, idx) => (
                    <p key={idx}>• {guidance}</p>
                  ))}
                </div>
              </div>

              {/* Operating Hours Notice */}
              <div className="text-xs text-slate-600 flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>{selectedService.availabilityNotice}</span>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedService(null)}
                  className="px-4 py-2.5 text-xs font-medium text-slate-600 hover:text-slate-900 rounded-lg cursor-pointer"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const deptId = selectedService.departmentId;
                    setSelectedService(null);
                    onOpenBooking(deptId);
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg shadow-sm transition-colors cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-emerald-200" />
                  <span>Book This Service</span>
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};
