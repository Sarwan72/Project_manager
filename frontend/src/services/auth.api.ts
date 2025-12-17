import axios from "axios";

// const API_URL = import.meta.env.BACKEND_URL || "";


const api = axios.create({
  baseURL: import.meta.env.PROD
    ? import.meta.env.VITE_BACKEND_URL + "/api"
    : "/api",
});
export const signupApi = (data: {
  name: string;
  email: string;
  password: string;
}) => api.post("/auth/signup", data);

export const loginApi = (data: {
  email: string;
  password: string;
}) => api.post("/auth/login", data);
