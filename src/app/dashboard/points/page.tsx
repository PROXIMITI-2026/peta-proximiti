'use client';

import { useAuth } from '@/context/AuthContext';

// ============================================
// TODO: REMOVE — Hardcoded demo data for pitching
// ============================================
const DEMO_VIOLATIONS = [
  { id: '1', pasal: 'Pasal 4', day: 3, poin: 5, totalDeduction: 15, description: 'Tidak menggunakan armband di area Sukapura', createdAt: '2025-08-15T10:30:00Z' },
  { id: '2', pasal: 'Pasal 6', day: 2, poin: 3, totalDeduction: 6, description: 'Terlambat hadir ke sesi briefing pagi', createdAt: '2025-08-14T08:15:00Z' },
];

export default function PointsPage() {
  const { user } = useAuth();
  if (!user) return null;

  const totalDeductions = DEMO_VIOLATIONS.reduce((s, v) => s + v.totalDeduction, 0);
  const currentPoints = 100 - totalDeductions;
  const percentage = Math.max(0, Math.min(100, currentPoints));

  const getColor = () => {
    if (currentPoints >= 80) return '#16a34a';
    if (currentPoints >= 50) return '#d97706';
    return '#dc2626';
  };

  return (
    <div style={{ maxWidth: 900 }}>
      <h1 style={{ fontSize: 22, fontWeight: 800, color: 'var(--primary)', marginBottom: 4 }}>📊 Standing Points</h1>
      <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 24 }}>Rincian poin dan riwayat pelanggaran kamu.</p>

      {/* Points Overview */}
      <div className="card" style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 32, flexWrap: 'wrap' }}>
          {/* Ring chart */}
          <div style={{ position: 'relative', width: 120, height: 120, flexShrink: 0 }}>
            <svg viewBox="0 0 120 120" style={{ transform: 'rotate(-90deg)' }}>
              <circle cx="60" cy="60" r="50" fill="none" stroke="var(--border)" strokeWidth="10" />
              <circle cx="60" cy="60" r="50" fill="none" stroke={getColor()} strokeWidth="10"
                strokeDasharray={`${percentage * 3.14} 314`} strokeLinecap="round" />
            </svg>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 28, fontWeight: 900, color: getColor() }}>{currentPoints}</span>
              <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>/ 100</span>
            </div>
          </div>

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, flex: 1 }}>
            <div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 2 }}>Poin Awal</div>
              <div style={{ fontSize: 24, fontWeight: 800 }}>100</div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 2 }}>Pengurangan</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--danger)' }}>-{totalDeductions}</div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 2 }}>Pelanggaran</div>
              <div style={{ fontSize: 24, fontWeight: 800 }}>{DEMO_VIOLATIONS.length}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Violations feed */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">⚠️ Riwayat Pelanggaran</div>
        </div>
        {DEMO_VIOLATIONS.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 48, color: 'var(--text-muted)' }}>
            <div style={{ fontSize: 40, marginBottom: 8 }}>🛡️</div>
            <p style={{ fontWeight: 500 }}>Tidak ada pelanggaran</p>
            <p style={{ fontSize: 13 }}>Pertahankan record bersih Anda!</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {DEMO_VIOLATIONS.map(v => (
              <div key={v.id} style={{
                display: 'flex', alignItems: 'flex-start', gap: 12,
                padding: '14px 16px', background: 'var(--danger-bg)',
                border: '1px solid rgba(220,38,38,0.1)',
                borderRadius: 'var(--radius)',
              }}>
                <div style={{ width: 40, height: 40, borderRadius: 'var(--radius)', background: 'rgba(220,38,38,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  ⚠️
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <span className="badge badge-danger">{v.pasal}</span>
                    <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Hari ke-{v.day}</span>
                  </div>
                  <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{v.description}</p>
                  <p style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>
                    {new Date(v.createdAt).toLocaleString('id-ID')}
                  </p>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <span style={{ fontSize: 18, fontWeight: 800, color: 'var(--danger)' }}>-{v.totalDeduction}</span>
                  <p style={{ fontSize: 11, color: 'var(--text-muted)' }}>{v.poin} × {v.day}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
