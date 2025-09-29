import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { libraryData } from "@/data/libraryData";
import { ChevronLeft, ChevronRight } from 'lucide-react';


const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const BookCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleBooks, setVisibleBooks] = useState(3); // default for mobile

  // Shuffle once on mount
  const books = useMemo(() => shuffleArray(libraryData), []);

  // Adjust number of visible books based on screen size
  useEffect(() => {
    const updateVisibleBooks = () => {
      if (window.innerWidth < 768) {
        setVisibleBooks(3); // mobile
      } else if (window.innerWidth < 1280) {
        setVisibleBooks(7); // tablet/small desktop
      } else {
        setVisibleBooks(9); // large desktop
      }
    };

    updateVisibleBooks();
    window.addEventListener("resize", updateVisibleBooks);
    return () => window.removeEventListener("resize", updateVisibleBooks);
  }, []);

  const nextBook = () => {
    setActiveIndex((prev) => (prev + 1) % books.length);
  };

  const prevBook = () => {
    setActiveIndex((prev) =>
      prev === 0 ? books.length - 1 : prev - 1
    );
  };

  // Auto-rotate every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextBook();
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full flex flex-col items-center py-12">
      {/* Carousel */}
      <div className="relative flex items-center justify-center h-80 w-full max-w-7xl overflow-hidden perspective-[1200px]">
        <AnimatePresence>
          {books.map((book, index) => {
            const offset =
              (index - activeIndex + books.length) % books.length;

            if (offset >= visibleBooks) return null;

            const center = Math.floor(visibleBooks / 2);
            const position = offset - center;

            // More spacing between books
            const translateX = position * 200;
            const rotateY = position * -15; // tilt left/right
            const blur = Math.abs(position) > 1 ? "blur(2px)" : "none";

            const scale = position === 0 ? 1.1 : 0.85; // bigger center
            const opacity = position === 0 ? 1 : 0.4; 
            const zIndex = visibleBooks - Math.abs(position);

            return (
              <motion.div
                key={book.id}
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{
                  x: translateX,
                  scale,
                  opacity,
                  rotateY,
                  filter: blur,
                  zIndex,
                  y: 0,
                }}
                exit={{ opacity: 0, scale: 0.5, y: -50 }}
                transition={{
                  type: "spring",
                  stiffness: 120,
                  damping: 20,
                  mass: 0.8,
                }}
                className="absolute flex flex-col items-center"
              >
                <img
                  src={book.picture}
                  alt={book.title}
                  className="w-44 h-44 md:w-48 md:h-48 lg:w-56 lg:h-56 object-cover rounded-xl border border-gray-200 shadow-lg bg-white"
                />
                <p className="mt-3 text-center font-semibold text-foreground text-sm md:text-base">
                  {book.title}
                </p>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Controls */}
        <div className="flex gap-6 mt-10 justify-center">
          <button
            onClick={prevBook}
            className="px-4 py-2 rounded-full bg-primary text-white hover:bg-primary/80 transition flex items-center justify-center"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={nextBook}
            className="px-4 py-2 rounded-full bg-primary text-white hover:bg-primary/80 transition flex items-center justify-center"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
    </div>
  );
};

export default BookCarousel;
