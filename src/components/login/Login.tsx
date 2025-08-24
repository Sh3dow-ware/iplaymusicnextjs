import {Music} from 'lucide-react'
import "./spotify-login-button.sass"
import Link from "next/link";

const SpotifyLoginButton = () => (
    <div className={"spotify-login-wrapper"}>
      <Link className='spotify-login-button' href={
          `https://accounts.spotify.com/authorize?`
          + `response_type=code`
          + `&client_id=${process.env.SPOTIFY_CLIENT_ID}`
          + `&scope=user-read-private%20user-read-email`
          + `&redirect_uri=${process.env.CALLBACK_URL}`}>
        <Music size={48}/>
        <p>Login</p>
      </Link>
    </div>
)

export default SpotifyLoginButton