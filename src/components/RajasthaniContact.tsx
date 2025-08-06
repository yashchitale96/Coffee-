import React, { useEffect, useRef, useState } from 'react';
import { Send, MapPin, Phone, Mail } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../utils/rajasthaniTheme.css';

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const RajasthaniContact: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [formStatus, setFormStatus] = useState<{
    status: 'idle' | 'submitting' | 'success' | 'error';
    message: string;
  }>({
    status: 'idle',
    message: '',
  });

  useEffect(() => {
    // Heading animation
    const headingElements = headingRef.current;
    if (headingElements) {
      const headingMain = headingElements.querySelector('.heading-main');
      const headingSub = headingElements.querySelector('.heading-sub');
      const divider = headingElements.querySelector('.rajasthani-divider');

      gsap.timeline({
        scrollTrigger: {
          trigger: headingElements,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      })
      .fromTo(
        headingMain, 
        { y: 50, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
      )
      .fromTo(
        headingSub, 
        { y: 30, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.5"
      )
      .fromTo(
        divider, 
        { scaleX: 0, opacity: 0 }, 
        { scaleX: 1, opacity: 1, duration: 1, ease: "power2.out" },
        "-=0.5"
      );
    }

    // Form animation
    const form = formRef.current;
    if (form) {
      const formElements = form.querySelectorAll('.form-element');
      gsap.fromTo(formElements,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: form,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );
    }

    // Map animation
    const map = mapRef.current;
    if (map) {
      gsap.fromTo(map,
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: map,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );
    }

    return () => {
      // Clean up animations
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus({ status: 'submitting', message: 'Sending message...' });

    // Simulate form submission - replace with actual API call
    setTimeout(() => {
      setFormStatus({
        status: 'success',
        message: 'Thank you for your message! We will get back to you soon.'
      });
      
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });

      // Animation for success message
      const successMessage = document.querySelector('.form-status-message');
      if (successMessage) {
        gsap.fromTo(
          successMessage,
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.5 }
        );
      }
    }, 1500);
  };

  return (
    <div ref={sectionRef} className="py-16 lg:py-24 bg-rajasthani-pattern-light">
      <div className="container mx-auto px-4">
        {/* Section Heading */}
        <div ref={headingRef} className="text-center mb-16">
          <h3 className="heading-sub text-rajasthani-gold text-sm md:text-base uppercase tracking-wider mb-2 font-medium">
            Reach Out To Us
          </h3>
          <h2 className="heading-main text-3xl md:text-4xl lg:text-5xl font-display mb-4 text-rajasthani-brown-darker">
            Connect With Tradition
          </h2>
          <div className="rajasthani-divider max-w-xs mx-auto"></div>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
          {/* Contact Form */}
          <div className="lg:w-1/2">
            <form 
              ref={formRef} 
              onSubmit={handleSubmit}
              className="bg-white rounded-lg shadow-lg p-8 relative overflow-hidden"
            >
              {/* Rajasthani decorative elements */}
              <div className="absolute top-0 left-0 w-20 h-20 rajasthani-corner-pattern opacity-10 z-0"></div>
              <div className="absolute bottom-0 right-0 w-20 h-20 rajasthani-corner-pattern transform rotate-180 opacity-10 z-0"></div>
              
              <div className="relative z-10">
                <div className="form-element mb-6">
                  <label 
                    htmlFor="name" 
                    className="block text-rajasthani-brown-dark text-sm font-medium mb-2"
                  >
                    Your Name
                  </label>
                  <input 
                    type="text" 
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-md border border-rajasthani-gold-light/30 focus:outline-none focus:border-rajasthani-gold-light focus:ring-1 focus:ring-rajasthani-gold-light/50 bg-white"
                    placeholder="Enter your name"
                    required
                  />
                </div>
                
                <div className="form-element mb-6">
                  <label 
                    htmlFor="email" 
                    className="block text-rajasthani-brown-dark text-sm font-medium mb-2"
                  >
                    Email Address
                  </label>
                  <input 
                    type="email" 
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-md border border-rajasthani-gold-light/30 focus:outline-none focus:border-rajasthani-gold-light focus:ring-1 focus:ring-rajasthani-gold-light/50 bg-white"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                
                <div className="form-element mb-6">
                  <label 
                    htmlFor="phone" 
                    className="block text-rajasthani-brown-dark text-sm font-medium mb-2"
                  >
                    Phone Number
                  </label>
                  <input 
                    type="tel" 
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-md border border-rajasthani-gold-light/30 focus:outline-none focus:border-rajasthani-gold-light focus:ring-1 focus:ring-rajasthani-gold-light/50 bg-white"
                    placeholder="Enter your phone number"
                  />
                </div>
                
                <div className="form-element mb-6">
                  <label 
                    htmlFor="message" 
                    className="block text-rajasthani-brown-dark text-sm font-medium mb-2"
                  >
                    Your Message
                  </label>
                  <textarea 
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-3 rounded-md border border-rajasthani-gold-light/30 focus:outline-none focus:border-rajasthani-gold-light focus:ring-1 focus:ring-rajasthani-gold-light/50 bg-white resize-none"
                    placeholder="Enter your message"
                    required
                  ></textarea>
                </div>
                
                <div className="form-element">
                  <button 
                    type="submit"
                    disabled={formStatus.status === 'submitting'}
                    className="w-full bg-gradient-to-r from-rajasthani-gold-light to-rajasthani-gold text-white font-medium py-3 px-6 rounded-md flex items-center justify-center hover:from-rajasthani-gold hover:to-rajasthani-gold-dark transition duration-300 relative overflow-hidden group"
                  >
                    <span className="relative z-10 flex items-center">
                      {formStatus.status === 'submitting' ? 'Sending...' : 'Send Message'}
                      <Send size={18} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                    <span className="absolute inset-0 bg-rajasthani-pattern opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
                  </button>
                </div>
                
                {formStatus.status !== 'idle' && (
                  <div className={`mt-6 p-4 rounded-md form-status-message ${
                    formStatus.status === 'success' 
                      ? 'bg-green-50 text-green-800 border border-green-200' 
                      : formStatus.status === 'error'
                        ? 'bg-red-50 text-red-800 border border-red-200'
                        : 'bg-amber-50 text-amber-800 border border-amber-200'
                  }`}>
                    {formStatus.message}
                  </div>
                )}
              </div>
            </form>
          </div>
          
          {/* Contact Information & Map */}
          <div ref={mapRef} className="lg:w-1/2">
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8 relative overflow-hidden">
              {/* Rajasthani decorative elements */}
              <div className="absolute top-0 right-0 w-16 h-16 rajasthani-corner-pattern opacity-10 transform rotate-90"></div>
              
              <h3 className="text-2xl font-display text-rajasthani-brown-darker mb-6">
                Visit Our Coffee House
              </h3>
              
              <div className="space-y-6">
                <div className="flex">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-12 h-12 rounded-full bg-rajasthani-gold-light/20 flex items-center justify-center">
                      <MapPin className="text-rajasthani-gold" size={24} />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-rajasthani-brown-dark mb-1">
                      Our Location
                    </h4>
                    <p className="text-rajasthani-brown">
                      123 Jaipur Palace Road,<br />
                      Jaipur, Rajasthan 302001
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-12 h-12 rounded-full bg-rajasthani-gold-light/20 flex items-center justify-center">
                      <Phone className="text-rajasthani-gold" size={24} />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-rajasthani-brown-dark mb-1">
                      Contact Number
                    </h4>
                    <p className="text-rajasthani-brown">
                      +91 98765 43210<br />
                      +91 91234 56789
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-12 h-12 rounded-full bg-rajasthani-gold-light/20 flex items-center justify-center">
                      <Mail className="text-rajasthani-gold" size={24} />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-rajasthani-brown-dark mb-1">
                      Email Address
                    </h4>
                    <p className="text-rajasthani-brown">
                      info@rajasthanicoffee.com<br />
                      support@rajasthanicoffee.com
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Map Placeholder - Replace with actual map component if needed */}
            <div className="bg-white rounded-lg shadow-lg p-2 h-[300px] relative overflow-hidden">
              <div className="w-full h-full bg-gray-200 rounded-md flex items-center justify-center">
                {/* Replace this with an actual map component */}
                <div className="text-center p-6">
                  <p className="text-rajasthani-brown-dark mb-2">
                    Map integration will appear here
                  </p>
                  <p className="text-sm text-rajasthani-brown">
                    (Google Maps or other map provider)
                  </p>
                </div>
              </div>
              
              {/* Rajasthani decorative border */}
              <div className="absolute inset-0 border-4 border-rajasthani-pattern-border opacity-20 pointer-events-none"></div>
            </div>
          </div>
        </div>
        
        {/* Decorative bottom element */}
        <div className="mt-16 text-center">
          <div className="rajasthani-decorative-element mx-auto"></div>
        </div>
      </div>
    </div>
  );
};

export default RajasthaniContact;
