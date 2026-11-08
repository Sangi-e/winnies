export interface Doctor {
  id: string;
  name: string;
  title: string;
  role: string;
  departmentId: string;
  departmentName: string;
  qualifications: string;
  experienceYears: number;
  languages: string[];
  image: string;
  bio: string;
  availability: string[];
  consultationFee: number;
  featuredQuote: string;
}

export interface Department {
  id: string;
  name: string;
  leadPhysician: string;
  description: string;
  keyServices: string[];
  equipment: string[];
  operatingHours: string;
  consultationFee: number;
  image: string;
  badgeText: string;
}

export interface Facility {
  id: string;
  title: string;
  category: 'Reception & Outpatient' | 'Consultation' | 'Surgical & Sterile' | 'Diagnostics & Lab' | 'Inpatient & Recovery';
  description: string;
  specifications: string[];
  image: string;
  status: string;
}

export interface PatientGuide {
  id: string;
  title: string;
  category: string;
  readTime: string;
  summary: string;
  bulletPoints: string[];
}

import heroDoctorImg from '../assets/images/hero_african_doctor_1793703168632.jpg';
import teamSpecialistsImg from '../assets/images/team_african_specialists_1793703170300.jpg';
import consultationCareImg from '../assets/images/consultation_patient_care_1793703171198.jpg';
import operatingTheatreImg from '../assets/images/operating_theatre_surgeons_1793703172750.jpg';
import modernReceptionImg from '../assets/images/modern_clinic_reception_1793703172410.jpg';
import heroSlide1SurgicalImg from '../assets/images/surgical_team_wide_1793704304402.jpg';
import heroSlide2NursingImg from '../assets/images/nurse_patient_care_1793704291076.jpg';
import heroSlide3ConsultationImg from '../assets/images/consult_doctor_wide_1793704317252.jpg';
import maternityNewbornImg from '../assets/images/maternity_mother_newborn_1793713097382.jpg';
import laboratoryCareImg from '../assets/images/laboratory_diagnostic_care_1793713098031.jpg';

export const CLINIC_IMAGES = {
  heroDoctor: heroDoctorImg || '/assets/images/hero_african_doctor_1793703168632.jpg',
  teamSpecialists: teamSpecialistsImg || '/assets/images/team_african_specialists_1793703170300.jpg',
  consultationCare: consultationCareImg || '/assets/images/consultation_patient_care_1793703171198.jpg',
  operatingTheatre: operatingTheatreImg || '/assets/images/operating_theatre_surgeons_1793703172750.jpg',
  modernReception: modernReceptionImg || '/assets/images/modern_clinic_reception_1793703172410.jpg',
  // Hero Carousel Widescreen Editorial Photography
  heroSlide1Surgical: heroSlide1SurgicalImg || '/assets/images/surgical_team_wide_1793704304402.jpg',
  heroSlide2Nursing: heroSlide2NursingImg || '/assets/images/nurse_patient_care_1793704291076.jpg',
  heroSlide3Consultation: heroSlide3ConsultationImg || '/assets/images/consult_doctor_wide_1793704317252.jpg',
  // Maternity and Laboratory Photography
  maternityNewborn: maternityNewbornImg || '/assets/images/maternity_mother_newborn_1793713097382.jpg',
  laboratoryCare: laboratoryCareImg || '/assets/images/laboratory_diagnostic_care_1793713098031.jpg',
};

export const CLINIC_INFO = {
  name: "Winnie's Clinic",
  tagline: 'Modern African Healthcare Excellence',
  mission: 'Delivering patient-centered, dignified, and world-class medical care powered by distinguished African clinicians, state-of-the-art diagnostic facilities, and compassionate service.',
  phone: '+234-8037-3927-30',
  emergencyHotline: '+234-8037-3927-30 (24/7 Acute Care)',
  email: 'care@winniesclinic.org',
  address: 'Holy Ghost Bomb Junction, Umuchima, Okigwe, Imo State, Nigeria',
  hours: 'Outpatient: Monday – Saturday: 7:30 AM – 8:00 PM | Emergency & Inpatient: 24/7 All Days',
  accreditation: 'Federal Ministry of Health Certified · HEFAMAA Accredited · African Healthcare Quality Alliance Fellow',
};

