import { ArrowLeft, Clock, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

interface TestTakingProps {
  topicId: string;
  test: {
    id: number;
    title: string;
    questions: number;
    bestScore: number | null;
    attempts: number;
    status: string;
  };
  onBack: () => void;
}

// Sample test questions
const sampleQuestions = [
  {
    id: 1,
    question: 'What is the primary purpose of financial accounting?',
    options: [
      'To provide information for internal management decisions',
      'To provide information to external stakeholders about financial position',
      'To calculate taxes owed to the government',
      'To track inventory levels',
    ],
    correctAnswer: 1,
  },
  {
    id: 2,
    question: 'Which of the following is a current asset?',
    options: [
      'Land',
      'Equipment',
      'Accounts Receivable',
      'Long-term Investments',
    ],
    correctAnswer: 2,
  },
  {
    id: 3,
    question: 'The matching principle states that:',
    options: [
      'Assets must equal liabilities plus equity',
      'Revenue should be recognized when earned',
      'Expenses should be recognized in the same period as related revenues',
      'All transactions must be recorded in chronological order',
    ],
    correctAnswer: 2,
  },
  {
    id: 4,
    question: 'What does a debit to an asset account represent?',
    options: [
      'A decrease in the asset',
      'An increase in the asset',
      'No change to the asset',
      'A transfer to another account',
    ],
    correctAnswer: 1,
  },
  {
    id: 5,
    question: 'Which financial statement shows a company\'s financial position at a specific point in time?',
    options: [
      'Income Statement',
      'Cash Flow Statement',
      'Balance Sheet',
      'Statement of Retained Earnings',
    ],
    correctAnswer: 2,
  },
];

export function TestTaking({ topicId, test, onBack }: TestTakingProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(test.questions * 90); // 90 seconds per question

  const handleAnswerSelect = (questionId: number, answerIndex: number) => {
    setAnswers({ ...answers, [questionId]: answerIndex });
  };

  const handleNext = () => {
    if (currentQuestion < sampleQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  const calculateScore = () => {
    let correct = 0;
    sampleQuestions.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) {
        correct++;
      }
    });
    return Math.round((correct / sampleQuestions.length) * 100);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (showResults) {
    const score = calculateScore();
    return (
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="text-sm">Back to tests</span>
          </button>
        </div>

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-green-50 rounded-full mb-4">
            <CheckCircle2 size={48} className="text-green-600" />
          </div>
          <h2 className="text-3xl font-semibold text-gray-900 mb-2">Test Complete!</h2>
          <p className="text-gray-600">You scored {score}% on this test</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-8 mb-6">
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-semibold text-gray-900 mb-1">{score}%</div>
              <div className="text-sm text-gray-600">Your Score</div>
            </div>
            <div>
              <div className="text-3xl font-semibold text-gray-900 mb-1">
                {Object.keys(answers).length}/{sampleQuestions.length}
              </div>
              <div className="text-sm text-gray-600">Questions Answered</div>
            </div>
            <div>
              <div className="text-3xl font-semibold text-gray-900 mb-1">
                {test.bestScore ? Math.max(test.bestScore, score) : score}%
              </div>
              <div className="text-sm text-gray-600">Best Score</div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Review Answers</h3>
          <div className="space-y-4">
            {sampleQuestions.map((q) => {
              const userAnswer = answers[q.id];
              const isCorrect = userAnswer === q.correctAnswer;
              return (
                <div key={q.id} className="bg-white border border-gray-200 rounded-lg p-5">
                  <div className="flex items-start gap-3 mb-3">
                    <div className={`w-6 h-6 flex-shrink-0 rounded-full flex items-center justify-center ${
                      isCorrect ? 'bg-green-50' : 'bg-red-50'
                    }`}>
                      {isCorrect ? (
                        <CheckCircle2 size={16} className="text-green-600" />
                      ) : (
                        <span className="text-red-600 text-xs">✕</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 mb-2">
                        Question {q.id}: {q.question}
                      </p>
                      <p className="text-sm text-gray-600 mb-1">
                        Your answer: {q.options[userAnswer] || 'Not answered'}
                      </p>
                      {!isCorrect && (
                        <p className="text-sm text-green-700">
                          Correct answer: {q.options[q.correctAnswer]}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-center gap-4">
          <button
            onClick={onBack}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Back to Tests
          </button>
          <button
            onClick={() => {
              setShowResults(false);
              setCurrentQuestion(0);
              setAnswers({});
            }}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Retake Test
          </button>
        </div>
      </div>
    );
  }

  const currentQ = sampleQuestions[currentQuestion];
  const selectedAnswer = answers[currentQ.id];
  const isLastQuestion = currentQuestion === sampleQuestions.length - 1;

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft size={20} />
          <span className="text-sm">Back to tests</span>
        </button>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Clock size={16} />
          <span>{formatTime(timeRemaining)}</span>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">{test.title}</h2>
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>Question {currentQuestion + 1} of {sampleQuestions.length}</span>
          <span>{Object.keys(answers).length} answered</span>
        </div>
      </div>

      {/* Question */}
      <div className="bg-white border border-gray-200 rounded-lg p-8 mb-6">
        <p className="text-lg text-gray-900 mb-6">{currentQ.question}</p>
        <div className="space-y-3">
          {currentQ.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(currentQ.id, index)}
              className={`w-full text-left p-4 border-2 rounded-lg transition-colors ${
                selectedAnswer === index
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 flex-shrink-0 rounded-full border-2 flex items-center justify-center ${
                  selectedAnswer === index
                    ? 'border-blue-500 bg-blue-500'
                    : 'border-gray-300'
                }`}>
                  {selectedAnswer === index && (
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  )}
                </div>
                <span className="text-sm text-gray-900">{option}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>

        {isLastQuestion ? (
          <button
            onClick={handleSubmit}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Submit Test
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Next Question
          </button>
        )}
      </div>
    </div>
  );
}
