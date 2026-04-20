import React from 'react';
import axios from 'axios';
import { useStore, API_URL } from '../store/useStore';

import { X, Mail, Lock, User as UserIcon } from 'lucide-react';

const Auth = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = React.useState(true);
  const [formData, setFormData] = React.useState({ username: '', email: '', password: '' });
  const [error, setError] = React.useState('');
  const { setUser } = useStore();

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const endpoint = isLogin ? '/auth/login' : '/auth/signup';
      const { data } = await axios.post(`${API_URL}${endpoint}`, formData);

      setUser(data.user, data.token);
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Authentication failed');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-ink/40 backdrop-blur-sm">
      <div className="manuscript-card w-full max-w-sm">
        <button onClick={onClose} className="absolute top-4 right-4 text-ink/20 hover:text-ink">
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-3xl font-serif font-bold mb-8 text-center uppercase tracking-widest">
          {isLogin ? 'Sign In' : 'Sign Up'}
        </h2>

        {error && <div className="mb-4 p-3 bg-red-100 text-red-700 text-sm rounded-sm">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="space-y-1">
              <label className="text-xs font-bold text-ink/40 uppercase">Username</label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/20" />
                <input
                  type="text"
                  required
                  className="w-full pl-10 pr-4 py-2 bg-paper-100 border border-paper-200 outline-none focus:border-ink"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                />
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs font-bold text-ink/40 uppercase">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/20" />
              <input
                type="email"
                required
                className="w-full pl-10 pr-4 py-2 bg-paper-100 border border-paper-200 outline-none focus:border-ink"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-ink/40 uppercase">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/20" />
              <input
                type="password"
                required
                className="w-full pl-10 pr-4 py-2 bg-paper-100 border border-paper-200 outline-none focus:border-ink"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
          </div>

          <button type="submit" className="w-full btn-primary py-3 !mt-8">
            {isLogin ? 'Enter' : 'Join'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-ink/40">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="ml-2 font-bold text-ink hover:underline"
          >
            {isLogin ? 'Sign Up' : 'Sign In'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Auth;
