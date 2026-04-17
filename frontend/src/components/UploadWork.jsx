import React from 'react';
import { useStore } from '../store/useStore';
import { X, Feather } from 'lucide-react';

const UploadWork = ({ isOpen, onClose }) => {
  const [formData, setFormData] = React.useState({ title: '', category: 'Story', content: '' });
  const { uploadWork } = useStore();

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Publishing manuscript...', formData);
    try {
      const success = await uploadWork(formData);
      if (success) {
        console.log('Manuscript published successfully');
        setFormData({ title: '', category: 'Story', content: '' });
        onClose();
      } else {
        console.log('Failed to publish manuscript');
      }
    } catch (err) {
      console.error('Error in handleSubmit:', err);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-ink/40 backdrop-blur-sm">
      <div className="manuscript-card w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-4 right-4 text-ink/20 hover:text-ink">
          <X className="w-6 h-6" />
        </button>

        <div className="flex items-center space-x-3 mb-8">
          <Feather className="w-8 h-8 text-ink" />
          <h2 className="text-3xl font-serif font-bold uppercase tracking-widest">New Manuscript</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-xs font-bold text-ink/40 uppercase">Title</label>
              <input
                type="text"
                required
                placeholder="The Silent Echo"
                className="w-full px-4 py-3 bg-paper-100 border border-paper-200 outline-none focus:border-ink transition-all font-serif italic text-xl"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>
            
            <div className="space-y-1">
              <label className="text-xs font-bold text-ink/40 uppercase">Category</label>
              <select
                className="w-full px-4 py-3 bg-paper-100 border border-paper-200 outline-none focus:border-ink appearance-none cursor-pointer"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="Story">Story</option>
                <option value="Poem">Poem</option>
                <option value="Article">Article</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-ink/40 uppercase">Content</label>
            <textarea
              required
              rows={12}
              placeholder="Begin your masterpiece..."
              className="w-full px-6 py-6 bg-paper-100 border border-paper-200 outline-none focus:border-ink transition-all font-serif leading-relaxed text-lg"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            />
          </div>

          
            <button type="button" onClick={onClose} className="btn-secondary mr-4">Cancel</button>
            <button type="submit" className="btn-primary px-12">Publish Manuscript</button>
          
        </form>
      </div>
    </div>
  );
}

export default UploadWork;
