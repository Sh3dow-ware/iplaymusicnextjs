// Server-side Spotify API utility functions
import { cookies } from "next/headers";

// Spotify API base URL
const SPOTIFY_API_BASE = "https://api.spotify.com/v1";

// Helper function to make authenticated Spotify API requests
async function makeSpotifyRequest(endpoint: string, accessToken: string, options: RequestInit = {}) {
  const response = await fetch(`${SPOTIFY_API_BASE}${endpoint}`, {
    ...options,
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Spotify API error: ${response.status} - ${error}`);
  }

  return response.json();
}

// Get access token from cookies
async function getAccessToken() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("ipm_access_token")?.value;
  
  if (!accessToken) {
    throw new Error("No access token available. Please login.");
  }
  
  return accessToken;
}

export interface SpotifyServerApiOptions {
  limit?: number;
  offset?: number;
  query?: string;
  id?: string;
  market?: string;
  seed_artists?: string;
  seed_tracks?: string;
  seed_genres?: string;
  item_type?: 'tracks' | 'artists';
  time_range?: 'short_term' | 'medium_term' | 'long_term';
  search_type?: string;
}

// Album methods
export async function getAlbumsServer(options: SpotifyServerApiOptions = {}) {
  const accessToken = await getAccessToken();
  const { query, limit = "20", offset = "0" } = options;
  
  if (query) {
    // Search for albums
    const data = await makeSpotifyRequest(
      `/search?q=${encodeURIComponent(query)}&type=album&limit=${limit}&offset=${offset}`,
      accessToken
    );
    return data.albums;
  } else {
    return await makeSpotifyRequest(
      `/browse/new-releases?limit=${limit}&offset=${offset}`,
      accessToken
    );
  }
}