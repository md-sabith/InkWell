import React from 'react';
import { useStore } from '../store/useStore';
import Navbar from '../components/Navbar';
import UserSidebar from '../components/UserSidebar';
import WorkCard from '../components/WorkCard';
import Leaderboard from '../components/Leaderboard';
import Auth from '../components/Auth';
import UploadWork from '../components/UploadWork';
import AdminPanel from '../components/AdminPanel';
import AdminLogin from '../components/AdminLogin';
import { BookText, ScrollText, Filter, ShieldCheck } from 'lucide-react';

function App() {
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
    <>
    <UserSidebar />
    <div className="min-h-screen bg-paper-100 pb-20 transition-all duration-300">
      
      <Navbar 
        onAuthClick={() => setAuthOpen(true)} 
        onUploadClick={() => setUploadOpen(true)} 
        onAdminClick={() => setAdminOpen(true)}
        onAdminLoginClick={() => setAdminLoginOpen(true)}
      />
      

      <main className={`transition-all duration-300 ${isSidebarOpen ? 'lg:pl-72' : 'lg:pl-0'} pt-8 flex-1 p-4 md:p-12 overflow-y-auto`}>
        <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Feed */}
          <div className="lg:col-span-8 order-2 lg:order-1">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-paper-200">
              <div className="flex items-center space-x-3">
                <ScrollText className="w-6 h-6 text-ink/40" />
                <h2 className="text-xl font-bold uppercase tracking-[0.2em] text-ink/60">The Feed</h2>
              </div>

              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-ink/40" />
                <div className="flex bg-paper-200/50 p-1 rounded-sm">
                  {['All', 'Story', 'Poem', 'Article'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setFilter(cat)}
                      className={`px-3 py-1 text-xs font-bold transition-all rounded-sm ${
                        filter === cat ? 'bg-ink text-paper-50' : 'text-ink/40 hover:text-ink/60'
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
                <p className="text-ink/40 font-serif italic text-xl">The archives are empty...</p>
                <button 
                  onClick={() => setUploadOpen(true)}
                  className="mt-6 text-ink font-bold hover:underline"
                >
                  Be the first to publish
                </button>
              </div>
            )}
          </div>

          

          <div className="hidden lg:block lg:col-span-4 order-1 lg:order-2 space-y-8">
            <div className="sticky top-24">
              {user?.role === 'admin' && (
                <button 
                  onClick={() => setAdminOpen(true)}
                  className="w-full mb-8 p-6 bg-ink text-paper-50 flex items-center justify-between group hover:bg-ink/90 transition-all rounded-sm shadow-xl"
                >
                  <div className="flex items-center space-x-3">
                    <ShieldCheck className="w-6 h-6" />
                    <div className="text-left">
                      <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">Admin Dashboard</p>
                      <p className="text-lg font-serif italic">Review Pending Works</p>
                    </div>
                  </div>
                </button>
              )}
              
              <Leaderboard limit={5} showFullLink={true} />
              
              <div className="mt-8 p-6 border border-dashed border-paper-200 rounded-sm">
                <h4 className="text-xs font-bold text-ink/40 uppercase tracking-widest mb-2">About Manuscript</h4>
                <p className="text-sm font-serif italic text-ink/60 leading-relaxed">
                  "A sanctuary for the written word. Where every word is weight, and every author is a legend waiting to be told."
                </p>
              </div>
            </div>
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
    </div>
  </>
  );
}

export default App;
