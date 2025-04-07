import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const API = axios.create({
  baseURL: BASE_URL,
});

API.interceptors.request.use((config) => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const token = storedUser?.access;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
export { BASE_URL };
