import { Router } from "express";
import { Navigate, Route, Routes } from "react-router-dom";
import AuthPage from "./pages/Auth";
import HomePage from "./pages/Home";
import OtpVerifyPage from "./pages/OtpVerify";

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (token) {
    return <Navigate to="/home" replace />;
  }
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/auth" replace />}></Route>
        <Route
          path="/auth"
          element={
            <PublicRoute>
              <AuthPage />
            </PublicRoute>
          }
        />
        <Route path="/otp-verify" element={<OtpVerifyPage />} />
        <Route
          path="/home"
          element={
            <PublicRoute>
              <HomePage />
            </PublicRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
