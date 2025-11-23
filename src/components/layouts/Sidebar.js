import { Link } from "react-router-dom";

const Sidebar = () => (
  <div className="w-60 p-4 bg-gray-800 text-white h-full">
    <h2 className="text-xl mb-4 font-bold">HRMS</h2>
    <nav className="flex flex-col gap-3">
      <Link to="/">Dashboard</Link>
      <Link to="/employees">Employees</Link>
      <Link to="/teams">Teams</Link>
    </nav>
  </div>
);

export default Sidebar;
