import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AccordionItem } from './AccordionItem';
import { accordionData } from '@/lib/data/accordionData';

export const Accordion: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number): void => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
      <div className="accordion-container">
        <motion.h1
            className="accordion-container__heading"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
          Categories
        </motion.h1>

        {accordionData.map((item, index) => (
            <AccordionItem
                key={index}
                item={item}
                index={index}
                isOpen={openIndex === index}
                toggleAccordion={toggleAccordion}
            />
        ))}
      </div>
  );
};
