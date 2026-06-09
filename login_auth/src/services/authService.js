import axios from "axios";

const API_URL =
  "http://localhost:8081/api/auth";

export const register = (user) => {
  return axios.post(
    `${API_URL}/register`,
    user
  );
};

export const login = (user) => {
  return axios.post(
    `${API_URL}/login`,
    user
  );
};

export const forgotPassword = (
  email
) => {
  return axios.post(
    `${API_URL}/forgot-password?email=${email}`
  );
};

export const resetPassword = (
  token,
  password
) => {
  return axios.post(
    `${API_URL}/reset-password/${token}?password=${password}`
  );
};