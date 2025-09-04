import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminPanel from "./pages/Adminpanel";
import ComplaintsSubmit from "./pages/Complainsubmit";
import { getToken, getRole } from "./utils/auth";

const ProtectedRoute = ({ children, role }) => {
  const token = getToken();
  const userRole = getRole();
  if (!token) return <Navigate to="/login" replace />;
  if (role && role !== userRole) return <Navigate to="/" replace />;
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to={getToken() ? (getRole() === "admin" ? "/admin" : "/complaints") : "/login"} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup onBack={() => window.location.href="/login"} />} />
        <Route path="/admin" element={<ProtectedRoute role="admin"><AdminPanel /></ProtectedRoute>} />
        <Route path="/complaints" element={<ProtectedRoute role="complainer"><ComplaintsSubmit /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
