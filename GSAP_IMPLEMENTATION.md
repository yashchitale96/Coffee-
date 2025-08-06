# GSAP Implementation in Coffee Shop Project

## Overview

This project now includes **GSAP (GreenSock Animation Platform)** integration alongside the existing Framer Motion animations. GSAP provides more advanced animation capabilities and better performance for complex animations.

## 🚀 What's Implemented

### 1. **GSAP Enhanced Components**
- `GSAPHero.tsx` - Hero section with advanced parallax and entrance animations
- `GSAPMenu.tsx` - Menu section with 3D card animations and hover effects
- `GSAPLoadingScreen.tsx` - Loading screen with progress bar and floating elements

### 2. **Animation Utilities** (`src/utils/gsapAnimations.ts`)
- **Entrance Animations**: `fadeInUp()`, `fadeInScale()`
- **Scroll Animations**: `scrollFadeIn()`, `parallax()`
- **Stagger Effects**: `staggerFadeIn()` for grid/list animations
- **Hover Effects**: `hoverLift()` for interactive elements
- **Coffee-themed**: `coffeeBean()`, `steamEffect()`
- **Performance**: Reduced motion support, cleanup utilities

### 3. **Dual Animation System**
- Switch between Framer Motion and GSAP via configuration
- Both systems coexist for comparison and testing

## 🔧 Installation & Setup

```bash
npm install gsap
```

The following GSAP plugins are used:
- **ScrollTrigger** - Scroll-based animations
- **TextPlugin** - Typewriter effects (requires GSAP license for commercial use)

## 📱 Usage Examples

### Basic Animation
```typescript
import GSAPAnimations from './utils/gsapAnimations';

// Fade in an element
GSAPAnimations.fadeInUp('.my-element');

// Scroll-triggered animation
GSAPAnimations.scrollFadeIn('.scroll-element');
```

### Advanced Scroll Animation
```typescript
useEffect(() => {
  const ctx = gsap.context(() => {
    // All animations are scoped to this context
    gsap.fromTo('.card', 
      { opacity: 0, y: 100 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
          trigger: '.cards-container',
          start: 'top 80%'
        }
      }
    );
  }, ref);

  return () => ctx.revert(); // Cleanup
}, []);
```

## 🎨 GSAP vs Framer Motion Comparison

| Feature | Framer Motion | GSAP |
|---------|---------------|------|
| **Bundle Size** | ~50KB | ~47KB |
| **Performance** | Good | Excellent |
| **3D Animations** | Limited | Advanced |
| **Timeline Control** | Basic | Advanced |
| **Scroll Animations** | react-intersection-observer | ScrollTrigger |
| **Learning Curve** | React-friendly | Steeper |
| **Commercial License** | Free | Paid (for some plugins) |

## 🚀 Advanced Features Demonstrated

### 1. **3D Card Animations** (GSAPMenu)
- Rotation on hover
- Depth effects with perspective
- Smooth transitions

### 2. **Parallax Scrolling** (GSAPHero)
- Background moves at different speed
- Fade effects based on scroll position

### 3. **Loading Animations** (GSAPLoadingScreen)
- Progress bar with shimmer effect
- Floating background elements
- Exit animations

### 4. **Performance Optimizations**
- Context-based cleanup
- Reduced motion support
- Responsive animations

## 🔧 Configuration

Toggle between animation systems in `main.tsx`:
```typescript
const USE_GSAP = true; // Set to false for Framer Motion
```

Or in individual components via `AppWithGSAP.tsx`:
```typescript
const ANIMATION_CONFIG = {
  useGSAP: true, // Component-level control
};
```

## 🎯 Benefits of GSAP Implementation

1. **Better Performance**: Hardware acceleration and optimized rendering
2. **Advanced Animations**: 3D transforms, complex timelines, morphing
3. **Precise Control**: Frame-perfect animations, timeline scrubbing
4. **Professional Features**: Motion paths, physics, advanced easing
5. **Cross-browser**: Consistent behavior across all browsers

## 📚 Next Steps

### Potential Enhancements:
1. **MorphSVG Plugin** - Shape morphing animations
2. **MotionPath Plugin** - Elements following custom paths
3. **SplitText Plugin** - Advanced text animations
4. **Physics2D Plugin** - Realistic physics simulations

### Performance Optimizations:
1. Lazy loading of GSAP plugins
2. Animation recycling for better memory usage
3. Custom easing functions for brand-specific motion
4. WebGL integration for complex visual effects

## 🔍 Debugging

GSAP provides excellent debugging tools:
```typescript
// Enable debug mode
ScrollTrigger.config({ markers: true });

// Performance monitoring
gsap.ticker.add(() => {
  console.log('FPS:', gsap.ticker.fps);
});
```

This implementation showcases how GSAP can enhance the user experience with more sophisticated animations while maintaining clean, maintainable code structure.
