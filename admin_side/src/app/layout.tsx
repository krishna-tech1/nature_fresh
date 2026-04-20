"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === "/login";

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token && !isLoginPage) {
      router.push('/login');
    }
  }, [pathname, isLoginPage, router]);

  if (isLoginPage) {
    return (
      <html lang="en">
        <body>
          <main style={{ minHeight: '100vh' }}>
            {children}
          </main>
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <head>
        <title>Nature Freash Food | Admin Panel</title>
      </head>
      <body>
        <div style={{ display: 'flex', minHeight: '100vh', background: '#f8fafc' }}>
          <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
          
          {/* Mobile Overlay */}
          {isSidebarOpen && (
            <div 
              onClick={() => setIsSidebarOpen(false)}
              className="mobile-overlay"
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(15, 23, 42, 0.4)',
                backdropFilter: 'blur(4px)',
                zIndex: 999,
              }}
            />
          )}

          <div className="main-content-wrapper">
            <Topbar onMenuClick={() => setIsSidebarOpen(true)} />
            <main className="main-content">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
