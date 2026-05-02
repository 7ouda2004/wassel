import { useEffect } from 'react';
import { useAuthStore } from '@/stores/auth-store';
import { authService } from '@/services/auth.service';

/**
 * Hook to access auth state and listen for changes
 */
export function useAuthState() {
  const store = useAuthStore();

  useEffect(() => {
    const { data: { subscription } } = authService.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          store.setSession(session);
          const profile = await authService.getProfile(session.user.id);
          if (profile) store.setUser(profile);
        } else if (event === 'SIGNED_OUT') {
          store.logout();
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  return store;
}
