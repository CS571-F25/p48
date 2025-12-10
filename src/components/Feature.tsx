import './Feature.css'

interface FeatureProps {
  title: string
  subtitle: string
  image: string
  direction: 'left' | 'right'
}

export function Feature({ title, subtitle, image, direction }: FeatureProps) {
  return (
    <div className={`feature ${direction}`}>
      <div className="feature-content">
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>
      <img src={image} alt={title} />
    </div>
  )
}
