import React, { createContext, useContext, useEffect, useState } from 'react';
import { isSupabaseConfigured } from '@/lib/supabase';
import { authService } from '@/services/auth.service';
import { useAuthStore } from '@/stores/auth-store';
import type { Profile, UserRole } from '@/types/database';

interface AuthContextType {
  isLoading: boolean;
  isAuthenticated: boolean;
  user: Profile | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string, role?: UserRole) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { user, setUser, setSession, setLoading, isLoading, isAuthenticated, logout, setPatientProfile } = useAuthStore();

  useEffect(() => {
    // If Supabase is not configured, skip auth initialization
    if (!isSupabaseConfigured) {
      const savedRole = sessionStorage.getItem('mockRole') as UserRole;
      const savedName = sessionStorage.getItem('mockName');
      
      if (savedRole && savedName) {
        setUser({
          id: 'mock-user-id',
          email: 'mock@example.com',
          full_name: savedName,
          role: savedRole,
          created_at: new Date().toISOString()
        });
      } else {
        // If they had isAuthenticated in persist but no mock data, clear it
        logout();
      }
      setLoading(false);
      return;
    }

    const initAuth = async () => {
      try {
        const session = await authService.getSession();
        if (session?.user) {
          setSession(session);
          const profile = await authService.getProfile(session.user.id);
          if (profile) {
            setUser(profile);
            if (profile.role === 'patient') {
              const patientProfile = await authService.getPatientProfile(session.user.id);
              setPatientProfile(patientProfile);
            }
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
      } finally {
        setLoading(false);
      }
    };

    initAuth();

    // Listen for auth state changes
    const { data: { subscription } } = authService.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          setSession(session);
          const profile = await authService.getProfile(session.user.id);
          if (profile) {
            setUser(profile);
          }
        } else if (event === 'SIGNED_OUT') {
          logout();
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      if (!isSupabaseConfigured) {
        // Mock login
        const emailRole = email.includes('center') ? 'center' : email.includes('insurance') ? 'insurance' : 'patient';
        const savedRole = sessionStorage.getItem('mockRole') as UserRole || emailRole;
        const savedName = sessionStorage.getItem('mockName') || 'مستخدم تجريبي';
        
        sessionStorage.setItem('mockRole', savedRole);
        sessionStorage.setItem('mockName', savedName);
        
        const mockUser: Profile = {
          id: 'mock-user-id',
          email: email,
          full_name: savedName,
          role: savedRole,
          created_at: new Date().toISOString()
        };
        setUser(mockUser);
        return;
      }
      
      const { session, user: authUser } = await authService.signIn(email, password);
      if (session && authUser) {
        setSession(session);
        const profile = await authService.getProfile(authUser.id);
        if (profile) {
          setUser(profile);
          if (profile.role === 'patient') {
            const patientProfile = await authService.getPatientProfile(authUser.id);
            setPatientProfile(patientProfile);
          }
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, fullName: string, role: UserRole = 'patient') => {
    setLoading(true);
    try {
      if (!isSupabaseConfigured) {
        // Mock signup
        sessionStorage.setItem('mockRole', role);
        sessionStorage.setItem('mockName', fullName);
        const mockUser: Profile = {
          id: 'mock-user-id',
          email: email,
          full_name: fullName,
          role: role,
          created_at: new Date().toISOString()
        };
        setUser(mockUser);
        return;
      }
      
      await authService.signUp(email, password, fullName, role);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    if (isSupabaseConfigured) {
      try {
        await authService.signOut();
      } catch (e) {
        console.error('Sign out error:', e);
      }
    }
    logout();
    sessionStorage.removeItem('isSpecialist');
    sessionStorage.removeItem('username');
  };

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        isAuthenticated,
        user,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
