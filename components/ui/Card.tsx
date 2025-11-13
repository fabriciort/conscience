import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  featured?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hover = false,
  featured = false,
}) => {
  const baseStyles = 'rounded-[24px] p-6 md:p-8 bg-white border border-gray-200';
  const hoverStyles = hover ? 'transition-all duration-300 hover:shadow-lg hover:-translate-y-1' : '';
  const featuredStyles = featured ? 'border-2 border-[var(--coral)] shadow-lg' : '';
  
  return (
    <div className={`${baseStyles} ${hoverStyles} ${featuredStyles} ${className}`}>
      {children}
    </div>
  );
};

