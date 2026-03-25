// =============================================
// Supabase Database Types for PROXIMITI Dashboard
// =============================================

export type UserRole = 'peserta' | 'gt' | 'cdt' | 'det' | 'inti';

export type PointType = 'reduction' | 'bonus';

export type TokenStatus = 'active' | 'used' | 'expired';

export type PermitType = 'sakit' | 'kematian' | 'agama' | 'kegiatan';

export type PermitStatus =
  | 'pending_gt'
  | 'escalated_cdt'
  | 'approved'
  | 'rejected';

export interface User {
  id: string;
  nim: string;
  full_name: string;
  role: UserRole;
  group_id: number;
  created_at: string;
}

export interface PointsLedger {
  id: string;
  user_id: string;
  type: PointType;
  amount: number;
  day: number;
  reason: string;
  total_deduction: number; // amount * day (auto-calculated)
  recorded_by: string; // panitia_id yang merekam
  created_at: string;
}

export interface BandingToken {
  token_code: string;
  user_id: string;
  issued_by: string; // CDT panitia ID
  status: TokenStatus;
  created_at: string;
  used_at: string | null;
}

export interface Permit {
  id: string;
  user_id: string;
  type: PermitType;
  reason: string;
  evidence_url: string | null;
  status: PermitStatus;
  gt_id: string | null;
  cdt_id: string | null;
  approved_by: string | null;
  submitted_at: string;
  escalated_at: string | null;
  resolved_at: string | null;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  type: 'news' | 'urgent' | 'daily_briefing';
  created_by: string;
  created_at: string;
}

export interface AuditLog {
  id: string;
  actor_id: string;
  action: string;
  target_table: string;
  target_id: string;
  details: string;
  created_at: string;
}

// Supabase Database type for typed client
export interface Database {
  public: {
    Tables: {
      users: {
        Row: User;
        Insert: Omit<User, 'id' | 'created_at'>;
        Update: Partial<Omit<User, 'id'>>;
      };
      points_ledger: {
        Row: PointsLedger;
        Insert: Omit<PointsLedger, 'id' | 'created_at' | 'total_deduction'>;
        Update: Partial<Omit<PointsLedger, 'id'>>;
      };
      banding_tokens: {
        Row: BandingToken;
        Insert: Omit<BandingToken, 'used_at'>;
        Update: Partial<BandingToken>;
      };
      permits: {
        Row: Permit;
        Insert: Omit<Permit, 'id' | 'submitted_at' | 'escalated_at' | 'resolved_at'>;
        Update: Partial<Omit<Permit, 'id'>>;
      };
      announcements: {
        Row: Announcement;
        Insert: Omit<Announcement, 'id' | 'created_at'>;
        Update: Partial<Omit<Announcement, 'id'>>;
      };
      audit_log: {
        Row: AuditLog;
        Insert: Omit<AuditLog, 'id' | 'created_at'>;
        Update: never;
      };
    };
  };
}
