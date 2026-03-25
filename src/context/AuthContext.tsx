'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/lib/supabase';
import type { User, UserRole } from '@/types/database';

// ============================================
// DEMO MODE — Akun dummy untuk testing tanpa Supabase
// ============================================
const DEMO_USERS: User[] = [
  { id: 'demo-peserta-001', nim: '1301210001', full_name: 'Ahmad Fauzan (Peserta)', role: 'peserta', group_id: 1, created_at: new Date().toISOString() },
  { id: 'demo-gt-001', nim: '1301210002', full_name: 'Siti Nurhaliza (GT)', role: 'gt', group_id: 1, created_at: new Date().toISOString() },
  { id: 'demo-cdt-001', nim: '1301210003', full_name: 'Budi Santoso (CDT)', role: 'cdt', group_id: 0, created_at: new Date().toISOString() },
  { id: 'demo-det-001', nim: '1301210004', full_name: 'Diana Putri (DET)', role: 'det', group_id: 0, created_at: new Date().toISOString() },
  { id: 'demo-inti-001', nim: '1301210005', full_name: 'Eko Prasetyo (Tim Inti)', role: 'inti', group_id: 0, created_at: new Date().toISOString() },
];

function isDemoMode(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  return url.includes('YOUR_PROJECT_ID') || url === '';
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (nim: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isDemo: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const isDemo = isDemoMode();

  useEffect(() => {
    const stored = localStorage.getItem('proximiti_user');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem('proximiti_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (nim: string): Promise<{ success: boolean; error?: string }> => {
    // ---- DEMO MODE: cari dari akun dummy ----
    if (isDemo) {
      const demoUser = DEMO_USERS.find(u => u.nim === nim);
      if (demoUser) {
        setUser(demoUser);
        localStorage.setItem('proximiti_user', JSON.stringify(demoUser));
        return { success: true };
      }
      return {
        success: false,
        error: `NIM tidak ditemukan. Demo NIM: ${DEMO_USERS.map(u => u.nim).join(', ')}`,
      };
    }

    // ---- PRODUCTION MODE: query Supabase ----
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('nim', nim)
        .single();

      if (error || !data) {
        return { success: false, error: 'NIM tidak ditemukan. Hubungi panitia.' };
      }

      setUser(data as User);
      localStorage.setItem('proximiti_user', JSON.stringify(data));
      return { success: true };
    } catch {
      return { success: false, error: 'Gagal terhubung ke server.' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('proximiti_user');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isDemo }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

// Utility: check if user has specific role access
export function hasAccess(role: UserRole | undefined, allowed: UserRole[]): boolean {
  if (!role) return false;
  return allowed.includes(role);
}
