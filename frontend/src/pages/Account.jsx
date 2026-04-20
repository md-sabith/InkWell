import React from 'react';
import { useStore } from '../store/useStore';
import Navbar from '../components/Navbar';
import UserSidebar from '../components/UserSidebar';
import Auth from '../components/Auth';
import UploadWork from '../components/UploadWork';
import EditProfile from '../components/EditProfile';
import FooterNav from '../components/FooterNav'

import { User, Mail, Calendar, PenTool, Star, Heart, Settings, Shield, Award } from 'lucide-react';
import { format } from 'date-fns';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const Account = () => {
  const { user, userWorks, fetchUserWorks, isSidebarOpen, fetchMe } = useStore();
  const [authOpen, setAuthOpen] = React.useState(false);
  const [uploadOpen, setUploadOpen] = React.useState(false);
  const [editOpen, setEditOpen] = React.useState(false);


  React.useEffect(() => {
    if (user) {
      fetchUserWorks();
      fetchMe();
    }
  }, [user, fetchUserWorks, fetchMe]);

  if (!user) {
    return (
      <div className="min-h-screen bg-paper-100 flex flex-col items-center justify-center p-4">
        <UserSidebar />
        <Navbar onAuthClick={() => setAuthOpen(true)} onUploadClick={() => setUploadOpen(true)} />
        <div className="manuscript-card text-center max-w-md w-full py-12">
          <Shield className="w-16 h-16 text-paper-200 mx-auto mb-4" />
          <h2 className="text-2xl font-serif font-bold text-ink mb-2">Access Denied</h2>
          <p className="text-ink/60 mb-6 ">You must be logged in to view your account details.</p>
          <button
            onClick={() => setAuthOpen(true)}
            className="btn-primary w-full"
          >
            Sign In
          </button>
        </div>
        <Auth isOpen={authOpen} onClose={() => setAuthOpen(false)} />
      </div>
    );
  }

  // Calculate Stats
  const totalWorks = userWorks.length;
  const approvedWorks = userWorks.filter(w => w.status === 'approved').length;
  const totalMarks = userWorks.reduce((acc, curr) => acc + (curr.totalMarks || 0), 0);
  const averageRating = totalWorks > 0
    ? (userWorks.reduce((acc, curr) => acc + (curr.averageRating || 0), 0) / totalWorks).toFixed(1)
    : '0.0';

  return (
    <>
      <UserSidebar />
      <div className="min-h-screen bg-paper-100 pb-20 transition-all duration-300">
        <Navbar
          onAuthClick={() => setAuthOpen(true)}
          onUploadClick={() => setUploadOpen(true)}
        />

        <main className={`transition-all duration-300 ${isSidebarOpen ? 'lg:pl-48' : 'lg:pl-12'} pt-16 flex-1`}>
          <div className="max-w-4xl mx-auto p-4 md:p-12">

            {/* Profile Header */}
            <div className="manuscript-card mb-8 overflow-hidden !p-0">
              <div className="h-32 relative">
                <div className="absolute top-12 left-8">
                  <div className="w-24 h-24 rounded-2xl bg-paper-50 border-4 border-paper-50 shadow-manuscript overflow-hidden">
                    {user.profilePicture ? (
                      <img src={user.profilePicture} alt={user.username} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-paper-200">
                        <User className="w-10 h-10 text-ink/20" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="pt-8 pb-8 px-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                  <h1 className="text-3xl font-serif font-bold text-ink mb-1 uppercase tracking-tight">
                    {user.username}
                  </h1>
                  <p className={cn(
                    "text-[10px] font-bold uppercase tracking-[0.2em] flex items-center",
                    user.status === 'Emperor' ? "text-amber-600" :
                    user.status === 'Legend' ? "text-amber-600" :
                    user.status === 'Master' ? "text-indigo-600" :
                    user.status === 'Pro' ? "text-blue-600" :
                    "text-ink/40"
                  )}>
                    <Award className="w-3 h-3 mr-2" />
                    {user.status || 'Novice'}
                  </p>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={() => setEditOpen(true)}
                    className="flex items-center space-x-2 px-4 py-2 bg-paper-200 hover:bg-paper-300 text-ink text-xs font-bold uppercase tracking-widest rounded-lg transition-all"
                  >
                    <Settings className="w-4 h-4" />
                    <span>Edit Profile</span>
                  </button>

                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { label: 'Manuscripts', value: totalWorks, icon: PenTool, color: 'text-blue-500' },
                { label: 'Approved', value: approvedWorks, icon: Shield, color: 'text-green-500' },
                { label: 'Total Points', value: totalMarks, icon: Star, color: 'text-accent' },
                { label: 'Avg Rating', value: averageRating, icon: Award, color: 'text-purple-500' },
              ].map((stat, i) => (
                <div key={i} className="manuscript-card flex flex-col items-center justify-center text-center p-6">
                  <stat.icon className={`w-6 h-6 ${stat.color} mb-2`} />
                  <span className="text-2xl font-bold text-ink">{stat.value}</span>
                  <span className="text-[10px] font-bold text-ink/40 uppercase tracking-widest">{stat.label}</span>
                </div>
              ))}
            </div>

            {/* Information Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="manuscript-card">
                <h2 className="text-lg font-bold uppercase tracking-widest text-ink/60 mb-6 pb-2 border-b border-paper-200">
                  Identity Details
                </h2>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-paper-100 rounded-xl">
                      <Mail className="w-5 h-5 text-ink" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-ink/30 uppercase tracking-widest">Email Address</p>
                      <p className="text-ink font-serif text-lg">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-paper-100 rounded-xl">
                      <Calendar className="w-5 h-5 text-ink" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-ink/30 uppercase tracking-widest">Joined the Guild</p>
                      <p className="text-ink font-serif text-lg">
                        {user.createdAt ? format(new Date(user.createdAt), 'MMMM do, yyyy') : 'Recently'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="manuscript-card">
                <h2 className="text-lg font-bold uppercase tracking-widest text-ink/60 mb-6 pb-2 border-b border-paper-200">
                  Account Status
                </h2>
                <div className="space-y-4 pb-4">
                  <div className="flex items-center justify-between p-4 bg-paper-100 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <Shield className="w-5 h-5 text-green-600" />
                      <span className="text-sm font-bold text-ink">Account Verified</span>
                    </div>
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-paper-100 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <Star className="w-5 h-5 text-accent" />
                      <span className="text-sm font-bold text-ink">{user.status || 'Novice'} Rank</span>
                    </div>
                    <span className={cn(
                      "text-[10px] font-bold px-2 py-1 rounded",
                      user.status === 'Emperor' ? "text-amber-700 bg-amber-100" :
                      user.status === 'Legend' ? "text-amber-600 bg-amber-50" :
                      user.status === 'Master' ? "text-indigo-600 bg-indigo-50" :
                      user.status === 'Pro' ? "text-blue-600 bg-blue-50" :
                      "text-ink/40 bg-paper-200"
                    )}>ACTIVE</span>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </main>

        <Auth isOpen={authOpen} onClose={() => setAuthOpen(false)} />
        <UploadWork isOpen={uploadOpen} onClose={() => setUploadOpen(false)} />
        <EditProfile isOpen={editOpen} onClose={() => setEditOpen(false)} />
      </div>
      <FooterNav onUploadClick={() => setUploadOpen(true)} />
    </>
  );
};

export default Account;