export const DOCTORS: Doctor[] = [
  {
    id: 'dr-nkechi-eze',
    name: 'Dr. Nkechi Eze',
    title: 'MD, FWACP, FACC',
    role: 'Chief Medical Officer & Consultant Cardiologist',
    departmentId: 'cardiology',
    departmentName: 'Cardiovascular Medicine',
    qualifications: 'MBBS (Ibadan), FWACP (West African College of Physicians), Fellowship in Interventional Cardiology (Cape Town)',
    experienceYears: 18,
    languages: ['English', 'Igbo', 'Yoruba'],
    image: CLINIC_IMAGES.heroDoctor,
    bio: 'Dr. Eze directs clinical governance at Winnie\'s Clinic. With 18 years of clinical leadership across West and Southern Africa, she specializes in hypertension management, non-invasive cardiac imaging, and community cardiovascular prevention.',
    availability: ['09:00 AM', '10:30 AM', '02:00 PM', '04:00 PM'],
    consultationFee: 65,
    featuredQuote: 'True healing occurs when state-of-the-art clinical science is delivered with unhurried listening and cultural reverence for every patient.'
  },
  {
    id: 'dr-abraham-adu',
    name: 'Dr. Abraham Adu',
    title: 'MBChB, FWACP',
    role: 'Head of Internal Medicine & Preventive Health',
    departmentId: 'internal-med',
    departmentName: 'Internal & Preventive Medicine',
    qualifications: 'MBChB (Legon, Ghana), FWACP, Diploma in Tropical Medicine & Infectious Disease',
    experienceYears: 15,
    languages: ['English', 'Twi', 'Hausa'],
    image: CLINIC_IMAGES.consultationCare,
    bio: 'Dr. Adu oversees adult outpatient consultations, complex chronic illness co-management (diabetes, renal health, lipid disorders), and comprehensive executive annual health audits.',
    availability: ['08:30 AM', '10:00 AM', '11:30 AM', '03:00 PM'],
    consultationFee: 50,
    featuredQuote: 'Preventive medicine transforms families. By identifying health indicators early, we give our patients decades of active, vibrant life.'
  },
  {
    id: 'dr-folashade-adeleke',
    name: 'Dr. Folashade Adeleke',
    title: 'MBBS, FWACS, FACS',
    role: 'Director of Surgical Sciences & Laparoscopic Specialist',
    departmentId: 'surgery',
    departmentName: 'Minimally Invasive & General Surgery',
    qualifications: 'MBBS (Lagos), FWACS (Fellow, West African College of Surgeons), Advanced Laparoscopy Fellowship (Nairobi)',
    experienceYears: 16,
    languages: ['English', 'Yoruba', 'French'],
    image: CLINIC_IMAGES.operatingTheatre,
    bio: 'Dr. Adeleke leads Winnie\'s Clinic surgical suites, pioneering day-case laparoscopic procedures, abdominal surgery, endocrine interventions, and surgical oncology consultations.',
    availability: ['09:30 AM', '11:00 AM', '01:30 PM'],
    consultationFee: 75,
    featuredQuote: 'Minimally invasive surgical techniques mean smaller incisions, less post-operative discomfort, and returning home safely to loved ones in days rather than weeks.'
  },
  {
    id: 'dr-kwame-mensah',
    name: 'Dr. Kwame Mensah',
    title: 'MD, FMCPaed',
    role: 'Consultant Pediatrician & Neonatal Specialist',
    departmentId: 'pediatrics',
    departmentName: 'Pediatrics & Child Wellness',
    qualifications: 'MD, Fellow of National Postgraduate Medical College of Nigeria (Pediatrics), Neonatal Resuscitation Certified',
    experienceYears: 12,
    languages: ['English', 'Twi', 'Swahili'],
    image: CLINIC_IMAGES.teamSpecialists,
    bio: 'Dedicated to newborn screening, developmental milestones, childhood asthma, nutritional wellness, and adolescent health in a gentle, family-centered clinical space.',
    availability: ['09:00 AM', '11:00 AM', '02:30 PM', '04:30 PM'],
    consultationFee: 45,
    featuredQuote: 'Children deserve healthcare environments where they feel secure, understood, and cheered on at every milestone.'
  },
  {
    id: 'dr-chidimma-okoro',
    name: 'Dr. Chidimma Okoro',
    title: 'MBBS, FMCOG, FWACS',
    role: 'Consultant Obstetrician & Gynecologist',
    departmentId: 'obstetrics',
    departmentName: "Maternal Health & Women's Wellness",
    qualifications: 'MBBS (Enugu), FMCOG, Maternal-Fetal Medicine Certification',
    experienceYears: 14,
    languages: ['English', 'Igbo', 'Pidgin'],
    image: CLINIC_IMAGES.heroDoctor,
    bio: 'Expert in high-risk pregnancy care, comprehensive antenatal monitoring, reproductive endocrinology, fertility support, and gentle postpartum wellness.',
    availability: ['10:00 AM', '12:00 PM', '03:00 PM', '05:00 PM'],
    consultationFee: 60,
    featuredQuote: 'Every mother deserves empathetic guidance, dignified birth experiences, and continuous post-natal care.'
  },
  {
    id: 'dr-tendai-moyo',
    name: 'Dr. Tendai Moyo',
    title: 'MBChB, FRCPath',
    role: 'Head of Clinical Pathology & Diagnostic Services',
    departmentId: 'diagnostics',
    departmentName: 'Diagnostics & Laboratory Sciences',
    qualifications: 'MBChB (Harare), FRCPath, Molecular Diagnostic Specialist',
    experienceYears: 13,
    languages: ['English', 'Shona', 'Swahili'],
    image: CLINIC_IMAGES.teamSpecialists,
    bio: 'Oversees fully automated clinical chemistry, hematology, bacteriology, and histopathology ensuring verified turnaround within hours for rapid clinical decision making.',
    availability: ['08:00 AM', '10:00 AM', '01:00 PM', '03:30 PM'],
    consultationFee: 40,
    featuredQuote: 'Accurate clinical diagnostics provide the unshakeable foundation for precise, targeted therapeutic success.'
  }
];

