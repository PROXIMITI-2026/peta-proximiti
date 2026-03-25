'use client';

// ============================================
// TODO: REMOVE — Hardcoded demo data for pitching
// ============================================
const DEMO_STATS = [
  { icon: '👤', label: 'Total Peserta', value: 150, color: '#2563eb' },
  { icon: '🛡️', label: 'Total Panitia', value: 24, color: '#355B31' },
  { icon: '⚠️', label: 'Total Pelanggaran', value: 28, color: '#dc2626' },
  { icon: '⭐', label: 'Bonus Diberikan', value: 35, color: '#d97706' },
  { icon: '📋', label: 'Izin Pending', value: 5, color: '#f97316' },
  { icon: '🎫', label: 'Token Aktif', value: 3, color: '#7c3aed' },
];

const DEMO_SUMMARY = [
  { label: 'Rata-rata Poin', value: '82.3', color: '#16a34a' },
  { label: 'Banding Disetujui', value: '4', color: '#16a34a' },
  { label: 'Total Poin Dikurangi', value: '342', color: '#dc2626' },
];

export default function StatsPage() {
  return (
    <div style={{ maxWidth: 900 }}>
      <h1 style={{ fontSize: 22, fontWeight: 800, color: 'var(--primary)', marginBottom: 4 }}>📉 Statistik</h1>
      <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 24 }}>Overview & Analytics — Ringkasan kegiatan kaderisasi.</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12, marginBottom: 24 }}>
        {DEMO_STATS.map(c => (
          <div key={c.label} className="stat-card">
            <div className="stat-icon" style={{ background: `${c.color}12` }}>{c.icon}</div>
            <div>
              <div className="stat-value">{c.value}</div>
              <div className="stat-label">{c.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
        {DEMO_SUMMARY.map(s => (
          <div key={s.label} className="card" style={{ textAlign: 'center', padding: '20px 16px' }}>
            <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 4 }}>{s.label}</p>
            <p style={{ fontSize: 28, fontWeight: 800, color: s.color }}>{s.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
