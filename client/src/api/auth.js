// Authentication API endpoints
// Placeholder implementations for development

export const register = async (email, password) => ({ success: true });
export const login = async (email, password) => ({ success: true, token: 'mock-token' });
export const logout = async () => ({ success: true });
export const getCurrentUser = async () => ({ id: 1, email: 'user@example.com' });
export const updateProfile = async (data) => ({ success: true });
export const forgotPassword = async (email) => ({ success: true });
export const resetPassword = async (token, password) => ({ success: true });
export const isAuthenticated = () => !!localStorage.getItem('auth_token');
