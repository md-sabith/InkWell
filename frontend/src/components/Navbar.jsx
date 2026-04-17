import React from 'react';
import { useStore } from '../store/useStore';
import { LogOut, Plus, User, Book, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = ({ onUploadClick }) => {
  const { user, logout, isSidebarOpen, setSidebarOpen } = useStore();

  return (
    <nav className={`sticky top-0 z-10 bg-paper-50/80 backdrop-blur-md border-b border-paper-200 py-4 px-4 md:px-8 transition-all duration-300 ${isSidebarOpen ? 'lg:pl-72' : 'lg:pl-0'}`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          {!isSidebarOpen && (
            <button 
              onClick={() => setSidebarOpen(true)}
              className="p-2 hover:bg-paper-200 rounded-lg transition-all lg:hidden"
            >
              <Menu className="w-6 h-6 text-ink" />
            </button>
          )}
          <div className="flex items-center space-x-2">
            <Book className="w-8 h-8 text-ink" />
            <h1 className="text-xl md:text-2xl font-serif font-bold tracking-tight">MANUSCRIPT</h1>
          </div>
        </div>

        <div className="flex items-center space-x-3 md:space-x-6">
          {user ? (
            <>
              <button 
                onClick={onUploadClick}
                className="flex items-center space-x-2 text-ink/60 hover:text-ink transition-colors font-medium border-r border-paper-200 pr-3 md:pr-6"
              >
                <span className="hidden xs:inline">Publish</span>
                <Plus className="w-4 h-4" />
              </button>
              
              <div className="flex items-center space-x-2 md:space-x-4">
                <div className="flex items-center space-x-2">
                  <span className="text-xs md:text-sm font-bold hidden sm:inline">{user.username}</span>
                  <div className="w-8 h-8 bg-ink rounded-full flex items-center justify-center text-paper-50 overflow-hidden border border-paper-200 shadow-sm shrink-0">
                    {user.profilePicture ? (
                      <img src={user.profilePicture} alt="User" className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-4 h-4" />
                    )}
                  </div>
                </div>
                
                <button 
                  onClick={logout}
                  className="p-1 md:p-2 text-ink/40 hover:text-red-500 transition-colors"
                >
                  <LogOut className="w-4 h-4 md:w-5 h-5" />
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center space-x-3">
              <Link to="/login">
              <button className="btn-primary py-1.5 px-4 text-sm md:py-2 md:px-6 md:text-base">
                Sign In
              </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
