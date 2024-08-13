import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";

export const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/signin`,
        {
          username: email,
          password: password,
        },
      );
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (error) {
      setError("Failed to sign in. Please check your credentials.");
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-400 to-slate-300 h-screen flex justify-center items-center">
      <div className="bg-white shadow-lg rounded-lg w-96 p-6">
        <Heading label="Sign in" />
        <SubHeading label="Enter your credentials to access your account" />
        <form onSubmit={handleSubmit} className="flex flex-col">
          <InputBox
            placeholder="JohnDoe@gmail.com"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputBox
            placeholder="123456"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
          <div className="pt-6">
            <Button label="Sign in" type="submit" />
          </div>
        </form>
        <BottomWarning
          label="Don't have an account?"
          buttonText="Sign up"
          to="/signup"
        />
      </div>
    </div>
  );
};
