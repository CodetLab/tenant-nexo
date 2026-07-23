// src/types/auth.types.ts

export interface User {
  id: string;
  name?: string;
  email: string;

  // Opcional para futuras fases
  role?: string;
  permissions?: string[];
}

export interface LoginInput {
  email: string;
  password: string;
  appSlug: string;
}

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
  appSlug: string;
}

export interface AuthResponse {
  token: string;
  user: User;
  emailVerified: boolean;
  sessions: {
    session_id: string;
    device: string;
    ip: string;
    user_id: string;
    expires_at: string;
  }[];
}