import React, { useState } from 'react';
import { X, HeartPulse, AlertCircle, ArrowRight, Activity, Calculator, CheckCircle2 } from 'lucide-react';
import { triagePatientSymptom, calculateBmiAndCategory } from '../utils/clinicLogic';

interface HealthCheckerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProceedToBooking: (departmentId?: string) => void;
}

export const HealthCheckerModal: React.FC<HealthCheckerModalProps> = ({
  isOpen,
  onClose,
  onProceedToBooking,
}) => {
  const [activeTab, setActiveTab] = useState<'symptom' | 'bmi'>('symptom');

  // Symptom Triage State
  const [symptomCategory, setSymptomCategory] = useState<string>('cardiology');
  const [severity, setSeverity] = useState<'mild' | 'moderate' | 'urgent'>('moderate');
  const [triageOutput, setTriageOutput] = useState(
    triagePatientSymptom('cardiology', 'moderate')
  );

  // BMI Estimator State
  const [weightKg, setWeightKg] = useState<number>(72);
  const [heightCm, setHeightCm] = useState<number>(175);
  const [bmiResult, setBmiResult] = useState(
    calculateBmiAndCategory(72, 175)
  );

  if (!isOpen) return null;

  const handleSymptomChange = (category: string, sev: 'mild' | 'moderate' | 'urgent') => {
    setSymptomCategory(category);
    setSeverity(sev);
    setTriageOutput(triagePatientSymptom(category, sev));
  };

  const handleBmiCalculate = (w: number, h: number) => {
    setWeightKg(w);
    setHeightCm(h);
    if (w > 20 && h > 80) {
      setBmiResult(calculateBmiAndCategory(w, h));
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="health-checker-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
    >
      <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden relative">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-800">
              Interactive Patient Guidance
            </span>
            <h3 id="health-checker-title" className="font-display text-lg font-bold text-slate-900">
              Health Vitals & Symptom Triage Tool
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
            aria-label="Close health tool modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Controls */}
        <div className="flex border-b border-slate-200 px-6 pt-3 bg-white">
          <button
            onClick={() => setActiveTab('symptom')}
            className={`pb-3 text-xs sm:text-sm font-semibold border-b-2 mr-6 transition-colors ${
              activeTab === 'symptom'
                ? 'border-emerald-600 text-emerald-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <span className="flex items-center gap-1.5">
              <Activity className="w-4 h-4" />
              Symptom Triage Navigator
            </span>
          </button>
          <button
            onClick={() => setActiveTab('bmi')}
            className={`pb-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors ${
              activeTab === 'bmi'
                ? 'border-emerald-600 text-emerald-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <span className="flex items-center gap-1.5">
              <Calculator className="w-4 h-4" />
              BMI & Cardiovascular Risk
            </span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {activeTab === 'symptom' ? (
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Primary Area of Concern
                </label>
                <select
                  value={symptomCategory}
                  onChange={(e) => handleSymptomChange(e.target.value, severity)}
                  className="w-full text-xs sm:text-sm border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-white"
                >
                  <option value="cardiology">Cardiovascular (Blood Pressure, Palpitations, Dizziness)</option>
                  <option value="child">Pediatric / Child Illness (Fever, Cough, Milestones)</option>
                  <option value="surgery">Surgical Consultation (Lumps, Hernia, Abdominal Discomfort)</option>
                  <option value="pregnancy">Maternal & Women's Health (Antenatal, Fertility, Wellness)</option>
                  <option value="internal">General & Internal Medicine (Fatigue, Diabetes, Joint Pains)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Symptom Severity & Progression
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['mild', 'moderate', 'urgent'] as const).map((sev) => (
                    <button
                      key={sev}
                      type="button"
                      onClick={() => handleSymptomChange(symptomCategory, sev)}
                      className={`py-2 px-3 text-xs rounded-lg font-medium capitalize border transition-all ${
                        severity === sev
                          ? sev === 'urgent'
                            ? 'bg-red-700 text-white border-red-700 shadow-xs'
                            : 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {sev}
                    </button>
                  ))}
                </div>
              </div>

              {/* Triage Guidance Card */}
              <div className={`p-4 rounded-xl border ${
                triageOutput.priority === 'Emergency'
                  ? 'bg-red-50 border-red-200 text-red-950'
                  : 'bg-emerald-50 border-emerald-200 text-emerald-950'
              }`}>
                <div className="flex items-center justify-between pb-2 border-b border-black/10">
                  <span className="text-xs font-bold uppercase tracking-wider">
                    Triage Priority: {triageOutput.priority}
                  </span>
                  <span className="text-xs font-medium">
                    Wait Time: {triageOutput.waitTimeEstimate}
                  </span>
                </div>
                <div className="mt-2.5">
                  <span className="text-xs font-semibold block text-slate-800">
                    Recommended Department:
                  </span>
                  <span className="text-sm font-bold text-slate-900">
                    {triageOutput.recommendedDepartment}
                  </span>
                  <p className="text-xs mt-1.5 text-slate-700 leading-relaxed">
                    {triageOutput.advice}
                  </p>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onProceedToBooking();
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-xs transition-colors"
                >
                  <span>Book Recommended Clinic</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="weight-input" className="block text-xs font-semibold text-slate-700 mb-1">
                    Weight (kg)
                  </label>
                  <input
                    id="weight-input"
                    type="number"
                    min="30"
                    max="250"
                    value={weightKg}
                    onChange={(e) => handleBmiCalculate(Number(e.target.value), heightCm)}
                    className="w-full text-xs sm:text-sm border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>
                <div>
                  <label htmlFor="height-input" className="block text-xs font-semibold text-slate-700 mb-1">
                    Height (cm)
                  </label>
                  <input
                    id="height-input"
                    type="number"
                    min="100"
                    max="230"
                    value={heightCm}
                    onChange={(e) => handleBmiCalculate(weightKg, Number(e.target.value))}
                    className="w-full text-xs sm:text-sm border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>
              </div>

              {/* BMI Output Card */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <div>
                    <span className="text-xs text-slate-500 uppercase tracking-wider block">Calculated BMI</span>
                    <span className="font-display text-2xl font-bold text-slate-900 tabular-nums">
                      {bmiResult.bmi} kg/m²
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-500 uppercase tracking-wider block">Classification</span>
                    <span className="font-semibold text-emerald-800 text-sm">
                      {bmiResult.category}
                    </span>
                  </div>
                </div>

                <div className="mt-3 text-xs text-slate-700 leading-relaxed">
                  <span className="font-semibold text-slate-900 block mb-0.5">Clinical Note:</span>
                  {bmiResult.clinicalAdvice}
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onProceedToBooking('cardiology');
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-xs transition-colors"
                >
                  <span>Book Wellness Consultation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
