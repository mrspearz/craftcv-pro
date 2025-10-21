import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';
import { resumeService } from '../utils/resumeService';
import { Edit2, Trash2, Plus } from 'lucide-react';

export function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [resumes, setResumes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadResumes();
  }, []);

  const loadResumes = async () => {
    const data = await resumeService.getResumes();
    setResumes(data);
    setLoading(false);
  };

  const handleDelete = async (resumeId: string) => {
    if (!window.confirm('Are you sure you want to delete this resume?')) return;
    await resumeService.deleteResume(resumeId);
    loadResumes();
  };

  return (
    <div className="min-h-screen bg-slate-950 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-slate-400">Manage your resumes</p>
        </div>

        {/* My CVs Section */}
        <div className="bg-slate-900/50 border border-violet-500/20 rounded-2xl p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">My CVs</h2>
            <button
              onClick={async () => {
                const result = await resumeService.createNewResume();
                if (result.success) {
                  localStorage.setItem('currentResumeId', result.resumeId);
                  navigate('/builder');
                } else {
                  alert('Error creating resume');
                }
              }}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-medium rounded-lg transition-all"
            >
              <Plus className="w-5 h-5" />
              Create New CV
            </button>
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-32">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-violet-500 border-t-transparent"></div>
            </div>
          ) : resumes.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-400 mb-4">No CVs yet. Create your first one!</p>
              <button
                onClick={() => navigate('/builder')}
                className="px-6 py-2 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-medium rounded-lg transition-all"
              >
                Create CV
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {resumes.map((resume) => (
                <div
                  key={resume.id}
                  className="bg-slate-800/50 border border-violet-500/20 rounded-lg p-4 hover:border-violet-400/50 transition-all"
                >
                  <h3 className="text-white font-semibold mb-2">{resume.title}</h3>
                  <p className="text-slate-400 text-sm mb-4">
                    Template: {resume.template_id}
                  </p>
                  <p className="text-slate-500 text-xs mb-4">
                    Last updated: {new Date(resume.updated_at).toLocaleDateString()}
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate('/builder')}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-slate-700 hover:bg-slate-600 text-white text-sm font-medium rounded transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(resume.id)}
                      className="px-3 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 text-sm font-medium rounded transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
