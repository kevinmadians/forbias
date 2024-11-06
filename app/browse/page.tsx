'use client';

import { useEffect, useState } from 'react';
import { Message, getMessages } from '@/lib/messages';
import { MessageCard } from '@/components/messages/MessageCard';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export default function BrowsePage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMessages, setFilteredMessages] = useState<Message[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    setMessages(getMessages());
  }, []);

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = messages.filter((message) =>
        message.recipientName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredMessages(filtered);
      setHasSearched(true);
    } else {
      setFilteredMessages([]);
      setHasSearched(false);
    }
  }, [searchQuery, messages]);

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-reenie text-4xl sm:text-5xl text-center mb-8 text-foreground">
          Browse Messages
        </h1>

        <div className="max-w-md mx-auto mb-12 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
          <Input
            type="text"
            placeholder="Search by recipient name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12"
          />
        </div>

        {!hasSearched && (
          <div className="text-center text-muted-foreground">
            <p>Enter a name to search for messages...</p>
          </div>
        )}

        {hasSearched && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMessages.map((message) => (
              <MessageCard 
                key={message.id} 
                message={message}
                enableDialog={true}
                className="cursor-pointer"
              />
            ))}
            {filteredMessages.length === 0 && searchQuery && (
              <div className="col-span-full text-center text-muted-foreground">
                <p>No messages found for "{searchQuery}"</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}