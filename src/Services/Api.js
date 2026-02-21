import axios from 'axios';

// Base URL for backend API
// const BASE_URL = 'http://localhost:8080';
const BASE_URL = 'https://veer-tejaji-backend-production.up.railway.app';


const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to all API requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_data');
      localStorage.removeItem('isAdmin');
      // Only redirect if not already on login page
      if (!window.location.pathname.includes('/admin/login')) {
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

// Committee Member APIs
export const committeeApi = {
  getAll: () => api.get('/api/committee'),
  getById: (id) => api.get(`/api/committee/${id}`),
  create: (data) => api.post('/api/committee', data),
  update: (id, data) => api.put(`/api/committee/${id}`, data),
  delete: (id) => api.delete(`/api/committee/${id}`),
  createWithImage: (formData) => api.post('/api/committee/with-image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }),
};

// Donor APIs
export const donorApi = {
  getAll: () => api.get('/api/donor'),
  getById: (id) => api.get(`/api/donor/${id}`),
  create: (data) => api.post('/api/donor', data),
  update: (id, data) => api.put(`/api/donor/${id}`, data),
  delete: (id) => api.delete(`/api/donor/${id}`),
};

// Blood Donor APIs
export const bloodDonorApi = {
  getAll: () => api.get('/api/BloodDonor'),
  getById: (id) => api.get(`/api/BloodDonor/${id}`),
  create: (data) => api.post('/api/BloodDonor', data),
  update: (id, data) => api.put(`/api/BloodDonor/${id}`, data),
  delete: (id) => api.delete(`/api/BloodDonor/${id}`),
};

// Volunteer APIs
export const volunteerApi = {
  getAll: () => api.get('/api/Volunteer'),
  getById: (id) => api.get(`/api/Volunteer/${id}`),
  create: (data) => api.post('/api/Volunteer', data),
  update: (id, data) => api.put(`/api/Volunteer/${id}`, data),
  delete: (id) => api.delete(`/api/Volunteer/${id}`),
};

// Gallery Image APIs
export const galleryApi = {
  getAll: () => api.get('/api/gallery'),
  getById: (id) => api.get(`/api/gallery/${id}`),
  create: (data) => api.post('/api/gallery', data),
  update: (id, data) => api.put(`/api/gallery/${id}`, data),
  delete: (id) => api.delete(`/api/gallery/${id}`),
  createWithImage: (formData) => api.post('/api/gallery/with-image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }),
};

export default api;