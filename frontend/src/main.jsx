import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Login from "./pages/Login";
import Enrollment from "./pages/Enrollment";
import Dashboard from "./pages/Dashboard";
import "./index.css";
import ProtectedRoute from "./components/ProtectedRoute";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
<Routes>
  <Route path="/" element={<App />} />
  <Route path="/login" element={<Login />} />
  <Route path="/enrollment" element={<Enrollment />} />
  <Route
    path="/dashboard"
    element={
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    }
  />
</Routes>
    </BrowserRouter>
  </React.StrictMode>
);
