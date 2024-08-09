import axios from "axios";
import { useState, useEffect } from "react";

export const Balance = () => {
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBalance = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setBalance("0");
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/account/balance",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setBalance(response.data.balance);
      } catch (error) {
        console.error("Error fetching balance:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBalance();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-center">
      <div className="font-bold text-2xl text-blue-600">Your Balance</div>
      <div className="font-semibold text-3xl mt-4 text-gray-800">
        Rs {balance}
      </div>
      <div className="text-sm text-gray-500 mt-2">
        Available balance in your account
      </div>
    </div>
  );
};
