import api from './Api';

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'user_data';

export const authService = {
  // Login and store token
  login: async (username, password) => {
    try {
      const response = await api.post('/api/auth/login', { username, password });
      const { token, username: user, role } = response.data;
      
      // Store token and user data
      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem(USER_KEY, JSON.stringify({ username: user, role }));
      localStorage.setItem('isAdmin', 'true');
      
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Login failed',
      };
    }
  },

  // Logout
  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem('isAdmin');
  },

  // Get stored token
  getToken: () => {
    return localStorage.getItem(TOKEN_KEY);
  },

  // Get user data
  getUser: () => {
    const userData = localStorage.getItem(USER_KEY);
    return userData ? JSON.parse(userData) : null;
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem(TOKEN_KEY);
  },

  // Validate token with backend
  validateToken: async () => {
    try {
      const token = authService.getToken();
      if (!token) return false;

      const response = await api.post('/api/auth/validate', {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.valid === true;
    } catch (error) {
      return false;
    }
  },
};

export default authService;
