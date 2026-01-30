import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

interface LessonContentProps {
  topicId: string;
  lesson: {
    id: number;
    title: string;
    duration: string;
    completed: boolean;
  };
  onBack: () => void;
}

export function LessonContent({ topicId, lesson, onBack }: LessonContentProps) {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);

  // Sample lesson content
  const content = {
    sections: [
      {
        title: 'Introduction',
        text: 'This lesson covers the fundamental concepts you need to understand. Read through each section carefully and answer the questions to test your knowledge.',
      },
      {
        title: 'Key Concepts',
        text: 'The main principles include understanding the relationship between different financial elements and how they interact in real-world scenarios. These concepts form the foundation for more advanced topics.',
      },
      {
        title: 'Practical Application',
        text: 'In practice, you will need to apply these concepts to solve problems and make informed decisions. Consider how each principle relates to actual business situations.',
      },
    ],
    questions: [
      {
        id: 1,
        question: 'Explain the primary concept discussed in this lesson.',
        sampleAnswer: 'The primary concept focuses on understanding the fundamental relationship between key elements and their practical applications in finance.',
      },
      {
        id: 2,
        question: 'How would you apply this concept in a real-world scenario?',
        sampleAnswer: 'In a real-world scenario, this concept would be applied by analyzing the situation, identifying key factors, and making decisions based on the principles learned.',
      },
      {
        id: 3,
        question: 'What are the main challenges when implementing this concept?',
        sampleAnswer: 'Main challenges include ensuring accurate data, understanding context-specific factors, and balancing multiple considerations when making decisions.',
      },
    ],
  };

  const handleAnswerChange = (questionId: number, value: string) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft size={20} />
          <span className="text-sm">Back to lessons</span>
        </button>
        {lesson.completed && (
          <div className="flex items-center gap-2 text-green-600 text-sm">
            <CheckCircle2 size={16} />
            <span>Completed</span>
          </div>
        )}
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">{lesson.title}</h2>
        <p className="text-sm text-gray-600">{lesson.duration}</p>
      </div>

      {/* Lesson Content */}
      <div className="bg-white border border-gray-200 rounded-lg p-8 mb-6">
        {content.sections.map((section, index) => (
          <div key={index} className={index > 0 ? 'mt-6' : ''}>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">{section.title}</h3>
            <p className="text-gray-700 leading-relaxed">{section.text}</p>
          </div>
        ))}
      </div>

      {/* Practice Questions */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Practice Questions</h3>
        <p className="text-gray-600 mb-6">Answer the following questions to reinforce your understanding.</p>
        
        <div className="space-y-6">
          {content.questions.map((q) => (
            <div key={q.id} className="bg-white border border-gray-200 rounded-lg p-6">
              <label className="block mb-3">
                <span className="text-sm font-medium text-gray-900 mb-2 block">
                  Question {q.id}: {q.question}
                </span>
                <textarea
                  value={answers[q.id] || ''}
                  onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows={4}
                  placeholder="Type your answer here..."
                />
              </label>
              {showResults && (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-900 mb-2">Sample Answer:</p>
                  <p className="text-sm text-gray-700">{q.sampleAnswer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Back to Lessons
        </button>
        {!showResults ? (
          <button
            onClick={handleSubmit}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Check Answers
          </button>
        ) : (
          <button
            onClick={onBack}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
          >
            <CheckCircle2 size={20} />
            Mark as Complete
          </button>
        )}
      </div>
    </div>
  );
}
