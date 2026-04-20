"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Lock, ArrowRight, Loader2, AlertCircle, Eye, EyeOff } from 'lucide-react';
import styles from './Login.module.css';
import { API_BASE_URL } from '@/lib/api';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('adminToken', data.token);
        localStorage.setItem('adminUser', JSON.stringify(data.user));
        router.push('/');
      } else {
        setError(data.error || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      setError('Connection failed. Please check your server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.brandingSide}>
        <div className={styles.logoArea}>
          <div className={styles.logoIcon}>
            <img src="/logo.png" alt="Nature Freash Food" />
          </div>
          <span className={styles.brandName}>Nature Freash Food</span>
        </div>
        
        <h1 className={styles.mainHeadline}>
          Premium Seafood <br />
          <span className={styles.highlightText}>Global Export.</span>
        </h1>
        
        <p className={styles.description}>
          Managing the journey from ocean to table. Your enterprise command center 
          for sustainable seafood logistics, freshness tracking, and global supply chains.
        </p>
      </div>

      <div className={styles.formSide}>
        <div className={styles.loginCard}>
          <div className={styles.formHeader}>
            <h2 className={styles.formTitle}>Admin Login</h2>
            <p className={styles.formSubtitle}>Enter your credentials to access the dashboard</p>
          </div>

          {error && (
            <div className={styles.error}>
              <AlertCircle size={18} />
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className={styles.form}>
            <div className={styles.formGroup}>
              <label className={styles.label}>CORPORATE EMAIL</label>
              <div className={styles.inputWrapper}>
                <input 
                  type="email" 
                  className={styles.input}
                  placeholder="admin@naturefresh.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>PASSWORD</label>
              <div className={styles.inputWrapper}>
                <input 
                  type={showPassword ? "text" : "password"} 
                  className={styles.input}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button 
                  type="button" 
                  className={styles.eyeIcon}
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button type="submit" className={styles.loginBtn} disabled={loading}>
              {loading ? (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <Loader2 className="animate-spin" size={20} />
                  <span>Signing in...</span>
                </div>
              ) : 'Login'}
            </button>
          </form>

          <div className={styles.copyright}>
            © NATURE FREASH FOOD ADMIN PANEL
          </div>
        </div>
      </div>
    </div>
  );
}
