import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Default backend runs on 8091 and mounts routes under /api
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8091/api';

// Configure axios defaults
axios.defaults.baseURL = API_BASE_URL;
axios.defaults.withCredentials = true;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('auth-token'));
  const [loading, setLoading] = useState(true);

  // Apply token to axios immediately on mount to avoid initial 401s
  if (token && !axios.defaults.headers.common['auth-token']) {
    axios.defaults.headers.common['auth-token'] = token;
  }

  // Set up axios interceptor for token refresh
  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const status = error.response?.status;
        const originalRequest = error.config || {};
        const url = originalRequest.url || '';

        // Do not try to refresh for auth endpoints
        const isAuthEndpoint = url.includes('/auth/login') || url.includes('/auth/signup') || url.includes('/auth/refresh-token');

        if (status === 401 && token && !isAuthEndpoint && !originalRequest.__isRetryRequest) {
          try {
            const response = await axios.post('/auth/refresh-token');
            const newToken = response.data.token;
            setToken(newToken);
            localStorage.setItem('auth-token', newToken);
            axios.defaults.headers.common['auth-token'] = newToken;

            // Retry the original request once
            originalRequest.__isRetryRequest = true;
            originalRequest.headers = {
              ...(originalRequest.headers || {}),
              'auth-token': newToken,
            };
            return axios.request(originalRequest);
          } catch (refreshError) {
            logout();
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      }
    );

    return () => axios.interceptors.response.eject(interceptor);
  }, [token]);

  // Set token in axios headers when token changes
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['auth-token'] = token;
    } else {
      delete axios.defaults.headers.common['auth-token'];
    }
  }, [token]);

  // Check if user is logged in on app start
  useEffect(() => {
    const checkAuth = async () => {
      if (token) {
        try {
          // You might want to add an endpoint to get current user info
          // For now, we'll just set the token and assume user is logged in
          setUser({ token });
        } catch (error) {
          console.error('Auth check failed:', error);
          logout();
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, [token]);

  const login = async (email, password) => {
    try {
      const response = await axios.post('/auth/login', { email, password });
      const { token: newToken, user: userData } = response.data;
      
      // Ensure subsequent requests include token immediately
      axios.defaults.headers.common['auth-token'] = newToken;
      setToken(newToken);
      setUser(userData);
      localStorage.setItem('auth-token', newToken);
      
      return { success: true, user: userData };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Login failed' 
      };
    }
  };

  const register = async (userData) => {
    try {
      const response = await axios.post('/auth/signup', userData);
      const { token: newToken, user: newUser } = response.data;
      
      // Ensure subsequent requests include token immediately
      axios.defaults.headers.common['auth-token'] = newToken;
      setToken(newToken);
      setUser(newUser);
      localStorage.setItem('auth-token', newToken);
      
      return { success: true, user: newUser };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Registration failed' 
      };
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('auth-token');
    delete axios.defaults.headers.common['auth-token'];
  };

  const value = {
    user,
    token,
    login,
    register,
    logout,
    loading,
    isAuthenticated: !!token
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
