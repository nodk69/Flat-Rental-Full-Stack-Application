
export const saveRole = (role) => {
  localStorage.setItem("role", role);
};

//Get role from localStorage
export const getRole = () => localStorage.getItem("role");

//Clear auth data
export const clearAuth = () => {
  localStorage.removeItem("role");
};
