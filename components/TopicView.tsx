import { BookOpen, CreditCard, FileCheck, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { LearnPage } from './LearnPage';
import { FlashcardsPage } from './FlashcardsPage';
import { TestsPage } from './TestsPage';

interface TopicViewProps {
  topicId: string;
}

const topicData = {
  accounting: {
    title: 'Accounting Fundamentals',
  },
  valuation: {
    title: 'Valuation Methods',
  },
  'financial-statements': {
    title: 'Financial Statement Analysis',
  },
};

export function TopicView({ topicId }: TopicViewProps) {
  const topic = topicData[topicId as keyof typeof topicData];
  const [selectedMode, setSelectedMode] = useState<string | null>(null);

  const modes = [
    {
      id: 'learn',
      icon: BookOpen,
      title: 'Learn',
      description: 'Interactive lessons with examples and explanations',
      items: '20 lessons',
      color: 'blue',
    },
    {
      id: 'flashcards',
      icon: CreditCard,
      title: 'Flashcards',
      description: 'Quick review with spaced repetition',
      items: '50 cards',
      color: 'purple',
    },
    {
      id: 'tests',
      icon: FileCheck,
      title: 'Tests',
      description: 'Assess your knowledge with practice tests',
      items: '4 tests',
      color: 'green',
    },
  ];

  const renderModeContent = () => {
    if (!selectedMode) return null;

    if (selectedMode === 'learn') {
      return <LearnPage topicId={topicId} onBack={() => setSelectedMode(null)} />;
    }

    if (selectedMode === 'flashcards') {
      return <FlashcardsPage topicId={topicId} onBack={() => setSelectedMode(null)} />;
    }

    if (selectedMode === 'tests') {
      return <TestsPage topicId={topicId} onBack={() => setSelectedMode(null)} />;
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      {/* Topic Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900">{topic.title}</h2>
      </div>

      {/* Mode Selection or Mode Content */}
      {!selectedMode ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {modes.map((mode) => {
            const Icon = mode.icon;
            const colorClasses = {
              blue: {
                border: 'hover:border-blue-300',
                bg: 'bg-blue-50',
                bgHover: 'group-hover:bg-blue-100',
                text: 'text-blue-600',
                textHover: 'group-hover:text-blue-600',
              },
              purple: {
                border: 'hover:border-purple-300',
                bg: 'bg-purple-50',
                bgHover: 'group-hover:bg-purple-100',
                text: 'text-purple-600',
                textHover: 'group-hover:text-purple-600',
              },
              green: {
                border: 'hover:border-green-300',
                bg: 'bg-green-50',
                bgHover: 'group-hover:bg-green-100',
                text: 'text-green-600',
                textHover: 'group-hover:text-green-600',
              },
            };
            const colors = colorClasses[mode.color as keyof typeof colorClasses];
            return (
              <div
                key={mode.id}
                onClick={() => setSelectedMode(mode.id)}
                className={`bg-white border-2 border-gray-200 rounded-lg p-6 ${colors.border} transition-colors cursor-pointer group`}
              >
                <div className={`w-12 h-12 ${colors.bg} rounded-lg flex items-center justify-center mb-4 ${colors.bgHover} transition-colors`}>
                  <Icon size={24} className={colors.text} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{mode.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{mode.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{mode.items}</span>
                  <ArrowRight size={18} className={`text-gray-400 ${colors.textHover} transition-colors`} />
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        renderModeContent()
      )}
    </div>
  );
}
