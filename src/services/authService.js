import axios from "axios";

const API = "https://supplysync-ai-backend-1.onrender.com/api/auth";

// =======================
// LOGIN
// =======================

export const login = async (email, password) => {

  const response = await axios.post(`${API}/login`, {
    email,
    password,
  });

  return response.data;
};

// =======================
// REGISTER
// =======================

export const register = async (userData) => {

  const response = await axios.post(`${API}/register`, userData);

  return response.data;
};