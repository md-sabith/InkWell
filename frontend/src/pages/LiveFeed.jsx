import React from 'react';
import { useStore } from '../store/useStore';
import SideBar from '../components/SideBar';
import WorkCard from '../components/WorkCard';
import Leaderboard from '../components/Leaderboard';
import Auth from '../components/Auth';
import UploadWork from '../components/UploadWork';
import AdminPanel from '../components/AdminPanel';
import AdminLogin from '../components/AdminLogin';
import { BookText, ScrollText, Filter } from 'lucide-react';
import AdminNavbar from '../components/AdminNavbar';
import AdminFooterNav from '../components/AdminFooterNav';

function LiveFeed() {
    const { works, fetchWorks, loading, user, isSidebarOpen } = useStore();
    const [authOpen, setAuthOpen] = React.useState(false);
    const [uploadOpen, setUploadOpen] = React.useState(false);
    const [adminOpen, setAdminOpen] = React.useState(false);
    const [adminLoginOpen, setAdminLoginOpen] = React.useState(false);
    const [filter, setFilter] = React.useState('All');

    React.useEffect(() => {
        fetchWorks();
    }, []);

    const filteredWorks = filter === 'All'
        ? works
        : works.filter(w => w.category === filter);

    return (
        <div className="min-h-screen bg-paper-100 flex">
            <SideBar />
            <AdminNavbar />

            <main className={`transition-all duration-500 ease-in-out ${isSidebarOpen ? 'lg:pl-48' : 'lg:pl-12'} flex-1 pt-20 overflow-y-auto`}>
                <div className="p-4 md:p-12">
                    <div className="px-4 md:px-2">
                        <div>

                            {/* Main Feed */}
                            <div className="lg:col-span-8 order-2 lg:order-1">
                                <div className="flex items-center justify-between mb-8 pb-4 border-b border-paper-200">
                                    <div className="flex items-center space-x-3">
                                        <ScrollText className="w-10 h-10 text-accent" />
                                        <h2 className="text-3xl font-serif font-black uppercase tracking-widest text-ink">Live Archives</h2>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <Filter className="w-4 h-4 text-ink" />
                                        <div className="flex bg-paper-200/50 p-1 rounded-sm">
                                            {['All', 'Story', 'Poem', 'Article'].map((cat) => (
                                                <button
                                                    key={cat}
                                                    onClick={() => setFilter(cat)}
                                                    className={`px-3 py-1 text-xs font-bold transition-all rounded-sm ${filter === cat ? 'bg-ink text-paper-50' : 'text-ink/40 hover:text-ink/60'
                                                        }`}
                                                >
                                                    {cat.toUpperCase()}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {loading ? (
                                    <div className="space-y-8 animate-pulse">
                                        {[...Array(3)].map((_, i) => (
                                            <div key={i} className="h-64 bg-paper-200 rounded-sm" />
                                        ))}
                                    </div>
                                ) : filteredWorks.length > 0 ? (
                                    <div className="space-y-8">
                                        {filteredWorks.map(work => (
                                            <WorkCard key={work._id} work={work} />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="manuscript-card text-center py-20">
                                        <BookText className="w-16 h-16 text-paper-200 mx-auto mb-4" />
                                        <p className="text-ink/40 font-serif  text-xl">The archives are empty...</p>
                                    </div>
                                )}
                            </div>

                            {/* <div className="hidden lg:block lg:col-span-4 order-1 lg:order-2 space-y-8">
                                <div className="sticky top-24">
                                    <Leaderboard limit={5} showFullLink={true} />

                                    <div className="mt-8 p-6 border border-dashed border-paper-200 rounded-sm">
                                        <h4 className="text-xs font-bold text-ink/40 uppercase tracking-widest mb-2">Authority Control</h4>
                                        <p className="text-sm font-serif  text-ink/60 leading-relaxed">
                                            "Observing the flow of the legends. Ensuring every word meets the standard of the great archives."
                                        </p>
                                    </div>
                                </div>
                            </div> */}

                        </div>
                    </div>
                </div>
            </main>

            <Auth isOpen={authOpen} onClose={() => setAuthOpen(false)} />
            <UploadWork isOpen={uploadOpen} onClose={() => setUploadOpen(false)} />
            <AdminPanel isOpen={adminOpen} onClose={() => setAdminOpen(false)} />
            <AdminLogin
                isOpen={adminLoginOpen}
                onClose={() => setAdminLoginOpen(false)}
                onLoginSuccess={() => setAdminOpen(true)}
            />
            <AdminFooterNav />
        </div>
    );
}

export default LiveFeed;
