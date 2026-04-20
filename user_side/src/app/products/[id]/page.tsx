"use client";

import { useState, useEffect, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import QuoteModal from '@/components/QuoteModal';
import styles from '../product-details.module.css';
import { getProductById, Product } from '@/lib/api';
import { 
  Loader2, 
  ArrowLeft, 
  Package,
  Mail
} from 'lucide-react';

export default function ProductDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [showQuoteModal, setShowQuoteModal] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const data = await getProductById(id);
      setProduct(data);
      setLoading(false);
    }
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <main className={styles.detailsPage} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Loader2 className="animate-spin" size={48} color="var(--primary)" />
      </main>
    );
  }

  if (!product) {
    return (
      <main className={styles.detailsPage}>
        <Header activePage="products" />
        <div className="container" style={{ textAlign: 'center', paddingTop: '100px' }}>
          <Package size={64} style={{ margin: '0 auto 24px', opacity: 0.2 }} />
          <h1>Product Not Found</h1>
          <p>The product you are looking for does not exist or has been removed.</p>
          <Link href="/products" className="btn btn-primary" style={{ marginTop: '24px' }}>Back to Catalog</Link>
        </div>
        <Footer />
      </main>
    );
  }

  // Format description into list items if it contains hyphens or line breaks
  const formatDescription = (desc: string) => {
    // Basic formatting: split by newlines or hyphen followed by text
    const lines = desc.split('\n').filter(line => line.trim() !== '');
    if (lines.length > 1 || desc.includes('-')) {
      return (
        <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
          {desc.split(/(?=\n-|\n)/).map((line, i) => (
            <li key={i} style={{ marginBottom: '8px', paddingLeft: line.trim().startsWith('-') ? '0' : '0' }}>
              {line.trim()}
            </li>
          ))}
        </ul>
      );
    }
    return <p className={styles.description}>{desc}</p>;
  };

  // Filter out any empty string URLs from the images array
  const validImages = product.images ? product.images.filter(img => img && img.trim() !== '') : [];

  return (
    <main className={styles.detailsPage}>
      <Header activePage="products" />

      <section className="container" style={{ paddingBottom: '80px' }}>
        <Link href="/products" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '32px', color: '#64748b', fontWeight: 600, textDecoration: 'none' }}>
          <ArrowLeft size={18} />
          Back to Catalog
        </Link>

        <div className={styles.detailsGrid}>
          {/* Gallery Section - Left Side */}
          <div className={styles.gallery}>
            <div className={styles.mainImageContainer}>
              {validImages[activeImage] ? (
                <Image 
                  src={validImages[activeImage]} 
                  alt={product.name} 
                  fill
                  unoptimized={true}
                  style={{ objectFit: 'cover' }}
                  priority
                />
              ) : (
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Package size={64} color="#cbd5e1" />
                </div>
              )}
            </div>
            
            {validImages.length > 1 && (
              <div className={styles.thumbnailGrid}>
                {validImages.map((url, index) => (
                  <div 
                    key={index} 
                    className={`${styles.thumbnail} ${activeImage === index ? styles.activeThumbnail : ''}`}
                    onClick={() => setActiveImage(index)}
                  >
                    <Image 
                      src={url} 
                      alt={`Thumbnail ${index}`} 
                      fill
                      unoptimized={true}
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Info Section - Right Side */}
          <div className={styles.info}>
            <div className={styles.pretitleContainer}>
              <span className={styles.categoryLabel}>{product.category}</span>
              <span className={styles.statusBadge}>
                {product.status === 'In Stock' ? 'Stock Available' : product.status}
              </span>
            </div>
            
            <h1 className={styles.title}>{product.name}</h1>
            
            <div className={styles.description}>
              {formatDescription(product.description)}
            </div>

            <button className={styles.quoteBtn} onClick={() => setShowQuoteModal(true)}>
              <Mail size={18} />
              Ask for Quote
            </button>
          </div>
        </div>
      </section>

      <Footer />

      {product && (
        <QuoteModal
          isOpen={showQuoteModal}
          onClose={() => setShowQuoteModal(false)}
          productId={product.id}
          productName={product.name}
        />
      )}
    </main>
  );
}
