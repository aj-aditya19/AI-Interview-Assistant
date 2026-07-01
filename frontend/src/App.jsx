import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext.jsx";

import AuthPage from "./pages/auth/AuthPage.jsx";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage.jsx";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import InterviewSetupPage from "./pages/interview/InterviewSetupPage.jsx";
import InterviewLivePage from "./pages/interview/InterviewLivePage.jsx";
import InterviewResultPage from "./pages/interview/InterviewResultPage.jsx";
import InterviewHistoryPage from "./pages/interview/InterviewHistoryPage.jsx";
import PPDTSetupPage from "./pages/ppdt/PPDTSetupPage.jsx";
import PPDTLivePage from "./pages/ppdt/PPDTLivePage.jsx";
import PPDTResultPage from "./pages/ppdt/PPDTResultPage.jsx";
import AdminLoginPage from "./pages/admin/AdminLoginPage.jsx";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage.jsx";

function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading)
    return (
      <div
        className="page-wrapper flex items-center justify-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="spinner" />
      </div>
    );
  return user ? children : <Navigate to="/auth" replace />;
}

function AdminRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading)
    return (
      <div
        className="page-wrapper flex items-center justify-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="spinner" />
      </div>
    );
  if (!user) return <Navigate to="/admin/login" replace />;
  if (user.role !== "admin") return <Navigate to="/home" replace />;
  return children;
}

function PublicRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  return user ? <Navigate to="/home" replace /> : children;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/auth" replace />} />
      <Route
        path="/auth"
        element={
          <PublicRoute>
            <AuthPage />
          </PublicRoute>
        }
      />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password/:token" element={<ResetPasswordPage />} />

      <Route
        path="/home"
        element={
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        }
      />
      <Route
        path="/interview/setup"
        element={
          <PrivateRoute>
            <InterviewSetupPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/interview/live"
        element={
          <PrivateRoute>
            <InterviewLivePage />
          </PrivateRoute>
        }
      />
      <Route
        path="/interview/result"
        element={
          <PrivateRoute>
            <InterviewResultPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/interview/history"
        element={
          <PrivateRoute>
            <InterviewHistoryPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/ppdt/setup"
        element={
          <PrivateRoute>
            <PPDTSetupPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/ppdt/live"
        element={
          <PrivateRoute>
            <PPDTLivePage />
          </PrivateRoute>
        }
      />
      <Route
        path="/ppdt/result"
        element={
          <PrivateRoute>
            <PPDTResultPage />
          </PrivateRoute>
        }
      />

      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route
        path="/admin/dashboard"
        element={
          <AdminRoute>
            <AdminDashboardPage />
          </AdminRoute>
        }
      />

      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}
