// Base API URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Utility to handle fetch errors consistently
class ApiError extends Error {
  status: number;
  data: any;

  constructor(status: number, message: string, data?: any) {
    super(message);
    this.status = status;
    this.data = data;
  }
}

// Interceptor for API calls
export const apiClient = async (
  endpoint: string, 
  { method = 'GET', body, headers = {}, useAuth = false, isFormData = false }: 
  { method?: string, body?: any, headers?: HeadersInit, useAuth?: boolean, isFormData?: boolean } = {}
) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const options: RequestInit = {
    method,
    headers: { ...headers },
  };

  // Add auth token if required
  if (useAuth) {
    const token = localStorage.getItem('wasel_auth_token');
    if (token) {
      (options.headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
    }
  }

  // Handle body formatting
  if (body) {
    if (isFormData) {
      options.body = body; // let browser set multipart boundary
    } else {
      (options.headers as Record<string, string>)['Content-Type'] = 'application/json';
      options.body = JSON.stringify(body);
    }
  }

  try {
    const response = await fetch(url, options);
    
    // Attempt to parse JSON response
    let data;
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    if (!response.ok) {
      throw new ApiError(response.status, data.error || 'API Request Failed', data);
    }

    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    // Network errors
    throw new ApiError(500, 'Network error or server is unreachable');
  }
};
