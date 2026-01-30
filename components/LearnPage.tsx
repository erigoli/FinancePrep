import { ArrowLeft, Clock, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { LessonContent } from './LessonContent';

interface LearnPageProps {
  topicId: string;
  onBack: () => void;
}

const lessonData = {
  accounting: [
    { id: 1, title: 'Introduction to Double-Entry Bookkeeping', duration: '15 min', completed: true },
    { id: 2, title: 'Understanding Debits and Credits', duration: '20 min', completed: true },
    { id: 3, title: 'The Accounting Equation', duration: '18 min', completed: true },
    { id: 4, title: 'Chart of Accounts', duration: '12 min', completed: false },
    { id: 5, title: 'Recording Transactions', duration: '25 min', completed: false },
    { id: 6, title: 'Journal Entries and T-Accounts', duration: '22 min', completed: false },
    { id: 7, title: 'Trial Balance Preparation', duration: '18 min', completed: false },
    { id: 8, title: 'Adjusting Entries', duration: '20 min', completed: false },
  ],
  valuation: [
    { id: 1, title: 'Introduction to Valuation', duration: '15 min', completed: true },
    { id: 2, title: 'Time Value of Money', duration: '20 min', completed: true },
    { id: 3, title: 'DCF Analysis Fundamentals', duration: '25 min', completed: true },
    { id: 4, title: 'Building a DCF Model', duration: '30 min', completed: false },
    { id: 5, title: 'Terminal Value Calculations', duration: '22 min', completed: false },
    { id: 6, title: 'WACC and Discount Rates', duration: '25 min', completed: false },
    { id: 7, title: 'Comparable Company Analysis', duration: '28 min', completed: false },
    { id: 8, title: 'Precedent Transaction Analysis', duration: '26 min', completed: false },
  ],
  'financial-statements': [
    { id: 1, title: 'Overview of Financial Statements', duration: '15 min', completed: false },
    { id: 2, title: 'Income Statement Deep Dive', duration: '25 min', completed: false },
    { id: 3, title: 'Balance Sheet Analysis', duration: '25 min', completed: false },
    { id: 4, title: 'Cash Flow Statement', duration: '28 min', completed: false },
    { id: 5, title: 'Financial Ratios Overview', duration: '20 min', completed: false },
    { id: 6, title: 'Profitability Ratios', duration: '22 min', completed: false },
    { id: 7, title: 'Liquidity and Solvency Ratios', duration: '22 min', completed: false },
    { id: 8, title: 'Efficiency Ratios', duration: '20 min', completed: false },
  ],
};

export function LearnPage({ topicId, onBack }: LearnPageProps) {
  const [selectedLesson, setSelectedLesson] = useState<number | null>(null);
  const lessons = lessonData[topicId as keyof typeof lessonData] || [];

  if (selectedLesson !== null) {
    const lesson = lessons.find(l => l.id === selectedLesson);
    if (lesson) {
      return (
        <LessonContent
          topicId={topicId}
          lesson={lesson}
          onBack={() => setSelectedLesson(null)}
        />
      );
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft size={20} />
          <span className="text-sm">Back to modes</span>
        </button>
      </div>

      <div className="mb-6">
        <h3 className="text-2xl font-semibold text-gray-900 mb-2">Lessons</h3>
        <p className="text-gray-600">Complete lessons to master the fundamentals</p>
      </div>

      {/* Lessons List */}
      <div className="space-y-3">
        {lessons.map((lesson) => (
          <div
            key={lesson.id}
            onClick={() => setSelectedLesson(lesson.id)}
            className="bg-white border border-gray-200 rounded-lg p-5 hover:border-blue-300 transition-colors cursor-pointer group"
          >
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 flex-shrink-0 rounded-full flex items-center justify-center ${
                lesson.completed ? 'bg-green-50' : 'bg-gray-100'
              }`}>
                {lesson.completed ? (
                  <CheckCircle2 size={20} className="text-green-600" />
                ) : (
                  <span className="text-sm text-gray-600">{lesson.id}</span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-base font-medium text-gray-900 mb-1">{lesson.title}</h4>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock size={14} />
                  <span>{lesson.duration}</span>
                </div>
              </div>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm flex-shrink-0">
                {lesson.completed ? 'Review' : 'Start'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
