import React from "react";
import { useNavigate } from "react-router-dom";

const App = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-sky-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-8">
        <h1 className="text-4xl font-bold text-blue-900 mb-4 text-center">
          School Portal
        </h1>
        <div className="flex flex-col gap-4">
          <button
            onClick={() => navigate("/enrollment")}
            className="bg-sky-500 hover:bg-sky-600 text-white font-semibold px-6 py-3 rounded-lg shadow transition"
          >
            Enrollment Page
          </button>

          <button
            onClick={() => navigate("/login")}
            className="bg-blue-900 hover:bg-blue-800 text-white font-semibold px-6 py-3 rounded-lg shadow transition"
          >
            Staff Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
