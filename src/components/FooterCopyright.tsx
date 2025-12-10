import './Footer.css'

export function FooterCopyright() {
  const currentYear = new Date().getFullYear()

  return (
    <div className="footer-copyright">
      <p>© {currentYear} Telescope. All rights reserved.</p>
    </div>
  )
}
