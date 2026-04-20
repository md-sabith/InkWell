import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { LayoutDashboard, ClipboardList, ScrollText, Trophy, LogOut } from 'lucide-react';

const AdminFooterNav = () => {
    const { logout, setSidebarOpen } = useStore();
    const navigate = useNavigate();

    const navItems = [
        { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dash' },
        { to: '/admin/pending', icon: ClipboardList, label: 'Review' },
        { to: '/admin/feed', icon: ScrollText, label: 'Feed' },
        { to: '/admin/leaderboard', icon: Trophy, label: 'Hall' },
    ];

    const handleLogout = () => {
        logout();
        navigate('/admin');
        setSidebarOpen(false);
    };

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 h-16 bg-ink/80 backdrop-blur-xl border-t border-paper-50/10 md:hidden flex items-center justify-around px-4">
            {navItems.map((item) => (
                <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                        `flex flex-col items-center justify-center space-y-1 transition-all duration-300 ${isActive ? 'text-paper scale-110' : 'text-paper-50/40 hover:text-paper-50/70'
                        }`
                    }
                >
                    <item.icon className="w-6 h-6" />
                    <span className="text-[10px] font-bold uppercase tracking-tighter">{item.label}</span>
                </NavLink>
            ))}

            <button
                onClick={handleLogout}
                className="flex flex-col items-center justify-center space-y-1 text-red-400/70 hover:text-red-400 transition-all duration-300"
            >
                <LogOut className="w-6 h-6" />
                <span className="text-[10px] font-bold uppercase tracking-tighter">Exit</span>
            </button>
        </nav>
    );
};

export default AdminFooterNav;
