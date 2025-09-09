import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './components/DashBoard/Dashboard';
import Profile from './pages/Profile';
import Home from './pages/Home';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import { useEffect } from 'react';
import AddPlatform from './components/DashBoard/AddPlatform';

function PrivateRoute({ children }) {
  const { auth, loading } = useContext(AuthContext);
  if (loading) {
    return <div style={{ color: "white", textAlign: "center", marginTop: "50px" }}>
      Loading...
    </div>;
  }
  return auth ? children : <Navigate to="/login" replace />;
}

function AppRoutes() {
  const { auth, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loading && auth && location.pathname === "/") {
      navigate("/dashboard", { replace: true });
    }
  }, [auth, loading, location.pathname, navigate]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      >
        {/* Nested routes inside dashboard */}
        <Route path="addPlatform" element={<AddPlatform />} />
      </Route>
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );

}
export default function App() {
  return (
    <Router>
      <Navbar />
      <AppRoutes />
    </Router>
  );
}
