import React, { useEffect } from 'react';
import Navigation from './components/Navigation';
import LoadingScreen from './components/LoadingScreen';
import Hero from './components/Hero';
import About from './components/About';
import Menu from './components/Menu';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    // Smooth scrolling for the entire page
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Update page title
    document.title = 'Brewed with Love - Premium Coffee House';
    
    // Add meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Experience the finest coffee crafted with passion, tradition, and the warmth of Rajasthani hospitality at Brewed with Love coffee house in Jaipur.';
      document.head.appendChild(meta);
    }

    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />;
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section id="hero">
        <Hero />
      </section>

      {/* About Section */}
      <section id="about">
        <About />
      </section>

      {/* Menu Section */}
      <section id="menu">
        <Menu />
      </section>

      {/* Testimonials Section */}
      <section id="testimonials">
        <Testimonials />
      </section>

      {/* Contact Section */}
      <section id="contact">
        <Contact />
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;