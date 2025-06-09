const { axios } = require("axios");
const API = axios.create({
  baseURL: "http://localhost:4000/api"});


// Automatically attach JWT token to requests
//Before every request sent using API, Axios will automatically run this function.
//local storage is browser storage that allows you to store data in key-value pairs.
//So, whenAxios is called, it will automatically call the interceptors
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token"); 
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});


// Signup user
export const signup = (formData) => API.post("/auth/signup", formData);

// Login user
export const login = (formData) => API.post("/auth/login", formData);



// Create a new task
export const createTask = (taskData) => API.post("/task/create", taskData);

// Get a single task (by title or filter criteria)
export const getTask = (queryParams) => API.get("/task/getTask", { params: queryParams });

// Get all tasks for the user
export const getAllTasks = () => API.get("/task/getAllTasks");

// Update a task
export const updateTask = (taskData) => API.put("/task/updateTask", taskData);

// Delete a task
export const deleteTask = (taskData) => API.delete("/task/deleteTask", { data: taskData });