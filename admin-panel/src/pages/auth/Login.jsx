import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LockKeyhole } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === "admin@example.com" && password === "admin123") {
      localStorage.setItem("token", "fake-token");
      navigate("/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 sm:p-10 w-full max-w-md border border-gray-200">
        {/* Header */}
        <div className="flex items-center justify-center mb-6">
          <LockKeyhole size={26} className="text-[#2C498D] mr-2" />
          <h2 className="text-2xl font-bold text-[#2C498D]">JK Admin Panel</h2>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-[#2C498D] outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="admin123"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-[#2C498D] outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#2C498D] hover:bg-[#1f3668] text-white py-2 rounded-lg font-medium transition duration-200"
          >
            Sign In
          </button>
        </form>

        {/* Footer */}
        <div className="text-xs text-gray-500 text-center mt-6">
          Developed by <span className="font-semibold">Dashon Solutions</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
