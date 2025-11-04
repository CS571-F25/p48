import './DownloadButton.css'

export function DownloadButton() {
  const getDownloadText = () => {
    const platform = navigator.platform.toLowerCase()
    if (platform.includes('mac')) {
      return 'Download for Mac'
    }
    return 'Download for Windows/Linux'
  }

  return (
    <button className="download-button">
      {getDownloadText()}
    </button>
  )
}

