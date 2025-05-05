const apiUrl = import.meta.env.VITE_REST_API_URL as string;
const adminUrl = import.meta.env.VITE_ADMIN_FRONTEND_URL as string;
const baseUrl = import.meta.env.VITE_BASE_URL as string;

const config = {
  apiUrl,
  adminUrl,
  baseUrl
};

export default config;
