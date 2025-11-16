import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import GlassCard from '../components/GlassCard';
import Button from '../components/Button';

export default function AnswerScoring() {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const [selectedUserId, setSelectedUserId] = useState<number | null>(1);
  const [score, setScore] = useState('');
  const [notes, setNotes] = useState('');

  const textClass = theme === 'dark' ? 'text-[#f9fafb]' : 'text-[#111827]';
  const mutedClass = theme === 'dark' ? 'text-[#9ca3af]' : 'text-[#6b7280]';
  const inputBg = theme === 'dark' ? 'bg-[#0b1120] border-[#1e293b]' : 'bg-[#f9fafb] border-[#e5e7eb]';

  const users = [
    { id: 1, name: 'John Doe', totalAnswers: 15, scored: 10, unscored: 5 },
    { id: 2, name: 'Jane Smith', totalAnswers: 20, scored: 15, unscored: 5 },
    { id: 3, name: 'Ahmed Ali', totalAnswers: 12, scored: 8, unscored: 4 },
    { id: 4, name: 'Sarah Johnson', totalAnswers: 18, scored: 12, unscored: 6 },
  ];

  const currentAnswer = {
    question: 'How satisfied are you with our service?',
    answer: 'Very satisfied. The service exceeded my expectations and the team was very professional and responsive.',
    submittedDate: '2025-11-15',
  };

  const handleSaveAndNext = () => {
    // Save score and move to next
    setScore('');
    setNotes('');
  };

  return (
    <div className="space-y-6">
      <h1 className={`text-2xl ${textClass}`}>{t('answerScoring')}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Users List */}
        <GlassCard className="p-6">
          <h2 className={`text-xl mb-6 ${textClass}`}>{t('needsScoring')}</h2>
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
                <h3 className={selectedUserId === user.id ? 'text-white mb-2' : `${textClass} mb-2`}>
                  {user.name}
                </h3>
                <div className={`text-sm space-y-1 ${selectedUserId === user.id ? 'text-white/80' : mutedClass}`}>
                  <p>{t('totalAnswers')}: {user.totalAnswers}</p>
                  <p>{t('scoredCount')}: {user.scored}</p>
                  <p>{t('unscoredCount')}: {user.unscored}</p>
                </div>
              </button>
            ))}
          </div>
        </GlassCard>

        {/* Scoring Panel */}
        <div className="lg:col-span-2 space-y-6">
          {/* Answer Card */}
          <GlassCard className="p-6">
            <div className="mb-6">
              <h2 className={`text-xl mb-2 ${textClass}`}>{currentAnswer.question}</h2>
              <p className={`text-sm ${mutedClass}`}>{currentAnswer.submittedDate}</p>
            </div>

            <div className={`p-6 rounded-[18px] ${theme === 'dark' ? 'bg-[#0b1120]' : 'bg-[#f9fafb]'}`}>
              <h3 className={`text-sm mb-3 ${mutedClass}`}>{t('userAnswer')}</h3>
              <p className={textClass}>{currentAnswer.answer}</p>
            </div>
          </GlassCard>

          {/* Scoring Form */}
          <GlassCard className="p-6">
            <div className="space-y-6">
              <div>
                <label className={`block text-sm mb-2 ${textClass}`}>
                  {t('score')} (0-100)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={score}
                  onChange={(e) => setScore(e.target.value)}
                  className={`w-full px-4 py-3 rounded-[18px] ${inputBg} border ${textClass} focus:outline-none focus:ring-2 focus:ring-[#c9a227] transition-all`}
                  placeholder="Enter score..."
                />
              </div>

              <div>
                <label className={`block text-sm mb-2 ${textClass}`}>
                  {t('notes')}
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className={`w-full px-4 py-3 rounded-[18px] ${inputBg} border ${textClass} focus:outline-none focus:ring-2 focus:ring-[#c9a227] transition-all`}
                  rows={4}
                  placeholder="Enter notes or feedback..."
                />
              </div>

              <div className="flex items-center gap-4">
                <Button onClick={handleSaveAndNext}>
                  {t('saveAndNext')}
                </Button>
                <Button variant="soft">
                  {t('skip')}
                </Button>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
