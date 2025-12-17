import axios from "axios";
import { getToken } from "../utils/auth";

// const api = axios.create({ baseURL: "/api" });
// const api = axios.create({
//   baseURL: "/api",
// });


const api = axios.create({
  baseURL: import.meta.env.PROD
    ? import.meta.env.VITE_BACKEND_URL + "/api"
    : "/api",
});

api.interceptors.request.use((config) => {
  const token = getToken();
    if (!token) {
    console.log("❌ NO TOKEN");
  } else {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// export const fetchTasks = () =>
//   api.get("/tasks").then((res) => res.data);
export const fetchTasks = async () => {
  const res = await api.get("/tasks");
  return res.data; // MUST be array
};

export const createTask = (data: any) =>
  api.post("/tasks", data).then((res) => res.data);

export const updateTask = ({ id, data }: any) =>
  api.put(`/tasks/${id}`, data).then((res) => res.data);

export const deleteTask = (id: string) =>
  api.delete(`/tasks/${id}`);
