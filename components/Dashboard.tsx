import { ArrowRight } from 'lucide-react';

interface DashboardProps {
  onTopicSelect: (topicId: string) => void;
}

export function Dashboard({ onTopicSelect }: DashboardProps) {
  const overallStats = [
    { label: 'Overall Progress', value: '42%' },
    { label: 'Topics Completed', value: '1/3' },
    { label: 'Study Streak', value: '12 days' },
    { label: 'Total Study Time', value: '18.5 hrs' },
  ];

  const topicProgress = [
    {
      id: 'accounting',
      title: 'Accounting Fundamentals',
      completed: 17,
      total: 20,
      testsCompleted: 3,
      totalTests: 4,
      status: 'In Progress',
    },
    {
      id: 'valuation',
      title: 'Valuation Methods',
      completed: 9,
      total: 20,
      testsCompleted: 1,
      totalTests: 4,
      status: 'In Progress',
    },
    {
      id: 'financial-statements',
      title: 'Financial Statement Analysis',
      completed: 0,
      total: 20,
      testsCompleted: 0,
      totalTests: 4,
      status: 'Not Started',
    },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Dashboard</h2>
        <p className="text-gray-600">Track your progress and continue learning</p>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {overallStats.map((stat, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="mb-2">
              <span className="text-sm text-gray-600">{stat.label}</span>
            </div>
            <div className="text-3xl font-semibold text-gray-900">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Topic Progress */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Topics</h3>
        <div className="space-y-4">
          {topicProgress.map((topic) => (
            <div
              key={topic.id}
              onClick={() => onTopicSelect(topic.id)}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:border-blue-300 transition-colors cursor-pointer group"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h4 className="text-base font-medium text-gray-900">{topic.title}</h4>
                    <span className={`text-xs px-2 py-1 rounded ${
                      topic.status === 'In Progress' ? 'bg-blue-50 text-blue-700' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {topic.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-6 text-sm text-gray-600">
                    <span>Lessons: {topic.completed}/{topic.total}</span>
                    <span>Tests: {topic.testsCompleted}/{topic.totalTests}</span>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <ArrowRight size={20} className="text-gray-400 group-hover:text-blue-600 transition-colors" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
