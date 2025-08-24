import { NextResponse, NextRequest } from 'next/server'

async function refreshAccessToken(refreshToken: string): Promise<{ success: boolean; accessToken?: string; newRefreshToken?: string; error?: string }> {
  try {
    const response = await fetch(`https://accounts.spotify.com/api/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": `Basic ${btoa(process.env.SPOTIFY_CLIENT_ID + ":" + process.env.SPOTIFY_CLIENT_SECRET)}`
      },
      body: `grant_type=refresh_token&refresh_token=${refreshToken}`
    });

    if (!response.ok) {
      return { success: false, error: "Failed to refresh token" };
    }

    const data = await response.json();
    
    return {
      success: true,
      accessToken: data.access_token,
      newRefreshToken: data.refresh_token
    };
  } catch (error) {
    return { success: false, error: "Network error during token refresh" + error};
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip middleware for API routes and login page
  if (pathname.includes('/api') || pathname.includes("/login")) {
    return NextResponse.next()
  }

  const accessToken = request.cookies.get("ipm_access_token")?.value
  const refreshToken = request.cookies.get("ipm_refresh_token")?.value

  // No tokens at all - redirect to login
  if (!accessToken && !refreshToken) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // No access token but have refresh token - attempt to refresh
  if (!accessToken && refreshToken) {
    const refreshResult = await refreshAccessToken(refreshToken);
    
    if (refreshResult.success && refreshResult.accessToken) {
      // Create response and set new tokens
      const response = NextResponse.next();
      
      response.cookies.set({
        name: "ipm_access_token",
        value: refreshResult.accessToken,
        maxAge: 3600, // 1 hour default
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax'
      });

      // Update refresh token if a new one was provided
      if (refreshResult.newRefreshToken) {
        response.cookies.set({
          name: "ipm_refresh_token",
          value: refreshResult.newRefreshToken,
          maxAge: 60 * 60 * 24 * 30, // 30 days
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax'
        });
      }

      return response;
    } else {
      // Token refresh failed - clear cookies and show error
      const response = NextResponse.redirect(new URL("/login?error=token_refresh_failed", request.url));
      
      response.cookies.delete("ipm_access_token");
      response.cookies.delete("ipm_refresh_token");
      
      return response;
    }
  }

  return NextResponse.next()
}


export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api|.*\\.(?:png|jpg|jpeg|gif|webp|svg|css|js)).*)'
  ]
}