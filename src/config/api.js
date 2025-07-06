// API Configuration
export const API = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// API endpoints
export const ENDPOINTS = {
  AGENTS: '/agents',
  ITINERARIES: '/itineraries',
  AUTH: '/auth',
  USERS: '/users',
  BOOKINGS: '/bookings',
  REVIEWS: '/reviews'
};

// Default headers
export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
};

// API helper functions
export const apiRequest = async (endpoint, options = {}) => {
  const url = `${API}${endpoint}`;
  const config = {
    headers: DEFAULT_HEADERS,
    ...options,
  };

  try {
    const response = await fetch(url, config);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}; 