import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle, 
  ExternalLink,
  MessageSquare,
  Loader2,
  AlertCircle
} from 'lucide-react';

const FORMSPREE_CONTACT_ENDPOINT = 'https://formspree.io/f/mwlldkbv';

export const ContactLocationSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    message: '',
  });
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [submittedName, setSubmittedName] = useState<string>('');
  const [submittedContact, setSubmittedContact] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    const trimmedName = formData.name.trim();
    const trimmedContact = formData.contact.trim();
    const trimmedMessage = formData.message.trim();

    if (!trimmedName || !trimmedContact || !trimmedMessage) {
      setSubmitError('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);

    try {
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedContact);

      const response = await fetch(FORMSPREE_CONTACT_ENDPOINT, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: trimmedName,
          "Full Name": trimmedName,
          contact: trimmedContact,
          "Contact Info": trimmedContact,
          email: isEmail ? trimmedContact : undefined,
          _replyto: isEmail ? trimmedContact : undefined,
          phone: !isEmail ? trimmedContact : undefined,
          subject: 'Patient Relations Inquiry (Homepage)',
          message: trimmedMessage,
          _subject: `Patient Relations Inquiry from ${trimmedName}`,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        const errorMsg = Array.isArray(data.errors) 
          ? data.errors.map((err: any) => err.message).join(', ')
          : (data.error || 'Unable to submit your message. Please try again.');
        throw new Error(errorMsg);
      }

      setSubmittedName(trimmedName);
      setSubmittedContact(trimmedContact);
      setFormSubmitted(true);
      setFormData({ name: '', contact: '', message: '' });
    } catch (err: any) {
      console.error('Contact inquiry submission failed:', err);
      setSubmitError(
        err.message || 'Transmission failed. Please check your network or call +234-8037-3927-30 directly.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section 
      id="contact" 
      className="py-20 lg:py-28 bg-slate-50 border-t border-slate-200/90 scroll-mt-20"
      aria-labelledby="contact-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="max-w-2xl mb-12 lg:mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs font-semibold uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5" />
            <span>Contact & Location</span>
          </div>

          <h2 
            id="contact-heading"
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-[1.18]"
          >
            We're Here When You Need Us.
          </h2>

          <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            Conveniently located at Holy Ghost Bomb Junction, Umuchima, Okigwe, Imo State. Reach our patient relations team for inquiries, appointment bookings, or acute medical support.
          </p>
        </div>

        {/* Refined Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Left Column: Verified Contact Details & Direct Inquiry (6 cols on lg) */}
          <div className="lg:col-span-6 space-y-8">
            
            {/* Contact Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Emergency Hotline Card */}
              <div className="p-5 rounded-xl bg-white border border-emerald-200 shadow-xs relative overflow-hidden">
                <div className="absolute top-0 right-0 w-2 h-full bg-emerald-700" />
                <div className="flex items-center gap-2 text-emerald-800 font-semibold text-xs mb-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                  <span>Acute Emergency (24/7)</span>
                </div>
                <a 
                  href="tel:+2348037392730" 
                  className="font-display text-base sm:text-lg font-bold text-slate-900 hover:text-emerald-800 transition-colors block"
                >
                  +234-8037-3927-30
                </a>
                <p className="text-[11px] text-slate-500 mt-1">Always available for urgent attention</p>
              </div>

              {/* General Appointments Card */}
              <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs">
                <div className="flex items-center gap-2 text-slate-600 font-semibold text-xs mb-2">
                  <Phone className="w-3.5 h-3.5 text-emerald-700" />
                  <span>General Appointments</span>
                </div>
                <a 
                  href="tel:+2348037392730" 
                  className="font-display text-base sm:text-lg font-bold text-slate-900 hover:text-emerald-800 transition-colors block"
                >
                  +234-8037-3927-30
                </a>
                <p className="text-[11px] text-slate-500 mt-1">Mon – Sat: 7:30 AM – 8:00 PM</p>
              </div>

              {/* Physical Address Card */}
              <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs">
                <div className="flex items-center gap-2 text-slate-600 font-semibold text-xs mb-2">
                  <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Clinic Address</span>
                </div>
                <p className="text-sm font-semibold text-slate-900 leading-snug">
                  Holy Ghost Bomb Junction, Umuchima, Okigwe
                </p>
                <p className="text-[11px] text-slate-500 mt-1">Imo State, Nigeria</p>
              </div>

              {/* Official Email & WhatsApp Card */}
              <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs">
                <div className="flex items-center gap-2 text-slate-600 font-semibold text-xs mb-2">
                  <Mail className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Electronic Mail</span>
                </div>
                <a 
                  href="mailto:info@winniesclinic.com" 
                  className="text-sm font-semibold text-slate-900 hover:text-emerald-800 transition-colors block truncate"
                >
                  info@winniesclinic.com
                </a>
                <a
                  href="https://wa.me/2348037392730?text=Hello%20Winnie's%20Clinic,%20I%20would%20like%20to%20enquire%20about%20a%20consultation."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-emerald-800 font-semibold hover:underline mt-1"
                >
                  <MessageSquare className="w-3 h-3 text-emerald-600" />
                  <span>WhatsApp: +234-8037-3927-30</span>
                </a>
              </div>

            </div>

            {/* Direct Patient Relations Inquiry Form */}
            <div className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <h3 className="font-display text-lg font-bold text-slate-900 mb-1">
                Direct Patient Relations Inquiry
              </h3>
              <p className="text-xs text-slate-500 mb-5">
                Have a question regarding medical coverage, consultation hours, or specialist care? Send us a message.
              </p>

              {formSubmitted ? (
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-2 animate-in fade-in">
                  <div className="flex items-center gap-2 font-semibold text-sm">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Inquiry Received Successfully</span>
                  </div>
                  <p className="text-xs text-emerald-800 leading-relaxed">
                    Thank you, {submittedName}. Your message has been transmitted directly to our patient relations desk at Winnie’s Clinic. We will respond promptly via {submittedContact}.
                  </p>
                  <button
                    onClick={() => {
                      setFormSubmitted(false);
                      setSubmittedName('');
                      setSubmittedContact('');
                      setSubmitError(null);
                      setFormData({ name: '', contact: '', message: '' });
                    }}
                    className="text-xs font-semibold text-emerald-800 underline hover:text-emerald-950 pt-1 block cursor-pointer"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {submitError && (
                    <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                      <span>{submitError}</span>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Oluwaseun Adeleke"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Email Address or Phone Number *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. name@example.com or +234..."
                      value={formData.contact}
                      onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      How can our clinical team assist you? *
                    </label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Describe your inquiry, specialty consultation question, or scheduling requirement..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg shadow-xs transition-colors cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-white" />
                        <span>Sending to Clinic...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-emerald-200" />
                        <span>Send Message to Patient Relations</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

          </div>

          {/* Right Column: Google Maps Integration & Operating Schedule (6 cols on lg) */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Interactive Google Map Embed */}
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-white">
              <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-medium">
                  <MapPin className="w-4 h-4 text-emerald-400" />
                  <span>Holy Ghost Bomb Junction, Umuchima, Okigwe, Imo State</span>
                </div>
                <a
                  href="https://maps.google.com/?q=Holy+Ghost+Bomb+Junction+Umuchima+Okigwe+Imo+State+Nigeria"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-300 hover:text-white transition-colors"
                >
                  <span>Open in Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Embedded Map iframe for Okigwe, Imo State */}
              <div className="relative h-72 sm:h-80 w-full bg-slate-100">
                <iframe
                  title="Winnie's Clinic Okigwe Location Map"
                  src="https://maps.google.com/maps?q=Okigwe%2C%20Imo%20State%2C%20Nigeria&t=&z=14&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </div>

              {/* Map Footer: Directions and Parking Info */}
              <div className="p-4 bg-white border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
                <span>Dedicated on-site patient parking & wheelchair access</span>
                <a
                  href="https://maps.google.com/?q=Holy+Ghost+Bomb+Junction+Umuchima+Okigwe+Imo+State+Nigeria"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-semibold text-emerald-800 hover:text-emerald-950"
                >
                  <span>Get Driving Directions</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Operating Hours Summary */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-slate-900 font-semibold text-sm">
                <Clock className="w-4 h-4 text-emerald-700" />
                <span>Confirmed Operating Schedule</span>
              </div>

              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="text-slate-600">Outpatient General Consultations</span>
                  <span className="font-semibold text-slate-900">Mon – Sat: 7:30 AM – 8:00 PM</span>
                </div>

                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="text-slate-600">Specialist Appointments</span>
                  <span className="font-semibold text-slate-900">By Schedule (Mon – Sat)</span>
                </div>

                <div className="flex items-center justify-between text-emerald-900 font-medium">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                    <span>Acute Emergency & Triage</span>
                  </div>
                  <span className="font-bold text-emerald-800">Open 24 Hours / 7 Days</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
