import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';

const loaderVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.4, delay: 0.3 } },
};

const bookIconVariants = {
  initial: {
    scale: 0.8,
    y: 0,
    rotateY: 0,
  },
  animate: {
    scale: [1, 1.05, 1],
    y: [0, -8, 0],
    transition: {
      duration: 1,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "mirror",
    },
  },
};

const PageLoader = () => {
  return (
    <motion.div
      variants={loaderVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
    >
      <motion.div variants={bookIconVariants}>
        <BookOpen className="w-16 h-16 text-primary" strokeWidth={1.5} />
      </motion.div>
    </motion.div>
  );
};

export default PageLoader;