import { LucideIcon } from 'lucide-react';
import GlassCard from './GlassCard';
import { useTheme } from '../contexts/ThemeContext';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
}

export default function StatCard({ title, value, icon: Icon }: StatCardProps) {
  const { theme } = useTheme();
  const textClass = theme === 'dark' ? 'text-[#E8D5B7]' : 'text-[#2D1B0E]';
  const mutedClass = theme === 'dark' ? 'text-[#B8A593]' : 'text-[#6B5D50]';
  const iconBg = theme === 'dark' ? 'bg-[#A52A4A]/20' : 'bg-[#8D1B3D]/10';
  const iconColor = theme === 'dark' ? 'text-[#D4A574]' : 'text-[#8D1B3D]';

  return (
    <GlassCard className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className={`text-sm ${mutedClass} mb-1`}>{title}</p>
          <h3 className={`text-3xl ${textClass}`}>{value}</h3>
        </div>
        <div className={`w-14 h-14 rounded-full ${iconBg} flex items-center justify-center`}>
          <Icon className={`w-7 h-7 ${iconColor}`} />
        </div>
      </div>
    </GlassCard>
  );
}