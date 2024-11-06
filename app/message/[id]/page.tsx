'use client';

import { useEffect, useState } from 'react';
import { Message, getMessages } from '@/lib/messages';
import { MessageCard } from '@/components/messages/MessageCard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function MessagePage({ params }: { params: { id: string } }) {
  const [message, setMessage] = useState<Message | null>(null);

  useEffect(() => {
    const messages = getMessages();
    const foundMessage = messages.find(m => m.id === params.id);
    if (foundMessage) {
      setMessage(foundMessage);
    }
  }, [params.id]);

  if (!message) {
    return (
      <div className="min-h-screen pt-24 pb-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-muted-foreground mb-4">Message not found.</p>
          <Button asChild>
            <Link href="/browse" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Browse Messages
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Button asChild variant="outline">
            <Link href="/browse" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Browse
            </Link>
          </Button>
        </div>
        <MessageCard message={message} />
      </div>
    </div>
  );
}