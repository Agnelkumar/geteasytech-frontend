import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
});

// attach token from localStorage key "token"
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auth
export const login = (data) => API.post("/users/login", data);

// User management
export const registerStateAdmin = (data) =>
  API.post("/users/register-state-admin", data);
export const registerUser = (data) => API.post("/users/register", data);
export const getUsersByState = (state) => API.get(`/users/users-by-state?state=${state}`);
export const getAllUsers = () => axios.get(`${process.env.REACT_APP_API_URL}/users/all`);


// Products
export const getProducts = () => API.get("/products");
export const createProduct = (data) => API.post("/products", data);
export const updateProduct = (id, data) => API.put(`/products/${id}`, data);
export const deleteProduct = (id) => API.delete(`/products/${id}`);

export default API;
