'use client';

/**
 * Aturan Peserta Page
 * 
 * Menampilkan PDF aturan peserta secara langsung (embedded) 
 * dan menyediakan tombol download.
 * 
 * CARA MENGGANTI PDF:
 * 1. Letakkan file PDF Anda di folder: public/
 * 2. Ganti nama file menjadi sesuai variabel PDF_PATH di bawah.
 */

const PDF_PATH = '/draft-aturan-peserta.pdf';

/* ── SVG Icons ── */
const IconDownload = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const IconFile = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--danger)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
  </svg>
);

const IconExternal = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const IconInfo = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);

export default function AturanPesertaPage() {
  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: 'var(--primary)', marginBottom: 4 }}>
            Aturan Peserta
          </h1>
          <p style={{ fontSize: 14, color: 'var(--text-muted)' }}>
            Dokumen aturan lengkap untuk peserta kaderisasi PROXIMITI.
          </p>
        </div>

        {/* Download Button */}
        <a
          href={PDF_PATH}
          download="Aturan-Peserta-PROXIMITI.pdf"
          className="btn btn-primary"
          style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none', whiteSpace: 'nowrap' }}
        >
          <IconDownload />
          Download PDF
        </a>
      </div>

      {/* PDF Viewer */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{
          background: 'var(--surface-alt)',
          padding: '10px 16px',
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <IconFile />
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)' }}>
              aturan-peserta.pdf
            </span>
          </div>
          <a
            href={PDF_PATH}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-sm btn-outline"
            style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6, padding: '4px 10px' }}
          >
            <IconExternal />
            Buka di Tab Baru
          </a>
        </div>
        <iframe
          src={PDF_PATH}
          style={{
            width: '100%',
            height: '80vh',
            minHeight: 600,
            border: 'none',
            display: 'block',
          }}
          title="Aturan Peserta PDF"
        />
      </div>

      {/* Info note */}
      <div style={{
        marginTop: 12,
        padding: '12px 16px',
        borderRadius: 'var(--radius)',
        background: 'var(--info-bg)',
        border: '1px solid rgba(37,99,235,0.15)',
        fontSize: 13,
        color: 'var(--info)',
        display: 'flex',
        alignItems: 'flex-start',
        gap: 8,
      }}>
        <span style={{ flexShrink: 0, marginTop: 1 }}><IconInfo /></span>
        <span>Jika PDF tidak muncul, gunakan tombol <strong>&quot;Download PDF&quot;</strong> di atas atau <strong>&quot;Buka di Tab Baru&quot;</strong> untuk melihat dokumen.</span>
      </div>
    </div>
  );
}
