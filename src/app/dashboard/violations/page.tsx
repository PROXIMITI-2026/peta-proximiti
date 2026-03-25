'use client';

import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';

// ============================================
// TODO: REMOVE — Hardcoded demo data for pitching
// ============================================
const DEMO_VIOLATIONS = [
  { id: '1', nim: '1301210008', name: 'Rizki Pratama', group: 1, pasal: 'Pasal 4 - Zona Wajib', day: 3, poin: 5, totalDeduction: 15, date: '2025-08-15', recordedBy: 'CDT-01' },
  { id: '2', nim: '1301210012', name: 'Sari Dewi', group: 2, pasal: 'Pasal 6 - Pelanggaran Ringan', day: 2, poin: 3, totalDeduction: 6, date: '2025-08-14', recordedBy: 'CDT-01' },
  { id: '3', nim: '1301210020', name: 'Farhan Akbar', group: 1, pasal: 'Pasal 7 - Pelanggaran Sedang', day: 4, poin: 7, totalDeduction: 28, date: '2025-08-13', recordedBy: 'CDT-02' },
  { id: '4', nim: '1301210015', name: 'Anisa Putri', group: 3, pasal: 'Pasal 3 - Tata Tertib', day: 1, poin: 2, totalDeduction: 2, date: '2025-08-13', recordedBy: 'CDT-01' },
];

const PASAL_OPTIONS = [
  'Pasal 3 - Tata Tertib Umum', 'Pasal 4 - Zona Wajib Armband',
  'Pasal 6 - Pelanggaran Ringan', 'Pasal 7 - Pelanggaran Sedang',
  'Pasal 8 - Pelanggaran Berat',
];

export default function ViolationsPage() {
  const { user } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [searchNim, setSearchNim] = useState('');
  const [selectedPasal, setSelectedPasal] = useState('');
  const [poin, setPoin] = useState(5);
  const [day, setDay] = useState(1);
  const [description, setDescription] = useState('');

  if (!user) return null;

  return (
    <div style={{ maxWidth: 1000 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: 'var(--primary)' }}>⚠️ Tabel Pelanggaran</h1>
          <p style={{ fontSize: 14, color: 'var(--text-muted)' }}>Law Enforcer — Tabel Pelanggaran Digital</p>
        </div>
        {user.role === 'cdt' && (
          <button className="btn btn-danger" onClick={() => setShowForm(!showForm)}>
            {showForm ? '✕ Batal' : '+ Catat Pelanggaran'}
          </button>
        )}
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12, marginBottom: 20 }}>
        <div className="stat-card"><div className="stat-icon" style={{ background: 'rgba(220,38,38,0.08)' }}>⚠️</div><div><div className="stat-value">{DEMO_VIOLATIONS.length}</div><div className="stat-label">Total Pelanggaran</div></div></div>
        <div className="stat-card"><div className="stat-icon" style={{ background: 'rgba(37,99,235,0.08)' }}>👤</div><div><div className="stat-value">150</div><div className="stat-label">Total Peserta</div></div></div>
        <div className="stat-card"><div className="stat-icon" style={{ background: 'rgba(217,119,6,0.08)' }}>📉</div><div><div className="stat-value">{DEMO_VIOLATIONS.reduce((s, v) => s + v.totalDeduction, 0)}</div><div className="stat-label">Poin Dikurangi</div></div></div>
      </div>

      {/* Form */}
      {showForm && user.role === 'cdt' && (
        <div className="card" style={{ marginBottom: 20, border: '2px solid rgba(220,38,38,0.2)' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--danger)', marginBottom: 16 }}>Catat Pelanggaran Baru</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6, display: 'block' }}>Cari Peserta (NIM)</label>
              <input className="input" value={searchNim} onChange={e => setSearchNim(e.target.value)} placeholder="Ketik NIM atau nama..." />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6, display: 'block' }}>Pasal</label>
                <select className="input" value={selectedPasal} onChange={e => setSelectedPasal(e.target.value)}>
                  <option value="">Pilih Pasal</option>
                  {PASAL_OPTIONS.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6, display: 'block' }}>Hari Ke-</label>
                <input className="input" type="number" min={1} max={7} value={day} onChange={e => setDay(parseInt(e.target.value) || 1)} />
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6, display: 'block' }}>Bobot Poin</label>
                <input className="input" type="number" min={1} value={poin} onChange={e => setPoin(parseInt(e.target.value) || 1)} />
              </div>
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6, display: 'block' }}>Total Pengurangan</label>
                <div style={{ padding: '10px 14px', background: 'var(--danger-bg)', borderRadius: 'var(--radius)', border: '1px solid rgba(220,38,38,0.15)', color: 'var(--danger)', fontWeight: 700, fontSize: 16 }}>
                  -{poin * day} poin
                </div>
              </div>
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6, display: 'block' }}>Deskripsi</label>
              <textarea className="input" rows={2} value={description} onChange={e => setDescription(e.target.value)} placeholder="Jelaskan pelanggaran..." />
            </div>
            <button className="btn btn-danger" style={{ width: '100%' }} onClick={() => alert('Demo: Pelanggaran dicatat')}>
              Catat Pelanggaran
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">📋 Riwayat Pelanggaran Terbaru</div>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr><th>NIM</th><th>Nama</th><th>Pasal</th><th>Hari</th><th style={{ textAlign: 'right' }}>Pengurangan</th><th>Tanggal</th></tr>
            </thead>
            <tbody>
              {DEMO_VIOLATIONS.map(v => (
                <tr key={v.id}>
                  <td className="mono">{v.nim}</td>
                  <td style={{ fontWeight: 500 }}>{v.name}</td>
                  <td><span className="badge badge-danger" style={{ fontSize: 10 }}>{v.pasal.split(' - ')[0]}</span></td>
                  <td style={{ textAlign: 'center' }}>{v.day}</td>
                  <td style={{ textAlign: 'right', fontWeight: 700, color: 'var(--danger)' }}>-{v.totalDeduction}</td>
                  <td className="mono" style={{ color: 'var(--text-muted)' }}>{v.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
