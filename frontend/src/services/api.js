import axios from 'axios';

// Get base URL from environment variable
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

/**
 * Pre-configured Axios instance for VYAPARMITRA API communication.
 * Ready for backend integration when backend services are deployed.
 */
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Request interceptor: attach authorization token if available
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('vyaparmitra_auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: handle standard HTTP status codes
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // 401 Unauthorized handling (token expired or invalid)
    if (error.response && error.response.status === 401) {
      // Optional: Clear stored credentials and trigger logout event
      console.warn('Unauthorized request intercepted. Session may have expired.');
    }
    return Promise.reject(error);
  }
);

export default apiClient;
export { API_BASE_URL };
