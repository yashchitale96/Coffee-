import React, { useEffect } from 'react';
import RajasthaniNavigation from './components/RajasthaniNavigation';
import RajasthaniLoadingScreen from './components/RajasthaniLoadingScreen';
import RajasthaniHero from './components/RajasthaniHero';
import RajasthaniMenu from './components/RajasthaniMenu';
import RajasthaniStory from './components/RajasthaniStory';
import RajasthaniTestimonials from './components/RajasthaniTestimonials';
import RajasthaniContact from './components/RajasthaniContact';
import './utils/rajasthaniTheme.css';

// Rajasthani theme is enabled throughout the application

function RajasthaniApp() {
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    // Prevent any background flash by ensuring loading screen shows immediately
    document.body.style.backgroundColor = '#8B4513'; // Match loading screen background
    document.body.style.overflow = 'hidden'; // Prevent scroll during loading
    
    // Smooth scrolling for the entire page
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Update page title
    document.title = 'कॉफी हाउस - Royal Rajasthani Coffee Experience';
    
    // Add meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Experience the finest coffee crafted with passion, tradition, and the warmth of Rajasthani hospitality at कॉफी हाउस in Jaipur. Enhanced with traditional Rajasthani cultural elements.';
      document.head.appendChild(meta);
    }

    // Add custom font for Rajasthani theme if needed
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Martel:wght@400;600;700&display=swap';
    document.head.appendChild(link);

    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
      // Reset body styles when component unmounts
      document.body.style.backgroundColor = '';
      document.body.style.overflow = '';
      // Remove font if not needed elsewhere
      document.head.removeChild(link);
    };
  }, []);

  const handleLoadingComplete = () => {
    // Reset body styles when loading completes
    document.body.style.backgroundColor = '';
    document.body.style.overflow = '';
    setIsLoading(false);
  };

  if (isLoading) {
    return <RajasthaniLoadingScreen onComplete={handleLoadingComplete} />;
  }

  return (
    <div className="min-h-screen font-body">
      <RajasthaniNavigation />
      
      {/* Hero Section */}
      <section id="hero">
        <RajasthaniHero />
      </section>

      {/* About Section */}
      {!isLoading && (
        <section id="about" className="relative">
          {/* Rajasthani themed separator */}
          <div className="absolute top-0 left-0 right-0 h-16 overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-rajasthani-gold-light opacity-30"></div>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
              <div className="w-16 h-8 bg-rajasthani-gradient rounded-b-full border-b border-l border-r border-rajasthani-gold-light opacity-40"></div>
            </div>
          </div>
          
          <RajasthaniStory />
          
          {/* Bottom decorative element */}
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-rajasthani-gold-light to-transparent opacity-30"></div>
        </section>
      )}

      {/* Menu Section */}
      {!isLoading && (
        <section id="menu">
          <RajasthaniMenu />
        </section>
      )}

      {/* Testimonials Section */}
      {!isLoading && (
        <section id="testimonials" className="relative">
          {/* Rajasthani themed separator */}
          <div className="absolute top-0 left-0 right-0 h-16 overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-rajasthani-gold-light opacity-30"></div>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
              <div className="w-16 h-8 bg-rajasthani-gradient rounded-b-full border-b border-l border-r border-rajasthani-gold-light opacity-40"></div>
            </div>
          </div>
          
          <RajasthaniTestimonials />
        </section>
      )}

      {/* Contact Section */}
      {!isLoading && (
        <section id="contact">
          <RajasthaniContact />
        </section>
      )}

      {/* Footer */}
      {!isLoading && (
        <footer className="bg-rajasthani-brown-darkest text-amber-100">
          <div className="container mx-auto py-8 px-4">
            <div className="text-center">
              <h2 className="text-2xl font-display text-rajasthani-gold-light mb-3">कॉफी हाउस</h2>
              <p className="text-amber-100/70 text-sm mb-6">Royal Rajasthani Coffee Experience</p>
              <div className="rajasthani-divider max-w-xs mx-auto mb-6"></div>
              <p className="text-amber-100/50 text-xs">
                © {new Date().getFullYear()} कॉफी हाउस. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}

export default RajasthaniApp;
