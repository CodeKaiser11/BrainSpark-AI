import { useState } from 'react';

export default function AIFloatingAgent() {
  const [isOpen, setIsOpen] = useState(false);

  const AgentIcon = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 13.4876 3.36093 14.891 4 16.1247L3 21L7.8753 20C9.10897 20.6391 10.5124 21 12 21Z" fill="white"/>
      <path d="M8 12C8 10.3431 9.34315 9 11 9C12.6569 9 14 10.3431 14 12C14 13.6569 12.6569 15 11 15C10.1716 15 9.42157 14.6642 8.87868 14.1213L7 15L7.87868 13.1213C7.33579 12.5784 7 11.8284 7 11V11" stroke="#d4500a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M13 14C13 15.6569 14.3431 17 16 17C17.6569 17 19 15.6569 19 14C19 12.3431 17.6569 11 16 11C15.1716 11 14.4216 11.3358 13.8787 11.8787L12 11L12.8787 12.8787C12.3358 13.4216 12 14.1716 12 15" stroke="#d4500a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-80 sm:w-96 glass-morphism rounded-[32px] overflow-hidden shadow-2xl animate-fade-in-up border border-white/20">
          <div className="bg-linear-to-br from-brand-orange to-orange-600 p-6 text-white flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <AgentIcon />
              </div>
              <span className="font-bold">AI Learning Agent</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded-lg transition-colors text-xl">
              ×
            </button>
          </div>
          
          <div className="p-6 h-80 overflow-y-auto bg-white/5 backdrop-blur-md">
            <div className="bg-brand-orange/10 border border-brand-orange/20 rounded-2xl p-4 mb-4 text-sm max-w-[85%]">
              Hello! I'm your BrainSpark agent. How can I help you excel today?
            </div>
          </div>

          <div className="p-4 bg-white/10 border-t border-white/10">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Ask me anything..." 
                className="w-full bg-white/10 border border-white/20 rounded-2xl py-3 px-4 text-white placeholder-gray-400 outline-none focus:bg-white/20 transition-all pr-12"
              />
              <button className="absolute right-2 top-2 bottom-2 bg-brand-orange text-white px-3 rounded-xl hover:scale-105 transition-transform">
                →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Bubble (FAB) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 rounded-full bg-brand-orange flex items-center justify-center shadow-2xl transition-all duration-300 animate-float animate-pulse-neon group ${
          isOpen ? 'rotate-90 scale-90 opacity-0' : 'hover:scale-110'
        }`}
      >
        <div className="transform transition-transform group-hover:rotate-12">
          <AgentIcon />
        </div>
        
        {/* Unread indicator */}
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 border-2 border-white rounded-full text-[10px] font-bold text-white flex items-center justify-center">
          1
        </div>
      </button>
    </div>
  );
}
