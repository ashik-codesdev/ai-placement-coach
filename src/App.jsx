import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { ToastProvider } from './contexts/ToastContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';

import { DashboardLayout } from './layouts/DashboardLayout';

import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';

import { DashboardPage } from './pages/DashboardPage';
import { RoadmapPage } from './pages/RoadmapPage';
import { CodingPage } from './pages/CodingPage';
import { CodingDetailPage } from './pages/CodingDetailPage';
import { AptitudePage } from './pages/AptitudePage';
import { ResumeAnalyzerPage } from './pages/ResumeAnalyzerPage';
import { MockInterviewPage } from './pages/MockInterviewPage';
import { CompanyPrepPage } from './pages/CompanyPrepPage';
import { ApplicationTrackerPage } from './pages/ApplicationTrackerPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { AIAssistantPage } from './pages/AIAssistantPage';
import { ProfilePage } from './pages/ProfilePage';
import { NotFoundPage } from './pages/NotFoundPage';

// Protected Route Guard
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400 text-xs font-semibold">
        Loading Placement AI...
      </div>
    );
  }
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />

              {/* Protected Dashboard App Routes */}
              <Route
                element={
                  <ProtectedRoute>
                    <DashboardLayout />
                  </ProtectedRoute>
                }
              >
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/roadmap" element={<RoadmapPage />} />
                <Route path="/coding" element={<CodingPage />} />
                <Route path="/coding/:slug" element={<CodingDetailPage />} />
                <Route path="/aptitude" element={<AptitudePage />} />
                <Route path="/resume" element={<ResumeAnalyzerPage />} />
                <Route path="/interview" element={<MockInterviewPage />} />
                <Route path="/companies" element={<CompanyPrepPage />} />
                <Route path="/applications" element={<ApplicationTrackerPage />} />
                <Route path="/analytics" element={<AnalyticsPage />} />
                <Route path="/assistant" element={<AIAssistantPage />} />
                <Route path="/profile" element={<ProfilePage />} />
              </Route>

              {/* 404 Catch All */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
