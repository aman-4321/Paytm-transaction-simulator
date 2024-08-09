import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaUserCircle } from "react-icons/fa"; // Using react-icons for a profile icon

export const Appbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  return (
    <div className="shadow-lg bg-gray-800 text-white h-14 flex justify-between items-center px-4">
      <div className="text-2xl font-bold cursor-pointer">PayTM App</div>
      <div className="flex items-center space-x-4">
        <div className="text-lg">Hello</div>
        <div
          className="relative flex items-center justify-center rounded-full h-12 w-12 bg-gray-600 hover:bg-gray-500 cursor-pointer transition-colors duration-300"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <FaUserCircle size={28} />
          {isDropdownOpen && (
            <div className="absolute top-14 right-0 bg-white text-black border border-gray-200 rounded-lg shadow-lg w-32">
              <button
                onClick={handleLogout}
                className="block px-4 py-2 hover:bg-gray-100 w-full text-left rounded-lg transition-colors duration-300"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
