// Spotify API utility functions for client-side usage

export interface SpotifyApiOptions {
  limit?: number;
  offset?: number;
  query?: string;
  id?: string;
  ids?: string;
  market?: string;
  seed_artists?: string;
  seed_tracks?: string;
  seed_genres?: string;
  item_type?: 'tracks' | 'artists';
  time_range?: 'short_term' | 'medium_term' | 'long_term';
  search_type?: string;
}

class SpotifyApiClient {
  private getBaseUrl() {
    if (typeof window !== 'undefined') {
      return '/api/spotify';
    }

    const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
    const host = process.env.VERCEL_URL || process.env.NEXT_PUBLIC_VERCEL_URL || 'localhost:3000';
    return `${protocol}://${host}/api/spotify`;
  }


  // Core request handler (internal use only)
  // - private: restricts visibility to this class
  // - async: returns a Promise and allows 'await' inside
  private async makeRequest(type: string, options: SpotifyApiOptions = {}) {
    // Construct query parameters, starting with the resource type
    const params = new URLSearchParams({type});

    // Append all provided options, ensuring values are stringified
    Object.entries(options).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, value.toString());
      }
    });

    // Resolve the base API URL (implementation defined elsewhere)
    const baseUrl = this.getBaseUrl();

    // Execute the HTTP request
    const response = await fetch(`${baseUrl}?${params.toString()}`);

    // Normalize error handling: throw if non-2xx response
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch data');
    }

    return response.json();
  }

// Public API: fetch album collection
  async getAlbums(options: SpotifyApiOptions = {}) {
    return this.makeRequest('albums', options);
  }

// Public API: fetch track list for a specific album
  async getAlbumTracks(id: string, options: SpotifyApiOptions = {}) {
    return this.makeRequest('album-tracks', {id, ...options});
  }
}

// Export a singleton instance
export const spotifyApi = new SpotifyApiClient();

// Export individual functions
export const getAlbums = (options?: SpotifyApiOptions) => spotifyApi.getAlbums(options);
export const getAlbumTracks = (id: string, options?: SpotifyApiOptions) => spotifyApi.getAlbumTracks(id, options);

// TypeScript interfaces for common Spotify objects
export interface SpotifyImage {
  url: string;
  height: number | null;
  width: number | null;
}

export interface SpotifyArtist {
  id: string;
  name: string;
  type: 'artist';
  uri: string;
  external_urls: {
    spotify: string;
  };
  images?: SpotifyImage[];
  genres?: string[];
  popularity?: number;
  followers?: {
    total: number;
  };
}

export interface SpotifyAlbum {
  id: string;
  name: string;
  type: 'album';
  uri: string;
  external_urls: {
    spotify: string;
  };
  images: SpotifyImage[];
  artists: SpotifyArtist[];
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  genres?: string[];
  popularity?: number;
}