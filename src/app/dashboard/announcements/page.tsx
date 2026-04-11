'use client';

/* ─────────────────────────── STATIC RULES DATA ─────────────────────────── */
const RULES_SECTIONS = [
  {
    id: 'umum',
    title: 'Ketentuan Umum',
    icon: '📋',
    rules: [
      'Seluruh peserta kaderisasi wajib mengenakan armband selama berada di zona wajib armband.',
      'Armband harus terpasang di pergelangan tangan kiri dan terlihat jelas.',
      'Armband tidak boleh dimodifikasi, dicoret, atau dirusak dalam bentuk apapun.',
      'Peserta wajib menunjukkan armband kepada panitia bila diminta sewaktu-waktu.',
      'Kehilangan armband harus segera dilaporkan kepada Group Trainer (GT) masing-masing.',
    ],
  },
  {
    id: 'zona',
    title: 'Zona Wajib Armband',
    icon: '🗺️',
    rules: [
      'Zona wajib armband mencakup kawasan Bojongsoang, Sukapura, Sukabirus, Jalan Radio, Batununggal, dan Ciganitri.',
      'Batas utara zona adalah Lampu Merah Buahbatu.',
      'Batas selatan zona adalah Jembatan Kedua Baleendah.',
      'Di luar zona wajib, peserta tetap dianjurkan mengenakan armband sebagai identitas kaderisasi.',
      'Gunakan fitur Peta Zonasi untuk mengecek apakah lokasi kamu termasuk dalam zona wajib.',
    ],
  },
  {
    id: 'jam-malam',
    title: 'Aturan Jam Malam',
    icon: '🌙',
    rules: [
      'Seluruh peserta wajib berada di tempat tinggal masing-masing setelah pukul 21.00 WIB.',
      'Keluar dari area tempat tinggal di atas jam 21.00 WIB hanya diperbolehkan dengan izin resmi dari panitia.',
      'Izin malam harus diajukan paling lambat pukul 18.00 WIB di hari yang sama.',
      'Pelanggaran jam malam akan dicatat langsung oleh CDT yang bertugas di lapangan.',
    ],
  },
  {
    id: 'pelanggaran',
    title: 'Klasifikasi Pelanggaran & Sanksi',
    icon: '⚠️',
    rules: [
      'Pasal 1 — Tidak memakai armband di zona wajib: Teguran lisan + pencatatan poin pelanggaran.',
      'Pasal 2 — Armband tidak pada posisi yang benar (bukan pergelangan kiri): Peringatan tertulis.',
      'Pasal 3 — Merusak/memodifikasi armband: Penggantian armband + sanksi tambahan dari DET.',
      'Pasal 4 — Kehilangan armband tanpa pelaporan: Sidang kasus oleh CDT & DET.',
      'Pasal 5 — Melanggar jam malam tanpa izin: Pemotongan standing poin kelompok.',
      'Pasal 6 — Pemalsuan surat izin: Diskualifikasi dari proses kaderisasi.',
    ],
  },
  {
    id: 'prosedur',
    title: 'Prosedur Pelaporan',
    icon: '📝',
    rules: [
      'Setiap pelanggaran harus dilaporkan oleh GT kepada CDT dalam waktu 1×24 jam.',
      'Pelaporan dilakukan melalui formulir resmi yang disediakan oleh DET.',
      'Peserta yang merasa dirugikan dapat mengajukan keberatan melalui mekanisme banding ke CDT.',
      'Keputusan banding bersifat final dan dikeluarkan dalam 2×24 jam setelah pengajuan.',
    ],
  },
];

const ANNOUNCEMENTS = [
  {
    id: 'ann-1',
    title: 'Perubahan Jadwal Briefing Pagi',
    content: 'Briefing pagi hari Rabu dimajukan ke pukul 06:30 WIB. Semua peserta wajib hadir tepat waktu di titik kumpul yang telah ditentukan.',
    type: 'urgent' as const,
    date: '15 Agustus 2025 — 10:00 WIB',
  },
  {
    id: 'ann-2',
    title: 'Pengumuman Penilaian Harian',
    content: 'Rekapitulasi standing points dilakukan setiap pukul 22.00 WIB. Pastikan seluruh laporan GT sudah masuk sebelum batas waktu.',
    type: 'news' as const,
    date: '14 Agustus 2025 — 15:30 WIB',
  },
  {
    id: 'ann-3',
    title: 'Briefing Sore — Evaluasi Kelompok',
    content: 'Evaluasi kelompok hari ini pukul 16:00 WIB di Aula Telkom University. GT wajib membawa data rekap pelanggaran masing-masing kelompok.',
    type: 'briefing' as const,
    date: '14 Agustus 2025 — 09:00 WIB',
  },
];

