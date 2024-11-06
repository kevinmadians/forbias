'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MessageCard } from "./MessageCard";
import { Message } from "@/lib/messages";

interface MessageDialogProps {
  message: Message;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MessageDialog({ message, open, onOpenChange }: MessageDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl p-8">
        <DialogHeader>
          <DialogTitle asChild>
            <h2 className="w-full text-center">
              <span className="text-2xl font-medium">Message for</span>
              <br />
              <span className="font-reenie text-5xl block mt-2">
                {message.recipientName}
              </span>
            </h2>
          </DialogTitle>
        </DialogHeader>
        <div className="mt-8">
          <MessageCard 
            message={message} 
            hideActions={false}
            hidePlayer={false}
            expanded={true}
            className="shadow-none hover:shadow-none hover:translate-y-0 cursor-default"
            largePlayer={true}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}