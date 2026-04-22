const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const API_ROUTES = {
  AUTH: {
    LOGIN: `${BASE_URL}/auth/login`,
    LOGOUT: `${BASE_URL}/auth/logout`,
  },
  USERS: {
    CREATE: `${BASE_URL}/users`,
    ME: `${BASE_URL}/users/me`,
  },
};
