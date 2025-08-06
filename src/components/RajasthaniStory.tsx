import React, { useEffect, useRef } from 'react';
import { Coffee, Award, Users, Star } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../utils/rajasthaniTheme.css';

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

interface StoryCounterProps {
  value: number;
  suffix?: string;
  label: string;
  delay?: number;
}

// Animated counter component with GSAP
const StoryCounter: React.FC<StoryCounterProps> = ({ value, suffix = '', label, delay = 0 }) => {
  const counterRef = useRef<HTMLDivElement>(null);
  const valueRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const counter = counterRef.current;
    const valueElement = valueRef.current;
    
    if (counter && valueElement) {
      // Create animation for counter appearance
      gsap.fromTo(counter,
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8,
          scrollTrigger: {
            trigger: counter,
            start: "top 85%",
          }
        }
      );
      
      // Animate the counting
      gsap.to(valueElement, {
        innerText: value,
        duration: 2,
        delay: delay,
        snap: { innerText: 1 },
        scrollTrigger: {
          trigger: counter,
          start: "top 85%",
        },
        onUpdate: function() {
          valueElement.textContent = Math.ceil(gsap.getProperty(this.targets()[0], "innerText") as number) + suffix;
        }
      });
    }
  }, [value, suffix, delay]);
  
  return (
    <div ref={counterRef} className="counter-container">
      <div className="text-2xl md:text-3xl font-display font-bold text-rajasthani-gold-DEFAULT mb-1">
        <span ref={valueRef}>0</span>
      </div>
      <div className="text-sm text-rajasthani-brown-DEFAULT/80">{label}</div>
    </div>
  );
};

