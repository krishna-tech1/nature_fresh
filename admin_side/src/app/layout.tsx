"use client";

import { useState, useEffect, Suspense } from "react";
import { usePathname, useRouter } from "next/navigation";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import { Loader2 } from "lucide-react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === "/login";

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token && !isLoginPage) {
      router.push('/login');
    } else {
      setIsAuthChecked(true);
    }
  }, [pathname, isLoginPage, router]);

  // Prevent flash: If we are not on the login page and haven't checked auth yet, show a full-screen loader
  if (!isAuthChecked && !isLoginPage) {
    return (
      <html lang="en">
        <body>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', width: '100vw', background: '#f8fafc' }}>
            <Loader2 className="animate-spin" size={48} color="#0ea5e9" />
          </div>
        </body>
      </html>
    );
  }

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
            <Suspense fallback={<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', width: '100%' }}><Loader2 className="animate-spin" size={48} color="#0ea5e9" /></div>}>
              <Topbar onMenuClick={() => setIsSidebarOpen(true)} />
              <main className="main-content">
                {children}
              </main>
            </Suspense>
          </div>
        </div>
      </body>
    </html>
  );
}
