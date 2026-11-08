import React, { useState } from 'react';
import { X, Calendar, Clock, User, Mail, Phone, CheckCircle2, FileText, AlertCircle, Loader2 } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedDoctorId?: string | null;
  preselectedDepartmentId?: string | null;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
}) => {
  const todayStr = new Date().toISOString().split('T')[0];

  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('09:00 AM');
  const [visitReason, setVisitReason] = useState('');
  const [additionalMessage, setAdditionalMessage] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  if (!isOpen) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!patientName.trim() || patientName.trim().length < 2) {
      errs.patientName = 'Please enter patient full name.';
    }
    const cleanPhone = patientPhone.replace(/[\s\-\(\)]/g, '');
    if (!patientPhone.trim() || cleanPhone.length < 7) {
      errs.patientPhone = 'Please provide a valid phone number.';
    }
    if (patientEmail.trim()) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(patientEmail.trim())) {
        errs.patientEmail = 'Please enter a valid email address.';
      }
    }
    if (!preferredDate) {
      errs.preferredDate = 'Please select a preferred date.';
    } else if (preferredDate < todayStr) {
      errs.preferredDate = 'Date cannot be in the past.';
    }
    if (!preferredTime) {
      errs.preferredTime = 'Please select a preferred time.';
    }
    if (!visitReason.trim()) {
      errs.visitReason = 'Please describe your reason for visit.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    if (!validate()) return;

    setIsSubmitting(true);
    const refCode = `WIN-APT-${Math.floor(100000 + Math.random() * 900000)}`;

    const formspreePayload = {
      name: patientName.trim(),
      "Patient Name": patientName.trim(),
      patientName: patientName.trim(),
      phone: patientPhone.trim(),
      "Phone Number": patientPhone.trim(),
      patientPhone: patientPhone.trim(),
      email: patientEmail.trim() || undefined,
      _replyto: patientEmail.trim() || undefined,
      patientEmail: patientEmail.trim() || 'Not provided',
      preferredDate,
      "Preferred Appointment Date": preferredDate,
      preferredTime,
      "Preferred Appointment Time": preferredTime,
      service: visitReason.trim(),
      visitReason: visitReason.trim(),
      "Reason for Visit / Service": visitReason.trim(),
      additionalMessage: additionalMessage.trim() || undefined,
      "Additional Message": additionalMessage.trim() || 'None provided',
      referenceNumber: refCode,
      _subject: `New Appointment Booking Request (Quick Modal): ${patientName.trim()} (${preferredDate} @ ${preferredTime})`,
    };

    try {
      const res = await fetch('https://formspree.io/f/xoeeoqwa', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formspreePayload),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        const errorMsg = Array.isArray(data.errors)
          ? data.errors.map((e: any) => e.message).join(', ')
          : (data.error || 'Failed to submit request.');
        throw new Error(errorMsg);
      }

      // Also persist to local /api/appointments if available (non-blocking)
      fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patientName: patientName.trim(),
          patientPhone: patientPhone.trim(),
          patientEmail: patientEmail.trim() || null,
          preferredDate,
          preferredTime,
          visitReason: visitReason.trim(),
          additionalMessage: additionalMessage.trim() || null,
        }),
      }).catch(() => {});

      setSubmittedRef(refCode);

      // Clear the form fields after successful submission
      setPatientName('');
      setPatientPhone('');
      setPatientEmail('');
      setPreferredDate('');
      setVisitReason('');
      setAdditionalMessage('');
      setErrors({});
    } catch (err: any) {
      setServerError(err.message || 'Error transmitting appointment request to clinic.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseModal = () => {
    setSubmittedRef(null);
    setPatientName('');
    setPatientPhone('');
    setPatientEmail('');
    setPreferredDate('');
    setVisitReason('');
    setAdditionalMessage('');
    setErrors({});
    setServerError(null);
    onClose();
  };

  return (
    <div 
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4"
    >
      <div className="bg-white rounded-2xl max-w-xl w-full border border-slate-200 shadow-2xl overflow-hidden relative">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-900 text-white">
          <div>
            <span className="text-[10px] font-bold tracking-widest text-emerald-400 uppercase block">
              Winnie's Clinic, Okigwe
            </span>
            <h3 className="font-display text-lg font-bold">
              {submittedRef ? 'Request Logged' : 'Book an Appointment'}
            </h3>
          </div>
          <button 
            onClick={handleCloseModal}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {submittedRef ? (
            <div className="space-y-5 text-center py-4">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
                  Request Received — Awaiting Confirmation
                </span>
                <h4 className="font-display text-xl font-bold text-slate-900 mt-2">
                  Thank You, {patientName}
                </h4>
                <p className="text-xs text-slate-600 max-w-md mx-auto">
                  Your appointment request has been delivered to Winnie’s Clinic. Our reception team will call or SMS you at <strong>{patientPhone}</strong> to confirm your consultation time.
                </p>
                <p className="font-mono text-xs font-bold text-emerald-800 mt-2">
                  Ref: {submittedRef}
                </p>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleCloseModal}
                  className="px-6 py-2.5 rounded-xl bg-emerald-800 text-white text-xs font-semibold hover:bg-emerald-700 transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="p-3 bg-emerald-50 border border-emerald-200/80 rounded-xl text-xs text-emerald-950">
                <strong>Please note:</strong> This form submits an appointment request. Our clinic desk will review availability and call you directly to confirm.
              </div>

              {serverError && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-900 text-xs rounded-xl flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{serverError}</span>
                </div>
              )}

              {/* Name */}
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                  Patient Full Name *
                </label>
                <input
                  type="text"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  placeholder="Full name"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-emerald-700"
                />
                {errors.patientName && <p className="text-xs text-red-600 mt-0.5">{errors.patientName}</p>}
              </div>

              {/* Phone & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={patientPhone}
                    onChange={(e) => setPatientPhone(e.target.value)}
                    placeholder="e.g. 0803 123 4567"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-emerald-700"
                  />
                  {errors.patientPhone && <p className="text-xs text-red-600 mt-0.5">{errors.patientPhone}</p>}
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-xs font-bold uppercase text-slate-700">
                      Email Address
                    </label>
                    <span className="text-[10px] text-slate-400">Optional</span>
                  </div>
                  <input
                    type="email"
                    value={patientEmail}
                    onChange={(e) => setPatientEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-emerald-700"
                  />
                  {errors.patientEmail && <p className="text-xs text-red-600 mt-0.5">{errors.patientEmail}</p>}
                </div>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    min={todayStr}
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-emerald-700"
                  />
                  {errors.preferredDate && <p className="text-xs text-red-600 mt-0.5">{errors.preferredDate}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    Preferred Time *
                  </label>
                  <select
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white focus:outline-none focus:border-emerald-700"
                  >
                    <option value="08:30 AM">08:30 AM</option>
                    <option value="09:00 AM">09:00 AM</option>
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="11:00 AM">11:00 AM</option>
                    <option value="12:00 PM">12:00 PM</option>
                    <option value="02:00 PM">02:00 PM</option>
                    <option value="04:00 PM">04:00 PM</option>
                    <option value="05:00 PM">05:00 PM</option>
                  </select>
                </div>
              </div>

              {/* Reason */}
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                  Reason for Visit / Concern *
                </label>
                <textarea
                  rows={2}
                  value={visitReason}
                  onChange={(e) => setVisitReason(e.target.value)}
                  placeholder="Primary reason for appointment request..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-emerald-700"
                />
                {errors.visitReason && <p className="text-xs text-red-600 mt-0.5">{errors.visitReason}</p>}
              </div>

              {/* Additional message */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-xs font-bold uppercase text-slate-700">
                    Additional Message
                  </label>
                  <span className="text-[10px] text-slate-400">Optional</span>
                </div>
                <input
                  type="text"
                  value={additionalMessage}
                  onChange={(e) => setAdditionalMessage(e.target.value)}
                  placeholder="Any mobility or timing notes..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-emerald-700"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:bg-slate-400"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Transmitting...</span>
                    </>
                  ) : (
                    <span>Submit Appointment Request</span>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
