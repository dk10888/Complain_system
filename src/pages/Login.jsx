import React, { useState } from "react";
import axios from "axios";
import Signup from "./Signup";
import { setToken, setRole } from "../utils/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSignup, setShowSignup] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Make API call to backend
      const res = await axios.post("http://localhost:3000/api/auth/login", { email, password });

      // Store token and role
      setToken(res.data.token);
      setRole(res.data.user.isAdmin ? "admin" : "complainer");

      // Redirect based on role
      if (res.data.user.isAdmin) {
        window.location.href = "/admin";
      } else {
        window.location.href = "/complaints";
      }
    } catch (err) {
      // Show detailed error from backend
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Login failed. Please try again.");
      }
    }
  };

  if (showSignup) return <Signup onBack={() => setShowSignup(false)} />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow-md w-96 space-y-5">
        <h1 className="text-2xl font-bold text-center">Login</h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
        />

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>

        <p className="text-center text-sm">
          Don't have an account?{" "}
          <span
            onClick={() => setShowSignup(true)}
            className="text-blue-600 cursor-pointer hover:underline"
          >
            Sign Up
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
