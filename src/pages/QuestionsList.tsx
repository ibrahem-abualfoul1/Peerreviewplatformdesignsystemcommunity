import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import GlassCard from '../components/GlassCard';
import Button from '../components/Button';
import Badge from '../components/Badge';
import { Search, Plus, Edit, Trash2, Eye } from 'lucide-react';

export default function QuestionsList() {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');

  const textClass = theme === 'dark' ? 'text-[#f9fafb]' : 'text-[#111827]';
  const mutedClass = theme === 'dark' ? 'text-[#9ca3af]' : 'text-[#6b7280]';
  const inputBg = theme === 'dark' ? 'bg-[#0b1120] border-[#1e293b]' : 'bg-[#f9fafb] border-[#e5e7eb]';

  const questions = [
    { id: 1, title: 'Customer Satisfaction Survey', type: 'Multiple Choice', items: 10, status: 'active' },
    { id: 2, title: 'Product Feedback Form', type: 'Text', items: 5, status: 'active' },
    { id: 3, title: 'Service Quality Assessment', type: 'Rating', items: 8, status: 'active' },
    { id: 4, title: 'Employee Evaluation', type: 'Multiple Choice', items: 15, status: 'inactive' },
    { id: 5, title: 'Annual Performance Review', type: 'Mixed', items: 12, status: 'active' },
  ];

  const filteredQuestions = questions.filter(q => {
    const matchesSearch = q.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || q.type === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl ${textClass}`}>{t('questionsList')}</h1>
        <Button onClick={() => navigate('/questions/create')}>
          <Plus className="w-4 h-4 inline ltr:mr-2 rtl:ml-2" />
          {t('addQuestion')}
        </Button>
      </div>

      <GlassCard className="p-6">
        {/* Filters */}
        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className={`absolute ltr:left-4 rtl:right-4 top-1/2 -translate-y-1/2 w-5 h-5 ${mutedClass}`} />
            <input
              type="text"
              placeholder={t('search')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full ltr:pl-12 rtl:pr-12 ltr:pr-4 rtl:pl-4 py-3 rounded-[18px] ${inputBg} border ${textClass} focus:outline-none focus:ring-2 focus:ring-[#c9a227] transition-all`}
            />
          </div>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className={`px-4 py-3 rounded-[18px] ${inputBg} border ${textClass} focus:outline-none focus:ring-2 focus:ring-[#c9a227] transition-all`}
          >
            <option value="all">{t('questionType')} - All</option>
            <option value="Multiple Choice">Multiple Choice</option>
            <option value="Text">Text</option>
            <option value="Rating">Rating</option>
            <option value="Mixed">Mixed</option>
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={`border-b ${theme === 'dark' ? 'border-[#1e293b]' : 'border-[#e5e7eb]'}`}>
                <th className={`text-left py-3 px-4 ${mutedClass} text-sm`}>{t('title')}</th>
                <th className={`text-left py-3 px-4 ${mutedClass} text-sm`}>{t('questionType')}</th>
                <th className={`text-left py-3 px-4 ${mutedClass} text-sm`}>{t('itemsCount')}</th>
                <th className={`text-left py-3 px-4 ${mutedClass} text-sm`}>{t('status')}</th>
                <th className={`text-left py-3 px-4 ${mutedClass} text-sm`}>{t('actions')}</th>
              </tr>
            </thead>
            <tbody>
              {filteredQuestions.map((question) => (
                <tr key={question.id} className={`border-b ${theme === 'dark' ? 'border-[#1e293b]' : 'border-[#e5e7eb]'}`}>
                  <td className={`py-3 px-4 ${textClass}`}>{question.title}</td>
                  <td className={`py-3 px-4 ${mutedClass}`}>{question.type}</td>
                  <td className={`py-3 px-4 ${textClass}`}>{question.items}</td>
                  <td className="py-3 px-4">
                    <Badge variant={question.status === 'active' ? 'success' : 'error'}>
                      {question.status === 'active' ? t('active') : t('inactive')}
                    </Badge>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <button
                        className="p-2 rounded-full hover:bg-blue-500/10 text-blue-500 transition-colors"
                        title={t('view')}
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => navigate(`/questions/edit/${question.id}`)}
                        className="p-2 rounded-full hover:bg-[#c9a227]/10 text-[#c9a227] transition-colors"
                        title={t('edit')}
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        className="p-2 rounded-full hover:bg-red-500/10 text-red-500 transition-colors"
                        title={t('delete')}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
}