type AnnType = 'urgent' | 'news' | 'briefing';
const TYPE_CONFIG: Record<AnnType, { icon: string; badge: string; label: string; bg: string; border: string }> = {
  urgent:   { icon: '🚨', badge: 'badge-danger',  label: 'URGENT',   bg: 'var(--danger-bg)',  border: 'rgba(220,38,38,0.2)' },
  news:     { icon: '📰', badge: 'badge-info',    label: 'INFO',     bg: 'transparent',       border: 'var(--border)' },
  briefing: { icon: '📋', badge: 'badge-warning', label: 'BRIEFING', bg: 'transparent',       border: 'var(--border)' },
};

/* ─────────────────────────────── COMPONENT ─────────────────────────────── */
export default function AnnouncementsPage() {
  return (
    <div style={{ maxWidth: 860 }}>

      {/* ── Header ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: 'var(--primary)', marginBottom: 4 }}>
            📢 Pengumuman & Aturan Kaderisasi
          </h1>
          <p style={{ fontSize: 14, color: 'var(--text-muted)' }}>
            Informasi resmi, aturan, dan pengumuman terkini untuk seluruh panitia dan peserta.
          </p>
        </div>

        {/* Download button */}
        <a
          id="btn-download-aturan"
          href="/draft-aturan.pdf"
          download="Aturan-Kaderisasi-PROXIMITI.pdf"
          className="btn btn-primary"
          style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none', whiteSpace: 'nowrap' }}
        >
          ⬇️ Unduh Draft Aturan (PDF)
        </a>
      </div>

      {/* ── Announcements ── */}
      <div className="card" style={{ marginBottom: 24 }}>
        <div className="card-header">
          <div className="card-title">🔔 Pengumuman Terbaru</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {ANNOUNCEMENTS.map(ann => {
            const cfg = TYPE_CONFIG[ann.type];
            return (
              <div
                key={ann.id}
                style={{
                  padding: '14px 16px', borderRadius: 'var(--radius)',
                  background: cfg.bg, border: `1px solid ${cfg.border}`,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 18 }}>{cfg.icon}</span>
                  <h3 style={{ fontSize: 15, fontWeight: 700, flex: 1, color: 'var(--text)', margin: 0 }}>{ann.title}</h3>
                  <span className={`badge ${cfg.badge}`}>{cfg.label}</span>
                </div>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.65, margin: 0 }}>{ann.content}</p>
                <div style={{ marginTop: 8, fontSize: 11, color: 'var(--text-muted)', fontFamily: 'monospace' }}>🕐 {ann.date}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Rules Sections ── */}
      {RULES_SECTIONS.map((section) => (
        <div key={section.id} className="card" style={{ marginBottom: 16 }}>
          <div className="card-header">
            <div className="card-title">{section.icon} {section.title}</div>
          </div>
          <ol style={{ margin: 0, padding: '0 0 0 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {section.rules.map((rule, idx) => (
              <li key={idx} style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                {rule}
              </li>
            ))}
          </ol>
        </div>
      ))}

      {/* ── Note ── */}
      <div style={{
        padding: '14px 18px', borderRadius: 'var(--radius)',
        background: 'var(--primary-bg)', border: '1px solid rgba(53,91,49,0.2)',
        fontSize: 13, color: 'var(--primary)', fontWeight: 500,
        display: 'flex', gap: 10, alignItems: 'flex-start',
      }}>
        <span style={{ fontSize: 20, flexShrink: 0 }}>ℹ️</span>
        <span>
          Dokumen ini bersifat informatif. Untuk versi resmi dan lengkap dari seluruh aturan kaderisasi, silakan unduh dokumen draft aturan menggunakan tombol di atas.
        </span>
      </div>
    </div>
  );
}
