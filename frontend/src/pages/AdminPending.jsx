import React from 'react';
import axios from 'axios';
import { useStore, API_URL } from '../store/useStore';
import { toast } from 'react-hot-toast';

import { useNavigate } from 'react-router-dom';
import { Check, LayoutDashboardIcon, X } from 'lucide-react';
import SideBar from '../components/SideBar';
import AdminNavbar from '../components/AdminNavbar';
import AdminFooterNav from '../components/AdminFooterNav';

const AdminPending = () => {
    const [pendingWorks, setPendingWorks] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const { token, user, logout, isSidebarOpen } = useStore();
    const navigate = useNavigate();

    const fetchPending = async () => {
        try {
            const { data } = await axios.get(`${API_URL}/admin/pending`, {

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
            navigate('/admin'); // Redirect if not admin
            return;
        }
        fetchPending();
    }, [token, user]);

    const handleAction = async (id, action) => {
        try {
            await axios.put(`${API_URL}/admin/${id}/${action}`, {}, {

                headers: { Authorization: `Bearer ${token}` }
            });
            setPendingWorks(prev => prev.filter(work => work._id !== id));
        } catch (error) {
            toast.error('Failed to update status');
        }
    };

    if (loading) return <div className="min-h-screen bg-paper-100 p-8">Loading pending...</div>;

    return (
        <div className="min-h-screen bg-paper-100 flex ">
            {/* Sidebar */}
            <SideBar />
            <AdminNavbar />

            {/* Main Content */}
            <main className={`transition-all duration-500 ease-in-out ${isSidebarOpen ? 'lg:pl-48' : 'lg:pl-12'} flex-1 pt-20 overflow-y-auto`}>
                <div className="p-4 md:p-12">
                    <header className="mb-8">
                        <div className="flex items-center space-x-3 mb-2">

                            <LayoutDashboardIcon className="w-10 h-10 text-accent" />
                            <h2 className="text-3xl font-serif font-black uppercase tracking-widest text-ink">Pending works</h2>


                        </div>
                        <p className="text-sm text-ink/40 font-bold uppercase tracking-[0.3em]">The greatest legends of Manuscript</p>
                    </header>


                    {pendingWorks.length === 0 ? (
                        <div className="manuscript-card text-center py-20 border-dashed">
                            <p className="text-ink/40 font-serif  text-lg text-center">All clear. No manuscripts currently awaiting review.</p>
                        </div>
                    ) : (
                        <div className="grid gap-6">
                            {pendingWorks.map(work => (
                                <div key={work._id} className="manuscript-card group hover:border-ink/40 transition-all">
                                    <div className="flex flex-col sm:flex-row justify-between items-start gap-6">
                                        <div className="space-y-4 flex-1 w-full">
                                            <div className="flex flex-wrap items-center gap-3">
                                                <span className="text-[10px] font-bold uppercase px-2 py-0.5 bg-ink text-paper-50 rounded-sm ">
                                                    {work.category}
                                                </span>
                                                <span className="text-[10px] text-ink/30 font-bold uppercase tracking-widest truncate max-w-[150px] flex items-center gap-2">
                                                    by {work.author?.username}
                                                    {work.author?.status && (
                                                        <span className="text-[8px] px-1.5 py-0.5 rounded-full border border-accent/20 text-accent">
                                                            {work.author.status.toUpperCase()}
                                                        </span>
                                                    )}
                                                </span>
                                            </div>
                                            <div>
                                                <h3 className="text-xl md:text-2xl font-serif font-bold mb-2 group-hover:text-ink transition-colors line-clamp-2">
                                                    {work.title}
                                                </h3>
                                                <div className="text-sm md:text-base text-ink/60 font-serif line-clamp-4 leading-relaxed whitespace-pre-wrap">
                                                    {work.content.split('\n').map((paragraph, index) => (
                                                        paragraph.trim() && (
                                                            <p key={index} className={index > 0 ? 'mt-2' : ''}>
                                                                {paragraph}
                                                            </p>
                                                        )
                                                    ))}
                                                </div>
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
                </div>
            </main>
            <AdminFooterNav />
        </div>
    );
};

export default AdminPending;
