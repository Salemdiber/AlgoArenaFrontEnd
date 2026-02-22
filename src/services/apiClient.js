import { getToken, removeToken } from './cookieUtils';

const BASE_URL = '/api';

export const apiClient = async (endpoint, options = {}) => {
    const token = options.token || getToken();
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    if (options.body && options.body instanceof FormData) {
        // Let the browser set the content type with boundary for FormData
        delete headers['Content-Type'];
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers,
    });

    let data;
    try {
        const text = await response.text();
        data = text ? JSON.parse(text) : null;
    } catch {
        data = null; // non-json or parsing error
    }

    if (!response.ok) {
        const errorMsg = data?.message || data?.error || 'Something went wrong';

        // Handle unauthorized (expired/invalid token) globally, EXCEPT for login which legitimately returns 401 on bad credentials
        if (response.status === 401 && !endpoint.includes('/auth/login')) {
            removeToken();
            localStorage.removeItem('fo_auth');
            localStorage.removeItem('isAuthenticated');
            if (window.location.pathname !== '/signin' && window.location.pathname !== '/signup') {
                window.location.href = '/signin';
            }
        }

        throw new Error(errorMsg);
    }

    return data;
};
