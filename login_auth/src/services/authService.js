import axios from "axios";

const API_URL =
  "https://login-att.onrender.com/api/auth";

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

export const forgotPassword = (email) => {
  return axios.post(
    `${API_URL}/forgot-password?email=${email}`
  );
};

export const verifyForgotOtp = (email, otp) => {
  return axios.post(
    `${API_URL}/verify-forgot-otp?email=${email}&otp=${otp}`
  );
};

export const resetPassword = (
  email,
  otp,
  password
) => {
  return axios.post(
    `${API_URL}/reset-password?email=${email}&otp=${otp}&password=${password}`
  );
};