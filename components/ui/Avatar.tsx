import React from 'react';
import Image from 'next/image';

interface AvatarProps {
  src?: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  size = 'md',
  className = '',
}) => {
  const sizes = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
  };
  
  return (
    <div
      className={`${sizes[size]} rounded-full bg-[var(--peach)] flex items-center justify-center overflow-hidden ${className}`}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          width={size === 'sm' ? 48 : size === 'md' ? 64 : 96}
          height={size === 'sm' ? 48 : size === 'md' ? 64 : 96}
          className="w-full h-full object-cover"
        />
      ) : (
        <span className="text-[var(--charcoal)] font-semibold text-lg">
          {alt.charAt(0).toUpperCase()}
        </span>
      )}
    </div>
  );
};

