import React from 'react';
import Navbar from '../components/Navbar';
import UserSidebar from '../components/UserSidebar';
import Leaderboard from '../components/Leaderboard';
import { useStore } from '../store/useStore';
import Auth from '../components/Auth';
import UploadWork from '../components/UploadWork';
import { Trophy } from 'lucide-react';
import FooterNav from '../components/FooterNav';

const LeaderboardPage = () => {
    const { isSidebarOpen } = useStore();
    const [authOpen, setAuthOpen] = React.useState(false);
    const [uploadOpen, setUploadOpen] = React.useState(false);

    return (
        <>
            <UserSidebar />
            <div className="min-h-screen bg-paper-100 pb-20 transition-all duration-300">
                <Navbar 
                    onAuthClick={() => setAuthOpen(true)} 
                    onUploadClick={() => setUploadOpen(true)} 
                />

                <main className={`transition-all duration-300 ${isSidebarOpen ? 'lg:pl-48' : 'lg:pl-12'} pt-16 flex-1 p-4 md:p-8 lg:p-12`}>
                    <div className='max-w-5xl mx-auto mt-4 md:mt-20'>
                        <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-8 pb-8 border-b border-paper-200">
                            <Trophy className="w-10 h-10 text-accent" />
                            <div>
                                <h1 className="text-3xl font-serif font-black uppercase tracking-widest text-ink">Hall of Fame</h1>
                                <p className="text-xs text-ink/40 font-bold uppercase tracking-[0.3em]">The greatest legends of Manuscript</p>
                            </div>
                        </div>

                        <Leaderboard />
                    </div>
                </main>

                <Auth isOpen={authOpen} onClose={() => setAuthOpen(false)} />
                <UploadWork isOpen={uploadOpen} onClose={() => setUploadOpen(false)} />
            </div>
            <FooterNav
          onUploadClick={() => setUploadOpen(true)}
        />
        </>
    );
};

export default LeaderboardPage;
