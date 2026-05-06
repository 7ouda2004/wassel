import { supabase } from '@/lib/supabase';
import type { Profile, UserRole, PatientProfile } from '@/types/database';

export const authService = {
  // Session & Auth state
  getSession: async () => {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) throw error;
    return session;
  },

  onAuthStateChange: (callback: (event: string, session: any) => void) => {
    return supabase.auth.onAuthStateChange(callback);
  },

  // Auth actions
  signIn: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  },

  signUp: async (email: string, password: string, fullName: string, role: UserRole = 'patient') => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          role: role,
        }
      }
    });
    if (error) throw error;

    // After signup, we might need to manually insert the profile if trigger doesn't exist
    if (data.user) {
      const { error: profileError } = await supabase.from('profiles').insert({
        id: data.user.id,
        email: email,
        full_name: fullName,
        role: role
      });
      if (profileError) console.error('Error creating profile:', profileError);
    }
    return data;
  },

  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  // Profiles
  getProfile: async (userId: string): Promise<Profile | null> => {
    const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).single();
    if (error) {
      console.error('Error fetching profile:', error);
      return null;
    }
    return data;
  },

  getPatientProfile: async (userId: string): Promise<PatientProfile | null> => {
    const { data, error } = await supabase.from('patient_profiles').select('*').eq('id', userId).single();
    if (error) {
      console.error('Error fetching patient profile:', error);
      return null;
    }
    return data;
  }
};
