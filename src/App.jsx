import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';

// Layouts
import PublicLayout from './layout/PublicLayout';
import AdminLayout from './layout/AdminLayout';

// Public Pages
import LandingPage from './pages/LandingPage/LandingPage';

// Frontoffice Auth Pages
import SignIn from './pages/Frontoffice/SignIn';
import SignUp from './pages/Frontoffice/SignUp';

// Backoffice Pages
import Login from './pages/Backoffice/Login';
import Dashboard from './pages/Backoffice/Dashboard';
import Users from './pages/Backoffice/Users';
import Battles from './pages/Backoffice/Battles';
import Challenges from './pages/Backoffice/Challenges';
import AILogs from './pages/Backoffice/AILogs';
import Leaderboards from './pages/Backoffice/Leaderboards';
import Analytics from './pages/Backoffice/Analytics';
import SystemHealth from './pages/Backoffice/SystemHealth';
import Settings from './pages/Backoffice/Settings';
import Profile from './pages/Backoffice/Profile';
import AddAdmin from './pages/Backoffice/AddAdmin';
import PlaceholderPage from './pages/Backoffice/PlaceholderPage';

// Simple Protected Route Component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login but save the attempted location
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<LandingPage />} />
        </Route>

        <Route path="/login" element={<Login />} />

        {/* Frontoffice Auth Routes */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Backoffice Routes - Protected */}
        <Route path="/admin" element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }>
          <Route index element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="battles" element={<Battles />} />
          <Route path="challenges" element={<Challenges />} />
          <Route path="ai-logs" element={<AILogs />} />
          <Route path="leaderboards" element={<Leaderboards />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="system-health" element={<SystemHealth />} />
          <Route path="settings" element={<Settings />} />
          <Route path="profile" element={<Profile />} />
          <Route path="add-admin" element={<AddAdmin />} />
          <Route path="*" element={<PlaceholderPage />} />
        </Route>

        {/* Catch-all redirect to Landing Page */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
