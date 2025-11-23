import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTeams, updateTeam } from "../../api/teamsApi";

const EditTeam = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [team, setTeam] = useState(null);
  const [name, setName] = useState("");

  useEffect(() => {
    getTeams().then((res) => {
      const t = res.find((item) => item.id === Number(id));
      setTeam(t);
      setName(t.name);
    });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateTeam(id, { name });
    navigate("/teams");
  };

  if (!team) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-xl mb-4">Edit Team</h1>

      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <input
          type="text"
          className="border p-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button className="bg-blue-600 text-white p-2">Save</button>
      </form>
    </div>
  );
};

export default EditTeam;