export const DEPARTMENTS: Department[] = [
  {
    id: 'cardiology',
    name: 'Cardiovascular Medicine & Hypertension',
    leadPhysician: 'Dr. Nkechi Eze',
    description: 'Comprehensive non-invasive cardiology, 24-hour Holter monitoring, echocardiography, and personalized hypertension management designed for African risk profiles.',
    keyServices: ['Echocardiogram (2D & Doppler)', '12-Lead Digital ECG', '24h Ambulatory Blood Pressure Monitoring', 'Cardiovascular Risk Stratification', 'Lipid & Metabolic Clinic'],
    equipment: ['GE Vivid Ultrasound System', 'Schiller 24h Holter Monitors', 'Cardiac Biomarker POCT Units'],
    operatingHours: 'Monday – Friday: 8:00 AM – 6:00 PM',
    consultationFee: 65,
    image: CLINIC_IMAGES.heroDoctor,
    badgeText: 'Subspecialty Center'
  },
  {
    id: 'internal-med',
    name: 'Internal Medicine & Comprehensive Wellness',
    leadPhysician: 'Dr. Abraham Adu',
    description: 'Adult clinical examinations, chronic disease management (Type 2 diabetes, kidney disease, rheumatology), and thorough annual executive health evaluations.',
    keyServices: ['Comprehensive Medical Consultations', 'Executive Annual Health Audits', 'Diabetes Management & Education', 'Respiratory Function Screening', 'Infectious Disease Triage'],
    equipment: ['Spirometry System', 'Continuous Glucose Monitors', 'Digital Ophthalmoscope & Otoscopes'],
    operatingHours: 'Monday – Saturday: 7:30 AM – 7:30 PM',
    consultationFee: 50,
    image: CLINIC_IMAGES.consultationCare,
    badgeText: 'Primary Outpatient'
  },
  {
    id: 'surgery',
    name: 'Surgical Sciences & Minimally Invasive Suite',
    leadPhysician: 'Dr. Folashade Adeleke',
    description: 'State-of-the-art sterile operating theatres delivering general surgery, laparoscopic appendectomies, cholecystectomies, hernia repair, and daycare minor surgeries.',
    keyServices: ['Minimally Invasive Laparoscopy', 'Hernia & Abdominal Wall Reconstruction', 'Thyroid & Soft Tissue Excision', 'Day-Case Ambulatory Surgery', 'Post-Operative Wound Care'],
    equipment: ['Karl Storz HD Laparoscopic Towers', 'Draeger Anesthesia Workstations', 'ValleyLab Electrosurgical Generators'],
    operatingHours: 'Elective: Monday – Friday | Emergency: 24/7',
    consultationFee: 75,
    image: CLINIC_IMAGES.operatingTheatre,
    badgeText: 'Ultra-Clean Suites'
  },
  {
    id: 'pediatrics',
    name: 'Pediatrics & Child Wellness',
    leadPhysician: 'Dr. Kwame Mensah',
    description: 'Specialized healthcare for infants, toddlers, children, and adolescents with compassionate developmental checks and dedicated pediatric emergency triage.',
    keyServices: ['Well-Baby & Developmental Checks', 'WHO & National Immunization Protocols', 'Pediatric Asthma & Allergy Care', 'Childhood Infectious Disease Care', 'Nutritional Rehabilitation'],
    equipment: ['Infant Radiant Warmers', 'Pediatric Pulse Oximetry', 'Dedicated Child Play & Triage Corner'],
    operatingHours: 'Monday – Saturday: 8:00 AM – 7:00 PM | Emergency: 24/7',
    consultationFee: 45,
    image: CLINIC_IMAGES.teamSpecialists,
    badgeText: 'Family Friendly'
  },
  {
    id: 'obstetrics',
    name: "Obstetrics & Women's Health",
    leadPhysician: 'Dr. Chidimma Okoro',
    description: 'Nurturing antenatal supervision, high-resolution fetal sonography, painless labor suites, cervical cancer screening, and fertility counselling.',
    keyServices: ['Routine & High-Risk Antenatal Care', '4D Fetal Anomaly Ultrasonography', 'Gentle Labor & Delivery Suites', 'Pap Smears & HPV DNA Screening', 'Pre-Conception & Fertility Guidance'],
    equipment: ['Voluson E8 Fetal Ultrasound', 'Cardiotocography (CTG) Fetal Monitors', 'Modern Delivery Beds'],
    operatingHours: 'Monday – Saturday: 8:00 AM – 6:00 PM | Delivery Unit: 24/7',
    consultationFee: 60,
    image: CLINIC_IMAGES.heroDoctor,
    badgeText: 'Maternal Sanctuary'
  },
  {
    id: 'diagnostics',
    name: 'Automated Pathology & Molecular Laboratory',
    leadPhysician: 'Dr. Tendai Moyo',
    description: 'In-house diagnostic laboratory adhering to ISO 15189 quality standards with rapid same-day turnaround on routine and complex medical assays.',
    keyServices: ['Automated Full Blood Count & Hemoglobin Variants', 'Liver, Kidney & Cardiac Profiles', 'HbA1c & Fasting Insulin', 'Hormonal Profiles & Thyroid Panels', 'Microbiology & Culture Sensitivities'],
    equipment: ['Roche Cobas Clinical Chemistry', 'Sysmex Automated Hematology', 'PCR Molecular Testing Platform'],
    operatingHours: 'Open 24 Hours / 7 Days a Week',
    consultationFee: 40,
    image: CLINIC_IMAGES.teamSpecialists,
    badgeText: 'ISO 15189 Standard'
  }
];

