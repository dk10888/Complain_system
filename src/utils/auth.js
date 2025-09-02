// Utility to handle token storage
export const setToken = (token) => localStorage.setItem("token", token);
export const getToken = () => localStorage.getItem("token");
export const removeToken = () => localStorage.removeItem("token");

// Utility to get role
export const setRole = (role) => localStorage.setItem("role", role);
export const getRole = () => localStorage.getItem("role");
export const removeRole = () => localStorage.removeItem("role");
