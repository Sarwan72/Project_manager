import axios from "axios";
import { getToken } from "../utils/auth";

const api = axios.create({ baseURL: "/api" });

api.interceptors.request.use((config) => {
  const token = getToken();
    if (!token) {
    console.log("❌ NO TOKEN");
  } else {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const fetchTasks = () =>
  api.get("/tasks").then((res) => res.data);

export const createTask = (data: any) =>
  api.post("/tasks", data).then((res) => res.data);

export const updateTask = ({ id, data }: any) =>
  api.put(`/tasks/${id}`, data).then((res) => res.data);

export const deleteTask = (id: string) =>
  api.delete(`/tasks/${id}`);
