import { gsap } from 'gsap';

interface AnimationOptions {
  [key: string]: any;
}

interface CurtainOptions extends AnimationOptions {
  ease?: string;
  duration?: number;
}

interface CharacterEntranceOptions extends AnimationOptions {
  side?: 'left' | 'right';
  distance?: number;
}

interface ScrollRevealOptions extends AnimationOptions {
  y?: number;
  opacity?: number;
  duration?: number;
  stagger?: number;
  start?: string;
  trigger?: HTMLElement | string;
}

interface OrnateBorderOptions extends AnimationOptions {
  color?: string;
}

interface ShimmerOptions extends AnimationOptions {
  duration?: number;
  repeat?: number;
  ease?: string;
  delay?: number;
}

// Rajasthani-themed animation utilities for the coffee shop project
export class RajasthaniAnimations {
  
  // Theatrical curtain entrance (top to bottom)
  static curtainReveal(container: HTMLElement, content: HTMLElement, options: CurtainOptions = {}) {
    const tl = gsap.timeline({ 
      defaults: { ease: "power3.out" },
      ...options
    });
    
    // Set initial state
    gsap.set(container, { 
      autoAlpha: 1,
      overflow: 'hidden' 
    });
    
    gsap.set(content, { autoAlpha: 0 });
    
    // Create curtain elements
    const curtain = document.createElement('div');
    curtain.className = 'absolute inset-0 bg-rajasthani-gradient z-10';
    container.appendChild(curtain);
    
    // Animate curtain open
    tl.to(curtain, {
      scaleY: 0, 
      transformOrigin: 'top',
      duration: 1.5,
    })
    .to(content, {
      autoAlpha: 1,
      duration: 0.5
    }, "-=0.5");
    
    // Cleanup function
    const cleanup = () => {
      if (curtain.parentNode) {
        curtain.parentNode.removeChild(curtain);
      }
    };
    
    return { timeline: tl, cleanup };
  }

