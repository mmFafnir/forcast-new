import axios from "axios";
import { cookies } from "next/headers";
import { parseCookies } from "nookies";

axios.defaults.baseURL = "https://admin.aibetguru.com/api/app/";

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
