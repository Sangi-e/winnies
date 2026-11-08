import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle2, 
  ExternalLink,
  MessageSquare,
  AlertCircle,
  ShieldCheck,
  Calendar,
  ArrowRight,
  Info,
  Building2,
  Car,
  Accessibility,
  HeartPulse,
  RotateCcw
} from 'lucide-react';
import { CLINIC_IMAGES, CLINIC_INFO } from '../data/clinicData';
import { validateContactForm, ContactFormInput, ValidationErrors } from '../utils/clinicLogic';

interface ContactUsPageProps {
  onOpenBooking: () => void;
  onExploreServices: () => void;
  onNavigateHome: () => void;
  onOpenPhotoModal?: (imageSrc: string, title: string, caption: string) => void;
}

export const ContactUsPage: React.FC<ContactUsPageProps> = ({
  onOpenBooking,
  onExploreServices,
  onNavigateHome,
  onOpenPhotoModal,
}) => {
  const FORMSPREE_CONTACT_ENDPOINT = 'https://formspree.io/f/mwlldkbv';

  // Form State
  const [formData, setFormData] = useState<ContactFormInput>({
    name: '',
    email: '',
    phone: '',
    subject: 'General Medical Inquiry',
    message: '',
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [submittedSnapshot, setSubmittedSnapshot] = useState<ContactFormInput | null>(null);
  const [submissionResult, setSubmissionResult] = useState<{
    submitted: boolean;
    referenceCode: string;
    timestamp: string;
  } | null>(null);

  // Subject options
  const subjectOptions = [
    'General Medical Inquiry',
    'Doctor Consultation & Appointment',
    'Maternity & Childbirth Care',
    'Surgical Services & Procedures',
    'Laboratory & Diagnostic Testing',
    'Medication & Prescription Inquiry',
    'Visiting Hours & Patient Inquiries',
    'Other Patient Support Enquiry'
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    // Clear specific field error when user types
    if (errors[name as keyof ValidationErrors]) {
      setErrors(prev => {
        const updated = { ...prev };
        delete updated[name as keyof ValidationErrors];
        return updated;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    const validation = validateContactForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const response = await fetch(FORMSPREE_CONTACT_ENDPOINT, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          "Full Name": formData.name.trim(),
          email: formData.email.trim(),
          _replyto: formData.email.trim(),
          phone: formData.phone.trim(),
          "Phone Number": formData.phone.trim(),
          subject: formData.subject,
          message: formData.message.trim(),
          _subject: `[${formData.subject}] Enquiry from ${formData.name.trim()}`,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        const errorMsg = Array.isArray(data.errors) 
          ? data.errors.map((err: any) => err.message).join(', ')
          : (data.error || 'Failed to submit contact enquiry. Please try again.');
        throw new Error(errorMsg);
      }

      const refCode = `WIN-ENQ-${Math.floor(100000 + Math.random() * 900000)}`;
      const timestamp = new Date().toLocaleString('en-GB', {
        dateStyle: 'medium',
        timeStyle: 'short',
      });

      // Save snapshot for summary display
      setSubmittedSnapshot({ ...formData });

      // Clear the form fields after successful submission
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: 'General Medical Inquiry',
        message: '',
      });

      setSubmissionResult({
        submitted: true,
        referenceCode: refCode,
        timestamp,
      });
    } catch (err: any) {
      console.error('Contact form submission error:', err);
      setServerError(
        err.message || 'We were unable to deliver your message. Please check your connection or contact us directly at info@winniesclinic.com.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: 'General Medical Inquiry',
      message: '',
    });
    setErrors({});
    setServerError(null);
    setSubmittedSnapshot(null);
    setSubmissionResult(null);
  };

  // Pre-fill links for direct external transmission
  const mailtoBody = encodeURIComponent(
    `Full Name: ${formData.name}\n` +
    `Phone Number: ${formData.phone}\n` +
    `Email: ${formData.email}\n` +
    `Subject: ${formData.subject}\n\n` +
    `Message:\n${formData.message}\n\n` +
    `Reference: ${submissionResult?.referenceCode || 'New Inquiry'}`
  );

  const mailtoLink = `mailto:${CLINIC_INFO.email}?subject=${encodeURIComponent(
    `[${formData.subject}] Enquiry from ${formData.name || 'Patient'}`
  )}&body=${mailtoBody}`;

  const generalWhatsAppLink = "https://wa.me/2348037392730?text=Hello%20Winnie's%20Clinic,%20I%20would%20like%20to%20enquire%20about%20your%20medical%20services.";

  const whatsappText = encodeURIComponent(
    `Hello Winnie's Clinic,\n` +
    `My name is ${formData.name || 'Patient'}.\n` +
    `Subject: ${formData.subject}\n` +
    `Phone: ${formData.phone}\n` +
    `Message: ${formData.message}`
  );

  const whatsappLink = `https://wa.me/2348037392730?text=${whatsappText}`;

  return (
    <div className="bg-white text-slate-900 min-h-screen relative">
      
      {/* -------------------------------------------------------------
          1. CONTACT PAGE HERO SECTION
          - Prominent healthcare photograph (modern clinic reception)
          - Subtle green & slate overlay
          - Heading: "We're Here When You Need Us."
          - Supporting text introducing the clinic in a warm, professional tone
      -------------------------------------------------------------- */}
      <section className="relative bg-slate-950 text-white overflow-hidden" aria-labelledby="contact-hero-heading">
        {/* Background Reception & Healthcare Environment Photograph */}
        <div className="absolute inset-0 z-0">
          <img
            src={CLINIC_IMAGES.modernReception}
            alt="Welcoming reception and patient arrival environment at Winnie's Clinic"
            className="w-full h-full object-cover object-center brightness-55"
            referrerPolicy="no-referrer"
          />
          {/* Refined forest-green and dark scrim overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-emerald-950/80 to-slate-950/70" />
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
            <span className="text-slate-300" aria-current="page">Contact Us</span>
          </nav>

          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400" aria-hidden="true" />
              <span>Patient Relations & Visitor Guidance</span>
            </div>

            <h1 
              id="contact-hero-heading"
              className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.12]"
            >
              We're Here When You Need Us.
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-slate-200 font-normal leading-relaxed">
              Whether you have a question, need assistance or wish to make an enquiry, Winnie’s Clinic is ready to hear from you.
            </p>

            {/* Quick verified summary pills */}
            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-slate-200">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-xs border border-white/15">
                <MapPin className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
                <span>Holy Ghost Bomb Junction, Umuchima, Okigwe</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-xs border border-white/15">
                <Phone className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
                <a href="tel:+2348037392730" className="hover:text-emerald-300 transition-colors font-medium">
                  +234-8037-3927-30
                </a>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>24/7 Acute Care Ready</span>
              </div>
            </div>

            {/* Direct WhatsApp and Telephone Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href={generalWhatsAppLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-emerald-950" />
                <span>Chat on WhatsApp (+234-8037-3927-30)</span>
              </a>
              <a
                href="tel:+2348037392730"
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm border border-white/20 backdrop-blur-xs transition-colors"
              >
                <Phone className="w-4 h-4 text-emerald-300" />
                <span>Call Clinic Directly</span>
              </a>
            </div>

            {/* Photo attribution / Lightbox preview button */}
            {onOpenPhotoModal && (
              <div className="pt-2">
                <button
                  onClick={() => onOpenPhotoModal(
                    CLINIC_IMAGES.modernReception,
                    "Winnie's Clinic Reception & Care Environment",
                    "A view of the patient arrival and reception environment at Winnie's Clinic, designed with clean architecture and welcoming hospitality."
                  )}
                  className="text-xs text-slate-400 hover:text-emerald-300 underline underline-offset-4 transition-colors cursor-pointer"
                >
                  View reception photography in high resolution
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          2. CONTACT INFORMATION SECTION & SEND US A MESSAGE FORM
          - Two-column grid with verified contact points and functional form
      -------------------------------------------------------------- */}
      <section className="py-20 lg:py-28 bg-slate-50 border-b border-slate-200/90" aria-labelledby="contact-info-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
            
            {/* LEFT COLUMN (5 cols on lg): Verified Contact Information */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-emerald-100/70 border border-emerald-200 text-emerald-900 text-xs font-semibold uppercase tracking-wider mb-3">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Verified Clinic Information</span>
                </div>
                <h2 
                  id="contact-info-heading"
                  className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900"
                >
                  Direct Contact Channels
                </h2>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                  Connect with our administrative desk, clinical triage, or patient relations officers through our official channels.
                </p>
              </div>

              {/* Information Cards Stack */}
              <div className="space-y-4">
                
                {/* 1. Our Location Card */}
                <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-emerald-300/60 transition-colors">
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0 border border-emerald-100">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div className="space-y-1 text-sm">
                      <h3 className="font-semibold text-slate-900 text-base">Our Location</h3>
                      <p className="font-medium text-slate-800 leading-snug">
                        {CLINIC_INFO.address}
                      </p>
                      <p className="text-xs text-slate-500 pt-1">
                        Landmark: Holy Ghost Bomb Junction, Umuchima, Okigwe, Imo State.
                      </p>
                      <a 
                        href="#location-map"
                        className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-800 hover:text-emerald-950 pt-1.5 group"
                      >
                        <span>View map & arrival directions below</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* 2. WhatsApp Direct Chat Card */}
                <div className="p-5 sm:p-6 rounded-2xl bg-emerald-50/70 border border-emerald-200/90 shadow-xs hover:border-emerald-300 transition-colors">
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <div className="space-y-1.5 text-sm flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-slate-900 text-base">WhatsApp Desk</h3>
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                          Direct Chat
                        </span>
                      </div>
                      <p className="text-xs text-slate-600">
                        Chat directly with our patient relations desk on WhatsApp for fast inquiries and clinic directions:
                      </p>
                      <a 
                        href={generalWhatsAppLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-display text-lg font-bold text-emerald-950 hover:text-emerald-800 transition-colors block pt-0.5"
                      >
                        +234-8037-3927-30
                      </a>
                      <div className="pt-2">
                        <a 
                          href={generalWhatsAppLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
                        >
                          <MessageSquare className="w-4 h-4" />
                          <span>Chat on WhatsApp (+234-8037-3927-30)</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. Call Us Card */}
                <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-emerald-300/60 transition-colors">
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0 border border-emerald-100">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div className="space-y-1 text-sm">
                      <h3 className="font-semibold text-slate-900 text-base">Call Clinic Line</h3>
                      <p className="text-xs text-slate-500">
                        Official clinic telephone line for general inquiries and booking:
                      </p>
                      <a 
                        href="tel:+2348037392730"
                        className="font-display text-lg font-bold text-slate-900 hover:text-emerald-800 transition-colors block pt-0.5"
                      >
                        {CLINIC_INFO.phone}
                      </a>
                      <p className="text-xs text-slate-400 pt-1">
                        Mon – Sat: 7:30 AM – 8:00 PM | 24/7 Emergency
                      </p>
                    </div>
                  </div>
                </div>

                {/* 3. Email Us Card */}
                <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-emerald-300/60 transition-colors">
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0 border border-emerald-100">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div className="space-y-1 text-sm">
                      <h3 className="font-semibold text-slate-900 text-base">Email Us</h3>
                      <p className="text-xs text-slate-500">
                        For administrative communications, medical records, or formal correspondence:
                      </p>
                      <a 
                        href={`mailto:${CLINIC_INFO.email}`}
                        className="font-semibold text-slate-900 hover:text-emerald-800 transition-colors block pt-0.5 break-all"
                      >
                        {CLINIC_INFO.email}
                      </a>
                    </div>
                  </div>
                </div>

                {/* 4. Opening Hours Card */}
                <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center shrink-0 border border-slate-200">
                      <Clock className="w-5 h-5 text-emerald-800" />
                    </div>
                    <div className="space-y-2 text-sm w-full">
                      <h3 className="font-semibold text-slate-900 text-base">Opening Hours</h3>
                      <div className="space-y-1.5 text-xs">
                        <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
                          <span className="text-slate-600 font-medium">Outpatient Consultations:</span>
                          <span className="font-semibold text-slate-900">Mon – Sat (7:30 AM – 8:00 PM)</span>
                        </div>
                        <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
                          <span className="text-slate-600 font-medium">Specialist Clinics:</span>
                          <span className="font-semibold text-slate-900">By Appointment</span>
                        </div>
                        <div className="flex items-center justify-between text-emerald-900 font-semibold pt-0.5">
                          <span className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                            <span>Inpatient & Emergency:</span>
                          </span>
                          <span>Open 24/7 All Days</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 5. Emergency Information Callout */}
                <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-emerald-900 to-slate-900 text-white shadow-md relative overflow-hidden">
                  <div className="relative z-10 space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                      <span className="text-xs uppercase font-bold tracking-wider text-emerald-300">
                        Emergency Information
                      </span>
                    </div>

                    <h3 className="font-display text-lg font-bold text-white">
                      Confirmed 24/7 Acute Emergency Triage
                    </h3>

                    <p className="text-xs text-emerald-100/90 leading-relaxed">
                      Winnie’s Clinic provides round-the-clock acute medical evaluation, vital sign stabilization, and urgent clinical triage at Holy Ghost Bomb Junction, Umuchima, Okigwe. Walk-ins requiring urgent care are prioritized immediately.
                    </p>

                    <div className="pt-1 flex flex-wrap items-center gap-3">
                      <a
                        href="tel:+2348037392730"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-400 text-emerald-950 font-bold text-xs hover:bg-emerald-300 transition-colors shadow-sm"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>Call Emergency: +234-8037-3927-30</span>
                      </a>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* RIGHT COLUMN (7 cols on lg): Send Us a Message Form */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 lg:p-10 shadow-sm">
                
                <div className="mb-8 space-y-2">
                  <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-800">
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Us a Message</span>
                  </div>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                    Patient & General Enquiries
                  </h2>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Have a medical question, consultation request, or general inquiry? Fill in the details below and our patient care team will attend to you.
                  </p>
                </div>

                {/* Form or Submission Feedback */}
                {!submissionResult ? (
                  <form onSubmit={handleSubmit} noValidate className="space-y-6">
                    
                    {/* Server Error Alert */}
                    {serverError && (
                      <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2.5">
                        <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold">Unable to Deliver Message</p>
                          <p className="mt-0.5">{serverError}</p>
                        </div>
                      </div>
                    )}

                    {/* General Validation Error Alert */}
                    {Object.keys(errors).length > 0 && (
                      <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2.5">
                        <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold">Please check the required fields below:</p>
                          <ul className="list-disc list-inside mt-1 space-y-0.5">
                            {Object.values(errors).map((err, idx) => (
                              <li key={idx}>{err}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      
                      {/* Full Name */}
                      <div className="space-y-1.5">
                        <label htmlFor="name" className="block text-xs font-semibold text-slate-700">
                          Full Name <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="e.g. Chinelo Okeke"
                          className={`w-full px-4 py-3 rounded-xl border text-sm text-slate-900 placeholder:text-slate-400 bg-white focus:outline-none focus:ring-2 transition-colors ${
                            errors.name 
                              ? 'border-rose-300 focus:ring-rose-500 bg-rose-50/30' 
                              : 'border-slate-300 focus:ring-emerald-700 focus:border-emerald-700'
                          }`}
                          required
                        />
                        {errors.name && (
                          <p className="text-xs text-rose-600">{errors.name}</p>
                        )}
                      </div>

                      {/* Email Address */}
                      <div className="space-y-1.5">
                        <label htmlFor="email" className="block text-xs font-semibold text-slate-700">
                          Email Address <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="e.g. chinelo@example.com"
                          className={`w-full px-4 py-3 rounded-xl border text-sm text-slate-900 placeholder:text-slate-400 bg-white focus:outline-none focus:ring-2 transition-colors ${
                            errors.email 
                              ? 'border-rose-300 focus:ring-rose-500 bg-rose-50/30' 
                              : 'border-slate-300 focus:ring-emerald-700 focus:border-emerald-700'
                          }`}
                          required
                        />
                        {errors.email && (
                          <p className="text-xs text-rose-600">{errors.email}</p>
                        )}
                      </div>

                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      
                      {/* Phone Number */}
                      <div className="space-y-1.5">
                        <label htmlFor="phone" className="block text-xs font-semibold text-slate-700">
                          Phone Number <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="e.g. +234-8037-3927-30"
                          className={`w-full px-4 py-3 rounded-xl border text-sm text-slate-900 placeholder:text-slate-400 bg-white focus:outline-none focus:ring-2 transition-colors ${
                            errors.phone 
                              ? 'border-rose-300 focus:ring-rose-500 bg-rose-50/30' 
                              : 'border-slate-300 focus:ring-emerald-700 focus:border-emerald-700'
                          }`}
                          required
                        />
                        {errors.phone && (
                          <p className="text-xs text-rose-600">{errors.phone}</p>
                        )}
                      </div>

                      {/* Subject Selection */}
                      <div className="space-y-1.5">
                        <label htmlFor="subject" className="block text-xs font-semibold text-slate-700">
                          Subject <span className="text-rose-500">*</span>
                        </label>
                        <select
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 rounded-xl border text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 transition-colors ${
                            errors.subject 
                              ? 'border-rose-300 focus:ring-rose-500 bg-rose-50/30' 
                              : 'border-slate-300 focus:ring-emerald-700 focus:border-emerald-700'
                          }`}
                          required
                        >
                          {subjectOptions.map((opt, idx) => (
                            <option key={idx} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                        {errors.subject && (
                          <p className="text-xs text-rose-600">{errors.subject}</p>
                        )}
                      </div>

                    </div>

                    {/* Message Area */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label htmlFor="message" className="block text-xs font-semibold text-slate-700">
                          Your Message <span className="text-rose-500">*</span>
                        </label>
                        <span className="text-[11px] text-slate-400">
                          {formData.message.length} characters
                        </span>
                      </div>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Please describe how we can assist you, your preferred appointment timing, or any questions for our clinic team..."
                        className={`w-full px-4 py-3 rounded-xl border text-sm text-slate-900 placeholder:text-slate-400 bg-white focus:outline-none focus:ring-2 transition-colors resize-y ${
                          errors.message 
                            ? 'border-rose-300 focus:ring-rose-500 bg-rose-50/30' 
                            : 'border-slate-300 focus:ring-emerald-700 focus:border-emerald-700'
                        }`}
                        required
                      />
                      {errors.message && (
                        <p className="text-xs text-rose-600">{errors.message}</p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 text-sm font-bold text-white bg-emerald-800 hover:bg-emerald-900 active:bg-emerald-950 rounded-xl shadow-sm transition-all cursor-pointer disabled:opacity-70 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:ring-offset-2"
                      >
                        {isSubmitting ? (
                          <>
                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span>Processing Message...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            <span>Send Message</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Privacy & Response Expectation Note */}
                    <p className="text-xs text-slate-500 leading-normal pt-1">
                      Your personal contact information is handled confidentially and used solely by Winnie’s Clinic to respond to your enquiry. For acute medical emergencies, please do not wait for email responses—use our 24/7 hotline at <a href="tel:+2348037392730" className="font-semibold text-emerald-800 underline">+234-8037-3927-30</a>.
                    </p>

                  </form>
                ) : (
                  /* Submission Feedback & Explicit Integration Transparency */
                  <div className="space-y-6 animate-in fade-in duration-300">
                    <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                          <CheckCircle2 className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="font-display text-lg font-bold text-emerald-950">
                            Enquiry Transmitted to Winnie’s Clinic
                          </h3>
                          <p className="text-xs text-emerald-800">
                            Reference: <span className="font-mono font-bold">{submissionResult.referenceCode}</span> · {submissionResult.timestamp}
                          </p>
                        </div>
                      </div>

                      {/* Delivery Confirmation */}
                      <div className="p-3.5 rounded-xl bg-white/90 border border-emerald-200/80 text-xs text-slate-700 space-y-1.5">
                        <div className="flex items-center gap-1.5 font-semibold text-slate-900">
                          <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                          <span>Delivered via Formspree Patient Relations Channel</span>
                        </div>
                        <p className="leading-relaxed">
                          Your enquiry has been successfully delivered to our administrative and clinical desk. Our patient coordinator will review your request and reach out directly.
                        </p>
                      </div>

                      {/* Direct External Options */}
                      <div className="pt-2 flex flex-wrap gap-3">
                        <a
                          href={mailtoLink}
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs transition-colors shadow-xs"
                        >
                          <Mail className="w-4 h-4" />
                          <span>Email Direct: info@winniesclinic.com</span>
                        </a>

                        <a
                          href={whatsappLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-900 font-semibold text-xs border border-emerald-300 transition-colors"
                        >
                          <MessageSquare className="w-4 h-4 text-emerald-700" />
                          <span>WhatsApp Desk: +234-8037-3927-30</span>
                        </a>
                      </div>
                    </div>

                    {/* Summary of Submitted Data */}
                    {submittedSnapshot && (
                      <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-2">
                        <div className="font-semibold text-slate-900 text-sm">Summary of Your Enquiry:</div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                          <div><span className="font-medium text-slate-500">Name:</span> {submittedSnapshot.name}</div>
                          <div><span className="font-medium text-slate-500">Phone:</span> {submittedSnapshot.phone}</div>
                          <div><span className="font-medium text-slate-500">Email:</span> {submittedSnapshot.email}</div>
                          <div><span className="font-medium text-slate-500">Subject:</span> {submittedSnapshot.subject}</div>
                        </div>
                        <div className="pt-1 border-t border-slate-200">
                          <span className="font-medium text-slate-500 block mb-1">Message:</span>
                          <p className="bg-white p-3 rounded-lg border border-slate-200 whitespace-pre-line text-slate-800">
                            {submittedSnapshot.message}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Reset Button */}
                    <div className="pt-2">
                      <button
                        onClick={handleResetForm}
                        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-emerald-800 transition-colors cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Compose another enquiry message</span>
                      </button>
                    </div>

                  </div>
                )}

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* -------------------------------------------------------------
          3. FIND OUR LOCATION SECTION
          - Embedded Google Map using the clinic's verified address
          - "Get Directions" link
          - Small supporting location description (landmarks, parking, access)
      -------------------------------------------------------------- */}
      <section id="location-map" className="py-20 lg:py-28 bg-white" aria-labelledby="find-location-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mb-12 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs font-semibold uppercase tracking-wider">
              <MapPin className="w-3.5 h-3.5" />
              <span>Map & Arrival Directions</span>
            </div>

            <h2 
              id="find-location-heading"
              className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-900"
            >
              Find Our Location
            </h2>

            <p className="text-base text-slate-600 font-normal leading-relaxed">
              Winnie’s Clinic is situated at Holy Ghost Bomb Junction in Umuchima, Okigwe, offering convenient accessibility for patients arriving across Imo State and neighbouring communities.
            </p>
          </div>

          {/* Location Details & Map Card */}
          <div className="rounded-3xl border border-slate-200/90 overflow-hidden bg-slate-50 shadow-sm">
            
            {/* Embedded Google Map Frame */}
            <div className="relative w-full h-80 sm:h-96 lg:h-[420px] bg-slate-100">
              <iframe
                title="Winnie's Clinic Verified Map Location"
                src="https://maps.google.com/maps?q=Holy%20Ghost%20Bomb%20Junction%2C%20Umuchima%2C%20Okigwe%2C%20Imo%20State%2C%20Nigeria&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>

            {/* Map Information & Directions Bar */}
            <div className="p-6 sm:p-8 bg-white border-t border-slate-200">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                
                {/* Physical address and landmarks */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-emerald-800 font-semibold text-xs uppercase tracking-wider">
                    <Building2 className="w-4 h-4" />
                    <span>Physical Facility Address</span>
                  </div>
                  <p className="font-display text-lg font-bold text-slate-900">
                    Holy Ghost Bomb Junction, Umuchima, Okigwe
                  </p>
                  <p className="text-xs text-slate-500">
                    Imo State, Nigeria · Main Access Road Intersection
                  </p>
                </div>

                {/* Get Directions Link Button */}
                <div className="shrink-0">
                  <a
                    href="https://maps.google.com/?q=Holy+Ghost+Bomb+Junction+Umuchima+Okigwe+Imo+State+Nigeria"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 active:bg-emerald-950 text-white font-semibold text-sm transition-colors shadow-xs"
                  >
                    <span>Get Directions in Google Maps</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

              </div>

              {/* Supporting Location Guidance Description */}
              <div className="mt-6 pt-6 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-600">
                <div className="flex items-start gap-2.5">
                  <Car className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-slate-900 block">Dedicated Patient Parking</span>
                    <span>Safe on-site vehicle parking for patients and visiting family members.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Accessibility className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-slate-900 block">Wheelchair & Step-Free Access</span>
                    <span>Ground-level entrances and ramp access to reception and consultation rooms.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <HeartPulse className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-slate-900 block">Acute Emergency Drop-Off</span>
                    <span>Direct vehicle drop-off bay for patients requiring urgent triage evaluation.</span>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* -------------------------------------------------------------
          4. FINAL CALL TO ACTION
          - Heading: "Your Health Matters to Us."
          - Supporting text: "Get in touch with Winnie’s Clinic for enquiries about our healthcare services and appointments."
          - Buttons: "Book an Appointment" & "Explore Our Services"
      -------------------------------------------------------------- */}
      <section className="py-20 lg:py-24 bg-slate-900 text-white relative overflow-hidden" aria-labelledby="contact-cta-heading">
        {/* Subtle background ambient glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-700/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-800/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-700/40 text-emerald-300 text-xs font-semibold uppercase tracking-wider">
            <HeartPulse className="w-3.5 h-3.5 text-emerald-400" />
            <span>Dedicated Patient Care</span>
          </div>

          <h2 
            id="contact-cta-heading"
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.18]"
          >
            Your Health Matters to Us.
          </h2>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
            Get in touch with Winnie’s Clinic for enquiries about our healthcare services and appointments.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onOpenBooking}
              className="inline-flex items-center gap-2.5 px-8 py-3.5 text-sm sm:text-base font-bold text-emerald-950 bg-emerald-400 hover:bg-emerald-300 active:bg-emerald-500 rounded-xl shadow-lg shadow-emerald-950/50 transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <Calendar className="w-5 h-5 text-emerald-950" strokeWidth={2.2} />
              <span>Book an Appointment</span>
            </button>

            <a
              href={generalWhatsAppLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 text-sm sm:text-base font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl shadow-md transition-all cursor-pointer"
            >
              <MessageSquare className="w-5 h-5" />
              <span>Chat on WhatsApp (+234-8037-3927-30)</span>
            </a>

            <button
              onClick={onExploreServices}
              className="inline-flex items-center gap-2 px-6 py-3.5 text-sm sm:text-base font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-colors cursor-pointer"
            >
              <span>Explore Our Services</span>
              <ArrowRight className="w-4 h-4 text-emerald-400" />
            </button>
          </div>

          {/* Quick contact reassurance */}
          <p className="text-xs text-slate-400 pt-3">
            Prefer direct speaking? Call our clinic desk at{' '}
            <a href="tel:+2348037392730" className="text-emerald-300 font-medium hover:underline">
              +234-8037-3927-30
            </a>
          </p>
        </div>
      </section>

      {/* Floating WhatsApp Quick Contact Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <a
          href={generalWhatsAppLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with Winnie's Clinic on WhatsApp"
          className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all cursor-pointer border border-emerald-400/40"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-200 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
          </span>
          <MessageSquare className="w-5 h-5 fill-white/20" />
          <span className="hidden sm:inline">WhatsApp Us:</span>
          <span>+234-8037-3927-30</span>
        </a>
      </div>

    </div>
  );
};
