import { Container, Row, Col } from 'react-bootstrap'
import { FooterBrand } from './FooterBrand'
import { FooterLinksSection } from './FooterLinksSection'
import { FooterCopyright } from './FooterCopyright'
import './Footer.css'

export function Footer() {
  const navigationLinks = [
    { to: '/', label: 'Home' },
    { to: '/features', label: 'Features' },
    { to: '/blog', label: 'Blog' },
  ]

  const legalLinks = [
    { href: '#', label: 'Terms of Service' },
    { href: '#', label: 'Privacy Policy' },
  ]

  return (
    <footer className="footer">
      <Container className="footer-container">
        <Row className="footer-content">
          <Col xs={12} md={4}>
            <FooterBrand />
          </Col>

          <Col xs={12} md={4}>
            <FooterLinksSection title="Navigation" links={navigationLinks} />
          </Col>

          <Col xs={12} md={4}>
            <FooterLinksSection title="Legal" links={legalLinks} />
          </Col>
        </Row>

        <Row>
          <Col xs={12}>
            <FooterCopyright />
          </Col>
        </Row>
      </Container>
    </footer>
  )
}
