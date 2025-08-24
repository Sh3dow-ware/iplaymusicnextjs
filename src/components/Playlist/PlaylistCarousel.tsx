'use client'
import React, { useState, useRef, useEffect } from 'react';
import { motion, type PanInfo, useMotionValue, animate } from 'framer-motion';
import '@/styles/element/Carousel.sass';
import Image from 'next/image';

interface CarouselProps {
  images: string[];
}

export const Carousel: React.FC<CarouselProps> = ({ images }) => {
  // Sanitize incoming images to avoid invalid src values
  const sanitizedImages = images.filter((src): src is string => !!src);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const constraintsRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);

  const totalImages = sanitizedImages.length;

  const handleDragEnd = (_: any, info: PanInfo) => {
    setIsDragging(false);
    const threshold = 50;
    const velocity = info.velocity.x;
    const offset = info.offset.x;

    let newIndex = currentIndex;

    if (Math.abs(offset) > threshold || Math.abs(velocity) > 500) {
      if (offset > 0 || velocity > 500) {
        newIndex = Math.max(0, currentIndex - 1);
      } else if (offset < 0 || velocity < -500) {
        newIndex = Math.min(totalImages - 1, currentIndex + 1);
      }
    }

    setCurrentIndex(newIndex);
    animate(x, 0, {
      type: 'spring',
      stiffness: 300,
      damping: 30,
      mass: 1,
    });
  };

  useEffect(() => {
    if (!isDragging) {
      animate(x, 0, {
        type: 'spring',
        stiffness: 300,
        damping: 30,
        mass: 1,
      });
    }
  }, [currentIndex, isDragging, x]);

  const getVisibleImages = () => {
    const visibleImages = [] as { src: string; position: number; index: number; key: string }[];
    for (let i = -1; i <= 1; i++) {
      const index = currentIndex + i;
      if (index >= 0 && index < totalImages) {
        visibleImages.push({
          src: sanitizedImages[index],
          position: i,
          index: index,
          key: `image-${index}`,
        });
      }
    }
    return visibleImages;
  };

  const visibleImages = getVisibleImages();

  return (
    <div className="carousel-container" ref={constraintsRef}>
      <motion.div
        className="carousel-track"
        style={{ x }}
        drag="x"
        dragConstraints={constraintsRef}
        dragElastic={0.1}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={handleDragEnd}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 30,
          mass: 1,
        }}
      >
        {visibleImages.map((image) => (
          <motion.div
            key={image.key}
            className={`carousel-slide ${image.position === 0 ? 'active' : 'inactive'}`}
            initial={false}
            animate={{
              scale: image.position === 0 ? 1.1 : 0.8,
              opacity: image.position === 0 ? 1 : 0.6,
              x: `${image.position * 100}%`,
              zIndex: image.position === 0 ? 2 : 1,
            }}
            transition={{
              type: 'spring',
              stiffness: 400,
              damping: 25,
              mass: 0.8,
            }}
          >
            <div className="carousel-image-wrapper">
              <Image
                src={image.src}
                alt={`Slide ${image.index}`}
                draggable={false}
                className="carousel-image"
                width={700}
                height={700}
              />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};