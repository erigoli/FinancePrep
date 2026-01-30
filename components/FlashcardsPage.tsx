import { ArrowLeft, RotateCw, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { FlashcardPractice } from './FlashcardPractice';

interface FlashcardsPageProps {
  topicId: string;
  onBack: () => void;
}

const flashcardData = {
  accounting: [
    { id: 1, title: 'Basic Accounting Terms', cards: 20, mastered: 18, lastReviewed: 'Today' },
    { id: 2, title: 'Debits vs Credits', cards: 15, mastered: 12, lastReviewed: 'Yesterday' },
    { id: 3, title: 'Financial Statement Items', cards: 25, mastered: 10, lastReviewed: '3 days ago' },
    { id: 4, title: 'Journal Entry Scenarios', cards: 18, mastered: 5, lastReviewed: '1 week ago' },
    { id: 5, title: 'Adjusting Entries', cards: 16, mastered: 0, lastReviewed: 'Never' },
  ],
  valuation: [
    { id: 1, title: 'Valuation Terminology', cards: 22, mastered: 15, lastReviewed: 'Today' },
    { id: 2, title: 'DCF Components', cards: 18, mastered: 10, lastReviewed: '2 days ago' },
    { id: 3, title: 'WACC Calculations', cards: 15, mastered: 8, lastReviewed: '4 days ago' },
    { id: 4, title: 'Multiples and Ratios', cards: 20, mastered: 4, lastReviewed: '1 week ago' },
    { id: 5, title: 'Terminal Value Methods', cards: 12, mastered: 0, lastReviewed: 'Never' },
  ],
  'financial-statements': [
    { id: 1, title: 'Income Statement Items', cards: 25, mastered: 0, lastReviewed: 'Never' },
    { id: 2, title: 'Balance Sheet Components', cards: 28, mastered: 0, lastReviewed: 'Never' },
    { id: 3, title: 'Cash Flow Categories', cards: 20, mastered: 0, lastReviewed: 'Never' },
    { id: 4, title: 'Financial Ratios Formulas', cards: 30, mastered: 0, lastReviewed: 'Never' },
    { id: 5, title: 'Ratio Interpretation', cards: 22, mastered: 0, lastReviewed: 'Never' },
  ],
};

export function FlashcardsPage({ topicId, onBack }: FlashcardsPageProps) {
  const [selectedSet, setSelectedSet] = useState<number | null>(null);
  const flashcardSets = flashcardData[topicId as keyof typeof flashcardData] || [];

  if (selectedSet !== null) {
    const set = flashcardSets.find(s => s.id === selectedSet);
    if (set) {
      return (
        <FlashcardPractice
          topicId={topicId}
          flashcardSet={set}
          onBack={() => setSelectedSet(null)}
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
        <h3 className="text-2xl font-semibold text-gray-900 mb-2">Flashcard Sets</h3>
        <p className="text-gray-600">Practice with spaced repetition to master key concepts</p>
      </div>

      {/* Flashcard Sets */}
      <div className="space-y-3">
        {flashcardSets.map((set) => (
          <div
            key={set.id}
            onClick={() => setSelectedSet(set.id)}
            className="bg-white border border-gray-200 rounded-lg p-5 hover:border-purple-300 transition-colors cursor-pointer group"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <h4 className="text-base font-medium text-gray-900 mb-2">{set.title}</h4>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <CheckCircle size={14} />
                    {set.mastered}/{set.cards} mastered
                  </span>
                  <span>Last reviewed: {set.lastReviewed}</span>
                </div>
              </div>
              <button className="ml-4 flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm flex-shrink-0">
                <RotateCw size={16} />
                Practice
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
