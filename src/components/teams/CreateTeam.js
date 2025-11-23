import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTeam } from "../../api/teamsApi";

const CreateTeam = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createTeam({ name });
    navigate("/teams");
  };

  return (
    <div>
      <h1 className="text-xl mb-4">Create Team</h1>

      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <input
          type="text"
          placeholder="Team Name"
          className="border p-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button className="bg-blue-600 p-2 text-white">Create</button>
      </form>
    </div>
  );
};

export default CreateTeam;