export const FACILITIES: Facility[] = [
  {
    id: 'fac-reception',
    title: "Winnie's Clinic Reception & Outpatient Lounge",
    category: 'Reception & Outpatient',
    description: 'Bright, airy reception featuring natural oak finishes, contemporary seating, multilingual patient relations staff, and digital check-in kiosks.',
    specifications: ['Dedicated Outpatient Seating', 'Digital Queue Management', 'Wheelchair Accessible Corridors', 'Complimentary Hydration & Tea Bar'],
    image: CLINIC_IMAGES.modernReception,
    status: 'Welcoming Outpatients'
  },
  {
    id: 'fac-consultation',
    title: 'Modern Consultation Suites & Exam Rooms',
    category: 'Consultation',
    description: 'Private, sound-insulated consultation chambers equipped with electronic medical record terminals, examination couches, and diagnostic screening tools.',
    specifications: ['High Acoustic Privacy', 'Integrated Welch Allyn Diagnostic Wall Units', 'Ergonomic Patient Seating', 'Direct Daylight & Ventilation'],
    image: CLINIC_IMAGES.consultationCare,
    status: 'In Active Clinical Service'
  },
  {
    id: 'fac-theatre',
    title: 'Sterile Operating Theatres & Surgical Suites',
    category: 'Surgical & Sterile',
    description: 'Laminar flow filtered operating rooms with modern LED surgical lighting, multi-parameter vital signs monitoring, and dedicated sterile processing.',
    specifications: ['HEPA Filtered Positive Pressure Airflow', 'Advanced Dual-Arm Surgical Lights', 'HD Laparoscopic Endoscopy Stack', 'Dedicated Scrub Bay'],
    image: CLINIC_IMAGES.operatingTheatre,
    status: 'Sterile Ready 24/7'
  },
  {
    id: 'fac-team-hub',
    title: 'Multidisciplinary Medical Center & Team Hall',
    category: 'Reception & Outpatient',
    description: 'The central clinical collaboration hub where physicians, surgeons, nurses, and pharmacists convene daily for clinical reviews and coordinated care.',
    specifications: ['Grand Natural Daylight Atrium', 'Clinical Case Conference Facilities', 'Central Pharmacy Dispensary Adjacent', 'Direct Emergency Access'],
    image: CLINIC_IMAGES.teamSpecialists,
    status: 'Collaborative Hub'
  },
  {
    id: 'fac-physician-hall',
    title: 'Clinical Corridors & Outpatient Care Wings',
    category: 'Consultation',
    description: 'Wide, spotlessly maintained hospital corridors connecting specialized outpatient clinics, imaging, and physiotherapy wings with clear multilingual signage.',
    specifications: ['Non-Slip Medical Grade Flooring', 'Bilingual Directional Signage', 'Nurse Triage Stations on Every Wing', 'Bedside Communication Bells'],
    image: CLINIC_IMAGES.heroDoctor,
    status: 'Continuous Monitoring'
  }
];

