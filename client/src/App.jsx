import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';

// Component Imports
import Signup from './components/Signup';
import Login from './components/Login';
import TeamMembers from './components/TeamMembers';
import MainHome from './components/MainHome';
import Task from './components/Task';
import Profile from './components/Profile';
import About from './components/About';
import Contact from './components/Contact';

// --- NEW: Protected Route Component ---
const ProtectedRoute = ({ children }) => {
  const token = sessionStorage.getItem('token');
  
  // If no token is found, redirect to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const Navbar = () => {
  const name = sessionStorage.getItem('full_name')?.replace(/['"]+/g, '') || 'User';

  return (
    <nav className="bg-white border-b border-slate-200 fixed w-full z-50 top-0 backdrop-blur-md bg-white/80">
      <div className="px-4 py-3 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/home" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">TB</div>
              <span className="text-xl font-black text-slate-900 tracking-tight">Task Bridge</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-6">
            <Link to="/task" className="text-sm font-bold text-slate-600 hover:text-indigo-600 transition-colors">Tasks</Link>
            <Link to="/team" className="text-sm font-bold text-slate-600 hover:text-indigo-600 transition-colors">Team</Link>
            <Link to="/profile" className="flex items-center gap-3 pl-4 border-l border-slate-200">
              <span className="text-sm font-bold text-slate-700 hidden md:block">{name}</span>
              <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-xs">
                {name.charAt(0)}
              </div>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

function AppContent() {
  const location = useLocation();
  const hideNavbar = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <div className="min-h-screen bg-slate-50 font-sans antialiased text-slate-900">
      {!hideNavbar && <Navbar />}
      
      <main className={`${!hideNavbar ? 'pt-16' : ''} h-full`}>
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />

            {/* Protected Routes - Only open after Login */}
            <Route path="/home" element={
              <ProtectedRoute>
                <MainHome />
              </ProtectedRoute>
            } />
            <Route path="/team" element={
              <ProtectedRoute>
                <TeamMembers />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="/task" element={
              <ProtectedRoute>
                <Task />
              </ProtectedRoute>
            } />

            {/* Default logic */}
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;