import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Users = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    console.log("Fetching users with filter:", filter);
    axios
      .get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/bulk?filter=${filter}`,
      )
      .then((response) => {
        console.log("Response data:", response.data);
        setUsers(response.data.users || []);
        console.log("Users state after update:", response.data.users || []);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, [filter]);

  return (
    <div>
      <div className="font-bold mt-6 text-xl">Users</div>
      <div className="my-4">
        <input
          onChange={(e) => {
            console.log("Filter set to:", e.target.value);
            setFilter(e.target.value);
          }}
          type="text"
          placeholder="Search users..."
          className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      <div className="space-y-4">
        {users.length > 0 ? (
          users.map((user) => <User key={user._id} user={user} />)
        ) : (
          <div className="text-gray-600">No users found</div>
        )}
      </div>
    </div>
  );
};

function User({ user }) {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center">
        <div className="rounded-full h-12 w-12 bg-blue-100 flex justify-center items-center mr-4 text-blue-600 text-xl font-bold">
          {user.firstName[0]}
        </div>
        <div className="text-lg">
          {user.firstName} {user.lastName}
        </div>
      </div>

      <div>
        <button
          onClick={() => {
            navigate("/send?id=" + user._id + "&name=" + user.firstName);
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition"
        >
          Send Money
        </button>
      </div>
    </div>
  );
}
