import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { WelcomeSection } from './components/WelcomeSection';
import { ServicesSection } from './components/ServicesSection';
import { WhyChooseSection } from './components/WhyChooseSection';
import { FacilitiesTour } from './components/FacilitiesTour';
import { BookingCtaSection } from './components/BookingCtaSection';
import { ContactLocationSection } from './components/ContactLocationSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { HealthCheckerModal } from './components/HealthCheckerModal';
import { PhotoInspectionModal } from './components/PhotoInspectionModal';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [selectedDoctorId, setSelectedDoctorId] = useState<string | null>(null);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<string | null>(null);

  const [isHealthCheckerOpen, setIsHealthCheckerOpen] = useState<boolean>(false);

  // Photo Inspection Lightbox state
  const [photoModalState, setPhotoModalState] = useState<{
    isOpen: boolean;
    imageSrc: string;
    title: string;
    caption: string;
  }>({
    isOpen: false,
    imageSrc: '',
    title: '',
    caption: '',
  });

  // Track active navigation link on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 140;
      
      // Order from bottom to top
      const sections = [
        { id: 'contact', navKey: 'contact' },
        { id: 'booking-cta', navKey: 'contact' },
        { id: 'facilities', navKey: 'services' },
        { id: 'why-choose', navKey: 'about' },
        { id: 'services', navKey: 'services' },
        { id: 'about', navKey: 'about' },
      ];

      if (window.scrollY < 300) {
        setActiveSection('home');
        return;
      }

      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(section.navKey);
            return;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenGeneralBooking = () => {
    setSelectedDoctorId(null);
    setSelectedDepartmentId(null);
    setIsBookingOpen(true);
  };

  const handleSelectDepartmentForBooking = (deptId: string) => {
    setSelectedDepartmentId(deptId);
    setSelectedDoctorId(null);
    setIsBookingOpen(true);
  };

  const handleOpenPhotoModal = (imageSrc: string, title: string, caption: string) => {
    setPhotoModalState({
      isOpen: true,
      imageSrc,
      title,
      caption,
    });
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-emerald-100 selection:text-emerald-900">
      
      {/* Navigation Bar */}
      <Header
        onOpenBooking={handleOpenGeneralBooking}
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenHealthChecker={() => setIsHealthCheckerOpen(true)}
      />

      {/* Main Homepage: Exactly Seven Content Sections in Specified Order */}
      <main className="flex-1">
        
        {/* Section 1: Hero Section — Three-Slide Image Banner */}
        <HeroSection
          onOpenBooking={handleOpenGeneralBooking}
          onExploreServices={() => handleNavigate('services')}
          onDiscoverApproach={() => handleNavigate('about')}
        />

        {/* Section 2: Welcome to Winnie's Clinic */}
        <WelcomeSection
          onDiscoverClinic={() => handleNavigate('about')}
          onOpenBooking={handleOpenGeneralBooking}
        />

        {/* Section 3: Our Medical Services */}
        <ServicesSection
          onSelectDepartmentForBooking={handleSelectDepartmentForBooking}
          onOpenPhotoModal={handleOpenPhotoModal}
        />

        {/* Section 4: Why Choose Winnie's Clinic? */}
        <WhyChooseSection />

        {/* Section 5: Inside Winnie's Clinic (Facilities & Environmental Showcase) */}
        <FacilitiesTour
          onOpenPhotoModal={handleOpenPhotoModal}
          onOpenBooking={handleOpenGeneralBooking}
        />

        {/* Section 6: Appointment Booking Section */}
        <BookingCtaSection
          onOpenBooking={handleOpenGeneralBooking}
          onContactClick={() => handleNavigate('contact')}
        />

        {/* Section 7: Contact & Location */}
        <ContactLocationSection />

      </main>

      {/* Section 8: Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenBooking={handleOpenGeneralBooking}
      />

      {/* Interactive Booking Modal (Connected to real appointment scheduling) */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        preselectedDoctorId={selectedDoctorId}
        preselectedDepartmentId={selectedDepartmentId}
      />

      {/* Health Vitals & Triage Tool Modal */}
      <HealthCheckerModal
        isOpen={isHealthCheckerOpen}
        onClose={() => setIsHealthCheckerOpen(false)}
        onProceedToBooking={(deptId) => {
          if (deptId) setSelectedDepartmentId(deptId);
          setIsBookingOpen(true);
        }}
      />

      {/* High-Resolution Photo Lightbox */}
      <PhotoInspectionModal
        isOpen={photoModalState.isOpen}
        onClose={() => setPhotoModalState(prev => ({ ...prev, isOpen: false }))}
        imageSrc={photoModalState.imageSrc}
        title={photoModalState.title}
        caption={photoModalState.caption}
      />

    </div>
  );
}
