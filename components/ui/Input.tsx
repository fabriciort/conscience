import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  className = '',
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={props.id} className="block text-sm font-medium text-[var(--charcoal)] mb-2">
          {label}
        </label>
      )}
      <input
        className={`w-full rounded-full px-6 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--coral)] focus:border-transparent text-[var(--charcoal)] bg-white ${className}`}
        {...props}
      />
      {error && (
        <p className="mt-2 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

