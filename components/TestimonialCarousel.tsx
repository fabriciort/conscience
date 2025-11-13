'use client';

import React, { useState, useEffect } from 'react';
import { Card } from './ui/Card';
import { Avatar } from './ui/Avatar';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company?: string;
  content: string;
  avatar?: string;
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

export const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({ testimonials }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <div className="relative w-full">
      <Card className="p-8 md:p-12">
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
          <Avatar
            src={testimonials[currentIndex].avatar}
            alt={testimonials[currentIndex].name}
            size="lg"
            className="flex-shrink-0"
          />
          <div className="flex-1 text-center md:text-left">
            <p className="text-lg md:text-xl text-[var(--charcoal)] mb-4 italic">
              "{testimonials[currentIndex].content}"
            </p>
            <div>
              <p className="font-semibold text-[var(--charcoal)]">
                {testimonials[currentIndex].name}
              </p>
              <p className="text-[var(--text-secondary)]">
                {testimonials[currentIndex].role}
                {testimonials[currentIndex].company && ` • ${testimonials[currentIndex].company}`}
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-center gap-4 mt-6">
        <button
          onClick={goToPrevious}
          className="p-2 rounded-full hover:bg-gray-200 transition-colors"
          aria-label="Previous testimonial"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <div className="flex gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex
                  ? 'bg-[var(--coral)] w-8'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
        
        <button
          onClick={goToNext}
          className="p-2 rounded-full hover:bg-gray-200 transition-colors"
          aria-label="Next testimonial"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

