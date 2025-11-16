import { ReactNode } from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
}

export default function GlassCard({ children, className = '' }: GlassCardProps) {
  const { theme } = useTheme();

  const bgClass = theme === 'dark' 
    ? 'bg-[#2D1B0E]/90 border-[#D4876F]/20' 
    : 'bg-white/90 border-[#8D1B3D]/10';

  return (
    <div className={`${bgClass} backdrop-blur-xl border rounded-[24px] shadow-xl ${className}`}>
      {children}
    </div>
  );
}