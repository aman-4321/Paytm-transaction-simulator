import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import { SpecialOffer } from "../components/SpecialOffer";

export const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/signup");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-200">
      <Appbar />
      <div className="pt-16 px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 bg-blue-50 rounded-lg shadow-lg border border-blue-200">
            <Balance />
          </div>
          <div className="p-6 bg-blue-50 rounded-lg shadow-lg border border-blue-200">
            <Users />
          </div>
        </div>
      </div>
      <div className="mt-8 px-8">
        <SpecialOffer />
      </div>
    </div>
  );
};
