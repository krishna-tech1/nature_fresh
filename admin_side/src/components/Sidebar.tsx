import Link from 'next/link';
import { 
  LayoutDashboard, 
  Package, 
  FileText, 
  User,
  LogOut,
  X,
  ChevronRight,
  Mail
} from 'lucide-react';
import styles from './Sidebar.module.css';
import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/' },
  { icon: Package, label: 'Products', href: '/products' },
  { icon: FileText, label: 'Quote Requests', href: '/quotes' },
  { icon: Mail, label: 'Contact Inquiries', href: '/inquiries' },
];

export default function Sidebar({ isOpen, onClose }: { isOpen?: boolean, onClose?: () => void }) {
  const router = useRouter();
  const pathname = usePathname();

  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleLogout = () => {
    setIsLogoutModalOpen(true);
  };

  const confirmLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    router.push('/login');
  };

  return (
    <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
      <div className={styles.logoSection}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className={styles.logoInfo}>
            <div className={styles.logoIcon}>N</div>
            <div>
              <h1 className={styles.logoTitle}>Nature Fresh</h1>
              <p className={styles.logoSubtitle}>EXPORT ADMIN</p>
            </div>
          </div>
          <button className={styles.mobileClose} onClick={onClose}>
            <X size={24} />
          </button>
        </div>
      </div>

      <nav className={styles.nav}>
        {navItems.map((item) => (
          <Link 
            key={item.label} 
            href={item.href} 
            className={`${styles.navItem} ${pathname === item.href ? styles.active : ''}`} 
            onClick={onClose}
          >
            <item.icon size={20} />
            <span>{item.label}</span>
            {pathname === item.href && <ChevronRight size={14} className={styles.activeChevron} />}
          </Link>
        ))}
      </nav>

      <div className={styles.footer}>
        <div className={styles.userSection}>
          <div className={styles.avatar}>
            <User size={18} />
          </div>
          <div className={styles.userInfo}>
            <p className={styles.userName}>Senior Admin</p>
            <p className={styles.userRole}>Superuser</p>
          </div>
        </div>
        
        <button onClick={handleLogout} className={styles.logoutBtn}>
          <LogOut size={18} />
          <span>Log Out</span>
        </button>
      </div>

      {isLogoutModalOpen && (
        <div className={styles.modalBackdrop} onClick={() => setIsLogoutModalOpen(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div className={styles.modalIcon}>
                <LogOut size={28} />
              </div>
              <h2 className={styles.modalTitle}>Confirm Logout</h2>
              <p className={styles.modalText}>
                Are you sure you want to log out? You will need to sign in again to access the dashboard.
              </p>
            </div>
            
            <div className={styles.modalActions}>
              <button 
                className={styles.cancelBtn} 
                onClick={() => setIsLogoutModalOpen(false)}
              >
                Cancel
              </button>
              <button 
                className={styles.confirmBtn} 
                onClick={confirmLogout}
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
