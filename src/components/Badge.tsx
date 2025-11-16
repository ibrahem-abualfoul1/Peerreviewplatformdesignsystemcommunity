import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'success' | 'warning' | 'error' | 'info';
}

export default function Badge({ children, variant = 'info' }: BadgeProps) {
  const variants = {
    success: 'bg-green-500/10 text-green-500 border-green-500/20',
    warning: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
    error: 'bg-red-500/10 text-red-500 border-red-500/20',
    info: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  };

  return (
    <span className={`inline-flex px-3 py-1 rounded-full text-xs border ${variants[variant]}`}>
      {children}
    </span>
  );
}
