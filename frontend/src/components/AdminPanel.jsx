import React from 'react';
import { useStore } from '../store/useStore';
import { Check, X, ShieldAlert, Clock } from 'lucide-react';

const AdminPanel = ({ isOpen, onClose }) => {
  const { pendingWorks, fetchPendingWorks, approveWork, rejectWork } = useStore();

  React.useEffect(() => {
    if (isOpen) {
      fetchPendingWorks();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-ink/40 backdrop-blur-sm">
      <div className="manuscript-card w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <ShieldAlert className="w-8 h-8 text-ink" />
            <h2 className="text-3xl font-serif font-bold uppercase tracking-widest text-ink">Admin Curation</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-paper-200 rounded-full transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto pr-2 space-y-6">
          {pendingWorks.length === 0 ? (
            <div className="text-center py-20 bg-paper-100/50 border border-dashed border-paper-200">
              <Clock className="w-12 h-12 text-ink/20 mx-auto mb-4" />
              <p className="text-ink/40 font-serif  text-xl">The curation queue is empty...</p>
            </div>
          ) : (
            pendingWorks.map((work) => (
              <div key={work._id} className="p-6 bg-paper-50 border border-paper-200 hover:border-ink/20 transition-all group">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-serif font-bold  text-ink">{work.title}</h3>
                    <p className="text-xs font-bold text-ink/40 uppercase mt-1">
                      By {work.author?.username} • {work.category}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => approveWork(work._id, 'approved')}
                      className="p-2 bg-paper-100 border border-paper-200 text-green-600 hover:bg-green-600 hover:text-paper transition-all flex items-center space-x-2"
                    >
                      <Check className="w-5 h-5" />
                      <span className="text-xs font-bold uppercase">Approve</span>
                    </button>
                    <button
                      onClick={() => rejectWork(work._id, 'rejected')}
                      className="p-2 bg-paper-100 border border-paper-200 text-red-600 hover:bg-red-600 hover:text-paper transition-all flex items-center space-x-2"
                    >
                      <X className="w-5 h-5" />
                      <span className="text-xs font-bold uppercase">Reject</span>
                    </button>
                  </div>
                </div>
                <div className="text-ink/70 font-serif leading-relaxed line-clamp-3">
                  {work.content}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
