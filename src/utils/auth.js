// Basic auth utility functions

export function getAuthToken() {
  // Get token from localStorage, sessionStorage, or cookies
  return localStorage.getItem('authToken') || 
         sessionStorage.getItem('authToken') || 
         getCookieValue('authToken');
}

export function setAuthToken(token) {
  localStorage.setItem('authToken', token);
}

export function removeAuthToken() {
  localStorage.removeItem('authToken');
  localStorage.removeItem('userData');
  sessionStorage.removeItem('authToken');
  sessionStorage.removeItem('userData');
  // Also remove from cookies if needed
  document.cookie = 'authToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
}

export function getUserData() {
  const userData = localStorage.getItem('userData') || sessionStorage.getItem('userData');
  try {
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Error parsing user data:', error);
    return null;
  }
}

export function setUserData(userData, persistent = true) {
  const dataString = JSON.stringify(userData);
  if (persistent) {
    localStorage.setItem('userData', dataString);
  } else {
    sessionStorage.setItem('userData', dataString);
  }
}

export function isAuthenticated() {
  const token = getAuthToken();
  return token && token.length > 0;
}

// Validate email format
export function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Validate password (minimum 6 characters)
export function validatePassword(password) {
  return password && password.length >= 6;
}

// Validate name (minimum 2 characters)
export function validateName(name) {
  return name && name.trim().length >= 2;
}

// Helper function to get cookie value
function getCookieValue(name) {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : null;
}

// Validate token format (basic example)
export function validateToken(token) {
  if (!token) return false;
  
  // Basic JWT format check (has 3 parts separated by dots)
  const parts = token.split('.');
  return parts.length === 3;
}

// Check if token is expired (for JWT tokens)
export function isTokenExpired(token) {
  if (!validateToken(token)) return true;
  
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp && payload.exp < currentTime;
  } catch (error) {
    console.error('Error parsing token:', error);
    return true;
  }
}