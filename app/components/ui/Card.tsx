import React from 'react';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'sm' | 'md' | 'lg';
  featured?: boolean;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  hover = false,
  padding = 'md',
  featured = false,
}) => {
  const baseClasses = 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 transition-all duration-200';
  const hoverClasses = hover ? 'hover:shadow-lg hover:-translate-y-1 cursor-pointer' : 'shadow-sm';
  const featuredClasses = featured ? 'ring-2 ring-coral shadow-lg' : '';
  
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };
  
  return (
    <div 
      className={`${baseClasses} ${hoverClasses} ${featuredClasses} ${paddingClasses[padding]} rounded-3xl ${className}`}
    >
      {children}
    </div>
  );
};

export interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ children, className = '' }) => {
  return <div className={`mb-4 ${className}`}>{children}</div>;
};

export interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export const CardTitle: React.FC<CardTitleProps> = ({ 
  children, 
  className = '', 
  as: Component = 'h3' 
}) => {
  return (
    <Component className={`text-2xl font-bold text-charcoal dark:text-cream ${className}`}>
      {children}
    </Component>
  );
};

export interface CardDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

export const CardDescription: React.FC<CardDescriptionProps> = ({ children, className = '' }) => {
  return (
    <p className={`text-gray-600 dark:text-gray-300 ${className}`}>
      {children}
    </p>
  );
};

export interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export const CardContent: React.FC<CardContentProps> = ({ children, className = '' }) => {
  return <div className={`${className}`}>{children}</div>;
};

export interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export const CardFooter: React.FC<CardFooterProps> = ({ children, className = '' }) => {
  return <div className={`mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 ${className}`}>{children}</div>;
};

