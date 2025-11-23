import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { assignEmployeesToTeam } from "../../api/teamsApi";
import { getEmployees } from "../../api/employeesApi";

const AssignTeam = () => {
  const { teamId } = useParams();
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    getEmployees().then((res) => {
      setEmployees(
        res.map((e) => ({
          id: e.id,
          name: `${e.first_name} ${e.last_name}`,
        }))
      );
    });
  }, []);

  const toggleSelect = (empId) => {
    setSelected((prev) =>
      prev.includes(empId)
        ? prev.filter((id) => id !== empId)
        : [...prev, empId]
    );
  };

  const handleAssign = async () => {
    await assignEmployeesToTeam(teamId, selected);
    navigate("/teams");
  };

  return (
    <div>
      <h1 className="text-xl mb-4">Assign Employees to Team</h1>

      <ul className="space-y-3">
        {employees.map((e) => (
          <li key={e.id} className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={selected.includes(e.id)}
              onChange={() => toggleSelect(e.id)}
            />
            <span>{e.name}</span>
          </li>
        ))}
      </ul>

      <button
        className="bg-green-600 text-white p-2 mt-4"
        onClick={handleAssign}
      >
        Assign
      </button>
    </div>
  );
};

export default AssignTeam;
