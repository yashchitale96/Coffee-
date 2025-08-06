import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';
import '../utils/rajasthaniTheme.css';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, Flip);

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: string;
  category: string;
  highlight?: boolean;
}

const menuItems: MenuItem[] = [
  {
    id: 1,
    name: "Royal Spiced Latte",
    description: "Our signature espresso blend with cardamom, cinnamon, and steamed milk with a touch of saffron",
    price: "₹250",
    category: "signatures",
    highlight: true
  },
  {
    id: 2,
    name: "Desert Rose Cappuccino",
    description: "Smooth cappuccino infused with subtle rose essence and a hint of pistachio",
    price: "₹220",
    category: "signatures"
  },
  {
    id: 3,
    name: "Traditional Filter Coffee",
    description: "South Indian style filter coffee with chicory, served in traditional brass tumbler",
    price: "₹180",
    category: "signatures"
  },
  {
    id: 4,
    name: "Maharaja Mocha",
    description: "Rich espresso with chocolate, hints of almond and topped with whipped cream",
    price: "₹230",
    category: "signatures"
  },
  {
    id: 5,
    name: "Kesar Pista Cold Brew",
    description: "24-hour brewed coffee infused with saffron and crushed pistachios",
    price: "₹270",
    category: "cold"
  },
  {
    id: 6,
    name: "Malai Cold Coffee",
    description: "Creamy cold coffee with a layer of malai (cream) and a sprinkle of almonds",
    price: "₹240",
    category: "cold"
  },
  {
    id: 7,
    name: "Jaipur Sunrise Espresso",
    description: "Double shot of our premium espresso with a citrus twist",
    price: "₹160",
    category: "espresso"
  },
  {
    id: 8,
    name: "Masala Chai",
    description: "Traditional Indian spiced tea with cardamom, ginger, and cloves",
    price: "₹150",
    category: "tea"
  },
  {
    id: 9,
    name: "Kesariya Dry Fruit Cake",
    description: "Saffron flavored cake with assorted dry fruits and nuts",
    price: "₹190",
    category: "desserts"
  },
  {
    id: 10,
    name: "Rajasthani Mawa Cookies",
    description: "Traditional cookies made with khoya, perfect with coffee",
    price: "₹170",
    category: "desserts"
  }
];

const categories = [
  { id: 'signatures', name: 'Royal Signatures' },
  { id: 'cold', name: 'Cold Beverages' },
  { id: 'espresso', name: 'Espresso' },
  { id: 'tea', name: 'Chai & Tea' },
  { id: 'desserts', name: 'Desserts' }
];

