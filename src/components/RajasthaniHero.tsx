import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Coffee, Star, ChevronDown } from 'lucide-react';
import GSAPAnimations from '../utils/gsapAnimations';
import '../utils/rajasthaniTheme.css';
import rajasthaniCharacterImg from '../asset/rajasthani welcome.png';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, SplitText);

const RajasthaniHero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const decorationRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const characterRef = useRef<HTMLDivElement>(null);
  const ornamentRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Create a master timeline for the hero animations
    const masterTl = gsap.timeline();
    
    // Initial setup - hide elements
    gsap.set([titleRef.current, subtitleRef.current, ctaRef.current, characterRef.current, ornamentRef?.current, scrollIndicatorRef?.current], {
      opacity: 0
    });
    
    gsap.set(titleRef.current, { y: 50 });
    gsap.set(subtitleRef.current, { y: 30 });
    gsap.set(ctaRef.current, { y: 20 });
    gsap.set(characterRef.current, { x: -100 });
    if (scrollIndicatorRef?.current) gsap.set(scrollIndicatorRef.current, { y: 20 });
    
    // Initial setup for decorative elements
    gsap.set(decorationRef.current, { scale: 0.5, opacity: 0 });
    
    // Type definition for SplitText instances
    interface SplitTextInstance {
      chars: Element[];
      words: Element[];
      lines: Element[];
      revert: () => void;
    }
    
    // Split text for more detailed animation
    let titleSplit: SplitTextInstance | null = null;
    let subtitleSplit: SplitTextInstance | null = null;
    
    if (titleRef.current && subtitleRef.current) {
      try {
        titleSplit = new SplitText(titleRef.current, { type: "chars, words" }) as SplitTextInstance;
        subtitleSplit = new SplitText(subtitleRef.current, { type: "chars, words" }) as SplitTextInstance;
        
        // Hide the split text initially
        gsap.set([titleSplit.chars, subtitleSplit.chars], { opacity: 0, y: 20 });
      } catch (error) {
        console.log("SplitText initialization failed, falling back to regular animation");
      }
    }
    
    // Decorative elements animation - 3D rotational reveal
    const decorTl = gsap.timeline();
    decorTl.to(decorationRef.current, {
      scale: 1,
      opacity: 1, 
      duration: 1.2,
      rotationY: 360,
      ease: "back.out(1.7)",
    });
    
    // Character animation with bounce effect
    const characterTl = gsap.timeline();
    characterTl.to(characterRef.current, {
      opacity: 1,
      x: 0,
      duration: 1.5,
      ease: "elastic.out(1, 0.5)"
    });
    
    // Title animation with SplitText if available
    const titleTl = gsap.timeline();
    if (titleSplit) {
      titleTl.to(titleSplit.chars, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.03,
        ease: "back.out(1.7)"
      });
    } else if (titleRef.current) {
      // Fallback if SplitText fails
      titleTl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "back.out(1.2)"
      });
    }
    
    // Apply gold shimmer effect to title
    if (titleRef.current) {
      const shimmerTl = gsap.timeline({ repeat: -1, repeatDelay: 3 });
      shimmerTl.to(titleRef.current, {
        backgroundSize: "200% 100%",
        backgroundPosition: "-100% 0",
        duration: 1.5,
        ease: "sine.inOut",
        delay: 2
      })
      .to(titleRef.current, {
        backgroundPosition: "0% 0",
        duration: 0,
      });
    }
    
    // Subtitle animation with SplitText if available
    const subtitleTl = gsap.timeline();
    if (subtitleSplit) {
      subtitleTl.to(subtitleSplit.chars, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.02,
        ease: "power2.out"
      });
    } else if (subtitleRef.current) {
      // Fallback if SplitText fails
      subtitleTl.to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out"
      });
    }
    
    // CTA buttons with 3D effect - ensure they remain visible
    const ctaTl = gsap.timeline();
    if (ctaRef.current) {
      // Make buttons visible by default to avoid disappearance
      gsap.set(ctaRef.current, { opacity: 1, visibility: "visible" });
      
      const ctaButtons = ctaRef.current.querySelectorAll('button');
      
      // Force visible immediately to prevent disappearance
      gsap.set(ctaButtons, { opacity: 1, visibility: "visible" });
      
      ctaTl.fromTo(ctaButtons, 
        { 
          opacity: 0.5, 
          y: 20,
          rotationX: -30,
          transformOrigin: "50% 50%"
        },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "back.out(1.7)"
        }
      );
      
      // Add multiple safety checks to ensure buttons remain visible
      gsap.delayedCall(1, () => {
        gsap.to(ctaButtons, {
          opacity: 1,
          visibility: "visible",
          duration: 0.3
        });
      });
      
      gsap.delayedCall(3, () => {
        gsap.to(ctaButtons, {
          opacity: 1,
          visibility: "visible",
          duration: 0.3
        });
      });
    }
    
    // Add the individual timelines to the master timeline with offsets for overlapping
    // Adjust timings to make animations start sooner and run more reliably
    masterTl
      .add(decorTl, 0.2)
      .add(characterTl, 0.5)
      .add(titleTl, 0.8)
      .add(subtitleTl, 1.0)
      .add(ctaTl, 1.2); // Start CTA animation earlier
      
    // Animate the special features section
    const specialFeatures = ctaRef.current?.nextElementSibling;
    if (specialFeatures) {
      const featureItems = specialFeatures.querySelectorAll('div[class*="flex items-center"]');
      gsap.fromTo(featureItems, 
        { opacity: 0, x: -20 },
        { 
          opacity: 1, 
          x: 0, 
          duration: 0.6, 
          stagger: 0.15,
          delay: 2.0,
          ease: "power2.out" 
        }
      );
    }
    
    // Add continuous animations
    
    // Enhanced floating animation for character with slight rotation
    gsap.to(characterRef.current, {
      y: "-=15",
      x: "+=5",
      rotation: "+=2",
      duration: 3,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1
    });
    
    // Mandala rotation with pulsing effect
    const mandalaTl = gsap.timeline({ repeat: -1 });
    mandalaTl.to(decorationRef.current, {
      rotation: 360,
      duration: 60,
      ease: "none",
    });
    
    // Add subtle pulse to the mandala
    gsap.to(decorationRef.current, {
      scale: 1.05,
      opacity: 0.25,
      duration: 4,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1
    });
    
    // Create subtle parallax effect for background elements on scroll
    if (decorationRef.current) {
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          gsap.to(decorationRef.current, {
            y: self.progress * 100,
            rotation: 180 * self.progress,
            duration: 0
          });
        }
      });
      
      // Enhanced scroll interaction for title and subtitle
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: "top top",
        end: "30% top",
        scrub: true,
        onUpdate: (self) => {
          if (titleRef.current) {
            gsap.to(titleRef.current, {
              y: self.progress * 30,
              opacity: 1 - self.progress * 0.3,
              duration: 0
            });
          }
          if (subtitleRef.current) {
            gsap.to(subtitleRef.current, {
              y: self.progress * 50,
              opacity: 1 - self.progress * 0.5,
              duration: 0
            });
          }
        }
      });
    }
    
    // Animate the floating decorative elements with random movement
    if (ornamentRef?.current) {
      const stars = ornamentRef.current.querySelectorAll('.rajasthani-star');
      const florals = ornamentRef.current.querySelectorAll('.rajasthani-floral');
      
      // Fade in ornamental elements
      gsap.to([stars, florals], {
        opacity: 'random(0.2, 0.6)',
        duration: 1.5,
        stagger: 0.1,
        delay: 2
      });
      
      // Random floating animations for stars
      stars.forEach(star => {
        gsap.to(star, {
          x: 'random(-20, 20)',
          y: 'random(-20, 20)',
          rotation: 'random(-15, 15)',
          duration: 'random(3, 6)',
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        });
      });
      
      // Random floating animations for florals
      florals.forEach(floral => {
        gsap.to(floral, {
          x: 'random(-15, 15)',
          y: 'random(-15, 15)',
          rotation: 'random(0, 360)',
          duration: 'random(10, 20)',
          repeat: -1,
          ease: 'none'
        });
      });
    }
    
    // Animate the scroll indicator
    if (scrollIndicatorRef?.current) {
      gsap.to(scrollIndicatorRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 3.5
      });
      
      // Make it pulse
      gsap.to(scrollIndicatorRef.current, {
        y: 10,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
      
      // Add click handler
      scrollIndicatorRef.current.addEventListener('click', () => {
        gsap.to(window, {
          duration: 1,
          scrollTo: { y: window.innerHeight, autoKill: true },
          ease: 'power2.inOut'
        });
      });
    }
    
    return () => {
      // Clean up all animations and scroll triggers
      masterTl.kill();
      mandalaTl.kill();
      ScrollTrigger.getAll().forEach(st => st.kill());
      
      // Clean up SplitText instances if they exist
      if (titleSplit) titleSplit.revert();
      if (subtitleSplit) subtitleSplit.revert();
      
      // Remove event listeners
      if (scrollIndicatorRef?.current) {
        scrollIndicatorRef.current.removeEventListener('click', () => {});
      }
    };
  }, []);
  
  return (
    <div 
      ref={heroRef}
      className="relative min-h-screen pt-20 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #8B4513 0%, #CD853F 25%, #DAA520 50%, #B8860B 75%, #8B4513 100%)',
      }}
    >
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 bg-rajasthani-pattern opacity-10"></div>
      
      {/* Decorative mandala */}
      <div 
        ref={decorationRef}
        className="absolute opacity-20 w-[800px] h-[800px] left-1/2 top-1/4 -translate-x-1/2 pointer-events-none"
      >
        <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="mandalaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFD700" />
              <stop offset="100%" stopColor="#FFA500" />
            </linearGradient>
          </defs>
          
          {/* Stylized mandala pattern */}
          <g fill="url(#mandalaGradient)" opacity="0.8">
            {/* Outer circle */}
            <circle cx="250" cy="250" r="200" fill="none" stroke="url(#mandalaGradient)" strokeWidth="1" />
            
            {/* Decorative elements */}
            {[...Array(24)].map((_, i) => (
              <path 
                key={i}
                d={`M 250 250 L ${250 + 200 * Math.cos(i * Math.PI / 12)} ${250 + 200 * Math.sin(i * Math.PI / 12)} 
                  A 200 200 0 0 1 ${250 + 200 * Math.cos((i+1) * Math.PI / 12)} ${250 + 200 * Math.sin((i+1) * Math.PI / 12)} Z`}
                fill="none"
                stroke="url(#mandalaGradient)"
                strokeWidth="0.5"
                opacity="0.5"
              />
            ))}
            
            {/* Inner circles */}
            <circle cx="250" cy="250" r="150" fill="none" stroke="url(#mandalaGradient)" strokeWidth="0.8" opacity="0.6" />
            <circle cx="250" cy="250" r="100" fill="none" stroke="url(#mandalaGradient)" strokeWidth="0.6" opacity="0.4" />
            <circle cx="250" cy="250" r="50" fill="none" stroke="url(#mandalaGradient)" strokeWidth="0.5" opacity="0.3" />
          </g>
        </svg>
      </div>
      
      {/* Content container */}
      <div className="container mx-auto px-4 h-full flex flex-col md:flex-row items-center justify-center">
        {/* Character - visible on medium screens and up */}
        <div 
          ref={characterRef}
          className="hidden md:block md:w-1/3 lg:w-2/5 relative"
        >
          <div className="w-full h-full max-h-[500px] relative">
            <img 
              src={rajasthaniCharacterImg}
              alt="Rajasthani Character Welcome"
              className="w-full h-full object-contain"
              style={{
                filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.4))'
              }}
            />
            
            {/* Decorative aura */}
            <div className="absolute inset-0 opacity-60">
              <div className="absolute inset-0 rounded-full border-2 border-amber-300 animate-pulse scale-110"></div>
              <div className="absolute inset-0 rounded-full border border-yellow-400 animate-pulse scale-125 animation-delay-200"></div>
              <div className="absolute inset-0 rounded-full border border-orange-400 animate-pulse scale-140 animation-delay-400"></div>
            </div>
          </div>
        </div>
        
        {/* Text content */}
        <div className="w-full md:w-2/3 lg:w-3/5 px-4 md:px-10 flex flex-col items-center md:items-start text-center md:text-left pt-10 md:pt-0">
          {/* Main heading */}
          <div ref={titleRef} className="mb-6">
            <div className="mb-2 text-amber-200 text-sm font-light flex items-center justify-center md:justify-start">
              <span>🙏 नमस्ते • WELCOME</span>
              <span className="mx-2">•</span>
              <span className="flex items-center">
                <Coffee size={14} className="mr-1.5 text-amber-200" />
                <span>SINCE 1995</span>
              </span>
            </div>
            
            <h1 className="rajasthani-heading text-4xl sm:text-5xl md:text-6xl font-display font-bold mb-2">
              कॉफी हाउस
            </h1>
            <h2 className="text-2xl md:text-3xl text-amber-100 font-light tracking-wide">
              Royal Coffee Experience
            </h2>
            <div className="mt-2 bg-rajasthani-gold/10 backdrop-blur-sm px-3 py-1 rounded-full inline-block border border-amber-300/20">
              <span className="text-amber-100 text-xs md:text-sm">A Taste of Rajasthan's Royal Heritage</span>
            </div>
          </div>
          
          {/* Subtitle with separator */}
          <div ref={subtitleRef} className="max-w-xl mb-8">
            <div className="w-24 h-0.5 bg-amber-300 mb-6 mx-auto md:mx-0 opacity-60"></div>
            <p className="text-amber-50 text-lg md:text-xl font-light">
              Experience the perfect blend of traditional Rajasthani hospitality and premium coffee culture in an authentic royal setting. Each cup tells a story of our rich heritage and passion for excellence.
            </p>
            <p className="text-amber-100/80 text-base mt-3 font-light italic">
              "Where every sip transports you to the palaces of Rajasthan"
            </p>
          </div>
          
          {/* CTA Buttons */}
          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4">
            <button className="rajasthani-button cta-button px-8 py-3 text-lg shadow-rajasthani">
              Explore Menu
            </button>
            <button className="cta-button border border-amber-300 text-amber-100 hover:bg-amber-900/30 px-8 py-3 text-lg transition-colors rounded">
              Our Story
            </button>
          </div>
          
          {/* Special features highlight */}
          <div className="mt-8 flex flex-wrap gap-4 justify-center md:justify-start">
            <div className="flex items-center bg-rajasthani-brown-dark/30 px-3 py-1.5 rounded-full">
              <div className="w-3 h-3 rounded-full bg-rajasthani-gold mr-2"></div>
              <span className="text-amber-100 text-sm">Authentic Recipes</span>
            </div>
            <div className="flex items-center bg-rajasthani-brown-dark/30 px-3 py-1.5 rounded-full">
              <div className="w-3 h-3 rounded-full bg-rajasthani-gold mr-2"></div>
              <span className="text-amber-100 text-sm">Premium Beans</span>
            </div>
            <div className="flex items-center bg-rajasthani-brown-dark/30 px-3 py-1.5 rounded-full">
              <div className="w-3 h-3 rounded-full bg-rajasthani-gold mr-2"></div>
              <span className="text-amber-100 text-sm">Royal Atmosphere</span>
            </div>
          </div>
          
          {/* Ornamental footer */}
          <div className="mt-10 mb-8 opacity-50 w-full flex justify-center md:justify-start">
            <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-amber-300 to-transparent"></div>
          </div>
        </div>
      </div>
      
      {/* Decorative floating elements */}
      <div ref={ornamentRef} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[15%] left-[10%] w-8 h-8 rajasthani-star opacity-30"></div>
        <div className="absolute top-[30%] right-[15%] w-10 h-10 rajasthani-star opacity-40"></div>
        <div className="absolute bottom-[25%] left-[20%] w-6 h-6 rajasthani-star opacity-20"></div>
        <div className="absolute top-[45%] right-[25%] w-12 h-12 rajasthani-floral opacity-30"></div>
        <div className="absolute bottom-[35%] right-[10%] w-8 h-8 rajasthani-star opacity-25"></div>
      </div>

      {/* Scroll indicator */}
      <div ref={scrollIndicatorRef} className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
        <div className="flex flex-col items-center text-amber-200/60 cursor-pointer hover:text-amber-200 transition-all">
          <ChevronDown size={20} className="animate-bounce" />
          <span className="text-xs mt-1 font-light">Scroll Down</span>
        </div>
      </div>
      
      {/* Bottom decorative border */}
      <div className="absolute bottom-0 left-0 right-0 h-6 overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0 h-12">
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-amber-300/50"></div>
          <div className="absolute top-3 left-0 right-0 h-0.5 bg-amber-300/30"></div>
          <div className="absolute top-6 left-0 right-0 h-0.5 bg-amber-300/20"></div>
          
          {/* Small decorative elements */}
          {[...Array(20)].map((_, i) => (
            <div 
              key={i}
              className="absolute top-0 w-3 h-3"
              style={{
                left: `${i * 5}%`,
                backgroundColor: 'rgba(255, 215, 0, 0.2)',
                clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)'
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RajasthaniHero;