export const PATIENT_GUIDES: PatientGuide[] = [
  {
    id: 'guide-first-visit',
    title: 'Preparing for Your First Consultation at Winnie\'s Clinic',
    category: 'Patient Orientation',
    readTime: '3 min read',
    summary: 'Everything you need to know before stepping through our doors to ensure an effortless, comprehensive medical visit.',
    bulletPoints: [
      'Bring your valid photo ID and any existing health insurance cards (NHIS, Hygeia, Reliance, AXA, etc.).',
      'Gather all current prescription medications or herbal supplements in their original packaging.',
      'Arrive 15 minutes before your scheduled appointment time to complete vitals recording at our nurse station.',
      'Feel free to bring a trusted family member or companion to accompany you in the consultation room.'
    ]
  },
  {
    id: 'guide-cardiac-health',
    title: 'Cardiovascular Wellness & Hypertension in African Adults',
    category: 'Health Education',
    readTime: '5 min read',
    summary: 'Clinical insights from Dr. Nkechi Eze on detecting silent hypertension and protecting your heart longevity.',
    bulletPoints: [
      'Hypertension is frequently asymptomatic; regular blood pressure checks are essential for all adults over 25.',
      'Incorporate traditional African leafy vegetables (ugwu, bitterleaf, waterleaf, sukuma wiki) rich in potassium.',
      'Limit dietary sodium by seasoning meals with aromatic garlic, ginger, and indigenous herbs.',
      'Schedule an annual resting ECG and lipid profile starting at age 35, or earlier with a family history.'
    ]
  },
  {
    id: 'guide-antenatal',
    title: 'Safe Motherhood: Trimester-by-Trimester Care',
    category: 'Maternal Health',
    readTime: '4 min read',
    summary: 'Guided recommendations from our Obstetric department for expectant mothers navigating antenatal milestones.',
    bulletPoints: [
      'Begin your antenatal bookings as soon as pregnancy is confirmed, ideally before the 12th gestational week.',
      'Take prescribed prenatal folic acid and iron supplements daily to support fetal neurological development.',
      'Stay hydrated with clean drinking water and fresh coconut water, avoiding unpasteurized drinks.',
      'Contact our 24/7 Maternity Emergency line immediately if experiencing severe headaches, visual disturbances, or bleeding.'
    ]
  },
  {
    id: 'guide-insurance',
    title: 'Understanding Health Insurance & Transparent Billing',
    category: 'Billing & Coverage',
    readTime: '2 min read',
    summary: 'How Winnie\'s Clinic works with domestic HMOs and international healthcare plans without unexpected out-of-pocket surprises.',
    bulletPoints: [
      'We accept HMO plans from Hygeia HMO, Reliance Health, AXA Mansard, Leadway Health, and Bupa Global.',
      'Direct billing pre-authorization is completed online at our reception desk within minutes.',
      'All self-paying patients receive itemized receipts before any non-emergency elective investigation.',
      'Flexible payment installments available for specialized maternal and surgical care packages.'
    ]
  }
];

