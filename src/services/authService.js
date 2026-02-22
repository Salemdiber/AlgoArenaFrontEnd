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

    checkAvailability: async (field, value) => {
        return apiClient('/auth/check-availability', {
            method: 'POST',
            body: JSON.stringify({ [field]: value }),
        });
    },

    // logout is handled on UI level by removing cookies, but if a backend route exists, we could use it.
    // For now we will support logout utility function in cookieUtils.

    forgotPassword: async (email, recaptchaToken) => {
        return apiClient('/auth/forgot-password', {
            method: 'POST',
            body: JSON.stringify({ email, recaptchaToken }),
        });
    },

    resetPassword: async (token, newPassword, confirmPassword, recaptchaToken) => {
        return apiClient('/auth/reset-password', {
            method: 'POST',
            body: JSON.stringify({ token, newPassword, confirmPassword, recaptchaToken }),
        });
    },
};
