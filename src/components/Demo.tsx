import { useRef, useEffect } from 'react'
import './Demo.css'
import demoVideo from '../assets/demo.mp4'

export function Demo() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5
    }
  }, [])

  return (
    <div className="demo-container">
      <video
        ref={videoRef}
        src={demoVideo}
        className="demo-video"
        autoPlay
        loop
        muted
        playsInline
        aria-label="Telescope demo"
      >
        Your browser does not support the video tag.
      </video>
    </div>
  )
}
