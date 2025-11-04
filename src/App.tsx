import { StarfieldBackground } from './components/StarfieldBackground'
import { DownloadButton } from './components/DownloadButton'
import './App.css'

function App() {
  return (
    <>
      <StarfieldBackground />
      <div className="main-content">
        <div className="content-left">
          <h1>Your Files. Organized in One Click.</h1>
          <p className="subtitle">
            Stop sorting by hand. Telescope creates an organized file system you can rely on.
          </p>
          <DownloadButton />
        </div>
        <div className="content-right">
          <div className="placeholder-image"></div>
        </div>
      </div>
    </>
  )
}

export default App
