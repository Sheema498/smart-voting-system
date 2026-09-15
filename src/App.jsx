import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import { VotingProvider } from './context/VotingContext';

import { AppLayout } from './components/layout/AppLayout';
import { ProtectedRoute } from './components/layout/ProtectedRoute';

// Pages
import { LandingPage } from './pages/LandingPage';
import { AboutPage } from './pages/AboutPage';
import { ElectionsPage } from './pages/ElectionsPage';
import { ElectionDetailPage } from './pages/ElectionDetailPage';
import { CandidatesPage } from './pages/CandidatesPage';
import { CandidateDetailPage } from './pages/CandidateDetailPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { DashboardPage } from './pages/DashboardPage';
import { VotingHubPage } from './pages/VotingHubPage';
import { BallotBoothPage } from './pages/BallotBoothPage';
import { VoteConfirmationPage } from './pages/VoteConfirmationPage';
import { VoteSuccessPage } from './pages/VoteSuccessPage';
import { ResultsPage } from './pages/ResultsPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { ProfilePage } from './pages/ProfilePage';
import { NotFoundPage } from './pages/NotFoundPage';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <NotificationProvider>
          <VotingProvider>
            <Routes>
              <Route element={<AppLayout />}>
                {/* Public Routes */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/elections" element={<ElectionsPage />} />
                <Route path="/elections/:id" element={<ElectionDetailPage />} />
                <Route path="/candidates" element={<CandidatesPage />} />
                <Route path="/candidates/:id" element={<CandidateDetailPage />} />
                <Route path="/results" element={<ResultsPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/404" element={<NotFoundPage />} />

                {/* Protected Authenticated Routes */}
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <DashboardPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/voting"
                  element={
                    <ProtectedRoute>
                      <VotingHubPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/voting/:electionId"
                  element={
                    <ProtectedRoute>
                      <BallotBoothPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/vote-confirmation"
                  element={
                    <ProtectedRoute>
                      <VoteConfirmationPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/vote-success"
                  element={
                    <ProtectedRoute>
                      <VoteSuccessPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/notifications"
                  element={
                    <ProtectedRoute>
                      <NotificationsPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <ProfilePage />
                    </ProtectedRoute>
                  }
                />

                {/* Catch-all route to 404 */}
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </VotingProvider>
        </NotificationProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
