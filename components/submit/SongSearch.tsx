'use client';

import React, { useState, useEffect } from 'react';
import { Check, ChevronsUpDown, Search, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useDebounce } from '@/hooks/use-debounce';
import Image from 'next/image';
import { searchSpotifyTracks, type SpotifyTrack } from '@/lib/spotify';

interface SongSearchProps {
  value: string;
  onChange: (value: string, details: { name: string; artistName: string; albumImage: string }) => void;
}

export function SongSearch({ value, onChange }: SongSearchProps) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [songs, setSongs] = useState<SpotifyTrack[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSong, setSelectedSong] = useState<SpotifyTrack | null>(null);
  const debouncedSearch = useDebounce(searchQuery, 300);

  useEffect(() => {
    async function fetchSongs() {
      if (!debouncedSearch.trim()) {
        setSongs([]);
        return;
      }

      setIsLoading(true);
      try {
        const results = await searchSpotifyTracks(debouncedSearch);
        setSongs(results);
      } catch (error) {
        console.error('Failed to search songs:', error);
        setSongs([]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchSongs();
  }, [debouncedSearch]);

  // Update selected song when value changes
  useEffect(() => {
    if (value && !selectedSong) {
      const song = songs.find(s => s.id === value);
      if (song) {
        setSelectedSong(song);
      }
    }
  }, [value, songs, selectedSong]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedSong ? (
            <div className="flex items-center gap-2">
              {selectedSong.album.images[0] && (
                <Image
                  src={selectedSong.album.images[0].url}
                  alt={selectedSong.name}
                  width={20}
                  height={20}
                  className="rounded"
                />
              )}
              <span className="truncate">
                {selectedSong.name} - {selectedSong.artists[0].name}
              </span>
            </div>
          ) : (
            'Search for a song...'
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
        <div className="flex items-center border-b px-3">
          <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
          <Input
            placeholder="Search songs..."
            className="h-10 w-full border-0 bg-transparent p-2 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <ScrollArea className="h-[--radix-popover-content-height] max-h-[300px]">
          <div className="p-1">
            {isLoading ? (
              <div className="flex items-center justify-center p-4">
                <Loader2 className="h-4 w-4 animate-spin" />
              </div>
            ) : songs.length === 0 ? (
              <p className="p-2 text-sm text-muted-foreground text-center">
                {searchQuery.trim() ? 'No songs found.' : 'Start typing to search...'}
              </p>
            ) : (
              songs.map((song) => (
                <Button
                  key={song.id}
                  variant="ghost"
                  role="option"
                  className={cn(
                    'w-full justify-start gap-2 font-normal',
                    value === song.id && 'bg-accent'
                  )}
                  onClick={() => {
                    onChange(song.id, {
                      name: song.name,
                      artistName: song.artists[0].name,
                      albumImage: song.album.images[0]?.url || '',
                    });
                    setSelectedSong(song);
                    setOpen(false);
                  }}
                >
                  <div className="flex items-center gap-2 w-full">
                    {song.album.images[0] && (
                      <Image
                        src={song.album.images[0].url}
                        alt={song.name}
                        width={30}
                        height={30}
                        className="rounded"
                      />
                    )}
                    <div className="flex-1 truncate">
                      <div className="font-medium truncate">{song.name}</div>
                      <div className="text-sm text-muted-foreground truncate">
                        {song.artists.map(a => a.name).join(', ')}
                      </div>
                    </div>
                    <Check
                      className={cn(
                        'h-4 w-4 shrink-0',
                        value === song.id ? 'opacity-100' : 'opacity-0'
                      )}
                    />
                  </div>
                </Button>
              ))
            )}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}