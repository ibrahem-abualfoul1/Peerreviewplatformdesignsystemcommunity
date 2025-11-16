import { NavLink } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { 
  LayoutDashboard, 
  Users, 
  HelpCircle, 
  ClipboardList, 
  FileCheck, 
  ClipboardCheck, 
  Star, 
  Database, 
  Settings 
} from 'lucide-react';

export default function Sidebar() {
  const { t } = useLanguage();
  const { theme } = useTheme();

  const navItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: t('dashboard') },
    { path: '/users', icon: Users, label: t('users') },
    { path: '/questions', icon: HelpCircle, label: t('questions') },
    { path: '/assignments', icon: ClipboardList, label: t('assignments') },
    { path: '/my-answers', icon: FileCheck, label: t('myAnswers') },
    { path: '/scoring', icon: Star, label: t('scoring') },
    { path: '/lookups', icon: Database, label: t('lookups') },
    { path: '/settings', icon: Settings, label: t('settings') },
  ];

  const bgClass = theme === 'dark' ? 'bg-[#221509]' : 'bg-[#FDFBF7]';
  const borderClass = theme === 'dark' ? 'border-[#3D2A1A]' : 'border-[rgba(141,27,61,0.1)]';

  return (
    <aside className={`fixed top-0 ltr:left-0 rtl:right-0 h-screen w-64 ${bgClass} border-r ${borderClass} z-40`}>
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#8D1B3D] to-[#A52A4A] flex items-center justify-center shadow-lg">
            <ClipboardCheck className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className={`${theme === 'dark' ? 'text-[#E8D5B7]' : 'text-[#2D1B0E]'}`}>
              PeerReview
            </h1>
            <p className={`text-xs ${theme === 'dark' ? 'text-[#B8A593]' : 'text-[#6B5D50]'}`}>
              Platform
            </p>
          </div>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `
                flex items-center gap-3 px-4 py-3 rounded-[18px] transition-all
                ${isActive 
                  ? theme === 'dark'
                    ? 'bg-[#A52A4A] text-white shadow-lg shadow-[#A52A4A]/30'
                    : 'bg-[#8D1B3D] text-white shadow-lg shadow-[#8D1B3D]/30'
                  : theme === 'dark'
                    ? 'text-[#B8A593] hover:bg-[#3D2A1A]'
                    : 'text-[#6B5D50] hover:bg-[#F5E6D3]'
                }
              `}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
}