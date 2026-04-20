"use client";

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { 
  TrendingUp, 
  MessageSquare, 
  Layers,
  Plus,
  ArrowRight,
  ClipboardList,
  Loader2,
  Search
} from 'lucide-react';
import styles from './Dashboard.module.css';
import { API_BASE_URL } from '@/lib/api';

interface Stat {
  label: string;
  value: string | number;
  sub: string;
  icon: any;
  color: string;
}

function DashboardContent() {
  const [stats, setStats] = useState<Stat[]>([]);
  const [recentQuotes, setRecentQuotes] = useState<any[]>([]);
  const [recentInquiries, setRecentInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const globalSearchQuery = (searchParams.get('q') || '').toLowerCase();

  const fetchData = async () => {
    const token = localStorage.getItem('adminToken');
    const headers = { 'Authorization': `Bearer ${token}` };

    try {
      const [productsRes, quotesRes, inquiriesRes] = await Promise.all([
        fetch(`${API_BASE_URL}/products`, { headers }),
        fetch(`${API_BASE_URL}/quotes`, { headers }),
        fetch(`${API_BASE_URL}/inquiries`, { headers })
      ]);

      const products = await productsRes.json();
      const quotes = await quotesRes.json();
      const inquiries = await inquiriesRes.json();

      const productsArr = Array.isArray(products) ? products : [];
      const quotesArr = Array.isArray(quotes) ? quotes : [];
      const inquiriesArr = Array.isArray(inquiries) ? inquiries : [];

      setStats([
        { 
          label: 'Total Products', 
          value: productsArr.length, 
          sub: 'ACTIVE INVENTORY ITEMS', 
          icon: Layers, 
          color: '#0ea5e9' 
        },
        { 
          label: 'Total Inquiries', 
          value: inquiriesArr.length, 
          sub: 'USER CONTACT MESSAGES', 
          icon: MessageSquare, 
          color: '#8b5cf6' 
        },
        { 
          label: 'Total Quotes', 
          value: quotesArr.length, 
          sub: 'PRODUCT QUOTE REQUESTS', 
          icon: ClipboardList, 
          color: '#10b981' 
        },
      ]);

      setRecentQuotes(quotesArr);
      setRecentInquiries(inquiriesArr);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredQuotes = recentQuotes
    .filter(q => 
      q.name.toLowerCase().includes(globalSearchQuery) ||
      q.productName.toLowerCase().includes(globalSearchQuery)
    )
    .slice(0, 3);

  const filteredInquiries = recentInquiries
    .filter(i => 
      i.name.toLowerCase().includes(globalSearchQuery) ||
      i.subject.toLowerCase().includes(globalSearchQuery)
    )
    .slice(0, 3);

  if (loading) {
    return (
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh' }}>
        <Loader2 className="animate-spin" size={48} color="#0ea5e9" />
      </div>
    );
  }

  return (
    <div className="container">
      <header className={styles.header}>
        <div>
          <p className={styles.subtitle}>ENTERPRISE MANAGEMENT</p>
          <h1 className={styles.title}>Dashboard</h1>
        </div>
        <div className={styles.headerActions}>
          <Link href="/products" className={styles.primaryButton}>
            <Plus size={18} />
            <span>New Product</span>
          </Link>
        </div>
      </header>

      <div className={styles.statsGrid}>
        {stats.map((stat) => (
          <div key={stat.label} className="card">
            <div className={styles.statCard}>
              <div className={styles.statHeader}>
                <div className={styles.statIcon} style={{ color: stat.color, background: `${stat.color}15` }}>
                  <stat.icon size={24} />
                </div>
              </div>
              <div className={styles.statBody}>
                <p className={styles.statLabel}>{stat.label}</p>
                <h2 className={styles.statValue}>{stat.value}</h2>
                <p className={styles.statSub}>{stat.sub}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.contentGrid}>
        {/* Recent Quotes Table */}
        <div className={styles.tableCard}>
          <div className={styles.tableHeader}>
            <div>
              <h3 className={styles.tableTitle}>Latest Quote Requests</h3>
              <p className={styles.tableSubtitle}>Most recent 3 quotes from customers.</p>
            </div>
            <Link href="/quotes" className={styles.viewAll}>
              View All <ArrowRight size={14} />
            </Link>
          </div>
          
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>CLIENT</th>
                  <th>PRODUCT</th>
                  <th>QUANTITY</th>
                  <th>DATE</th>
                  <th>STATUS</th>
                </tr>
              </thead>
              <tbody>
                {filteredQuotes.length === 0 ? (
                  <tr><td colSpan={5} style={{textAlign:'center', padding: '20px', color:'#94a3b8'}}>{globalSearchQuery ? 'No quotes match your search' : 'No quotes found'}</td></tr>
                ) : (
                  filteredQuotes.map((req) => (
                    <tr key={req.id}>
                      <td>
                        <div className={styles.clientCell}>
                          <div className={styles.clientInitial}>{req.name.charAt(0).toUpperCase()}</div>
                          <span>{req.name}</span>
                        </div>
                      </td>
                      <td>{req.productName}</td>
                      <td>{req.quantity}</td>
                      <td>{new Date(req.createdAt).toLocaleDateString()}</td>
                      <td>
                        <span className={`${styles.statusBadge} ${req.status === 'Pending' ? styles.statusPending : styles.statusReviewed}`}>
                          {req.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Inquiries Table */}
        <div className={styles.tableCard} style={{marginTop: '24px'}}>
          <div className={styles.tableHeader}>
            <div>
              <h3 className={styles.tableTitle}>Latest Contact Inquiries</h3>
              <p className={styles.tableSubtitle}>Most recent 3 contact messages.</p>
            </div>
            <Link href="/inquiries" className={styles.viewAll}>
              View All <ArrowRight size={14} />
            </Link>
          </div>
          
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>SENDER</th>
                  <th>EMAIL</th>
                  <th>SUBJECT</th>
                  <th>DATE</th>
                  <th>STATUS</th>
                </tr>
              </thead>
              <tbody>
                {filteredInquiries.length === 0 ? (
                  <tr><td colSpan={5} style={{textAlign:'center', padding: '20px', color:'#94a3b8'}}>{globalSearchQuery ? 'No inquiries match your search' : 'No inquiries found'}</td></tr>
                ) : (
                  filteredInquiries.map((inq) => (
                    <tr key={inq.id}>
                      <td>
                        <div className={styles.clientCell}>
                          <div className={styles.clientInitial} style={{background: '#f0fdf4', color: '#10b981'}}>{inq.name.charAt(0).toUpperCase()}</div>
                          <span>{inq.name}</span>
                        </div>
                      </td>
                      <td>{inq.email}</td>
                      <td>{inq.subject.length > 40 ? inq.subject.substring(0, 40) + '...' : inq.subject}</td>
                      <td>{new Date(inq.createdAt).toLocaleDateString()}</td>
                      <td>
                        <span className={`${styles.statusBadge} ${inq.status === 'Pending' ? styles.statusNew : styles.statusRead}`}>
                          {inq.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <Suspense fallback={<div className="container" style={{display:'flex', justifyContent:'center', padding:'100px'}}><Loader2 className="animate-spin" size={48} color="#0ea5e9" /></div>}>
      <DashboardContent />
    </Suspense>
  );
}
