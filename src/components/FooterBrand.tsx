import { NavLink } from 'react-router-dom'
import telescopeLogo from '../assets/telescope.svg'
import './Footer.css'

export function FooterBrand() {
  return (
    <div className="footer-brand">
      <NavLink to="/" className="footer-logo-link">
        <img src={telescopeLogo} alt="Telescope" className="footer-logo" />
      </NavLink>
      <p className="footer-tagline">Let AI Sort Your Files</p>
    </div>
  )
}
