import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { WelcomeSection } from './components/WelcomeSection';
import { WhyChooseSection } from './components/WhyChooseSection';
import { HealthInsightsSection } from './components/HealthInsightsSection';
import { BookingCtaSection } from './components/BookingCtaSection';
import { ContactLocationSection } from './components/ContactLocationSection';
import { AboutUsPage } from './components/AboutUsPage';
import { ServicesPage } from './components/ServicesPage';
import { ContactUsPage } from './components/ContactUsPage';
import { BookingPage } from './components/BookingPage';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { HealthCheckerModal } from './components/HealthCheckerModal';
import { PhotoInspectionModal } from './components/PhotoInspectionModal';

export default function App() {
  // Page Route: 'home' | 'about' | 'services' | 'contact' | 'booking'
  const [currentRoute, setCurrentRoute] = useState<'home' | 'about' | 'services' | 'contact' | 'booking'>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      if (path === '/book' || path === '/booking' || path === '/book-consultation' || hash === '#/book' || hash === '#booking-page') {
        return 'booking';
      }
      if (path === '/contact' || hash === '#/contact' || hash === '#contact-page') {
        return 'contact';
      }
      if (path === '/services' || hash === '#/services' || hash === '#services-page') {
        return 'services';
      }
      if (path === '/about' || hash === '#/about' || hash === '#about-page') {
        return 'about';
      }
    }
    return 'home';
  });

  const [activeSection, setActiveSection] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      if (path === '/contact' || hash === '#/contact' || hash === '#contact-page') {
        return 'contact';
      }
      if (path === '/services' || hash === '#/services' || hash === '#services-page') {
        return 'services';
      }
      if (path === '/about' || hash === '#/about' || hash === '#about-page') {
        return 'about';
      }
    }
    return 'home';
  });

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

  // Handle browser back/forward history navigation
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      if (path === '/book' || path === '/booking' || path === '/book-consultation' || hash === '#/book' || hash === '#booking-page') {
        setCurrentRoute('booking');
        setActiveSection('home');
        document.title = "Book a Consultation | Winnie's Clinic";
      } else if (path === '/contact' || hash === '#/contact' || hash === '#contact-page') {
        setCurrentRoute('contact');
        setActiveSection('contact');
        document.title = "Contact Us | Winnie's Clinic";
      } else if (path === '/services' || hash === '#/services' || hash === '#services-page') {
        setCurrentRoute('services');
        setActiveSection('services');
        document.title = "Our Services | Winnie's Clinic";
      } else if (path === '/about' || hash === '#/about' || hash === '#about-page') {
        setCurrentRoute('about');
        setActiveSection('about');
        document.title = "About Winnie's Clinic | Modern African Healthcare Excellence";
      } else {
        setCurrentRoute('home');
        setActiveSection('home');
        document.title = "Winnie's Clinic | Modern African Healthcare Excellence";
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Track active navigation link on scroll (only when on homepage)
  useEffect(() => {
    if (currentRoute !== 'home') return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 140;
      
      // Order from bottom to top
      const sections = [
        { id: 'contact', navKey: 'contact' },
        { id: 'booking-cta', navKey: 'contact' },
        { id: 'health-insights', navKey: 'about' },
        { id: 'why-choose', navKey: 'about' },
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
  }, [currentRoute]);

  const handleNavigate = (sectionId: string) => {
    // 0. User clicked "Book Consultation" page
    if (sectionId === 'booking' || sectionId === 'book-consultation') {
      setCurrentRoute('booking');
      setActiveSection('home');
      if (window.location.pathname !== '/book-consultation') {
        window.history.pushState(null, '', '/book-consultation');
      }
      document.title = "Book a Consultation | Winnie's Clinic";
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // 1. User clicked "Services"
    if (sectionId === 'services') {
      setCurrentRoute('services');
      setActiveSection('services');
      if (window.location.pathname !== '/services') {
        window.history.pushState(null, '', '/services');
      }
      document.title = "Our Services | Winnie's Clinic";
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // 2. User clicked "About Us"
    if (sectionId === 'about') {
      setCurrentRoute('about');
      setActiveSection('about');
      if (window.location.pathname !== '/about') {
        window.history.pushState(null, '', '/about');
      }
      document.title = "About Winnie's Clinic | Modern African Healthcare Excellence";
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // 3. User clicked "Contact Us"
    if (sectionId === 'contact') {
      setCurrentRoute('contact');
      setActiveSection('contact');
      if (window.location.pathname !== '/contact') {
        window.history.pushState(null, '', '/contact');
      }
      document.title = "Contact Us | Winnie's Clinic";
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // 4. If navigating away from a dedicated page (about, services, contact, booking) to Home or a section
    if (currentRoute !== 'home') {
      setCurrentRoute('home');
      if (window.location.pathname !== '/') {
        window.history.pushState(null, '', '/');
      }
      document.title = "Winnie's Clinic | Modern African Healthcare Excellence";

      if (sectionId === 'home') {
        setActiveSection('home');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      setActiveSection(sectionId);
      // Wait for Homepage DOM elements to render then scroll
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
      return;
    }

    // 4. User is already on the Homepage
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
    handleNavigate('booking');
  };

  const handleSelectDepartmentForBooking = (deptId?: string) => {
    setSelectedDepartmentId(deptId || null);
    setSelectedDoctorId(null);
    handleNavigate('booking');
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
        onNavigateToBookingPage={() => handleNavigate('booking')}
        activeSection={currentRoute === 'booking' ? '' : activeSection}
        onNavigate={handleNavigate}
        onOpenHealthChecker={() => setIsHealthCheckerOpen(true)}
      />

      {/* Main Content: Dedicated Route Rendering */}
      <main className="flex-1">
        {currentRoute === 'booking' ? (
          /* Dedicated Book Consultation Page Route */
          <BookingPage
            onNavigateHome={() => handleNavigate('home')}
            onExploreServices={() => handleNavigate('services')}
            onOpenPhotoModal={handleOpenPhotoModal}
            preselectedDepartmentId={selectedDepartmentId}
            preselectedDoctorId={selectedDoctorId}
          />
        ) : currentRoute === 'services' ? (
          /* Dedicated Our Services Page Route */
          <ServicesPage
            onOpenBooking={handleSelectDepartmentForBooking}
            onNavigateContact={() => handleNavigate('contact')}
            onNavigateHome={() => handleNavigate('home')}
            onOpenPhotoModal={handleOpenPhotoModal}
          />
        ) : currentRoute === 'about' ? (
          /* Dedicated About Us Page Route */
          <AboutUsPage
            onOpenBooking={handleOpenGeneralBooking}
            onExploreServices={() => handleNavigate('services')}
            onNavigateHome={() => handleNavigate('home')}
            onOpenPhotoModal={handleOpenPhotoModal}
          />
        ) : currentRoute === 'contact' ? (
          /* Dedicated Contact Us Page Route */
          <ContactUsPage
            onOpenBooking={handleOpenGeneralBooking}
            onExploreServices={() => handleNavigate('services')}
            onNavigateHome={() => handleNavigate('home')}
            onOpenPhotoModal={handleOpenPhotoModal}
          />
        ) : (
          /* Homepage: All 7 Core Content Sections */
          <>
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

            {/* Section 3: Why Choose Winnie's Clinic? */}
            <WhyChooseSection />

            {/* Section 4: Health Insights & Patient Education Articles */}
            <HealthInsightsSection
              onOpenBooking={handleSelectDepartmentForBooking}
              onOpenPhotoModal={handleOpenPhotoModal}
            />

            {/* Section 5: Appointment Booking Section */}
            <BookingCtaSection
              onOpenBooking={handleOpenGeneralBooking}
              onContactClick={() => handleNavigate('contact')}
            />

            {/* Section 8: Contact & Location */}
            <ContactLocationSection />
          </>
        )}
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
