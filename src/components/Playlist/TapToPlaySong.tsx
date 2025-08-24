import {Play} from "lucide-react"
import TapToPlayStyle from "@/styles/modules/TapToPlay.module.sass"

interface TapToPlaySongProps {
  artist: string
  songName: string
  length: string
  albumId?: string
  albumImage?: string
  onPlay?: () => void
}

export const TapToPlaySong = ({
                                artist = "Placeholder",
                                songName = "Placeholder",
                                length = "Placeholder",
                                onPlay
                              }: TapToPlaySongProps) => {
  
  const handleClick = () => {
    if (onPlay) {
      onPlay()
    }
  }

  return (
      <>
        <div 
          className={TapToPlayStyle['song-info']}
          onClick={handleClick}
          style={{ cursor: onPlay ? 'pointer' : 'default' }}
        >
          <div className={TapToPlayStyle['song-info__icon-wrap']}>
            <Play className={TapToPlayStyle['song-info__icon']}></Play>
          </div>
          <div className={TapToPlayStyle['song-info__wrapper']}>
            <p className={TapToPlayStyle['song-info__title']}>{songName}</p>
            <p className={TapToPlayStyle['song-info__artist']}>{artist}</p>
          </div>
          <p className={TapToPlayStyle['song-info__length']}>{length}</p>
        </div>
      </>
  );
};