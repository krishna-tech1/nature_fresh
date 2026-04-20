import Link from 'next/link';
import styles from '../app/page.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container`}>
        <div className={styles.footerGrid}>
          <div>
            <div className={styles.footerLogo}>Nature <span>Fresh Foods</span></div>
            <p className={styles.footerDesc}>Premium seafood exporters providing global sourcing solutions with a focus on quality, sustainability, and absolute reliability.</p>
            <div className={styles.socialIcons}>
              <a href="#" className={styles.socialIcon} title="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="#" className={styles.socialIcon} title="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="#" className={styles.socialIcon} title="LinkedIn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
            </div>
          </div>
          
          <div>
            <h5 className={styles.footerHeading}>QUICK LINKS</h5>
            <div className={styles.footerLinks}>
              <Link href="/">Home</Link>
              <Link href="/about">About</Link>
              <Link href="/products">Products</Link>
              <Link href="/sourcing">Global Sourcing</Link>
              <Link href="/blog">Blog</Link>
              <Link href="/contact">Contact</Link>
            </div>
          </div>
          
          <div>
            <h5 className={styles.footerHeading}>LOCATION</h5>
            <div className={styles.footerAddress}>
              <p>
                Office 10, Level 1, Sharjah Media City,<br />
                P.O.Box 515000, Sharjah, UAE
              </p>
            </div>
          </div>
        </div>
        
        <div className={styles.footerBottom}>
          <p>&copy; {new Date().getFullYear()} Nature Fresh</p>
        </div>
      </div>
    </footer>
  );
}
