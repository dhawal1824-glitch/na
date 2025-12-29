
import React from 'react';
import { Message } from '../types';

interface ChatBubbleProps {
  message: Message;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({ message }) => {
  const isAssistant = message.role === 'assistant';

  return (
    <div className={`flex w-full mb-6 ${isAssistant ? 'justify-start' : 'justify-end'}`}>
      <div className={`max-w-[85%] md:max-w-[70%] rounded-2xl p-4 shadow-sm ${
        isAssistant 
          ? 'bg-white text-gray-800 border-l-4 border-pink-400' 
          : 'bg-gradient-to-r from-pink-500 to-rose-500 text-white'
      }`}>
        {isAssistant && message.isThinking && (
          <div className="flex items-center space-x-2 mb-2 text-rose-400 text-xs font-bold animate-pulse">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span>DEEP THINKING MODE ACTIVE...</span>
          </div>
        )}
        <div className="text-sm md:text-base whitespace-pre-wrap leading-relaxed">
          {message.content}
        </div>
        <div className={`text-[10px] mt-2 opacity-60 ${isAssistant ? 'text-gray-500' : 'text-white'}`}>
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
};
