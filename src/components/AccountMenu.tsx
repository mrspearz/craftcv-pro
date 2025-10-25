import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';
import { LogOut, Settings } from 'lucide-react';

export function AccountMenu() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  let user = null;
  let signOut = async () => {};
  
  try {
    const auth = useAuth();
    user = auth.user;
    signOut = auth.signOut;
  } catch (e) {
    // Auth not available
  }

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    } finally {
      setLoading(false);
    }
  };

  // Show logout and settings if authenticated
  if (user) {
    return (
      <div className="flex items-center gap-1 sm:gap-2">
        <button
          onClick={() => navigate('/settings')}
          className="hidden sm:block p-2 text-slate-300 hover:text-violet-400 hover:bg-violet-500/10 rounded-lg transition-colors"
          title="Settings"
        >
          <Settings className="w-5 h-5" />
        </button>
        <button
          onClick={handleSignOut}
          disabled={loading}
          className="flex items-center gap-1.5 px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors disabled:opacity-50"
        >
          <LogOut className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span>{loading ? 'Logging out...' : 'Logout'}</span>
        </button>
      </div>
    );
  }

  // Show login button if not authenticated
  return (
    <button
      onClick={() => navigate('/login')}
      className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-violet-400 hover:bg-violet-500/10 rounded-lg transition-colors"
    >
      Login
    </button>
  );
}
