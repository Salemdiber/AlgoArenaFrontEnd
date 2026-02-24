export const setToken = (token) => {
    document.cookie = `access_token=${token}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Lax`;
};

export const getToken = () => {
    const match = document.cookie.match(new RegExp('(^| )access_token=([^;]+)'));
    return match ? match[2] : null;
};

export const removeToken = () => {
    document.cookie = 'access_token=; path=/; max-age=0;';
};
