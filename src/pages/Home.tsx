import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';
import { LandingPage } from '../components/LandingPage';

export function Home() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  let user = null;
  
  try {
    const auth = useAuth();
    user = auth.user;
  } catch (e) {
    // Auth not available
  }

  useEffect(() => {
    // If user is signed in, redirect to builder
    if (user) {
      navigate('/builder', { replace: true });
    }
    setLoading(false);
  }, [user, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-violet-500 border-t-transparent"></div>
      </div>
    );
  }

  return <LandingPage onGetStarted={() => navigate('/signup')} />;
}
