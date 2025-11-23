import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [organisationName, setOrganisationName] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMsg, setErrorMsg] = useState("");

  const onFormSubmit = async (event) => {
    event.preventDefault();
    setErrorMsg("");

    const userDetails = {
      organisationName,
      name,
      email,
      password,
    };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/auth/signup`,
        { method: "POST" },
        userDetails
      );

      const data = await response.json();

      localStorage.setItem("token", data.token);
      localStorage.setItem("organisationId", data.user.organisationId);

      navigate("/");
    } catch (error) {
      const msg = error.response?.data?.error || "Something went wrong";
      setErrorMsg(msg);
    }
  };

  return (
    <div className="flex flex-col w-screen h-screen justify-center items-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold mb-4 text-center">Sign Up</h2>

        {errorMsg && (
          <p className="text-red-500 text-center mb-3">{errorMsg}</p>
        )}

        <form className="flex flex-col gap-4" onSubmit={onFormSubmit}>
          <div className="flex flex-col gap-1">
            <label htmlFor="organisationName" className="font-medium text-sm">
              Organisation Name
            </label>
            <input
              id="organisationName"
              type="text"
              className="border p-2 rounded"
              value={organisationName}
              onChange={(e) => setOrganisationName(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="userName" className="font-medium text-sm">
              Name
            </label>
            <input
              id="userName"
              type="text"
              className="border p-2 rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="userEmail" className="font-medium text-sm">
              Email
            </label>
            <input
              id="userEmail"
              type="email"
              className="border p-2 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="userPassword" className="font-medium text-sm">
              Password
            </label>
            <input
              id="userPassword"
              type="password"
              className="border p-2 rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
