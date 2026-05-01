"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import QuoteModal from '@/components/QuoteModal';
import styles from './products.module.css';
import pageStyles from '../page.module.css';
import { getProducts, Product } from '@/lib/api';
import { Loader2, Package, ArrowRight, Search } from 'lucide-react';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    async function fetchData() {
      const data = await getProducts();
      const inStockData = data.filter(p => p.status === 'In Stock');
      setProducts(inStockData);
      setLoading(false);
    }
    fetchData();
  }, []);

  // Combined search + category filter — computed on every render
  const filteredProducts = products.filter(p => {
    const q = searchQuery.toLowerCase();
    const matchesSearch = !q || p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
    const matchesCategory = activeFilter === 'All' || p.category === activeFilter;
    return matchesSearch && matchesCategory;
  });

  const categories = ['All', 'Fish', 'Shrimp', 'Salmon', 'Cephalopods', 'Crab & Lobster', 'Tuna'];

  return (
    <main>
      <Header activePage="products" />

      <section className={styles.productsHeader}>
        <div className="container">
          <span className={pageStyles.sectionPretitle}>PREMIUM SEAFOOD EXPORTS</span>
          <h1 className={styles.catalogTitle}>Our Product Catalog</h1>
          <p className={styles.catalogDesc}>
            Sourced from the pristine depths of the global oceans, we bring you the finest fresh and frozen seafood, maintaining an unbroken cold chain from vessel to your facility.
          </p>

          {/* Search Bar */}
          <div className={styles.searchBar}>
            <Search size={20} className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search products by name or category..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>

          {/* Category Filter Chips */}
          <div className={styles.filterContainer}>
            {categories.map(cat => (
              <button
                key={cat}
                className={`${styles.filterBtn} ${activeFilter === cat ? styles.filterBtnActive : ''}`}
                onClick={() => setActiveFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0, minHeight: '400px' }}>
        <div className="container">
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '100px 0' }}>
              <Loader2 className="animate-spin" size={48} color="var(--primary-color)" />
            </div>
          ) : filteredProducts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '100px 0', color: 'var(--text-muted)' }}>
              <Package size={64} style={{ margin: '0 auto 24px', opacity: 0.2 }} />
              <h3>No products found.</h3>
              <p>Try a different search term or category filter.</p>
            </div>
          ) : (
            <div className={styles.productGrid}>
              {filteredProducts.map((product) => (
                <div key={product.id} className={`${styles.productCard} animate-fade-up`}>
                  <Link href={`/products/${product.id}`} className={styles.imageContainer}>
                    {product.images?.[0] ? (
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        width={400}
                        height={280}
                        className={styles.productImg}
                        unoptimized={true}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    ) : (
                      <div style={{ width: '100%', aspectRatio: '400/280', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Package size={48} color="#cbd5e1" />
                      </div>
                    )}
                    <span className={`${styles.badge} ${styles.badgeStock}`}>
                      STOCK AVAILABLE
                    </span>
                  </Link>
                  <div className={styles.productInfo}>
                    <span className={styles.priceTag}>{product.category}</span>
                    <h3 className={styles.cardTitle}>{product.name}</h3>
                    <p className={styles.cardText}>{product.description.substring(0, 100)}...</p>
                    <div className={styles.cardFooter}>
                      <button
                        className={`btn btn-primary ${styles.btnAction}`}
                        onClick={() => setSelectedProduct(product)}
                      >
                        Ask for Quote <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />

      {/* Quote Modal */}
      {selectedProduct && (
        <QuoteModal
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
          productId={selectedProduct.id}
          productName={selectedProduct.name}
        />
      )}
    </main>
  );
}
