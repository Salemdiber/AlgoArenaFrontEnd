import { apiClient } from './apiClient';

export const authService = {
    login: async (credentials) => {
        // credentials: { username, password }
        // API expecting username and password for login
        return apiClient('/auth/login', {
            method: 'POST',
            body: JSON.stringify(credentials),
        });
    },

    register: async (data) => {
        // data: { username, password, email, bio?, avatar?, role? }
        return apiClient('/auth/register', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    },

    // logout is handled on UI level by removing cookies, but if a backend route exists, we could use it.
    // For now we will support logout utility function in cookieUtils.
};