const RajasthaniStory: React.FC = () => {
  const storyRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const decorativeElementRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial setup
      gsap.set([headingRef.current, subheadingRef.current], {
        opacity: 0,
        y: 50
      });
      
      gsap.set(timelineRef.current, {
        opacity: 0
      });
      
      gsap.set(imageRef.current, {
        clipPath: "inset(100% 0 0 0)",
        scale: 1.1
      });
      
      gsap.set(contentRef.current, {
        opacity: 0,
        x: 50
      });
      
      gsap.set(decorativeElementRef.current, {
        opacity: 0,
        scale: 0.5,
        rotation: 45
      });
      
      // Create main timeline
      const mainTl = gsap.timeline({
        scrollTrigger: {
          trigger: storyRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });
      
      // Heading animations
      mainTl.to(headingRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "back.out(1.7)"
      })
      .to(subheadingRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.5")
      .to(decorativeElementRef.current, {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 1.2,
        ease: "elastic.out(1, 0.3)"
      }, "-=0.7")
      
      // Reveal the image with a wipe effect
      .to(imageRef.current, {
        clipPath: "inset(0% 0 0 0)",
        scale: 1,
        duration: 1.2,
        ease: "power2.inOut"
      }, "-=0.8")
      
      // Bring in the content
      .to(contentRef.current, {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power3.out"
      }, "-=0.8")
      
      // Reveal the timeline
      .to(timelineRef.current, {
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power1.out"
      }, "-=0.5");
      
      // Continuous subtle floating animation for decorative elements
      gsap.to(decorativeElementRef.current, {
        y: "-10px",
        rotation: 10,
        duration: 3,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
      });
      
      // Subtle shine effect for the gold elements
      const goldElements = document.querySelectorAll('.gold-shine');
      goldElements.forEach((el) => {
        gsap.fromTo(el, 
          { backgroundPosition: '200% 0' },
          { 
            backgroundPosition: '-200% 0', 
            duration: 3,
            repeat: -1,
            ease: "linear" 
          }
        );
      });
      
      return () => ctx.revert(); // Cleanup function
    }, storyRef);
  }, []);
  
  return (
    <div ref={storyRef} className="py-20 relative overflow-hidden bg-gradient-to-b from-amber-50 to-amber-100/50">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 bg-rajasthani-pattern opacity-5"></div>
      
      {/* Rajasthani decorative element */}
      <div 
        ref={decorativeElementRef}
        className="absolute top-12 left-1/2 transform -translate-x-1/2 w-16 h-16 pointer-events-none z-10"
      >
        <div className="w-16 h-16 relative">
          {/* Mandala inspired decorative element */}
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#DAA520" />
                <stop offset="50%" stopColor="#FFD700" />
                <stop offset="100%" stopColor="#DAA520" />
              </linearGradient>
            </defs>
            <g fill="url(#goldGradient)">
              <circle cx="50" cy="50" r="25" fill="none" stroke="url(#goldGradient)" strokeWidth="2" />
              <circle cx="50" cy="50" r="35" fill="none" stroke="url(#goldGradient)" strokeWidth="1.5" strokeDasharray="5,5" />
              <circle cx="50" cy="50" r="15" fill="none" stroke="url(#goldGradient)" strokeWidth="1" />
              
              {/* Decorative spokes */}
              {[...Array(8)].map((_, i) => (
                <line 
                  key={i}
                  x1="50"
                  y1="50"
                  x2={50 + 40 * Math.cos(i * Math.PI / 4)}
                  y2={50 + 40 * Math.sin(i * Math.PI / 4)}
                  stroke="url(#goldGradient)"
                  strokeWidth="1"
                />
              ))}
              
              {/* Decorative elements at the end of each spoke */}
              {[...Array(8)].map((_, i) => (
                <circle 
                  key={i}
                  cx={50 + 40 * Math.cos(i * Math.PI / 4)}
                  cy={50 + 40 * Math.sin(i * Math.PI / 4)}
                  r="3"
                  fill="url(#goldGradient)"
                />
              ))}
              
              {/* Central ornate element */}
              <circle cx="50" cy="50" r="8" fill="url(#goldGradient)" />
            </g>
          </svg>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16 relative">
          <h2 ref={headingRef} className="rajasthani-heading text-4xl md:text-6xl font-display font-bold mb-4">
            Our Royal Story
          </h2>
          <p ref={subheadingRef} className="text-xl text-rajasthani-brown-dark max-w-3xl mx-auto leading-relaxed">
            A tale of passion, tradition, and the rich cultural heritage of Rajasthan in every cup we serve
          </p>
          <div className="rajasthani-divider max-w-xs mx-auto mt-8"></div>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left column with image */}
          <div className="relative overflow-hidden rounded-lg shadow-rajasthani-lg">
            {/* Main image */}
            <img 
              ref={imageRef}
              src="https://images.pexels.com/photos/1833769/pexels-photo-1833769.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
              alt="Traditional Coffee Brewing Process"
              className="w-full h-auto object-cover rounded-lg"
              style={{ aspectRatio: '4/3' }}
            />
            
            {/* Ornate frame */}
            <div className="absolute inset-0 border-2 border-rajasthani-gold-light/20 rounded-lg pointer-events-none"></div>
            
            {/* Decorative corner elements */}
            <div className="absolute top-4 left-4 w-12 h-12 opacity-70">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <path d="M0,0 L60,0 L60,10 L10,10 L10,60 L0,60 Z" fill="#DAA520" />
              </svg>
            </div>
            <div className="absolute top-4 right-4 w-12 h-12 opacity-70">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <path d="M40,0 L100,0 L100,60 L90,60 L90,10 L40,10 Z" fill="#DAA520" />
              </svg>
            </div>
            <div className="absolute bottom-4 left-4 w-12 h-12 opacity-70">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <path d="M0,40 L0,100 L60,100 L60,90 L10,90 L10,40 Z" fill="#DAA520" />
              </svg>
            </div>
            <div className="absolute bottom-4 right-4 w-12 h-12 opacity-70">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <path d="M90,40 L90,90 L40,90 L40,100 L100,100 L100,40 Z" fill="#DAA520" />
              </svg>
            </div>
            
            {/* Floating decorative element */}
            <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-rajasthani-gradient rounded-full shadow-lg border border-rajasthani-gold-light flex items-center justify-center transform rotate-12">
              <Coffee size={32} className="text-white" />
            </div>
          </div>
          
          {/* Right column with story content */}
          <div ref={contentRef} className="space-y-8">
            <div className="rajasthani-corners p-6 bg-white/80 backdrop-blur-sm">
              <span></span>{/* Required for rajasthani-corners to work */}
              <h3 className="text-2xl md:text-3xl font-display font-bold text-rajasthani-brown-dark mb-4 gold-shine" 
                style={{ 
                  backgroundImage: 'linear-gradient(90deg, transparent, rgba(218,165,32,0.4), transparent)',
                  backgroundSize: '200% 100%',
                  backgroundRepeat: 'no-repeat'
                }}
              >
                A Heritage of Excellence
              </h3>
              <p className="text-rajasthani-brown-DEFAULT/90 leading-relaxed">
                Founded in 1995, our coffee house carries forward the royal traditions of Rajasthan's hospitality. 
                What began as a small café in the heart of Jaipur has now grown into a beloved destination where 
                traditional recipes meet contemporary coffee culture.
              </p>
            </div>
            
            {/* Story timeline */}
            <div ref={timelineRef} className="relative pl-10 border-l-2 border-rajasthani-gold-light/30 space-y-8">
              {[
                {
                  year: "1995",
                  title: "The Beginning",
                  content: "Started as a small family café in Jaipur with traditional recipes"
                },
                {
                  year: "2005",
                  title: "Expansion",
                  content: "Introduced international coffee varieties with local Rajasthani twists"
                },
                {
                  year: "2015",
                  title: "Recognition",
                  content: "Awarded for preserving cultural heritage while innovating coffee blends"
                },
                {
                  year: "Today",
                  title: "Our Legacy Continues",
                  content: "Bringing the authentic taste of royal Rajasthan to coffee lovers worldwide"
                }
              ].map((item, index) => (
                <div key={index} className="relative">
                  {/* Timeline node */}
                  <div className="absolute -left-[43px] top-0 w-8 h-8 rounded-full bg-rajasthani-gradient flex items-center justify-center shadow-md border border-rajasthani-gold-light">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                  
                  {/* Content */}
                  <div className="mb-2">
                    <span className="inline-block py-1 px-3 bg-rajasthani-gold-DEFAULT/20 text-rajasthani-brown-dark text-sm font-semibold rounded">
                      {item.year}
                    </span>
                  </div>
                  <h4 className="text-xl font-display font-bold text-rajasthani-brown-DEFAULT mb-1">
                    {item.title}
                  </h4>
                  <p className="text-rajasthani-brown-DEFAULT/80">
                    {item.content}
                  </p>
                </div>
              ))}
            </div>
            
            {/* Stats section */}
            <div 
              ref={statsRef} 
              className="grid grid-cols-2 gap-6 mt-8"
            >
              {[
                { icon: Award, value: 25, suffix: "+", label: "Years of Heritage" },
                { icon: Users, value: 10000, suffix: "+", label: "Happy Guests" },
                { icon: Coffee, value: 50, suffix: "+", label: "Royal Blends" },
                { icon: Star, value: 100, suffix: "%", label: "Authentic" }
              ].map((stat, index) => (
                <div 
                  key={index}
                  className="rajasthani-card p-4 text-center"
                >
                  <div className="mb-2">
                    <stat.icon className="w-6 h-6 text-rajasthani-gold mx-auto" />
                  </div>
                  <StoryCounter 
                    value={stat.value} 
                    suffix={stat.suffix} 
                    label={stat.label} 
                    delay={index * 0.2} 
                  />
                </div>
              ))}
            </div>
            
            {/* CTA Button */}
            <div className="mt-8 text-center lg:text-left">
              <button 
                className="rajasthani-button px-6 py-2.5"
                onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <span className="flex items-center justify-center">
                  <Coffee size={16} className="mr-2" />
                  Explore Our Royal Menu
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom decorative border */}
      <div className="absolute bottom-0 left-0 right-0 h-6">
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-rajasthani-gold-light to-transparent opacity-30"></div>
      </div>
    </div>
  );
};

export default RajasthaniStory;
