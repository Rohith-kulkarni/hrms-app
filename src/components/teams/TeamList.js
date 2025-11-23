import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getTeams,
  deleteTeam,
  unassignEmployeesFromTeam,
} from "../../api/teamsApi";

const TeamList = () => {
  const [teams, setTeams] = useState([]);
  const navigate = useNavigate();

  const loadTeams = () => {
    getTeams().then((res) => setTeams(res));
  };

  const onUnassign = async (teamId, employeeId) => {
    await unassignEmployeesFromTeam(teamId, [employeeId]);

    // Update UI locally (no reload needed)
    setTeams((prev) =>
      prev.map((team) =>
        team.id === teamId
          ? {
              ...team,
              employees: team.employees.filter((e) => e.id !== employeeId),
            }
          : team
      )
    );
    alert("Employee(s) removed from team");
  };

  useEffect(() => {
    loadTeams();
  }, []);

  const onDelete = async (id) => {
    await deleteTeam(id);
    loadTeams();
  };

  return (
    <div>
      <h1 className="text-2xl mb-4">Teams</h1>

      <table className="w-full border">
        <thead>
          <tr>
            <th>Team Name</th>
            <th>Employees</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team) => (
            <tr key={team.id} className="border-b">
              <td className="p-2 font-semibold">{team.name}</td>

              {/* EMPLOYEE DETAILS */}
              <td className="p-2">
                {team.employees?.length === 0 ? (
                  <span className="text-gray-500">No employees</span>
                ) : (
                  <ul className="space-y-1">
                    {team.employees.map((e) => (
                      <li
                        key={e.id}
                        className="border p-2 rounded bg-gray-50 flex justify-between items-center"
                      >
                        <div>
                          <div className="font-medium">
                            {e.first_name} {e.last_name}
                          </div>
                          <div className="text-sm text-gray-600">{e.email}</div>
                          <div className="text-sm text-gray-600">{e.phone}</div>
                        </div>
                        <button
                          className="text-red-600 ml-4"
                          onClick={() => {
                            onUnassign(team.id, e.id);
                          }}
                        >
                          Unassign
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </td>
              <td className="space-x-4 p-2">
                <button
                  onClick={() => navigate(`/teams/edit/${team.id}`)}
                  className="text-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => navigate(`/teams/assign/${team.id}`)}
                  className="text-green-600"
                >
                  Assign
                </button>
                <button
                  onClick={() => {
                    onDelete(team.id);
                    alert(`Team ${team.name} deleted!`);
                  }}
                  className="text-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        className="bg-amber-500 mt-4 p-2"
        onClick={() => navigate("/teams/create")}
      >
        + Add Team
      </button>
    </div>
  );
};

export default TeamList;
