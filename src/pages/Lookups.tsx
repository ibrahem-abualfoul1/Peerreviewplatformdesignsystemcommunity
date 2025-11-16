import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import GlassCard from '../components/GlassCard';
import Button from '../components/Button';
import { Plus, Edit, Trash2 } from 'lucide-react';

type LookupType = 'roles' | 'questionTypes' | 'categories' | 'subLookups';

export default function Lookups() {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState<LookupType>('roles');

  const textClass = theme === 'dark' ? 'text-[#f9fafb]' : 'text-[#111827]';
  const mutedClass = theme === 'dark' ? 'text-[#9ca3af]' : 'text-[#6b7280]';

  const lookupData = {
    roles: [
      { id: 1, name: 'Administrator' },
      { id: 2, name: 'Evaluator' },
      { id: 3, name: 'User' },
    ],
    questionTypes: [
      { id: 1, name: 'Text' },
      { id: 2, name: 'Single Choice' },
      { id: 3, name: 'Multiple Choice' },
      { id: 4, name: 'Number' },
      { id: 5, name: 'Date' },
      { id: 6, name: 'Yes/No' },
    ],
    categories: [
      { id: 1, name: 'Customer Feedback' },
      { id: 2, name: 'Employee Evaluation' },
      { id: 3, name: 'Product Review' },
      { id: 4, name: 'Service Quality' },
    ],
    subLookups: [
      { id: 1, name: 'Priority Levels' },
      { id: 2, name: 'Departments' },
      { id: 3, name: 'Status Types' },
    ],
  };

  const tabs: { key: LookupType; label: string }[] = [
    { key: 'roles', label: t('roles') },
    { key: 'questionTypes', label: t('questionTypes') },
    { key: 'categories', label: t('categories') },
    { key: 'subLookups', label: t('subLookups') },
  ];

  const currentData = lookupData[activeTab];

  return (
    <div className="space-y-6">
      <h1 className={`text-2xl ${textClass}`}>{t('lookups')}</h1>

      <GlassCard className="overflow-hidden">
        {/* Tabs */}
        <div className={`flex border-b ${theme === 'dark' ? 'border-[#1e293b]' : 'border-[#e5e7eb]'}`}>
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-6 py-4 transition-all ${
                activeTab === tab.key
                  ? `${textClass} border-b-2 border-[#c9a227]`
                  : `${mutedClass} hover:${textClass}`
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-xl ${textClass}`}>{tabs.find(t => t.key === activeTab)?.label}</h2>
            <Button variant="soft">
              <Plus className="w-4 h-4 inline ltr:mr-2 rtl:ml-2" />
              {t('addNew')}
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className={`border-b ${theme === 'dark' ? 'border-[#1e293b]' : 'border-[#e5e7eb]'}`}>
                  <th className={`text-left py-3 px-4 ${mutedClass} text-sm`}>ID</th>
                  <th className={`text-left py-3 px-4 ${mutedClass} text-sm`}>{t('name')}</th>
                  <th className={`text-left py-3 px-4 ${mutedClass} text-sm`}>{t('actions')}</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((item) => (
                  <tr key={item.id} className={`border-b ${theme === 'dark' ? 'border-[#1e293b]' : 'border-[#e5e7eb]'}`}>
                    <td className={`py-3 px-4 ${textClass}`}>{item.id}</td>
                    <td className={`py-3 px-4 ${textClass}`}>{item.name}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <button
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
        </div>
      </GlassCard>
    </div>
  );
}
