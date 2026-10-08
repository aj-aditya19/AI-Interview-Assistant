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
import CommunicationHub from "./pages/communication/CommunicationHub.jsx";
import CommunicationPracticePage from "./pages/communication/CommunicationPracticePage.jsx";
import LandingPage from "./pages/PublicLanding.jsx";
import SSBHubPage from "./pages/ssb/SSBHubPage.jsx";
import TimedTestPage from "./pages/ssb/TimedTestPage.jsx";
import PracticeResultPage from "./pages/ssb/PracticeResultPage.jsx";
import GDPage from "./pages/ssb/GDPage.jsx";
import OLQReportPage from "./pages/ssb/OLQReportPage.jsx";
import ResumePage from "./pages/resume/ResumePage.jsx";
import ProgressPage from "./pages/ProgressPage.jsx";
import VocabQuizPage from "./pages/communication/VocabQuizPage.jsx";
import SentencePracticePage from "./pages/communication/SentencePracticePage.jsx";
import MistakesPage from "./pages/communication/MistakesPage.jsx";
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
      <Route
        path="/"
        element={
          <PublicRoute>
            <LandingPage />
          </PublicRoute>
        }
      />
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
      <Route
        path="/communication"
        element={
          <PrivateRoute>
            <CommunicationHub />
          </PrivateRoute>
        }
      />
      <Route
        path="/communication/practice/:type"
        element={
          <PrivateRoute>
            <CommunicationPracticePage />
          </PrivateRoute>
        }
      />

      <Route
        path="/ssb"
        element={
          <PrivateRoute>
            <SSBHubPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/ssb/test/:type"
        element={
          <PrivateRoute>
            <TimedTestPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/ssb/result"
        element={
          <PrivateRoute>
            <PracticeResultPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/ssb/result/:id"
        element={
          <PrivateRoute>
            <PracticeResultPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/ssb/gd"
        element={
          <PrivateRoute>
            <GDPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/ssb/olq"
        element={
          <PrivateRoute>
            <OLQReportPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/resume"
        element={
          <PrivateRoute>
            <ResumePage />
          </PrivateRoute>
        }
      />
      <Route
        path="/progress"
        element={
          <PrivateRoute>
            <ProgressPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/communication/quiz"
        element={
          <PrivateRoute>
            <VocabQuizPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/communication/sentence"
        element={
          <PrivateRoute>
            <SentencePracticePage />
          </PrivateRoute>
        }
      />
      <Route
        path="/communication/mistakes"
        element={
          <PrivateRoute>
            <MistakesPage />
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
