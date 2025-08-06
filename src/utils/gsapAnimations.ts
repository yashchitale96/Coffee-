import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin);

// GSAP Animation Utilities for Coffee Shop
export class GSAPAnimations {
  
  // Initialize GSAP with global settings
  static init() {
    // Set default ease
    gsap.defaults({
      ease: "power2.out",
      duration: 1
    });

    // Configure ScrollTrigger defaults
    ScrollTrigger.config({
      autoRefreshEvents: "visibilitychange,DOMContentLoaded,load"
    });
  }

  // Entrance animations
  static fadeInUp(element: string | Element, options: gsap.TweenVars = {}) {
    return gsap.fromTo(element, 
      {
        opacity: 0,
        y: 100,
        ...options.from
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        ...options
      }
    );
  }

  static fadeInScale(element: string | Element, options: gsap.TweenVars = {}) {
    return gsap.fromTo(element,
      {
        opacity: 0,
        scale: 0.8,
        ...options.from
      },
      {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "back.out(1.7)",
        ...options
      }
    );
  }

  // Scroll-triggered animations
  static scrollFadeIn(element: string | Element, options: any = {}) {
    return gsap.fromTo(element,
      {
        opacity: 0,
        y: 50,
        ...options.from
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
          ...(options.scrollTrigger || {})
        },
        ...options
      }
    );
  }

  // Staggered animations for lists/grids
  static staggerFadeIn(elements: string | Element[], options: gsap.TweenVars = {}) {
    return gsap.fromTo(elements,
      {
        opacity: 0,
        y: 100,
        rotationX: -90,
        transformOrigin: "center bottom",
        ...options.from
      },
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.15,
        ...options
      }
    );
  }

  // Parallax effects
  static parallax(element: string | Element, options: any = {}) {
    return gsap.to(element, {
      yPercent: -50,
      ease: "none",
      scrollTrigger: {
        trigger: element,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        ...(options.scrollTrigger || {})
      },
      ...options
    });
  }

  // Hover animations
  static hoverLift(element: string | Element) {
    const el = typeof element === 'string' ? document.querySelector(element) : element;
    if (!el) return;

    const handleMouseEnter = () => {
      gsap.to(el, {
        y: -10,
        scale: 1.05,
        rotationY: 5,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    const handleMouseLeave = () => {
      gsap.to(el, {
        y: 0,
        scale: 1,
        rotationY: 0,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    el.addEventListener('mouseenter', handleMouseEnter);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el.removeEventListener('mouseenter', handleMouseEnter);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }

  // Typewriter effect
  static typewriter(element: string | Element, text: string, options: gsap.TweenVars = {}) {
    return gsap.to(element, {
      text: text,
      duration: text.length * 0.05,
      ease: "none",
      ...options
    });
  }

  // Coffee-themed animations
  static coffeeBean(element: string | Element) {
    return gsap.to(element, {
      rotation: 360,
      y: -20,
      duration: 2,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1
    });
  }

  static steamEffect(element: string | Element) {
    return gsap.to(element, {
      y: -30,
      opacity: 0,
      scale: 1.5,
      duration: 3,
      ease: "power1.out",
      repeat: -1,
      repeatDelay: 1
    });
  }

  // Loading animations
  static progressBar(element: string | Element, onUpdate?: (progress: number) => void) {
    return gsap.to({}, {
      duration: 3,
      ease: "power2.inOut",
      onUpdate: function() {
        const progress = this.progress() * 100;
        if (onUpdate) onUpdate(progress);
        gsap.to(element, {
          width: `${progress}%`,
          duration: 0.1,
          ease: "none"
        });
      }
    });
  }

  // Page transitions
  static pageEnter(element: string | Element) {
    return gsap.fromTo(element,
      {
        opacity: 0,
        scale: 0.95,
        y: 50
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out"
      }
    );
  }

  static pageExit(element: string | Element, onComplete?: () => void) {
    return gsap.to(element, {
      opacity: 0,
      scale: 1.05,
      y: -50,
      duration: 0.8,
      ease: "power2.in",
      onComplete
    });
  }

  // Cleanup function
  static cleanup() {
    ScrollTrigger.killAll();
    gsap.killTweensOf("*");
  }

  // Responsive animations
  static responsiveAnimation(element: string | Element, mobile: gsap.TweenVars, desktop: gsap.TweenVars) {
    const mm = gsap.matchMedia();
    
    mm.add("(max-width: 768px)", () => {
      return gsap.to(element, mobile);
    });

    mm.add("(min-width: 769px)", () => {
      return gsap.to(element, desktop);
    });

    return mm;
  }

  // Performance optimization
  static optimizeForPerformance() {
    // Reduce motion for users who prefer it
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.globalTimeline.timeScale(0.01);
      ScrollTrigger.config({ autoRefreshEvents: "none" });
    }
  }
  
  // Rajasthani-themed animations
  
  // Decorative border animation
  static rajasthaniBorderReveal(element: string | Element, options: any = {}) {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: "top 85%",
        toggleActions: "play none none none",
        ...(options.scrollTrigger || {})
      }
    });
    
    tl.fromTo(element, 
      { 
        backgroundSize: "0% 100%",
        opacity: 0.3
      }, 
      { 
        backgroundSize: "100% 100%",
        opacity: 1, 
        duration: 1.5, 
        ease: "power2.out" 
      }
    );
    
    return tl;
  }
  
  // Traditional pattern reveal animation
  static rajasthaniPatternReveal(element: string | Element, options: any = {}) {
    return gsap.fromTo(element,
      { 
        opacity: 0,
        backgroundPosition: "0% 0%",
        scale: 0.9,
        ...options.from
      },
      {
        opacity: 1,
        backgroundPosition: "50% 50%",
        scale: 1,
        duration: 1.8,
        ease: "expo.out",
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none none",
          ...(options.scrollTrigger || {})
        },
        ...options
      }
    );
  }
  
  // Ornate text animation with gold shimmer effect
  static rajasthaniTextShimmer(element: string | Element) {
    const tl = gsap.timeline({repeat: -1, repeatDelay: 3});
    
    tl.to(element, {
      backgroundImage: "linear-gradient(90deg, #8B4513 0%, #DAA520 50%, #FFD700 100%)",
      backgroundSize: "200% 100%",
      duration: 0,
      ease: "none"
    })
    .to(element, {
      backgroundPosition: "-100% 0%",
      duration: 1.5,
      ease: "power2.inOut"
    });
    
    return tl;
  }
  
  // Rajasthani themed reveal for story sections
  static rajasthaniStoryReveal(container: string | Element, options: any = {}) {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top 70%",
        toggleActions: "play none none none",
        ...(options.scrollTrigger || {})
      }
    });
    
    // Assume container has children with classes: .story-image, .story-content, .decorative-element
    const image = typeof container === 'string' 
      ? document.querySelector(`${container} .story-image`) 
      : (container as Element).querySelector('.story-image');
    
    const content = typeof container === 'string' 
      ? document.querySelector(`${container} .story-content`) 
      : (container as Element).querySelector('.story-content');
    
    const decorative = typeof container === 'string' 
      ? document.querySelectorAll(`${container} .decorative-element`) 
      : (container as Element).querySelectorAll('.decorative-element');
    
    if (image) {
      tl.fromTo(image, 
        { clipPath: "inset(100% 0 0 0)", opacity: 0 }, 
        { clipPath: "inset(0% 0 0 0)", opacity: 1, duration: 1.5, ease: "power4.out" },
        0
      );
    }
    
    if (content) {
      tl.fromTo(content, 
        { opacity: 0, y: 50 }, 
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
        0.5
      );
    }
    
    if (decorative.length) {
      tl.fromTo(decorative, 
        { opacity: 0, scale: 0 }, 
        { opacity: 1, scale: 1, duration: 0.8, stagger: 0.1, ease: "back.out(1.7)" },
        0.7
      );
    }
    
    return tl;
  }
  
  // Traditional Rajasthani dance-inspired movement
  static rajasthaniOrnamentFloat(element: string | Element) {
    const tl = gsap.timeline({repeat: -1, yoyo: true});
    
    tl.to(element, {
      y: -10,
      rotation: 5,
      duration: 2.5,
      ease: "sine.inOut"
    })
    .to(element, {
      y: 0,
      rotation: -3,
      duration: 2.5,
      ease: "sine.inOut"
    });
    
    return tl;
  }
}

// Initialize GSAP when the module loads
GSAPAnimations.init();

export default GSAPAnimations;
