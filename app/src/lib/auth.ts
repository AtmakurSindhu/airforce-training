import type { User, Session } from '@/types';
import { users } from '@/data/mockData';

const SESSION_KEY = 'iaf_training_session';

export interface LoginCredentials {
  email: string;
  password: string;
}

export function login(credentials: LoginCredentials): { success: boolean; user?: User; error?: string } {
  // Mock authentication - in production, this would validate against a backend
  const user = users.find(u => u.email === credentials.email);
  
  if (!user) {
    return { success: false, error: 'Invalid credentials' };
  }
  
  // Mock password check (password is 'password' for all demo accounts)
  if (credentials.password !== 'password') {
    return { success: false, error: 'Invalid credentials' };
  }
  
  const session: Session = {
    user,
    isAuthenticated: true,
  };
  
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  
  return { success: true, user };
}

export function logout(): void {
  localStorage.removeItem(SESSION_KEY);
}

export function getSession(): Session | null {
  if (typeof window === 'undefined') return null;
  
  const sessionData = localStorage.getItem(SESSION_KEY);
  if (!sessionData) return null;
  
  try {
    return JSON.parse(sessionData) as Session;
  } catch {
    return null;
  }
}

export function isAuthenticated(): boolean {
  const session = getSession();
  return session?.isAuthenticated ?? false;
}

export function getCurrentUser(): User | null {
  const session = getSession();
  return session?.user ?? null;
}

export function hasRole(role: User['role'] | User['role'][]): boolean {
  const user = getCurrentUser();
  if (!user) return false;
  
  if (Array.isArray(role)) {
    return role.includes(user.role);
  }
  
  return user.role === role;
}

export function requireAuth(): User | null {
  const user = getCurrentUser();
  if (!user) {
    window.location.href = '/login';
    return null;
  }
  return user;
}

export function requireRole(role: User['role'] | User['role'][]): User | null {
  const user = requireAuth();
  if (!user) return null;
  
  if (!hasRole(role)) {
    window.location.href = '/unauthorized';
    return null;
  }
  
  return user;
}
