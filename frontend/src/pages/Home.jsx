import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";  
import { useNavigate } from "react-router-dom";
import GroupCard from "../components/GroupCard";

export default function Home() {
    const [groups, setGroups] = useState([]);
    const [name, setName] = useState("");
    const navigate = useNavigate();

    const fetchGroups = async () => {
        try {
    const res = await API.get("/groups");
    setGroups(res.data);
  } catch (err) {
    console.error("Fetch Groups Error:", err.response?.data || err.message);
  }
};
    const createGroup = async () => {
       try {
    if (!name.trim()) return;

    await API.post("/groups", { name });
    setName("");
    fetchGroups();
  } catch (err) {
    console.error("Create Group Error:", err.response?.data || err.message);
  }
};
    useEffect(() => {
        fetchGroups();
    }, []);
    return (
        <div className="bg-gray-100 min-h-screen">
            <Navbar />
            <div className="container mx-auto py-8">
                <div className="mb-4">
                    <input
                    className="border p-3 rounded w-full"
                    placeholder="Group name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    />
                    <button
                    className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
                    onClick={createGroup}
                    >
                    Create Group
                    </button>
                </div>
                  {groups.length === 0 && (
          <p className="text-gray-500 text-center mt-6">
            No groups yet. Create one 🚀
          </p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {groups.map((group) => (
            <GroupCard
              key={group.id}
              group={group}
              onClick={() => navigate(`/group/${group.id}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}