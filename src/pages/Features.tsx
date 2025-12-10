import { StarfieldBackground } from '../components/StarfieldBackground'
import { Feature } from '../components/Feature'
import '../App.css'
import './Features.css'
import feature1Gif from '../assets/feature1.gif'
import feature2Webp from '../assets/feature2.webp'
import feature3Webp from '../assets/feature3.webp'

export function Features() {
  return (
    <>
      <StarfieldBackground />
      <div className="main-content features-container">
        <h1 className="features-title">Set it and forget it</h1>
        <p className="features-subtitle">
          No more wasting time sorting files manually. Just drag in your files, and Telescope takes care of the rest.
        </p>

        <Feature
          title="Real-time sorting"
          subtitle="Just pick a folder, and Telescope will automatically keep it tidy as you add more files to it."
          image={feature3Webp}
          direction="left"
        />

        <Feature
          title="Delete duplicates instantly"
          subtitle="Duplicate files are highlighted and can be deleted with a single click."
          image={feature2Webp}
          direction="right"
        />

        <Feature
          title="Telescope creates a custom folder system"
          subtitle="A highly logical folder structure that adapts to your needs."
          image={feature1Gif}
          direction="left"
        />
      </div>
    </>
  )
}
