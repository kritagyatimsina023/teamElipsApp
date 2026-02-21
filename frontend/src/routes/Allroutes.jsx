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
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Toast from "../components/UI/Toast";
import { logout } from "../store/slices/UserSlices";

const Allroutes = () => {
  const [users, setUser] = useState(null);
  const user = useSelector((state) => state.user);
  console.log(user, "this is user");
  const [toast, setToast] = useState(null);
  const dispatch = useDispatch();
  //   console.log(data);

  const handleLogout = async () => {
    try {
      const res = await axios.post("http://localhost:3000/api/auth/logout");
      console.log(res);
      dispatch(logout());
      setToast(res, "success");
    } catch (error) {
      console.error("Error in logout", error);
      setToast(error, "error");
    }
  };
  return (
    // <Layout user={user} onLogout={handleLogout}>
    //   <Routes>
    //     <Route path="/" element={<HomePage />} />
    //     <Route
    //       path="/login"
    //       element={
    //         user ? (
    //           <Navigate
    //             to={user.role === "admin" ? "/admin" : "/dashboard"}
    //             replace
    //           />
    //         ) : (
    //           <LoginPage setUser={setUser} />
    //         )
    //       }
    //     />
    //     <Route
    //       path="/signup"
    //       element={
    //         user ? (
    //           <Navigate
    //             to={user.role === "admin" ? "/admin" : "/dashboard"}
    //             replace
    //           />
    //         ) : (
    //           <SignUpPage />
    //         )
    //       }
    //     />
    //     <Route
    //       path="/admin"
    //       element={
    //         <ProtectedRoute user={user} requiredRole="admin">
    //           <AdminDashboard user={user} />
    //         </ProtectedRoute>
    //       }
    //     />
    //     <Route
    //       path="/dashboard"
    //       element={
    //         <ProtectedRoute user={user}>
    //           <StudentDashBoard user={user} />
    //         </ProtectedRoute>
    //       }
    //     />
    //     <Route path="*" element={<Navigate to="/" replace />} />
    //   </Routes>
    // </Layout>
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
      {toast && <Toast message={toast.msg} type={toast.type} />}
    </Layout>
  );
};

export default Allroutes;
