/**
 * Pure clinical and scheduling helper functions for Winnie's Clinic.
 * Decoupled from UI components for deterministic unit testing.
 */

export interface TriageResult {
  priority: 'Routine' | 'Priority' | 'Emergency';
  recommendedDepartment: string;
  waitTimeEstimate: string;
  advice: string;
}

export interface BmiEvaluation {
  bmi: number;
  category: 'Underweight' | 'Normal weight' | 'Overweight' | 'Obesity';
  clinicalAdvice: string;
}

/**
 * Generates an appointment reference code with department prefix and timestamp hash.
 */
export function generateAppointmentReference(departmentId: string, dateStr: string): string {
  const deptCode = (departmentId.substring(0, 3) || 'GEN').toUpperCase();
  const cleanDate = dateStr.replace(/[^0-9]/g, '').slice(-4);
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  return `WIN-${deptCode}-${cleanDate}-${randomSuffix}`;
}

/**
 * Returns available time slots for a given doctor on a specific date, excluding booked slots.
 */
export function getAvailableTimeSlots(
  doctorAvailability: string[],
  bookedSlots: string[]
): string[] {
  const bookedSet = new Set(bookedSlots);
  return doctorAvailability.filter(slot => !bookedSet.has(slot));
}

/**
 * Categorizes patient symptoms and routes to appropriate clinical department.
 */
export function triagePatientSymptom(
  symptomCategory: string,
  severity: 'mild' | 'moderate' | 'urgent'
): TriageResult {
  if (severity === 'urgent') {
    return {
      priority: 'Emergency',
      recommendedDepartment: '24/7 Emergency & Acute Care',
      waitTimeEstimate: 'Immediate (< 10 mins)',
      advice: 'Please proceed directly to Winnie\'s Clinic Emergency Triage Unit or call our emergency hotline.'
    };
  }

  const categoryLower = symptomCategory.toLowerCase();

  if (categoryLower.includes('heart') || categoryLower.includes('chest') || categoryLower.includes('hypertension')) {
    return {
      priority: severity === 'moderate' ? 'Priority' : 'Routine',
      recommendedDepartment: 'Cardiology & Vascular Medicine',
      waitTimeEstimate: severity === 'moderate' ? 'Same day' : 'Within 48 hours',
      advice: 'Consultation with our cardiovascular specialists including ECG and vitals evaluation.'
    };
  }

  if (categoryLower.includes('child') || categoryLower.includes('pediatric') || categoryLower.includes('infant')) {
    return {
      priority: severity === 'moderate' ? 'Priority' : 'Routine',
      recommendedDepartment: 'Pediatrics & Child Wellness',
      waitTimeEstimate: 'Within 24 hours',
      advice: 'Child health screening and consultation with our pediatric team.'
    };
  }

  if (categoryLower.includes('surgery') || categoryLower.includes('lump') || categoryLower.includes('appendix')) {
    return {
      priority: severity === 'moderate' ? 'Priority' : 'Routine',
      recommendedDepartment: 'General Surgery & Minimally Invasive Care',
      waitTimeEstimate: 'Within 24-48 hours',
      advice: 'Surgical evaluation and pre-operative diagnostic review.'
    };
  }

  if (categoryLower.includes('pregnancy') || categoryLower.includes('women') || categoryLower.includes('antenatal')) {
    return {
      priority: 'Routine',
      recommendedDepartment: "Obstetrics & Women's Health",
      waitTimeEstimate: 'Within 24-48 hours',
      advice: 'Comprehensive maternal health, ultrasound scanning, and obstetrics consultation.'
    };
  }

  return {
    priority: severity === 'moderate' ? 'Priority' : 'Routine',
    recommendedDepartment: 'Internal & Family Medicine',
    waitTimeEstimate: severity === 'moderate' ? 'Same day' : 'Within 24-48 hours',
    advice: 'Primary physician consultation and diagnostic lab investigations.'
  };
}

/**
 * Calculates BMI and returns clinical assessment with health advice.
 */
export function calculateBmiAndCategory(weightKg: number, heightCm: number): BmiEvaluation {
  if (weightKg <= 0 || heightCm <= 0) {
    throw new Error('Weight and height must be positive numbers');
  }

  const heightMeters = heightCm / 100;
  const bmi = Number((weightKg / (heightMeters * heightMeters)).toFixed(1));

  if (bmi < 18.5) {
    return {
      bmi,
      category: 'Underweight',
      clinicalAdvice: 'Consult our clinical nutrition team to ensure optimal caloric and micronutrient intake.'
    };
  } else if (bmi < 25) {
    return {
      bmi,
      category: 'Normal weight',
      clinicalAdvice: 'Maintain balanced African whole foods nutrition, regular physical activity, and annual preventive check-ups.'
    };
  } else if (bmi < 30) {
    return {
      bmi,
      category: 'Overweight',
      clinicalAdvice: 'We recommend blood pressure monitoring, metabolic panel screening, and guided dietary wellness.'
    };
  } else {
    return {
      bmi,
      category: 'Obesity',
      clinicalAdvice: 'Schedule a comprehensive cardiovascular and endocrine consultation with Winnie\'s Clinic wellness specialists.'
    };
  }
}

/**
 * Formats consultation fees with currency symbol.
 */
export function formatCurrency(amount: number, currency: 'USD' | 'NGN' | 'KES' = 'USD'): string {
  if (currency === 'USD') {
    return `$${amount.toLocaleString()}`;
  }
  if (currency === 'NGN') {
    return `₦${amount.toLocaleString()}`;
  }
  return `${currency} ${amount.toLocaleString()}`;
}

/**
 * Returns the next cyclic slide index for carousel navigation.
 */
export function getNextSlideIndex(currentIndex: number, totalSlides: number): number {
  if (totalSlides <= 0) return 0;
  return (currentIndex + 1) % totalSlides;
}

/**
 * Returns the previous cyclic slide index for carousel navigation.
 */
export function getPrevSlideIndex(currentIndex: number, totalSlides: number): number {
  if (totalSlides <= 0) return 0;
  return (currentIndex - 1 + totalSlides) % totalSlides;
}

/**
 * Calculates current progress percentage (0-100) for autoplay slide indicators.
 */
export function calculateSlideProgress(elapsedMs: number, durationMs: number): number {
  if (durationMs <= 0) return 0;
  return Math.min(100, Math.max(0, (elapsedMs / durationMs) * 100));
}

export interface ContactFormInput {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export interface ValidationErrors {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
}

/**
 * Validates the Contact Us form fields.
 */
export function validateContactForm(input: ContactFormInput): { isValid: boolean; errors: ValidationErrors } {
  const errors: ValidationErrors = {};

  if (!input.name || !input.name.trim() || input.name.trim().length < 2) {
    errors.name = 'Full name is required (minimum 2 characters).';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!input.email || !input.email.trim()) {
    errors.email = 'Email address is required.';
  } else if (!emailRegex.test(input.email.trim())) {
    errors.email = 'Please provide a valid email address (e.g. name@domain.com).';
  }

  const digits = (input.phone || '').replace(/[^0-9]/g, '');
  if (!input.phone || !input.phone.trim()) {
    errors.phone = 'Phone number is required for patient relations follow-up.';
  } else if (digits.length < 7) {
    errors.phone = 'Please provide a valid phone number (at least 7 digits).';
  }

  if (!input.subject || !input.subject.trim()) {
    errors.subject = 'Please specify or select an enquiry subject.';
  }

  if (!input.message || !input.message.trim() || input.message.trim().length < 10) {
    errors.message = 'Please provide your message (minimum 10 characters).';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
