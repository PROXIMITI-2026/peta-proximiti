'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function LoginPage() {
  const { user, login, loading, isDemo } = useAuth();
  const router = useRouter();
  const [nim, setNim] = useState('');
  const [error, setError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nim.trim()) {
      setError('Masukkan NIM kamu.');
      return;
    }
    setError('');
    setIsLoggingIn(true);
    const result = await login(nim.trim());
    setIsLoggingIn(false);
    if (result.success) {
      router.push('/dashboard');
    } else {
      setError(result.error || 'Login gagal.');
    }
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)' }}>
        <div style={{ width: 32, height: 32, border: '3px solid var(--border)', borderTopColor: 'var(--primary)', borderRadius: '50%', animation: 'spin 0.6s linear infinite' }} />
      </div>
    );
  }

  return (
    <div className="login-page">
      {/* Background */}
      <div className="login-bg">
        <div className="login-bg-shape login-bg-shape-1" />
        <div className="login-bg-shape login-bg-shape-2" />
        <div className="login-watermark">PROXIMITI</div>
      </div>

      <div className="login-wrapper">
        {/* Logo & Title */}
        <div className="login-header">
          <div className="login-logo-icon">🛡️</div>
          <h1 className="login-title">PROXIMITI</h1>
          <p className="login-subtitle">2025 Management System</p>
        </div>

        {/* Login Card */}
        <div className="login-card">
          <div className="login-card-header">
            <h2>Masuk ke Sistem</h2>
            <p>Gunakan NIM yang terdaftar</p>
          </div>

          <form onSubmit={handleLogin} className="login-form">
            <div className="form-field">
              <label htmlFor="nim">NIM (Student ID)</label>
              <input
                id="nim"
                type="text"
                className="input"
                placeholder="Contoh: 1301210001"
                value={nim}
                onChange={(e) => setNim(e.target.value)}
                autoFocus
                autoComplete="off"
              />
            </div>

            {error && (
              <div className="login-error">
                ⚠️ {error}
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary login-submit"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? 'Memproses...' : 'Masuk'}
            </button>
          </form>

          {/* Demo hints */}
          {isDemo && (
            <div className="demo-section">
              <p className="demo-label">🧪 DEMO MODE</p>
              <p className="demo-desc">Klik NIM untuk auto-fill:</p>
              <div className="demo-list">
                {[
                  { nim: '1301210001', role: 'Peserta' },
                  { nim: '1301210002', role: 'GT' },
                  { nim: '1301210003', role: 'CDT' },
                  { nim: '1301210004', role: 'DET' },
                  { nim: '1301210005', role: 'Tim Inti' },
                ].map(d => (
                  <button key={d.nim} type="button" className="demo-item" onClick={() => setNim(d.nim)}>
                    <code>{d.nim}</code> → {d.role}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .login-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, #1a3318 0%, #355B31 50%, #1a3318 100%);
        }
        .login-bg {
          position: fixed;
          inset: 0;
          z-index: 0;
          overflow: hidden;
        }
        .login-bg-shape {
          position: absolute;
          border-radius: 50%;
          opacity: 0.08;
          background: #fff;
        }
        .login-bg-shape-1 {
          width: 500px;
          height: 500px;
          top: -200px;
          right: -150px;
        }
        .login-bg-shape-2 {
          width: 400px;
          height: 400px;
          bottom: -150px;
          left: -100px;
        }
        .login-watermark {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 10rem;
          font-weight: 900;
          color: rgba(255,255,255,0.03);
          letter-spacing: 0.1em;
          white-space: nowrap;
          pointer-events: none;
          user-select: none;
        }
        .login-wrapper {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 420px;
          margin: 0 16px;
        }
        .login-header {
          text-align: center;
          margin-bottom: 28px;
        }
        .login-logo-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 56px;
          height: 56px;
          border-radius: 12px;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.15);
          font-size: 28px;
          margin-bottom: 12px;
        }
        .login-title {
          font-size: 28px;
          font-weight: 900;
          color: #fff;
          letter-spacing: -0.02em;
        }
        .login-subtitle {
          font-size: 14px;
          color: rgba(255,255,255,0.6);
          margin-top: 2px;
        }

        /* Card */
        .login-card {
          background: rgba(255,255,255,0.97);
          border-radius: 12px;
          padding: 32px 28px;
          box-shadow: 0 24px 48px rgba(0,0,0,0.2);
        }
        .login-card-header {
          text-align: center;
          margin-bottom: 24px;
        }
        .login-card-header h2 {
          font-size: 18px;
          font-weight: 700;
          color: var(--primary);
        }
        .login-card-header p {
          font-size: 13px;
          color: var(--text-muted);
          margin-top: 4px;
        }
        .login-form {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .form-field label {
          display: block;
          font-size: 13px;
          font-weight: 600;
          color: var(--text-secondary);
          margin-bottom: 6px;
        }
        .login-error {
          padding: 10px 14px;
          background: var(--danger-bg);
          border: 1px solid rgba(220,38,38,0.2);
          border-radius: var(--radius);
          color: var(--danger);
          font-size: 13px;
          font-weight: 500;
        }
        .login-submit {
          width: 100%;
          padding: 12px;
          font-size: 15px;
          margin-top: 4px;
        }

        /* Demo section */
        .demo-section {
          margin-top: 20px;
          padding-top: 20px;
          border-top: 1px solid var(--border);
        }
        .demo-label {
          font-size: 12px;
          font-weight: 700;
          color: var(--warning);
          text-align: center;
          margin-bottom: 6px;
        }
        .demo-desc {
          font-size: 12px;
          color: var(--text-muted);
          text-align: center;
          margin-bottom: 10px;
        }
        .demo-list {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .demo-item {
          display: block;
          width: 100%;
          padding: 8px 12px;
          background: var(--surface-alt);
          border: 1px solid var(--border);
          border-radius: 6px;
          font-size: 12px;
          color: var(--text-secondary);
          cursor: pointer;
          text-align: left;
          font-family: inherit;
          transition: var(--transition);
        }
        .demo-item:hover {
          border-color: var(--primary);
          background: var(--primary-bg);
        }
        .demo-item code {
          font-family: 'SF Mono', 'Fira Code', monospace;
          background: rgba(53,91,49,0.08);
          padding: 1px 6px;
          border-radius: 4px;
          color: var(--primary);
          font-weight: 600;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        @media (max-width: 640px) {
          .login-watermark { font-size: 4rem; }
        }
      `}</style>
    </div>
  );
}
