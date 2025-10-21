import { useNavigate } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';
import { AccountMenu } from '../components/AccountMenu';

export function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-purple-950">
      <div className="absolute top-4 right-4">
        <AccountMenu />
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-400 to-purple-500 bg-clip-text text-transparent mb-4">
              Welcome to Your Dashboard
            </h1>
            <p className="text-slate-400 text-lg">
              Logged in as: <span className="text-violet-400 font-medium">{user?.email}</span>
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="bg-slate-800/60 backdrop-blur-xl rounded-2xl border border-violet-500/20 p-8 shadow-2xl">
              <div className="mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-violet-600 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Resume Builder</h2>
                <p className="text-slate-400 mb-6">
                  Create and customize your professional resume with our easy-to-use builder.
                </p>
              </div>
              <button
                onClick={() => navigate('/builder')}
                className="w-full py-3 px-4 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-medium rounded-lg transition-all"
              >
                Go to Builder
              </button>
            </div>

            <div className="bg-slate-800/60 backdrop-blur-xl rounded-2xl border border-violet-500/20 p-8 shadow-2xl">
              <div className="mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">My Resumes</h2>
                <p className="text-slate-400 mb-6">
                  View and manage all your saved resumes in one place.
                </p>
              </div>
              <button
                disabled
                className="w-full py-3 px-4 bg-slate-700/50 text-slate-500 font-medium rounded-lg cursor-not-allowed"
              >
                Coming Soon
              </button>
            </div>
          </div>

          <div className="mt-8 bg-slate-800/60 backdrop-blur-xl rounded-2xl border border-violet-500/20 p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-3">Quick Stats</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-violet-400">0</div>
                <div className="text-sm text-slate-400 mt-1">Resumes</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400">0</div>
                <div className="text-sm text-slate-400 mt-1">Templates Used</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-400">0</div>
                <div className="text-sm text-slate-400 mt-1">Downloads</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
