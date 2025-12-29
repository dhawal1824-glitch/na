
import React from 'react';

export const Header: React.FC = () => {
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
        <span className="px-3 py-1 bg-pink-100 text-pink-600 rounded-full text-[10px] font-bold border border-pink-200">NCERT MODE</span>
      </div>
    </header>
  );
};
