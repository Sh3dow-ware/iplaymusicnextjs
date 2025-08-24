import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

// Spotify API base URL
const SPOTIFY_API_BASE = "https://api.spotify.com/v1";

// Helper to make authenticated Spotify API requests
async function makeSpotifyRequest(endpoint: string, accessToken: string, options: RequestInit = {}) {
  const response = await fetch(`${SPOTIFY_API_BASE}${endpoint}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${accessToken}`,
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

// Only the endpoints actually used in the app: albums and album-tracks
export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("ipm_access_token")?.value;

    if (!accessToken) {
      return NextResponse.json(
        { error: "No access token available. Please login." },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");
    const query = searchParams.get("query");
    const limit = searchParams.get("limit") || "20";
    const offset = searchParams.get("offset") || "0";
    const id = searchParams.get("id");
    const ids = searchParams.get("ids");

    let data: any;

    switch (type) {
      case "albums": {
        if (ids) {
          data = await makeSpotifyRequest(`/albums?ids=${ids}`, accessToken);
        } else if (query) {
          data = await makeSpotifyRequest(
            `/search?q=${encodeURIComponent(query)}&type=album&limit=${limit}&offset=${offset}`,
            accessToken
          );
          data = data.albums;
        } else {
          data = await makeSpotifyRequest(
            `/browse/new-releases?limit=${limit}&offset=${offset}`,
            accessToken
          );
        }
        break;
      }

      case "album-tracks": {
        if (!id) {
          return NextResponse.json(
            { error: "Album ID is required" },
            { status: 400 }
          );
        }
        data = await makeSpotifyRequest(
          `/albums/${id}/tracks?limit=${limit}&offset=${offset}`,
          accessToken
        );
        break;
      }

      default:
        return NextResponse.json(
          {
            error: "Invalid type parameter",
            availableTypes: ["albums", "album-tracks"],
          },
          { status: 400 }
        );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Spotify API error:", error);

    if (error instanceof Error && error.message.includes("401")) {
      return NextResponse.json(
        { error: "Access token expired. Please refresh your session." },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: "Failed to fetch data from Spotify API" },
      { status: 500 }
    );
  }
}