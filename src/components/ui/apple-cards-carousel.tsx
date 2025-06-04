"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../lib/utils";

interface CardProps {
  card: {
    category: string;
    title: string;
    src: string;
    content: React.ReactNode;
    onClick?: () => void;
    isSelected?: boolean;
  };
  index: number;
  isSelected?: boolean;
}

export const Card = ({ card, index, isSelected }: CardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ 
        scale: isSelected ? 1.05 : 1,
        opacity: 1,
        borderColor: isSelected ? 'rgba(255, 255, 255, 0.5)' : 'rgba(255, 255, 255, 0.1)'
      }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className={cn(
        "relative w-[300px] h-[400px] rounded-3xl overflow-hidden cursor-pointer",
        "transition-all duration-300 ease-in-out border-2",
        isHovered ? "scale-105" : "scale-100",
        isSelected ? "ring-4 ring-white/30" : "",
        !isSelected && "blur-[2px] opacity-50"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={card.onClick}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 z-10" />
      <img
        src={card.src}
        alt={card.title}
        className={cn(
          "w-full h-full object-cover transition-opacity duration-300",
          isSelected ? "opacity-0" : "opacity-100"
        )}
      />
      <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
        <p className="text-sm text-white/80 mb-2">{card.category}</p>
        <h3 className="text-2xl font-bold text-white">{card.title}</h3>
      </div>
      {isSelected && (
        <div className="absolute top-4 right-4 z-30">
          <div className="w-3 h-3 rounded-full bg-white animate-pulse" />
        </div>
      )}
    </motion.div>
  );
};

interface CarouselProps {
  items: React.ReactNode[];
}

export const Carousel = ({ items }: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (containerRef.current) {
      const scrollLeft = containerRef.current.scrollLeft;
      const itemWidth = 320; // card width + gap
      const newIndex = Math.round(scrollLeft / itemWidth);
      setCurrentIndex(newIndex);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <div className="relative w-full overflow-hidden">
      <div
        ref={containerRef}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide py-8 px-4"
        style={{ scrollBehavior: "smooth" }}
      >
        {items}
      </div>
      <div className="flex justify-center gap-2 mt-4">
        {items.map((_, index) => (
          <button
            key={index}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-300",
              currentIndex === index ? "bg-black dark:bg-white" : "bg-gray-300"
            )}
            onClick={() => {
              if (containerRef.current) {
                containerRef.current.scrollTo({
                  left: index * 320,
                  behavior: "smooth",
                });
              }
            }}
          />
        ))}
      </div>
    </div>
  );
}; 