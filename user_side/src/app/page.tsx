"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShieldCheck, Truck, Globe, Handshake, CheckCircle2, Loader2, PackageSearch } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MapSection from '@/components/MapSection';
import styles from './page.module.css';
import { API_BASE_URL, Product } from '@/lib/api';

export default function Home() {
  const [latestProducts, setLatestProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestProducts = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/products`);
        const data = await res.json();
        if (Array.isArray(data)) {
          // Get the last 3 products (assuming they are returned in chronological order or we slice the end)
          setLatestProducts(data.slice(-3).reverse());
        }
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestProducts();
  }, []);

  return (
    <main>
      <Header activePage="home" />

      {/* Hero Section */}
      <section className={styles.hero} style={{ backgroundImage: 'url("/images/hero.png")' }}>
        <div className={styles.heroOverlay}></div>
        <div className="container">
          <div className={`${styles.heroContent} animate-fade-up`}>
            <span className={styles.heroTagline}>Excellence in Exportation</span>
            <h1 className={styles.heroTitle}>Premium Seafood <span>Exporters</span></h1>
            <p className={styles.heroDesc}>
              Delivering high-quality seafood products globally with trust and reliability. Bridging the gap between ocean bounty and premium global markets.
            </p>
            <div className={styles.heroActions}>
              <Link href="/contact"><button className="btn btn-white">ASK FOR QUOTE</button></Link>
              <Link href="/products"><button className="btn btn-outline">EXPLORE PRODUCTS</button></Link>
            </div>
          </div>
        </div>
      </section>

      {/* Sourcing Section */}
      <section className="section">
        <div className={`container ${styles.sourcingGrid}`}>
          <div className={`${styles.sourcingImageWrapper} animate-fade-up delay-100`}>
            <Image 
              src="/images/factory.png" 
              alt="Seafood Processing Facility" 
              width={600} 
              height={500} 
              className={styles.productImage}
              style={{ objectFit: 'cover', height: '100%' }}
            />
            <div className={styles.trustedBage}>
              <div className={styles.trustedText}>Trusted by 500+<br/>Global Distributors</div>
            </div>
          </div>
          <div className="animate-fade-up delay-200">
            <h2 className={styles.sectionTitle}>Sustainable Sourcing, Global Standards</h2>
            <p className={styles.sourcingDesc}>
              Nature Fresh Foods started with a vision to provide the world's finest seafood with uncompromising quality. Our state-of-the-art cold-chain infrastructure ensures that the freshness of the ocean is preserved from the moment of catch to delivery.
            </p>
            <div className={styles.featuresGrid}>
              <div className={styles.featureItem}>
                <CheckCircle2 size={28} className={styles.featureIcon} />
                <h4 className={styles.featureTitle}>Eco-Certified</h4>
                <p className={styles.featureDesc}>Committed to marine sustainability and ocean health.</p>
              </div>
              <div className={styles.featureItem}>
                <CheckCircle2 size={28} className={styles.featureIcon} />
                <h4 className={styles.featureTitle}>HACCP Approved</h4>
                <p className={styles.featureDesc}>Rigorous quality control at every processing stage.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="section section-light">
        <div className="container">
          <div className={styles.portfolioHeader}>
            <div>
              <span className={styles.sectionPretitle}>FRESH ARRIVALS</span>
              <h2 className={styles.sectionTitle} style={{ marginBottom: 0 }}>New Products</h2>
            </div>
            <Link href="/products" className={styles.viewAllLink}>View Full Catalog &rarr;</Link>
          </div>
          
          <div className={styles.portfolioGrid}>
            {loading ? (
              <div style={{gridColumn: '1/-1', display: 'flex', justifyContent: 'center', padding: '60px'}}>
                <Loader2 className="animate-spin" size={48} color="#0ea5e9" />
              </div>
            ) : latestProducts.length === 0 ? (
              <div style={{gridColumn: '1/-1', textAlign: 'center', padding: '60px'}}>
                <PackageSearch size={48} color="#94a3b8" style={{margin: '0 auto 16px'}} />
                <p style={{color: '#64748b'}}>Stay tuned! New products are coming soon.</p>
              </div>
            ) : (
              latestProducts.map((product, index) => (
                <div key={product.id} className={`${styles.productCard} animate-fade-up`} style={{animationDelay: `${(index + 1) * 100}ms`}}>
                  <div className={styles.imageBox}>
                    <Image 
                      src={product.images?.[0] || 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=800'} 
                      alt={product.name} 
                      width={400} 
                      height={250} 
                      className={styles.productImage} 
                      unoptimized={true}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <div className={styles.productContent}>
                    <span className={styles.productCategory}>{product.category}</span>
                    <h3 className={styles.productTitle}>{product.name}</h3>
                    <p className={styles.productDesc}>
                      {product.description.length > 80 
                        ? product.description.substring(0, 80) + '...' 
                        : product.description}
                    </p>
                    <Link href={`/products`} className={styles.btnFull}><button className={`btn btn-primary ${styles.btnFull}`}>View Details &rarr;</button></Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>


      {/* Footprint Section */}
      <MapSection />

      {/* Advantage Section */}
      <section className="section section-light">
        <div className="container">
          <div className={styles.advantageWrapper}>
            <span className={styles.sectionPretitle}>OUR ADVANTAGE</span>
            <h2 className={styles.sectionTitle} style={{ marginBottom: 0 }}>Why Global Leaders Partner With Us</h2>
          </div>
          <div className={styles.advantageGrid}>
            <div className={`${styles.advantageCard} animate-fade-up delay-100`}>
              <div className={styles.advIconWrapper}>
                <ShieldCheck size={24} />
              </div>
              <h4 className={styles.advTitle}>Quality Assurance</h4>
              <p className={styles.advDesc}>Three-tier inspection process for every batch, meeting MSC and BAP protocols.</p>
            </div>
            
            <div className={`${styles.advantageCard} animate-fade-up delay-200`}>
              <div className={styles.advIconWrapper}>
                <Truck size={24} />
              </div>
              <h4 className={styles.advTitle}>Reliable Logistics</h4>
              <p className={styles.advDesc}>Advanced real-time tracking and seamless temperature-controlled shipping lanes.</p>
            </div>
            
            <div className={`${styles.advantageCard} animate-fade-up delay-300`}>
              <div className={styles.advIconWrapper}>
                <Globe size={24} />
              </div>
              <h4 className={styles.advTitle}>Global Compliance</h4>
              <p className={styles.advDesc}>Adhering to international food safety protocols across six continents.</p>
            </div>
            
            <div className={`${styles.advantageCard} animate-fade-up delay-400`}>
              <div className={styles.advIconWrapper}>
                <Handshake size={24} />
              </div>
              <h4 className={styles.advTitle}>Strategic Partnership</h4>
              <p className={styles.advDesc}>We don't just supply, we bridge the gap with custom sourcing solutions.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
