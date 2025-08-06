import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import rajasthaniCharacterImg from '../asset/rajasthani welcome.png';
// Using the same image temporarily - will be replaced with actual female character
import rajasthaniFemaleCharacterImg from '../asset/female_welcome.png';

interface RajasthaniLoadingScreenProps {
  onComplete: () => void;
}

const RajasthaniLoadingScreen: React.FC<RajasthaniLoadingScreenProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const characterRef = useRef<HTMLDivElement>(null);
  const femaleCharacterRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Hide the exit curtain initially
    gsap.set(curtainRef.current, {
      scaleY: 0
    });

    const tl = gsap.timeline({
      onComplete: () => {
        // Add a brief pause before exit animation
        setTimeout(() => {
          // Theatrical curtain drop animation
          gsap.to(curtainRef.current, {
            scaleY: 1, // Scale up to cover screen
            duration: 1.8, // Longer for dramatic effect
            ease: "power3.inOut", // More dramatic easing
            transformOrigin: "top",
            onComplete: () => {
              // Add a brief final pause before completing
              setTimeout(onComplete, 300);
            }
          });
        }, 800); // 0.8 second pause before exit
      }
    });

    // Initial setup - everything starts hidden
    gsap.set([logoRef.current, textRef.current, progressRef.current], {
      opacity: 0,
      y: 50
    });

    // Character starts from left side, off-screen
    gsap.set(characterRef.current, {
      opacity: 0,
      x: -120,
      scale: 0.8
    });

    // Female character starts from right side, off-screen
    gsap.set(femaleCharacterRef.current, {
      opacity: 0,
      x: 120,
      scale: 0.8
    });

    // Main animation sequence
    tl
      // 1. Character entrance - welcoming gesture from left
      .to(characterRef.current, {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 1.2,
        ease: "back.out(1.4)"
      })
      
      // 1.5. Female character entrance - welcoming gesture from right
      .to(femaleCharacterRef.current, {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 1.2,
        ease: "back.out(1.4)"
      }, "-=0.8")
      
      // 2. Logo entrance - coffee cup design
      .to(logoRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "back.out(1.7)"
      }, "-=0.5")
      
      // 3. Text reveal with stagger
      .to(textRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.5")
      
      // 4. Progress bar entrance
      .to(progressRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out"
      }, "-=0.3");

    // Progress bar animation - Extended duration for longer loading time
    const progressTl = gsap.timeline();
    progressTl.to(progressFillRef.current, {
      width: "100%",
      duration: 5.5, // Increased from 3 to 5.5 seconds for longer loading
      ease: "power2.out",
      onUpdate: function() {
        const prog = Math.min(100, (this.progress() * 100));
        setProgress(prog);
      }
    });

    // Gentle floating animation for logo
    gsap.to(logoRef.current, {
      y: -8,
      duration: 2,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1
    });

    // Character breathing animation
    gsap.to(characterRef.current, {
      scale: 1.02,
      duration: 3,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1
    });

    // Character subtle floating
    gsap.to(characterRef.current, {
      y: -3,
      duration: 2.5,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      delay: 0.5
    });

    // Female character breathing animation
    gsap.to(femaleCharacterRef.current, {
      scale: 1.02,
      duration: 3.2,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1,
      delay: 0.3
    });

    // Female character subtle floating
    gsap.to(femaleCharacterRef.current, {
      y: -4,
      duration: 2.8,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      delay: 0.8
    });

    return () => {
      tl.kill();
      progressTl.kill();
    };
  }, [onComplete]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #8B4513 0%, #CD853F 25%, #DAA520 50%, #B8860B 75%, #8B4513 100%)',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh'
      }}
    >
      {/* Subtle Pattern Background */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="w-full h-full bg-repeat"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23FFD700' fill-opacity='0.2'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`
          }}
        />
      </div>

      {/* Rajasthani Character - Left Side Welcome */}
      <div 
        ref={characterRef}
        className="fixed left-80 top-1/2 transform -translate-y-1/2 z-20 hidden lg:block"
      >
        <div className="relative">
          {/* Character Image */}
          <div className="w-48 h-64 relative">
            <img 
              src={rajasthaniCharacterImg}
              alt="Rajasthani Character Welcome"
              className="w-full h-full object-contain drop-shadow-2xl"
              style={{
                filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.4))'
              }}
              onLoad={() => console.log('Character image loaded successfully')}
              onError={(e) => {
                console.error('Character image failed to load:', e);
              }}
            />
          </div>
          
          {/* Welcoming Aura Effect */}
          <div className="absolute inset-0 rounded-full opacity-30">
            <div className="absolute inset-0 rounded-full border-2 border-amber-300 animate-pulse scale-110"></div>
            <div className="absolute inset-0 rounded-full border border-yellow-400 animate-pulse scale-125 animation-delay-200"></div>
            <div className="absolute inset-0 rounded-full border border-orange-400 animate-pulse scale-140 animation-delay-400"></div>
          </div>
          
        </div>
      </div>

      {/* Rajasthani Female Character - Right Side Welcome */}
      <div 
        ref={femaleCharacterRef}
        className="fixed right-80 top-1/2 transform -translate-y-1/2 z-20 hidden lg:block"
      >
        <div className="relative">
          {/* Female Character Image */}
          <div className="w-48 h-64 relative">
            <img 
              src={rajasthaniFemaleCharacterImg}
              alt="Rajasthani Female Character Welcome"
              className="w-full h-full object-contain drop-shadow-2xl"
              style={{
                filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.4))'
              }}
              onLoad={() => console.log('Female character image loaded successfully')}
              onError={(e) => {
                console.error('Female character image failed to load:', e);
              }}
            />
          </div>
          
          {/* Welcoming Aura Effect - Different colors for female */}
          <div className="absolute inset-0 rounded-full opacity-30">
            <div className="absolute inset-0 rounded-full border-2 border-pink-300 animate-pulse scale-110"></div>
            <div className="absolute inset-0 rounded-full border border-rose-400 animate-pulse scale-125 animation-delay-200"></div>
            <div className="absolute inset-0 rounded-full border border-red-400 animate-pulse scale-140 animation-delay-400"></div>
          </div>
        </div>
      </div>

      {/* Mobile Character - Top Center (for smaller screens) */}
      <div className="fixed top-16 left-1/2 transform -translate-x-1/2 z-20 lg:hidden">
        <div className="relative">
          <div className="w-24 h-32 relative">
            <img 
              src="/images/rajasthani-character-welcome.png"
              alt="Rajasthani Character Welcome"
              className="w-full h-full object-contain drop-shadow-lg"
              style={{
                filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))'
              }}
            />
          </div>
          <div className="absolute inset-0 rounded-full border border-amber-300 opacity-20 animate-pulse scale-110"></div>
        </div>
      </div>

      {/* Main Content - Split Layout */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-8">
        {/* Center Content */}
        <div className="flex flex-col items-center text-center max-w-md mx-auto">

        {/* Elegant Coffee Logo */}
        <div 
          ref={logoRef}
          className="mb-8"
        >
          <div className="relative">
            {/* Coffee Cup SVG - Simple and Elegant */}
            <svg width="80" height="80" viewBox="0 0 80 80" className="text-amber-200">
              <defs>
                <linearGradient id="cupGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFD700" />
                  <stop offset="50%" stopColor="#FFA500" />
                  <stop offset="100%" stopColor="#FF6347" />
                </linearGradient>
              </defs>
              
              {/* Coffee Cup */}
              <path 
                d="M15 25 L15 55 Q15 65 25 65 L50 65 Q60 65 60 55 L60 25 Z" 
                fill="url(#cupGradient)" 
                stroke="#8B4513" 
                strokeWidth="2"
              />
              
              {/* Coffee Surface */}
              <ellipse cx="37.5" cy="28" rx="22" ry="3" fill="#8B4513" opacity="0.8" />
              
              {/* Handle */}
              <path 
                d="M60 35 Q70 35 70 45 Q70 55 60 55" 
                fill="none" 
                stroke="url(#cupGradient)" 
                strokeWidth="3"
              />
              
              {/* Steam Lines */}
              <g stroke="#FFD700" strokeWidth="2" fill="none" opacity="0.7">
                <path d="M30 20 Q32 15 30 10" />
                <path d="M37 20 Q39 15 37 10" />
                <path d="M44 20 Q46 15 44 10" />
              </g>
            </svg>
            
            {/* Decorative Ring */}
            <div className="absolute inset-0 rounded-full border-2 border-amber-300 opacity-30 animate-pulse"></div>
          </div>
        </div>

        {/* Clean Typography */}
        <div ref={textRef} className="mb-10">
          <div className="mb-2 text-amber-200 text-sm font-light">
            🙏 नमस्ते • Welcome 🙏
          </div>
          <h1 
            className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text mb-2"
            style={{
              backgroundImage: 'linear-gradient(45deg, #FFD700, #FFA500)',
              fontFamily: 'Georgia, serif'
            }}
          >
            कॉफी हाउस
          </h1>
          <h2 className="text-lg text-amber-100 font-light tracking-wide">
            Royal Coffee Experience
          </h2>
          <div className="w-16 h-0.5 bg-amber-300 mx-auto mt-2 opacity-60"></div>
          <p className="text-xs text-amber-300 mt-2 opacity-80">
            आपका स्वागत है • You are welcome
          </p>
        </div>

        {/* Elegant Progress Bar */}
        <div ref={progressRef} className="w-full">
          <div className="text-amber-200 text-sm mb-3 font-light">
            तैयार हो रहा है... {Math.round(progress)}%
          </div>
          <div className="w-full h-1 bg-amber-900/30 rounded-full overflow-hidden backdrop-blur-sm">
            <div 
              ref={progressFillRef}
              className="h-full bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400 rounded-full transition-all duration-300 shadow-lg"
              style={{ width: '0%' }}
            />
          </div>
          <div className="flex justify-between text-xs text-amber-300/60 mt-2">
            <span>राजस्थानी</span>
            <span>परंपरा</span>
          </div>
        </div>
        
        </div> {/* Close center content */}
      </div> {/* Close main content layout */}

      {/* Professional Theater Curtain */}
      <div 
        ref={curtainRef}
        className="absolute inset-0 z-30 overflow-hidden"
        style={{ transformOrigin: 'top' }}
      >
        {/* Ornate Curtain Rod */}
        <div className="absolute top-0 left-0 right-0 h-8 z-50">
          {/* Main rod */}
          <div className="absolute top-2 left-0 right-0 h-4 bg-gradient-to-b from-yellow-600 via-yellow-500 to-yellow-700 shadow-lg border-t border-yellow-400">
            {/* Rod ornamental details */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-60"></div>
            <div className="absolute top-1 left-0 right-0 h-0.5 bg-yellow-300"></div>
            <div className="absolute bottom-1 left-0 right-0 h-0.5 bg-yellow-800"></div>
          </div>
          
          {/* Rod end caps */}
          <div className="absolute top-1 -left-2 w-6 h-6 bg-gradient-to-br from-yellow-400 to-yellow-700 rounded-full shadow-md border border-yellow-300"></div>
          <div className="absolute top-1 -right-2 w-6 h-6 bg-gradient-to-br from-yellow-400 to-yellow-700 rounded-full shadow-md border border-yellow-300"></div>
          
          {/* Rod mounting brackets */}
          <div className="absolute top-0 left-4 w-3 h-8 bg-gradient-to-r from-yellow-600 to-yellow-700 shadow-sm"></div>
          <div className="absolute top-0 right-4 w-3 h-8 bg-gradient-to-r from-yellow-600 to-yellow-700 shadow-sm"></div>
        </div>

        {/* Left Curtain Panel */}
        <div className="absolute top-8 left-0 w-1/2 h-full">
          <div className="relative w-full h-full">
            {/* Main curtain fabric */}
            <div 
              className="absolute inset-0"
              style={{
                background: `
                  linear-gradient(
                    90deg,
                    #8B4513 0%,
                    #A0522D 8%,
                    #654321 16%,
                    #8B4513 24%,
                    #A0522D 32%,
                    #654321 40%,
                    #8B4513 48%,
                    #A0522D 56%,
                    #654321 64%,
                    #8B4513 72%,
                    #A0522D 80%,
                    #654321 88%,
                    #5D4037 96%,
                    #4A2C2A 100%
                  )
                `,
                backgroundSize: '40px 100%'
              }}
            >
              {/* Vertical fold shadows */}
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="absolute top-0 bottom-0 w-1"
                  style={{
                    left: `${i * 8.33}%`,
                    background: 'linear-gradient(to right, rgba(0,0,0,0.4), transparent)',
                    filter: `blur(${Math.random() * 0.5}px)`
                  }}
                />
              ))}
              
              {/* Horizontal fabric texture */}
              <div 
                className="absolute inset-0 opacity-30"
                style={{
                  background: `repeating-linear-gradient(
                    0deg,
                    transparent,
                    transparent 2px,
                    rgba(0,0,0,0.1) 2px,
                    rgba(0,0,0,0.1) 4px
                  )`
                }}
              />
              
              {/* Overall shadow gradient */}
              <div 
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(to right, rgba(0,0,0,0.2), rgba(0,0,0,0.05), rgba(0,0,0,0.3))'
                }}
              />
            </div>

            {/* Curtain tassels and trim */}
            <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-600 border-t border-yellow-400">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-yellow-700 opacity-50"></div>
            </div>
          </div>
        </div>

        {/* Right Curtain Panel */}
        <div className="absolute top-8 right-0 w-1/2 h-full">
          <div className="relative w-full h-full">
            {/* Main curtain fabric */}
            <div 
              className="absolute inset-0"
              style={{
                background: `
                  linear-gradient(
                    270deg,
                    #8B4513 0%,
                    #A0522D 8%,
                    #654321 16%,
                    #8B4513 24%,
                    #A0522D 32%,
                    #654321 40%,
                    #8B4513 48%,
                    #A0522D 56%,
                    #654321 64%,
                    #8B4513 72%,
                    #A0522D 80%,
                    #654321 88%,
                    #5D4037 96%,
                    #4A2C2A 100%
                  )
                `,
                backgroundSize: '40px 100%'
              }}
            >
              {/* Vertical fold shadows */}
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="absolute top-0 bottom-0 w-1"
                  style={{
                    right: `${i * 8.33}%`,
                    background: 'linear-gradient(to left, rgba(0,0,0,0.4), transparent)',
                    filter: `blur(${Math.random() * 0.5}px)`
                  }}
                />
              ))}
              
              {/* Horizontal fabric texture */}
              <div 
                className="absolute inset-0 opacity-30"
                style={{
                  background: `repeating-linear-gradient(
                    0deg,
                    transparent,
                    transparent 2px,
                    rgba(0,0,0,0.1) 2px,
                    rgba(0,0,0,0.1) 4px
                  )`
                }}
              />
              
              {/* Overall shadow gradient */}
              <div 
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(to left, rgba(0,0,0,0.2), rgba(0,0,0,0.05), rgba(0,0,0,0.3))'
                }}
              />
            </div>

            {/* Curtain tassels and trim */}
            <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-600 border-t border-yellow-400">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-yellow-700 opacity-50"></div>
            </div>
          </div>
        </div>

        {/* Center Curtain Gap with Tiebacks */}
        <div className="absolute top-24 left-1/2 transform -translate-x-1/2 z-40">
          {/* Main tieback ornament */}
          <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-700 rounded-full shadow-xl border-2 border-yellow-300">
            <div className="absolute inset-2 bg-gradient-to-br from-yellow-300 to-yellow-600 rounded-full">
              <div className="absolute inset-1 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full">
                <div className="absolute top-2 left-2 w-2 h-2 bg-yellow-200 rounded-full opacity-80"></div>
              </div>
            </div>
          </div>
          
          {/* Ornamental tassels */}
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-6 h-8 bg-gradient-to-b from-yellow-500 to-yellow-700">
            <div className="absolute bottom-0 left-0 right-0 h-4">
              {[...Array(6)].map((_, i) => (
                <div 
                  key={i}
                  className="absolute bottom-0 w-0.5 h-4 bg-yellow-600"
                  style={{ left: `${i * 16.67}%` }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Side tiebacks */}
        <div className="absolute top-32 left-16 w-8 h-8 bg-gradient-to-br from-yellow-500 to-yellow-700 rounded-full shadow-lg border border-yellow-400 z-40">
          <div className="absolute inset-1 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full">
            <div className="absolute top-1 left-1 w-1.5 h-1.5 bg-yellow-200 rounded-full opacity-70"></div>
          </div>
        </div>
        <div className="absolute top-32 right-16 w-8 h-8 bg-gradient-to-br from-yellow-500 to-yellow-700 rounded-full shadow-lg border border-yellow-400 z-40">
          <div className="absolute inset-1 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full">
            <div className="absolute top-1 left-1 w-1.5 h-1.5 bg-yellow-200 rounded-full opacity-70"></div>
          </div>
        </div>

        {/* Stage lighting effect */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(
                ellipse at center top,
                rgba(255,255,255,0.1) 0%,
                rgba(255,255,255,0.05) 30%,
                transparent 60%
              )
            `
          }}
        />
      </div>
    </div>
  );
};

export default RajasthaniLoadingScreen;
