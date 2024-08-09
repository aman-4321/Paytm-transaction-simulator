import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

export const SendMoney = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const [amount, setAmount] = useState("");
  const [balance, setBalance] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/account/balance", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setBalance(response.data.balance);
      })
      .catch((error) => {
        console.error("Error while fetching balance", error);
      });
  }, []);

  const initiateTransfer = () => {
    if (balance !== null && parseFloat(amount) > balance) {
      alert("You don't have enough money to make the transfer.");
    } else {
      axios
        .post(
          "http://localhost:3000/api/v1/account/transfer",
          {
            to: id,
            amount: parseFloat(amount),
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          },
        )
        .then((response) => {
          alert("Transfer was successful!");
          navigate("/dashboard");
        })
        .catch((error) => {
          console.error("Error during the transfer:", error);
          alert("An error occurred while processing the transfer.");
        });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-400 to-slate-300 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Send Money
        </h2>
        <div className="flex items-center justify-center mb-6">
          <div className="w-16 h-16 bg-blue-600 text-white text-2xl font-bold rounded-full flex items-center justify-center">
            {name ? name[0].toUpperCase() : ""}
          </div>
          <h3 className="text-2xl font-semibold text-gray-800 ml-4">{name}</h3>
        </div>
        <div className="space-y-4">
          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="amount"
            >
              Amount (in Rs)
            </label>
            <input
              onChange={(e) => setAmount(e.target.value)}
              type="number"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              id="amount"
              placeholder="Enter amount"
            />
          </div>
          <button
            onClick={initiateTransfer}
            className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Initiate Transfer
          </button>
        </div>
      </div>
    </div>
  );
};
