import { searchSpotifyTracks } from '@/lib/spotify';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
  }

  try {
    const tracks = await searchSpotifyTracks(query);
    return NextResponse.json(tracks);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to search tracks' },
      { status: 500 }
    );
  }
}