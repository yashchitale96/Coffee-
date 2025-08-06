import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, Coffee, Zap, Heart } from 'lucide-react';
import InteractiveButton from './InteractiveButton';

gsap.registerPlugin(ScrollTrigger);

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  specialty: boolean;
  rating: number;
  icon: React.ComponentType<any>;
}

const GSAPMenu: React.FC = () => {
  const menuRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const menuItems: MenuItem[] = [
    {
      id: 1,
      name: "Royal Masala Chai",
      description: "Traditional spiced tea with cardamom, cinnamon, and royal heritage",
      price: "₹150",
      image: "https://images.pexels.com/photos/1793035/pexels-photo-1793035.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
      specialty: true,
      rating: 4.9,
      icon: Coffee
    },
    {
      id: 2,
      name: "Jaipur Cold Brew",
      description: "Smooth cold brew infused with saffron and rose petals",
      price: "₹280",
      image: "https://images.pexels.com/photos/1251175/pexels-photo-1251175.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
      specialty: true,
      rating: 4.8,
      icon: Zap
    },
    {
      id: 3,
      name: "Desert Storm Espresso",
      description: "Bold espresso with hints of dates and cardamom",
      price: "₹200",
      image: "https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
      specialty: false,
      rating: 4.7,
      icon: Coffee
    },
    {
      id: 4,
      name: "Palace Cappuccino",
      description: "Creamy cappuccino with golden turmeric foam art",
      price: "₹220",
      image: "https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
      specialty: false,
      rating: 4.6,
      icon: Heart
    },
    {
      id: 5,
      name: "Rajasthani Filter Coffee",
      description: "South Indian filter coffee with a Rajasthani twist",
      price: "₹180",
      image: "https://images.pexels.com/photos/1595385/pexels-photo-1595385.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
      specialty: false,
      rating: 4.8,
      icon: Coffee
    },
    {
      id: 6,
      name: "Sunset Mocha",
      description: "Rich chocolate coffee inspired by Rajasthani sunsets",
      price: "₹250",
      image: "https://images.pexels.com/photos/1414651/pexels-photo-1414651.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
      specialty: true,
      rating: 4.9,
      icon: Heart
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate title on scroll
      gsap.fromTo(titleRef.current, 
        {
          opacity: 0,
          y: 100,
          scale: 0.8
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Animate menu cards with stagger
      const cards = cardsRef.current?.children;
      if (cards) {
        gsap.fromTo(Array.from(cards),
          {
            opacity: 0,
            y: 100,
            rotationX: -90,
            transformOrigin: "center bottom"
          },
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 1,
            ease: "power3.out",
            stagger: 0.15,
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            }
          }
        );

        // Add hover animations to cards
        Array.from(cards).forEach((card) => {
          const cardElement = card as HTMLElement;
          
          cardElement.addEventListener('mouseenter', () => {
            gsap.to(cardElement, {
              scale: 1.05,
              y: -10,
              rotationY: 5,
              duration: 0.3,
              ease: "power2.out"
            });
          });

          cardElement.addEventListener('mouseleave', () => {
            gsap.to(cardElement, {
              scale: 1,
              y: 0,
              rotationY: 0,
              duration: 0.3,
              ease: "power2.out"
            });
          });
        });
      }

    }, menuRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={menuRef} className="py-20 bg-gradient-to-b from-orange-50 to-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            ref={titleRef}
            className="text-4xl md:text-6xl font-bold text-amber-900 mb-6"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Our Signature Menu
          </h2>
          <p className="text-xl text-amber-800 max-w-3xl mx-auto leading-relaxed">
            Each blend tells a story of tradition, crafted with the finest ingredients 
            and infused with the warmth of Rajasthani hospitality
          </p>
        </div>

        <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.id}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-amber-100"
              >
                {item.specialty && (
                  <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Specialty
                  </div>
                )}

                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <IconComponent className="w-5 h-5 text-amber-600 mr-2" />
                      <h3 className="text-xl font-bold text-amber-900">{item.name}</h3>
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-amber-700 ml-1">{item.rating}</span>
                    </div>
                  </div>

                  <p className="text-amber-700 mb-4 text-sm leading-relaxed">
                    {item.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-amber-900">{item.price}</span>
                    <InteractiveButton
                      variant="primary"
                      size="sm"
                      className="transform hover:scale-105 transition-transform duration-200"
                    >
                      Order Now
                    </InteractiveButton>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <InteractiveButton
            variant="outline"
            size="lg"
            className="border-2 border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white"
          >
            View Full Menu
          </InteractiveButton>
        </div>
      </div>
    </section>
  );
};

export default GSAPMenu;
