import { CLINIC_IMAGES } from './clinicData';

export interface HealthArticleSection {
  heading: string;
  paragraphs: string[];
  bulletPoints?: string[];
}

export interface HealthArticle {
  id: string;
  slug: string;
  title: string;
  category: 'Preventative Care' | 'Checkups & Diagnostics' | 'Cardiovascular Health' | 'Maternal & Child Health';
  readTime: string;
  publishDate: string;
  author: string;
  authorRole: string;
  summary: string;
  image: string;
  imageAlt: string;
  keyTakeaways: string[];
  contentSections: HealthArticleSection[];
  faqItems: { question: string; answer: string }[];
  suggestedDepartmentId?: string;
  seoKeywords: string[];
}

export const HEALTH_ARTICLES: HealthArticle[] = [
  {
    id: 'tips-preventative-healthcare',
    slug: 'tips-for-preventative-healthcare',
    title: 'Tips for Preventative Healthcare: Daily Habits, Nutrition & Screening',
    category: 'Preventative Care',
    readTime: '5 min read',
    publishDate: 'November 2, 2026',
    author: 'Winnie\'s Clinic Medical Advisory Board',
    authorRole: 'Internal Medicine & Preventive Care Faculty',
    summary: 'Proactive healthcare is the most effective foundation for long-term vitality. Learn practical daily habits, balanced African dietary choices, and age-recommended screenings that help prevent chronic illness before symptoms emerge.',
    image: CLINIC_IMAGES.consultationCare,
    imageAlt: 'Physician consulting attentively with a patient regarding preventive wellness at Winnie\'s Clinic',
    keyTakeaways: [
      'Preventative care detects silent metabolic and cardiovascular changes years before noticeable symptoms develop.',
      'Simple dietary shifts—such as seasoning with indigenous herbs and garlic rather than excess sodium—substantially benefit vascular elasticity.',
      'Consistent moderate physical activity of 30 minutes daily improves insulin sensitivity and sleep architecture.',
      'Establishing a baseline health audit in your 20s and 30s allows doctors to track trends over your lifetime.'
    ],
    contentSections: [
      {
        heading: '1. The Value of Prevention Over Reactive Treatment',
        paragraphs: [
          'Modern clinical evidence demonstrates that up to 80% of premature cardiovascular events and metabolic conditions can be prevented through timely clinical assessment and consistent lifestyle adjustments. Rather than seeking medical consultation only when feeling unwell, engaging with your doctor periodically helps identify subtle physiological changes early.',
          'Preventative healthcare focuses on maintaining optimal physiological equilibrium, supporting your body’s natural resilience, and protecting your family from unexpected medical crises.'
        ]
      },
      {
        heading: '2. Nutrition and Cardiovascular Protection',
        paragraphs: [
          'Diet is one of the most powerful modifiable drivers of lifelong well-being. Traditional African cuisine offers an abundance of potassium-rich leafy greens, wholesome tubers, and nutrient-dense legumes that naturally promote vascular health.',
          'To optimize cardiovascular balance, our clinical team recommends prioritizing whole foods and conscious sodium reduction:'
        ],
        bulletPoints: [
          'Incorporate potassium-rich vegetables such as ugwu (fluted pumpkin), bitterleaf, waterleaf, and garden egg.',
          'Season stews and soups with natural spices like ginger, garlic, scent leaves, and turmeric rather than high-sodium seasoning cubes.',
          'Maintain regular hydration with clean water, coconut water, or unsweetened herbal infusions throughout the day.',
          'Moderate saturated fats and refined palm oils by adopting grilling, steaming, or light braising methods.'
        ]
      },
      {
        heading: '3. Daily Physical Resilience and Sleep Architecture',
        paragraphs: [
          'Consistent physical movement acts as natural medicine for the cardiovascular system and glucose metabolism. You do not need grueling gym regimens; brisk walking for 30 minutes five days a week significantly reduces arterial stiffness and elevates mood.',
          'Equally vital is restful sleep. Chronic sleep deprivation elevates nocturnal cortisol levels and blood pressure. Strive for 7 to 8 hours of uninterrupted rest in a quiet, dark environment.'
        ]
      },
      {
        heading: '4. Essential Screenings by Age Group',
        paragraphs: [
          'Health screenings should be viewed as an investment in longevity rather than an inconvenience. Depending on your age and familial history, specific baseline tests should be conducted routinely:'
        ],
        bulletPoints: [
          'Ages 20–35: Annual blood pressure check, lipid profile baseline, fasting blood glucose, and routine eye examination.',
          'Ages 35–50: Comprehensive metabolic panel, HbA1c screening, resting 12-lead ECG, cervical/prostate screening, and kidney function tests.',
          'Ages 50+: Annual cardiovascular risk evaluation, bone mineral density assessment, colorectal screening, and vision/hearing audits.'
        ]
      }
    ],
    faqItems: [
      {
        question: 'How often should I consult a doctor if I feel completely healthy?',
        answer: 'Healthy adults under 40 without chronic conditions should schedule a clinical checkup at least once every 12 to 24 months. Adults over 40 or those with family histories of hypertension or diabetes benefit from annual reviews.'
      },
      {
        question: 'Can dietary changes really reverse early high blood pressure?',
        answer: 'Yes. In the pre-hypertension stage (blood pressure between 120/80 and 139/89 mmHg), adopting a low-sodium, potassium-rich diet, moderate exercise, and stress reduction can often normalize readings without immediate medication.'
      }
    ],
    suggestedDepartmentId: 'internal-med',
    seoKeywords: [
      'preventative healthcare tips',
      'preventive medicine Okigwe',
      'African diet cardiovascular health',
      'annual medical checkup Nigeria',
      'blood pressure prevention habits'
    ]
  },
  {
    id: 'understanding-annual-checkups',
    slug: 'understanding-annual-checkups',
    title: 'Understanding Annual Checkups: What to Expect & Why Early Detection Matters',
    category: 'Checkups & Diagnostics',
    readTime: '6 min read',
    publishDate: 'November 1, 2026',
    author: 'Winnie\'s Clinic Clinical Governance Team',
    authorRole: 'Outpatient Diagnostic & General Medicine',
    summary: 'An annual medical checkup is not a formality—it is your most reliable defense against silent conditions like hypertension and early metabolic shifts. Discover what happens during a comprehensive checkup and how to prepare.',
    image: CLINIC_IMAGES.heroSlide3Consultation,
    imageAlt: 'African doctor carefully reviewing medical records and diagnostic findings with a patient during an annual checkup',
    keyTakeaways: [
      'Many critical health conditions (hypertension, elevated lipid levels, early kidney stress) exhibit zero warning symptoms initially.',
      'A comprehensive annual audit evaluates physical vitals, cardiac rhythms, automated laboratory chemistry, and organ function.',
      'Fasting for 8 to 10 hours prior to your morning blood draw ensures accurate glucose and lipid panel measurements.',
      'Your checkup concludes with a personalized clinical action plan detailing lifestyle recommendations and follow-up milestones.'
    ],
    contentSections: [
      {
        heading: '1. What Is an Annual Medical Checkup?',
        paragraphs: [
          'An annual medical checkup, also referred to as a comprehensive health audit or wellness review, is a thorough, systematic clinical evaluation of your overall physical health. Unlike an acute visit for malaria or a sudden headache, an annual checkup takes a holistic view of your body systems.',
          'At Winnie’s Clinic, our consultations are unhurried. Your physician takes time to evaluate not just individual metrics, but how your daily stress, dietary patterns, sleep quality, and family history interact.'
        ]
      },
      {
        heading: '2. The Core Components of an Annual Audit',
        paragraphs: [
          'When you arrive for your scheduled checkup at our Okigwe clinic, the evaluation typically proceeds through four structured phases:'
        ],
        bulletPoints: [
          'Vitals & Physical Triage: Measurement of resting blood pressure, pulse rate, oxygen saturation, weight, height, body mass index (BMI), and temperature.',
          'Systemic Clinical Examination: Attentive examination of heart sounds, lung fields, abdominal palpation, thyroid assessment, skin checks, and reflexes.',
          'Automated Diagnostic Investigations: Fasting blood glucose, HbA1c (3-month blood sugar control), complete lipid panel (HDL, LDL, triglycerides), renal profile (creatinine, electrolytes), and full blood count.',
          'Cardiovascular Screening: A resting 12-lead digital electrocardiogram (ECG) to assess heart rhythm, conduction, and cardiac strain.'
        ]
      },
      {
        heading: '3. How to Prepare for Your Checkup Visit',
        paragraphs: [
          'Proper preparation ensures that all diagnostic investigations yield accurate and reliable readings:',
          'Fast for 8 to 10 hours overnight if your checkup includes fasting lipid or glucose assays. You may drink plain water freely to stay hydrated, which also makes blood specimen collection smoother.',
          'Bring an up-to-date list of all prescription medications, herbal remedies, and over-the-counter vitamins you take regularly.',
          'Wear loose, comfortable clothing with easy access to your arms and chest for blood pressure cuffs and ECG leads.'
        ]
      },
      {
        heading: '4. After the Checkup: Your Actionable Plan',
        paragraphs: [
          'The value of a checkup lies in the clarity it provides. Once your laboratory investigations are verified, your doctor will discuss every parameter in straightforward, compassionate language. You will receive an itemized health summary with personalized lifestyle recommendations, dietary advice, and clear milestones for follow-up.'
        ]
      }
    ],
    faqItems: [
      {
        question: 'Will I receive my test results on the same day?',
        answer: 'Routine automated biochemistry, hematology, and ECG results at Winnie\'s Clinic are typically processed and reviewed within 3 to 6 hours during morning consultations.'
      },
      {
        question: 'Does my health insurance (HMO) cover annual checkups?',
        answer: 'Most standard and corporate HMO plans in Nigeria provide annual wellness benefits. Our front desk reception team can verify your eligibility within minutes upon arrival.'
      }
    ],
    suggestedDepartmentId: 'internal-med',
    seoKeywords: [
      'annual medical checkup Okigwe',
      'health audit Okigwe Imo State',
      'what to expect during annual checkup',
      'routine blood test screening Nigeria',
      'early disease detection checkup'
    ]
  },
  {
    id: 'cardiovascular-wellness-african-adults',
    slug: 'cardiovascular-wellness-hypertension-awareness',
    title: 'Cardiovascular Wellness: Managing Blood Pressure and Heart Longevity',
    category: 'Cardiovascular Health',
    readTime: '4 min read',
    publishDate: 'October 28, 2026',
    author: 'Winnie\'s Clinic Cardiology Practice Group',
    authorRole: 'Cardiovascular Medicine Advisory',
    summary: 'Hypertension is often dubbed the silent condition because it rarely causes overt symptoms until advanced stages. Understand the unique cardiovascular considerations for African adults and practical steps to maintain healthy arteries.',
    image: CLINIC_IMAGES.heroSlide1Surgical,
    imageAlt: 'Clinical cardiac monitoring and blood pressure evaluation at Winnie\'s Clinic',
    keyTakeaways: [
      'Over 30% of urban adult populations experience elevated blood pressure without showing any noticeable symptoms.',
      'Regular ambulatory or resting blood pressure measurements are crucial for adults 25 and older.',
      'Cardiovascular health improves significantly with stress management, potassium-rich nutrition, and hydration.',
      'Never discontinue prescribed anti-hypertensive medication without consulting your physician.'
    ],
    contentSections: [
      {
        heading: '1. Understanding Silent Hypertension',
        paragraphs: [
          'High blood pressure (hypertension) exerts continuous strain on blood vessel walls, the heart muscle, kidneys, and brain. Because arterial walls adapt over time, a person can walk around with blood pressure above 150/95 mmHg feeling completely normal.',
          'This is why routine blood pressure checks at our clinic or at home are the single most important diagnostic habit for adults in our community.'
        ]
      },
      {
        heading: '2. Clinical Risk Factors to Monitor',
        paragraphs: [
          'While genetics and age play a role, lifestyle choices strongly influence blood pressure levels:'
        ],
        bulletPoints: [
          'High dietary sodium from processed foods and bouillon seasoning.',
          'Physical inactivity and prolonged sedentary desk work.',
          'Chronic psychological stress and insufficient nightly sleep.',
          'Excess alcohol consumption and smoking.'
        ]
      },
      {
        heading: '3. Practical Steps for Heart Longevity',
        paragraphs: [
          'Maintain an active partnership with your doctor. Schedule resting ECGs and lipid panels annually once you reach age 35, or earlier if hypertension runs in your immediate family. Protect your blood pressure through balanced nutrition, hydration, and regular movement.'
        ]
      }
    ],
    faqItems: [
      {
        question: 'What is considered a normal blood pressure reading?',
        answer: 'A normal resting blood pressure reading for a healthy adult is typically below 120/80 mmHg. Consistent readings at or above 130/80 mmHg warrant a physician review.'
      }
    ],
    suggestedDepartmentId: 'cardiology',
    seoKeywords: [
      'hypertension in African adults',
      'cardiovascular clinic Okigwe',
      'silent high blood pressure signs',
      'blood pressure screening Imo State'
    ]
  },
  {
    id: 'maternal-antenatal-guide',
    slug: 'safe-motherhood-antenatal-care-guide',
    title: 'Safe Motherhood: Trimester Milestones & Comprehensive Antenatal Care',
    category: 'Maternal & Child Health',
    readTime: '5 min read',
    publishDate: 'October 24, 2026',
    author: 'Winnie\'s Clinic Maternal Care Team',
    authorRole: 'Obstetrics & Maternal Well-being',
    summary: 'A guided overview for expectant mothers on antenatal booking timelines, essential micronutrient supplementation, ultrasound monitoring, and warning signs that require immediate medical attention.',
    image: CLINIC_IMAGES.maternityNewborn,
    imageAlt: 'Midwife and obstetric care team attending gently to mother and infant in modern maternity room',
    keyTakeaways: [
      'Antenatal bookings should ideally commence as soon as pregnancy is confirmed, preferably before the 12th gestational week.',
      'Daily folic acid and elemental iron supplementation support normal fetal neurological and hematological development.',
      'Routine fetal sonography evaluates gestational age, placental positioning, and fetal growth milestones.',
      'Severe headache, sudden facial swelling, or visual changes are warning signs that require 24/7 acute triage review.'
    ],
    contentSections: [
      {
        heading: '1. Why Early Antenatal Booking Matters',
        paragraphs: [
          'Booking early in your pregnancy allows clinicians to establish your baseline blood pressure, screen for asymptomatic urinary or blood conditions, and provide essential nutritional guidance during the critical first trimester organogenesis stage.',
          'Our maternity care team creates a gentle, supportive clinical space where expectant mothers can ask questions openly and receive comprehensive clinical monitoring.'
        ]
      },
      {
        heading: '2. Nutritional Foundations for Mother and Baby',
        paragraphs: [
          'Pregnancy increases nutritional demands for micronutrients, calcium, iron, and clean hydration:'
        ],
        bulletPoints: [
          'Take prescribed folic acid (at least 400 mcg daily) to prevent neural tube defects.',
          'Consume iron-rich whole foods like beans, spinach, fortified grains, and lean poultry to prevent maternal anemia.',
          'Stay well-hydrated with clean filtered water and fresh coconut water.',
          'Avoid unpasteurized dairy, raw fish, and unverified herbal concoctions.'
        ]
      },
      {
        heading: '3. When to Seek Immediate Clinical Attention',
        paragraphs: [
          'While mild nausea and fatigue are common, certain symptoms require immediate medical evaluation at our 24/7 Acute Triage Unit:',
          'Any vaginal bleeding or fluid leakage, severe abdominal cramping, sudden intense swelling of hands or face, persistent high fever, or noticeable decrease in fetal movements after 24 weeks.'
        ]
      }
    ],
    faqItems: [
      {
        question: 'When should I schedule my first ultrasound scan?',
        answer: 'A dating and viability ultrasound is commonly performed between weeks 8 and 12, followed by a comprehensive fetal anatomy scan between weeks 18 and 22.'
      }
    ],
    suggestedDepartmentId: 'obstetrics',
    seoKeywords: [
      'antenatal care Okigwe',
      'maternity clinic Imo State',
      'safe pregnancy guidelines Nigeria',
      'trimester checkups maternal health'
    ]
  }
];
