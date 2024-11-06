'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { SongSearch } from './SongSearch';
import { useToast } from '@/hooks/use-toast';
import { saveMessage } from '@/lib/messages';

const formSchema = z.object({
  recipientName: z.string().min(1, 'Recipient name is required'),
  message: z.string()
    .min(1, 'Message is required')
    .refine(
      (val) => val.trim().split(/\s+/).length <= 25,
      'Message must not exceed 25 words'
    ),
  songId: z.string().min(1, 'Please select a song'),
});

export function SubmitForm() {
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [selectedSongDetails, setSelectedSongDetails] = useState<{
    name: string;
    artistName: string;
    albumImage: string;
  } | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      recipientName: '',
      message: '',
      songId: '',
    },
  });

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const words = e.target.value.trim().split(/\s+/);
    setWordCount(words.length);
    form.setValue('message', e.target.value);
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!selectedSongDetails) {
      toast({
        title: 'Error',
        description: 'Please select a song first',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const savedMessage = saveMessage({
        recipientName: values.recipientName,
        message: values.message,
        songId: values.songId,
        songName: selectedSongDetails.name,
        artistName: selectedSongDetails.artistName,
        albumImage: selectedSongDetails.albumImage,
      });

      router.push(`/submit/success?id=${savedMessage.id}`);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="recipientName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Recipient Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter recipient's name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Write your message here"
                  className="min-h-[150px]"
                  {...field}
                  onChange={handleMessageChange}
                />
              </FormControl>
              <FormDescription className={wordCount > 25 ? "text-destructive" : "text-muted-foreground"}>
                {wordCount}/25 words
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="songId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Song</FormLabel>
              <FormControl>
                <SongSearch 
                  value={field.value}
                  onChange={(value, details) => {
                    field.onChange(value);
                    setSelectedSongDetails(details);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button 
          type="submit" 
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Sending...' : 'Submit'}
        </Button>
      </form>
    </Form>
  );
}