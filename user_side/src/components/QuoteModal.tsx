"use client";

import { useState } from 'react';
import { X, Send, CheckCircle2, Loader2 } from 'lucide-react';
import { submitQuote } from '@/lib/api';
import styles from './QuoteModal.module.css';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  productId: number;
  productName: string;
}

export default function QuoteModal({ isOpen, onClose, productId, productName }: QuoteModalProps) {
  const [form, setForm] = useState({ name: '', company: '', email: '', quantity: '' });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const result = await submitQuote({ ...form, productId, productName });
    setLoading(false);
    if (result.success) {
      setSubmitted(true);
    } else {
      setError('Failed to submit. Please try again or contact us directly.');
    }
  };

  const handleClose = () => {
    setForm({ name: '', company: '', email: '', quantity: '' });
    setSubmitted(false);
    setError('');
    onClose();
  };

  return (
    <div className={styles.overlay} onClick={handleClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={handleClose}>
          <X size={20} />
        </button>

        {submitted ? (
          <div className={styles.successState}>
            <div className={styles.successIcon}>
              <CheckCircle2 size={48} />
            </div>
            <h2 className={styles.successTitle}>Quote Submitted!</h2>
            <p className={styles.successDesc}>
              Thank you, <strong>{form.name}</strong>! Our team will review your request for <strong>{productName}</strong> and get back to you shortly.
            </p>
            <button className={styles.doneBtn} onClick={handleClose}>
              Close
            </button>
          </div>
        ) : (
          <>
            <div className={styles.modalHeader}>
              <div className={styles.headerBadge}>ASK FOR QUOTE</div>
              <h2 className={styles.modalTitle}>Request a Quote</h2>
              <p className={styles.modalDesc}>
                Enquiring about: <strong>{productName}</strong>
              </p>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="John Smith"
                    className={styles.input}
                    maxLength={25}
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Company Name</label>
                  <input
                    type="text"
                    placeholder="Global Seafoods Inc."
                    className={styles.input}
                    maxLength={25}
                    value={form.company}
                    onChange={e => setForm({ ...form, company: e.target.value })}
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="you@company.com"
                  className={styles.input}
                  maxLength={25}
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Quantity Required</label>
                <input
                  type="text"
                  placeholder="e.g. 500 kg, 2 MT"
                  className={styles.input}
                  maxLength={25}
                  value={form.quantity}
                  onChange={e => setForm({ ...form, quantity: e.target.value })}
                />
              </div>

              {error && <p className={styles.errorMsg}>{error}</p>}

              <button type="submit" className={styles.submitBtn} disabled={loading}>
                {loading ? (
                  <><Loader2 size={18} className="animate-spin" /> Submitting...</>
                ) : (
                  <><Send size={18} /> Submit Quote Request</>
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
