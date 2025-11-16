import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import StatCard from '../components/StatCard';
import GlassCard from '../components/GlassCard';
import { Users, HelpCircle, FileCheck, ClipboardList } from 'lucide-react';

export default function Dashboard() {
  const { t } = useLanguage();
  const { theme } = useTheme();

  const textClass = theme === 'dark' ? 'text-[#E8D5B7]' : 'text-[#2D1B0E]';
  const mutedClass = theme === 'dark' ? 'text-[#B8A593]' : 'text-[#6B5D50]';
  const borderClass = theme === 'dark' ? 'border-[#3D2A1A]' : 'border-[#F5E6D3]';
  const progressBg = theme === 'dark' ? 'bg-[#3D2A1A]' : 'bg-[#F5E6D3]';
  const progressBar = theme === 'dark' ? 'bg-gradient-to-r from-[#A52A4A] to-[#D4A574]' : 'bg-gradient-to-r from-[#8D1B3D] to-[#C19A6B]';

  const recentAnswers = [
    { id: 1, user: 'John Doe', question: 'Customer Satisfaction Survey', date: '2025-11-15', status: 'Completed' },
    { id: 2, user: 'Jane Smith', question: 'Product Feedback Form', date: '2025-11-14', status: 'Pending' },
    { id: 3, user: 'Ahmed Ali', question: 'Service Quality Assessment', date: '2025-11-14', status: 'Completed' },
    { id: 4, user: 'Sarah Johnson', question: 'Employee Evaluation', date: '2025-11-13', status: 'Completed' },
  ];

  const scoringActivity = [
    { id: 1, question: 'Annual Performance Review', scored: 12, total: 15, date: '2025-11-15' },
    { id: 2, question: 'Project Evaluation Form', scored: 8, total: 10, date: '2025-11-14' },
    { id: 3, question: 'Quarterly Assessment', scored: 20, total: 25, date: '2025-11-13' },
  ];

  return (
    <div className="space-y-6">
      {/* Heritage Banner with Camel Image */}
      <GlassCard className="p-6 overflow-hidden relative">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="w-full md:w-48 h-32 rounded-[18px] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1598696737739-3a1c56f2475e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxxYXRhciUyMGRlc2VydCUyMGNhbWVsc3xlbnwxfHx8fDE3NjMzMTg4MDJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Qatar Desert"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 text-center md:text-start">
            <h1 className={`text-2xl mb-2 ${textClass}`}>
              {t('dashboard')}
            </h1>
            <p className={mutedClass}>
              منصة المراجعة التراثية • Qatar Heritage Platform
            </p>
          </div>
        </div>
      </GlassCard>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title={t('totalUsers')} value="2,847" icon={Users} />
        <StatCard title={t('totalQuestions')} value="156" icon={HelpCircle} />
        <StatCard title={t('totalAnswers')} value="8,432" icon={FileCheck} />
        <StatCard title={t('assignedToMe')} value="23" icon={ClipboardList} />
      </div>

      {/* Recent Answers */}
      <GlassCard className="p-6">
        <h2 className={`text-xl mb-6 ${textClass}`}>{t('recentAnswers')}</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={`border-b ${borderClass}`}>
                <th className={`text-left py-3 px-4 ${mutedClass} text-sm`}>{t('fullName')}</th>
                <th className={`text-left py-3 px-4 ${mutedClass} text-sm`}>{t('title')}</th>
                <th className={`text-left py-3 px-4 ${mutedClass} text-sm`}>{t('submittedDate')}</th>
                <th className={`text-left py-3 px-4 ${mutedClass} text-sm`}>{t('status')}</th>
              </tr>
            </thead>
            <tbody>
              {recentAnswers.map((answer) => (
                <tr key={answer.id} className={`border-b ${borderClass}`}>
                  <td className={`py-3 px-4 ${textClass}`}>{answer.user}</td>
                  <td className={`py-3 px-4 ${textClass}`}>{answer.question}</td>
                  <td className={`py-3 px-4 ${mutedClass}`}>{answer.date}</td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs ${
                      answer.status === 'Completed' 
                        ? 'bg-green-500/10 text-green-500' 
                        : 'bg-yellow-500/10 text-yellow-500'
                    }`}>
                      {answer.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>

      {/* Scoring Activity */}
      <GlassCard className="p-6">
        <h2 className={`text-xl mb-6 ${textClass}`}>{t('myScoringActivity')}</h2>
        <div className="space-y-4">
          {scoringActivity.map((activity) => (
            <div key={activity.id} className={`p-4 rounded-[18px] ${theme === 'dark' ? 'bg-[#3D2A1A]' : 'bg-[#F5E6D3]'}`}>
              <div className="flex items-center justify-between mb-3">
                <h3 className={textClass}>{activity.question}</h3>
                <span className={mutedClass}>{activity.date}</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <div className={`w-full h-2 rounded-full ${progressBg}`}>
                    <div 
                      className={`h-full rounded-full ${progressBar}`}
                      style={{ width: `${(activity.scored / activity.total) * 100}%` }}
                    />
                  </div>
                </div>
                <span className={textClass}>
                  {activity.scored}/{activity.total}
                </span>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}