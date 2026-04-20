import React, { useState, useEffect } from 'react';
import { Book, RefreshCw } from 'lucide-react';

const Loading = () => {
  const [showSlowMessage, setShowSlowMessage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowSlowMessage(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (

    <div className="fixed inset-0 bg-paper-50 flex flex-col items-center justify-center z-50">
      <div className="relative">
        {/* Animated Rings */}
        <div className="absolute inset-0 -m-8">
          <div className="absolute inset-0 border-2 border-ink/5 rounded-full animate-[ping_3s_linear_infinite]" />
          <div className="absolute inset-0 border-2 border-ink/5 rounded-full animate-[ping_2s_linear_infinite]" />
        </div>

        {/* Main Icon Container */}
        <div className="relative bg-white p-8 rounded-full shadow-manuscript border border-paper-200">
          <Book className="w-12 h-12 text-ink animate-bounce" />
        </div>
      </div>

      {/* Brand Name */}
      <div className="mt-8 flex flex-col items-center space-y-2">
        <h1 className="text-3xl font-serif font-bold tracking-[0.2em] text-ink animate-pulse">
          MANUSCRIPT
        </h1>
        <div className="h-1 w-24 bg-ink/10 rounded-full overflow-hidden">
          <div className="h-full bg-ink w-1/3 rounded-full animate-[loading-bar_1.5s_ease-in-out_infinite]" />
        </div>
        <p className="text-sm font-sans text-ink/40 tracking-widest uppercase">
          Curating Excellence
        </p>
        
        {showSlowMessage && (
          <div className="mt-8 flex items-center space-x-2 text-ink/30 animate-in fade-in duration-1000">
            <RefreshCw className="w-3 h-3 animate-spin" />
            <p className="text-[10px] font-bold uppercase tracking-tighter">
              The archives are waking up (this may take a moment)...
            </p>
          </div>
        )}
      </div>


      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes loading-bar {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
      `}} />
    </div>
  );
};

export default Loading;
