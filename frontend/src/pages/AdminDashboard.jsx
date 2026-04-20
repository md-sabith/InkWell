import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import {
  ClipboardList,
  Trophy,
  ScrollText,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Clock,
  LayoutDashboardIcon
} from 'lucide-react';
import SideBar from '../components/SideBar';
import AdminNavbar from '../components/AdminNavbar';
import AdminFooterNav from '../components/AdminFooterNav';

const AdminDashboard = () => {
  const {
    pendingWorks,
    fetchPendingWorks,
    leaderboard,
    fetchLeaderboard,
    works,
    fetchWorks,
    isSidebarOpen
  } = useStore();

  React.useEffect(() => {
    fetchPendingWorks();
    fetchLeaderboard();
    fetchWorks();
  }, []);

  const stats = [
    {
      label: 'Pending Review',
      value: pendingWorks.length,
      icon: ClipboardList,
      color: 'text-accent',
      bg: 'bg-accent/10',
      link: '/admin/pending'
    },
    {
      label: 'Live Archives',
      value: works.length,
      icon: ScrollText,
      color: 'text-blue-500',
      bg: 'bg-blue-50',
      link: '/admin/feed'
    },
    {
      label: 'Top Legends',
      value: leaderboard.topAuthors?.length || 0,
      icon: Trophy,
      color: 'text-purple-500',
      bg: 'bg-purple-50',
      link: '/admin/leaderboard'
    }
  ];

  return (
    <div className="min-h-screen bg-paper-100 flex">
      <SideBar />
      <AdminNavbar />

      <main className={`transition-all duration-500 ease-in-out ${isSidebarOpen ? 'lg:pl-48' : 'lg:pl-12'} flex-1 pt-20 overflow-y-auto`}>
        <div className="p-4 md:p-12">
          <header className="mb-10">
            <div className="flex items-center space-x-4 mb-3">
              <div className="p-3">
                <LayoutDashboardIcon className="w-12 h-12 text-accent" />
              </div>
              <div>
                <h1 className="text-4xl font-serif font-black uppercase tracking-widest text-ink">Authority Hub</h1>
                <p className="text-sm text-ink/40 font-bold uppercase tracking-[0.3em]">Command Center for Manuscript Curation</p>
              </div>
            </div>
          </header>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {stats.map((stat) => (
              <Link
                key={stat.label}
                to={stat.link}
                className="manuscript-card group hover:scale-[1.02] transition-all duration-300 relative overflow-hidden"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-ink/40 mb-1">{stat.label}</p>
                    <h2 className="text-4xl font-serif font-bold text-ink">{stat.value}</h2>
                  </div>
                  <div className={`p-4 rounded-xl ${stat.bg} ${stat.color} transition-transform group-hover:rotate-12`}>
                    <stat.icon className="w-8 h-8" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-[10px] font-bold uppercase tracking-widest text-ink/20 group-hover:text-ink/60 transition-colors">
                  <span>Access Terminal</span>
                  <ArrowRight className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Quick Actions & Pending Preview */}
            <div className="space-y-8">
              <div className="flex items-center space-x-3 mb-6">
                <Clock className="w-5 h-5 text-accent" />
                <h3 className="text-lg font-serif font-bold uppercase tracking-widest text-ink">Awaiting Decision</h3>
              </div>

              <div className="space-y-4">
                {pendingWorks.slice(0, 3).map((work) => (
                  <div key={work._id} className="p-5 bg-paper-50 border border-paper-200 rounded-sm hover:border-ink/20 transition-all flex items-center justify-between group">
                    <div>
                      <h4 className="font-serif font-bold text-ink ">{work.title}</h4>
                      <p className="text-[10px] text-ink/40 font-bold uppercase tracking-wider">by {work.author?.username}</p>
                    </div>
                    <Link to="/admin/pending" className="p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowRight className="w-5 h-5 text-ink" />
                    </Link>
                  </div>
                ))}
                {pendingWorks.length === 0 && (
                  <div className="py-12 text-center border border-dashed border-paper-200 rounded-sm">
                    <ShieldCheck className="w-10 h-10 text-ink/10 mx-auto mb-3" />
                    <p className="text-sm font-serif  text-ink/30">Curation queue is currently clear.</p>
                  </div>
                )}
                <Link
                  to="/admin/pending"
                  className="block text-center py-4 border border-ink text-ink font-bold uppercase tracking-widest text-xs hover:bg-ink hover:text-paper-50 transition-all"
                >
                  View All Pending ({pendingWorks.length})
                </Link>
              </div>
            </div>

            {/* Hall of Fame Preview */}
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <TrendingUp className="w-5 h-5 text-purple-500" />
                <h3 className="text-lg font-serif font-bold uppercase tracking-widest text-ink">Trending Legends</h3>
              </div>

              <div className="manuscript-card bg-ink text-paper-50 p-6">
                <div className="space-y-6">
                  {leaderboard.topAuthors?.slice(0, 5).map((author, index) => (
                    <div key={author._id} className="flex items-center justify-between border-b border-paper-50/60 pb-4 last:border-0 last:pb-0">
                      <div className="flex items-center space-x-4">
                        <span className="text-2xl font-serif  text-ink">#0{index + 1}</span>
                        <div>
                          <p className="font-bold uppercase tracking-widest text-ink/70 text-sm">{author.username}</p>
                          <p className="text-[10px] text-ink uppercase tracking-tighter">{author.status || 'Novice'} Author</p>
                        </div>
                      </div>
                      <div className="text-right text-ink">
                        <p className="text-xl font-serif font-bold">{author.totalMarks}</p>
                        <p className="text-[8px] uppercase tracking-widest opacity-40">Cumulative Score</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Link
                  to="/admin/leaderboard"
                  className="mt-8 flex items-center justify-center space-x-2 text-[10px] font-black uppercase tracking-[0.3em] text-ink hover:text-ink transition-colors"
                >
                  <span>Expand Hall of Fame</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <AdminFooterNav />
    </div>
  );
};

export default AdminDashboard;
