import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import GlassCard from '../components/GlassCard';
import Button from '../components/Button';

export default function Settings() {
  const { t, language, toggleLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();

  const textClass = theme === 'dark' ? 'text-[#f9fafb]' : 'text-[#111827]';
  const mutedClass = theme === 'dark' ? 'text-[#9ca3af]' : 'text-[#6b7280]';
  const inputBg = theme === 'dark' ? 'bg-[#0b1120] border-[#1e293b]' : 'bg-[#f9fafb] border-[#e5e7eb]';

  return (
    <div className="space-y-6 max-w-4xl">
      <h1 className={`text-2xl ${textClass}`}>{t('settings')}</h1>

      {/* General Settings */}
      <GlassCard className="p-6">
        <h2 className={`text-xl mb-6 ${textClass}`}>{t('generalSettings')}</h2>
        
        <div className="space-y-6">
          {/* Theme */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className={textClass}>{t('theme')}</h3>
              <p className={`text-sm ${mutedClass}`}>
                {theme === 'dark' ? t('darkMode') : t('lightMode')}
              </p>
            </div>
            <button
              onClick={toggleTheme}
              className={`relative w-16 h-8 rounded-full transition-colors ${
                theme === 'dark' ? 'bg-[#c9a227]' : 'bg-gray-300'
              }`}
            >
              <div
                className={`absolute top-1 w-6 h-6 rounded-full bg-white shadow-lg transition-transform ${
                  theme === 'dark' ? 'translate-x-9' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Language */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className={textClass}>{t('language')}</h3>
              <p className={`text-sm ${mutedClass}`}>
                {language === 'en' ? 'English' : 'العربية'}
              </p>
            </div>
            <Button variant="soft" onClick={toggleLanguage}>
              {language === 'en' ? 'عربي' : 'English'}
            </Button>
          </div>
        </div>
      </GlassCard>

      {/* Profile Info */}
      <GlassCard className="p-6">
        <h2 className={`text-xl mb-6 ${textClass}`}>{t('profileInfo')}</h2>
        
        <div className="space-y-6 max-w-2xl">
          <div>
            <label className={`block text-sm mb-2 ${textClass}`}>
              {t('fullName')}
            </label>
            <input
              type="text"
              defaultValue={user?.fullName}
              className={`w-full px-4 py-3 rounded-[18px] ${inputBg} border ${textClass} focus:outline-none focus:ring-2 focus:ring-[#c9a227] transition-all`}
            />
          </div>

          <div>
            <label className={`block text-sm mb-2 ${textClass}`}>
              {t('email')}
            </label>
            <input
              type="email"
              defaultValue={user?.email}
              className={`w-full px-4 py-3 rounded-[18px] ${inputBg} border ${textClass} focus:outline-none focus:ring-2 focus:ring-[#c9a227] transition-all`}
            />
          </div>

          <div>
            <label className={`block text-sm mb-2 ${textClass}`}>
              {t('username')}
            </label>
            <input
              type="text"
              defaultValue={user?.username}
              className={`w-full px-4 py-3 rounded-[18px] ${inputBg} border ${textClass} focus:outline-none focus:ring-2 focus:ring-[#c9a227] transition-all`}
            />
          </div>

          <div className="flex gap-4 pt-4">
            <Button variant="primary">
              {t('saveChanges')}
            </Button>
            <Button variant="soft">
              {t('cancel')}
            </Button>
          </div>
        </div>
      </GlassCard>

      {/* Security Settings */}
      <GlassCard className="p-6">
        <h2 className={`text-xl mb-6 ${textClass}`}>{t('security')}</h2>
        
        <div className="space-y-6 max-w-2xl">
          <div>
            <label className={`block text-sm mb-2 ${textClass}`}>
              {t('currentPassword')}
            </label>
            <input
              type="password"
              className={`w-full px-4 py-3 rounded-[18px] ${inputBg} border ${textClass} focus:outline-none focus:ring-2 focus:ring-[#c9a227] transition-all`}
            />
          </div>

          <div>
            <label className={`block text-sm mb-2 ${textClass}`}>
              {t('newPassword')}
            </label>
            <input
              type="password"
              className={`w-full px-4 py-3 rounded-[18px] ${inputBg} border ${textClass} focus:outline-none focus:ring-2 focus:ring-[#c9a227] transition-all`}
            />
          </div>

          <div>
            <label className={`block text-sm mb-2 ${textClass}`}>
              {t('confirmPassword')}
            </label>
            <input
              type="password"
              className={`w-full px-4 py-3 rounded-[18px] ${inputBg} border ${textClass} focus:outline-none focus:ring-2 focus:ring-[#c9a227] transition-all`}
            />
          </div>

          <div className="flex gap-4 pt-4">
            <Button variant="primary">
              {t('updatePassword')}
            </Button>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}