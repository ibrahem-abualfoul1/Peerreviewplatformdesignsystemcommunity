import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'soft' | 'outline' | 'danger';
  children: ReactNode;
}

export default function Button({ variant = 'primary', children, className = '', ...props }: ButtonProps) {
  const variants = {
    primary: 'bg-gradient-to-r from-[#8D1B3D] to-[#A52A4A] text-white hover:from-[#A52A4A] hover:to-[#8D1B3D] shadow-lg shadow-[#8D1B3D]/30',
    soft: 'bg-[#8D1B3D]/10 text-[#8D1B3D] hover:bg-[#8D1B3D]/20 border border-[#8D1B3D]/20',
    outline: 'border-2 border-[#8D1B3D] text-[#8D1B3D] hover:bg-[#8D1B3D]/10',
    danger: 'bg-red-500 text-white hover:bg-red-600 shadow-lg shadow-red-500/20',
  };

  return (
    <button
      className={`px-6 py-2.5 rounded-full transition-all ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}