import React from 'react';
import { X, ZoomIn, Building2, ShieldCheck } from 'lucide-react';

interface PhotoInspectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  title: string;
  caption: string;
}

export const PhotoInspectionModal: React.FC<PhotoInspectionModalProps> = ({
  isOpen,
  onClose,
  imageSrc,
  title,
  caption,
}) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="photo-modal-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
    >
      <div className="bg-slate-900 rounded-2xl max-w-4xl w-full border border-slate-700 shadow-2xl overflow-hidden relative text-white flex flex-col">
        {/* Top Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-800 bg-slate-950">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <h4 id="photo-modal-title" className="font-display text-sm sm:text-base font-bold text-white truncate max-w-md">
              {title}
            </h4>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            aria-label="Close photo preview"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* High-Resolution Photo Display */}
        <div className="relative bg-black flex items-center justify-center max-h-[70vh] overflow-hidden">
          <img
            src={imageSrc}
            alt={title}
            className="w-full max-h-[70vh] object-contain"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Caption and Environmental Specifications */}
        <div className="p-5 sm:p-6 bg-slate-900 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="max-w-2xl">
            <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider block mb-1">
              Winnie's Clinic Clinical Photography & Facility Record
            </span>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {caption}
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-900 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors"
            >
              Close Viewer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
