const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const API_ROUTES = {
  AUTH: {
    LOGIN: `${BASE_URL}/auth/login`,
    LOGOUT: `${BASE_URL}/auth/logout`,
  },
  USER: {
    CREATE: `${BASE_URL}/user`,
    ME: `${BASE_URL}/user/me`,
  },
  NOTE: {
    CREATE: `${BASE_URL}/note`,
    LIST: `${BASE_URL}/note`,
    UPDATE: (id: number) => `${BASE_URL}/note/${id}`,
    DELETE: (id: number) => `${BASE_URL}/note/${id}`,
  },
  TAG: {
    LIST: `${BASE_URL}/tag`,
  },
};
