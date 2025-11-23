import { apiClient } from "./apiClient.js";

// GET all teams
export const getTeams = async () => {
  const res = await apiClient("/api/teams");
  return res.teams; // backend returns { teams: [...] }
};

// CREATE team
export const createTeam = async (data) => {
  return await apiClient("/api/teams", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// UPDATE team
export const updateTeam = async (id, data) => {
  return apiClient(`/api/teams/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

// DELETE team
export const deleteTeam = async (id) => {
  return apiClient(`/api/teams/${id}`, {
    method: "DELETE",
  });
};

// ASSIGN employees to team
export const assignEmployeesToTeam = async (teamId, employeeIds) => {
  return apiClient(`/api/teams/${teamId}/assign`, {
    method: "POST",
    body: JSON.stringify({ employeeIds }),
  });
};

// UNASSIGN employees from team
export const unassignEmployeesFromTeam = async (teamId, employeeIds) => {
  return apiClient(`/api/teams/${teamId}/unassign`, {
    method: "DELETE",
    body: JSON.stringify({ employeeIds }),
  });
};
