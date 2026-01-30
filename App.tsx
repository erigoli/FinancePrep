import { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { TopBar } from "./components/TopBar";
import { Dashboard } from "./components/Dashboard";
import { TopicView } from "./components/TopicView";
import { LoginSignup } from "./components/LoginSignup";
import { ProfilePage } from "./components/ProfilePage";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [selectedTopic, setSelectedTopic] = useState<
    string | null
  >(null);

  const handleTopicSelect = (topicId: string) => {
    setSelectedTopic(topicId);
    setCurrentPage("topic");
  };

  const handleDashboardSelect = () => {
    setCurrentPage("dashboard");
    setSelectedTopic(null);
  };

  const handleProfileSelect = () => {
    setCurrentPage("profile");
    setSelectedTopic(null);
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentPage("dashboard");
    setSelectedTopic(null);
  };

  if (!isAuthenticated) {
    return <LoginSignup onLogin={handleLogin} />;
  }

  const renderPage = () => {
    if (currentPage === "dashboard") {
      return <Dashboard onTopicSelect={handleTopicSelect} />;
    } else if (currentPage === "topic" && selectedTopic) {
      return <TopicView topicId={selectedTopic} />;
    } else if (currentPage === "profile") {
      return <ProfilePage onBack={handleDashboardSelect} />;
    }
    return <Dashboard onTopicSelect={handleTopicSelect} />;
  };

  return (
    <div className="flex h-screen bg-white">
      <Sidebar
        currentPage={currentPage}
        selectedTopic={selectedTopic}
        onDashboardSelect={handleDashboardSelect}
        onTopicSelect={handleTopicSelect}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar
          onLogout={handleLogout}
          onProfileClick={handleProfileSelect}
        />
        <main className="flex-1 overflow-y-auto">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}