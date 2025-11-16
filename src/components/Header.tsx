import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { Sun, Moon, Globe, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const { user, logout } = useAuth();
  const { t, language, toggleLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const bgClass = theme === 'dark' ? 'bg-[#221509]' : 'bg-[#FDFBF7]';
  const borderClass = theme === 'dark' ? 'border-[#3D2A1A]' : 'border-[rgba(141,27,61,0.1)]';
  const textClass = theme === 'dark' ? 'text-[#E8D5B7]' : 'text-[#2D1B0E]';
  const mutedClass = theme === 'dark' ? 'text-[#B8A593]' : 'text-[#6B5D50]';
  const btnBg = theme === 'dark' ? 'bg-[#3D2A1A]' : 'bg-[#F5E6D3]';
  const goldColor = theme === 'dark' ? 'text-[#D4A574]' : 'text-[#8D1B3D]';

  return (
    <header className={`${bgClass} border-b ${borderClass} px-6 py-4 sticky top-0 z-30`}>
      <div className="flex items-center justify-between">
        <div>
          <h2 className={textClass}>{user?.fullName}</h2>
          <p className={`text-sm ${mutedClass}`}>{user?.role}</p>
        </div>

        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full ${btnBg} ${goldColor} hover:scale-110 transition-transform`}
            title={theme === 'dark' ? t('lightMode') : t('darkMode')}
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* Language Toggle */}
          <button
            onClick={toggleLanguage}
            className={`px-4 py-2 rounded-full ${btnBg} ${goldColor} hover:scale-105 transition-transform flex items-center gap-2`}
          >
            <Globe className="w-4 h-4" />
            <span className="uppercase">{language === 'en' ? 'EN' : 'ع'}</span>
          </button>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-full bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            <span>{t('logout')}</span>
          </button>
        </div>
      </div>
    </header>
  );
}