import React from 'react';
import { MessageCircle } from 'lucide-react';

export const FloatingChatAdmin: React.FC = () => {
  return (
    <div className="fixed z-[60] bottom-5 right-5 sm:bottom-7 sm:right-7">
      <button
        type="button"
        aria-label="Chat Admin"
        title="Chat Admin"
        className="floating-chat-admin group flex items-center gap-2.5 bg-[#0F4D2E] text-white border border-white/20 px-4 py-3 shadow-[0_10px_28px_rgba(8,59,36,0.28)] hover:bg-[#083B24] transition-all duration-200"
      >
        <span className="w-9 h-9 bg-white/10 border border-white/15 flex items-center justify-center shrink-0">
          <MessageCircle className="w-5 h-5" />
        </span>
        <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.12em] whitespace-nowrap">
          Chat Admin
        </span>
      </button>
    </div>
  );
};
