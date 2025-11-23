import { apiClient } from "./apiClient";

export const loginApi = (data) =>
  apiClient("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const signupApi = (data) =>
  apiClient("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify(data),
  });
