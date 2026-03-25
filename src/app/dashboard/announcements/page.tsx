'use client';

import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';

// ============================================
// TODO: REMOVE — Hardcoded demo data for pitching
// ============================================
const DEMO_ANNOUNCEMENTS = [
  { id: '1', title: 'Perubahan Jadwal Briefing Pagi', content: 'Briefing pagi hari Rabu dimajukan ke pukul 06:30 WIB. Semua peserta wajib hadir tepat waktu.', type: 'urgent', date: '2025-08-15 10:00' },
  { id: '2', title: 'Pengumuman Penilaian Harian', content: 'Penilaian standing points akan direkapitulasi setiap akhir hari. Pastikan tidak ada pelanggaran yang terlewat.', type: 'news', date: '2025-08-14 15:30' },
  { id: '3', title: 'Briefing Sore — Evaluasi', content: 'Evaluasi kelompok akan dilakukan sore ini pukul 16:00 di Aula Telkom. GT wajib membawa data peserta masing-masing.', type: 'daily_briefing', date: '2025-08-14 09:00' },
];

const TYPE_STYLES: Record<string, { icon: string; badge: string; label: string }> = {
  urgent: { icon: '🚨', badge: 'badge-danger', label: 'URGENT' },
  news: { icon: '📰', badge: 'badge-info', label: 'NEWS' },
  daily_briefing: { icon: '📋', badge: 'badge-warning', label: 'BRIEFING' },
};

export default function AnnouncementsPage() {
  const { user } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [type, setType] = useState('news');

  if (!user) return null;
  const isPanitia = ['gt', 'cdt', 'det', 'inti'].includes(user.role);

  return (
    <div style={{ maxWidth: 800 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: 'var(--primary)' }}>📢 Pengumuman</h1>
          <p style={{ fontSize: 14, color: 'var(--text-muted)' }}>Informasi terbaru untuk seluruh panitia dan peserta.</p>
        </div>
        {isPanitia && (
          <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
            {showForm ? '✕ Batal' : '+ Buat Pengumuman'}
          </button>
        )}
      </div>

      {showForm && isPanitia && (
        <div className="card" style={{ marginBottom: 20, border: '2px solid rgba(37,99,235,0.2)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <input className="input" value={title} onChange={e => setTitle(e.target.value)} placeholder="Judul pengumuman..." />
            <textarea className="input" rows={3} value={content} onChange={e => setContent(e.target.value)} placeholder="Konten pengumuman..." />
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <select className="input" style={{ width: 160 }} value={type} onChange={e => setType(e.target.value)}>
                <option value="news">Normal</option>
                <option value="urgent">Urgent</option>
                <option value="daily_briefing">Briefing</option>
              </select>
              <button className="btn btn-primary" onClick={() => alert('Demo: Pengumuman dibuat')}>Kirim</button>
            </div>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {DEMO_ANNOUNCEMENTS.map(a => {
          const style = TYPE_STYLES[a.type] || TYPE_STYLES.news;
          return (
            <div key={a.id} className="card" style={a.type === 'urgent' ? { borderColor: 'rgba(220,38,38,0.2)', background: 'var(--danger-bg)' } : {}}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <span>{style.icon}</span>
                <h3 style={{ fontSize: 15, fontWeight: 700, flex: 1, color: 'var(--text)' }}>{a.title}</h3>
                <span className={`badge ${style.badge}`}>{style.label}</span>
              </div>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{a.content}</p>
              <div style={{ marginTop: 8, fontSize: 11, color: 'var(--text-muted)', fontFamily: 'monospace' }}>{a.date}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
