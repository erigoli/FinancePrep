import { ArrowLeft, FileCheck } from 'lucide-react';
import { useState } from 'react';
import { TestTaking } from './TestTaking';

interface TestsPageProps {
  topicId: string;
  onBack: () => void;
}

const testData = {
  accounting: [
    { id: 1, title: 'Fundamentals Quiz 1', questions: 20, bestScore: 92, attempts: 2, status: 'Completed' },
    { id: 2, title: 'Fundamentals Quiz 2', questions: 25, bestScore: 88, attempts: 1, status: 'Completed' },
    { id: 3, title: 'Mid-Topic Assessment', questions: 30, bestScore: null, attempts: 0, status: 'Available' },
    { id: 4, title: 'Final Assessment', questions: 40, bestScore: null, attempts: 0, status: 'Available' },
  ],
  valuation: [
    { id: 1, title: 'Valuation Basics Quiz', questions: 20, bestScore: 85, attempts: 1, status: 'Completed' },
    { id: 2, title: 'DCF Methods Quiz', questions: 25, bestScore: null, attempts: 0, status: 'Available' },
    { id: 3, title: 'Mid-Topic Assessment', questions: 30, bestScore: null, attempts: 0, status: 'Available' },
    { id: 4, title: 'Final Assessment', questions: 40, bestScore: null, attempts: 0, status: 'Available' },
  ],
  'financial-statements': [
    { id: 1, title: 'Financial Statements Quiz 1', questions: 20, bestScore: null, attempts: 0, status: 'Available' },
    { id: 2, title: 'Financial Ratios Quiz', questions: 25, bestScore: null, attempts: 0, status: 'Available' },
    { id: 3, title: 'Mid-Topic Assessment', questions: 30, bestScore: null, attempts: 0, status: 'Available' },
    { id: 4, title: 'Final Assessment', questions: 40, bestScore: null, attempts: 0, status: 'Available' },
  ],
};

export function TestsPage({ topicId, onBack }: TestsPageProps) {
  const [selectedTest, setSelectedTest] = useState<number | null>(null);
  const tests = testData[topicId as keyof typeof testData] || [];

  if (selectedTest !== null) {
    const test = tests.find(t => t.id === selectedTest);
    if (test) {
      return (
        <TestTaking
          topicId={topicId}
          test={test}
          onBack={() => setSelectedTest(null)}
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
        <h3 className="text-2xl font-semibold text-gray-900 mb-2">Practice Tests</h3>
        <p className="text-gray-600">Test your knowledge and track your progress</p>
      </div>

      {/* Tests List */}
      <div className="space-y-3">
        {tests.map((test) => (
          <div
            key={test.id}
            onClick={() => setSelectedTest(test.id)}
            className="bg-white border rounded-lg p-5 transition-colors border-gray-200 hover:border-green-300 cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-start gap-4 flex-1 min-w-0">
                <div className={`w-10 h-10 flex-shrink-0 rounded-full flex items-center justify-center ${
                  test.status === 'Completed' ? 'bg-green-50' : 'bg-blue-50'
                }`}>
                  <FileCheck size={20} className={
                    test.status === 'Completed' ? 'text-green-600' : 'text-blue-600'
                  } />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="text-base font-medium text-gray-900">{test.title}</h4>
                    <span className={`text-xs px-2 py-1 rounded flex-shrink-0 ${
                      test.status === 'Completed' ? 'bg-green-50 text-green-700' : 'bg-blue-50 text-blue-700'
                    }`}>
                      {test.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>{test.questions} questions</span>
                    {test.bestScore && <span>Best Score: {test.bestScore}%</span>}
                    {test.attempts > 0 && <span>Attempts: {test.attempts}</span>}
                  </div>
                </div>
              </div>
              <button className="ml-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm flex-shrink-0">
                {test.status === 'Completed' ? 'Retake' : 'Start Test'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
