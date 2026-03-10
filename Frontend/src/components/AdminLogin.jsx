import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [setupKey, setSetupKey] = useState('');
  const [isSetup, setIsSetup] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (isSetup) {
        const { data } = await api.post('/auth/setup', { username, password, setupKey });
        localStorage.setItem('admin_token', data.token);
      } else {
        const { data } = await api.post('/auth/login', { username, password });
        localStorage.setItem('admin_token', data.token);
      }
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-charcoal flex items-center justify-center px-4">
      <div className="bg-off-white rounded-2xl p-8 w-full max-w-md shadow-xl">
        <h1 className="text-3xl font-black text-charcoal mb-2">
          {isSetup ? 'Create Admin Account' : 'Admin Login'}
        </h1>
        <p className="text-gray-warm text-sm mb-8">
          {isSetup
            ? 'Set up your admin account for the first time.'
            : 'Sign in to manage your portfolio.'}
        </p>

        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-3 rounded-lg text-sm mb-6">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="px-4 py-3 rounded-xl border border-gray-light bg-cream text-charcoal text-sm focus:outline-none focus:ring-2 focus:ring-amber"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="px-4 py-3 rounded-xl border border-gray-light bg-cream text-charcoal text-sm focus:outline-none focus:ring-2 focus:ring-amber"
          />

          {isSetup && (
            <input
              type="text"
              placeholder="Setup Key"
              value={setupKey}
              onChange={(e) => setSetupKey(e.target.value)}
              required
              className="px-4 py-3 rounded-xl border border-gray-light bg-cream text-charcoal text-sm focus:outline-none focus:ring-2 focus:ring-amber"
            />
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-charcoal text-cream px-6 py-3 rounded-xl font-medium text-sm hover:bg-amber hover:text-charcoal transition-colors duration-300 disabled:opacity-50"
          >
            {loading ? 'Please wait...' : isSetup ? 'Create Account' : 'Sign In'}
          </button>
        </form>

        <button
          onClick={() => {
            setIsSetup(!isSetup);
            setError('');
          }}
          className="mt-6 text-xs text-gray-warm hover:text-amber transition-colors"
        >
          {isSetup ? '← Back to Login' : 'First time? Set up admin account'}
        </button>
      </div>
    </div>
  );
}
