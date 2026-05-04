import { apiClient } from './api';
import { Specialist } from '@/data/centers-database';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'super_admin' | 'center_admin' | 'specialist';
  center_id: string | null;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

export const authService = {
  // Login to get token
  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await apiClient('/auth/login', {
      method: 'POST',
      body: { email, password },
    });
    
    // Store token
    if (response.token) {
      localStorage.setItem('wasel_auth_token', response.token);
      localStorage.setItem('wasel_user', JSON.stringify(response.user));
    }
    
    return response;
  },

  // Logout and clear token
  logout: () => {
    localStorage.removeItem('wasel_auth_token');
    localStorage.removeItem('wasel_user');
  },

  // Get current user from token
  getMe: async (): Promise<{ user: User }> => {
    return apiClient('/auth/me', {
      useAuth: true,
    });
  },

  // Check if logged in locally
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('wasel_auth_token');
  },

  // Get current user from local storage
  getCurrentUser: (): User | null => {
    const userStr = localStorage.getItem('wasel_user');
    return userStr ? JSON.parse(userStr) : null;
  }
};
