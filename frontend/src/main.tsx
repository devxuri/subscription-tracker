import React from 'react';
import ReactDOM from 'react-dom/client';
import './tailwind.css';
import Subscriptions from './pages/Subscriptions';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navbar from './components/Navbar';
import Calendar from './pages/Calendar';

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
        <Navbar />
        <div className='max-w-screen-2xl mx-auto'>
          <Routes>
            <Route path="/" element={<AuthRoute><Subscriptions /></AuthRoute>} />
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/calendar" element={<AuthRoute><Calendar /></AuthRoute>} />
            <Route path="/subscriptions" element={<AuthRoute><Subscriptions /></AuthRoute>} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>

  </React.StrictMode>
);
