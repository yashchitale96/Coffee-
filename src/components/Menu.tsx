import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Star, Coffee, Zap, Heart } from 'lucide-react';
import InteractiveButton from './InteractiveButton';
import ImageReveal from './ImageReveal';

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

const Menu: React.FC = () => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

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

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants = {
    hidden: { 
      y: 100, 
      opacity: 0,
      scale: 0.95
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-orange-50 to-amber-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-amber-900 mb-6" style={{ fontFamily: 'Georgia, serif' }}>
            Our Signature Menu
          </h2>
          <p className="text-xl text-amber-800 max-w-3xl mx-auto leading-relaxed">
            Each blend crafted with premium beans and traditional spices, 
            bringing you flavors from the royal courts of Rajasthan
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {menuItems.map((item) => (
            <motion.div
              key={item.id}
              variants={cardVariants}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 }
              }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 group"
            >
              <div className="relative overflow-hidden">
                <ImageReveal
                  src={item.image}
                  alt={item.name}
                  className="h-48"
                  revealDirection="up"
                />
                {item.specialty && (
                  <div className="absolute top-4 left-4 bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Specialty
                  </div>
                )}
                <div className="absolute top-4 right-4 bg-white bg-opacity-90 p-2 rounded-full">
                  <item.icon className="w-5 h-5 text-amber-600" />
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-amber-900">{item.name}</h3>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm text-amber-700 ml-1">{item.rating}</span>
                  </div>
                </div>

                <p className="text-amber-700 mb-4 leading-relaxed">{item.description}</p>

                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-amber-900">{item.price}</span>
                  <InteractiveButton
                    variant="primary"
                    size="sm"
                  >
                    Order Now
                  </InteractiveButton>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-12"
        >
          <InteractiveButton
            variant="primary"
            size="lg"
            className="bg-amber-900 hover:bg-amber-800"
          >
            View Full Menu
          </InteractiveButton>
        </motion.div>
      </div>
    </section>
  );
};

export default Menu;