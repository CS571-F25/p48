import { DownloadButton } from './DownloadButton'
import './Hero.css'

export function Hero() {
  return (
    <div className="hero-content">
      <div className="hero-left">
        <h1>Your Files. Organized in One Click.</h1>
        <p className="subtitle">
          Stop sorting by hand. Telescope creates an organized file system you can rely on.
        </p>
        <DownloadButton />
      </div>
      <div className="hero-right">
        <div className="placeholder-image"></div>
      </div>
    </div>
  )
}

