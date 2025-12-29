
import React from 'react';

export const Header: React.FC = () => {
  const handleKeySetup = async () => {
    if (window.aistudio?.openSelectKey) {
      await window.aistudio.openSelectKey();
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass shadow-sm px-4 md:px-6 py-4 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gradient-to-tr from-pink-400 to-rose-400 rounded-full flex items-center justify-center text-white shadow-lg animate-pulse">
          <span className="text-xl font-bold font-romantic">N</span>
        </div>
        <div>
          <h1 className="text-lg md:text-xl font-bold text-gray-800 font-romantic leading-tight">Navie's Buddy</h1>
          <p className="text-[10px] text-rose-500 font-bold tracking-widest uppercase">Love & Boards 2025</p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <div className="hidden sm:block text-right mr-3">
          <p className="text-[10px] text-gray-400 font-medium italic">"Success is closer than you think"</p>
        </div>
        <button 
          onClick={handleKeySetup}
          className="p-2 hover:bg-pink-100 rounded-full transition-colors text-pink-400"
          title="Setup API Key"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
      </div>
    </header>
  );
};
