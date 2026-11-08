import React from 'react';
import { 
  ArrowLeft, 
  Home, 
  Stethoscope, 
  Calendar, 
  Phone, 
  MapPin, 
  AlertTriangle 
} from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';

interface NotFoundPageProps {
  onNavigateHome: () => void;
  onExploreServices?: () => void;
  onBookAppointment?: () => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({
  onNavigateHome,
  onExploreServices,
  onBookAppointment,
}) => {
  return (
    <div className="min-h-[75vh] bg-slate-50 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-xl w-full bg-white rounded-3xl border border-slate-200 shadow-xl p-8 sm:p-12 text-center space-y-6">
        
        {/* Error Badge */}
        <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center justify-center mx-auto shadow-xs">
          <AlertTriangle className="w-8 h-8 text-emerald-700" />
        </div>

        <div className="space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/80 text-emerald-900 text-xs font-bold uppercase tracking-wider">
            HTTP 404 · Page Not Found
          </span>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            We Couldn’t Find That Page
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal max-w-md mx-auto">
            The link you followed may be broken, or the page may have been moved. Let us help you find what you need at Winnie’s Clinic.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={onNavigateHome}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-sm transition-colors cursor-pointer shadow-sm"
          >
            <Home className="w-4 h-4 text-emerald-200" />
            <span>Return to Homepage</span>
          </button>

          {onExploreServices && (
            <button
              onClick={onExploreServices}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm transition-colors cursor-pointer"
            >
              <Stethoscope className="w-4 h-4 text-slate-600" />
              <span>Explore Services</span>
            </button>
          )}

          {onBookAppointment && (
            <button
              onClick={onBookAppointment}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm transition-colors cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-slate-600" />
              <span>Book Consultation</span>
            </button>
          )}
        </div>

        {/* Contact info for assistance */}
        <div className="pt-6 border-t border-slate-100 text-xs text-slate-500 space-y-2">
          <p className="font-medium text-slate-700">
            Need urgent assistance or clinical advice?
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a 
              href={`tel:${CLINIC_INFO.emergencyHotline.replace(/[^\d+]/g, '')}`}
              className="inline-flex items-center gap-1.5 text-emerald-800 hover:text-emerald-950 font-bold"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-700" />
              <span>24/7 Line: {CLINIC_INFO.emergencyHotline}</span>
            </a>
            <span className="text-slate-300 hidden sm:inline">·</span>
            <div className="inline-flex items-center gap-1.5 text-slate-500">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>Holy Ghost Bomb Junction, Okigwe</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
