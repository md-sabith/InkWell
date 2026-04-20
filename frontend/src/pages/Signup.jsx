import React from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useStore, API_URL } from '../store/useStore';

import { Mail, Lock, User as UserIcon, PenLine } from 'lucide-react';

const Signup = () => {
  const [formData, setFormData] = React.useState({ username: '', email: '', password: '', profilePicture: '' });
  const [preview, setPreview] = React.useState(null);
  const [error, setError] = React.useState('');
  const { setUser } = useStore();
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 1024 * 1024) {
        setError('Image must be less than 1MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, profilePicture: reader.result });
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const { data } = await axios.post(`${API_URL}/auth/signup`, formData);

      setUser(data.user, data.token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Authentication failed');
    }
  };

  return (
    <div className="min-h-screen bg-paper-100 flex items-center justify-center p-4 py-20">
      <div className="manuscript-card w-full max-w-md">
        <h2 className="text-3xl font-serif font-bold mb-8 text-center uppercase tracking-widest text-ink/80">
          Create Legend
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Picture Upload */}
          <div className="flex flex-col items-center space-y-4 mb-8">
            <div className="relative group">
              <div className="w-24 h-24 rounded-full border-2 border-dashed border-paper-200 overflow-hidden bg-paper-100 flex items-center justify-center transition-all group-hover:border-ink/20">
                {preview ? (
                  <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <UserIcon className="w-10 h-10 text-ink/10" />
                )}
              </div>
              <label className="absolute inset-0 cursor-pointer flex items-center justify-center bg-ink/0 group-hover:bg-ink/40 transition-all rounded-full">
                <span className="text-[10px] font-bold text-paper-50 opacity-0 group-hover:opacity-100 uppercase tracking-widest">
                  {preview ? 'Change' : 'Upload'}
                </span>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>
            </div>
            <p className="text-[10px] font-bold text-ink/30 uppercase tracking-[0.2em]">Profile Picture (Optional)</p>
          </div>

          {error && <div className="p-4 bg-red-50 border border-red-100 text-red-700 text-xs rounded-lg animate-shake font-bold">{error}</div>}

          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-ink/40 uppercase tracking-widest">Pen Name</label>
              <div className="relative">
                <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/20" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Shakespeare"
                  className="w-full pl-12 pr-4 py-3 bg-paper-100 border border-paper-200 outline-none focus:border-ink/40 rounded-xl transition-all font-serif  text-lg shadow-sm"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-ink/40 uppercase tracking-widest">Messenger (Email)</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/20" />
                <input
                  type="email"
                  required
                  placeholder="messenger@art.com"
                  className="w-full pl-12 pr-4 py-3 bg-paper-100 border border-paper-200 outline-none focus:border-ink/40 rounded-xl transition-all font-serif  text-lg shadow-sm"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-ink/40 uppercase tracking-widest">Secrete Key (Password)</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/20" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-3 bg-paper-100 border border-paper-200 outline-none focus:border-ink/40 rounded-xl transition-all font-serif  text-lg shadow-sm"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>
            </div>
          </div>

          <button type="submit" className="w-full py-4 bg-ink text-paper-50 rounded-2xl font-black uppercase tracking-[0.3em] shadow-2xl hover:bg-ink/90 active:scale-[0.98] transition-all flex items-center justify-center space-x-3">
            <PenLine className="w-5 h-5" />
            <span>Join the Guild</span>
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-ink/40">
          Already have an account?
          <Link to="/login" className="ml-2 font-bold text-ink hover:underline">
            Sign In
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

export default Signup;
