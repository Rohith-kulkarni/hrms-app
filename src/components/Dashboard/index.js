import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiClient } from "../../api/apiClient";

const Dashboard = () => {
  const [org, setOrg] = useState(null);
  const navigate = useNavigate();

  const orgId = localStorage.getItem("organisationId");

  useEffect(() => {
    apiClient(`/api/organisations/${orgId}`)
      .then((res) => setOrg(res.organisation))
      .catch(console.error);
    //eslint-disable-next-line
  }, []);

  if (!org) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-10 w-full">
      <div className="bg-white shadow rounded-xl p-6 mb-10">
        <h1 className="text-3xl font-bold mb-2">{org.name}</h1>
        <p className="text-gray-600">
          Welcome back! Here's the activity summary for your organisation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <button
          onClick={() => navigate("/employees/create")}
          className="bg-blue-600 text-white p-4 rounded-xl shadow hover:bg-blue-700"
        >
          + Add Employee
        </button>
        <button
          onClick={() => navigate("/employees")}
          className="bg-blue-200 text-blue-800 p-4 rounded-xl shadow hover:bg-blue-300"
        >
          View Employees
        </button>

        <button
          onClick={() => navigate("/teams/create")}
          className="bg-green-600 text-white p-4 rounded-xl shadow hover:bg-green-700"
        >
          + Add Team
        </button>

        <button
          onClick={() => navigate("/teams")}
          className="bg-green-200 text-green-800 p-4 rounded-xl shadow hover:bg-green-300"
        >
          View Teams
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
