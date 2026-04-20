"use client";

import { useState, useEffect, Suspense } from 'react';
import { CheckCircle2, Trash2, Loader2, AlertCircle, FileDown, Package, Search } from 'lucide-react';
import styles from './Quotes.module.css';
import { API_BASE_URL } from '@/lib/api';
import { useSearchParams } from 'next/navigation';

interface Quote {
  id: number;
  name: string;
  company: string;
  email: string;
  quantity: string;
  productId: number;
  productName: string;
  status: 'Pending' | 'Reviewed';
  createdAt: string;
}

function QuotesContent() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [reviewingId, setReviewingId] = useState<number | null>(null);
  const searchParams = useSearchParams();
  const globalSearchQuery = (searchParams.get('q') || '').toLowerCase();

  const fetchQuotes = async () => {
    const token = localStorage.getItem('adminToken');
    try {
      const res = await fetch(`${API_BASE_URL}/quotes`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (Array.isArray(data)) {
        setQuotes(data);
      } else {
        setQuotes([]);
      }
    } catch (error) {
      console.error('Failed to fetch quotes:', error);
      setQuotes([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  const filteredQuotes = quotes.filter(q => 
    q.name.toLowerCase().includes(globalSearchQuery) ||
    q.email.toLowerCase().includes(globalSearchQuery) ||
    q.productName.toLowerCase().includes(globalSearchQuery) ||
    (q.company && q.company.toLowerCase().includes(globalSearchQuery))
  );

  const handleReview = async (id: number) => {
    setReviewingId(id);
    const token = localStorage.getItem('adminToken');
    try {
      const res = await fetch(`${API_BASE_URL}/quotes/${id}/review`, { 
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        setQuotes(prev => prev.map(q => q.id === id ? { ...q, status: 'Reviewed' } : q));
      }
    } catch (error) {
      console.error('Failed to update status:', error);
    } finally {
      setReviewingId(null);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this quote?')) return;
    const token = localStorage.getItem('adminToken');
    try {
      const res = await fetch(`${API_BASE_URL}/quotes/${id}`, { 
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) setQuotes(prev => prev.filter(q => q.id !== id));
    } catch (error) {
      console.error('Failed to delete quote:', error);
    }
  };

  const pendingCount = filteredQuotes.filter(q => q.status === 'Pending').length;
  const reviewedCount = filteredQuotes.filter(q => q.status === 'Reviewed').length;

  return (
    <div className="container">
      <header className={styles.header}>
        <div>
          <p className={styles.pageLabel}>QUOTE MANAGEMENT</p>
          <h1 className={styles.title}>Quote Requests</h1>
          <p className={styles.subtitle}>Manage and respond to product quote requests from clients worldwide.</p>
        </div>
      </header>

      {/* Summary Cards */}
      <div className={styles.summaryGrid}>
        <div className={styles.summaryCardPrimary}>
          <p className={styles.sumLabel}>PENDING QUOTES</p>
          <h2 className={styles.sumValue}>{pendingCount}</h2>
          <p className={styles.sumHint}>Awaiting your review</p>
        </div>
        <div className={styles.summaryCard}>
          <p className={styles.sumLabelMuted}>TOTAL REQUESTS</p>
          <h2 className={styles.sumValueMuted}>{filteredQuotes.length}</h2>
          <p className={styles.sumText}>Found matching search</p>
        </div>
        <div className={styles.summaryCard}>
          <p className={styles.sumLabelMuted}>REVIEWED</p>
          <h2 className={styles.sumValueMuted}>{reviewedCount}</h2>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: filteredQuotes.length > 0 ? `${(reviewedCount / filteredQuotes.length) * 100}%` : '0%' }}
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className={styles.tableCard}>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>CLIENT</th>
                <th>PRODUCT</th>
                <th>QUANTITY</th>
                <th>DATE</th>
                <th>STATUS</th>
                <th style={{ textAlign: 'right' }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '80px 0' }}>
                    <Loader2 className="animate-spin" size={32} color="#0ea5e9" />
                  </td>
                </tr>
              ) : filteredQuotes.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '80px 0' }}>
                    {globalSearchQuery ? <AlertCircle size={48} color="#94a3b8" style={{ marginBottom: '16px' }} /> : <Package size={48} color="#94a3b8" style={{ marginBottom: '16px' }} />}
                    <p style={{ color: '#64748b', fontWeight: 600 }}>{globalSearchQuery ? 'No quotes match your search' : 'No quote requests yet'}</p>
                    {!globalSearchQuery && <p style={{ color: '#94a3b8', fontSize: '13px' }}>Quotes will appear here when users submit them from the website.</p>}
                  </td>
                </tr>
              ) : (
                filteredQuotes.map(quote => (
                  <tr key={quote.id}>
                    <td>
                      <div className={styles.clientCell}>
                        <div className={styles.clientInitial}>
                          {quote.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className={styles.clientName}>{quote.name}</p>
                          <p className={styles.clientEmail}>{quote.email}</p>
                          {quote.company && <p className={styles.clientCompany}>{quote.company}</p>}
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className={styles.productBadge}>{quote.productName}</span>
                    </td>
                    <td>
                      <p className={styles.quantityText}>{quote.quantity || '—'}</p>
                    </td>
                    <td>
                      <p className={styles.dateText}>{new Date(quote.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                    </td>
                    <td>
                      <span className={`${styles.statusBadge} ${quote.status === 'Pending' ? styles.statusPending : styles.statusReviewed}`}>
                        <span className={styles.statusDot} />
                        {quote.status}
                      </span>
                    </td>
                    <td>
                      <div className={styles.actionButtons}>
                        {quote.status === 'Pending' && (
                          <button
                            className={styles.reviewBtn}
                            onClick={() => handleReview(quote.id)}
                            disabled={reviewingId === quote.id}
                            title="Mark as Reviewed"
                          >
                            {reviewingId === quote.id
                              ? <Loader2 size={15} className="animate-spin" />
                              : <CheckCircle2 size={15} />
                            }
                            <span>Reviewed</span>
                          </button>
                        )}
                        <button
                          className={styles.deleteBtn}
                          onClick={() => handleDelete(quote.id)}
                          title="Delete"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default function QuotesPage() {
  return (
    <Suspense fallback={<div className="container" style={{display:'flex', justifyContent:'center', padding:'100px'}}><Loader2 className="animate-spin" size={48} color="#0ea5e9" /></div>}>
      <QuotesContent />
    </Suspense>
  );
}
