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
    <div className="flex flex-col w-screen h-screen justify-center items-center">
      <div className="flex flex-col">
        <form className="flex flex-col gap-4" onSubmit={onFormSubmit}>
          <div className="flex flex-col gap-3">
            <label htmlFor="userEmail">Email:</label>
            <input
              id="userEmail"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-3">
            <label htmlFor="userPassword">Password:</label>
            <input
              id="userPassword"
              type="password"
              value={password}
              onChange={(e) => setUserPassword(e.target.value)}
            />
          </div>

          <button type="submit">Login</button>
        </form>

        <div className="flex flex-row">
          <p className="text-pretty">Not registered? </p>
          <a href="/signup">Signup</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
