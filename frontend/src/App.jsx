// src/App.jsx
import React from "react";
import {
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";
import SidebarLayout from "./components/SidebarLayout";

// Public pages
import Login from "./pages/Login";
import Signup from "./pages/Signup";

// Protected pages (inside sidebar layout)
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import Profile from "./pages/Profile";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">

      <Routes>
        {/* DEFAULT → /login */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* PUBLIC ROUTES */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* PROTECTED ROUTES WRAPPED IN SIDEBAR */}
        <Route
          path="/app"
          element={
            <ProtectedRoute>
              <SidebarLayout>
                <Outlet />
              </SidebarLayout>
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        {/* FALLBACK */}
        <Route
          path="*"
          element={
            <div className="p-10 text-center text-xl font-medium">
              404 — Page Not Found
            </div>
          }
        />
      </Routes>
    </div>
  );
}
