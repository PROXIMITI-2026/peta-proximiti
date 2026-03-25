'use client';

import { useAuth } from '@/context/AuthContext';

// ============================================
// TODO: REMOVE — Hardcoded demo data for pitching
// Replace with Supabase queries when connected
// ============================================
const DEMO_STATS = {
  peserta: { cards: [
    { icon: '🛡️', label: 'Standing Points', value: '85 / 100', color: '#16a34a' },
    { icon: '⚠️', label: 'Pelanggaran', value: '2', color: '#dc2626' },
    { icon: '📋', label: 'Izin Diajukan', value: '1', color: '#2563eb' },
  ]},
  gt: { cards: [
    { icon: '👥', label: 'Peserta Kelompok', value: '12', color: '#2563eb' },
    { icon: '⏳', label: 'Izin Pending', value: '3', color: '#d97706' },
    { icon: '✅', label: 'Izin Disetujui', value: '8', color: '#16a34a' },
  ]},
  cdt: { cards: [
    { icon: '⚠️', label: 'Total Pelanggaran', value: '28', color: '#dc2626' },
    { icon: '👤', label: 'Total Peserta', value: '150', color: '#2563eb' },
    { icon: '🎫', label: 'Token Aktif', value: '5', color: '#7c3aed' },
    { icon: '📉', label: 'Poin Dikurangi', value: '342', color: '#d97706' },
  ]},
  det: { cards: [
    { icon: '📊', label: 'Rata-rata Poin', value: '82.3', color: '#16a34a' },
    { icon: '👤', label: 'Total Peserta', value: '150', color: '#2563eb' },
    { icon: '📝', label: 'Audit Entries', value: '64', color: '#7c3aed' },
  ]},
  inti: { cards: [
    { icon: '👤', label: 'Total Peserta', value: '150', color: '#2563eb' },
    { icon: '⚠️', label: 'Total Pelanggaran', value: '28', color: '#dc2626' },
    { icon: '⏳', label: 'Izin Pending', value: '5', color: '#d97706' },
    { icon: '⚖️', label: 'Banding Pending', value: '2', color: '#7c3aed' },
  ]},
};

export default function DashboardHomePage() {
  const { user } = useAuth();
  if (!user) return null;

  const stats = DEMO_STATS[user.role] || DEMO_STATS.peserta;

  return (
    <div style={{ maxWidth: 1000 }}>
      {/* Welcome */}
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: 'var(--primary)', marginBottom: 4 }}>
          Selamat datang, {user.full_name.split(' ')[0]}!
        </h1>
        <p style={{ fontSize: 14, color: 'var(--text-muted)' }}>
          Dashboard kaderisasi PROXIMITI — {new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
        </p>
      </div>

      {/* Stat cards */}
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(auto-fill, minmax(220px, 1fr))`, gap: 16, marginBottom: 24 }}>
        {stats.cards.map(c => (
          <div key={c.label} className="stat-card">
            <div className="stat-icon" style={{ background: `${c.color}12` }}>
              {c.icon}
            </div>
            <div>
              <div className="stat-value">{c.value}</div>
              <div className="stat-label">{c.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Points hero for peserta */}
      {user.role === 'peserta' && (
        <div className="card" style={{
          background: 'linear-gradient(135deg, #355B31 0%, #4a7a44 100%)',
          color: '#fff',
          padding: '28px 32px',
          position: 'relative',
          overflow: 'hidden',
          marginBottom: 24,
        }}>
          <div style={{
            position: 'absolute', top: -60, right: -60,
            width: 200, height: 200, borderRadius: '50%',
            background: 'rgba(255,255,255,0.05)',
          }} />
          <div>
            <p style={{ fontSize: 13, opacity: 0.7, marginBottom: 4 }}>Standing Points</p>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
              <span style={{ fontSize: 48, fontWeight: 900 }}>85</span>
              <span style={{ fontSize: 18, opacity: 0.6 }}>/ 100</span>
            </div>
            <div style={{ width: '100%', background: 'rgba(255,255,255,0.2)', borderRadius: 99, height: 10, marginTop: 16 }}>
              <div style={{ width: '85%', background: '#fff', borderRadius: 99, height: 10, transition: 'width 0.5s' }} />
            </div>
            <div style={{ display: 'flex', gap: 20, marginTop: 12, fontSize: 13, opacity: 0.7 }}>
              <span>📉 Total Pengurangan: 15 poin</span>
              <span>⚠️ 2 pelanggaran</span>
            </div>
          </div>
        </div>
      )}

      {/* Recent Activity (demo) */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">📋 Aktivitas Terbaru</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {/* TODO: REMOVE — Hardcoded demo activities */}
          {[
            { time: '2 jam lalu', text: 'Izin sakit oleh Ahmad Fauzan — Menunggu verifikasi GT', badge: 'badge-warning', badgeText: 'Pending' },
            { time: '5 jam lalu', text: 'Pelanggaran: Tidak menggunakan armband di Sukapura', badge: 'badge-danger', badgeText: '-10 poin' },
            { time: '1 hari lalu', text: 'Token banding BND-A8K2M9X4 diterbitkan', badge: 'badge-purple', badgeText: 'Token' },
            { time: '1 hari lalu', text: 'Izin kegiatan oleh Siti Nurhaliza — Disetujui', badge: 'badge-success', badgeText: 'Disetujui' },
          ].map((a, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', background: 'var(--surface-alt)', borderRadius: 'var(--radius)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, color: 'var(--text)' }}>{a.text}</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{a.time}</div>
              </div>
              <span className={`badge ${a.badge}`}>{a.badgeText}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
