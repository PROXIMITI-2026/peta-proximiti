'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useState, ReactNode } from 'react';

interface NavItem {
  href: string;
  label: string;
  icon: string;
}

const NAV_ITEMS: NavItem[] = [
  { href: '/dashboard/map', label: 'Peta Zonasi', icon: '🗺️' },
  { href: '/dashboard/announcements', label: 'Pengumuman & Aturan', icon: '📢' },
];

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="dashboard-shell">
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}>
        {/* Brand */}
        <div className="sidebar-brand">
          <div className="sidebar-logo">🛡️</div>
          <div>
            <div className="sidebar-brand-text">PROXIMITI</div>
            <div className="sidebar-brand-sub">Management System</div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">
          {NAV_ITEMS.map(item => (
            <a
              key={item.href}
              href={item.href}
              className={`sidebar-link ${pathname === item.href ? 'sidebar-link-active' : ''}`}
              onClick={(e) => { e.preventDefault(); router.push(item.href); setSidebarOpen(false); }}
            >
              <span className="sidebar-link-icon">{item.icon}</span>
              <span>{item.label}</span>
            </a>
          ))}
        </nav>

        {/* User info at bottom */}
        <div className="sidebar-footer">
          <div className="sidebar-user">
            <div className="sidebar-avatar" style={{ background: '#16a34a' }}>
              P
            </div>
            <div className="sidebar-user-info">
              <div className="sidebar-user-name">Pengguna</div>
              <div className="sidebar-user-role" style={{ color: '#16a34a' }}>Akses Publik</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />}

      {/* Main content */}
      <main className="main-content">
        {/* Topbar on mobile */}
        <header className="topbar">
          <button className="topbar-menu" onClick={() => setSidebarOpen(true)}>☰</button>
          <span className="topbar-title">PROXIMITI</span>
          <span className="topbar-role-badge" style={{ background: `#16a34a15`, color: '#16a34a' }}>
            Akses Publik
          </span>
        </header>

        {/* Watermark */}
        <div className="watermark">PROXIMITI</div>

        {/* Page content */}
        <div className="page-content">
          {children}
        </div>
      </main>

      <style jsx>{`
        .dashboard-shell {
          display: flex;
          min-height: 100vh;
        }

        /* Sidebar */
        .sidebar {
          width: 260px;
          background: #fff;
          border-right: 1px solid var(--border);
          display: flex;
          flex-direction: column;
          position: fixed;
          top: 0;
          left: 0;
          bottom: 0;
          z-index: 50;
          overflow-y: auto;
        }
        .sidebar-brand {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 20px 20px 16px;
          border-bottom: 1px solid var(--border);
        }
        .sidebar-logo {
          font-size: 28px;
        }
        .sidebar-brand-text {
          font-size: 16px;
          font-weight: 800;
          color: var(--primary);
          letter-spacing: -0.02em;
        }
        .sidebar-brand-sub {
          font-size: 11px;
          color: var(--text-muted);
        }
        .sidebar-nav {
          flex: 1;
          padding: 12px;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .sidebar-link {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 14px;
          border-radius: var(--radius);
          font-size: 13px;
          font-weight: 500;
          color: var(--text-secondary);
          text-decoration: none;
          transition: var(--transition);
        }
        .sidebar-link:hover {
          background: var(--primary-bg);
          color: var(--primary);
        }
        .sidebar-link-active {
          background: var(--primary-bg);
          color: var(--primary);
          font-weight: 600;
        }
        .sidebar-link-icon { font-size: 16px; }
        .sidebar-footer {
          padding: 16px;
          border-top: 1px solid var(--border);
        }
        .sidebar-user {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .sidebar-avatar {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-weight: 700;
          font-size: 14px;
          flex-shrink: 0;
        }
        .sidebar-user-name {
          font-size: 13px;
          font-weight: 600;
          color: var(--text);
        }
        .sidebar-user-role {
          font-size: 11px;
          font-weight: 600;
        }
        .sidebar-overlay {
          display: none;
        }

        /* Main */
        .main-content {
          flex: 1;
          margin-left: 260px;
          min-height: 100vh;
          position: relative;
        }
        .topbar {
          display: none;
        }
        .page-content {
          padding: 28px 32px;
          position: relative;
          z-index: 1;
        }

        /* Topbar elements */
        .topbar-menu {
          background: none;
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 6px 10px;
          font-size: 18px;
          cursor: pointer;
          color: var(--text);
          font-family: inherit;
        }
        .topbar-title {
          font-size: 16px;
          font-weight: 800;
          color: var(--primary);
        }
        .topbar-role-badge {
          padding: 4px 12px;
          border-radius: 999px;
          font-size: 11px;
          font-weight: 600;
        }

        @media (max-width: 768px) {
          .sidebar {
            transform: translateX(-100%);
            transition: transform 0.25s ease;
            box-shadow: none;
          }
          .sidebar-open {
            transform: translateX(0);
            box-shadow: 4px 0 24px rgba(0,0,0,0.15);
          }
          .sidebar-overlay {
            display: block;
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.3);
            z-index: 40;
          }
          .main-content {
            margin-left: 0;
          }
          .topbar {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 12px 16px;
            background: #fff;
            border-bottom: 1px solid var(--border);
            position: sticky;
            top: 0;
            z-index: 30;
          }
          .page-content {
            padding: 16px;
          }
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
