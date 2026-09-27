import React from 'react';
import { MessageCircle, Phone } from 'lucide-react';

export const FloatingChatAdmin: React.FC = () => {
  return (
    <div className="fixed z-[60] bottom-5 right-5 sm:bottom-7 sm:right-7">
      <button
        type="button"
        aria-label="Chat Admin"
        title="Chat Admin"
        className="floating-chat-admin group cursor-pointer"
      >
        <span className="chat-pulse-ring" aria-hidden="true" />

        <span className="chat-core">
          <MessageCircle
            className="absolute w-9 h-9 sm:w-10 sm:h-10 text-white"
            strokeWidth={2.8}
            fill="white"
          />
          <Phone
            className="relative z-10 w-4.5 h-4.5 sm:w-5 sm:h-5 text-[#139A3B]"
            strokeWidth={3}
            fill="#139A3B"
            aria-hidden="true"
          />
        </span>

        <span className="chat-label">Chat Admin</span>
      </button>
    </div>
  );
};