export const TESTIMONIALS = [
  {
    id: 't-1',
    quote: 'From the minute you step into Winnie\'s Clinic, the respect and professionalism are palpable. Dr. Eze took the time to walk me through my father\'s cardiac tests without rushing. For the first time in years, we felt truly heard.',
    author: 'Chief Babatunde Adeleke',
    role: 'Patient Family Member',
    location: 'Ikoyi, Lagos',
    department: 'Cardiovascular Medicine'
  },
  {
    id: 't-2',
    quote: 'I had my laparoscopic surgery performed by Dr. Folashade Adeleke. The theatre was world-class, the surgical team was deeply reassuring, and I was walking comfortably by evening. Winnie\'s Clinic sets the standard for African healthcare.',
    author: 'Amina Bello-Sanusi',
    role: 'Surgical Patient',
    location: 'Okigwe, Imo State',
    department: 'Surgical Sciences'
  },
  {
    id: 't-3',
    quote: 'The pediatric team here is phenomenal. When our newborn had respiratory distress, the neonatal unit reacted within seconds. Matron Grace and Dr. Mensah treated our daughter like their own family.',
    author: 'Kofi & Serwaa Boateng',
    role: 'Parents',
    location: 'Lekki Phase 1',
    department: 'Pediatrics & Neonatal Care'
  }
];
