import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
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
