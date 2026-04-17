import React from 'react';
import { useStore } from '../store/useStore';
import { Star, Heart, Quote, Trash2, User } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { formatDistanceToNow } from 'date-fns';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const WorkCard = ({ work }) => {
  const { user, rateWork, likeWork, deleteWork } = useStore();
  const [rating, setRating] = React.useState(0);

  const hasLiked = work.likes.includes(user?.id);
  const userRating = work.ratings.find(r => r.userId === user?.id)?.marks || 0;

  const handleRate = (value) => {
    if (!user) return alert('Please login to rate');
    setRating(value);
    rateWork(work._id, value);
  };

  return (
    <div className="manuscript-card group">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-4">
          <div className="relative group/avatar">
            {work.author?.profilePicture ? (
              <img 
                src={work.author.profilePicture} 
                alt={work.author.username} 
                className="w-10 h-10 rounded-full object-cover border-2 border-paper-200 shadow-sm transition-transform group-hover/avatar:scale-110" 
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-paper-200 flex items-center justify-center border-2 border-paper-200">
                <User className="w-6 h-6 text-ink/20" />
              </div>
            )}
            <div className="absolute inset-0 rounded-full shadow-inner pointer-events-none" />
          </div>
          
          <div className="text-base md:text-lg uppercase tracking-widest text-ink font-bold mb-0.5 truncate max-w-[150px] md:max-w-none">
            {work.author?.username}
            <div className='text-[10px] uppercase tracking-widest text-ink/40 font-bold mb-0.5 truncate'>
              {formatDistanceToNow(new Date(work.createdAt), { addSuffix: true })}
            </div>
          </div>
          
        </div>
        
        
        <div className="flex items-center space-x-2">
          {user && work.author?._id === user.id && (
            <button 
              onClick={() => deleteWork(work._id)}
              className="p-2 text-ink/20 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
              title="Delete Work"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          )}
          <Quote className="text-ink/10 w-8 h-8" />
        </div>
      </div>
      <hr className='border-paper-200' />

      <div className='mt-4 mb-5 flex justify-between items-start'>
          <div>
            <h2 className="text-xl md:text-2xl font-serif font-bold text-ink group-hover:text-ink/80 transition-colors leading-tight break-words">
              {work.title}
            </h2>
          </div>
          <div>
            <div className="text-[10px]  uppercase tracking-widest text-ink/40 font-bold mb-0.5">
              {work.category}
            </div>
          </div>
        </div>

      <div className="text-content mb-6 whitespace-pre-wrap">
        {work.content}
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-4 border-t border-paper-200 gap-4">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => likeWork(work._id)}
            className={cn(
              "flex items-center space-x-1 group/like transition-all",
              hasLiked ? "text-red-500" : "text-ink/40 hover:text-red-400"
            )}
          >
            <Heart className={cn("w-5 h-5", hasLiked && "fill-current")} />
            <span className="text-sm font-medium">{work.likes.length}</span>
          </button>

          <div className="flex items-center space-x-1">
            <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
            <span className="text-sm font-bold text-ink whitespace-nowrap">
              {work.totalMarks} <span className="hidden xs:inline">Points</span>
            </span>
            <span className="text-[10px] md:text-xs text-ink/40">({work.averageRating.toFixed(1)})</span>
          </div>
        </div>

        {user && (
          <div className="flex items-center space-x-0.5 group/stars overflow-x-auto pb-1 no-scrollbar min-w-0">
            <span className="text-[10px] font-bold text-ink/40 mr-1 shrink-0 uppercase tracking-tighter">RATE:</span>
            {[...Array(10)].map((_, i) => {
              const starValue = i + 1;
              const isActive = (rating || userRating) >= starValue;
              
              return (
                <button
                  key={i}
                  onClick={() => handleRate(starValue)}
                  className="p-0.5 transition-transform hover:scale-125 focus:outline-none group/star"
                >
                  <Star 
                    className={cn(
                      "w-3 h-3 md:w-4 md:h-4 transition-colors",
                      isActive 
                        ? "text-amber-500 fill-amber-500" 
                        : "text-paper-200 hover:text-amber-200"
                    )} 
                  />
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkCard;
