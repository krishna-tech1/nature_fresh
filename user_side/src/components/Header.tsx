'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import styles from '../app/page.module.css';

export default function Header({ activePage = 'home' }: { activePage?: string }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.headerContainer}`}>
        <div className={styles.logo}>
          Nature <span>Fresh Foods</span>
        </div>
        
        {/* Desktop Nav */}
        <nav className={styles.nav}>
          <Link href="/" className={activePage === 'home' ? styles.navLinkActive : styles.navLink}>Home</Link>
          <Link href="/about" className={activePage === 'about' ? styles.navLinkActive : styles.navLink}>About</Link>
          <Link href="/products" className={activePage === 'products' ? styles.navLinkActive : styles.navLink}>Products</Link>
          <Link href="/blog" className={activePage === 'blog' ? styles.navLinkActive : styles.navLink}>Blog</Link>
          <Link href="/gallery" className={activePage === 'gallery' ? styles.navLinkActive : styles.navLink}>Gallery</Link>
          <Link href="/contact" className={activePage === 'contact' ? styles.navLinkActive : styles.navLink}>Contact</Link>
        </nav>

        <div className={styles.headerActions}>
          <Link href="/contact">
            <button className={`btn ${styles.btnContact}`}>Call Us</button>
          </Link>
          
          {/* Mobile Menu Toggle */}
          <button 
            className={styles.menuToggle} 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.mobileMenuOpen : ''}`}>
        <nav className={styles.mobileNav}>
          <Link href="/" onClick={() => setIsMenuOpen(false)} className={activePage === 'home' ? styles.mobileNavLinkActive : styles.mobileNavLink}>Home</Link>
          <Link href="/about" onClick={() => setIsMenuOpen(false)} className={activePage === 'about' ? styles.mobileNavLinkActive : styles.mobileNavLink}>About</Link>
          <Link href="/products" onClick={() => setIsMenuOpen(false)} className={activePage === 'products' ? styles.mobileNavLinkActive : styles.mobileNavLink}>Products</Link>
          <Link href="/blog" onClick={() => setIsMenuOpen(false)} className={activePage === 'blog' ? styles.mobileNavLinkActive : styles.mobileNavLink}>Blog</Link>
          <Link href="/gallery" onClick={() => setIsMenuOpen(false)} className={activePage === 'gallery' ? styles.mobileNavLinkActive : styles.mobileNavLink}>Gallery</Link>
          <Link href="/contact" onClick={() => setIsMenuOpen(false)} className={activePage === 'contact' ? styles.mobileNavLinkActive : styles.mobileNavLink}>Contact</Link>
          <Link href="/contact" onClick={() => setIsMenuOpen(false)}>
            <button className={`btn ${styles.btnContact} ${styles.mobileMenuBtn}`}>Call Us</button>
          </Link>
        </nav>
      </div>
    </header>
  );
}
