import axios from "axios";
import { parseCookies } from "nookies";

export const baseUrl = "https://admin.aibetguru.com/api/app";

axios.defaults.baseURL = baseUrl;

axios.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const { _token } = parseCookies();
    if (_token) {
      config.headers.Authorization = `Bearer ${_token}`;
    }
  }
  return config;
});

export default axios;
