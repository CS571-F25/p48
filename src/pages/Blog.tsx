import { StarfieldBackground } from '../components/StarfieldBackground'
import '../App.css'

export function Blog() {
  return (
    <>
      <StarfieldBackground />
      <div className="main-content">
        <div className="content-left">
          <h1>Blog</h1>
          <p className="subtitle">
            Stay updated with the latest news, updates, and insights about Telescope.
          </p>
          <div style={{ marginTop: '2rem' }}>
            <div style={{ marginBottom: '2rem', paddingBottom: '2rem', borderBottom: '1px solid rgba(139, 92, 246, 0.3)' }}>
              <h2 style={{ color: '#e0e7ff', marginBottom: '0.5rem' }}>Introducing Telescope 1.0</h2>
              <p style={{ color: '#c7d2fe', marginBottom: '0.5rem', fontSize: '0.9rem' }}>January 15, 2024</p>
              <p style={{ color: '#c7d2fe' }}>
                We're excited to announce the release of Telescope 1.0, featuring improved file organization algorithms and a brand new user interface.
              </p>
            </div>
            <div style={{ marginBottom: '2rem', paddingBottom: '2rem', borderBottom: '1px solid rgba(139, 92, 246, 0.3)' }}>
              <h2 style={{ color: '#e0e7ff', marginBottom: '0.5rem' }}>Best Practices for File Organization</h2>
              <p style={{ color: '#c7d2fe', marginBottom: '0.5rem', fontSize: '0.9rem' }}>December 20, 2023</p>
              <p style={{ color: '#c7d2fe' }}>
                Learn how to get the most out of Telescope with these tips and best practices for organizing your files efficiently.
              </p>
            </div>
            <div>
              <h2 style={{ color: '#e0e7ff', marginBottom: '0.5rem' }}>Behind the Scenes: How Telescope Works</h2>
              <p style={{ color: '#c7d2fe', marginBottom: '0.5rem', fontSize: '0.9rem' }}>November 10, 2023</p>
              <p style={{ color: '#c7d2fe' }}>
                A deep dive into the technology and algorithms that power Telescope's intelligent file organization system.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

