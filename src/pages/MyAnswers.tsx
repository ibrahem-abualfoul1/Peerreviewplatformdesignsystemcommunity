import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import GlassCard from '../components/GlassCard';
import Button from '../components/Button';
import Badge from '../components/Badge';
import { Eye } from 'lucide-react';

export default function MyAnswers() {
  const { t } = useLanguage();
  const { theme } = useTheme();

  const textClass = theme === 'dark' ? 'text-[#f9fafb]' : 'text-[#111827]';
  const mutedClass = theme === 'dark' ? 'text-[#9ca3af]' : 'text-[#6b7280]';

  const answers = [
    { id: 1, formTitle: 'Customer Satisfaction Survey', submittedDate: '2025-11-15', status: 'Completed' },
    { id: 2, formTitle: 'Product Feedback Form', submittedDate: '2025-11-14', status: 'Pending Review' },
    { id: 3, formTitle: 'Service Quality Assessment', submittedDate: '2025-11-13', status: 'Completed' },
    { id: 4, formTitle: 'Employee Evaluation', submittedDate: '2025-11-12', status: 'Completed' },
    { id: 5, formTitle: 'Annual Performance Review', submittedDate: '2025-11-10', status: 'Scored' },
  ];

  return (
    <div className="space-y-6">
      <h1 className={`text-2xl ${textClass}`}>{t('myAnswersList')}</h1>

      <GlassCard className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={`border-b ${theme === 'dark' ? 'border-[#1e293b]' : 'border-[#e5e7eb]'}`}>
                <th className={`text-left py-3 px-4 ${mutedClass} text-sm`}>{t('title')}</th>
                <th className={`text-left py-3 px-4 ${mutedClass} text-sm`}>{t('submittedDate')}</th>
                <th className={`text-left py-3 px-4 ${mutedClass} text-sm`}>{t('status')}</th>
                <th className={`text-left py-3 px-4 ${mutedClass} text-sm`}>{t('actions')}</th>
              </tr>
            </thead>
            <tbody>
              {answers.map((answer) => (
                <tr key={answer.id} className={`border-b ${theme === 'dark' ? 'border-[#1e293b]' : 'border-[#e5e7eb]'}`}>
                  <td className={`py-3 px-4 ${textClass}`}>{answer.formTitle}</td>
                  <td className={`py-3 px-4 ${mutedClass}`}>{answer.submittedDate}</td>
                  <td className="py-3 px-4">
                    <Badge variant={
                      answer.status === 'Completed' ? 'success' :
                      answer.status === 'Pending Review' ? 'warning' : 'info'
                    }>
                      {answer.status}
                    </Badge>
                  </td>
                  <td className="py-3 px-4">
                    <Button variant="soft" className="text-sm py-2 px-4">
                      <Eye className="w-4 h-4 inline ltr:mr-2 rtl:ml-2" />
                      {t('viewDetails')}
                    </Button>
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
