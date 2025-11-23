import { apiClient } from "./apiClient";
export const createEmployee = (data) =>
  apiClient("/api/employees/create", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const getEmployees = async () => {
  const res = await apiClient(`/api/employees`, { method: "GET" });
  return res.employees;
};

export const getEmployee = async (id) =>
  await apiClient(`/api/employees/${id}`, { method: "GET" });

export const updateEmployee = (id, data) =>
  apiClient(`/api/employees/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });

export const deleteEmployee = (id) =>
  apiClient(`/api/employees/${id}`, {
    method: "DELETE",
  });
