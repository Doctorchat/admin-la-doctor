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
    sendMessage: (chatId, message) =>
      axiosInstance.post("/chat/send", { chat_id: chatId, content: message }),
  },
  reviews: {
    get: (params) => axiosInstance.get("/admin/reviews/all", { params: { ...params } }),
    update: (data) => axiosInstance.put("/admin/reviews/update", data),
  },
  doctors: {
    get: (params) => axiosInstance.get("/admin/users/doctors/", { params: { ...params } }),
    getById: (id) => axiosInstance.get(`/admin/users/doctors/${id}`),
    getReviews: (id) => axiosInstance.get(`/admin/reviews/all/${id}`),
    getRequests: () => axiosInstance.get("/admin/users/doctors/requests"),
    update: (data) => axiosInstance.put(`/admin/users/doctors/update`, data),
    requestsCount: () => axiosInstance.get("/admin/users/doctors/requests-count"),
    removeRequest: (id) => axiosInstance.delete(`/admin/users/doctors/delete`, { data: { id } }),
    search: (keyword) => axiosInstance.get(`/admin/users/doctors/search/${keyword}`),
  },
  users: {
    get: (params) => axiosInstance.get("/admin/users/clients", { params: { ...params } }),
    getById: (id) => axiosInstance.get(`/admin/users/clients/${id}`),
  },
  settings: {
    get: () => axiosInstance.get("/admin/settings/edit"),
    update: (data) => axiosInstance.put("/admin/settings/edit", data),
  },
  bootstrap: {
    simplifiedDoctors: () => axiosInstance.get("/admin/users/doctors/simplify"),
    categories: () => axiosInstance.get("/specialities"),
  },
  stats: {
    getCharts: () => axiosInstance.get("/admin/statistics"),
    getTransactions: () => axiosInstance.get("/admin/transactions"),
  },
  promocodes: {
    get: () => axiosInstance.get("/promocodes"),
    create: (data) => axiosInstance.post("/promocodes", data),
    update: (data) => axiosInstance.put("/promocodes", data),
    delete: (id) => axiosInstance.delete(`/promocodes`, { data: { id } }),
  },
  support: {
    get: () => axiosInstance.get("/admin/chats/support"),
    count: () => axiosInstance.get("/admin/chats/support/count"),
    sendGlobalMsg: (data) => axiosInstance.post("/chat/mass-mail", data),
  },
  logs: {
    get: () => axiosInstance.get(""),
  },
};

export default api;
