import { useState } from "react";
import { createEmployee } from "../../api/employeesApi";

const EmployeeCreate = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form);
    await createEmployee(form);
    alert("Employee created!");
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <input
        placeholder="First Name"
        onChange={(e) => setForm({ ...form, firstName: e.target.value })}
      />
      <input
        placeholder="Last Name"
        onChange={(e) => setForm({ ...form, lastName: e.target.value })}
      />
      <input
        placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        placeholder="Phone"
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
      />
      <button>Create</button>
    </form>
  );
};

export default EmployeeCreate;
