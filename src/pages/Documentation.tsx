import { StarfieldBackground } from '../components/StarfieldBackground'
import '../App.css'

export function Documentation() {
  return (
    <>
      <StarfieldBackground />
      <div className="main-content">
        <div className="content-left">
          <h1>Documentation</h1>
          <p className="subtitle">
            Welcome to the Telescope documentation. Here you'll find guides, API references, and examples to help you get started.
          </p>
          <div style={{ marginTop: '2rem' }}>
            <h2 style={{ color: '#e0e7ff', marginBottom: '1rem' }}>Getting Started</h2>
            <p style={{ color: '#c7d2fe', marginBottom: '1rem' }}>
              Learn how to install and configure Telescope for your project.
            </p>
            <h2 style={{ color: '#e0e7ff', marginBottom: '1rem' }}>API Reference</h2>
            <p style={{ color: '#c7d2fe', marginBottom: '1rem' }}>
              Explore the complete API documentation with detailed examples.
            </p>
            <h2 style={{ color: '#e0e7ff', marginBottom: '1rem' }}>Examples</h2>
            <p style={{ color: '#c7d2fe' }}>
              Browse through code examples and use cases to see Telescope in action.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

