'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Message, getMessages } from '@/lib/messages';
import { MessageCard } from '@/components/messages/MessageCard';
import { Button } from '@/components/ui/button';
import { Copy, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const messageId = searchParams.get('id');
  const [message, setMessage] = useState<Message | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (messageId) {
      const messages = getMessages();
      const foundMessage = messages.find(m => m.id === messageId);
      if (foundMessage) {
        setMessage(foundMessage);
      }
    }
  }, [messageId]);

  const copyMessageUrl = () => {
    const url = `${window.location.origin}/message/${messageId}`;
    navigator.clipboard.writeText(url).then(() => {
      toast({
        title: "URL copied!",
        description: "Share this link with your friends.",
        duration: 3000,
      });
    });
  };

  if (!message) {
    return (
      <div className="min-h-screen pt-24 pb-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-muted-foreground">Message not found.</p>
          <Button asChild className="mt-4">
            <Link href="/submit">Create a new message</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="font-reenie text-4xl sm:text-5xl mb-4 text-foreground">
            Message Created Successfully!
          </h1>
          <p className="text-muted-foreground mb-8">
            Your message has been shared. Copy the link below to share it with others.
          </p>
          <div className="flex justify-center gap-4 mb-12">
            <Button
              onClick={copyMessageUrl}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Copy className="w-4 h-4 mr-2" />
              Copy Message URL
            </Button>
            <Button asChild variant="outline">
              <Link href="/browse" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Browse Messages
              </Link>
            </Button>
          </div>
        </div>

        <div className="max-w-xl mx-auto">
          <MessageCard message={message} />
        </div>
      </div>
    </div>
  );
}