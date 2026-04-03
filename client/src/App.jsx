import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard';

import Careers from './pages/Careers';
import Login from './pages/Login';
import Onboarding from './pages/Onboarding';
import Landing from './pages/Landing'; 
import Loading from './pages/Loading';
import Learning from './pages/Learning';
import { AppProvider } from './context/AppContext';
import Resume from './pages/Resume';
import Jobs from './pages/Jobs';
import Profile from './pages/Profile';
import Notifications from './pages/Notifications';
import Community from './pages/Community';
import CommunityDetail from './pages/CommunityDetail';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          
          {/* Auth & Onboarding Flow */}
          <Route path="/login" element={<Login />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/analyzing" element={<Loading />} />
          
          {/* App Layout with Sidebar (No specific path, wraps children) */}
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />

            <Route path="/careers" element={<Careers />} />
            <Route path="/learning" element={<Learning />} />
            <Route path="/community" element={<Community />} />
            <Route path="/community/:groupId" element={<CommunityDetail />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/notifications" element={<Notifications />} />
          </Route>
          
          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
