'use client';

// ============================================
// TODO: REMOVE — Hardcoded demo data for pitching
// ============================================
const DEMO_LOGS = [
  { id: '1', action: 'VIOLATION_CREATED', details: 'CDT Budi Santoso mencatat pelanggaran Pasal 4 untuk Rizki Pratama (-15 poin)', date: '2025-08-15 10:30' },
  { id: '2', action: 'PERMIT_APPROVED', details: 'GT Siti Nurhaliza menyetujui izin sakit Ahmad Fauzan', date: '2025-08-15 09:15' },
  { id: '3', action: 'TOKEN_GENERATED', details: 'CDT Budi Santoso menerbitkan token BND-A8K2M9X4 untuk Rizki Pratama', date: '2025-08-14 16:00' },
  { id: '4', action: 'BONUS_ADDED', details: 'DET Diana Putri menambahkan bonus 5 poin untuk Anisa Putri (keaktifan)', date: '2025-08-14 15:00' },
  { id: '5', action: 'PERMIT_REJECTED', details: 'GT menolak izin kegiatan — tidak memenuhi kriteria H-7 jam', date: '2025-08-14 11:00' },
  { id: '6', action: 'VIOLATION_CREATED', details: 'CDT mencatat pelanggaran Pasal 7 untuk Farhan Akbar (-28 poin)', date: '2025-08-13 14:30' },
];

const ACTION_BADGE: Record<string, string> = {
  VIOLATION_CREATED: 'badge-danger',
  PERMIT_APPROVED: 'badge-success',
  PERMIT_REJECTED: 'badge-danger',
  TOKEN_GENERATED: 'badge-purple',
  BONUS_ADDED: 'badge-warning',
};

export default function AuditPage() {
  return (
    <div style={{ maxWidth: 1000 }}>
      <h1 style={{ fontSize: 22, fontWeight: 800, color: 'var(--primary)', marginBottom: 4 }}>🔍 Audit Log</h1>
      <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 24 }}>Rekam jejak aktivitas panitia untuk transparansi dan akuntabilitas.</p>

      <div className="card">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {DEMO_LOGS.map(log => (
            <div key={log.id} style={{
              display: 'flex', alignItems: 'flex-start', gap: 12,
              padding: '12px 16px', background: 'var(--surface-alt)',
              borderRadius: 'var(--radius)', border: '1px solid var(--border-subtle)',
            }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 14 }}>
                🕐
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <span className={`badge ${ACTION_BADGE[log.action] || 'badge-neutral'}`} style={{ fontSize: 10 }}>{log.action}</span>
                  <span style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'monospace' }}>{log.date}</span>
                </div>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{log.details}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
