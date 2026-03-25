'use client';

import { useAuth } from '@/context/AuthContext';

// ============================================
// TODO: REMOVE — Hardcoded demo data for pitching
// ============================================
const DEMO_RECAP = [
  { nim: '1301210001', name: 'Ahmad Fauzan', group: 1, reductions: 15, bonuses: 5, remaining: 90 },
  { nim: '1301210008', name: 'Rizki Pratama', group: 1, reductions: 25, bonuses: 10, remaining: 85 },
  { nim: '1301210012', name: 'Sari Dewi', group: 2, reductions: 6, bonuses: 0, remaining: 94 },
  { nim: '1301210015', name: 'Anisa Putri', group: 3, reductions: 2, bonuses: 5, remaining: 103 },
  { nim: '1301210020', name: 'Farhan Akbar', group: 1, reductions: 28, bonuses: 0, remaining: 72 },
  { nim: '1301210025', name: 'Maya Sari', group: 2, reductions: 0, bonuses: 10, remaining: 110 },
  { nim: '1301210030', name: 'Dimas Prayogo', group: 3, reductions: 45, bonuses: 0, remaining: 55 },
  { nim: '1301210035', name: 'Lina Hastuti', group: 2, reductions: 10, bonuses: 5, remaining: 95 },
].sort((a, b) => b.remaining - a.remaining);

export default function RecapPage() {
  const { user } = useAuth();
  if (!user) return null;

  return (
    <div style={{ maxWidth: 1000 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: 'var(--primary)' }}>📈 Rekapitulasi Poin</h1>
          <p style={{ fontSize: 14, color: 'var(--text-muted)' }}>Transparency & Audit — Semua Data Poin</p>
        </div>
        {user.role === 'det' && (
          <button className="btn btn-primary" onClick={() => alert('Demo: Input bonus')}>+ Input Bonus</button>
        )}
      </div>

      <div className="card">
        <div className="card-header">
          <div className="card-title">👤 Tabel Poin Seluruh Peserta</div>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr><th>No</th><th>NIM</th><th>Nama</th><th>Kel.</th><th style={{ textAlign: 'center' }}>Pengurangan</th><th style={{ textAlign: 'center' }}>Bonus</th><th style={{ textAlign: 'center' }}>Poin</th><th style={{ textAlign: 'center' }}>Status</th></tr>
            </thead>
            <tbody>
              {DEMO_RECAP.map((r, i) => (
                <tr key={r.nim}>
                  <td style={{ fontWeight: 700, color: i < 3 ? 'var(--primary)' : 'var(--text-muted)' }}>{i + 1}</td>
                  <td className="mono">{r.nim}</td>
                  <td style={{ fontWeight: 500 }}>{r.name}</td>
                  <td>{r.group}</td>
                  <td style={{ textAlign: 'center', color: 'var(--danger)', fontFamily: 'monospace' }}>-{r.reductions}</td>
                  <td style={{ textAlign: 'center', color: 'var(--success)', fontFamily: 'monospace' }}>+{r.bonuses}</td>
                  <td style={{ textAlign: 'center', fontSize: 16, fontWeight: 800, color: r.remaining >= 80 ? 'var(--success)' : r.remaining >= 50 ? 'var(--warning)' : 'var(--danger)' }}>{r.remaining}</td>
                  <td style={{ textAlign: 'center' }}>
                    <span className={`badge ${r.remaining >= 80 ? 'badge-success' : r.remaining >= 50 ? 'badge-warning' : 'badge-danger'}`}>
                      {r.remaining >= 80 ? 'Baik' : r.remaining >= 50 ? 'Perhatian' : 'Kritis'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
