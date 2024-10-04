import axios from "axios";
import { getTokenfromSessionStorage } from "../helpers/storage";

const api = axios.create({
  baseURL: import.meta.env.VITE_URL,
});

api.interceptors.request.use(
  function (config) {
    const token = getTokenfromSessionStorage();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default api;
