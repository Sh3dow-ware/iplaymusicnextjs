// src/components/Accordion/accordionAnimations.ts
// src/components/Accordion/accordionAnimations.ts
import type {Variants} from 'framer-motion';

export const accordionVariants: Variants = {
  closed: {
    height: 0,
    opacity: 0,
    transition: {
      height: {
        duration: 0.3,
        ease: [0.04, 0.62, 0.23, 0.98]
      },
      opacity: {
        duration: 0.25
      }
    }
  },
  open: {
    height: "auto",
    opacity: 1,
    transition: {
      height: {
        duration: 0.4,
        ease: [0.04, 0.62, 0.23, 0.98]
      },
      opacity: {
        duration: 0.25,
        delay: 0.05
      }
    }
  }
};

export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.1
    }
  }
};

export const itemVariants: Variants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24
    }
  }
};
