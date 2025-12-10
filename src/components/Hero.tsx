import { useState } from 'react'
import { Button } from 'react-bootstrap'
import './Hero.css'

export function Hero() {
  const [email, setEmail] = useState('')

  const handleJoinWaitlist = () => {
    setEmail('')
    window.open('https://forms.gle/SLPKMvBQmM6NutQd6', '_blank')
  }

  return (
    <section className="hero-section">
      <div className="hero-container">
        <h1 className="hero-title">Let AI Sort Your Files</h1>
        <p className="hero-subtitle">Telescope auto-organizes files so you never waste time searching again</p>
        <div className="hero-waitlist">
          <input
            type="text"
            className="hero-input"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button variant="primary" onClick={handleJoinWaitlist} className="hero-button">
            Join Waitlist
          </Button>
        </div>
      </div>
    </section>
  )
}
