import { Routes, BrowserRouter, Route, Navigate } from "react-router-dom";
import { SignIn } from "./pages/Signin";
import { Dashboard } from "./pages/Dashboard";
import { SendMoney } from "./pages/SendMoney";
import { SignUp } from "./pages/Signup";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/signin" element={<SignIn />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/send" element={<SendMoney />}></Route>
        <Route path="/" element={<Navigate to="/signup" />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
