import { getAlbumsServer } from "@/lib/spotifyServerApi"
import { SpotifyAlbum } from "@/lib/spotifyApi"
import { ThemeProvider } from "@/components/providers/ThemeProvider"
import {FooterBar} from "@/components/Footer/FooterBar";
import {NavBarNavigation} from "@/components/Header/NavBarNavigation";

export default async function FeaturedPage() {
  let albums: SpotifyAlbum[] = []
  let error: string | null = null

  try {
    const response = await getAlbumsServer({ limit: 20 })
    albums = response.albums?.items || response.items || []
  } catch (err) {
    error = err instanceof Error ? err.message : "Failed to fetch new releases"
    console.error("Error fetching albums:", err)
  }

  return (
      <ThemeProvider>
        <NavBarNavigation titleForNavigation={"Featured"} returnToPreviousLink={true} searchIcon={true} withAbsolute={false} color={"#ffffff"} />
        <div className="p-6">

          {error && (
              <div className="text-red-500 mb-4">
                Error loading albums: {error}
              </div>
          )}

          {albums.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-10">
                {albums.map((album) => (
                    <div key={album.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                      {album.images?.[0] && (
                          <img
                              src={album.images[0].url}
                              alt={album.name}
                              className="w-full h-48 object-cover rounded"
                          />
                      )}
                      <div className="p-4">
                        <h3 className="font-semibold text-lg mb-2 truncate">{album.name}</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          {album.artists.map((artist) => artist.name).join(", ")}
                        </p>
                        <p className="text-gray-500 dark:text-gray-500 text-xs mt-1">
                          {album.release_date} • {album.total_tracks} tracks
                        </p>
                      </div>
                    </div>
                ))}
              </div>
          ) : !error && (
              <div className="text-gray-500">No albums found.</div>
          )}
        </div>
      <FooterBar></FooterBar>
      </ThemeProvider>
  )
}
