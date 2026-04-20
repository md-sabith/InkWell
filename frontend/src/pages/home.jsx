import React from 'react';
import { useStore } from '../store/useStore';
import Navbar from '../components/Navbar';
import UserSidebar from '../components/UserSidebar';
import WorkCard from '../components/WorkCard';
import Auth from '../components/Auth';
import FooterNav from '../components/FooterNav';
import UploadWork from '../components/UploadWork';
import { BookText, ScrollText, Filter, ShieldCheck, HomeIcon } from 'lucide-react';
import Loading from '../components/Loading';


function App() {
  const { works, fetchWorks, loading, user, isSidebarOpen } = useStore();
  const [authOpen, setAuthOpen] = React.useState(false);
  const [uploadOpen, setUploadOpen] = React.useState(false);
  const [filter, setFilter] = React.useState('All');

  React.useEffect(() => {
    fetchWorks();
  }, []);

  const filteredWorks = filter === 'All'
    ? works
    : works.filter(w => w.category === filter);

  return (
    <>
      <UserSidebar className="hidden md:block" />
      <div className="min-h-screen bg-paper-100 pb-20 transition-all duration-300">

        <Navbar
          onAuthClick={() => setAuthOpen(true)}
          onUploadClick={() => setUploadOpen(true)}
        />


        <main className={`transition-all duration-300 ${isSidebarOpen ? 'lg:pl-48' : 'lg:pl-12'} pt-16 flex-1`}>
          <div className="p-4 md:p-8 lg:p-10 mt-2 md:mt-4">
            <div className="mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* Main Feed */}
                <div className="lg:col-span-8 order-2 lg:order-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 pb-8 border-b border-paper-200 gap-4">
                    <div className="flex items-center space-x-3">
                      <HomeIcon className="w-10 h-10 text-accent" />
                      <h2 className="text-3xl font-bold uppercase tracking-[0.2em] text-ink font-serif">The Feed</h2>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Filter className="w-4 h-4 text-ink/40" />
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
                    <Loading />
                  ) : filteredWorks.length > 0 ? (

                    <div className="space-y-8 mt-6">
                      {filteredWorks.map(work => (
                        <WorkCard key={work._id} work={work} />
                      ))}
                    </div>
                  ) : (
                    <div className="manuscript-card text-center py-20">
                      <BookText className="w-16 h-16 text-paper-200 mx-auto mb-4" />
                      <p className="text-ink/40 font-serif  text-xl">The archives are empty...</p>
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



                    <div className="mt-8 p-6 border border-dashed border-paper-200 rounded-sm">
                      <h4 className="text-xs font-bold text-ink/40 uppercase tracking-widest mb-2">About Manuscript</h4>
                      <p className="text-sm font-serif text-ink/60 leading-relaxed">
                        "A sanctuary for the written word. Where every word is weight, and every author is a legend waiting to be told."
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </main>

        <Auth isOpen={authOpen} onClose={() => setAuthOpen(false)} />
        <UploadWork isOpen={uploadOpen} onClose={() => setUploadOpen(false)} />
        <FooterNav
          onUploadClick={() => setUploadOpen(true)}
        />
      </div>
    </>
  );
}

export default App;
