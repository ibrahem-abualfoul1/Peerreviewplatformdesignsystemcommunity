import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import GlassCard from '../components/GlassCard';
import Button from '../components/Button';
import { ArrowLeft } from 'lucide-react';

export default function CreateUser() {
  const { t, isRTL } = useLanguage();
  const { theme } = useTheme();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    role: 'User',
    active: true,
  });

  const textClass = theme === 'dark' ? 'text-[#f9fafb]' : 'text-[#111827]';
  const mutedClass = theme === 'dark' ? 'text-[#9ca3af]' : 'text-[#6b7280]';
  const inputBg = theme === 'dark' ? 'bg-[#0b1120] border-[#1e293b]' : 'bg-[#f9fafb] border-[#e5e7eb]';

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Handle form submission
    navigate('/users');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/users')}
          className={`p-2 rounded-full ${theme === 'dark' ? 'hover:bg-[#0f172a]' : 'hover:bg-[#f9fafb]'} ${textClass} transition-colors`}
        >
          <ArrowLeft className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
        </button>
        <h1 className={`text-2xl ${textClass}`}>{t('createUser')}</h1>
      </div>

      <GlassCard className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
          <div>
            <label className={`block text-sm mb-2 ${textClass}`}>
              {t('fullName')}
            </label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className={`w-full px-4 py-3 rounded-[18px] ${inputBg} border ${textClass} focus:outline-none focus:ring-2 focus:ring-[#c9a227] transition-all`}
              required
            />
          </div>

          <div>
            <label className={`block text-sm mb-2 ${textClass}`}>
              {t('username')}
            </label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className={`w-full px-4 py-3 rounded-[18px] ${inputBg} border ${textClass} focus:outline-none focus:ring-2 focus:ring-[#c9a227] transition-all`}
              required
            />
          </div>

          <div>
            <label className={`block text-sm mb-2 ${textClass}`}>
              {t('email')}
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={`w-full px-4 py-3 rounded-[18px] ${inputBg} border ${textClass} focus:outline-none focus:ring-2 focus:ring-[#c9a227] transition-all`}
              required
            />
          </div>

          <div>
            <label className={`block text-sm mb-2 ${textClass}`}>
              {t('password')}
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className={`w-full px-4 py-3 rounded-[18px] ${inputBg} border ${textClass} focus:outline-none focus:ring-2 focus:ring-[#c9a227] transition-all`}
              required
            />
          </div>

          <div>
            <label className={`block text-sm mb-2 ${textClass}`}>
              {t('role')}
            </label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className={`w-full px-4 py-3 rounded-[18px] ${inputBg} border ${textClass} focus:outline-none focus:ring-2 focus:ring-[#c9a227] transition-all`}
            >
              <option value="User">User</option>
              <option value="Evaluator">Evaluator</option>
              <option value="Administrator">Administrator</option>
            </select>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="active"
              checked={formData.active}
              onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
              className="w-5 h-5 rounded accent-[#c9a227]"
            />
            <label htmlFor="active" className={textClass}>
              {t('active')}
            </label>
          </div>

          <div className="flex items-center gap-4 pt-4">
            <Button type="submit">
              {t('save')}
            </Button>
            <Button type="button" variant="soft" onClick={() => navigate('/users')}>
              {t('cancel')}
            </Button>
          </div>
        </form>
      </GlassCard>
    </div>
  );
}
