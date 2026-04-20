"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle2 } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import styles from './contact.module.css';
import { API_BASE_URL } from '@/lib/api';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`${API_BASE_URL}/inquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        const data = await res.json();
        setError(data.error || 'Failed to submit inquiry. Please try again.');
      }
    } catch (err) {
      setError('Connection failed. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <Header activePage="contact" />

      <section className={styles.contactSection}>
        <div className="container">
          <div className={styles.contactGrid}>
            
            {/* Left Column: Contact Info */}
            <div className={`${styles.contactInfo} animate-fade-up`}>
              <span className={styles.preTitle}>NATURE FRESH FOODS</span>
              <h1 className={styles.title}>Get in touch with our team</h1>
              
              <div className={styles.infoList}>
                <div className={styles.infoItem}>
                  <div className={styles.iconWrapper}>
                    <Mail size={24} />
                  </div>
                  <div>
                    <span className={styles.infoLabel}>EMAIL INQUIRY</span>
                    <div className={styles.infoValue}>sales@naturefreshfoods.in</div>
                  </div>
                </div>

                <div className={styles.infoItem}>
                  <div className={styles.iconWrapper}>
                    <Phone size={24} />
                  </div>
                  <div>
                    <span className={styles.infoLabel}>DIRECT SUPPORT</span>
                    <div className={styles.infoValue}>+91 22 4567 8901</div>
                  </div>
                </div>

                <div className={styles.infoItem}>
                  <div className={styles.iconWrapper}>
                    <MapPin size={24} />
                  </div>
                  <div>
                    <span className={styles.infoLabel}>HEAD QUARTERS</span>
                    <div className={styles.infoValue}>
                      Marine Plaza, Floor 8,<br />
                      Nariman Point, Mumbai 400021
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.mapImage}>
                <Image 
                  src="/map.png" 
                  alt="Our Location" 
                  width={500} 
                  height={300} 
                  style={{ objectFit: 'cover', width: '100%' }}
                />
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div className={`${styles.contactForm} animate-fade-up delay-100`}>
              <div className={styles.formCard}>
                {submitted ? (
                  <div className={styles.successMessage}>
                    <div className={styles.successIcon}>
                      <CheckCircle2 size={48} />
                    </div>
                    <h2>Message Sent!</h2>
                    <p>Thank you for reaching out. Our team will get back to you shortly.</p>
                    <button className={styles.submitBtn} onClick={() => {setSubmitted(false); setForm({name:'', email:'', subject:'', message:''})}}>
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className={styles.formGrid}>
                      <div className={styles.formGroup}>
                        <label className={styles.label}>FULL NAME *</label>
                        <input 
                          type="text" 
                          className={styles.input} 
                          placeholder="John Doe" 
                          required 
                          maxLength={50}
                          value={form.name}
                          onChange={(e) => setForm({...form, name: e.target.value})}
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <label className={styles.label}>EMAIL ADDRESS *</label>
                        <input 
                          type="email" 
                          className={styles.input} 
                          placeholder="john@company.com" 
                          required 
                          maxLength={50}
                          value={form.email}
                          onChange={(e) => setForm({...form, email: e.target.value})}
                        />
                      </div>
                      <div className={`${styles.formGroup} ${styles.formGroupFull}`}>
                        <label className={styles.label}>SUBJECT *</label>
                        <input 
                          type="text" 
                          className={styles.input} 
                          placeholder="Bulk Order / Partnership / Logistics" 
                          required 
                          maxLength={100}
                          value={form.subject}
                          onChange={(e) => setForm({...form, subject: e.target.value})}
                        />
                      </div>
                      <div className={`${styles.formGroup} ${styles.formGroupFull}`}>
                        <label className={styles.label}>MESSAGE *</label>
                        <textarea 
                          className={styles.textarea} 
                          placeholder="Tell us about your logistics or product requirements..."
                          required
                          maxLength={1000}
                          value={form.message}
                          onChange={(e) => setForm({...form, message: e.target.value})}
                        ></textarea>
                        <div className={styles.charCount}>{form.message.length} / 1000</div>
                      </div>
                    </div>
                    
                    {error && <p className={styles.errorText}>{error}</p>}

                    <button type="submit" className={styles.submitBtn} disabled={loading}>
                      {loading ? (
                        <><Loader2 className="animate-spin" size={18} /> Sending...</>
                      ) : (
                        <><Send size={18} /> Submit Inquiry</>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
