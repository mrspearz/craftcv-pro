import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';
import { supabase } from '../lib/supabaseClient';
import { ArrowLeft, Lock, Trash2, Mail } from 'lucide-react';

export function Settings() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [email, setEmail] = useState(user?.email || '');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleUpdateEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      const { error } = await supabase.auth.updateUser({ email });
      if (error) throw error;
      setMessage('Email updated successfully. Check your new email for confirmation.');
    } catch (err) {
      setError((err as Error).message || 'Failed to update email');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw error;
      setMessage('Password updated successfully');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setError((err as Error).message || 'Failed to update password');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      return;
    }

    setLoading(true);
    setMessage('');
    setError('');

    try {
      // Delete user data first (resumes, etc.)
      const { error: dataError } = await supabase
        .from('resumes')
        .delete()
        .eq('user_id', user?.id);

      if (dataError) throw dataError;

      // Then delete the user account
      const { error: authError } = await supabase.auth.admin.deleteUser(user?.id || '');
      if (authError) throw authError;

      // Sign out and redirect
      await signOut();
      navigate('/login');
    } catch (err) {
      setError((err as Error).message || 'Failed to delete account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate('/dashboard')}
            className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-slate-300" />
          </button>
          <h1 className="text-3xl font-bold text-white">Account Settings</h1>
        </div>

        {/* Messages */}
        {message && (
          <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400">
            {message}
          </div>
        )}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
            {error}
          </div>
        )}

        <div className="space-y-8">
          {/* Email Section */}
          <div className="bg-slate-900/50 border border-violet-500/20 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Mail className="w-5 h-5 text-violet-400" />
              <h2 className="text-xl font-semibold text-white">Email Address</h2>
            </div>
            <form onSubmit={handleUpdateEmail} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Current Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-violet-500/20 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2 px-4 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-medium rounded-lg transition-all disabled:opacity-50"
              >
                {loading ? 'Updating...' : 'Update Email'}
              </button>
            </form>
          </div>

          {/* Password Section */}
          <div className="bg-slate-900/50 border border-violet-500/20 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Lock className="w-5 h-5 text-violet-400" />
              <h2 className="text-xl font-semibold text-white">Change Password</h2>
            </div>
            <form onSubmit={handleUpdatePassword} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-violet-500/20 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
                  placeholder="••••••••"
                  required
                  minLength={6}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-violet-500/20 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
                  placeholder="••••••••"
                  required
                  minLength={6}
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2 px-4 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-medium rounded-lg transition-all disabled:opacity-50"
              >
                {loading ? 'Updating...' : 'Update Password'}
              </button>
            </form>
          </div>

          {/* Delete Account Section */}
          <div className="bg-red-950/30 border border-red-500/20 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Trash2 className="w-5 h-5 text-red-400" />
              <h2 className="text-xl font-semibold text-red-400">Delete Account</h2>
            </div>
            <p className="text-slate-300 text-sm mb-4">
              Permanently delete your account and all associated data. This action cannot be undone.
            </p>
            <button
              onClick={handleDeleteAccount}
              disabled={loading}
              className="w-full py-2 px-4 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-all disabled:opacity-50"
            >
              {loading ? 'Deleting...' : 'Delete My Account'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
