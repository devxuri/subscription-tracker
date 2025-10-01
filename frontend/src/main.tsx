import React from 'react';
import ReactDOM from 'react-dom/client';
import './tailwind.css';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';

import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router';
import AuthRoute from './components/AuthRoute';
import { AuthProvider } from './context/AuthContext';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(

  <React.StrictMode>
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<AuthRoute><Dashboard /></AuthRoute>} />
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </AuthProvider>

  </React.StrictMode>
);
