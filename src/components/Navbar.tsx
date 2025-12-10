import { Navbar as BootstrapNavbar, Nav, Container } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import telescopeLogo from '../assets/telescope.svg'
import './Navbar.css'

export function Navbar() {
  return (
    <BootstrapNavbar className="navbar" variant="dark">
      <Container fluid className="navbar-container">
        <BootstrapNavbar.Brand as={NavLink} to="/" className="navbar-brand-custom">
          <img src={telescopeLogo} alt="Telescope" className="navbar-logo" />
        </BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle />
        <BootstrapNavbar.Collapse id="navbar-nav">
          <Nav className="navbar-nav-centered">
            <Nav.Link as={NavLink} to="/" end>
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/features">
              Features
            </Nav.Link>
            <Nav.Link as={NavLink} to="/blog">
              Blog
            </Nav.Link>
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  )
}

