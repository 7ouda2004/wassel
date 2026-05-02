import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Profile, PatientProfile, UserRole } from '@/types/database';

interface AuthState {
  // State
  user: Profile | null;
  patientProfile: PatientProfile | null;
  session: any | null;
  isLoading: boolean;
  isAuthenticated: boolean;

  // Actions
  setUser: (user: Profile | null) => void;
  setPatientProfile: (profile: PatientProfile | null) => void;
  setSession: (session: any | null) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
  hasRole: (role: UserRole) => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      patientProfile: null,
      session: null,
      isLoading: true,
      isAuthenticated: false,

      setUser: (user) =>
        set({ user, isAuthenticated: !!user }),

      setPatientProfile: (patientProfile) =>
        set({ patientProfile }),

      setSession: (session) =>
        set({ session }),

      setLoading: (isLoading) =>
        set({ isLoading }),

      logout: () =>
        set({
          user: null,
          patientProfile: null,
          session: null,
          isAuthenticated: false,
        }),

      hasRole: (role) => {
        const { user } = get();
        return user?.role === role;
      },
    }),
    {
      name: 'wasel-auth',
      partialize: (state) => ({
        // Only persist minimal auth state
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
