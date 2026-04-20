import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import styles from './gallery.module.css';

const galleryImages = [
  { id: 1, src: "https://images.unsplash.com/photo-1624300629298-e9de39c13be5?auto=format&fit=crop&w=600&q=80", alt: "Fresh Shrimps" },
  { id: 2, src: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=600&q=80", alt: "Atlantic Salmon Salmon" },
  { id: 3, src: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80", alt: "Factory Processing" },
  { id: 4, src: "https://images.unsplash.com/photo-1624300629298-e9de39c13be5?auto=format&fit=crop&w=600&q=80", alt: "Fresh Shrimps" },
  { id: 5, src: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=600&q=80", alt: "Atlantic Salmon Salmon" },
  { id: 6, src: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80", alt: "Factory Processing" },
  { id: 7, src: "https://images.unsplash.com/photo-1505144808419-1957a94ca61e?auto=format&fit=crop&w=600&q=80", alt: "Cold Chain Transport" },
  { id: 8, src: "https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?auto=format&fit=crop&w=600&q=80", alt: "Fishing Vessel" },
  { id: 9, src: "https://images.unsplash.com/photo-1550951053-48e02d442017?auto=format&fit=crop&w=600&q=80", alt: "King Lobster" }
];

export default function GalleryPage() {
  return (
    <main>
      <Header activePage="gallery" />

      <section className={styles.galleryHeader}>
        <div className="container">
          <h1 className={styles.galleryTitle}>Gallery</h1>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className={styles.galleryGrid}>
            {galleryImages.map((image) => (
              <div key={image.id} className={`${styles.galleryItem} animate-fade-up`}>
                <Image 
                  src={image.src} 
                  alt={image.alt} 
                  width={600} 
                  height={450} 
                  className={styles.galleryImage}
                />
                <div className={styles.imageOverlay}>
                  <span className={styles.overlayText}>View Full Image</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
