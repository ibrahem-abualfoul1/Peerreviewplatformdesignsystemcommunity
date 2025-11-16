import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import GlassCard from '../components/GlassCard';
import Button from '../components/Button';
import { CheckCircle } from 'lucide-react';

interface Question {
  id: number;
  title: string;
  description: string;
  type: 'text' | 'choice' | 'multiple' | 'yesno' | 'number' | 'date';
  options?: string[];
}

export default function Survey() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { theme } = useTheme();
  const [currentStep, setCurrentStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const textClass = theme === 'dark' ? 'text-[#f9fafb]' : 'text-[#111827]';
  const mutedClass = theme === 'dark' ? 'text-[#9ca3af]' : 'text-[#6b7280]';
  const inputBg = theme === 'dark' ? 'bg-[#0b1120] border-[#1e293b]' : 'bg-[#f9fafb] border-[#e5e7eb]';

  const questions: Question[] = [
    {
      id: 1,
      title: 'How satisfied are you with our service?',
      description: 'Please rate your overall experience',
      type: 'choice',
      options: ['Very Satisfied', 'Satisfied', 'Neutral', 'Dissatisfied', 'Very Dissatisfied'],
    },
    {
      id: 2,
      title: 'What features would you like to see improved?',
      description: 'You can select multiple options',
      type: 'multiple',
      options: ['User Interface', 'Performance', 'Features', 'Documentation', 'Support'],
    },
    {
      id: 3,
      title: 'Would you recommend our service to others?',
      description: '',
      type: 'yesno',
    },
    {
      id: 4,
      title: 'Additional Comments',
      description: 'Please share any additional feedback',
      type: 'text',
    },
  ];

  const currentQuestion = questions[currentStep];
  const totalSteps = questions.length;
  const isLastStep = currentStep === totalSteps - 1;
  const isFirstStep = currentStep === 0;

  const handleNext = () => {
    if (isLastStep) {
      setSubmitted(true);
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto py-12">
        <GlassCard className="p-12 text-center">
          <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-500" />
          </div>
          <h1 className={`text-2xl mb-4 ${textClass}`}>{t('thankYou')}</h1>
          <p className={mutedClass}>Your responses have been recorded successfully.</p>
          <Button onClick={() => navigate('/my-answers')} className="mt-8">
            {t('viewDetails')}
          </Button>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Progress */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className={mutedClass}>
            {t('step')} {currentStep + 1} {t('of')} {totalSteps}
          </span>
          <span className={mutedClass}>
            {Math.round(((currentStep + 1) / totalSteps) * 100)}%
          </span>
        </div>
        <div className={`w-full h-2 rounded-full ${theme === 'dark' ? 'bg-[#1e293b]' : 'bg-[#e5e7eb]'}`}>
          <div
            className="h-full rounded-full bg-[#c9a227] transition-all duration-500"
            style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <GlassCard className="p-8">
        <h2 className={`text-2xl mb-2 ${textClass}`}>{currentQuestion.title}</h2>
        {currentQuestion.description && (
          <p className={`mb-8 ${mutedClass}`}>{currentQuestion.description}</p>
        )}

        {/* Question Type Rendering */}
        <div className="space-y-4">
          {currentQuestion.type === 'text' && (
            <textarea
              className={`w-full px-4 py-3 rounded-[18px] ${inputBg} border ${textClass} focus:outline-none focus:ring-2 focus:ring-[#c9a227] transition-all`}
              rows={6}
              placeholder="Enter your answer..."
            />
          )}

          {currentQuestion.type === 'choice' && currentQuestion.options && (
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <label
                  key={index}
                  className={`flex items-center gap-3 p-4 rounded-[18px] ${inputBg} border cursor-pointer hover:border-[#c9a227] transition-all`}
                >
                  <input
                    type="radio"
                    name="choice"
                    className="w-5 h-5 accent-[#c9a227]"
                  />
                  <span className={textClass}>{option}</span>
                </label>
              ))}
            </div>
          )}

          {currentQuestion.type === 'multiple' && currentQuestion.options && (
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <label
                  key={index}
                  className={`flex items-center gap-3 p-4 rounded-[18px] ${inputBg} border cursor-pointer hover:border-[#c9a227] transition-all`}
                >
                  <input
                    type="checkbox"
                    className="w-5 h-5 rounded accent-[#c9a227]"
                  />
                  <span className={textClass}>{option}</span>
                </label>
              ))}
            </div>
          )}

          {currentQuestion.type === 'yesno' && (
            <div className="flex gap-4">
              <label className={`flex-1 p-6 rounded-[18px] ${inputBg} border cursor-pointer hover:border-[#c9a227] transition-all text-center`}>
                <input type="radio" name="yesno" className="sr-only" />
                <span className={`text-xl ${textClass}`}>Yes</span>
              </label>
              <label className={`flex-1 p-6 rounded-[18px] ${inputBg} border cursor-pointer hover:border-[#c9a227] transition-all text-center`}>
                <input type="radio" name="yesno" className="sr-only" />
                <span className={`text-xl ${textClass}`}>No</span>
              </label>
            </div>
          )}

          {currentQuestion.type === 'number' && (
            <input
              type="number"
              className={`w-full px-4 py-3 rounded-[18px] ${inputBg} border ${textClass} focus:outline-none focus:ring-2 focus:ring-[#c9a227] transition-all`}
              placeholder="Enter a number..."
            />
          )}

          {currentQuestion.type === 'date' && (
            <input
              type="date"
              className={`w-full px-4 py-3 rounded-[18px] ${inputBg} border ${textClass} focus:outline-none focus:ring-2 focus:ring-[#c9a227] transition-all`}
            />
          )}
        </div>
      </GlassCard>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="soft"
          onClick={handlePrevious}
          disabled={isFirstStep}
          className="disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {t('previous')}
        </Button>
        <Button onClick={handleNext}>
          {isLastStep ? t('submit') : t('next')}
        </Button>
      </div>
    </div>
  );
}
