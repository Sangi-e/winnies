import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  Calendar, 
  Pause, 
  Play 
} from 'lucide-react';
import { CLINIC_IMAGES } from '../data/clinicData';

interface HeroSectionProps {
  onOpenBooking: () => void;
  onExploreServices: () => void;
  onDiscoverApproach: () => void;
}

interface SlideData {
  id: string;
  headline: string;
  supportingText: string;
  ctaText: string;
  ctaAction: 'services' | 'approach' | 'booking';
  image: string;
  imageAlt: string;
}

const SLIDE_DURATION_MS = 6000;

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenBooking,
  onExploreServices,
  onDiscoverApproach,
}) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const touchStartXRef = useRef<number | null>(null);

  const slides: SlideData[] = [
    {
      id: 'surgical-excellence',
      headline: 'Excellence in Every Moment.',
      supportingText: 'Professional healthcare with attention to every detail.',
      ctaText: 'Explore Our Services',
      ctaAction: 'services',
      image: CLINIC_IMAGES.heroSlide1Surgical,
      imageAlt: 'Black African doctors and surgeons working inside a modern operating theatre',
    },
    {
      id: 'compassionate-care',
      headline: 'Care That Goes Beyond Treatment.',
      supportingText: 'Every patient deserves kindness and attention.',
      ctaText: 'Discover Our Approach',
      ctaAction: 'approach',
      image: CLINIC_IMAGES.heroSlide2Nursing,
      imageAlt: 'A Black African nurse compassionately attending to a patient',
    },
    {
      id: 'patient-centred-healthcare',
      headline: 'Your Health Comes First.',
      supportingText: 'Thoughtful care focused on your well-being.',
      ctaText: 'Book an Appointment',
      ctaAction: 'booking',
      image: CLINIC_IMAGES.heroSlide3Consultation,
      imageAlt: 'A Black African doctor consulting with a patient in a modern room',
    },
  ];

  const handleCtaClick = (action: 'services' | 'approach' | 'booking') => {
    if (action === 'services') {
      onExploreServices();
    } else if (action === 'approach') {
      onDiscoverApproach();
    } else if (action === 'booking') {
      onOpenBooking();
    }
  };

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Auto-advance slideshow every 6 seconds
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      nextSlide();
    }, SLIDE_DURATION_MS);
    return () => clearInterval(timer);
  }, [isPlaying, nextSlide]);

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartXRef.current - touchEndX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    touchStartXRef.current = null;
  };

  return (
    <section 
      id="home"
      className="relative w-full overflow-hidden bg-slate-950 select-none group"
      aria-label="Winnie's Clinic Visual Showcase"
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* 1. Main Photographic Canvas — Photography as the absolute primary focus */}
      <div className="relative w-full h-[68vh] min-h-[500px] max-h-[780px] sm:h-[72vh] lg:h-[78vh]">
        {slides.map((slide, index) => {
          const isActive = index === currentSlide;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
              }`}
              aria-hidden={!isActive}
            >
              {/* High-Resolution Landscape Photograph */}
              <img
                src={slide.image}
                alt={slide.imageAlt}
                className="w-full h-full object-cover object-center transform transition-transform duration-7000 ease-out scale-100 hover:scale-102"
                loading={index === 0 ? 'eager' : 'lazy'}
              />

              {/* Restrained directional gradient overlay — subtle only in lower-left negative space to ensure legibility without dimming subjects */}
              <div 
                className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent sm:bg-gradient-to-r sm:from-slate-950/80 sm:via-slate-950/35 sm:to-transparent pointer-events-none" 
                aria-hidden="true" 
              />

              {/* Minimal Text Overlay — Positioned carefully in negative space */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10 md:p-14 lg:p-18 max-w-4xl">
                <div className="space-y-2 sm:space-y-3">
                  {/* Short, bold, elegant headline */}
                  <h1 className="font-display text-2xl sm:text-4xl md:text-5xl lg:text-5xl font-bold tracking-tight text-white leading-[1.15] drop-shadow-sm max-w-2xl">
                    {slide.headline}
                  </h1>

                  {/* Supporting text — limited to one short sentence */}
                  <p className="text-sm sm:text-base md:text-lg text-slate-200/90 font-normal leading-relaxed max-w-xl">
                    {slide.supportingText}
                  </p>

                  {/* Compact, refined CTA */}
                  <div className="pt-2 sm:pt-3">
                    <button
                      onClick={() => handleCtaClick(slide.ctaAction)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm font-semibold text-white bg-emerald-800 hover:bg-emerald-700 active:bg-emerald-900 rounded-lg shadow-md transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                    >
                      {slide.ctaAction === 'booking' ? (
                        <Calendar className="w-4 h-4 text-emerald-200" strokeWidth={2} />
                      ) : (
                        <ArrowRight className="w-4 h-4 text-emerald-200" strokeWidth={2} />
                      )}
                      <span>{slide.ctaText}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* 2. Elegant Previous & Next Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-950/40 hover:bg-slate-950/70 border border-white/20 text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2} />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-950/40 hover:bg-slate-950/70 border border-white/20 text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2} />
        </button>

        {/* 3. Subtle Slide Indicators and Play/Pause Control */}
        <div className="absolute bottom-5 sm:bottom-8 right-6 sm:right-12 z-20 flex items-center gap-3">
          <div className="flex items-center gap-2">
            {slides.map((slide, index) => {
              const isActive = index === currentSlide;
              return (
                <button
                  key={slide.id}
                  onClick={() => goToSlide(index)}
                  className={`h-1.5 transition-all duration-300 rounded-full cursor-pointer focus:outline-none ${
                    isActive ? 'w-8 bg-emerald-400' : 'w-2 bg-white/40 hover:bg-white/70'
                  }`}
                  aria-label={`Go to slide ${index + 1}: ${slide.headline}`}
                />
              );
            })}
          </div>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1 text-white/60 hover:text-white transition-colors cursor-pointer rounded focus:outline-none"
            aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
            title={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
          >
            {isPlaying ? (
              <Pause className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <Play className="w-3.5 h-3.5 text-slate-300" />
            )}
          </button>
        </div>
      </div>
    </section>
  );
};
