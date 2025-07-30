// ========================================
// API Service - Backend Communication
// ========================================
// This service handles all HTTP requests to the backend using axios
// Provides authentication, user management, and token handling

import axios from 'axios';

// Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://44.198.131.81:5000'; // Uses environment variable with fallback

// ========================================
// Axios Instance Configuration
// ========================================

// Create axios instance with default configuration
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000, // 10 second timeout
});

// ========================================
// Request Interceptor
// ========================================
// Automatically adds authentication token to all requests

api.interceptors.request.use(
    (config) => {
        // Get token from localStorage
        const token = localStorage.getItem('token');

        // Add Authorization header if token exists
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        // Handle request errors
        console.error('Request interceptor error:', error);
        return Promise.reject(error);
    }
);

// ========================================
// Response Interceptor
// ========================================
// Handles response processing and error handling

api.interceptors.response.use(
    (response) => {
        // Return only the data from successful responses
        return response.data;
    },
    (error) => {
        // Handle different types of errors
        let errorMessage = 'Something went wrong';

        if (error.response) {
            // Server responded with error status (4xx, 5xx)
            const data = error.response.data;

            if (typeof data === 'string') {
                // Backend returns plain text error
                errorMessage = data;
            } else if (data && data.message) {
                // Backend returns JSON with message
                errorMessage = data.message;
            } else {
                // Generic HTTP error
                errorMessage = `Error: ${error.response.status}`;
            }
        } else if (error.request) {
            // Network error (no response received)
            errorMessage = 'Network error. Please check your connection.';
        } else {
            // Other error (request setup failed)
            errorMessage = error.message;
        }

        console.error('API Error:', errorMessage);
        return Promise.reject(new Error(errorMessage));
    }
);

// ========================================
// API Service Class
// ========================================
// Provides methods for all backend operations

class ApiService {

    // ========================================
    // Authentication Methods
    // ========================================

    /**
     * Authenticate user with username and password
     * @param {Object} credentials - Login credentials
     * @param {string} credentials.username - User's username
     * @param {string} credentials.password - User's password
     * @returns {Promise<Object>} Response with user data and token
     */
    async login(credentials) {
        return api.post('/auth/login', credentials);
    }

    /**
     * Register new user
     * @param {Object} userData - User registration data
     * @param {string} userData.name - User's full name
     * @param {string} userData.username - Unique username
     * @param {string} userData.email - User's email address
     * @param {string} userData.password - User's password
     * @param {string} [userData.adminKey] - Optional admin code
     * @returns {Promise<Object>} Response with user data and token
     */
    async register(userData) {
        return api.post('/auth/register', userData);
    }

    // ========================================
    // User Management Methods
    // ========================================

    /**
     * Get current user's profile information
     * @returns {Promise<Object>} User profile data
     */
    async getUserProfile() {
        return api.get('/user/profile');
    }

    // ========================================
    // Token Management Methods
    // ========================================

    /**
     * Store authentication token in localStorage
     * @param {string} token - JWT token
     */
    setToken(token) {
        localStorage.setItem('token', token);
    }

    /**
     * Retrieve authentication token from localStorage
     * @returns {string|null} JWT token or null if not found
     */
    getToken() {
        return localStorage.getItem('token');
    }

    /**
     * Remove authentication token from localStorage
     */
    removeToken() {
        localStorage.removeItem('token');
    }

    /**
     * Check if user is currently authenticated
     * @returns {boolean} True if token exists, false otherwise
     */
    isAuthenticated() {
        return !!this.getToken();
    }

    /**
     * Create a new question (admin only)
     * @param {Object} questionData - The question data to send
     * @returns {Promise<Object>} The created question
     */
    async createQuestion(questionData) {
        return api.post('/practice/admin/create', questionData);
    }
}

// ========================================
// Export Singleton Instance
// ========================================
// Create and export a single instance to be used throughout the app

const apiService = new ApiService();
export default apiService; 