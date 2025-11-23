import { apiClient } from "./apiClient";

export const getOrganisation = async () => {
  return apiClient("/api/organisations/:id");
};
