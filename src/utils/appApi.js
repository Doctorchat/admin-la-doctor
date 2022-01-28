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
    get: (params) => axiosInstance.get("/admin/chats/all", { params: { ...params } }),
    getById: (id) => axiosInstance.get(`/admin/chats/${id}`),
    getMessages: (id) => axiosInstance.get(`/admin/chats/${id}/messages`),
    changeDoctor: ({ doctor_id, id }) =>
      axiosInstance.put("/admin/chats/reassign", { doctor_id, id }),
    closeChat: (id) => axiosInstance.put(`/admin/chats/close/${id}`),
    last10: (id) => axiosInstance.get(`/admin/chats/latest10/${id}`),
  },
  reviews: {
    get: (params) => axiosInstance.get("/admin/reviews/all", { params: { ...params } }),
  },
  doctors: {
    get: (params) => axiosInstance.get("/admin/users/doctors/", { params: { ...params } }),
    getById: (id) => axiosInstance.get(`/admin/users/doctors/${id}`),
    getReviews: (id) => axiosInstance.get(`/admin/reviews/all/${id}`),
    getRequests: () => axiosInstance.get("/admin/users/doctors/requests"),
    update: (data) => axiosInstance.put(`/admin/users/doctors/update`, data),
    requestsCount: () => axiosInstance.get("/admin/users/doctors/requests-count"),
  },
  users: {
    get: (params) => axiosInstance.get("/admin/users/clients", { params: { ...params } }),
    getById: (id) => axiosInstance.get(`/admin/users/clients/${id}`),
  },
  settings: {
    get: () => axiosInstance.get("/admin/settings/edit"),
  },
  bootstrap: {
    simplifiedDoctors: () => axiosInstance.get("/admin/users/doctors/simplify"),
    categories: () => axiosInstance.get("/specialities"),
  },
  stats: {
    getCharts: () => axiosInstance.get("/admin/statistics"),
  },
  promocodes: {
    get: () => axiosInstance.get("/promocodes"),
    create: (data) => axiosInstance.post("/promocodes/", data),
    update: (data) => axiosInstance.put("/promocodes/", data),
    delete: (id) => axiosInstance.delete(`/promocodes/${id}`),
  },
};

export default api;
