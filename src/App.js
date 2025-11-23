import { Routes, Route } from "react-router-dom";

import PublicRoute from "./common/PublicRoute";
import ProtectedRoute from "./common/ProtectedRoute";

import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";

import EmployeeList from "./components/employees/EmployeeList";
import EmployeeCreate from "./components/employees/EmployeeCreate";

import TeamList from "./components/teams/TeamList";
import CreateTeam from "./components/teams/CreateTeam";
import EditTeam from "./components/teams/EditTeam";
import AssignTeam from "./components/teams/AssignTeam";

function App() {
  return (
    <Routes>
      {/* PUBLIC ROUTES */}
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>

      {/* PRIVATE ROUTES */}
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Dashboard />} />

        {/* Employees */}
        <Route path="/employees" element={<EmployeeList />} />
        <Route path="/employees/create" element={<EmployeeCreate />} />

        {/* Teams */}
        <Route path="/teams" element={<TeamList />} />
        <Route path="/teams/create" element={<CreateTeam />} />
        <Route path="/teams/edit/:id" element={<EditTeam />} />
        <Route path="/teams/assign/:teamId" element={<AssignTeam />} />
      </Route>
    </Routes>
  );
}

export default App;
