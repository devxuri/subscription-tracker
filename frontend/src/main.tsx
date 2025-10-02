import React from 'react';
import ReactDOM from 'react-dom/client';
import './tailwind.css';
import Subscriptions from './pages/Subscriptions';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navbar from './components/Navbar';
import Calendar from './pages/Calendar';
import Analytics from './pages/Analytics';
import Integrations from './pages/Integrations';
import Landing from './pages/Landing';

import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router';
import AuthRoute from './components/AuthRoute';
import { AuthProvider, useAuth } from './context/AuthContext';

const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route
        path="/"
        element={
          user
            ? <Navigate to="/subscriptions" />
            : <Navigate to="/landing" />
        }
      />
      <Route path="*" element={<Navigate to="/" />} />
      <Route path="/calendar" element={<AuthRoute><Calendar /></AuthRoute>} />
      <Route path="/subscriptions" element={<AuthRoute><Subscriptions /></AuthRoute>} />
      <Route path="/analytics" element={<AuthRoute><Analytics /></AuthRoute>} />
      <Route path="/integrations" element={<AuthRoute><Integrations /></AuthRoute>} />
      <Route path="/landing" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(

  <React.StrictMode>
    <AuthProvider>
      <Router>
        <Navbar />
        <div className='max-w-screen-2xl mx-auto'>
          <AppRoutes />
        </div>
      </Router>
    </AuthProvider>

  </React.StrictMode>
);
