import React, { useState, useEffect, useRef } from 'react';
import { Coffee, Menu, X } from 'lucide-react';
import { gsap } from 'gsap';
import '../utils/rajasthaniTheme.css';

const RajasthaniNavigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  
  const navRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<HTMLUListElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = ['hero', 'about', 'menu', 'testimonials', 'contact'];
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Initial animation setup
  useEffect(() => {
    if (navRef.current) {
      // Animate logo
      gsap.fromTo(logoRef.current, 
        { 
          opacity: 0, 
          y: -30 
        },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1,
          ease: 'back.out(1.7)'
        }
      );
      
      // Stagger menu items
      gsap.fromTo(
        menuItemsRef.current?.children || [], 
        { 
          opacity: 0, 
          y: -20 
        },
        { 
          opacity: 1, 
          y: 0, 
          stagger: 0.1,
          duration: 0.6,
          ease: 'power2.out',
          delay: 0.3
        }
      );
    }
  }, []);

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'menu', label: 'Menu' },
    { id: 'testimonials', label: 'Reviews' },
    { id: 'contact', label: 'Contact' }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      ref={navRef}
      className={`fixed w-full top-0 z-50 transition-all duration-500 ${
        isScrolled ? 'py-2 bg-rajasthani-gradient shadow-rajasthani' : 'py-4 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <div ref={logoRef} className="flex items-center">
          <div className="relative">
            <Coffee 
              size={isScrolled ? 24 : 28} 
              className={`text-rajasthani-gold-light transition-all duration-300 ${
                isScrolled ? 'mr-2' : 'mr-3'
              }`} 
            />
            <span className="absolute -right-1 -bottom-1 w-2 h-2 bg-rajasthani-amber rounded-full opacity-80"></span>
          </div>
          
          <div>
            <h1 className={`rajasthani-heading transition-all duration-300 ${
              isScrolled ? 'text-lg' : 'text-xl'
            }`}>
              कॉफी हाउस
            </h1>
            <p className={`text-amber-100 font-light transition-all duration-300 ${
              isScrolled ? 'text-[10px] -mt-0.5' : 'text-xs'
            }`}>
              Royal Coffee Experience
            </p>
          </div>
        </div>
        
        {/* Desktop Menu */}
        <ul ref={menuItemsRef} className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => scrollToSection(item.id)}
                className={`
                  relative px-4 py-2 font-medium transition-all duration-300 
                  ${activeSection === item.id ? 'text-rajasthani-gold-light' : 'text-amber-100 hover:text-rajasthani-gold-light'}
                `}
              >
                {item.label}
                
                {/* Active indicator - ornate style */}
                {activeSection === item.id && (
                  <>
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-rajasthani-gold-light"></span>
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-rajasthani-gold-light -mb-0.5"></span>
                  </>
                )}
              </button>
            </li>
          ))}
        </ul>
        
        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="block md:hidden text-amber-100 hover:text-rajasthani-gold-light focus:outline-none"
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMobileMenuOpen ? (
            <X size={24} />
          ) : (
            <Menu size={24} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-rajasthani-gradient bg-opacity-95 z-50 pt-20 transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } md:hidden`}
      >
        <div className="container mx-auto px-4">
          {/* Decorative element */}
          <div className="absolute top-28 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-rajasthani-gold to-transparent opacity-30"></div>
          
          <ul className="flex flex-col items-center space-y-6 pt-8">
            {navItems.map((item) => (
              <li key={item.id} className="w-full">
                <button
                  onClick={() => scrollToSection(item.id)}
                  className={`rajasthani-corners w-full text-center py-3 font-display text-xl ${
                    activeSection === item.id 
                      ? 'text-rajasthani-gold-light' 
                      : 'text-amber-100'
                  }`}
                >
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
          
          {/* Mobile footer */}
          <div className="absolute bottom-8 left-0 right-0 text-center">
            <div className="text-amber-100/60 text-sm">
              Royal Rajasthani Experience
            </div>
            <div className="mt-2 flex justify-center">
              <Coffee size={16} className="text-rajasthani-gold-light mr-1" />
              <span className="text-xs text-amber-100/80">Since 1995</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default RajasthaniNavigation;
