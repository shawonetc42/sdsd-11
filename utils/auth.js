// utils/auth.js
export const isAuthenticated = () => {
  // Assuming 'authToken' is the cookie name for the authentication token
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("authToken="));
  return !!token;
};
