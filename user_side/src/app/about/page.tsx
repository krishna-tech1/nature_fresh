import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Anchor, ShieldAlert, Snowflake } from 'lucide-react';
import styles from './about.module.css';
import pageStyles from '../page.module.css';

export default function AboutPage() {
  return (
    <main>
      <Header activePage="about" />

      {/* Hero */}
      <section className={styles.aboutHero} style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?auto=format&fit=crop&w=1200&q=80")' }}>
        <div className={pageStyles.heroOverlay}></div>
        <div className="container">
          <div className={`${styles.aboutHeroContent} animate-fade-up`}>
            <span className={styles.established}>ESTABLISHED 1994</span>
            <h1 className={pageStyles.heroTitle}>Pioneering Global<br/><span>Freshness</span></h1>
            <p className={pageStyles.heroDesc}>
              For over three decades, Nature Fresh Foods has redefined the boundaries of seafood logistics, connecting the ocean's bounty to global tables with uncompromising speed and integrity.
            </p>
          </div>
        </div>
      </section>

      {/* Pursuit Section */}
      <section className="section">
        <div className={`container ${styles.pursuitGrid}`}>
          <div className={`${styles.fishImageWrapper} animate-fade-up delay-100`}>
            <Image 
              src="https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80" 
              alt="Fresh Fish" 
              width={600} 
              height={450} 
              className={styles.fishImage}
            />
            <div className={styles.quoteBox}>
              <p className={styles.quoteText}>"Quality is not an act, it is a maritime tradition."</p>
            </div>
          </div>
          <div className="animate-fade-up delay-200">
            <h2 className={pageStyles.sectionTitle}>The Fluid Pursuit of Perfection</h2>
            <p className={pageStyles.sourcingDesc}>
              Nature Fresh Foods began as a small boutique exporter in the pristine waters of the North Atlantic. Our founder's vision was simple: eliminate the friction between the harvest and the plate. Today, that vision has scaled into a global operation that spans four continents.
            </p>
            <p className={pageStyles.sourcingDesc}>
              We don't just ship seafood; we manage biological assets. Every shipment is treated as a high-stakes race against time, utilizing proprietary cold-chain technologies that keep our catch in a state of suspended freshness from port to pantry.
            </p>
            <p className={pageStyles.sourcingDesc}>
              Our commitment to sustainability isn't a marketing buzzword—it's the foundation of our longevity. We partner exclusively with fisheries that respect the cycle of the sea.
            </p>
          </div>
        </div>
      </section>

      {/* Heritage Timeline */}
      <section className={`section section-light ${styles.timelineSection}`}>
        <div className="container">
          <span className={pageStyles.sectionPretitle}>OUR HERITAGE</span>
          <h2 className={pageStyles.sectionTitle}>Milestones that shaped the oceanic supply chain</h2>
          
          <div className={styles.timelineGrid}>
            <div className={`${styles.timelineItem} animate-fade-up delay-100`}>
              <div className={styles.timelineDot}></div>
              <div className={styles.timelineYear}>2010</div>
              <h4 className={styles.timelineTitle}>The Seed</h4>
              <p className={styles.timelineDesc}>Secured our first international distribution license, bridging the gap between local coastal harvests and European luxury markets.</p>
            </div>
            
            <div className={`${styles.timelineItem} animate-fade-up delay-200`}>
              <div className={styles.timelineDot}></div>
              <div className={styles.timelineYear}>2015</div>
              <h4 className={styles.timelineTitle}>Global Expansion</h4>
              <p className={styles.timelineDesc}>Opening of our Asian hub in Singapore, enabling sub-24-hour delivery to the world's most demanding culinary markets.</p>
            </div>
            
            <div className={`${styles.timelineItem} animate-fade-up delay-300`}>
              <div className={styles.timelineDot}></div>
              <div className={styles.timelineYear}>2020</div>
              <h4 className={styles.timelineTitle}>Cold Chain Revolution</h4>
              <p className={styles.timelineDesc}>Launch of the 'Oceanic Pulse' AI-tracking system, providing real-time molecular-level monitoring of every shipment.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Info Cards */}
      <section className="section">
        <div className="container">
          <div className={pageStyles.advantageGrid}>
            <div className={`${pageStyles.advantageCard} animate-fade-up delay-100`}>
              <div className={pageStyles.advIconWrapper}><Anchor size={24} /></div>
              <h4 className={pageStyles.advTitle}>Integrity in Sourcing</h4>
              <p className={pageStyles.advDesc}>We maintain direct relationships with every vessel in our fleet, ensuring radical transparency from deck to door.</p>
            </div>
            
            <div className={`${pageStyles.advantageCard} animate-fade-up delay-200`}>
              <div className={pageStyles.advIconWrapper}><ShieldAlert size={24} /></div>
              <h4 className={pageStyles.advTitle}>Global Standards</h4>
              <p className={pageStyles.advDesc}>Exceeding international hygiene and ethical labor requirements. We set the bar for the global seafood trade.</p>
            </div>
            
            <div className={`${pageStyles.advantageCard} animate-fade-up delay-300`}>
              <div className={pageStyles.advIconWrapper}><Snowflake size={24} /></div>
              <h4 className={pageStyles.advTitle}>Unwavering Freshness</h4>
              <p className={pageStyles.advDesc}>Our logistics are built on the science of cryo-retention, ensuring the taste of the sea is preserved perfectly.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Architects/Team Section */}
      <section className={styles.teamSection}>
        <div className="container">
          <div className={styles.teamHeader}>
            <h2 className={pageStyles.sectionTitle} style={{ color: 'white' }}>The Architects of Excellence</h2>
            <p className={pageStyles.footerDesc}>A multi-disciplinary team uniting decades of maritime, logistical, and culinary expertise.</p>
          </div>
          
          <div className={styles.teamGrid}>
            <div className={styles.teamCard}>
              <Image 
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&h=500&q=80" 
                alt="Marcus Thorne" 
                width={300} 
                height={400} 
                className={styles.teamImage} 
                unoptimized={true}
                style={{ height: 'auto', objectFit: 'cover' }}
              />
              <h5 className={styles.memberName}>Marcus Thorne</h5>
              <p className={styles.memberRole}>CHIEF EXECUTIVE OFFICER</p>
            </div>
            <div className={styles.teamCard}>
              <Image 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&h=500&q=80" 
                alt="Elena Vance" 
                width={300} 
                height={400} 
                className={styles.teamImage} 
                unoptimized={true}
                style={{ height: 'auto', objectFit: 'cover' }}
              />
              <h5 className={styles.memberName}>Elena Vance</h5>
              <p className={styles.memberRole}>CHIEF OPERATIONS OFFICER</p>
            </div>
            <div className={styles.teamCard}>
              <Image 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&h=500&q=80" 
                alt="David Chen" 
                width={300} 
                height={400} 
                className={styles.teamImage} 
                unoptimized={true}
                style={{ height: 'auto', objectFit: 'cover' }}
              />
              <h5 className={styles.memberName}>David Chen</h5>
              <p className={styles.memberRole}>HEAD OF SOURCING</p>
            </div>
            <div className={styles.teamCard}>
              <Image 
                src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&h=500&q=80" 
                alt="Dr. Sarah Low" 
                width={300} 
                height={400} 
                className={styles.teamImage} 
                unoptimized={true}
                style={{ height: 'auto', objectFit: 'cover' }}
              />
              <h5 className={styles.memberName}>Dr. Sarah Low</h5>
              <p className={styles.memberRole}>HEAD OF SUSTAINABILITY</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={styles.statsSection}>
        <div className="container">
          <div className={styles.newStatsGrid}>
            <div className={styles.newStatItem}>
              <h3>40+</h3>
              <p>COUNTRIES REACHED</p>
            </div>
            <div className={styles.newStatItem}>
              <h3>150k</h3>
              <p>TONS PER YEAR</p>
            </div>
            <div className={styles.newStatItem}>
              <h3>25+</h3>
              <p>YEARS EXPERIENCE</p>
            </div>
          </div>
        </div>
      </section>

      {/* New CTA Section */}
      <section className={styles.ctaSectionNew} style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1439405326854-014607f694d7?auto=format&fit=crop&w=1200&q=80")' }}>
        <div className={styles.ctaOverlayNew}></div>
        <div className="container">
          <div className={styles.ctaContentNew}>
            <h2 className={styles.ctaTitleNew}>Ready to elevate your sourcing?</h2>
            <div className={styles.ctaButtonsNew}>
              <Link href="/contact"><button className={styles.btnPrimary}>Contact Our Team</button></Link>
              <Link href="/contact"><button className={styles.btnOutline}>Ask Quote</button></Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
