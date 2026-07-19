import api from "./api";

export const getWarehouses = async () => {
  const response = await api.get("/warehouses");
  return response.data;
};

export const addWarehouse = async (warehouse) => {
  const response = await api.post("/warehouses", warehouse);
  return response.data;
};

export const updateWarehouse = async (id, warehouse) => {
  const response = await api.put(`/warehouses/${id}`, warehouse);
  return response.data;
};

export const deleteWarehouse = async (id) => {
  const response = await api.delete(`/warehouses/${id}`);
  return response.data;
};