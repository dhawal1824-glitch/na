
import React, { useState, useRef, useEffect } from 'react';
import { Header } from './components/Header';
import { ChatBubble } from './components/ChatBubble';
import { IntroScreen } from './components/IntroScreen';
import { Message } from './types';
import { INITIAL_GREETING } from './constants';
import { generateAssistantResponse } from './services/geminiService';

const App: React.FC = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: INITIAL_GREETING,
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isThinkingMode, setIsThinkingMode] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (!showIntro) {
      scrollToBottom();
    }
  }, [messages, isLoading, showIntro]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const history = messages.slice(-6).map(m => ({
      role: (m.role === 'assistant' ? 'model' : 'user') as 'model' | 'user',
      parts: [{ text: m.content }]
    }));

    try {
      const aiResponseText = await generateAssistantResponse(input, history, isThinkingMode);

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiResponseText,
        timestamp: new Date(),
        isThinking: isThinkingMode,
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error: any) {
      let errorMessage = "Oops, something went wrong! Let's try again, Navie! ❤️";
      
      if (error.message === "KEY_REQUIRED") {
        errorMessage = "I need a valid API key to work. Please click the settings icon in the top right to select one! ❤️";
        if (window.aistudio?.openSelectKey) {
          await window.aistudio.openSelectKey();
        }
      }

      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: errorMessage,
        timestamp: new Date(),
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (showIntro) {
    return <IntroScreen onStart={() => setShowIntro(false)} />;
  }

  return (
    <div className="flex flex-col h-screen max-h-screen animate-fade-in">
      <Header />
      
      <div className="fixed inset-0 pointer-events-none opacity-20 z-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-pink-300 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-40 right-10 w-48 h-48 bg-purple-300 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-rose-50 rounded-full blur-[100px]"></div>
      </div>

      <main className="flex-1 overflow-y-auto pt-24 pb-32 px-4 md:px-0 relative z-10">
        <div className="max-w-3xl mx-auto">
          {messages.map((msg) => (
            <ChatBubble key={msg.id} message={msg} />
          ))}
          {isLoading && (
            <div className="flex justify-start mb-6">
              <div className="glass rounded-2xl p-4 shadow-sm flex items-center space-x-2">
                <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 glass border-t border-pink-100 p-4 md:p-6 z-50">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={isThinkingMode}
                  onChange={() => setIsThinkingMode(!isThinkingMode)}
                />
                <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-pink-500"></div>
                <span className="ml-2 text-[10px] font-bold text-gray-500 uppercase tracking-tighter">Deep Study Mode</span>
              </label>
            </div>
            <p className="text-[10px] text-gray-400 italic">"Study hard, Navie, I'm right here."</p>
          </div>
          
          <form onSubmit={handleSend} className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a doubt, Navie..."
              className="w-full bg-white/50 border border-pink-200 rounded-2xl py-4 pl-5 pr-14 focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all shadow-inner text-rose-600 font-medium"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="absolute right-2 top-2 bottom-2 px-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl hover:shadow-lg active:scale-95 transition-all disabled:opacity-50"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </form>
        </div>
      </div>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .animate-fade-in { animation: fadeIn 0.5s ease-out; }
      `}</style>
    </div>
  );
};

export default App;
