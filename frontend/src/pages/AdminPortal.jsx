import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useStore, API_URL } from '../store/useStore';

import { ShieldCheck, Lock, Mail } from 'lucide-react';

const AdminPortal = () => {
  const [formData, setFormData] = React.useState({ email: '', password: '' });
  const [error, setError] = React.useState('');
  const { setUser } = useStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const { data } = await axios.post(`${API_URL}/admin/admin-login`, formData);


      if (data.user.role !== 'admin') {
        setError('Access denied. You do not have administrative privileges.');
        return;
      }

      setUser(data.user, data.token);
      navigate('/admin/pending');
    } catch (err) {
      setError(err.response?.data?.message || 'Authentication failed');
    }
  };

  return (
    <div className="min-h-screen bg-ink flex items-center justify-center p-4">
      <div className="manuscript-card w-full max-w-md border-ink/20 shadow-2xl relative overflow-hidden bg-paper-50">
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 bg-ink text-paper-50 rounded-sm flex items-center justify-center mb-6 shadow-xl">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-serif font-bold text-center uppercase tracking-[0.3em] text-ink">
            Admin Access
          </h2>
          <div className="h-px w-12 bg-ink/20 mt-4" />
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm font-serif ">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-ink/40 uppercase tracking-widest">Administrative Email</label>
            <div className="relative group">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/20 group-focus-within:text-ink transition-colors" />
              <input
                type="email"
                required
                placeholder="admin@manuscript.ly"
                className="w-full pl-10 pr-4 py-3 bg-paper-50 border border-paper-200 outline-none focus:border-ink transition-all font-serif "
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-ink/40 uppercase tracking-widest">Secure Passphrase</label>
            <div className="relative group">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/20 group-focus-within:text-ink transition-colors" />
              <input
                type="password"
                required
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 bg-paper-50 border border-paper-200 outline-none focus:border-ink transition-all"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-ink text-paper-50 py-4 font-bold uppercase tracking-[0.2em] hover:bg-ink/90 transition-all shadow-lg active:scale-[0.98]"
          >
            Authorize Entry
          </button>
        </form>

        <p className="mt-8 text-center text-[10px] text-ink/30 uppercase tracking-widest">
          Unauthorized access is strictly monitored
        </p>
      </div>
    </div>
  );
};

export default AdminPortal;
