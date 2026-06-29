export const API_ENDPOINTS = {
    AUTH: {
        LOGIN: '/login',
        REGISTER: '/auth/register',
        LOGOUT: '/auth/logout',
    },
    PRODUCTS: {
        GET_ALL: '/products',
        GET_BY_ID: (id: number) => `/products/${id}`,
        CREATE: '/products',
        UPDATE: (id: number) => `/products/${id}`,
        DELETE: (id: number) => `/products/${id}`,
    },
    USERS: {
        GET_ALL: '/users',
        GET_BY_ID: (id: number) => `/users/${id}`,
        CREATE: '/users',
        UPDATE: (id: number) => `/users/${id}`,
        DELETE: (id: number) => `/users/${id}`,
    },

    PERMISOS: {
        GET_ALL: '/permisos',
        GET_BY_ID: (id: number) => `/permisos/${id}`,
        CREATE: '/permisos',
        UPDATE: (id: number) => `/permisos/${id}`,
        DELETE: (id: number) => `/permisos/${id}`,
    },
};
