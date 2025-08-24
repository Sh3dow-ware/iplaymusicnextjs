'use client'

import { useState, useEffect } from 'react'
import playlistSectionStyle from "@/styles/modules/PlaylistSection.module.sass"
import { NavBarNavigation } from "@/components/Header/NavBarNavigation"
import { Carousel } from "@/components/Playlist/PlaylistCarousel"
import { TapToPlaySong } from "@/components/Playlist/TapToPlaySong"
import { MusicPlayerPopup } from "@/components/Player/MusicPlayerPopup"
import { COLORS } from "@/lib/colors"
import { getAlbums } from "@/lib/spotifyApi"
import { SpotifyAlbum } from "@/lib/spotifyApi"
import {SoundWave} from "@/components/Playlist/SoundWave";

export const PlaylistSection = () => {
  const [albums, setAlbums] = useState<SpotifyAlbum[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedAlbum, setSelectedAlbum] = useState<SpotifyAlbum | null>(null)
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  useEffect(() => {
    fetchAlbums()
  }, [])

  const fetchAlbums = async () => {
    try {
      setLoading(true)
      const response = await getAlbums({ limit: 8 })
      setAlbums(response.albums?.items || response.items || [])
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch albums")
      console.error("Error fetching albums:", err)
    } finally {
      setLoading(false)
    }
  }

  const handlePlayAlbum = (album: SpotifyAlbum) => {
    setSelectedAlbum(album)
    setIsPopupOpen(true)
  }

  const closePopup = () => {
    setIsPopupOpen(false)
    setSelectedAlbum(null)
  }

  return (
      <div className={playlistSectionStyle.playlist}>
        <SoundWave></SoundWave>
        <NavBarNavigation
            returnToPreviousLink={true}
            titleForNavigation={"PLAYLISTS"}
            searchIcon={true}
            withAbsolute={false}
            color={COLORS.white}
        />

        {loading && (
            <p className="text-gray-500 mb-4">Loading albums...</p>
        )}

        {error && (
            <p className="text-red-500 mb-4">Error loading albums: {error}</p>
        )}

        {albums.length > 0 ? (
            <Carousel
                images={albums.map((album) => album.images?.[0]?.url || "")}
            />
        ) : !error && !loading && (
            <p className="text-gray-500">No albums found.</p>
        )}
        
        <div className={"w-full h-100 overflow-y-scroll"}>
        {albums.map((album) => (
            <TapToPlaySong
                key={album.id}
                songName={album.name}
                artist={album.artists.map((a) => a.name).join(", ")}
                length={album.release_date}
                albumId={album.id}
                albumImage={album.images?.[0]?.url}
                onPlay={() => handlePlayAlbum(album)}
            />
        ))}
        </div>
        
        <p className={playlistSectionStyle["playlist__listen-button"]}>Listen All</p>

        {/* Music Player Popup */}
        {selectedAlbum && (
          <MusicPlayerPopup
            isOpen={isPopupOpen}
            onCloseAction={closePopup}
            albumId={selectedAlbum.id}
            albumName={selectedAlbum.name}
            albumArtist={selectedAlbum.artists.map((a) => a.name).join(", ")}
            albumImage={selectedAlbum.images?.[0]?.url}
          />
        )}

      </div>
  )
}
