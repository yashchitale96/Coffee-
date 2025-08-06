import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Coffee, Heart } from 'lucide-react';
import InteractiveButton from './InteractiveButton';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const GSAPHero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const iconsRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial setup - hide elements
      gsap.set([titleRef.current, subtitleRef.current, buttonsRef.current, iconsRef.current], {
        opacity: 0,
        y: 100
      });

      // Main timeline for entrance animations
      const tl = gsap.timeline();

      // Icons animation with bounce
      tl.to(iconsRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "back.out(1.7)"
      })
      // Title animation with split reveal
      .to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out"
      }, "-=0.5")
      // Subtitle with typewriter effect
      .to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out"
      }, "-=0.8")
      // Buttons with stagger
      .to(buttonsRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.6");

      // Parallax background on scroll - Reduced movement to prevent white space
      gsap.to(backgroundRef.current, {
        yPercent: -20, // Reduced from -50 to -20
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });

      // Fade out title on scroll
      gsap.to(titleRef.current, {
        opacity: 0,
        y: -50,
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1
        }
      });

      // Floating animation for icons
      if (iconsRef.current?.children) {
        gsap.to(Array.from(iconsRef.current.children), {
          y: -20,
          duration: 2,
          ease: "power1.inOut",
          yoyo: true,
          repeat: -1,
          stagger: 0.2
        });
      }

    }, heroRef);

    return () => ctx.revert(); // Cleanup
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen overflow-hidden">
      {/* Parallax Background - Extended to cover all content with extra height */}
      <div 
        ref={backgroundRef}
        className="absolute inset-0 bg-gradient-to-br from-amber-900 via-yellow-900 to-orange-900"
        style={{ height: '150vh', minHeight: '120vh' }} // Larger to compensate for parallax movement
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.pexels.com/photos/324028/pexels-photo-324028.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')`
          }}
        ></div>
        {/* Rajasthani Pattern Overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full bg-repeat" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D2691E' fill-opacity='0.3'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zM10 10c11.046 0 20 8.954 20 20s-8.954 20-20 20-20-8.954-20-20 8.954-20 20-20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen text-center text-white px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div
            ref={iconsRef}
            className="flex items-center justify-center mb-6"
          >
            <Coffee className="w-12 h-12 text-amber-300 mr-4" />
            <Heart className="w-8 h-8 text-red-400" />
            <Coffee className="w-12 h-12 text-amber-300 ml-4" />
          </div>

          <h1
            ref={titleRef}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Brewed with
            <span className="block text-amber-300 italic">Love</span>
          </h1>

          <p
            ref={subtitleRef}
            className="text-xl md:text-2xl mb-8 text-amber-100 max-w-2xl mx-auto leading-relaxed"
          >
            Experience the finest coffee crafted with passion, tradition, and the warmth of Rajasthani hospitality
          </p>

          <div
            ref={buttonsRef}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <InteractiveButton
              variant="primary"
              size="lg"
              onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Explore Our Menu
            </InteractiveButton>
            <InteractiveButton
              variant="outline"
              size="lg"
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              className="border-2 border-white text-white hover:bg-white hover:text-amber-900"
            >
              Our Story
            </InteractiveButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GSAPHero;
