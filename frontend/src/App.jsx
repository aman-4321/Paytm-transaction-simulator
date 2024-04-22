import { useState } from "react";
import "./App.css";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import { Signup } from "./pages/Signup";
function App() {
  <BrowserRouter>
    <Routes>
      <Route path="/signup" element={<Signup />}></Route>
      <Route path="/signin" element={<Sign />}></Route>
      <Route path="/dashboard" element={<dashboard />}></Route>
      <Route path="/send" element={<SendMoney />}></Route>
    </Routes>
  </BrowserRouter>;
}

export default App;
