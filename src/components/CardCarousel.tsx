import React from 'react';
import { Carousel, Card } from './ui/apple-cards-carousel';

interface CardCarouselProps {
  cards: Array<{
    type: string;
    component: React.ReactNode;
  }>;
  onCardClick: (index: number) => void;
  currentIndex?: number;
}

export const CardCarousel: React.FC<CardCarouselProps> = ({ 
  cards, 
  onCardClick,
  currentIndex = 0 
}) => {
  // Define some default background images for different card types
  const getBackgroundImage = (type: string) => {
    const images = {
      candidates: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=300&h=400&fit=crop',
      messages: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=300&h=400&fit=crop',
      dashboard: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=300&h=400&fit=crop',
      coach: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&h=400&fit=crop',
      profile: 'https://images.unsplash.com/photo-1573497019230-a0abdc6d5558?q=80&w=300&h=400&fit=crop',
      settings: 'https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=300&h=400&fit=crop',
      jobs: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=300&h=400&fit=crop',
    };
    return images[type.toLowerCase() as keyof typeof images] || 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=300&h=400&fit=crop';
  };

  const carouselCards = cards.map((card, index) => ({
    category: card.type.charAt(0).toUpperCase() + card.type.slice(1),
    title: `${card.type.charAt(0).toUpperCase() + card.type.slice(1)} View`,
    src: getBackgroundImage(card.type),
    content: card.component,
    onClick: () => onCardClick(index),
    isSelected: index === currentIndex,
  }));

  return (
    <div className="w-full">
      <Carousel 
        items={carouselCards.map((card, index) => (
          <Card 
            key={index} 
            card={card} 
            index={index}
            isSelected={index === currentIndex}
          />
        ))} 
      />
    </div>
  );
}; 