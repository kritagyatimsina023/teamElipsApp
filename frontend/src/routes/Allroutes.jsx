import React from "react";
import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "../components/UI/Layout";
import HomePage from "../components/pages/HomePage";
import LoginPage from "../components/pages/LoginPage";
import ProtectedRoute from "./ProtectedRoute";
import AdminDashboard from "../components/DashBoard/AdminDashboard";
import StudentDashBoard from "../components/DashBoard/StudentDashBoard";
import SignUpPage from "../components/pages/SignUpPage";

const Allroutes = () => {
  const [user, setUser] = useState(null);

  const handleLogout = () => setUser(null);
  return (
    <Layout user={user} onLogout={handleLogout}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={
            user ? (
              <Navigate
                to={user.role === "admin" ? "/admin" : "/dashboard"}
                replace
              />
            ) : (
              <LoginPage setUser={setUser} />
            )
          }
        />
        <Route
          path="/signup"
          element={
            user ? (
              <Navigate
                to={user.role === "admin" ? "/admin" : "/dashboard"}
                replace
              />
            ) : (
              <SignUpPage />
            )
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute user={user} requiredRole="admin">
              <AdminDashboard user={user} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute user={user}>
              <StudentDashBoard user={user} />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
};

export default Allroutes;
