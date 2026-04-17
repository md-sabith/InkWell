import React from 'react';
import axios from 'axios';
import { useStore } from '../store/useStore';
import { useNavigate } from 'react-router-dom';
import { Check, X } from 'lucide-react';
import SideBar from '../components/SideBar';

const AdminDashboard = () => {
    const [pendingWorks, setPendingWorks] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const { token, user, logout, isSidebarOpen } = useStore();
    const navigate = useNavigate();

    const fetchPending = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/api/admin/pending', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setPendingWorks(data);
        } catch (error) {
            console.error('Error fetching pending works:', error);
            if (error.response?.status === 401) logout();
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        if (!user || user.role !== 'admin') {
            navigate('/staff-portal'); // Redirect if not admin
            return;
        }
        fetchPending();
    }, [token, user]);

    const handleAction = async (id, action) => {
        try {
            await axios.put(`http://localhost:5000/api/admin/${id}/${action}`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setPendingWorks(prev => prev.filter(work => work._id !== id));
        } catch (error) {
            alert('Failed to update status');
        }
    };

    if (loading) return <div className="min-h-screen bg-paper-100 p-8">Loading dashboard...</div>;

    return (
        <div className="min-h-screen bg-paper-100 flex ">
            {/* Sidebar */}
            <SideBar />

            {/* Main Content */}
            <main className={`transition-all duration-300 ${isSidebarOpen ? 'lg:pl-72' : 'lg:pl-0'} flex-1 p-4 md:p-12 overflow-y-auto`}>
                <header className="mb-12">
                    <h2 className="text-4xl font-serif italic mb-2">Pending Manuscripts</h2>
                    <p className="text-ink/40 font-bold uppercase tracking-[0.2em] text-xs">Review submissions for publication</p>
                </header>

                {pendingWorks.length === 0 ? (
                    <div className="manuscript-card text-center py-20 border-dashed">
                        <p className="text-ink/40 font-serif italic text-lg text-center">All clear. No manuscripts currently awaiting review.</p>
                    </div>
                ) : (
                    <div className="grid gap-6">
                        {pendingWorks.map(work => (
                            <div key={work._id} className="manuscript-card group hover:border-ink/40 transition-all">
                                <div className="flex flex-col sm:flex-row justify-between items-start gap-6">
                                    <div className="space-y-4 flex-1 w-full">
                                        <div className="flex flex-wrap items-center gap-3">
                                            <span className="text-[10px] font-bold uppercase px-2 py-0.5 bg-ink text-paper-50 rounded-sm italic">
                                                {work.category}
                                            </span>
                                            <span className="text-[10px] text-ink/30 font-bold uppercase tracking-widest truncate max-w-[150px]">
                                                by {work.author?.username}
                                            </span>
                                        </div>
                                        <div>
                                            <h3 className="text-xl md:text-2xl font-serif font-bold mb-2 group-hover:text-ink transition-colors line-clamp-2">
                                                {work.title}
                                            </h3>
                                            <p className="text-sm md:text-base text-ink/60 font-serif italic line-clamp-3 leading-relaxed">
                                                {work.content}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex space-x-2 w-full sm:w-auto sm:ml-8 justify-end border-t sm:border-t-0 pt-4 sm:pt-0 border-paper-200">
                                        <button 
                                            onClick={() => handleAction(work._id, 'approve')}
                                            className="flex-1 sm:flex-none p-3 bg-green-50 text-green-700 hover:bg-green-600 hover:text-paper-50 transition-all rounded-sm shadow-sm flex items-center justify-center"
                                            title="Approve"
                                        >
                                            <Check className="w-5 h-5" />
                                            <span className="sm:hidden ml-2 font-bold uppercase text-xs">Approve</span>
                                        </button>
                                        <button 
                                            onClick={() => handleAction(work._id, 'reject')}
                                            className="flex-1 sm:flex-none p-3 bg-red-50 text-red-700 hover:bg-red-600 hover:text-paper-50 transition-all rounded-sm shadow-sm flex items-center justify-center"
                                            title="Reject"
                                        >
                                            <X className="w-5 h-5" />
                                            <span className="sm:hidden ml-2 font-bold uppercase text-xs">Reject</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default AdminDashboard;
