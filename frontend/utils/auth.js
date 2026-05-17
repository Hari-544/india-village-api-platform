export const getToken = () => {

    if (typeof window === 'undefined') {
        return null;
    }

    return localStorage.getItem('token');

};

export const logout = () => {

    localStorage.removeItem('token');

    localStorage.removeItem('api_key');

    window.location.href = '/login';

};

export const isAuthenticated = () => {

    return !!getToken();

};