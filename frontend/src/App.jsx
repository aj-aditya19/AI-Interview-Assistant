import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import LandingPage from "./pages/Landing";
import AuthPage from "./pages/Auth";
import HomePage from "./pages/Home";
import "./styles/App.css";

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="app-loading">Loading...</div>;
  }

  if (user) {
    return <Navigate to="/home" replace />;
  }

  return children;
};

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="app-loading">Loading...</div>;
  }

  if (user) {
    return children;
  }

  return <Navigate to="/auth" replace />;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route
        path="/auth"
        element={
          <PublicRoute>
            <AuthPage />
          </PublicRoute>
        }
      />
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
