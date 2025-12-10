import { NavLink } from 'react-router-dom'
import './Footer.css'

interface FooterLinksSectionProps {
  title: string
  links: Array<{
    to?: string
    href?: string
    label: string
  }>
}

export function FooterLinksSection({ title, links }: FooterLinksSectionProps) {
  return (
    <div className="footer-section">
      <h4 className="footer-section-title">{title}</h4>
      <nav className="footer-nav">
        {links.map((link, index) => {
          if (link.to) {
            return (
              <NavLink
                key={index}
                to={link.to}
                className="footer-link"
                end={link.to === '/'}
              >
                {link.label}
              </NavLink>
            )
          }
          return (
            <a
              key={index}
              href={link.href || '#'}
              className="footer-link"
              onClick={(e) => e.preventDefault()}
            >
              {link.label}
            </a>
          )
        })}
      </nav>
    </div>
  )
}
