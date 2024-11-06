'use client';

import { useEffect, useState } from 'react';
import { Message, getMessages } from '@/lib/messages';
import { MessageCard } from './MessageCard';
import { cn } from '@/lib/utils';

export function MarqueeMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [containerHeight, setContainerHeight] = useState<number>(0);

  useEffect(() => {
    loadMessages();
    const interval = setInterval(loadMessages, 5000);
    return () => clearInterval(interval);
  }, []);

  const loadMessages = () => {
    const allMessages = getMessages();
    if (allMessages.length === 0) return;
    const multipliedMessages = Array(6).fill(allMessages).flat();
    setMessages(multipliedMessages);
  };

  if (messages.length === 0) return null;

  return (
    <div className="relative overflow-hidden py-4 [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]">
      <div className="flex flex-col gap-4">
        {/* First row - moving right */}
        <div className="flex flex-nowrap gap-6 animate-marquee-fast hover:[animation-play-state:paused]">
          {messages.slice(0, Math.ceil(messages.length / 2)).map((message, idx) => (
            <div 
              key={`${message.id}-${idx}`} 
              className={cn(
                "flex-shrink-0 w-[400px]",
                "transition-transform duration-200 hover:scale-[1.02]"
              )}
            >
              <div className="h-[200px] overflow-hidden">
                <MessageCard 
                  message={message} 
                  hidePlayer={true} 
                  hideActions={true}
                  enableDialog={false}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Second row - moving left */}
        <div className="flex flex-nowrap gap-6 animate-marquee-reverse-fast hover:[animation-play-state:paused]">
          {messages.slice(Math.ceil(messages.length / 2)).map((message, idx) => (
            <div 
              key={`${message.id}-${idx}`} 
              className={cn(
                "flex-shrink-0 w-[400px]",
                "transition-transform duration-200 hover:scale-[1.02]"
              )}
            >
              <div className="h-[200px] overflow-hidden">
                <MessageCard 
                  message={message} 
                  hidePlayer={true} 
                  hideActions={true}
                  enableDialog={false}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}