/**
 * Backend base URL: localhost in development, Render in production.
 */
export const API_BASE_URL = import.meta.env.PROD
  ? "https://lastfm-album-chart-backend.onrender.com"
  : "http://localhost:3000";
