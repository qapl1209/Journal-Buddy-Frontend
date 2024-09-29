import { jwtDecode } from 'jwt-decode'

export const getToken = () => localStorage.getItem('access_token');
export const saveToken = (token) => localStorage.setItem('access_token', token);
export const getRefreshToken = () => localStorage.getItem('refresh_token');
export const saveRefreshToken = (token) => localStorage.setItem('refresh_token', token);
export const clearToken = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
};

export const isTokenExpired = () => {
    const token = getToken();
    if(!token) return true;

    try {
        // decode token, then compare to current time in seconds
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        return decodedToken.exp < currentTime;
    } catch (error) {
        console.error('Failed to decode token: ', error);
        return true;
    }
}