import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Coffee, Heart } from 'lucide-react';

interface GSAPLoadingScreenProps {
  onLoadingComplete: () => void;
}

const GSAPLoadingScreen: React.FC<GSAPLoadingScreenProps> = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const loadingRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const percentageRef = useRef<HTMLSpanElement>(null);
  const coffeeBeansRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial setup
      gsap.set([logoRef.current, titleRef.current, progressBarRef.current], {
        opacity: 0,
        y: 50
      });

      gsap.set(progressFillRef.current, {
        width: "0%"
      });

      // Create coffee beans for floating animation
      const beans = Array.from({ length: 8 }, () => {
        const bean = document.createElement('div');
        bean.className = 'absolute w-3 h-3 bg-amber-600 rounded-full opacity-30';
        bean.style.left = `${Math.random() * 100}%`;
        bean.style.top = `${Math.random() * 100}%`;
        coffeeBeansRef.current?.appendChild(bean);
        return bean;
      });

      // Animate floating beans
      beans.forEach((bean, i) => {
        gsap.to(bean, {
          x: "random(-100, 100)",
          y: "random(-100, 100)",
          rotation: "random(0, 360)",
          duration: "random(3, 6)",
          ease: "power1.inOut",
          repeat: -1,
          yoyo: true,
          delay: i * 0.2
        });
      });

      // Main entrance animation timeline
      const entranceTl = gsap.timeline();

      entranceTl
        // Logo animation with bounce
        .to(logoRef.current, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "back.out(1.7)"
        })
        // Title with typewriter effect
        .to(titleRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out"
        }, "-=0.5")
        // Progress bar entrance
        .to(progressBarRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out"
        }, "-=0.3");

      // Progress simulation
      const progressTl = gsap.timeline({ delay: 1 });
      
      progressTl.to({}, {
        duration: 3,
        ease: "power2.inOut",
        onUpdate: function() {
          const currentProgress = Math.min(100, this.progress() * 100);
          setProgress(currentProgress);
          
          // Animate progress bar fill
          gsap.to(progressFillRef.current, {
            width: `${currentProgress}%`,
            duration: 0.1,
            ease: "none"
          });
          
          // Animate percentage text
          if (percentageRef.current) {
            percentageRef.current.textContent = `${Math.round(currentProgress)}%`;
          }
        },
        onComplete: () => {
          // Exit animation
          const exitTl = gsap.timeline({ delay: 0.5 });
          
          exitTl
            .to(logoRef.current, {
              scale: 1.2,
              rotation: 360,
              duration: 0.6,
              ease: "power2.inOut"
            })
            .to([progressBarRef.current, titleRef.current], {
              opacity: 0,
              y: -30,
              duration: 0.4,
              ease: "power2.in"
            }, "-=0.3")
            .to(loadingRef.current, {
              opacity: 0,
              scale: 1.1,
              duration: 0.8,
              ease: "power2.inOut",
              onComplete: onLoadingComplete
            }, "-=0.2");
        }
      });

      // Logo breathing animation
      gsap.to(logoRef.current, {
        scale: 1.1,
        duration: 2,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1
      });

    }, loadingRef);

    return () => ctx.revert();
  }, [onLoadingComplete]);

  return (
    <div
      ref={loadingRef}
      className="fixed inset-0 z-50 bg-gradient-to-br from-amber-900 via-orange-900 to-red-900 flex items-center justify-center"
    >
      {/* Floating coffee beans background */}
      <div ref={coffeeBeansRef} className="absolute inset-0 overflow-hidden pointer-events-none"></div>
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full bg-repeat" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D2691E' fill-opacity='0.3'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zM10 10c11.046 0 20 8.954 20 20s-8.954 20-20 20-20-8.954-20-20 8.954-20 20-20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className="text-center text-white z-10 max-w-md mx-auto px-4">
        {/* Animated Logo */}
        <div
          ref={logoRef}
          className="flex items-center justify-center mb-8"
        >
          <div className="relative">
            <Coffee className="w-16 h-16 text-amber-300 mr-4" />
            <Heart className="w-8 h-8 text-red-400 absolute -top-2 -right-2" />
            <Coffee className="w-16 h-16 text-amber-300 ml-4" />
          </div>
        </div>

        {/* Title */}
        <h1
          ref={titleRef}
          className="text-4xl md:text-5xl font-bold mb-8 tracking-tight"
          style={{ fontFamily: 'Georgia, serif' }}
        >
          Brewed with
          <span className="block text-amber-300 italic">Love</span>
        </h1>

        {/* Progress Bar */}
        <div ref={progressBarRef} className="w-full">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-amber-200">Loading your coffee experience...</span>
            <span ref={percentageRef} className="text-sm text-amber-200 font-semibold">0%</span>
          </div>
          
          <div className="w-full bg-amber-800/30 rounded-full h-2 overflow-hidden">
            <div
              ref={progressFillRef}
              className="h-full bg-gradient-to-r from-amber-400 to-orange-400 rounded-full transition-all duration-300 relative overflow-hidden"
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Loading dots */}
        <div className="flex justify-center mt-6 space-x-1">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 bg-amber-300 rounded-full animate-pulse"
              style={{
                animationDelay: `${i * 0.2}s`,
                animationDuration: '1s'
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GSAPLoadingScreen;
