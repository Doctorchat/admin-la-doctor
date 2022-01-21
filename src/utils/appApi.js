import axiosInstance from "./apiConfig";

const api = {
  user: {
    login: (data) => axiosInstance.post("/auth/login", data),
    logout: () => axiosInstance.post("/auth/logout"),
    get: () => axiosInstance.get("/user"),
    update: (userId, data) => axiosInstance.put(`/admin/users/${userId}`, data),
    store: (config) => axiosInstance.post("admin/users/", config),
  },
  chats: {
    get: (params) => axiosInstance.get("/admin/users/all", { params: { ...params } }),
  },
  reviews: {
    get: (params) => axiosInstance.get("/admin/reviews/all", { params: { ...params } }),
  },
  doctors: {
    get: (params) => axiosInstance.get("/admin/users/doctors", { params: { ...params } }),
  },
  users: {
    get: (params) => axiosInstance.get("/admin/users/clients", { params: { ...params } }),
  },
};

export default api;
