import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
        "Content-Type": "application/json",
        "App-Key": "4f7d8e1a2b3c9d5e6f7a8b9c0d1e2f3a4b5BEA3E3A3MELHORd7e8f9a0b1c2d3e4f5a6cnnconn"
    }})

// api.interceptors.request.use(config => {
//     const userEmail = localStorage.getItem("userEmail");
//     if (userEmail) {
//         config.params = { ...config.params, email: userEmail };
//     }
//     return config;
// });

export default api;