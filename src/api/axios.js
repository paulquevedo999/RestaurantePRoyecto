import axios from "axios";


const api = axios.create({
  baseURL: "https://factecu2021.herokuapp.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// INTERCEPTOR DE REQUEST
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = token;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// INTERCEPTOR DE RESPONSE
api.interceptors.response.use(
  (response) => response,

  (error) => {
    const status = error.response?.status;

    console.log("Error HTTP:", status);

    if (status === 401 || status === 423 || status === 404) {
     
      localStorage.removeItem("token");
      

      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;