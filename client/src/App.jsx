import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoginForm } from './components/LoginForm';
import { SignupForm } from './components/SignupForm';
import { Dashboard } from './components/Dashboard';
import { MainContent } from './components/MainContent';
import { ProtectedRoute } from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/profile-creation/*" element={
          <ProtectedRoute>
            <MainContent />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