const RajasthaniMenu: React.FC = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const menuCardsRef = useRef<HTMLDivElement>(null);
  const categoryTabsRef = useRef<HTMLDivElement>(null);
  const highlightItemsRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState('signatures');
  
  // Function to handle category change with GSAP animations
  const handleCategoryChange = (categoryId: string) => {
    if (activeCategory === categoryId) return;
    
    // Store the current state before changing
    const menuCards = menuCardsRef.current?.children || [];
    
    // Get all cards for current and next categories
    const currentCards = Array.from(menuCards).filter(card => 
      card.getAttribute('data-category') === activeCategory
    );
    
    const nextCards = Array.from(menuCards).filter(card => 
      card.getAttribute('data-category') === categoryId
    );
    
    // Use Flip for smooth category transition
    const state = Flip.getState(menuCards);
    
    // Hide current category cards
    gsap.to(currentCards, {
      opacity: 0,
      scale: 0.8,
      y: -20,
      stagger: 0.05,
      duration: 0.3,
      onComplete: () => {
        // Update state
        setActiveCategory(categoryId);
        
        // Show the cards for the new category
        gsap.fromTo(nextCards,
          { opacity: 0, scale: 0.8, y: 30 },
          { 
            opacity: 1, 
            scale: 1, 
            y: 0, 
            stagger: 0.08, 
            duration: 0.5,
            ease: "back.out(1.7)",
            clearProps: "all"
          }
        );
        
        // Run the flip animation
        Flip.from(state, {
          duration: 0.6,
          ease: "power2.inOut",
          absolute: true
        });
      }
    });
  };
  
  useEffect(() => {
    // Create master timeline
    const masterTl = gsap.timeline();
    
    // Header entrance animation with enhanced effects
    const headerTl = gsap.timeline({
      scrollTrigger: {
        trigger: headerRef.current,
        start: 'top 85%',
        end: 'bottom 15%',
        toggleActions: 'play none none none'
      }
    });
    
    // Safely get elements and animate them
    const menuTitle = headerRef.current?.querySelector('.menu-title');
    const menuSubtitle = headerRef.current?.querySelector('.menu-subtitle');
    const divider = headerRef.current?.querySelector('.rajasthani-divider');
    
    if (menuTitle) {
      headerTl.fromTo(menuTitle,
        { opacity: 0, y: 30, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "back.out(1.7)" }
      );
    }
    
    if (menuSubtitle) {
      headerTl.fromTo(menuSubtitle,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
        "-=0.5"
      );
    }
    
    if (divider) {
      headerTl.fromTo(divider,
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.8, ease: "power1.inOut" },
        "-=0.5"
      );
    }
    
    // Category tabs entrance with stagger effect
    const tabsTl = gsap.timeline({
      scrollTrigger: {
        trigger: categoryTabsRef.current,
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    });
    
    if (categoryTabsRef.current && categoryTabsRef.current.children.length > 0) {
      tabsTl.fromTo(categoryTabsRef.current.children,
        { opacity: 0, y: 20, scale: 0.9 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          stagger: 0.08,
          duration: 0.6,
          ease: "power2.out"
        }
      );
    }
    
    // Highlight special items with gold shimmer effect
    if (highlightItemsRef.current) {
      const highlights = highlightItemsRef.current.querySelectorAll('.highlight-item');
      
      highlights.forEach(item => {
        const itemTl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        });
        
        itemTl.fromTo(item,
          { 
            opacity: 0,
            scale: 0.92,
            boxShadow: "0 0 0 rgba(218, 165, 32, 0)"
          },
          { 
            opacity: 1,
            scale: 1,
            boxShadow: "0 0 20px rgba(218, 165, 32, 0.4)",
            duration: 1.2,
            ease: "elastic.out(1, 0.75)" 
          }
        );
        
        const badge = item.querySelector('.highlight-badge');
        if (badge) {
          itemTl.to(badge, {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 0.6,
            ease: "back.out(1.7)"
          }, "-=0.8");
        }
        
        // Gold shimmer effect
        const itemName = item.querySelector('.item-name');
        if (itemName) {
          // Create gold shimmer effect manually
          gsap.timeline({ repeat: -1, repeatDelay: 3 })
            .to(itemName, {
              backgroundImage: "linear-gradient(90deg, #8B4513 0%, #DAA520 50%, #FFD700 100%)",
              backgroundSize: "200% 100%",
              backgroundPosition: "-100% 0%",
              duration: 1.5,
              ease: "power2.inOut"
            })
            .to(itemName, {
              backgroundPosition: "0% 0%",
              duration: 0,
            });
        }
      });
    }
    
    // Regular menu card stagger animation with enhanced entrance
    const menuCardsTl = gsap.timeline({
      scrollTrigger: {
        trigger: menuCardsRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none none'
      }
    });
    
    if (menuCardsRef.current && menuCardsRef.current.children.length > 0) {
      menuCardsTl.fromTo(menuCardsRef.current.children,
        {
          opacity: 0,
          y: 50,
          scale: 0.9,
          rotationX: 10,
          transformOrigin: "center top"
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationX: 0,
          stagger: {
            from: "start",
            amount: 0.6
          },
          duration: 0.8,
          ease: "back.out(1.2)"
        }
      );
    }

    // Add hover effect for menu cards with enhanced animations
    const menuCards = menuCardsRef.current?.children || [];
    
    if (menuCards.length > 0) {
      for (let i = 0; i < menuCards.length; i++) {
        const card = menuCards[i];
        
        card.addEventListener('mouseenter', () => {
          // Card hover animation
          gsap.to(card, {
            y: -8,
            boxShadow: '0 15px 30px rgba(139, 69, 19, 0.25)',
            duration: 0.4,
            ease: "power2.out"
          });
          
          // Find and animate elements inside the card
          const price = card.querySelector('.menu-price');
          if (price) {
            gsap.to(price, {
              scale: 1.15,
              color: '#FFD700',
              duration: 0.3,
              ease: "back.out(1.5)"
            });
          }
          
          // Animate description text
          const description = card.querySelector('.menu-description');
          if (description) {
            gsap.to(description, {
              color: '#654321',
              duration: 0.3
            });
          }
          
          // Enhance dish name
          const name = card.querySelector('.menu-name');
          if (name) {
            gsap.to(name, {
              textShadow: "0 1px 2px rgba(139, 69, 19, 0.2)",
              duration: 0.3
            });
          }
          
          // Subtle background color shift
          gsap.to(card, {
            backgroundColor: "rgba(255, 248, 231, 0.8)",
            duration: 0.4
          });
        });
        
        card.addEventListener('mouseleave', () => {
          // Restore card state
          gsap.to(card, {
            y: 0,
            boxShadow: '0 5px 15px rgba(139, 69, 19, 0.1)',
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            duration: 0.3,
            ease: "power1.inOut"
          });
          
          // Reset price animation
          const price = card.querySelector('.menu-price');
          if (price) {
            gsap.to(price, {
              scale: 1,
              color: '#CD853F',
              duration: 0.3,
              clearProps: "color"
            });
          }
          
          // Reset description
          const description = card.querySelector('.menu-description');
          if (description) {
            gsap.to(description, {
              color: '#666',
              duration: 0.3
            });
          }
          
          // Reset dish name
          const name = card.querySelector('.menu-name');
          if (name) {
            gsap.to(name, {
              textShadow: "none",
              duration: 0.3
            });
          }
        });
      }
    }

    // Clean up function
    return () => {
      // Remove event listeners if we have any menu cards
      const cards = menuCardsRef.current?.children;
      if (cards && cards.length > 0) {
        for (let i = 0; i < cards.length; i++) {
          const card = cards[i] as HTMLElement;
          const clone = card.cloneNode(true);
          if (card.parentNode) {
            card.parentNode.replaceChild(clone, card);
          }
        }
      }
      
      // Kill all animations and scroll triggers
      masterTl.kill();
      headerTl.kill();
      tabsTl.kill();
      menuCardsTl.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  return (
    <div className="bg-amber-50 py-20">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-5 bg-rajasthani-pattern"></div>
      
      <div className="container mx-auto px-4">
        {/* Header section */}
        <div ref={headerRef} className="text-center mb-16">
          <span className="menu-subtitle text-rajasthani-amber-DEFAULT uppercase tracking-widest text-sm font-medium">Taste the Tradition</span>
          <h2 className="menu-title rajasthani-heading text-4xl md:text-5xl font-display mt-2 mb-4">Our Royal Menu</h2>
          <div className="rajasthani-divider max-w-xs mx-auto"></div>
          <p className="text-rajasthani-brown-medium max-w-2xl mx-auto mt-6">
            Indulge in our carefully crafted beverages and treats inspired by the royal traditions of Rajasthan. 
            Each item is prepared with authentic spices and premium ingredients.
          </p>
        </div>
        
        {/* Category navigation */}
        <div className="mb-12 overflow-x-auto">
          <div ref={categoryTabsRef} className="flex justify-center min-w-max pb-2">
            {categories.map(category => (
              <button 
                key={category.id}
                className={`px-6 py-3 mx-2 font-medium transition-all duration-300 relative ${
                  activeCategory === category.id 
                    ? 'text-rajasthani-gold-dark' 
                    : 'text-rajasthani-brown hover:text-rajasthani-gold'
                }`}
                onClick={() => handleCategoryChange(category.id)}
              >
                {category.name}
                {activeCategory === category.id && (
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-0.5 bg-rajasthani-gold"></span>
                )}
              </button>
            ))}
          </div>
          
          {/* Decorative bottom border */}
          <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-rajasthani-brown-light to-transparent opacity-20 mt-1"></div>
        </div>
        
        {/* Highlighted items section */}
        <div ref={highlightItemsRef} className="mb-12">
          {/* Special highlighted items can go here if needed */}
        </div>
        
        {/* Menu grid */}
        <div 
          ref={menuCardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {menuItems.map(item => (
            <div 
              key={item.id}
              data-category={item.category}
              className={`${item.highlight ? 'highlight-item' : ''} rajasthani-corners p-6 bg-white border border-amber-100 rounded-lg shadow-md transition-all relative ${
                item.highlight ? 'md:-translate-y-4' : ''
              }`}
            >
              <span className="hidden">
                {/* Hidden span for rajasthani-corners to work */}
              </span>
              
              {/* Special highlight badge */}
              {item.highlight && (
                <div className="highlight-badge absolute -top-3 -right-3 bg-rajasthani-gold px-3 py-1 rounded-full text-white text-xs font-medium shadow-md">
                  SPECIAL
                </div>
              )}
              
              {/* Menu item content */}
              <div className="flex justify-between items-start mb-2">
                <h3 className="menu-name text-lg font-display font-medium text-rajasthani-brown-dark">{item.name}</h3>
                <span className="menu-price text-rajasthani-brown-medium font-display font-semibold">{item.price}</span>
              </div>
              
              <p className="menu-description text-rajasthani-brown-medium/80 text-sm mt-2">
                {item.description}
              </p>
              
              {/* Bottom decoration */}
              <div className="mt-4 pt-2 border-t border-amber-100">
                <div className="flex justify-between items-center text-xs text-rajasthani-brown-medium/60">
                  <span>{categories.find(c => c.id === item.category)?.name}</span>
                  {/* Small decorative element */}
                  <div className="w-4 h-4" style={{
                    backgroundImage: `radial-gradient(circle, rgba(218,165,32,0.2) 0%, rgba(218,165,32,0) 70%)`,
                  }}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Menu footer - call to action */}
        <div className="mt-16 text-center">
          <div className="rajasthani-divider max-w-xs mx-auto mb-8"></div>
          <p className="text-rajasthani-brown-DEFAULT/80 mb-6">
            Explore our full menu in-store for seasonal specialties and regional delicacies
          </p>
          <button className="rajasthani-button px-8 py-3">
            Reserve Your Experience
          </button>
        </div>
      </div>
    </div>
  );
};

export default RajasthaniMenu;
