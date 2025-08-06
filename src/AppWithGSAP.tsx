import React, { useEffect } from 'react';
import Navigation from './components/Navigation';
import LoadingScreen from './components/LoadingScreen';
import GSAPLoadingScreen from './components/GSAPLoadingScreen';
import RajasthaniLoadingScreen from './components/RajasthaniLoadingScreen';
import Hero from './components/Hero';
import GSAPHero from './components/GSAPHero';
import About from './components/About';
import Menu from './components/Menu';
import GSAPMenu from './components/GSAPMenu';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';

// Configuration: Set which animation library to use
const ANIMATION_CONFIG = {
  useGSAP: true, // Set to false to use Framer Motion, true to use GSAP
  useRajasthaniTheme: true, // Set to true for Rajasthani-themed loading screen
};

function AppWithGSAP() {
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    // Prevent any background flash by ensuring loading screen shows immediately
    document.body.style.backgroundColor = '#8B4513'; // Match loading screen background
    document.body.style.overflow = 'hidden'; // Prevent scroll during loading
    
    // Smooth scrolling for the entire page
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Update page title
    document.title = 'Brewed with Love - Premium Coffee House (GSAP Enhanced)';
    
    // Add meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Experience the finest coffee crafted with passion, tradition, and the warmth of Rajasthani hospitality at Brewed with Love coffee house in Jaipur. Enhanced with GSAP animations.';
      document.head.appendChild(meta);
    }

    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
      // Reset body styles when component unmounts
      document.body.style.backgroundColor = '';
      document.body.style.overflow = '';
    };
  }, []);

  const handleLoadingComplete = () => {
    // Reset body styles when loading completes
    document.body.style.backgroundColor = '';
    document.body.style.overflow = '';
    setIsLoading(false);
  };

  if (isLoading) {
    // Choose loading screen based on configuration
    if (ANIMATION_CONFIG.useRajasthaniTheme) {
      return <RajasthaniLoadingScreen onComplete={handleLoadingComplete} />;
    }
    return ANIMATION_CONFIG.useGSAP ? 
      <GSAPLoadingScreen onLoadingComplete={handleLoadingComplete} /> :
      <LoadingScreen onLoadingComplete={handleLoadingComplete} />;
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: isLoading ? '#8B4513' : 'white' }}>
      {!isLoading && <Navigation />}
      
      {/* Hero Section */}
      {!isLoading && (
        <section id="hero">
          {ANIMATION_CONFIG.useGSAP ? <GSAPHero /> : <Hero />}
        </section>
      )}

      {/* About Section */}
      {!isLoading && (
        <section id="about">
          <About />
        </section>
      )}

      {/* Menu Section */}
      {!isLoading && (
        <section id="menu">
          {ANIMATION_CONFIG.useGSAP ? <GSAPMenu /> : <Menu />}
        </section>
      )}

      {/* Testimonials Section */}
      {!isLoading && (
        <section id="testimonials">
          <Testimonials />
        </section>
      )}

      {/* Contact Section */}
      {!isLoading && (
        <section id="contact">
          <Contact />
        </section>
      )}

      {/* Footer */}
      {!isLoading && <Footer />}
    </div>
  );
}

export default AppWithGSAP;
