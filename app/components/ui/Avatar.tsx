import React from 'react';

export interface AvatarProps {
  src?: string;
  alt: string;
  name?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({ 
  src, 
  alt, 
  name,
  size = 'md',
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-10 h-10 text-sm',
    md: 'w-16 h-16 text-lg',
    lg: 'w-24 h-24 text-2xl',
    xl: 'w-32 h-32 text-3xl',
  };
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };
  
  return (
    <div 
      className={`${sizeClasses[size]} rounded-full overflow-hidden flex items-center justify-center bg-peach text-charcoal font-semibold ${className}`}
      role="img"
      aria-label={alt}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img 
          src={src} 
          alt={alt} 
          className="w-full h-full object-cover"
        />
      ) : name ? (
        <span>{getInitials(name)}</span>
      ) : (
        <svg 
          className="w-full h-full p-2" 
          fill="currentColor" 
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
        </svg>
      )}
    </div>
  );
};

