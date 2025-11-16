import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import GlassCard from '../components/GlassCard';
import Button from '../components/Button';
import { Plus, Trash2 } from 'lucide-react';

export default function Assignments() {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const [selectedUserId, setSelectedUserId] = useState<number | null>(1);

  const textClass = theme === 'dark' ? 'text-[#f9fafb]' : 'text-[#111827]';
  const mutedClass = theme === 'dark' ? 'text-[#9ca3af]' : 'text-[#6b7280]';

  const users = [
    { id: 1, name: 'John Doe', role: 'Evaluator', assignedForms: 5 },
    { id: 2, name: 'Jane Smith', role: 'Administrator', assignedForms: 8 },
    { id: 3, name: 'Ahmed Ali', role: 'User', assignedForms: 3 },
    { id: 4, name: 'Sarah Johnson', role: 'Evaluator', assignedForms: 6 },
  ];

  const assignments = [
    { id: 1, userId: 1, formTitle: 'Customer Satisfaction Survey', assignedDate: '2025-11-10' },
    { id: 2, userId: 1, formTitle: 'Product Feedback Form', assignedDate: '2025-11-12' },
    { id: 3, userId: 1, formTitle: 'Service Quality Assessment', assignedDate: '2025-11-14' },
    { id: 4, userId: 1, formTitle: 'Employee Evaluation', assignedDate: '2025-11-15' },
    { id: 5, userId: 1, formTitle: 'Annual Performance Review', assignedDate: '2025-11-16' },
  ];

  const selectedUser = users.find(u => u.id === selectedUserId);
  const userAssignments = assignments.filter(a => a.userId === selectedUserId);

  return (
    <div className="space-y-6">
      <h1 className={`text-2xl ${textClass}`}>{t('assignmentsList')}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Users List */}
        <GlassCard className="p-6">
          <h2 className={`text-xl mb-6 ${textClass}`}>{t('users')}</h2>
          <div className="space-y-2">
            {users.map((user) => (
              <button
                key={user.id}
                onClick={() => setSelectedUserId(user.id)}
                className={`w-full p-4 rounded-[18px] text-left transition-all ${
                  selectedUserId === user.id
                    ? 'bg-[#c9a227] text-white shadow-lg shadow-[#c9a227]/20'
                    : theme === 'dark'
                      ? 'bg-[#0b1120] text-[#f9fafb] hover:bg-[#0f172a]'
                      : 'bg-[#f9fafb] text-[#111827] hover:bg-[#e5e7eb]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className={selectedUserId === user.id ? 'text-white' : textClass}>
                      {user.name}
                    </h3>
                    <p className={`text-sm ${selectedUserId === user.id ? 'text-white/80' : mutedClass}`}>
                      {user.role}
                    </p>
                  </div>
                  <div className={`text-sm ${selectedUserId === user.id ? 'text-white' : mutedClass}`}>
                    {user.assignedForms} {t('assignedFormsCount')}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </GlassCard>

        {/* Assigned Forms */}
        <GlassCard className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-xl ${textClass}`}>
              {t('assignedForms')} - {selectedUser?.name}
            </h2>
            <Button variant="soft">
              <Plus className="w-4 h-4 inline ltr:mr-2 rtl:ml-2" />
              {t('assignNew')}
            </Button>
          </div>

          <div className="space-y-3">
            {userAssignments.map((assignment) => (
              <div
                key={assignment.id}
                className={`p-4 rounded-[18px] flex items-center justify-between ${
                  theme === 'dark' ? 'bg-[#0b1120]' : 'bg-[#f9fafb]'
                }`}
              >
                <div>
                  <h3 className={textClass}>{assignment.formTitle}</h3>
                  <p className={`text-sm ${mutedClass}`}>{assignment.assignedDate}</p>
                </div>
                <button
                  className="p-2 rounded-full hover:bg-red-500/10 text-red-500 transition-colors"
                  title={t('remove')}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
