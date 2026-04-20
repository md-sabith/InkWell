import React from 'react';
import AdminNavbar from '../components/AdminNavbar';
import AdminFooterNav from '../components/AdminFooterNav';
import Leaderboard from '../components/Leaderboard';
import { useStore } from '../store/useStore';
import Auth from '../components/Auth';
import UploadWork from '../components/UploadWork';
import { Trophy } from 'lucide-react';
import SideBar from '../components/SideBar';

const LeaderboardPage = () => {
    const { isSidebarOpen } = useStore();
    const [authOpen, setAuthOpen] = React.useState(false);
    const [uploadOpen, setUploadOpen] = React.useState(false);

    return (
        <div className="min-h-screen bg-paper-100 flex">
            <SideBar />
            <AdminNavbar />

            <main className={`transition-all duration-500 ease-in-out ${isSidebarOpen ? 'lg:pl-48' : 'lg:pl-12'} flex-1 pt-20 overflow-y-auto`}>
                <div className="p-4 md:p-12">
                    <div>
                        <div className="flex items-center space-x-4 mb-8 pb-4 border-b border-paper-200">
                            <Trophy className="w-10 h-10 text-accent" />
                            <div>
                                <h1 className="text-3xl font-serif font-black uppercase tracking-widest text-ink">Hall of Fame</h1>
                                <p className="text-xs text-ink/40 font-bold uppercase tracking-[0.3em]">The greatest legends of Manuscript</p>
                            </div>
                        </div>

                        <Leaderboard />
                    </div>
                </div>
            </main>

            <Auth isOpen={authOpen} onClose={() => setAuthOpen(false)} />
            <UploadWork isOpen={uploadOpen} onClose={() => setUploadOpen(false)} />
            <AdminFooterNav />
        </div>
    );
};

export default LeaderboardPage;
