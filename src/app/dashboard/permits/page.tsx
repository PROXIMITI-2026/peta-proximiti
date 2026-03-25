'use client';

import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';

// ============================================
// TODO: REMOVE — Hardcoded demo data for pitching
// ============================================
const DEMO_PERMITS = [
  { id: '1', type: 'sakit', reason: 'Demam dan flu, perlu istirahat', status: 'approved', date: '2025-08-14' },
  { id: '2', type: 'kegiatan', reason: 'Kompetisi hackathon nasional', status: 'pending_gt', date: '2025-08-15' },
  { id: '3', type: 'agama', reason: 'Sholat Jumat berjamaah', status: 'approved', date: '2025-08-13' },
  { id: '4', type: 'kematian', reason: 'Keluarga meninggal', status: 'escalated_cdt', date: '2025-08-12' },
];

const PERMIT_TYPES = [
  { value: 'sakit', label: 'Sakit', icon: '🏥' },
  { value: 'kematian', label: 'Kematian', icon: '🕊️' },
  { value: 'agama', label: 'Agama', icon: '🕌' },
  { value: 'kegiatan', label: 'Kegiatan', icon: '📅' },
];

const STATUS_MAP: Record<string, { label: string; badge: string }> = {
  pending_gt: { label: 'Menunggu GT', badge: 'badge-warning' },
  escalated_cdt: { label: 'Eskalasi → CDT', badge: 'badge-danger' },
  approved: { label: 'Disetujui', badge: 'badge-success' },
  rejected: { label: 'Ditolak', badge: 'badge-danger' },
};

export default function PermitsPage() {
  const { user } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState('sakit');
  const [formReason, setFormReason] = useState('');

  const isPeserta = user?.role === 'peserta';
  const canApprove = user && ['gt', 'cdt', 'inti'].includes(user.role);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Demo: Izin "${formType}" berhasil diajukan.`);
    setShowForm(false);
    setFormReason('');
  };

  if (!user) return null;

  return (
    <div style={{ maxWidth: 1000 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: 'var(--primary)' }}>📋 Perizinan</h1>
          <p style={{ fontSize: 14, color: 'var(--text-muted)' }}>
            {isPeserta ? 'Ajukan perizinan dan pantau statusnya.' : 'Verifikasi dan kelola pengajuan izin peserta.'}
          </p>
        </div>
        {isPeserta && (
          <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
            {showForm ? '✕ Batal' : '+ Ajukan Izin'}
          </button>
        )}
      </div>

      {showForm && isPeserta && (
        <form onSubmit={handleSubmit} className="card" style={{ marginBottom: 20, border: '2px solid var(--primary)', borderColor: 'rgba(53,91,49,0.3)' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--primary)', marginBottom: 16 }}>Formulir Perizinan Baru</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 8, display: 'block' }}>Jenis Izin</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
                {PERMIT_TYPES.map(pt => (
                  <button key={pt.value} type="button"
                    onClick={() => setFormType(pt.value)}
                    style={{
                      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                      padding: '14px 8px', background: formType === pt.value ? 'var(--primary-bg)' : 'var(--surface-alt)',
                      border: `1px solid ${formType === pt.value ? 'var(--primary)' : 'var(--border)'}`,
                      borderRadius: 'var(--radius)', cursor: 'pointer', fontSize: 13, color: 'var(--text)',
                      fontFamily: 'inherit', transition: 'var(--transition)',
                    }}>
                    <span style={{ fontSize: 24 }}>{pt.icon}</span>
                    <span style={{ fontWeight: formType === pt.value ? 600 : 400 }}>{pt.label}</span>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6, display: 'block' }}>Alasan</label>
              <textarea className="input" rows={3} placeholder="Jelaskan alasan perizinan..." value={formReason} onChange={e => setFormReason(e.target.value)} required />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Kirim Pengajuan</button>
          </div>
        </form>
      )}

      <div className="card">
        <div className="card-header">
          <div className="card-title">📋 Daftar Perizinan</div>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Jenis</th>
                <th>Alasan</th>
                <th>Status</th>
                <th>Tanggal</th>
                {canApprove && <th>Aksi</th>}
              </tr>
            </thead>
            <tbody>
              {DEMO_PERMITS.map(p => (
                <tr key={p.id}>
                  <td>{PERMIT_TYPES.find(t => t.value === p.type)?.icon} {PERMIT_TYPES.find(t => t.value === p.type)?.label}</td>
                  <td style={{ maxWidth: 300 }}>{p.reason}</td>
                  <td><span className={`badge ${STATUS_MAP[p.status]?.badge}`}>{STATUS_MAP[p.status]?.label}</span></td>
                  <td className="mono">{p.date}</td>
                  {canApprove && (
                    <td>
                      {(p.status === 'pending_gt' || p.status === 'escalated_cdt') && (
                        <div style={{ display: 'flex', gap: 6 }}>
                          <button className="btn btn-sm btn-primary" onClick={() => alert('Demo: Disetujui')}>✅</button>
                          <button className="btn btn-sm btn-danger" onClick={() => alert('Demo: Ditolak')}>❌</button>
                        </div>
                      )}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
