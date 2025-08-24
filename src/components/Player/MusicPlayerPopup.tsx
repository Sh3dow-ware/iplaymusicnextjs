'use client'

import { useState, useEffect, useRef } from 'react'
import { X, Play, Pause, SkipBack, SkipForward } from 'lucide-react'
import { SpotifyTrack } from '@/lib/spotifyApi'
import { getAlbumTracks } from '@/lib/spotifyApi'
import musicPlayerPopupStyle from '@/styles/modules/MusicPlayerPopup.module.sass'

declare global {
  interface Window {
    /** Callback triggered when Spotify iFrame API is ready */
    onSpotifyIframeApiReady?: (IFrameAPI: any) => void
  }
}

/** Props for the MusicPlayerPopup component */
interface MusicPlayerPopupProps {
  isOpen: boolean
  onCloseAction: () => void
  albumId: string
  albumName: string
  albumArtist: string
  albumImage?: string
}

/**
 * Popup component that embeds Spotify album tracks
 * and provides playback controls.
 */
export const MusicPlayerPopup = ({
                                   isOpen,
                                   onCloseAction,
                                   albumId,
                                   albumName,
                                   albumArtist,
                                   albumImage
                                 }: MusicPlayerPopupProps) => {
  const [tracks, setTracks] = useState<SpotifyTrack[]>([])
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const embedControllerRef = useRef<any>(null)

  /** Fetch album tracks when popup opens or album changes */
  useEffect(() => {
    if (!isOpen || !albumId) return
    setCurrentTrackIndex(0)
    fetchAlbumTracks()
  }, [isOpen, albumId])

  /**
   * Initialize Spotify iFrame API and attach controller
   * to manage playback when tracks are loaded.
   */
  useEffect(() => {
    if (!isOpen || tracks.length === 0) return
    const currentTrack = tracks[currentTrackIndex]
    if (!currentTrack?.uri) return

    const setupSpotifyController = (IFrameAPI: any) => {
      const element = document.getElementById('embed-iframe')
      if (!element) return

      // Clean up previous controller
      if (embedControllerRef.current) {
        try { embedControllerRef.current.destroy() } catch (e) { console.error(e) }
        embedControllerRef.current = null
      }

      const options = { uri: currentTrack.uri, width: '100%', height: 152 }
      IFrameAPI.createController(element, options, (controller: any) => {
        embedControllerRef.current = controller

        controller.addListener('ready', () => console.log('Spotify embed ready:', currentTrack.name))
        controller.addListener('playback_update', (e: any) => {
          const isPaused = e.data.isPaused
          const position = e.data.position || 0
          const duration = e.data.duration || 0

          // Update playback state
          setIsPlaying(!isPaused)

          // Stop if track ended
          if (!isPaused && duration > 0 && position >= duration) {
            setIsPlaying(false)
          }
        })

        controller.addListener('error', (e: any) => {
          console.error('Embed error:', e)
          setError('Failed to load Spotify player')
        })
      })
    }

    window.onSpotifyIframeApiReady = setupSpotifyController
  }, [isOpen, tracks, currentTrackIndex])

  /** Cleanup Spotify controller when popup closes */
  useEffect(() => {
    if (!isOpen && embedControllerRef.current) {
      try { embedControllerRef.current.destroy() } catch (e) { console.error(e) }
      embedControllerRef.current = null
    }
  }, [isOpen])

  /** Fetch tracks for the album */
  const fetchAlbumTracks = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await getAlbumTracks(albumId, { limit: 50 })
      setTracks(response.items || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch tracks')
    } finally {
      setLoading(false)
    }
  }

  /** Toggle play/pause */
  const togglePlayPause = () => embedControllerRef.current?.togglePlay()

  /** Skip to next track */
  const nextTrack = () => currentTrackIndex < tracks.length - 1 && setCurrentTrackIndex(currentTrackIndex + 1)

  /** Skip to previous track */
  const previousTrack = () => currentTrackIndex > 0 && setCurrentTrackIndex(currentTrackIndex - 1)

  /** Play selected track */
  const playTrack = (index: number) => setCurrentTrackIndex(index)

  /** Format milliseconds to "minutes:seconds" */
  const formatDuration = (ms: number) => {
    const minutes = Math.floor(ms / 60000)
    const seconds = Math.floor((ms % 60000) / 1000)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  if (!isOpen) return null
  const currentTrack = tracks[currentTrackIndex]

  return (
      <div className={musicPlayerPopupStyle.overlay}>
        <script src="https://open.spotify.com/embed/iframe-api/v1" defer async></script>

        <div className={musicPlayerPopupStyle.popup}>
          <div className={musicPlayerPopupStyle.header}>
            <div className={musicPlayerPopupStyle.albumInfo}>
              {albumImage && <img src={albumImage} alt={albumName} className={musicPlayerPopupStyle.albumImage} />}
              <div>
                <h3 className={musicPlayerPopupStyle.albumName}>{albumName}</h3>
                <p className={musicPlayerPopupStyle.albumArtist}>{albumArtist}</p>
              </div>
            </div>
            <button onClick={onCloseAction} className={musicPlayerPopupStyle.closeButton}><X size={24} /></button>
          </div>

          {currentTrack && (
              <div className={musicPlayerPopupStyle.currentPlayer}>
                <div className={musicPlayerPopupStyle.trackInfo}>
                  <h4 className={musicPlayerPopupStyle.trackName}>{currentTrack.name}</h4>
                  <p className={musicPlayerPopupStyle.trackArtist}>{currentTrack.artists.map(a => a.name).join(', ')}</p>
                </div>

                {currentTrack.uri && (
                    <div className={musicPlayerPopupStyle.spotifyPlayer}>
                      <div
                          id="embed-iframe"
                          style={{
                            width: '100%',
                            height: '152px',
                            backgroundColor: '#121212',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#fff'
                          }}
                      >
                        {!embedControllerRef.current && <div>Loading Spotify player...</div>}
                      </div>
                    </div>
                )}

                <div className={musicPlayerPopupStyle.controls}>
                  <button onClick={previousTrack} disabled={currentTrackIndex === 0} className={musicPlayerPopupStyle.controlButton}><SkipBack size={20} /></button>
                  <button onClick={togglePlayPause} className={`${musicPlayerPopupStyle.controlButton} ${musicPlayerPopupStyle.playButton}`}>
                    {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                  </button>
                  <button onClick={nextTrack} disabled={currentTrackIndex === tracks.length - 1} className={musicPlayerPopupStyle.controlButton}><SkipForward size={20} /></button>
                </div>
              </div>
          )}

          <div className={musicPlayerPopupStyle.trackList}>
            {loading && <div className={musicPlayerPopupStyle.loading}>Loading tracks...</div>}
            {error && <div className={musicPlayerPopupStyle.error}>Error: {error}</div>}
            {tracks.length > 0 && (
                <div className={musicPlayerPopupStyle.tracks}>
                  <h4 className={musicPlayerPopupStyle.trackListTitle}>Album Tracks</h4>
                  {tracks.map((track, index) => (
                      <div
                          key={track.id}
                          className={`${musicPlayerPopupStyle.trackItem} ${index === currentTrackIndex ? musicPlayerPopupStyle.activeTrack : ''}`}
                          onClick={() => playTrack(index)}
                      >
                        <div className={musicPlayerPopupStyle.trackNumber}>
                          {index === currentTrackIndex && isPlaying ? <div className={musicPlayerPopupStyle.playingIndicator}>♪</div> : <span>{index + 1}</span>}
                        </div>
                        <div className={musicPlayerPopupStyle.trackDetails}>
                          <p className={musicPlayerPopupStyle.trackTitle}>{track.name}</p>
                          <p className={musicPlayerPopupStyle.trackArtists}>{track.artists.map(a => a.name).join(', ')}</p>
                        </div>
                        <div className={musicPlayerPopupStyle.trackDuration}>{formatDuration(track.duration_ms)}</div>
                      </div>
                  ))}
                </div>
            )}
          </div>
        </div>
      </div>
  )
}
