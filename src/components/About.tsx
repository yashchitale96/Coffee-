import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Award, Users, Coffee, Heart } from 'lucide-react';
import AnimatedCounter from './AnimatedCounter';
import ImageReveal from './ImageReveal';
import InteractiveButton from './InteractiveButton';

const About: React.FC = () => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-amber-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-6xl font-bold text-amber-900 mb-6"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Our Story
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-amber-800 max-w-3xl mx-auto leading-relaxed"
          >
            Born in the heart of Rajasthan, our coffee house blends traditional warmth 
            with modern excellence, creating an experience that touches your soul
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="relative"
          >
            <ImageReveal
              src="https://images.pexels.com/photos/1833769/pexels-photo-1833769.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
              alt="Coffee brewing process"
              className="h-96 shadow-2xl"
              overlayText="Crafted with Traditional Methods"
              revealDirection="left"
            />
            {/* Floating elements */}
            <motion.div
              animate={{ 
                y: [0, -20, 0],
                rotate: [0, 5, 0]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -top-4 -right-4 bg-amber-600 text-white p-4 rounded-full shadow-lg"
            >
              <Coffee className="w-8 h-8" />
            </motion.div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="space-y-8"
          >
            <motion.div variants={itemVariants}>
              <h3 className="text-3xl font-bold text-amber-900 mb-4">
                Crafted with Tradition
              </h3>
              <p className="text-lg text-amber-800 leading-relaxed mb-6">
                Every cup tells a story of generations-old brewing techniques passed down 
                through the royal kitchens of Rajasthan, now perfected for the modern palate.
              </p>
            </motion.div>

            {/* Stats Grid */}
            <motion.div 
              variants={containerVariants}
              className="grid grid-cols-2 gap-6"
            >
              {[
                { icon: Award, number: 25, suffix: "+", label: "Years Experience" },
                { icon: Users, number: 10000, suffix: "+", label: "Happy Customers" },
                { icon: Coffee, number: 50, suffix: "+", label: "Coffee Varieties" },
                { icon: Heart, number: 100, suffix: "%", label: "Made with Love" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-all duration-300 border border-amber-100"
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <stat.icon className="w-8 h-8 text-amber-600 mx-auto mb-3" />
                  </motion.div>
                  <AnimatedCounter
                    end={stat.number}
                    suffix={stat.suffix}
                    className="text-2xl font-bold text-amber-900"
                  />
                  <div className="text-sm text-amber-700">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="mt-8"
            >
              <InteractiveButton
                variant="primary"
                size="lg"
                icon={Coffee}
                onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Explore Our Menu
              </InteractiveButton>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;