import axios from 'axios';

export const TOKEN_KEY = "@null-Forum-token";
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const login = token => {
    localStorage.setItem(TOKEN_KEY, token);
};
export const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
};

const API = axios.create({
    baseURL: 'http://localhost:3521/api/'
});

API.interceptors.request.use(async config => {
    const token = getToken();
    if (token) {
        config.headers['x-access-token'] = token;
    }
    return config;
})

export default API;