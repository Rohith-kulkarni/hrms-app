import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteEmployee, getEmployees } from "../../api/employeesApi";
import { FaRegTrashCan } from "react-icons/fa6";

const EmployeeList = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    getEmployees().then((res) => {
      const formatted = res.map((e) => ({
        id: e.id,
        firstName: e.first_name,
        lastName: e.last_name,
        email: e.email,
        phone: e.phone,
      }));
      setEmployees(formatted);
    });
  }, []);

  const onEmployeeDelete = async (id) => {
    await deleteEmployee(id);
    setEmployees((prev) => prev.filter((e) => e.id !== id));
    alert("Employee deleted!");
  };

  return (
    <div>
      <h1 className="text-2xl mb-4">Employees</h1>
      <table className="w-full border">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((e) => (
            <tr key={e.id}>
              <td>
                {e.firstName} {e.lastName}
              </td>
              <td>{e.email}</td>
              <td>{e.phone}</td>
              <td>
                <FaRegTrashCan
                  className="hover: cursor-pointer"
                  onClick={() => {
                    onEmployeeDelete(e.id);
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className="bg-amber-500"
        onClick={() => navigate("/employees/create")}
      >
        +Add Employee
      </button>
    </div>
  );
};

export default EmployeeList;
