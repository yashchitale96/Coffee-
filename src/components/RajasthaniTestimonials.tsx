import React, { useEffect, useRef } from 'react';
import { Star, Quote } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../utils/rajasthaniTheme.css';

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Define our testimonials
const testimonials = [
  {
    id: 1,
    name: "Rajat Singh",
    position: "Food Blogger",
    rating: 5,
    image: "/images/testimonial1.jpg", // Update with actual image path
    quote: "The cultural ambiance combined with the exquisite coffee flavors transported me straight to royal Rajasthan. Truly a unique experience!",
  },
  {
    id: 2,
    name: "Priya Sharma",
    position: "Local Artist",
    rating: 5,
    image: "/images/testimonial2.jpg", // Update with actual image path
    quote: "As someone who appreciates authentic cultural experiences, I found the Rajasthani-themed coffee house to be a perfect blend of tradition and modern coffee culture.",
  },
  {
    id: 3,
    name: "Vikram Mehta",
    position: "Travel Enthusiast",
    rating: 4,
    image: "/images/testimonial3.jpg", // Update with actual image path
    quote: "The traditional decor and specialty coffees made with Rajasthani spices create an atmosphere unlike any other coffee shop I've visited.",
  },
];

const RajasthaniTestimonials: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Heading animation
    const headingTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: headingRef.current,
        start: "top 80%",
        toggleActions: "play none none none"
      }
    });

    // Safely handle potential null elements
    const headingMain = headingRef.current?.querySelector('.heading-main');
    const headingSub = headingRef.current?.querySelector('.heading-sub');
    const divider = headingRef.current?.querySelector('.rajasthani-divider');

    if (headingMain) {
      headingTimeline.fromTo(
        headingMain, 
        { y: 50, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
      );
    }
    
    if (headingSub) {
      headingTimeline.fromTo(
        headingSub, 
        { y: 30, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.5"
      );
    }
    
    if (divider) {
      headingTimeline.fromTo(
        divider, 
        { scaleX: 0, opacity: 0 }, 
        { scaleX: 1, opacity: 1, duration: 1, ease: "power2.out" },
        "-=0.5"
      );
    }

    // Testimonial cards animation
    const testimonialCards = testimonialsRef.current?.querySelectorAll('.testimonial-card');
    testimonialCards?.forEach((card, index) => {
      gsap.fromTo(card, 
        { 
          y: 100, 
          opacity: 0,
          rotateY: -10
        }, 
        { 
          y: 0, 
          opacity: 1,
          rotateY: 0,
          duration: 0.8,
          ease: "power2.out",
          delay: index * 0.2,
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );
    });

    return () => {
      // Clean up animations
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Render star ratings
  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        size={16} 
        className={`${i < rating ? 'text-rajasthani-gold fill-rajasthani-gold' : 'text-gray-300'}`} 
      />
    ));
  };

  return (
    <div ref={sectionRef} className="py-16 lg:py-24 bg-rajasthani-brown-light/10">
      <div className="container mx-auto px-4">
        {/* Section Heading */}
        <div ref={headingRef} className="text-center mb-16">
          <h3 className="heading-sub text-rajasthani-gold text-sm md:text-base uppercase tracking-wider mb-2 font-medium">
            Words from Our Guests
          </h3>
          <h2 className="heading-main text-3xl md:text-4xl lg:text-5xl font-display mb-4 text-rajasthani-brown-darker">
            Royal Experiences
          </h2>
          <div className="rajasthani-divider max-w-xs mx-auto"></div>
        </div>

        {/* Testimonials Grid */}
        <div 
          ref={testimonialsRef} 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="testimonial-card bg-white rounded-md shadow-lg p-6 transition-transform transform hover:-translate-y-2 hover:shadow-xl relative overflow-hidden group"
            >
              {/* Rajasthani decorative corner element */}
              <div className="absolute top-0 left-0 w-16 h-16 rajasthani-corner-pattern opacity-10"></div>
              <div className="absolute bottom-0 right-0 w-16 h-16 rajasthani-corner-pattern transform rotate-180 opacity-10"></div>
              
              {/* Quote icon */}
              <div className="absolute -right-4 -top-4 text-rajasthani-gold-light opacity-20">
                <Quote size={64} />
              </div>
              
              <div className="flex flex-col h-full relative z-10">
                {/* Rating */}
                <div className="flex mb-4">
                  {renderStars(testimonial.rating)}
                </div>
                
                {/* Quote */}
                <blockquote className="text-lg italic text-rajasthani-brown-darkest mb-6 flex-grow">
                  "{testimonial.quote}"
                </blockquote>
                
                {/* Author info */}
                <div className="flex items-center mt-auto pt-4 border-t border-rajasthani-gold-light/20">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-rajasthani-brown-lightest mr-4">
                    {/* Fallback avatar if no image */}
                    <div className="w-full h-full flex items-center justify-center bg-rajasthani-gold-light/30 text-rajasthani-gold">
                      {testimonial.image ? (
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.name} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-lg font-semibold">
                          {testimonial.name.charAt(0)}
                        </span>
                      )}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-rajasthani-brown-darker">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-rajasthani-brown">
                      {testimonial.position}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Hover effect - rajasthani pattern overlay */}
              <div className="absolute inset-0 bg-rajasthani-pattern opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>
        
        {/* Decorative bottom element */}
        <div className="mt-16 text-center">
          <div className="rajasthani-decorative-element mx-auto"></div>
        </div>
      </div>
    </div>
  );
};

export default RajasthaniTestimonials;
