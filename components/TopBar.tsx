import { LogOut, User } from 'lucide-react';

interface TopBarProps {
  onLogout: () => void;
  onProfileClick: () => void;
}

export function TopBar({ onLogout, onProfileClick }: TopBarProps) {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-end px-8">
      <div className="flex items-center gap-4">
        <button 
          onClick={onProfileClick}
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <User size={18} />
          <span className="text-sm">Profile</span>
        </button>
        <button 
          onClick={onLogout}
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <LogOut size={18} />
          <span className="text-sm">Logout</span>
        </button>
      </div>
    </header>
  );
}
