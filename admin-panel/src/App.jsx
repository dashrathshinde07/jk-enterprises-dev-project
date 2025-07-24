import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-gray-800">
        {/* Global App Layout */}
        <header className="bg-[#2C498D] text-white p-4 shadow-md">
          <h1 className="text-xl font-bold">JK Admin Panel</h1>
        </header>

        <main className="p-4">
          <AppRoutes />
        </main>
      </div>
    </Router>
  );
}

export default App;
