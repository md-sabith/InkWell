import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { LogOut, ShieldCheck, PanelLeftOpen, PanelLeftClose, Home, FileClock } from 'lucide-react';

function SideBar() {
    const { logout, isSidebarOpen, setSidebarOpen, user } = useStore();
    const navigate = useNavigate();

    if (!isSidebarOpen) {
        return (
            <div className='hidden lg:flex w-16 h-screen bg-ink text-paper-50 flex-col z-50 fixed left-0 top-0 shadow-2xl items-center pt-4'>
                <button
                    onClick={() => setSidebarOpen(true)}
                    className="p-5 hover:bg-paper-50/10 transition-all"
                    title="Open Sidebar"
                >
                    <PanelLeftOpen className="h-8 w-8" />
                </button>

                <div className="mt-4 p-2 bg-paper-50/10 rounded-lg">
                    <ShieldCheck className="w-6 h-6 text-white" />
                </div>

                <nav className="flex-1 p-6 space-y-4 mt-4">
                    <Link to="/admin/dashboard" title="Admin Dashboard">
                        <div className="p-2 hover:bg-paper-50/10 rounded-lg transition-all">
                            <FileClock className="w-6 h-6 opacity-70 hover:opacity-100" />
                        </div>
                    </Link>
                    <Link to="/admin/feed" title="Admin Live Feed">
                        <div className="p-2 hover:bg-paper-50/10 rounded-lg transition-all">
                            <Home className="w-6 h-6 opacity-70 hover:opacity-100" />
                        </div>
                    </Link>
                </nav>

                <button
                    onClick={() => {
                        logout();
                        navigate('/');
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

            <aside className="w-72 h-screen bg-ink text-paper-50 flex flex-col z-50 fixed left-0 top-0 shadow-2xl border-r border-paper-50/5">
                <div className="p-8 border-b border-paper-50/10 relative group">
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="absolute top-4 right-2 p-2 text-paper-50/40 hover:text-paper-50 hover:bg-paper-50/10 rounded-full transition-all"
                        title="Close Sidebar"
                    >
                        <PanelLeftClose className="h-8 w-8" />
                    </button>

                    <div className="flex items-center space-x-3 mb-2 pt-8">
                        <div className="p-3 bg-paper-50/10 rounded-xl">
                            <ShieldCheck className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-xl font-black uppercase tracking-[0.2em]">Authority</h1>
                            <p className="text-[10px] opacity-40 uppercase tracking-[0.3em] font-bold">Control Center</p>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 p-6 space-y-4 overflow-y-auto">
                    <Link to="/admin/dashboard" className="flex items-center space-x-4 p-4 rounded-xl hover:bg-paper-50/5 transition-all group border border-transparent hover:border-paper-50/10">
                        <div className="p-2 bg-paper-50/10 rounded-lg group-hover:bg-paper-50/20 transition-all">
                            <FileClock className="w-4 h-4 opacity-70 group-hover:opacity-100" />
                        </div>
                        <span className="text-sm font-bold uppercase tracking-widest text-paper-50/80 group-hover:text-paper-50">Pending Review</span>
                    </Link>

                    <Link to="/admin/feed" className="flex items-center space-x-4 p-4 rounded-xl hover:bg-paper-50/5 transition-all group border border-transparent hover:border-paper-50/10">
                        <div className="p-2 bg-paper-50/5 rounded-lg group-hover:bg-paper-50/10 transition-all">
                            <Home className="w-4 h-4 opacity-40 group-hover:opacity-100" />
                        </div>
                        <span className="text-sm font-bold uppercase tracking-widest text-paper-50/40 group-hover:text-paper-50">View Live Feed</span>
                    </Link>
                </nav>

                <div className="p-6 border-t border-paper-50/10 bg-black/20">
                    <button
                        onClick={() => {
                            logout();
                            navigate('/');
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
