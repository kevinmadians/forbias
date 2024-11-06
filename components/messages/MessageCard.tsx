'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Heart, Instagram, MessageCircle, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { MessageDialog } from './MessageDialog';

interface MessageCardProps {
  message: {
    id: string;
    recipientName: string;
    message: string;
    songId: string;
    songName: string;
    artistName: string;
    albumImage: string;
  };
  hideActions?: boolean;
  hidePlayer?: boolean;
  className?: string;
  expanded?: boolean;
  enableDialog?: boolean;
  largePlayer?: boolean;
}

export function MessageCard({ 
  message, 
  hideActions = false, 
  hidePlayer = false, 
  className,
  expanded = false,
  enableDialog = false,
  largePlayer = false
}: MessageCardProps) {
  const { toast } = useToast();
  const [hasLiked, setHasLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setHasLiked(!hasLiked);
    setLikes(prev => hasLiked ? prev - 1 : prev + 1);
  };

  const shareOnInstagram = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(`https://instagram.com/stories/create`, '_blank');
  };

  const shareOnWhatsapp = (e: React.MouseEvent) => {
    e.stopPropagation();
    const text = encodeURIComponent(`Check out this message on For Bias: ${window.location.origin}/messages/${message.id}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const copyMessageUrl = (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = `${window.location.origin}/messages/${message.id}`;
    navigator.clipboard.writeText(url);
    toast({
      title: "Link copied!",
      description: "The message link has been copied to your clipboard.",
    });
  };

  const handleCardClick = () => {
    if (!expanded && enableDialog) {
      setDialogOpen(true);
    }
  };

  return (
    <>
      <div 
        onClick={handleCardClick}
        className={cn(
          "bg-card h-full rounded-lg p-6 shadow-lg transition-all duration-300",
          !expanded && enableDialog && "hover:shadow-xl hover:-translate-y-1",
          "border border-border/40 hover:border-border/80",
          !expanded && enableDialog && "cursor-pointer",
          expanded && "p-8",
          className
        )}
      >
        <div className="mb-3 flex justify-between items-center">
          <p className={cn(
            "text-muted-foreground",
            expanded ? "text-base" : "text-sm"
          )}>
            To: {message.recipientName}
          </p>
          {!hideActions && (
            <div className="flex items-center gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={handleLike}
                      className={cn(
                        "transition-colors duration-200",
                        hasLiked ? 'text-red-500 hover:text-red-600' : 'text-muted-foreground'
                      )}
                    >
                      <Heart className={`h-5 w-5 ${hasLiked ? 'fill-current' : ''}`} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{likes} {likes === 1 ? 'like' : 'likes'}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex gap-1">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={shareOnInstagram}
                        className="transition-colors duration-200"
                      >
                        <Instagram className="h-5 w-5" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={shareOnWhatsapp}
                        className="transition-colors duration-200"
                      >
                        <MessageCircle className="h-5 w-5" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={copyMessageUrl}
                        className="transition-colors duration-200"
                      >
                        <Copy className="h-5 w-5" />
                      </Button>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Share</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          )}
        </div>
        
        <p className={cn(
          "font-reenie mb-6 text-foreground",
          expanded ? "text-3xl sm:text-4xl" : "text-2xl sm:text-3xl",
          !expanded && "line-clamp-4"
        )}>
          {message.message}
        </p>
        
        <div className="mt-auto">
          <div className="flex items-center gap-4 mb-4">
            <div className={cn(
              "relative flex-shrink-0",
              expanded ? "w-16 h-16" : "w-10 h-10"
            )}>
              <Image
                src={message.albumImage}
                alt={message.songName}
                fill
                className="rounded object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className={cn(
                "font-medium truncate text-foreground",
                expanded ? "text-lg" : "text-sm"
              )}>
                {message.songName}
              </p>
              <p className={cn(
                "text-muted-foreground truncate",
                expanded ? "text-base" : "text-sm"
              )}>
                {message.artistName}
              </p>
            </div>
          </div>

          {(!hidePlayer || expanded) && (
            <iframe
              src={`https://open.spotify.com/embed/track/${message.songId}?theme=0`}
              width="100%"
              height={largePlayer ? "152" : "80"}
              frameBorder="0"
              allow="encrypted-media"
              className="rounded"
            />
          )}
        </div>
      </div>

      {enableDialog && (
        <MessageDialog 
          message={message}
          open={dialogOpen}
          onOpenChange={setDialogOpen}
        />
      )}
    </>
  );
}