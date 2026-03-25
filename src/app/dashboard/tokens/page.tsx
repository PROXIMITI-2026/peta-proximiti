'use client';

import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';

// ============================================
// TODO: REMOVE — Hardcoded demo data for pitching
// ============================================
const DEMO_TOKENS = [
  { code: 'BND-A8K2M9X4', nim: '1301210008', name: 'Rizki Pratama', status: 'active', date: '2025-08-15' },
  { code: 'BND-C3J7P5R2', nim: '1301210020', name: 'Farhan Akbar', status: 'used', date: '2025-08-14' },
  { code: 'BND-E6H4N1Q8', nim: '1301210012', name: 'Sari Dewi', status: 'active', date: '2025-08-13' },
];

export default function TokensPage() {
  const { user } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [nim, setNim] = useState('');

  if (!user) return null;

  const statusBadge = (s: string) => s === 'active' ? 'badge-success' : s === 'used' ? 'badge-purple' : 'badge-neutral';

  return (
    <div style={{ maxWidth: 900 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: 'var(--primary)' }}>🎫 Token Banding</h1>
          <p style={{ fontSize: 14, color: 'var(--text-muted)' }}>Kelola token banding unik untuk peserta.</p>
        </div>
        {user.role === 'cdt' && (
          <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
            {showForm ? '✕ Batal' : '+ Generate Token'}
          </button>
        )}
      </div>

      {showForm && user.role === 'cdt' && (
        <div className="card" style={{ marginBottom: 20, border: '2px solid rgba(124,58,237,0.2)' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--purple)', marginBottom: 16 }}>Generate Token Banding</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6, display: 'block' }}>NIM Peserta</label>
              <input className="input" value={nim} onChange={e => setNim(e.target.value)} placeholder="NIM..." />
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6, display: 'block' }}>Nama Peserta</label>
              <input className="input" placeholder="Nama..." />
            </div>
          </div>
          <button className="btn" style={{ background: 'var(--purple)', color: '#fff', width: '100%' }} onClick={() => alert('Demo: Token BND-XXXXXXXX berhasil dibuat')}>
            🎫 Generate Token
          </button>
        </div>
      )}

      <div className="card">
        <div className="card-header">
          <div className="card-title">📋 Daftar Token</div>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead><tr><th>Kode Token</th><th>NIM</th><th>Nama</th><th>Status</th><th>Tanggal</th></tr></thead>
            <tbody>
              {DEMO_TOKENS.map(t => (
                <tr key={t.code}>
                  <td style={{ fontFamily: 'monospace', fontWeight: 700, letterSpacing: '0.05em' }}>{t.code}</td>
                  <td className="mono">{t.nim}</td>
                  <td style={{ fontWeight: 500 }}>{t.name}</td>
                  <td><span className={`badge ${statusBadge(t.status)}`}>{t.status.toUpperCase()}</span></td>
                  <td className="mono" style={{ color: 'var(--text-muted)' }}>{t.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
