import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { ClipboardCheck, Globe } from 'lucide-react';
import Button from '../components/Button';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const { t, language, toggleLanguage } = useLanguage();
  const { theme } = useTheme();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await login(username, password);
    navigate('/dashboard');
  };

  const bgClass = theme === 'dark' ? 'bg-[#1A0F0A]' : 'bg-[#FFF9F0]';
  const cardBg = theme === 'dark' ? 'bg-[#2D1B0E]/95 border-[#D4876F]/20' : 'bg-white/95 border-[#8D1B3D]/10';
  const textClass = theme === 'dark' ? 'text-[#E8D5B7]' : 'text-[#2D1B0E]';
  const mutedClass = theme === 'dark' ? 'text-[#B8A593]' : 'text-[#6B5D50]';
  const inputBg = theme === 'dark' ? 'bg-[#3D2A1A] border-[#D4876F]/20' : 'bg-[#F5E6D3] border-[#8D1B3D]/10';
  const btnBg = theme === 'dark' ? 'bg-[#3D2A1A]' : 'bg-white';
  const btnColor = theme === 'dark' ? 'text-[#D4A574]' : 'text-[#8D1B3D]';

  return (
    <div className={`min-h-screen ${bgClass} relative overflow-hidden`}>
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1543656847-684e90112dab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmFiaWFuJTIwZGVzZXJ0JTIwZHVuZXN8ZW58MXx8fHwxNzYzMzE4ODAyfDA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Desert Background"
          className="w-full h-full object-cover"
        />
        <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-[#1A0F0A]/80' : 'bg-[#FFF9F0]/70'} backdrop-blur-sm`} />
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-6">
        {/* Language Toggle - Top Right */}
        <button
          onClick={toggleLanguage}
          className={`fixed top-6 ${language === 'ar' ? 'left-6' : 'right-6'} px-4 py-2 rounded-full ${btnBg} ${btnColor} hover:scale-105 transition-transform flex items-center gap-2 shadow-xl backdrop-blur-md border ${theme === 'dark' ? 'border-[#D4876F]/20' : 'border-[#8D1B3D]/10'}`}
        >
          <Globe className="w-4 h-4" />
          <span className="uppercase">{language === 'en' ? 'EN' : 'ع'}</span>
        </button>

        <div className={`${cardBg} backdrop-blur-xl border rounded-[24px] shadow-2xl p-12 w-full max-w-md`}>
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#8D1B3D] to-[#A52A4A] flex items-center justify-center mb-4 shadow-lg shadow-[#8D1B3D]/40">
              <ClipboardCheck className="w-9 h-9 text-white" />
            </div>
            <h1 className={`text-2xl mb-2 ${textClass}`}>{t('welcomeBack')}</h1>
            <p className={`text-sm ${mutedClass} text-center`}>{t('loginToContinue')}</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className={`block text-sm mb-2 ${textClass}`}>
                {t('username')}
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={`w-full px-4 py-3 rounded-[18px] ${inputBg} border ${textClass} focus:outline-none focus:ring-2 focus:ring-[#8D1B3D] transition-all`}
                required
              />
            </div>

            <div>
              <label className={`block text-sm mb-2 ${textClass}`}>
                {t('password')}
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-4 py-3 rounded-[18px] ${inputBg} border ${textClass} focus:outline-none focus:ring-2 focus:ring-[#8D1B3D] transition-all`}
                required
              />
            </div>

            <Button type="submit" className="w-full">
              {t('login')}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}