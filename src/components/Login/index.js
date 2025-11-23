import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setUserPassword] = useState("");
  const navigate = useNavigate();

  const onFormSubmit = async (event) => {
    event.preventDefault();

    const userDetails = { email, password };

    try {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userDetails),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        console.error(data.error || "Login failed");
        return;
      }

      // Extract token & orgId correctly
      const token = data.token;
      const orgId = data.user.organisationId;

      // Store in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("organisationId", orgId);

      console.log("Stored Org ID:", orgId);
      navigate("/");
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div className="flex w-screen h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-200 px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Login
        </h1>

        <form className="flex flex-col gap-5" onSubmit={onFormSubmit}>
          <div className="flex flex-col gap-1">
            <label
              htmlFor="userEmail"
              className="text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <input
              id="userEmail"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent shadow-sm"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="userPassword"
              className="text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              id="userPassword"
              type="password"
              value={password}
              onChange={(e) => setUserPassword(e.target.value)}
              className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent shadow-sm"
            />
          </div>

          <button
            type="submit"
            className="mt-2 bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-all duration-200 shadow-md"
          >
            Login
          </button>
        </form>

        <div className="flex justify-center gap-2 mt-5 text-sm">
          <p className="text-gray-600">Not registered?</p>
          <a
            href="/signup"
            className="text-indigo-600 font-medium hover:underline"
          >
            Signup
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
