import React from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useStore, API_URL } from '../store/useStore';

import { Mail, Lock } from 'lucide-react';

const Login = () => {
  const [formData, setFormData] = React.useState({ email: '', password: '' });
  const [error, setError] = React.useState('');
  const { setUser } = useStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const { data } = await axios.post(`${API_URL}/auth/login`, formData);

      setUser(data.user, data.token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Authentication failed');
    }
  };

  return (
    <div className="min-h-screen bg-paper-100 flex items-center justify-center p-4  ">
      <div className="manuscript-card w-full max-w-sm">
        <h2 className="text-3xl font-serif font-bold mb-8 text-center uppercase tracking-widest">
          Sign In
        </h2>

        {error && <div className="mb-4 p-3 bg-red-100 text-red-700 text-sm rounded-sm">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
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
            Enter
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-ink/40">
          Don't have an account?
          <Link to="/signup" className="ml-2 font-bold text-ink hover:underline">
            Sign Up
          </Link>
        </p>
        
        <div className="mt-8 pt-6 border-t border-paper-200 text-center">
          <Link to="/" className="text-xs font-bold text-ink/40 uppercase tracking-widest hover:text-ink">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
