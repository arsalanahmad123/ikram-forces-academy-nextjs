'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import image1 from '@/public/paf-sargodha.png';
import image2 from '@/public/paf-lowertopa.jpg';
import image3 from '@/public/militarycollegejhelum.jpeg';
import image4 from '@/public/mcm.jpeg';
import image5 from '@/public/mcs.jpg';
import { ChevronRight, ChevronLeft } from 'lucide-react';

const CollegesCarousel = () => {
  const [positionIndexes, setPositionIndexes] = useState([0, 1, 2, 3, 4]);

  const handleNext = () => {
    setPositionIndexes((prevIndexes) => {
      const updatedIndexes = prevIndexes.map(
        (prevIndex) => (prevIndex + 1) % 5,
      );
      return updatedIndexes;
    });
  };

  const handleBack = () => {
    setPositionIndexes((prevIndexes) => {
      const updatedIndexes = prevIndexes.map(
        (prevIndex) => (prevIndex + 4) % 5,
      );
      return updatedIndexes;
    });
  };

  const images = [image1, image2, image3, image4, image5];

  const positions = ['center', 'left1', 'left', 'right', 'right1'];

  const imageVariants = {
    center: { x: '0%', scale: 1, zIndex: 5 },
    left1: { x: '-50%', scale: 0.7, zIndex: 3 },
    left: { x: '-90%', scale: 0.5, zIndex: 2 },
    right: { x: '90%', scale: 0.5, zIndex: 1 },
    right1: { x: '50%', scale: 0.7, zIndex: 3 },
  };

  return (
    <div className="flex items-center flex-col justify-center relative">
      {images.map((image, index) => (
        <motion.div
          key={index}
          className="absolute"
          initial="center"
          animate={positions[positionIndexes[index]]}
          variants={imageVariants}
          transition={{ duration: 0.5 }}
          style={{ width: '40%' }}
        >
          <Image
            src={image}
            alt={`Image ${index + 1}`}
            width={1000}
            height={600}
            className="rounded-[12px] "
          />
        </motion.div>
      ))}

      <div className="flex flex-row gap-3 md:mt-[700px] mt-80 z-20">
        <button
          className="text-white dark:text-primary dark:bg-gray-950 dark:shadow-lg bg-primary rounded-md py-2 px-4"
          onClick={handleBack}
        >
          <ChevronLeft />
        </button>

        <button
          className="text-white dark:text-primary dark:bg-gray-950 dark:shadow-lg bg-primary rounded-md py-2 px-4"
          onClick={handleNext}
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};

export default CollegesCarousel;
