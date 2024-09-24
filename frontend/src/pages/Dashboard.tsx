import { Appbar } from "@/components/Appbar";
import { Balance } from "@/components/Balance";
import { SpecialOffer } from "@/components/SpecialOffer";
import { Users } from "@/components/Users";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signup");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Appbar />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Balance />
          <SpecialOffer />
        </div>
        <Users />
      </main>
    </div>
  );
};
