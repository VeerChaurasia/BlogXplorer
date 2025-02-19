import { Routes, Route } from "react-router-dom";
import Home from "../src/components/Home";
import Register from "../src/components/Register";
import Login from "../src/components/Login";  // Make sure you have a Login.tsx file

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
