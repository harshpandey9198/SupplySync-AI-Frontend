import api from "./api";

export const getInventory = async () => {
  const response = await api.get("/inventory");
  return response.data;
};

export const getLowStock = async () => {
  const response = await api.get("/inventory/low-stock");
  return response.data;
};

export const stockIn = async (id, quantity) => {
  const response = await api.post(
    `/inventory/${id}/stock-in?quantity=${quantity}`
  );
  return response.data;
};

export const stockOut = async (id, quantity) => {
  const response = await api.post(
    `/inventory/${id}/stock-out?quantity=${quantity}`
  );
  return response.data;
};