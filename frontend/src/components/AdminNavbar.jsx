import React from 'react';
import { useStore } from '../store/useStore';
import {
  LogOut,
  User,
  Menu,
  ShieldCheck,
  Bell,
  Search,
  Settings,
  Circle
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const AdminNavbar = () => {
  const { user, logout, isSidebarOpen, setSidebarOpen } = useStore();
  const location = useLocation();

  // Determine breadcrumb based on path
  const getBreadcrumb = () => {
    const path = location.pathname;
    if (path.includes('dashboard')) return 'Main Dashboard';
    if (path.includes('pending')) return 'Pending Review';
    if (path.includes('feed')) return 'Live Feed';
    if (path.includes('leaderboard')) return 'Hall of Fame';
    return 'Control Center';
  };

  return (
    <nav className={`fixed top-0 right-0 z-30 h-20 bg-paper-50/70 backdrop-blur-xl border-b border-paper-200 transition-all duration-500 ease-in-out ${isSidebarOpen ? 'left-48' : 'left-0 lg:left-12'}`}>
      <div className="h-full px-6 md:px-10 flex items-center justify-between max-w-[1600px] mx-auto">

        {/* Left Section: Context & Navigation */}
        <div className="flex items-center space-x-6">
          

          <div className="flex flex-col">
            <div className="flex items-center space-x-2 text-[16px] font-bold uppercase tracking-[0.2em] text-ink/30">
              <ShieldCheck className="w-6 h-6 text-accent" />
              <span className='hidden sm:flex'>Authority</span>
              <span className="text-ink/10 hidden sm:flex">/</span>
              <span className="text-ink/60">{getBreadcrumb()}</span>
            </div>
          </div>
        </div>

        {/* Right Section: Admin Actions & Profile */}
        <div className="flex items-center space-x-2 md:space-x-15">

          <div className="h-8 w-[2px] bg-ink/5 mx-2 hidden sm:block"></div>

          {/* User Profile */}
          {user && (
            <div className="flex items-center space-x-3 md:space-x-4">
              <div className="flex flex-col items-end hidden sm:flex">
                <span className="text-sm font-bold text-ink leading-none">{user.username}</span>
                <span className="text-[12px] font-bold uppercase tracking-tight text-ink/40">Super Admin</span>
              </div>

              <div className="relative group cursor-pointer">
                <div className="w-10 h-10 rounded-xl bg-ink text-paper-50 flex items-center justify-center overflow-hidden border border-paper-200 shadow-sm transition-transform group-hover:scale-105 active:scale-95">
                  {user.profilePicture ? (
                    <img src={user.profilePicture} alt="Admin" className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-5 h-5 opacity-80" />
                  )}
                </div>

                {/* Simple Dropdown Hover Indicator or just refined look */}
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-paper-50 rounded-full border border-ink/5 flex items-center justify-center shadow-sm">
                  <Settings className="w-2.5 h-2.5 text-ink/40" />
                </div>
              </div>

              <button
                onClick={logout}
                className="p-2.5 text-ink/30 hover:text-red-500 hover:bg-red-50 rounded-full transition-all md:ml-2"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
