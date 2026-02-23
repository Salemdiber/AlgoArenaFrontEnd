import { getToken, removeToken, setToken } from './cookieUtils';

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

    // Ensure cookies (refresh token HttpOnly) are sent for same-origin requests
    const fetchOptions = {
        ...options,
        headers,
        credentials: options.credentials || 'include',
    };

    const doFetch = async () => {
        const response = await fetch(`${BASE_URL}${endpoint}`, fetchOptions);

        let data;
        try {
            const text = await response.text();
            data = text ? JSON.parse(text) : null;
        } catch {
            data = null; // non-json or parsing error
        }

        return { response, data };
    };

    // Attempt fetch
    let { response, data } = await doFetch();

    // If unauthorized, attempt refresh (except when calling login or refresh endpoints)
    if (response.status === 401 && !endpoint.includes('/auth/login') && !endpoint.includes('/auth/refresh')) {
        try {
            // Try refresh
            const refreshResp = await fetch(`${BASE_URL}/auth/refresh`, { method: 'POST', credentials: 'include' });
            if (refreshResp.ok) {
                const refreshData = await refreshResp.json();
                const newAccess = refreshData?.access_token;
                if (newAccess) {
                    // store new access token and retry original request
                    setToken(newAccess);
                    fetchOptions.headers['Authorization'] = `Bearer ${newAccess}`;
                    ({ response, data } = await doFetch());
                }
            } else {
                // refresh failed -> clear client state
                removeToken();
                localStorage.removeItem('fo_auth');
                localStorage.removeItem('isAuthenticated');
                if (window.location.pathname !== '/signin' && window.location.pathname !== '/signup') {
                    window.location.href = '/signin';
                }
            }
        } catch (e) {
            // network/other error during refresh; treat as unauthorized
            removeToken();
            localStorage.removeItem('fo_auth');
            localStorage.removeItem('isAuthenticated');
            if (window.location.pathname !== '/signin' && window.location.pathname !== '/signup') {
                window.location.href = '/signin';
            }
            throw new Error('Session expired');
        }
    }

    if (!response.ok) {
        const errorMsg = data?.message || data?.error || 'Something went wrong';
        throw new Error(errorMsg);
    }

    return data;
};
