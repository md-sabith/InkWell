import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { LogOut, ShieldCheck, PanelLeftOpen, PanelLeftClose, Scroll, LayoutDashboardIcon, ScrollText, Trophy, ClipboardList } from 'lucide-react';

function SideBar() {
    const { logout, isSidebarOpen, setSidebarOpen, user } = useStore();
    const navigate = useNavigate();

    if (!isSidebarOpen) {
        return (
            <div className='hidden lg:flex w-12 h-screen bg-paper-50 text-ink flex-col z-50 fixed left-0 top-0 shadow-sm border-r border-paper-200 items-center pt-4'>
                <button
                    onClick={() => setSidebarOpen(true)}
                    className="p-2 hover:bg-paper-100 transition-all"
                    title="Open Sidebar"
                >
                    <PanelLeftOpen className="h-6 w-6" />
                </button>

                <div className="mt-4 p-2">
                    <ShieldCheck className="w-6 h-6 text-accent" />
                </div>

                <nav className="flex-1 p-6 space-y-4 overflow-y-auto mt-4">
                    <Link to="/admin/dashboard" title="Admin Dashboard">
                        <div className="p-2 hover:bg-paper-50/10 rounded-lg transition-all">
                            <LayoutDashboardIcon className="w-6 h-6 opacity-70 hover:opacity-100" />
                        </div>
                    </Link>
                    <Link to="/admin/pending" title="Pending Review">
                        <div className="p-2 hover:bg-paper-50/10 rounded-lg transition-all">
                            <ClipboardList className="w-6 h-6 opacity-70 hover:opacity-100" />
                        </div>
                    </Link>
                    <Link to="/admin/feed" title="Admin Live Feed">
                        <div className="p-2 hover:bg-paper-50/10 rounded-lg transition-all">
                            <ScrollText className="w-6 h-6 opacity-70 hover:opacity-100" />
                        </div>
                    </Link>
                    <Link to="/admin/leaderboard" title="Admin Hall of Fame">
                        <div className="p-2 hover:bg-paper-50/10 rounded-lg transition-all">
                            <Trophy className="w-6 h-6 opacity-70 hover:opacity-100" />
                        </div>
                    </Link>
                </nav>

                <button
                    onClick={() => {
                        logout();
                        navigate('/admin');
                        setSidebarOpen(false);
                    }}
                    className="p-5 text-red-400 hover:bg-red-500/10 transition-all"
                    title="Sign Out"
                >
                    <LogOut className="w-6 h-6" />
                </button>
            </div>
        );
    }

    return (
        <>
            <div
                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
                onClick={() => setSidebarOpen(false)}
            />

            <aside className="w-48 h-screen bg-paper-50 text-ink flex flex-col z-50 fixed left-0 top-0 shadow-sm border-r border-paper-200">
                <div className="border-b border-paper-50/10 relative group">
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="absolute top-4 right-2 p-2 text-ink/40 hover:text-accent hover:bg-paper-100 rounded-full transition-all"
                        title="Close Sidebar"
                    >
                        <PanelLeftClose className="h-6 w-6" />
                    </button>

                    <div className="flex items-center space-x-3 mb-2 mt-16 p-2">
                        <div className="rounded-xl">
                            <ShieldCheck className="w-7 h-7 text-accent" />
                        </div>
                        <div>
                            <h1 className="text-md font-black uppercase tracking-[0.2em]">Authority</h1>
                            <p className="text-[8px] opacity-40 uppercase tracking-[0.3em] font-bold">Control Center</p>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 p-1 space-y-4 overflow-y-auto mt-4">
                    <Link to="/admin/dashboard" className="flex items-center space-x-4 p-2 rounded-xl hover:bg-paper-100 transition-all group border border-transparent hover:border-paper-200">
                        <div className="rounded-lg">
                            <LayoutDashboardIcon className="w-6 h-6 opacity-70 group-hover:opacity-100" />
                        </div>
                        <span className="text-[12px] font-bold uppercase tracking-widest text-ink/60 group-hover:text-accent">Main Dashboard</span>
                    </Link>

                    <Link to="/admin/pending" className="flex items-center space-x-4 p-2 rounded-xl hover:bg-paper-100 transition-all group border border-transparent hover:border-paper-200">
                        <div className="rounded-lg">
                            <ClipboardList className="w-6 h-6 opacity-70 group-hover:opacity-100" />
                        </div>
                        <span className="text-[12px] font-bold uppercase tracking-widest text-ink/60 group-hover:text-accent">Pending Review</span>
                    </Link>

                    <Link to="/admin/feed" className="flex items-center space-x-4 p-2 rounded-xl hover:bg-paper-100 transition-all group border border-transparent hover:border-paper-200">
                        <div className="rounded-lg">
                            <ScrollText className="w-6 h-6 opacity-70 group-hover:opacity-100" />
                        </div>
                        <span className="text-[12px] font-bold uppercase tracking-widest text-ink/60 group-hover:text-accent">View Live Feed</span>
                    </Link>

                    <Link to="/admin/leaderboard" className="flex items-center space-x-4 p-2 rounded-xl hover:bg-paper-100 transition-all group border border-transparent hover:border-paper-200">
                        <div className="rounded-lg">
                            <Trophy className="w-6 h-6 opacity-70 group-hover:opacity-100" />
                        </div>
                        <span className="text-[12px] font-bold uppercase tracking-widest text-ink/60 group-hover:text-accent">Hall of Fame</span>
                    </Link>
                </nav>

                <div className="p-4 border-t border-paper-200">
                    <button
                        onClick={() => {
                            logout();
                            navigate('/admin');
                            setSidebarOpen(false);
                        }}
                        className="w-full flex items-center justify-center space-x-3 p-4 text-red-400 hover:bg-red-500/10 rounded-xl transition-all border border-red-500/20 hover:border-red-500/40 group"
                    >
                        <LogOut className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        <span className="text-sm font-bold uppercase tracking-widest">Sign Out</span>
                    </button>
                </div>
            </aside>
        </>
    );
}

export default SideBar;