  // Ornate entrance animation for section headings
  static rajasthaniHeadingEntrance(heading: HTMLElement, options: AnimationOptions = {}) {
    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      ...options
    });
    
    // Split text if TextPlugin is available
    let chars;
    
    // Skip SplitText functionality since it requires registration
    // and is not available as a standard property on window
    const hasSplitTextPlugin = false; // Set to true when properly imported
    if (hasSplitTextPlugin) {
      // This would be the implementation when SplitText is properly imported
      // chars = new SplitText(heading, { type: "chars" }).chars;
    }
    
    if (chars) {
      // Gold shimmer effect with staggered characters
      tl.fromTo(chars, 
        { 
          opacity: 0,
          y: 20,
          rotationX: -90
        },
        { 
          opacity: 1, 
          y: 0,
          rotationX: 0,
          duration: 1.2,
          stagger: 0.03
        }
      );
      
      // Shimmer effect after text appears
      tl.to(heading, {
        backgroundPosition: '200% center',
        duration: 2,
        ease: "linear",
        repeat: -1
      });
    } else {
      // Fallback if SplitText is not available
      tl.fromTo(heading,
        { 
          opacity: 0,
          y: 30
        },
        { 
          opacity: 1, 
          y: 0,
          duration: 1
        }
      );
    }
    
    return tl;
  }
  
  // Traditional decorative element entrance
  static decorativeElementEntrance(element: HTMLElement, options: AnimationOptions = {}) {
    const defaults = {
      scale: [0.5, 1],
      rotation: [45, 0],
      opacity: [0, 1],
      duration: 1.2,
      ease: "back.out(1.7)"
    };
    
    const config = { ...defaults, ...options };
    
    return gsap.fromTo(element,
      {
        scale: config.scale[0],
        rotation: config.rotation[0],
        opacity: config.opacity[0]
      },
      {
        scale: config.scale[1],
        rotation: config.rotation[1],
        opacity: config.opacity[1],
        duration: config.duration,
        ease: config.ease
      }
    );
  }
  
  // Rajasthani character entrance with welcoming gesture
  static characterEntrance(character: HTMLElement, options: CharacterEntranceOptions = {}) {
    const side = options.side || 'left';
    const distance = options.distance || 120;
    
    const startX = side === 'left' ? -distance : distance;
    
    const tl = gsap.timeline({
      defaults: { ease: "back.out(1.4)" },
      ...options
    });
    
    // Set initial state
    gsap.set(character, {
      opacity: 0,
      x: startX,
      scale: 0.8
    });
    
    // Entrance animation
    tl.to(character, {
      opacity: 1,
      x: 0,
      scale: 1,
      duration: 1.2
    });
    
    // Add breathing and floating animations
    tl.to(character, {
      scale: 1.02,
      duration: 3,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1
    }, "breathing");
    
    tl.to(character, {
      y: -4,
      duration: 2.5,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      delay: 0.5
    }, "breathing");
    
    return tl;
  }
  
  // Custom scroll animation for Rajasthani design elements
  static rajasthaniScrollReveal(elements: HTMLElement | HTMLElement[] | string, options: ScrollRevealOptions = {}) {
    const defaults = {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      start: "top 80%"
    };
    
    const config = { ...defaults, ...options };
    
    return gsap.fromTo(elements,
      {
        y: config.y,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: config.duration,
        stagger: config.stagger,
        scrollTrigger: {
          trigger: options.trigger || elements,
          start: config.start,
          toggleActions: "play none none none"
        }
      }
    );
  }
  
  // Ornate border animation
  static ornateBorderAnimation(element: HTMLElement, options: OrnateBorderOptions = {}) {
    const tl = gsap.timeline({
      defaults: { ease: "power2.inOut" },
      ...options
    });
    
    // Create border elements
    const borders = {
      top: document.createElement('div'),
      right: document.createElement('div'),
      bottom: document.createElement('div'),
      left: document.createElement('div')
    };
    
    // Set styles
    Object.values(borders).forEach(border => {
      border.style.position = 'absolute';
      border.style.backgroundColor = options.color || '#DAA520';
      element.appendChild(border);
    });
    
    // Position borders
    borders.top.style.top = '0';
    borders.top.style.left = '0';
    borders.top.style.right = '0';
    borders.top.style.height = '2px';
    
    borders.right.style.top = '0';
    borders.right.style.right = '0';
    borders.right.style.bottom = '0';
    borders.right.style.width = '2px';
    
    borders.bottom.style.bottom = '0';
    borders.bottom.style.left = '0';
    borders.bottom.style.right = '0';
    borders.bottom.style.height = '2px';
    
    borders.left.style.top = '0';
    borders.left.style.left = '0';
    borders.left.style.bottom = '0';
    borders.left.style.width = '2px';
    
    // Initial state
    gsap.set([borders.top, borders.bottom], {
      scaleX: 0,
      transformOrigin: 'center'
    });
    
    gsap.set([borders.left, borders.right], {
      scaleY: 0,
      transformOrigin: 'center'
    });
    
    // Animation
    tl.to([borders.top, borders.bottom], {
      scaleX: 1,
      duration: 0.6
    })
    .to([borders.left, borders.right], {
      scaleY: 1,
      duration: 0.6
    }, "-=0.3");
    
    // Cleanup function
    const cleanup = () => {
      Object.values(borders).forEach(border => {
        if (border.parentNode) {
          border.parentNode.removeChild(border);
        }
      });
    };
    
    return { timeline: tl, cleanup, borders };
  }
  
  // Gold shimmer effect for text or elements
  static goldShimmer(element: HTMLElement, options: ShimmerOptions = {}) {
    const defaults = {
      duration: 2,
      repeat: -1,
      ease: "power1.inOut",
      delay: 0
    };
    
    const config = { ...defaults, ...options };
    
    // Add shimmer overlay
    const shimmer = document.createElement('div');
    shimmer.className = 'absolute inset-0';
    shimmer.style.background = 'linear-gradient(90deg, transparent, rgba(255,215,0,0.5), transparent)';
    shimmer.style.transform = 'translateX(-100%)';
    shimmer.style.pointerEvents = 'none';
    
    if (getComputedStyle(element).position === 'static') {
      element.style.position = 'relative';
    }
    
    element.appendChild(shimmer);
    
    // Animation
    const tl = gsap.timeline({
      repeat: config.repeat,
      delay: config.delay
    });
    
    tl.to(shimmer, {
      x: '100%',
      duration: config.duration,
      ease: config.ease
    });
    
    // Cleanup function
    const cleanup = () => {
      if (shimmer.parentNode) {
        shimmer.parentNode.removeChild(shimmer);
      }
    };
    
    return { timeline: tl, cleanup };
  }
}

export default RajasthaniAnimations;
