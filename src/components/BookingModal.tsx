import React, { useState } from 'react';
import { X, Calendar, Clock, User, Mail, Phone, CheckCircle, FileText, Printer, Shield } from 'lucide-react';
import { DOCTORS, DEPARTMENTS, Doctor, Department } from '../data/clinicData';
import { generateAppointmentReference, getAvailableTimeSlots, formatCurrency } from '../utils/clinicLogic';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedDoctorId?: string | null;
  preselectedDepartmentId?: string | null;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preselectedDoctorId,
  preselectedDepartmentId,
}) => {
  const [selectedDeptId, setSelectedDeptId] = useState<string>(
    preselectedDepartmentId || (preselectedDoctorId ? DOCTORS.find(d => d.id === preselectedDoctorId)?.departmentId || 'cardiology' : 'cardiology')
  );

  const [selectedDoctorId, setSelectedDoctorId] = useState<string>(
    preselectedDoctorId || DOCTORS.find(d => d.departmentId === selectedDeptId)?.id || DOCTORS[0].id
  );

  const [date, setDate] = useState<string>(
    new Date(Date.now() + 86400000).toISOString().split('T')[0]
  );

  const [selectedSlot, setSelectedSlot] = useState<string>('10:00 AM');
  const [patientName, setPatientName] = useState<string>('');
  const [patientEmail, setPatientEmail] = useState<string>('');
  const [patientPhone, setPatientPhone] = useState<string>('');
  const [visitReason, setVisitReason] = useState<string>('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [bookingRef, setBookingRef] = useState<string>('');

  if (!isOpen) return null;

  const currentDoctor = DOCTORS.find(d => d.id === selectedDoctorId) || DOCTORS[0];
  const currentDept = DEPARTMENTS.find(d => d.id === selectedDeptId) || DEPARTMENTS[0];

  // Doctors belonging to the selected department
  const deptDoctors = DOCTORS.filter(d => d.departmentId === selectedDeptId);

  // Available slots for selected doctor
  const availableSlots = getAvailableTimeSlots(
    currentDoctor.availability || ['09:00 AM', '10:30 AM', '02:00 PM', '04:00 PM'],
    [] // No mock collision initially
  );

  const handleDepartmentChange = (deptId: string) => {
    setSelectedDeptId(deptId);
    const matchingDoc = DOCTORS.find(d => d.departmentId === deptId);
    if (matchingDoc) {
      setSelectedDoctorId(matchingDoc.id);
      setSelectedSlot(matchingDoc.availability[0] || '09:00 AM');
    }
  };

  const handleDoctorChange = (docId: string) => {
    setSelectedDoctorId(docId);
    const doc = DOCTORS.find(d => d.id === docId);
    if (doc && doc.availability.length > 0) {
      setSelectedSlot(doc.availability[0]);
    }
  };

  const validateForm = () => {
    const errs: Record<string, string> = {};
    if (!patientName.trim()) {
      errs.patientName = 'Please enter patient full name';
    }
    if (!patientPhone.trim() || patientPhone.trim().length < 8) {
      errs.patientPhone = 'Please provide a valid contact phone number';
    }
    if (!patientEmail.trim() || !patientEmail.includes('@')) {
      errs.patientEmail = 'Please provide a valid email address';
    }
    if (!selectedSlot) {
      errs.slot = 'Please select a consultation time slot';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const ref = generateAppointmentReference(selectedDeptId, date);
      setBookingRef(ref);
      setIsSubmitted(true);
    }
  };

  const resetAndClose = () => {
    setIsSubmitted(false);
    setPatientName('');
    setPatientEmail('');
    setPatientPhone('');
    setVisitReason('');
    setErrors({});
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
    >
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden relative">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-800">
              Winnie's Clinic · Outpatient Scheduling
            </span>
            <h3 id="booking-modal-title" className="font-display text-lg font-bold text-slate-900">
              {isSubmitted ? 'Appointment Confirmed' : 'Book In-Clinic Consultation'}
            </h3>
          </div>
          <button
            onClick={resetAndClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
            aria-label="Close booking modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {isSubmitted ? (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="flex items-start gap-4 p-4 bg-emerald-50 rounded-xl border border-emerald-200">
              <CheckCircle className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-display font-bold text-emerald-950 text-base">
                  Consultation Successfully Scheduled
                </h4>
                <p className="text-xs sm:text-sm text-emerald-900 mt-1">
                  We have registered your appointment in Winnie's Clinic electronic outpatient system. A confirmation SMS and email have been dispatched.
                </p>
              </div>
            </div>

            {/* Appointment Voucher Card */}
            <div className="bg-slate-50 rounded-xl border border-slate-200 p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-200">
                <div>
                  <span className="text-xs text-slate-500 uppercase tracking-wider block">Booking Reference</span>
                  <span className="font-mono text-base font-bold text-slate-900 tabular-nums">
                    {bookingRef}
                  </span>
                </div>
                <div className="text-right sm:text-right">
                  <span className="text-xs text-slate-500 uppercase tracking-wider block">Consultation Fee</span>
                  <span className="font-display text-base font-bold text-emerald-700 tabular-nums">
                    {formatCurrency(currentDoctor.consultationFee, 'USD')}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-slate-500 block">Attending Specialist</span>
                  <span className="font-semibold text-slate-900 text-sm">{currentDoctor.name}</span>
                  <span className="text-slate-600 block">{currentDoctor.role}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Department & Suite</span>
                  <span className="font-semibold text-slate-900 text-sm">{currentDept.name}</span>
                  <span className="text-slate-600 block">Plot 14 Victoria Island, Lagos</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Date & Time</span>
                  <span className="font-semibold text-slate-900 text-sm">
                    {date} at {selectedSlot}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block">Patient Registered</span>
                  <span className="font-semibold text-slate-900 text-sm">{patientName}</span>
                  <span className="text-slate-600 block">{patientPhone}</span>
                </div>
              </div>
            </div>

            {/* Arrival Instructions */}
            <div className="text-xs text-slate-600 space-y-1.5 p-4 bg-slate-100/70 rounded-xl">
              <span className="font-semibold text-slate-900 block">Pre-Visit Guidance:</span>
              <p>• Please arrive 15 minutes before {selectedSlot} for vitals recording at the triage station.</p>
              <p>• Bring any existing diagnostic reports, previous ECGs, or current prescription medications.</p>
              <p>• Our front desk team will validate your appointment code: <span className="font-mono font-bold text-slate-900">{bookingRef}</span>.</p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              >
                <Printer className="w-4 h-4" />
                <span>Print Appointment Voucher</span>
              </button>
              <button
                type="button"
                onClick={resetAndClose}
                className="px-5 py-2.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
            {/* Step 1: Specialty & Doctor */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="dept-select" className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Clinical Department *
                </label>
                <select
                  id="dept-select"
                  value={selectedDeptId}
                  onChange={(e) => handleDepartmentChange(e.target.value)}
                  className="w-full text-xs sm:text-sm bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                >
                  {DEPARTMENTS.map((dept) => (
                    <option key={dept.id} value={dept.id}>
                      {dept.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="doctor-select" className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Consulting Specialist *
                </label>
                <select
                  id="doctor-select"
                  value={selectedDoctorId}
                  onChange={(e) => handleDoctorChange(e.target.value)}
                  className="w-full text-xs sm:text-sm bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                >
                  {deptDoctors.map((doc) => (
                    <option key={doc.id} value={doc.id}>
                      {doc.name} ({doc.role})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Step 2: Date & Available Slots */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="date-input" className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Preferred Date *
                </label>
                <input
                  id="date-input"
                  type="date"
                  value={date}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full text-xs sm:text-sm bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Available Consultation Slot *
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {availableSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedSlot(slot)}
                      className={`py-2 px-2.5 text-xs rounded-lg border font-medium transition-all ${
                        selectedSlot === slot
                          ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
                {errors.slot && <p className="text-red-600 text-[11px] mt-1">{errors.slot}</p>}
              </div>
            </div>

            {/* Step 3: Patient Information */}
            <div className="space-y-4 pt-2 border-t border-slate-200">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Patient Contact & Details
              </div>

              <div>
                <label htmlFor="patient-name" className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name *
                </label>
                <input
                  id="patient-name"
                  type="text"
                  placeholder="e.g. Oluwaseun Adeleke"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="w-full text-xs sm:text-sm border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
                {errors.patientName && <p className="text-red-600 text-[11px] mt-1">{errors.patientName}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="patient-phone" className="block text-xs font-semibold text-slate-700 mb-1">
                    Phone Number (SMS confirmation) *
                  </label>
                  <input
                    id="patient-phone"
                    type="tel"
                    placeholder="+234 803 123 4567"
                    value={patientPhone}
                    onChange={(e) => setPatientPhone(e.target.value)}
                    className="w-full text-xs sm:text-sm border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                  {errors.patientPhone && <p className="text-red-600 text-[11px] mt-1">{errors.patientPhone}</p>}
                </div>

                <div>
                  <label htmlFor="patient-email" className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    id="patient-email"
                    type="email"
                    placeholder="name@example.com"
                    value={patientEmail}
                    onChange={(e) => setPatientEmail(e.target.value)}
                    className="w-full text-xs sm:text-sm border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                  {errors.patientEmail && <p className="text-red-600 text-[11px] mt-1">{errors.patientEmail}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="visit-reason" className="block text-xs font-semibold text-slate-700 mb-1">
                  Primary Reason for Visit or Symptoms (Optional)
                </label>
                <textarea
                  id="visit-reason"
                  rows={2}
                  placeholder="e.g. Follow-up for blood pressure check, persistent headache, routine annual health audit..."
                  value={visitReason}
                  onChange={(e) => setVisitReason(e.target.value)}
                  className="w-full text-xs sm:text-sm border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
              <div className="text-xs text-slate-500">
                <span>Estimated Fee: </span>
                <span className="font-semibold text-slate-900 tabular-nums">
                  {formatCurrency(currentDoctor.consultationFee, 'USD')}
                </span>
                <span className="text-[10px] block text-slate-400">Payable at clinic or via insurance</span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={resetAndClose}
                  className="px-4 py-2.5 text-xs font-medium text-slate-600 hover:text-slate-900 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-sm transition-colors"
                >
                  Confirm Appointment
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
