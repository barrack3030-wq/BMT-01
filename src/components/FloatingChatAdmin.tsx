import React from 'react';
import { MessageCircle, Phone, Sparkles } from 'lucide-react';
import { SITE_SETTINGS } from '../data/content';

export const FloatingChatAdmin: React.FC = () => {
  const href = SITE_SETTINGS.chatUrl || '#';
  const label = SITE_SETTINGS.chatLabel || 'Chat Admin';

  return (
    <div className="fixed z-[60] bottom-5 right-4 sm:bottom-7 sm:right-7">
      <a
        href={href}
        target={SITE_SETTINGS.chatUrl ? '_blank' : undefined}
        rel={SITE_SETTINGS.chatUrl ? 'noopener noreferrer' : undefined}
        aria-label={label}
        title={label}
        className="floating-chat-admin group"
      >
        <span className="chat-pulse-ring" aria-hidden="true" />
        <span className="chat-orbit" aria-hidden="true">
          <Sparkles className="chat-orbit-spark" />
        </span>

        <span className="chat-core" aria-hidden="true">
          <span className="chat-icon-bubble">
            <MessageCircle
              className="w-9 h-9 sm:w-10 sm:h-10 text-white"
              strokeWidth={2.6}
              fill="white"
            />
            <Phone
              className="chat-phone-icon"
              strokeWidth={3}
              fill="#139A3B"
            />
          </span>
        </span>

        <span className="chat-online-dot" aria-hidden="true" />
        <span className="chat-label">{label}</span>
      </a>
    </div>
  );
};
