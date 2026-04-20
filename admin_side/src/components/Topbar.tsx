"use client";

import { Search, Bell, HelpCircle, Menu } from 'lucide-react';
import styles from './Topbar.module.css';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export default function Topbar({ onMenuClick }: { onMenuClick?: () => void }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams.toString());
    if (e.target.value) {
      params.set('q', e.target.value);
    } else {
      params.delete('q');
    }
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <header className={styles.topbar}>
      <div className={styles.topbarLeft}>
        <button className={styles.menuButton} onClick={onMenuClick}>
          <Menu size={20} />
        </button>
        <div className={styles.searchWrapper}>
          <Search className={styles.searchIcon} size={18} />
          <input 
            type="text" 
            placeholder="Search exports, orders, or clients..." 
            className={styles.searchInput}
            defaultValue={searchParams.get('q') || ''}
            onChange={handleSearch}
          />
        </div>
      </div>

      <div className={styles.actions}>
        <button className={styles.iconButton}>
          <Bell size={20} />
          <span className={styles.badge}></span>
        </button>
        <button className={styles.iconButton}>
          <HelpCircle size={20} />
        </button>
        <div className={styles.divider}></div>
        <div className={styles.userInitial}>
          <span>NF</span>
        </div>
      </div>
    </header>
  );
}
