export const getToken = () => localStorage.getItem('access_token');
export const saveToken = (token) => localStorage.setItem('access_token', token);
export const getRefreshToken = () => localStorage.getItem('refresh_token');
export const saveRefreshToken = (token) => localStorage.setItem('refresh_token', token);
export const clearToken = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
};