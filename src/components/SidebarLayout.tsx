'use client';

import { useState, ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

/* ── SVG Icons (inline, no emojis) ── */
const IconMap = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
    <line x1="8" y1="2" x2="8" y2="18" />
    <line x1="16" y1="6" x2="16" y2="22" />
  </svg>
);

const IconClipboard = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
  </svg>
);

const IconTable = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <line x1="3" y1="9" x2="21" y2="9" />
    <line x1="3" y1="15" x2="21" y2="15" />
    <line x1="9" y1="3" x2="9" y2="21" />
  </svg>
);

const NAV_ITEMS = [
  { href: '/', label: 'Peta Zonasi', Icon: IconMap },
  { href: '/aturan-peserta', label: 'Aturan Peserta', Icon: IconClipboard },
  { href: '/layout-tabel-pelanggaran', label: 'Tabel Pelanggaran', Icon: IconTable },
];

export default function SidebarLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="dashboard-shell">
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}>
        {/* Brand */}
        <div className="sidebar-brand">
          <div className="sidebar-logo-wrapper">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${basePath}/logo-proximiti.png`}
              alt="PROXIMITI Logo"
              width={38}
              height={38}
              style={{ width: 38, height: 'auto', borderRadius: 6 }}
            />
          </div>
          <div>
            <div className="sidebar-brand-text">PROXIMITI</div>
            <div className="sidebar-brand-sub">Kaderisasi System</div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`sidebar-link ${isActive ? 'sidebar-link-active' : ''}`}
                onClick={() => setSidebarOpen(false)}
              >
                <span className="sidebar-link-icon-wrap">
                  <item.Icon />
                </span>
                <span className="sidebar-link-label">{item.label}</span>
                {isActive && <span className="sidebar-active-indicator" />}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />}

      {/* Main content */}
      <main className="main-content">
        {/* Topbar on mobile */}
        <header className="topbar">
          <button className="topbar-menu" onClick={() => setSidebarOpen(true)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
          <span className="topbar-title">PROXIMITI</span>
          <div style={{ width: 36 }} />
        </header>

        {/* Page content */}
        <div className="page-content">
          {children}
        </div>
      </main>

      <style jsx global>{`
        .dashboard-shell {
          display: flex;
          min-height: 100vh;
        }

        /* ── Sidebar ── */
        .sidebar {
          width: 260px;
          background: #1b2e1a;
          display: flex;
          flex-direction: column;
          position: fixed;
          top: 0;
          left: 0;
          bottom: 0;
          z-index: 50;
          overflow-y: auto;
        }

        /* Brand */
        .sidebar-brand {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 20px 20px 18px;
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }
        .sidebar-logo-wrapper {
          background: rgba(255,255,255,0.1);
          border-radius: 10px;
          padding: 5px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .sidebar-brand-text {
          font-size: 17px;
          font-weight: 800;
          color: #ffffff;
          letter-spacing: 0.03em;
        }
        .sidebar-brand-sub {
          font-size: 11px;
          color: rgba(255,255,255,0.5);
          font-weight: 500;
          margin-top: 1px;
        }

        /* Nav */
        .sidebar-nav {
          padding: 10px 10px;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .sidebar-link {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 11px 14px;
          border-radius: 8px;
          color: rgba(255,255,255,0.6);
          text-decoration: none;
          transition: all 0.15s ease;
          position: relative;
        }
        .sidebar-link:hover {
          background: rgba(255,255,255,0.07);
          color: #ffffff;
        }
        .sidebar-link-active {
          background: rgba(255,255,255,0.12);
          color: #ffffff;
        }
        .sidebar-link-icon-wrap {
          width: 34px;
          height: 34px;
          border-radius: 8px;
          background: rgba(255,255,255,0.06);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .sidebar-link-active .sidebar-link-icon-wrap {
          background: #355B31;
          color: #fff;
        }
        .sidebar-link:hover .sidebar-link-icon-wrap {
          background: rgba(255,255,255,0.1);
        }
        .sidebar-link-active:hover .sidebar-link-icon-wrap {
          background: #355B31;
        }
        .sidebar-link-label {
          font-size: 14px;
          font-weight: 600;
          letter-spacing: -0.01em;
        }
        .sidebar-active-indicator {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #6ee764;
          box-shadow: 0 0 8px rgba(110,231,100,0.6);
          margin-left: auto;
          flex-shrink: 0;
        }

        .sidebar-overlay { display: none; }

        /* ── Main ── */
        .main-content {
          flex: 1;
          margin-left: 260px;
          min-height: 100vh;
          position: relative;
        }
        .topbar { display: none; }
        .page-content {
          padding: 28px 32px;
          position: relative;
          z-index: 1;
        }

        /* Topbar */
        .topbar-menu {
          background: none;
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 6px 8px;
          cursor: pointer;
          color: var(--text);
          font-family: inherit;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .topbar-title {
          font-size: 16px;
          font-weight: 800;
          color: var(--primary);
        }

        @media (max-width: 768px) {
          .sidebar {
            transform: translateX(-100%);
            transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          }
          .sidebar-open {
            transform: translateX(0);
            box-shadow: 4px 0 24px rgba(0,0,0,0.25);
          }
          .sidebar-overlay {
            display: block;
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.4);
            z-index: 40;
          }
          .main-content { margin-left: 0; }
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
          .page-content { padding: 16px; }
        }
      `}</style>
    </div>
  );
}
