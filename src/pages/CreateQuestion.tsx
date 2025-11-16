import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import GlassCard from '../components/GlassCard';
import Button from '../components/Button';
import { ArrowLeft, Plus, GripVertical, X } from 'lucide-react';

interface QuestionItem {
  id: number;
  textAr: string;
  textEn: string;
}

export default function CreateQuestion() {
  const { t, isRTL } = useLanguage();
  const { theme } = useTheme();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    titleAr: '',
    titleEn: '',
    description: '',
    type: 'text',
  });

  const [items, setItems] = useState<QuestionItem[]>([
    { id: 1, textAr: '', textEn: '' },
  ]);

  const textClass = theme === 'dark' ? 'text-[#f9fafb]' : 'text-[#111827]';
  const mutedClass = theme === 'dark' ? 'text-[#9ca3af]' : 'text-[#6b7280]';
  const inputBg = theme === 'dark' ? 'bg-[#0b1120] border-[#1e293b]' : 'bg-[#f9fafb] border-[#e5e7eb]';

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    navigate('/questions');
  };

  const addItem = () => {
    setItems([...items, { id: Date.now(), textAr: '', textEn: '' }]);
  };

  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  const updateItem = (id: number, field: 'textAr' | 'textEn', value: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const showItems = formData.type === 'choice' || formData.type === 'multiple';

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/questions')}
          className={`p-2 rounded-full ${theme === 'dark' ? 'hover:bg-[#0f172a]' : 'hover:bg-[#f9fafb]'} ${textClass} transition-colors`}
        >
          <ArrowLeft className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
        </button>
        <h1 className={`text-2xl ${textClass}`}>{t('createQuestion')}</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Question Info Section */}
        <GlassCard className="p-8">
          <h2 className={`text-xl mb-6 ${textClass}`}>{t('questionInfo')}</h2>
          
          <div className="space-y-6 max-w-2xl">
            <div>
              <label className={`block text-sm mb-2 ${textClass}`}>
                {t('titleArabic')}
              </label>
              <input
                type="text"
                value={formData.titleAr}
                onChange={(e) => setFormData({ ...formData, titleAr: e.target.value })}
                className={`w-full px-4 py-3 rounded-[18px] ${inputBg} border ${textClass} focus:outline-none focus:ring-2 focus:ring-[#c9a227] transition-all`}
                dir="rtl"
                required
              />
            </div>

            <div>
              <label className={`block text-sm mb-2 ${textClass}`}>
                {t('titleEnglish')}
              </label>
              <input
                type="text"
                value={formData.titleEn}
                onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
                className={`w-full px-4 py-3 rounded-[18px] ${inputBg} border ${textClass} focus:outline-none focus:ring-2 focus:ring-[#c9a227] transition-all`}
                dir="ltr"
                required
              />
            </div>

            <div>
              <label className={`block text-sm mb-2 ${textClass}`}>
                {t('description')}
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className={`w-full px-4 py-3 rounded-[18px] ${inputBg} border ${textClass} focus:outline-none focus:ring-2 focus:ring-[#c9a227] transition-all`}
                rows={4}
              />
            </div>

            <div>
              <label className={`block text-sm mb-2 ${textClass}`}>
                {t('questionType')}
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className={`w-full px-4 py-3 rounded-[18px] ${inputBg} border ${textClass} focus:outline-none focus:ring-2 focus:ring-[#c9a227] transition-all`}
              >
                <option value="text">Text</option>
                <option value="choice">Single Choice</option>
                <option value="multiple">Multiple Choice</option>
                <option value="number">Number</option>
                <option value="date">Date</option>
                <option value="yesno">Yes/No</option>
              </select>
            </div>
          </div>
        </GlassCard>

        {/* Question Items Section */}
        {showItems && (
          <GlassCard className="p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-xl ${textClass}`}>{t('questionItems')}</h2>
              <Button type="button" variant="soft" onClick={addItem}>
                <Plus className="w-4 h-4 inline ltr:mr-2 rtl:ml-2" />
                {t('addOption')}
              </Button>
            </div>

            <div className="space-y-4 max-w-2xl">
              {items.map((item, index) => (
                <div key={item.id} className={`p-4 rounded-[18px] ${theme === 'dark' ? 'bg-[#0b1120]' : 'bg-[#f9fafb]'}`}>
                  <div className="flex items-start gap-3">
                    <button type="button" className={`p-2 ${mutedClass} cursor-move`}>
                      <GripVertical className="w-5 h-5" />
                    </button>
                    
                    <div className="flex-1 space-y-3">
                      <input
                        type="text"
                        placeholder="Arabic text"
                        value={item.textAr}
                        onChange={(e) => updateItem(item.id, 'textAr', e.target.value)}
                        className={`w-full px-4 py-2 rounded-[12px] ${inputBg} border ${textClass} focus:outline-none focus:ring-2 focus:ring-[#c9a227] transition-all`}
                        dir="rtl"
                      />
                      <input
                        type="text"
                        placeholder="English text"
                        value={item.textEn}
                        onChange={(e) => updateItem(item.id, 'textEn', e.target.value)}
                        className={`w-full px-4 py-2 rounded-[12px] ${inputBg} border ${textClass} focus:outline-none focus:ring-2 focus:ring-[#c9a227] transition-all`}
                        dir="ltr"
                      />
                    </div>

                    {items.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="p-2 rounded-full hover:bg-red-500/10 text-red-500 transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        )}

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Button type="submit">
            {t('save')}
          </Button>
          <Button type="button" variant="soft" onClick={() => navigate('/questions')}>
            {t('cancel')}
          </Button>
        </div>
      </form>
    </div>
  );
}
