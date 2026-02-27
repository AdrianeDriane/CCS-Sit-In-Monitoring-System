/**
 * Centralized Framer Motion variants.
 *
 * Keeping animation definitions separate from components means:
 * 1. Consistent motion language across the entire feature.
 * 2. Easy to tweak timing globally without hunting through JSX.
 * 3. Components stay focused on structure, not choreography.
 */

import type { Variants } from "framer-motion";

/** Orchestrates staggered reveal of child elements */
export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

/** Standard fade-up with subtle blur clear — used for form fields, text blocks */
export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24,
    },
  },
};

/** Slide from the left — used for brand panel headline & terminal */
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20,
      delay: 0.2,
    },
  },
};

/** Gentle scale entrance */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 250,
      damping: 22,
    },
  },
};
