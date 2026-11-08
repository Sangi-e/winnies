import React, { useState, useId } from 'react';
import { 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  FileText, 
  MessageSquare, 
  AlertCircle, 
  CheckCircle2, 
  ArrowLeft, 
  MapPin, 
  ShieldCheck, 
  Loader2, 
  HelpCircle,
  PhoneCall,
  CalendarDays
} from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';

interface BookingPageProps {
  onNavigateHome: () => void;
  onExploreServices: () => void;
  onOpenPhotoModal?: (imageSrc: string, title: string, caption: string) => void;
  preselectedDepartmentId?: string | null;
  preselectedDoctorId?: string | null;
}

interface SubmittedAppointment {
  referenceNumber: string;
  patientName: string;
  patientPhone: string;
  patientEmail: string | null;
  preferredDate: string;
  preferredTime: string;
  visitReason: string;
  additionalMessage: string | null;
  submittedAt: string;
}

export const BookingPage: React.FC<BookingPageProps> = ({
  onNavigateHome,
  onExploreServices,
}) => {
  // Today's date in YYYY-MM-DD format for min date restriction
  const todayStr = new Date().toISOString().split('T')[0];

  // Form state
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('09:00 AM');
  const [customTime, setCustomTime] = useState('');
  const [visitReason, setVisitReason] = useState('');
  const [additionalMessage, setAdditionalMessage] = useState('');

  // Status and feedback states
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [submittedData, setSubmittedData] = useState<SubmittedAppointment | null>(null);

  // Time slot options for convenience
  const timeOptions = [
    '08:30 AM',
    '09:00 AM',
    '10:00 AM',
    '11:00 AM',
    '12:00 PM',
    '01:00 PM',
    '02:00 PM',
    '03:00 PM',
    '04:00 PM',
    '05:00 PM',
    '06:00 PM',
    'Other / Custom Time',
  ];

  // Common visit reason suggestions to help patient describe concern
  const reasonSuggestions = [
    'General Medical Consultation',
    'Follow-up Consultation',
    'Routine Health Examination',
    'Maternity / Antenatal Review',
    'Pediatric / Child Healthcare',
    'Diagnostic Investigation Review',
    'Prescription & Medication Review',
  ];

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // 1. Patient full name
    if (!patientName.trim()) {
      newErrors.patientName = 'Please enter the patient’s full name.';
    } else if (patientName.trim().length < 2) {
      newErrors.patientName = 'Name must be at least 2 characters long.';
    }

    // 2. Phone number
    const cleanPhone = patientPhone.replace(/[\s\-\(\)]/g, '');
    if (!patientPhone.trim()) {
      newErrors.patientPhone = 'Please provide a contact phone number so our clinic can reach you.';
    } else if (cleanPhone.length < 7) {
      newErrors.patientPhone = 'Please provide a valid phone number with at least 7 digits.';
    }

    // 3. Email (optional, but validate format if entered)
    if (patientEmail.trim()) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(patientEmail.trim())) {
        newErrors.patientEmail = 'Please enter a valid email address (e.g. name@example.com).';
      }
    }

    // 4. Preferred date
    if (!preferredDate) {
      newErrors.preferredDate = 'Please select your preferred appointment date.';
    } else if (preferredDate < todayStr) {
      newErrors.preferredDate = 'Appointment date cannot be in the past. Please select today or an upcoming date.';
    }

    // 5. Preferred time
    const effectiveTime = preferredTime === 'Other / Custom Time' ? customTime.trim() : preferredTime;
    if (!effectiveTime) {
      newErrors.preferredTime = 'Please specify your preferred consultation time.';
    }

    // 6. Reason for visit
    if (!visitReason.trim()) {
      newErrors.visitReason = 'Please describe the reason for your visit or medical concern.';
    } else if (visitReason.trim().length < 3) {
      newErrors.visitReason = 'Please provide a brief description of your medical concern.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    if (!validateForm()) {
      // Scroll to first error
      const firstErrorKey = Object.keys(errors)[0];
      const errorElement = document.getElementById(firstErrorKey);
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setIsSubmitting(true);

    const effectiveTime = preferredTime === 'Other / Custom Time' ? customTime.trim() : preferredTime;

    const payload = {
      patientName: patientName.trim(),
      patientPhone: patientPhone.trim(),
      patientEmail: patientEmail.trim() ? patientEmail.trim() : null,
      preferredDate,
      preferredTime: effectiveTime,
      visitReason: visitReason.trim(),
      additionalMessage: additionalMessage.trim() ? additionalMessage.trim() : null,
    };

    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to submit appointment request. Please try again.');
      }

      setSubmittedData({
        referenceNumber: result.referenceNumber,
        patientName: payload.patientName,
        patientPhone: payload.patientPhone,
        patientEmail: payload.patientEmail,
        preferredDate: payload.preferredDate,
        preferredTime: payload.preferredTime,
        visitReason: payload.visitReason,
        additionalMessage: payload.additionalMessage,
        submittedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      });

      window.scrollTo({ top: 80, behavior: 'smooth' });
    } catch (err: any) {
      console.error('Submission error:', err);
      setServerError(
        err.message || 'An error occurred while transmitting your request to Winnie’s Clinic. Please check your connection or call us directly at +234-8037-3927-30.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setSubmittedData(null);
    setPatientName('');
    setPatientPhone('');
    setPatientEmail('');
    setPreferredDate('');
    setPreferredTime('09:00 AM');
    setCustomTime('');
    setVisitReason('');
    setAdditionalMessage('');
    setErrors({});
    setServerError(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 pb-24">
      
      {/* -------------------------------------------------------------
          HERO & BREADCRUMBS
      -------------------------------------------------------------- */}
      <section className="bg-slate-900 text-white border-b border-slate-800 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <nav className="flex items-center gap-2 text-xs text-emerald-300 font-medium mb-5" aria-label="Breadcrumb">
            <button 
              onClick={onNavigateHome} 
              className="hover:text-white transition-colors cursor-pointer inline-flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Home</span>
            </button>
            <span aria-hidden="true" className="text-slate-500">/</span>
            <span className="text-slate-300" aria-current="page">Book an Appointment</span>
          </nav>

          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-800/80 text-emerald-300 text-xs font-semibold uppercase tracking-wider">
              <Calendar className="w-3.5 h-3.5 text-emerald-400" />
              <span>Outpatient Appointment Request</span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              Book an Appointment
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl font-normal">
              Submit your preferred date and consultation details. Our clinic reception team will review your request and contact you directly via phone to confirm your appointment time.
            </p>
          </div>

          <div className="pt-6 flex flex-wrap items-center gap-4 text-xs text-slate-400 border-t border-slate-800/80 mt-6">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Holy Ghost Bomb Junction, Umuchima, Okigwe, Imo State</span>
            </div>
            <span className="text-slate-600 hidden sm:inline" aria-hidden="true">·</span>
            <div className="flex items-center gap-1.5">
              <PhoneCall className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Direct Clinic Line: {CLINIC_INFO.phone}</span>
            </div>
          </div>

        </div>
      </section>

      {/* -------------------------------------------------------------
          MAIN CONTENT AREA: FORM OR CONFIRMATION VIEW
      -------------------------------------------------------------- */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8">

        {/* =========================================================
            STATE 1: CONFIRMATION VIEW (Request Received, Awaiting Confirmation)
        ========================================================= */}
        {submittedData ? (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden p-6 sm:p-10 space-y-8 animate-in fade-in duration-300">
            
            {/* Prominent Status Banner */}
            <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div className="space-y-1 flex-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-200/80 text-emerald-900 text-xs font-bold uppercase tracking-wider">
                  Request Received — Awaiting Clinic Confirmation
                </div>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-900">
                  Appointment Request Logged Successfully
                </h2>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Thank you, <strong className="text-slate-900">{submittedData.patientName}</strong>. Your request has been securely recorded and dispatched to the reception team at Winnie’s Clinic.
                </p>
              </div>
            </div>

            {/* Crucial Instruction: What Happens Next */}
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-700" />
                <span>Next Steps for Your Appointment:</span>
              </h3>
              <ul className="text-xs sm:text-sm text-slate-600 space-y-2 list-disc list-inside leading-relaxed">
                <li>
                  <strong className="text-slate-900">Schedule Review:</strong> Our clinical reception team is reviewing your requested date (<span className="text-slate-900 font-medium">{submittedData.preferredDate}</span>) and time (<span className="text-slate-900 font-medium">{submittedData.preferredTime}</span>).
                </li>
                <li>
                  <strong className="text-slate-900">Direct Telephone Confirmation:</strong> We will call or SMS you at <strong className="text-emerald-800">{submittedData.patientPhone}</strong> during clinic hours to confirm your consultation time.
                </li>
                <li>
                  <strong className="text-slate-900">Alternative Slot Coordination:</strong> If your requested time is unavailable or conflicts with facility schedules, our staff will coordinate the next convenient slot with you directly over the phone.
                </li>
              </ul>
            </div>

            {/* Summary Details Card */}
            <div className="border border-slate-200 rounded-xl overflow-hidden text-sm">
              <div className="bg-slate-100 px-5 py-3 border-b border-slate-200 flex items-center justify-between">
                <span className="font-semibold text-slate-800 text-xs uppercase tracking-wider">
                  Submission Summary
                </span>
                <span className="font-mono text-xs font-bold text-emerald-800 bg-emerald-100/70 px-2.5 py-1 rounded">
                  Ref: {submittedData.referenceNumber}
                </span>
              </div>

              <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div>
                  <span className="text-slate-500 block text-xs">Patient Full Name:</span>
                  <span className="font-semibold text-slate-900">{submittedData.patientName}</span>
                </div>

                <div>
                  <span className="text-slate-500 block text-xs">Contact Phone Number:</span>
                  <span className="font-semibold text-slate-900">{submittedData.patientPhone}</span>
                </div>

                {submittedData.patientEmail && (
                  <div>
                    <span className="text-slate-500 block text-xs">Email Address:</span>
                    <span className="font-semibold text-slate-900">{submittedData.patientEmail}</span>
                  </div>
                )}

                <div>
                  <span className="text-slate-500 block text-xs">Requested Date & Time:</span>
                  <span className="font-semibold text-slate-900">
                    {submittedData.preferredDate} at {submittedData.preferredTime}
                  </span>
                </div>

                <div className="sm:col-span-2">
                  <span className="text-slate-500 block text-xs">Reason for Visit / Medical Concern:</span>
                  <p className="font-medium text-slate-900 mt-0.5">{submittedData.visitReason}</p>
                </div>

                {submittedData.additionalMessage && (
                  <div className="sm:col-span-2">
                    <span className="text-slate-500 block text-xs">Additional Notes:</span>
                    <p className="text-slate-700 mt-0.5">{submittedData.additionalMessage}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Emergency Guidance */}
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200/80 text-amber-950 text-xs sm:text-sm space-y-1">
              <p className="font-bold flex items-center gap-1.5 text-amber-900">
                <AlertCircle className="w-4 h-4 shrink-0 text-amber-700" />
                <span>Is This an Urgent Medical Emergency?</span>
              </p>
              <p className="text-amber-900/90 leading-relaxed">
                Please do not wait for an online confirmation if you are experiencing an acute medical emergency. Proceed directly to Winnie’s Clinic at Holy Ghost Bomb Junction, Umuchima, Okigwe, or call our 24/7 emergency line: <strong className="text-amber-950 font-bold">+234-8037-3927-30</strong>.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={handleResetForm}
                className="px-6 py-3 rounded-xl bg-emerald-800 hover:bg-emerald-700 active:bg-emerald-900 text-white text-sm font-semibold transition-colors cursor-pointer shadow-sm"
              >
                Submit Another Request
              </button>

              <button
                onClick={onNavigateHome}
                className="px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-sm font-semibold transition-colors cursor-pointer"
              >
                Return to Homepage
              </button>
            </div>

          </div>
        ) : (
          /* =========================================================
              STATE 2: BOOKING FORM VIEW
          ========================================================= */
          <div className="space-y-6">

            {/* Important Notice Banner */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-xs flex items-start gap-3.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="text-xs sm:text-sm space-y-1">
                <p className="font-bold text-slate-900">
                  Appointment Request Notice
                </p>
                <p className="text-slate-600 leading-relaxed">
                  Submitting this form records your preferred consultation time with Winnie’s Clinic. All requests are subject to schedule availability and are confirmed directly with you by our reception staff via telephone or SMS prior to your consultation.
                </p>
              </div>
            </div>

            {/* Server Error Message */}
            {serverError && (
              <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-900 text-sm flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div className="space-y-1 flex-1">
                  <p className="font-bold">Submission Notice</p>
                  <p className="text-xs sm:text-sm">{serverError}</p>
                </div>
              </div>
            )}

            {/* Main Form Container */}
            <form 
              onSubmit={handleSubmit}
              noValidate
              className="bg-white rounded-2xl border border-slate-200 shadow-md p-6 sm:p-8 lg:p-10 space-y-8"
            >
              
              {/* SECTION 1: Patient Information */}
              <div className="space-y-5">
                <div className="border-b border-slate-100 pb-3 flex items-center gap-2">
                  <User className="w-4 h-4 text-emerald-700" />
                  <h2 className="font-display text-lg font-bold text-slate-900">
                    1. Patient Contact Details
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  
                  {/* Field: Full Name */}
                  <div className="sm:col-span-2">
                    <label 
                      htmlFor="patientName"
                      className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
                    >
                      Patient’s Full Name <span className="text-red-600" aria-hidden="true">*</span>
                    </label>
                    <input
                      type="text"
                      id="patientName"
                      name="patientName"
                      value={patientName}
                      onChange={(e) => {
                        setPatientName(e.target.value);
                        if (errors.patientName) setErrors({ ...errors, patientName: '' });
                      }}
                      placeholder="e.g. Amara Obi"
                      aria-required="true"
                      aria-invalid={!!errors.patientName}
                      aria-describedby={errors.patientName ? 'patientName-error' : undefined}
                      className={`w-full px-4 py-3 rounded-xl border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-colors ${
                        errors.patientName 
                          ? 'border-red-400 focus:ring-red-300 bg-red-50/30' 
                          : 'border-slate-300 focus:border-emerald-700 focus:ring-emerald-100'
                      }`}
                    />
                    {errors.patientName && (
                      <p id="patientName-error" className="mt-1 text-xs text-red-600 flex items-center gap-1 font-medium">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.patientName}</span>
                      </p>
                    )}
                  </div>

                  {/* Field: Phone Number */}
                  <div>
                    <label 
                      htmlFor="patientPhone"
                      className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
                    >
                      Phone Number <span className="text-red-600" aria-hidden="true">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        id="patientPhone"
                        name="patientPhone"
                        value={patientPhone}
                        onChange={(e) => {
                          setPatientPhone(e.target.value);
                          if (errors.patientPhone) setErrors({ ...errors, patientPhone: '' });
                        }}
                        placeholder="e.g. 0803 123 4567"
                        aria-required="true"
                        aria-invalid={!!errors.patientPhone}
                        aria-describedby="phone-hint"
                        className={`w-full px-4 py-3 rounded-xl border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-colors ${
                          errors.patientPhone 
                            ? 'border-red-400 focus:ring-red-300 bg-red-50/30' 
                            : 'border-slate-300 focus:border-emerald-700 focus:ring-emerald-100'
                        }`}
                      />
                    </div>
                    <p id="phone-hint" className="mt-1 text-[11px] text-slate-500">
                      Our clinic reception will call or SMS this number to confirm your booking.
                    </p>
                    {errors.patientPhone && (
                      <p className="mt-1 text-xs text-red-600 flex items-center gap-1 font-medium">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.patientPhone}</span>
                      </p>
                    )}
                  </div>

                  {/* Field: Email Address (Optional) */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label 
                        htmlFor="patientEmail"
                        className="block text-xs font-bold uppercase tracking-wider text-slate-700"
                      >
                        Email Address
                      </label>
                      <span className="text-[11px] font-medium text-slate-400">Optional</span>
                    </div>
                    <input
                      type="email"
                      id="patientEmail"
                      name="patientEmail"
                      value={patientEmail}
                      onChange={(e) => {
                        setPatientEmail(e.target.value);
                        if (errors.patientEmail) setErrors({ ...errors, patientEmail: '' });
                      }}
                      placeholder="e.g. patient@example.com"
                      aria-required="false"
                      aria-invalid={!!errors.patientEmail}
                      className={`w-full px-4 py-3 rounded-xl border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-colors ${
                        errors.patientEmail 
                          ? 'border-red-400 focus:ring-red-300 bg-red-50/30' 
                          : 'border-slate-300 focus:border-emerald-700 focus:ring-emerald-100'
                      }`}
                    />
                    {errors.patientEmail ? (
                      <p className="mt-1 text-xs text-red-600 flex items-center gap-1 font-medium">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.patientEmail}</span>
                      </p>
                    ) : (
                      <p className="mt-1 text-[11px] text-slate-500">
                        Optional for receiving a written summary of your request.
                      </p>
                    )}
                  </div>

                </div>
              </div>

              {/* SECTION 2: Preferred Appointment Schedule */}
              <div className="space-y-5 pt-2">
                <div className="border-b border-slate-100 pb-3 flex items-center gap-2">
                  <CalendarDays className="w-4 h-4 text-emerald-700" />
                  <h2 className="font-display text-lg font-bold text-slate-900">
                    2. Preferred Schedule
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  
                  {/* Field: Preferred Date */}
                  <div>
                    <label 
                      htmlFor="preferredDate"
                      className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
                    >
                      Preferred Appointment Date <span className="text-red-600" aria-hidden="true">*</span>
                    </label>
                    <input
                      type="date"
                      id="preferredDate"
                      name="preferredDate"
                      min={todayStr}
                      value={preferredDate}
                      onChange={(e) => {
                        setPreferredDate(e.target.value);
                        if (errors.preferredDate) setErrors({ ...errors, preferredDate: '' });
                      }}
                      aria-required="true"
                      aria-invalid={!!errors.preferredDate}
                      className={`w-full px-4 py-3 rounded-xl border text-sm text-slate-900 focus:outline-none focus:ring-2 transition-colors ${
                        errors.preferredDate 
                          ? 'border-red-400 focus:ring-red-300 bg-red-50/30' 
                          : 'border-slate-300 focus:border-emerald-700 focus:ring-emerald-100'
                      }`}
                    />
                    <p className="mt-1 text-[11px] text-slate-500">
                      Past dates cannot be selected.
                    </p>
                    {errors.preferredDate && (
                      <p className="mt-1 text-xs text-red-600 flex items-center gap-1 font-medium">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.preferredDate}</span>
                      </p>
                    )}
                  </div>

                  {/* Field: Preferred Time */}
                  <div>
                    <label 
                      htmlFor="preferredTime"
                      className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
                    >
                      Preferred Appointment Time <span className="text-red-600" aria-hidden="true">*</span>
                    </label>
                    <select
                      id="preferredTime"
                      name="preferredTime"
                      value={preferredTime}
                      onChange={(e) => {
                        setPreferredTime(e.target.value);
                        if (errors.preferredTime) setErrors({ ...errors, preferredTime: '' });
                      }}
                      aria-required="true"
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-sm text-slate-900 focus:outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100 transition-colors"
                    >
                      {timeOptions.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>

                    {preferredTime === 'Other / Custom Time' && (
                      <div className="mt-2.5">
                        <input
                          type="text"
                          value={customTime}
                          onChange={(e) => setCustomTime(e.target.value)}
                          placeholder="e.g. Early morning around 7:45 AM"
                          className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-emerald-700"
                        />
                      </div>
                    )}

                    <p className="mt-1 text-[11px] text-slate-500">
                      Times are subject to staff availability and will be confirmed with you.
                    </p>
                    {errors.preferredTime && (
                      <p className="mt-1 text-xs text-red-600 flex items-center gap-1 font-medium">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.preferredTime}</span>
                      </p>
                    )}
                  </div>

                </div>
              </div>

              {/* SECTION 3: Medical Concern & Additional Message */}
              <div className="space-y-5 pt-2">
                <div className="border-b border-slate-100 pb-3 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-emerald-700" />
                  <h2 className="font-display text-lg font-bold text-slate-900">
                    3. Reason for Visit & Medical Details
                  </h2>
                </div>

                {/* Field: Reason for visit */}
                <div>
                  <label 
                    htmlFor="visitReason"
                    className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
                  >
                    Reason for Visit / Type of Medical Concern <span className="text-red-600" aria-hidden="true">*</span>
                  </label>
                  
                  {/* Quick-choice chips */}
                  <div className="flex flex-wrap gap-1.5 mb-2.5">
                    {reasonSuggestions.map((suggestion) => (
                      <button
                        key={suggestion}
                        type="button"
                        onClick={() => {
                          setVisitReason(suggestion);
                          if (errors.visitReason) setErrors({ ...errors, visitReason: '' });
                        }}
                        className={`text-xs px-2.5 py-1 rounded-md border transition-colors cursor-pointer ${
                          visitReason === suggestion 
                            ? 'bg-emerald-50 border-emerald-400 text-emerald-900 font-semibold' 
                            : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>

                  <textarea
                    id="visitReason"
                    name="visitReason"
                    rows={3}
                    value={visitReason}
                    onChange={(e) => {
                      setVisitReason(e.target.value);
                      if (errors.visitReason) setErrors({ ...errors, visitReason: '' });
                    }}
                    placeholder="Briefly state symptoms, follow-up purpose, or the primary healthcare topic you wish to discuss..."
                    aria-required="true"
                    aria-invalid={!!errors.visitReason}
                    className={`w-full px-4 py-3 rounded-xl border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-colors ${
                      errors.visitReason 
                        ? 'border-red-400 focus:ring-red-300 bg-red-50/30' 
                        : 'border-slate-300 focus:border-emerald-700 focus:ring-emerald-100'
                    }`}
                  />
                  {errors.visitReason && (
                    <p className="mt-1 text-xs text-red-600 flex items-center gap-1 font-medium">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.visitReason}</span>
                    </p>
                  )}
                </div>

                {/* Field: Additional Message (Optional) */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label 
                      htmlFor="additionalMessage"
                      className="block text-xs font-bold uppercase tracking-wider text-slate-700"
                    >
                      Additional Message or Notes
                    </label>
                    <span className="text-[11px] font-medium text-slate-400">Optional</span>
                  </div>
                  <textarea
                    id="additionalMessage"
                    name="additionalMessage"
                    rows={2}
                    value={additionalMessage}
                    onChange={(e) => setAdditionalMessage(e.target.value)}
                    placeholder="Any specific requests, accessibility assistance, or extra details for the reception team..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100 transition-colors"
                  />
                </div>

              </div>

              {/* SECTION 4: Submission & Protocol Summary */}
              <div className="pt-4 border-t border-slate-100 space-y-4">
                
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1.5">
                  <p className="font-semibold text-slate-900">
                    How We Handle Your Request:
                  </p>
                  <p>
                    • We do not charge fees online or request payment during booking.
                  </p>
                  <p>
                    • Your appointment is not finalized until our reception staff calls you at your provided telephone number.
                  </p>
                  <p>
                    • If your requested time slot is filled, our clinical team will arrange an alternative consultation slot that fits your day.
                  </p>
                </div>

                {/* Prominent Submission Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 rounded-xl bg-emerald-800 hover:bg-emerald-700 active:bg-emerald-900 disabled:bg-slate-400 text-white font-semibold text-base shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Transmitting Request to Winnie’s Clinic...</span>
                    </>
                  ) : (
                    <>
                      <Calendar className="w-5 h-5 text-emerald-200" />
                      <span>Submit Appointment Request</span>
                    </>
                  )}
                </button>

                <div className="text-center">
                  <p className="text-[11px] text-slate-500">
                    By submitting, your details will be delivered securely to Winnie’s Clinic, Okigwe for appointment coordination.
                  </p>
                </div>

              </div>

            </form>

            {/* Direct Telephone Alternative */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <h3 className="font-display text-base font-bold text-slate-900">
                  Prefer to Book Directly by Phone?
                </h3>
                <p className="text-xs text-slate-600">
                  You can call our reception desk directly during clinic hours for instant scheduling assistance.
                </p>
              </div>

              <a
                href="tel:+2348037392730"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-emerald-900 text-white text-xs font-semibold transition-colors shrink-0 cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>Call +234-8037-3927-30</span>
              </a>
            </div>

          </div>
        )}

      </main>

    </div>
  );
};
