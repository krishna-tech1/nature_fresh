"use client";

import { useState, useEffect, Suspense } from 'react';
import { Mail, Search, Trash2, Eye, Filter, Download, MoreVertical, CheckCircle2, X, Loader2, MessageSquare } from 'lucide-react';
import styles from './Inquiries.module.css';
import { API_BASE_URL } from '@/lib/api';
import { useSearchParams } from 'next/navigation';

interface Inquiry {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'Pending' | 'Reviewed';
  createdAt: string;
}

function InquiriesContent() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [actionLoading, setActionLoading] = useState<number | null>(null);
  const searchParams = useSearchParams();
  const globalSearchQuery = (searchParams.get('q') || '').toLowerCase();

  const fetchInquiries = async () => {
    const token = localStorage.getItem('adminToken');
    try {
      const res = await fetch(`${API_BASE_URL}/inquiries`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (Array.isArray(data)) {
        setInquiries(data);
      } else {
        setInquiries([]);
      }
    } catch (error) {
      console.error('Failed to fetch inquiries:', error);
      setInquiries([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const filteredInquiries = inquiries.filter(inquiry => 
    inquiry.name.toLowerCase().includes(globalSearchQuery) ||
    inquiry.email.toLowerCase().includes(globalSearchQuery) ||
    inquiry.subject.toLowerCase().includes(globalSearchQuery)
  );

  const handleReview = async (id: number) => {
    setActionLoading(id);
    const token = localStorage.getItem('adminToken');
    try {
      const res = await fetch(`${API_BASE_URL}/inquiries/${id}/review`, { 
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        setInquiries(prev => prev.map(inq => inq.id === id ? { ...inq, status: 'Reviewed' } : inq));
      }
    } catch (error) {
      console.error('Failed to update status:', error);
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this inquiry?')) return;
    const token = localStorage.getItem('adminToken');
    try {
      const res = await fetch(`${API_BASE_URL}/inquiries/${id}`, { 
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        setInquiries(prev => prev.filter(inq => inq.id !== id));
      }
    } catch (error) {
      console.error('Failed to delete inquiry:', error);
    }
  };

  return (
    <div className="container">
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Contact Inquiries</h1>
          <p className={styles.subtitle}>Manage and respond to direct messages from your clients.</p>
        </div>
      </header>

      <div className={styles.tableCard}>
        <div className={styles.tableHeader}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <h3 className={styles.tableTitle}>Recent Messages</h3>
            <span className={styles.badgeCount}>{filteredInquiries.length} Messages</span>
          </div>
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>SENDER</th>
                <th>SUBJECT</th>
                <th>DATE</th>
                <th>STATUS</th>
                <th style={{ textAlign: 'right' }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', padding: '80px 0' }}>
                    <Loader2 className="animate-spin" size={32} color="#0ea5e9" />
                  </td>
                </tr>
              ) : filteredInquiries.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', padding: '80px 0' }}>
                    <MessageSquare size={48} color="#94a3b8" style={{ marginBottom: '16px' }} />
                    <p style={{ color: '#64748b', fontWeight: 600 }}>{globalSearchQuery ? 'No messages match your search' : 'No inquiries yet'}</p>
                  </td>
                </tr>
              ) : (
                filteredInquiries.map((inquiry) => (
                  <tr key={inquiry.id}>
                    <td>
                      <div className={styles.senderCell}>
                        <div className={styles.avatar}>
                          {inquiry.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className={styles.senderName}>{inquiry.name}</p>
                          <p className={styles.senderEmail}>{inquiry.email}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div>
                        <p className={styles.subjectText}>
                          {inquiry.subject.length > 30 
                            ? inquiry.subject.substring(0, 30) + '...' 
                            : inquiry.subject}
                        </p>
                      </div>
                    </td>
                    <td>
                      <span className={styles.dateCell}>
                        {new Date(inquiry.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}
                      </span>
                    </td>
                    <td>
                      <span className={`${styles.statusBadge} ${inquiry.status === 'Pending' ? styles.statusNew : styles.statusRead}`}>
                        {inquiry.status}
                      </span>
                    </td>
                    <td>
                      <div className={styles.actionButtons}>
                        {inquiry.status === 'Pending' && (
                          <button 
                            className={styles.viewBtn} 
                            style={{borderColor: '#10b981', color: '#10b981'}}
                            onClick={() => handleReview(inquiry.id)}
                            title="Mark as Reviewed"
                            disabled={actionLoading === inquiry.id}
                          >
                            {actionLoading === inquiry.id ? <Loader2 size={16} className="animate-spin" /> : <CheckCircle2 size={16} />}
                          </button>
                        )}
                        <button 
                          className={styles.viewBtn} 
                          title="View Details"
                          onClick={() => setSelectedInquiry(inquiry)}
                        >
                          <Eye size={16} />
                        </button>
                        <button 
                          className={styles.deleteBtn} 
                          title="Delete"
                          onClick={() => handleDelete(inquiry.id)}
                        >
                          <Trash2 size={16} />
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

      {/* View Detail Modal */}
      {selectedInquiry && (
        <div className={styles.modalOverlay} onClick={() => setSelectedInquiry(null)}>
          <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div style={{display:'flex', gap:'12px', alignItems:'center'}}>
                <div className={styles.avatarLarge}>{selectedInquiry.name.charAt(0).toUpperCase()}</div>
                <div>
                  <h2 className={styles.modalTitle}>{selectedInquiry.name}</h2>
                  <p className={styles.modalSubtitle}>{selectedInquiry.email}</p>
                </div>
              </div>
              <button className={styles.closeBtn} onClick={() => setSelectedInquiry(null)}>
                <X size={20} />
              </button>
            </div>
            
            <div className={styles.modalBody}>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>Subject</span>
                <p className={styles.infoValueLarge}>{selectedInquiry.subject}</p>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>Message</span>
                <p className={styles.infoValueText}>{selectedInquiry.message}</p>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>Received On</span>
                <p className={styles.infoValue}>{new Date(selectedInquiry.createdAt).toLocaleString()}</p>
              </div>
            </div>
            
            <div className={styles.modalFooter}>
               <button className={styles.secondaryButton} onClick={() => setSelectedInquiry(null)}>Close</button>
               {selectedInquiry.status === 'Pending' && (
                 <button 
                  className={styles.primaryButton}
                  onClick={() => {
                    handleReview(selectedInquiry.id);
                    setSelectedInquiry(null);
                  }}
                 >
                   Mark as Reviewed
                 </button>
               )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function InquiriesPage() {
  return (
    <Suspense fallback={<div className="container" style={{display:'flex', justifyContent:'center', padding:'100px'}}><Loader2 className="animate-spin" size={48} color="#0ea5e9" /></div>}>
      <InquiriesContent />
    </Suspense>
  );
}
