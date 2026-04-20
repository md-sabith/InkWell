import React from 'react';
import { useStore } from '../store/useStore';
import { LogOut, Plus, User, Book, HomeIcon, Pen, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';

const FooterNav = ({ onUploadClick }) => {
  const { user, logout, isSidebarOpen } = useStore();

  return (
    <nav className={`fixed bottom-0 left-0 right-0 z-30 h-16 bg-ink backdrop-blur-md border-b border-paper-200 transition-all duration-300 md:hidden ${isSidebarOpen ? 'left-0 lg:left-48' : 'left-0 lg:left-12'}`}>
      <div className="h-full px-2 sm:px-4 md:px-8 flex justify-between items-center px-6">
        <Link to='/'>
          <div className='flex items-center'>
            <HomeIcon className="w-6 h-6 sm:w-8 h-8 text-paper-50" />
          </div>
        </Link>
        <Link to='/user-works'>
          <div className='flex items-center'>
            <Pen className="w-6 h-6 sm:w-8 h-8 text-paper-50" />
          </div>
        </Link>
        <div className='flex items-center p-4 rounded-full bg-paper-200'>
          <button 
            onClick={onUploadClick}
            className="flex items-center space-x-2 text-ink hover:text-ink transition-colors font-medium"
          >
            <Plus className="w-10 h-10 text-ink" />
          </button>
        </div>
        <Link to='/leaderboard'>
          <div className='flex items-center'>
            <Trophy className="w-6 h-6 sm:w-8 h-8 text-paper-50" />
          </div>
        </Link>
        <Link to='/account'>
          <div className='flex items-center'>
            <User className="w-6 h-6 sm:w-8 h-8 text-paper-50" />
          </div>
        </Link>

      </div>
    </nav>
  );
};

export default FooterNav;
