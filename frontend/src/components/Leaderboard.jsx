import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { Trophy, Users, BookOpen, Crown, User, ChevronRight } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const getRankLabel = (index) => {
  const rank = index + 1;
  if (rank == 1) return {
    text: 'EMPEROR',
    className: 'text-amber-700 border-amber-500 bg-amber-500/10',
    borderClass: 'border-amber-500',
  }
  if (rank <= 10) return {
    text: 'LEGEND',
    className: 'text-amber-500 border-amber-300 bg-amber-300/10',
    borderClass: 'border-amber-300',
  }
  if (rank <= 50) return { 
    text: 'MASTER', 
    className: 'text-indigo-700 border-indigo-400 bg-indigo-400/10',
    borderClass: 'border-indigo-400' 
  };
  if (rank <= 100) return { 
    text: 'PRO', 
    className: 'text-blue-700 border-blue-400 bg-blue-400/10',
    borderClass: 'border-blue-400' 
  };

  return { text: 'NOVICE', className: 'text-ink/40 border-ink/5 bg-paper-100/30', borderClass: 'border-paper-200' };
};
  
const Leaderboard = ({ limit, showFullLink }) => {
  const { leaderboard, fetchLeaderboard } = useStore();
  const [activeTab, setActiveTab] = React.useState('authors');

  React.useEffect(() => {
    fetchLeaderboard();
  }, []);

  const displayWorks = limit ? leaderboard.topWorks.slice(0, limit) : leaderboard.topWorks;
  const displayAuthors = limit ? leaderboard.topAuthors.slice(0, limit) : leaderboard.topAuthors;

  return (
    <div className="manuscript-card md:w-240">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <Trophy className="w-8 h-8 text-accent" />
          <h2 className="text-2xl font-serif font-bold">Hall of Fame</h2>
        </div>

        <div className="flex bg-paper-100 p-1 rounded-sm border border-paper-200">
          <button
            onClick={() => setActiveTab('authors')}
            className={cn(
              "flex items-center space-x-2 px-4 py-1.5 text-sm font-medium transition-all rounded-sm",
              activeTab === 'authors' ? "bg-paper-50 shadow-sm text-ink" : "text-ink/40 hover:text-ink/60"
            )}
          >
             <Users className="w-4 h-4" />
            <span className={limit ? "hidden sm:inline" : ""}>Authors</span>
            
          </button>
          <button
            onClick={() => setActiveTab('works')}
            className={cn(
              "flex items-center space-x-2 px-4 py-1.5 text-sm font-medium transition-all rounded-sm",
              activeTab === 'works' ? "bg-paper-50 shadow-sm text-ink" : "text-ink/40 hover:text-ink/60"
            )}
          >
           
            <BookOpen className="w-4 h-4" />
            <span className={limit ? "hidden sm:inline" : ""}>Works</span>
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {activeTab === 'works' ? (
          displayWorks.map((work, index) => (
            <div 
              key={work._id} 
              className={cn(
                "flex items-center justify-between p-4 bg-paper-100/50 border-l-4 group transition-all",
                getRankLabel(index).borderClass
              )}
            >
              <div className="flex items-center space-x-4">
                <span className="text-2xl font-serif  text-ink/20 w-8">{index + 1}</span>
                <div className="relative">
                  {work.author?.profilePicture ? (
                    <img src={work.author.profilePicture} alt={work.author.username} className="w-10 h-10 rounded-full object-cover border border-accent/20" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-paper-200 flex items-center justify-center">
                      <User className="w-5 h-5 text-ink/20" />
                    </div>
                  )}
                  {index < 3 && <div className={cn("absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold",
                    index === 0 ? "bg-amber-500 text-white" : "bg-paper-300 text-amber-400")}>★</div>}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-serif font-bold text-lg group-hover:text-accent transition-colors uppercase leading-none">
                      {work.title}
                    </h3>
                    
                  </div>
                  <p className="text-[10px] text-ink/60">by {work.author?.username}</p>
                </div>
              </div>
                <div className="text-right">
                <div className='mb-2'>
                    <p className="text-[7px] font-black uppercase tracking-widest text-ink/30 mb-1">Rank Status</p>
                    {getRankLabel(index) && (
                      <span className={cn(
                        "text-[10px] font-bold px-1.5 py-0.5 rounded-full border tracking-widest",
                        getRankLabel(index).className
                      )}>
                        {getRankLabel(index).text}
                      </span>
                    )}
                    </div>
                <span className={cn("font-bold text-ink", limit ? "text-lg" : "text-2xl")}>{work.totalMarks || 0}</span>
                <span className="text-[8px] block text-ink/40 uppercase font-bold tracking-tighter">MARKS</span>
              </div>
            </div>
          ))
        ) : (
          displayAuthors.map((author, index) => (
            <div 
              key={author._id} 
              className={cn(
                "flex items-center justify-between p-4 bg-paper-100/50 border-l-4 group transition-all",
                getRankLabel(index).borderClass
              )}
            >
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <span className="text-2xl font-serif  text-ink/20 w-8 inline-block">{index + 1}</span>
                  {index === 0 && <Crown className="w-4 h-4 text-amber-500 absolute -top-2 -left-1 rotate-[-20deg]" />}
                </div>
                <div className="relative">
                  {author.profilePicture ? (
                    <img src={author.profilePicture} alt={author.username} className="w-10 h-10 rounded-full object-cover border-2 border-ink/10" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-paper-200 flex items-center justify-center border-2 border-ink/5">
                      <User className="w-6 h-6 text-ink/20" />
                    </div>
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="font-bold text-lg text-ink group-hover:translate-x-1 transition-transform">
                      {author.username}
                    </h3>
                    
                  </div>
                  <p className="text-xs text-ink/60 ">{author.workCount} Publications</p>
                </div>
              </div>
              <div className="text-right">
                <div className='ml-auto'>
                <p className="text-[7px] font-black uppercase tracking-widest text-ink/30 mb-1">Rank Status</p>
                <div className="mb-2">
                {getRankLabel(index) && (
                      <span className={cn(
                        "text-[10px] font-bold px-1.5 py-0.5 rounded-full border tracking-widest",
                        getRankLabel(index).className
                      )}>
                        {getRankLabel(index).text}
                      </span>
                    )}
                    </div>
                </div>
                <span className={cn("font-bold text-ink", limit ? "text-lg" : "text-2xl")}>{author.totalMarks}</span>
                <span className="text-[8px] block text-ink/40 uppercase font-bold tracking-tighter">TOTAL MARKS</span>
              </div>
            </div>
          ))
        )}
      </div>

      {showFullLink && (
        <Link
          to="/leaderboard"
          className="mt-6 flex items-center justify-center space-x-2 w-full p-4 border border-dashed border-paper-200 hover:border-ink/20 hover:bg-paper-100 transition-all group"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-ink/40 group-hover:text-ink">View Full Hall of Fame</span>
          <ChevronRight className="w-4 h-4 text-ink/20 group-hover:text-ink group-hover:translate-x-1 transition-all" />
        </Link>
      )}
    </div>
  );
};

export default Leaderboard;
