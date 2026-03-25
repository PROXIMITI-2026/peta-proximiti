'use client';

import { useAuth } from '@/context/AuthContext';

// ============================================
// TODO: REMOVE — Hardcoded demo data for pitching
// ============================================
const DEMO_MEMBERS = [
  { nim: '1301210001', name: 'Ahmad Fauzan', points: 85 },
  { nim: '1301210008', name: 'Rizki Pratama', points: 70 },
  { nim: '1301210020', name: 'Farhan Akbar', points: 72 },
  { nim: '1301210040', name: 'Dina Kurniawati', points: 95 },
  { nim: '1301210045', name: 'Reza Mahendra', points: 88 },
  { nim: '1301210050', name: 'Putri Rahayu', points: 100 },
];

export default function GroupPage() {
  const { user } = useAuth();
  if (!user) return null;

  return (
    <div style={{ maxWidth: 800 }}>
      <h1 style={{ fontSize: 22, fontWeight: 800, color: 'var(--primary)', marginBottom: 4 }}>👥 Kelompok {user.group_id || 1}</h1>
      <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 24 }}>{DEMO_MEMBERS.length} peserta dalam kelompok Anda.</p>

      <div className="card">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {DEMO_MEMBERS.map(m => (
            <div key={m.nim} style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '12px 16px', background: 'var(--surface-alt)',
              borderRadius: 'var(--radius)', border: '1px solid var(--border-subtle)',
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: 8, background: 'var(--primary)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontWeight: 700, fontSize: 14, flexShrink: 0,
              }}>
                {m.name.charAt(0)}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{m.name}</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'monospace' }}>{m.nim}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: 16, fontWeight: 800, color: m.points >= 80 ? 'var(--success)' : m.points >= 50 ? 'var(--warning)' : 'var(--danger)' }}>{m.points}</span>
                <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>poin</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
