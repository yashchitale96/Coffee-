import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface ImageRevealProps {
  src: string;
  alt: string;
  className?: string;
  overlayText?: string;
  revealDirection?: 'left' | 'right' | 'up' | 'down';
}

const ImageReveal: React.FC<ImageRevealProps> = ({
  src,
  alt,
  className = '',
  overlayText,
  revealDirection = 'up'
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  const getRevealAnimation = () => {
    switch (revealDirection) {
      case 'left':
        return { x: [-100, 0], opacity: [0, 1] };
      case 'right':
        return { x: [100, 0], opacity: [0, 1] };
      case 'up':
        return { y: [100, 0], opacity: [0, 1] };
      case 'down':
        return { y: [-100, 0], opacity: [0, 1] };
      default:
        return { y: [100, 0], opacity: [0, 1] };
    }
  };

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden rounded-2xl ${className}`}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6 }}
    >
      {/* Image */}
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        onLoad={() => setImageLoaded(true)}
        initial={{ scale: 1.2 }}
        animate={inView && imageLoaded ? { scale: 1 } : {}}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />

      {/* Reveal Overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-amber-900 to-orange-900"
        initial={{ 
          ...(revealDirection === 'left' && { x: 0 }),
          ...(revealDirection === 'right' && { x: 0 }),
          ...(revealDirection === 'up' && { y: 0 }),
          ...(revealDirection === 'down' && { y: 0 })
        }}
        animate={inView ? {
          ...(revealDirection === 'left' && { x: '-100%' }),
          ...(revealDirection === 'right' && { x: '100%' }),
          ...(revealDirection === 'up' && { y: '-100%' }),
          ...(revealDirection === 'down' && { y: '100%' })
        } : {}}
        transition={{ duration: 1, delay: 0.3, ease: "easeInOut" }}
      />

      {/* Loading Skeleton */}
      {!imageLoaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-amber-200 via-amber-300 to-amber-200 animate-pulse" />
      )}

      {/* Overlay Text */}
      {overlayText && (
        <motion.div
          className="absolute inset-0 bg-black/40 flex items-center justify-center"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.p
            className="text-white text-xl font-bold text-center px-4"
            initial={{ y: 20, opacity: 0 }}
            whileHover={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            {overlayText}
          </motion.p>
        </motion.div>
      )}

      {/* Hover Glow Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-orange-400/20 opacity-0"
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

export default ImageReveal;