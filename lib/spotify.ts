const SPOTIFY_CLIENT_ID = '067f5e2da69349958f894909d02f9d69';
const SPOTIFY_CLIENT_SECRET = '227d996fd8854facafb81a2b73ac7e62';
const SPOTIFY_TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
const SPOTIFY_SEARCH_ENDPOINT = 'https://api.spotify.com/v1/search';

let accessToken: string | null = null;
let tokenExpirationTime: number | null = null;

export async function getSpotifyAccessToken() {
  if (accessToken && tokenExpirationTime && Date.now() < tokenExpirationTime) {
    return accessToken;
  }

  const basic = Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64');
  
  const response = await fetch(SPOTIFY_TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });

  const data = await response.json();
  
  if (!response.ok) {
    throw new Error('Failed to get Spotify access token');
  }

  accessToken = data.access_token;
  tokenExpirationTime = Date.now() + (data.expires_in * 1000);
  
  return accessToken;
}

export interface SpotifyTrack {
  id: string;
  name: string;
  artists: { name: string }[];
  album: {
    name: string;
    images: { url: string }[];
  };
}

export async function searchSpotifyTracks(query: string): Promise<SpotifyTrack[]> {
  if (!query.trim()) return [];

  try {
    const token = await getSpotifyAccessToken();
    const response = await fetch(
      `${SPOTIFY_SEARCH_ENDPOINT}?q=${encodeURIComponent(query)}&type=track&limit=10`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to search Spotify tracks');
    }

    const data = await response.json();
    return data.tracks.items;
  } catch (error) {
    console.error('Error searching Spotify:', error);
    return [];
  }
}