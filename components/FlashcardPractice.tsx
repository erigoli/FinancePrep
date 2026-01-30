import { ArrowLeft, RotateCw, Check, X } from 'lucide-react';
import { useState } from 'react';

interface FlashcardPracticeProps {
  topicId: string;
  flashcardSet: {
    id: number;
    title: string;
    cards: number;
    mastered: number;
    lastReviewed: string;
  };
  onBack: () => void;
}

// Sample flashcard data
const sampleCards = [
  { id: 1, front: 'What is the accounting equation?', back: 'Assets = Liabilities + Equity' },
  { id: 2, front: 'Define liquidity', back: 'The ability to convert assets into cash quickly without significant loss in value' },
  { id: 3, front: 'What does GAAP stand for?', back: 'Generally Accepted Accounting Principles' },
  { id: 4, front: 'What is depreciation?', back: 'The systematic allocation of the cost of a tangible asset over its useful life' },
  { id: 5, front: 'Define working capital', back: 'Current Assets minus Current Liabilities' },
];

export function FlashcardPractice({ topicId, flashcardSet, onBack }: FlashcardPracticeProps) {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredCards, setMasteredCards] = useState<Set<number>>(new Set());
  const [reviewCards, setReviewCards] = useState<Set<number>>(new Set());

  const currentCard = sampleCards[currentCardIndex];
  const isLastCard = currentCardIndex === sampleCards.length - 1;

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleMastered = () => {
    setMasteredCards(new Set(masteredCards).add(currentCard.id));
    goToNextCard();
  };

  const handleNeedReview = () => {
    setReviewCards(new Set(reviewCards).add(currentCard.id));
    goToNextCard();
  };

  const goToNextCard = () => {
    if (!isLastCard) {
      setCurrentCardIndex(currentCardIndex + 1);
      setIsFlipped(false);
    }
  };

  const handlePrevious = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      setIsFlipped(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft size={20} />
          <span className="text-sm">Back to sets</span>
        </button>
        <div className="text-sm text-gray-600">
          Card {currentCardIndex + 1} of {sampleCards.length}
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">{flashcardSet.title}</h2>
      </div>

      {/* Flashcard */}
      <div className="mb-8">
        <div
          onClick={handleFlip}
          className="bg-white border-2 border-gray-200 rounded-lg p-12 min-h-[400px] flex items-center justify-center cursor-pointer hover:border-purple-300 transition-colors"
        >
          <div className="text-center">
            <p className="text-xs uppercase tracking-wider text-gray-500 mb-4">
              {isFlipped ? 'Answer' : 'Question'}
            </p>
            <p className="text-xl text-gray-900 leading-relaxed">
              {isFlipped ? currentCard.back : currentCard.front}
            </p>
            {!isFlipped && (
              <p className="text-sm text-gray-500 mt-6">Click to reveal answer</p>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      {isFlipped ? (
        <div className="flex items-center justify-center gap-4 mb-8">
          <button
            onClick={handleNeedReview}
            className="flex items-center gap-2 px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
          >
            <X size={20} />
            Need Review
          </button>
          <button
            onClick={handleMastered}
            className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Check size={20} />
            Mastered
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-center mb-8">
          <button
            onClick={handleFlip}
            className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <RotateCw size={20} />
            Flip Card
          </button>
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentCardIndex === 0}
          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <span className="flex items-center gap-1">
            <Check size={16} className="text-green-600" />
            {masteredCards.size} mastered
          </span>
          <span className="flex items-center gap-1">
            <X size={16} className="text-orange-600" />
            {reviewCards.size} to review
          </span>
        </div>

        {!isLastCard ? (
          <button
            onClick={goToNextCard}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Next
          </button>
        ) : (
          <button
            onClick={onBack}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Finish
          </button>
        )}
      </div>
    </div>
  );
}
