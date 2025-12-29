
import React from 'react';

interface IntroScreenProps {
  onStart: () => void;
}

export const IntroScreen: React.FC<IntroScreenProps> = ({ onStart }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gradient-to-br from-pink-400 via-rose-400 to-purple-500 overflow-hidden">
      {/* Animated Hearts Background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute animate-float opacity-30 text-white"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              fontSize: `${Math.random() * 20 + 10}px`
            }}
          >
            ❤️
          </div>
        ))}
      </div>

      <div className="relative glass p-8 md:p-12 rounded-[2rem] shadow-2xl max-w-md w-full mx-4 text-center transform transition-all animate-fade-in-up">
        <div className="mb-6 inline-block p-4 bg-white/50 rounded-full">
          <span className="text-5xl">🎓</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-romantic text-rose-600 mb-4">
          Hi Navie!
        </h2>
        <p className="text-gray-700 leading-relaxed mb-8 font-medium">
          I know the 12th Board exams are tough, but you are tougher. Your favorite person created this 
          Buddy just for you, to help you ace every NCERT query with love.
        </p>
        <button
          onClick={onStart}
          className="w-full py-4 bg-gradient-to-r from-pink-500 to-rose-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-pink-500/50 hover:scale-105 active:scale-95 transition-all duration-300"
        >
          Let's Ace Boards! 🚀
        </button>
        <p className="mt-6 text-[10px] uppercase tracking-[0.2em] text-rose-400 font-bold">
          Exclusively for Navishi
        </p>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(20deg); }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; }
      `}</style>
    </div>
  );
};
