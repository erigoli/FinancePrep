import { Home, BookOpen } from 'lucide-react';

interface SidebarProps {
  currentPage: string;
  selectedTopic: string | null;
  onDashboardSelect: () => void;
  onTopicSelect: (topicId: string) => void;
}

const topics = [
  { id: 'accounting', label: 'Accounting Fundamentals' },
  { id: 'valuation', label: 'Valuation Methods' },
  { id: 'financial-statements', label: 'Financial Statement Analysis' },
];

export function Sidebar({ currentPage, selectedTopic, onDashboardSelect, onTopicSelect }: SidebarProps) {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-xl font-semibold text-gray-900">FinancePrep</h1>
        <p className="text-sm text-gray-500 mt-1">Technical Interview Platform</p>
      </div>
      <nav className="flex-1 p-4">
        {/* Dashboard */}
        <button
          onClick={onDashboardSelect}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors ${
            currentPage === 'dashboard'
              ? 'bg-blue-50 text-blue-600'
              : 'text-gray-700 hover:bg-gray-50'
          }`}
        >
          <Home size={20} className="flex-shrink-0" />
          <span className="text-sm">Dashboard</span>
        </button>

        {/* Topics Section */}
        <div className="mt-6">
          <div className="px-4 mb-2">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              Topics
            </span>
          </div>
          {topics.map((topic) => (
            <button
              key={topic.id}
              onClick={() => onTopicSelect(topic.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors ${
                currentPage === 'topic' && selectedTopic === topic.id
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <BookOpen size={20} className="flex-shrink-0" />
              <span className="text-sm text-left">{topic.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </aside>
  );
}
