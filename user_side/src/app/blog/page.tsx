import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Search, ChevronRight } from 'lucide-react';
import styles from './blog.module.css';
import productsStyles from '../products/products.module.css';

const blogPosts = [
  {
    id: 1,
    title: "India's Rising Role in Global Shrimp Markets",
    excerpt: "Analyzing the shift in aquaculture export dynamics and why the Indian subcontinent is...",
    category: "MARKET TRENDS",
    image: "https://images.unsplash.com/photo-1624300629298-e9de39c13be5?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 2,
    title: "The Science of Sub-Zero Logistics",
    excerpt: "How IoT and precision cooling technology are revolutionizing the transport of highly perishabl...",
    category: "LOGISTICS",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 3,
    title: "Ensuring Quality from Deck to Door",
    excerpt: "A deep dive into our proprietary quality control protocols that maintain the fresh-from-the-ocea...",
    category: "SUSTAINABILITY",
    image: "https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?auto=format&fit=crop&w=600&q=80"
  }
];

export default function BlogPage() {
  return (
    <main>
      <Header activePage="blog" />

      <section className={styles.blogHeader}>
        <div className="container">
          <span className={styles.featuredLabel}>FEATURED ANALYSIS</span>
          <h1 className={styles.featuredTitle}>Navigating the Future of Sustainable Seafood Export.</h1>
          <p className={styles.featuredDesc}>
            Insights on global market trends, cold chain innovations, and our commitment to quality across the oceanic supply chain.
          </p>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '60px', flexWrap: 'wrap', gap: '24px' }}>
            <div className={productsStyles.filterContainer} style={{ margin: 0 }}>
              <button className={`${productsStyles.filterBtn} ${productsStyles.filterBtnActive}`}>All Posts</button>
              <button className={productsStyles.filterBtn}>Global Sourcing</button>
              <button className={productsStyles.filterBtn}>Sustainability</button>
              <button className={productsStyles.filterBtn}>Industry News</button>
              <button className={productsStyles.filterBtn}>Cold Chain</button>
            </div>
            
            <div className={styles.searchBar}>
              <Search size={16} color="#64748b" />
              <input type="text" placeholder="Search insights..." className={styles.searchInput} />
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: '40px' }}>
        <div className={`container ${styles.blogContainer}`}>
          <div className={styles.blogGrid}>
            {blogPosts.map((post) => (
              <div key={post.id} className={`${styles.blogCard} animate-fade-up`}>
                <div className={styles.blogImageWrapper}>
                  <Image src={post.image} alt={post.title} width={400} height={240} className={styles.blogImg} />
                  <span className={styles.categoryTag}>{post.category}</span>
                </div>
                <h3 className={styles.blogTitle}>{post.title}</h3>
                <p className={styles.blogExcerpt}>{post.excerpt}</p>
                <a href="#" className={styles.readMore}>
                  Read More <ChevronRight size={16} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
