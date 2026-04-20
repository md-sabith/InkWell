import React, { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { X, User, Mail, Camera, Save, Loader2 } from 'lucide-react';

const EditProfile = ({ isOpen, onClose }) => {
  const { user, updateProfile } = useStore();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    profilePicture: ''
  });
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || '',
        email: user.email || '',
        profilePicture: user.profilePicture || ''
      });
      setPreview(user.profilePicture);
    }
  }, [user, isOpen]);

  if (!isOpen) return null;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 1024 * 1024) {
        setError('Image must be less than 1MB');
        return;
      }
      setError('');
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
    setLoading(true);
    setError('');

    const success = await updateProfile(formData);
    setLoading(false);

    if (success) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-ink/40 backdrop-blur-sm">
      <div className="manuscript-card w-full max-w-md relative animate-in fade-in zoom-in duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-ink/20 hover:text-ink transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-serif font-bold mb-8 text-center uppercase tracking-widest text-ink/80">
          Edit Profile
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Avatar Upload */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative group">
              <div className="w-24 h-24 rounded-2xl bg-paper-100 border-2 border-paper-200 overflow-hidden flex items-center justify-center transition-all group-hover:border-ink/20">
                {preview ? (
                  <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-10 h-10 text-ink/10" />
                )}
              </div>
              <label className="absolute inset-0 cursor-pointer flex items-center justify-center bg-ink/0 group-hover:bg-ink/40 transition-all rounded-2xl">
                <Camera className="w-6 h-6 text-paper-50 opacity-0 group-hover:opacity-100" />
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>
            </div>
            <p className="text-[10px] font-bold text-ink/30 uppercase tracking-widest">Update Portrait</p>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-100 text-red-700 text-xs rounded-lg font-bold">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-ink/40 uppercase tracking-widest ml-1">Pen Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/20" />
                <input
                  type="text"
                  required
                  className="w-full pl-12 pr-4 py-3 bg-paper-100 border border-paper-200 outline-none focus:border-ink/40 rounded-xl transition-all font-serif  text-lg"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-ink/40 uppercase tracking-widest ml-1">Messenger (Email)</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/20" />
                <input
                  type="email"
                  required
                  className="w-full pl-12 pr-4 py-3 bg-paper-100 border border-paper-200 outline-none focus:border-ink/40 rounded-xl transition-all font-serif  text-lg"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-ink text-paper-50 rounded-xl font-bold uppercase tracking-[0.2em] shadow-xl hover:bg-ink/90 active:scale-[0.98] transition-all flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Save className="w-5 h-5" />
            )}
            <span>{loading ? 'Saving...' : 'Save Changes'}</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
