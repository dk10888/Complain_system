import React, { useState } from "react";
import axios from "axios";

const Signup = ({ onBack }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("complainer");
  const [adminKey, setAdminKey] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      // Prepare payload
      const payload = { username, email, password, role };
      if (role === "admin") payload.adminKey = adminKey;

      // Send request to backend
      const res = await axios.post("http://localhost:5000/api/auth/signup", payload);

      setSuccess("Signup successful! Please login.");
      setUsername(""); 
      setEmail(""); 
      setPassword(""); 
      setAdminKey("");
    } catch (err) {
      console.error("Signup error:", err.response?.data);
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSignup} className="bg-white p-8 rounded-xl shadow-md w-96 space-y-5">
        <h1 className="text-2xl font-bold text-center">Sign Up</h1>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
        />

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

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
        >
          <option value="complainer">Complainer</option>
          <option value="admin">Admin</option>
        </select>

        {role === "admin" && (
          <input
            type="text"
            placeholder="Admin Key"
            value={adminKey}
            onChange={(e) => setAdminKey(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
          />
        )}

        {error && <p className="text-red-600 text-sm">{error}</p>}
        {success && <p className="text-green-600 text-sm">{success}</p>}

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          Sign Up
        </button>

        <p className="text-center text-sm">
          Already have an account?{" "}
          <span onClick={onBack} className="text-blue-600 cursor-pointer hover:underline">
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Signup;
