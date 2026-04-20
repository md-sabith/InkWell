import React from 'react';
import { useStore } from '../store/useStore';
import Navbar from '../components/Navbar';
import UserSidebar from '../components/UserSidebar';
import WorkCard from '../components/WorkCard';
import Auth from '../components/Auth';
import FooterNav from '../components/FooterNav';
import UploadWork from '../components/UploadWork';
import { BookText, ScrollText, Filter, Loader2, PenLine, Pen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';


const UserWorks = () => {
  const { user, userWorks, fetchUserWorks, loading, isSidebarOpen } = useStore();
  const [authOpen, setAuthOpen] = React.useState(false);
  const [uploadOpen, setUploadOpen] = React.useState(false);
  const [filter, setFilter] = React.useState('All');
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!user) {
      // If no user is logged in, you might want to redirect or show auth
      // For now, let's just fetch if user exists
    } else {
      fetchUserWorks();
    }
  }, [user, fetchUserWorks]);

  const filteredWorks = filter === 'All'
    ? userWorks
    : userWorks.filter(w => w.status === filter.toLowerCase() || w.category === filter);

  if (!user) {
    return (
      <>
        <UserSidebar />
        <Navbar onAuthClick={() => setAuthOpen(true)} onUploadClick={() => setUploadOpen(true)} />
        <div className="min-h-screen bg-paper-100 flex flex-col">

          <main className={`transition-all duration-300 ${isSidebarOpen ? 'lg:pl-48' : 'lg:pl-12'} pt-16 flex-1 flex items-center justify-center p-4 md:p-8`}>
            <div className="manuscript-card text-center w-full py-12">
              <PenLine className="w-16 h-16 text-paper-200 mx-auto mb-4" />
              <h2 className="text-2xl font-serif font-bold text-ink mb-2">Identify Yourself</h2>
              <p className="text-ink/60 mb-6 ">To view your personal archives, you must first sign the register.</p>
              <button
                onClick={() => setAuthOpen(true)}
                className="btn-primary w-full"
              >
                Sign In
              </button>
            </div>
          </main>
          <Auth isOpen={authOpen} onClose={() => setAuthOpen(false)} />
        </div>
      </>
    );
  }

  return (
    <>
      <UserSidebar />
      <div className="min-h-screen bg-paper-100 pb-20 transition-all duration-300">
        <Navbar
          onAuthClick={() => setAuthOpen(true)}
          onUploadClick={() => setUploadOpen(true)}
        />

        <main className={`transition-all duration-300 ${isSidebarOpen ? 'lg:pl-48' : 'lg:pl-12'} pt-16 flex-1 p-4 md:p-8 lg:p-12 overflow-y-auto`}>
          <div className="max-w-5xl mx-auto py-8 mt-4 md:mt-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-12 border-b border-paper-200 pb-8 gap-6">
              <div className="flex items-center space-x-3">
                <Pen className="w-10 h-10 text-accent" />
                <h2 className="text-3xl font-bold uppercase tracking-[0.2em] text-ink font-serif">My Works</h2>
              </div>

              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-ink/40" />
                <div className="flex bg-paper-200/50 p-1 rounded-sm">
                  {['All', 'Approved', 'Pending', 'Rejected'].map((status) => (
                    <button
                      key={status}
                      onClick={() => setFilter(status)}
                      className={`px-3 py-1 text-xs font-bold transition-all rounded-sm ${filter === status ? 'bg-ink text-paper-50' : 'text-ink/40 hover:text-ink/60'
                        }`}
                    >
                      {status.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {loading ? (
              <Loading />
            ) : filteredWorks.length > 0 ? (

              <div className="space-y-8">
                {filteredWorks.map(work => (
                  <div key={work._id} className="relative">
                    
                      <div className={`absolute top-4 right-4 z-10 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${work.status === 'pending' ? 'bg-amber-100 text-amber-700' : work.status === 'approved' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                        {work.status}
                      </div>
                    
                    <WorkCard work={work} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="manuscript-card text-center py-20">
                <BookText className="w-16 h-16 text-paper-200 mx-auto mb-4" />
                <p className="text-ink/40 font-serif  text-xl">You haven't added anything to the archives yet...</p>
                <button
                  onClick={() => setUploadOpen(true)}
                  className="mt-6 text-ink font-bold hover:underline"
                >
                  Write your first masterpiece
                </button>
              </div>
            )}
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

export default UserWorks;
