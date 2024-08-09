import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/user/signup",
        {
          username,
          firstName,
          lastName,
          password,
        },
      );
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (error) {
      setError("Failed to sign up. Please try again.");
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-400 to-slate-300 h-screen flex justify-center items-center">
      <div className="bg-white rounded-lg w-full max-w-md p-6 shadow-md">
        <Heading label={"Sign up"} />
        <SubHeading label={"Enter your information to create an account"} />
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputBox
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="John"
            label="First Name"
            value={firstName}
          />
          <InputBox
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Doe"
            label="Last Name"
            value={lastName}
          />
          <InputBox
            onChange={(e) => setUsername(e.target.value)}
            placeholder="JohnDoe@gmail.com"
            label="Email"
            value={username}
          />
          <InputBox
            onChange={(e) => setPassword(e.target.value)}
            placeholder="123456"
            label="Password"
            type="password"
            value={password}
          />
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <Button label="Sign up" type="submit" />
        </form>
        <BottomWarning
          label="Already have an account?"
          buttonText="Sign in"
          to="/signin"
        />
      </div>
    </div>
  );
};
