import api from "./api";

export const getDashboardStats = async () => {
  const response = await api.get("/dashboard/stats");
  return response.data;
};

export const getRecentOrders = async () => {
  const response = await api.get("/dashboard/recent-orders");
  return response.data;
};

export const getAnalytics = async () => {
  const response = await api.get("/dashboard/analytics");
  return response.data;
};
