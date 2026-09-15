import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AdminAuthProvider } from './context/AdminAuthContext';
import { NotificationProvider } from './context/NotificationContext';
import { VotingProvider } from './context/VotingContext';

import { AppLayout } from './components/layout/AppLayout';
import { ProtectedRoute } from './components/layout/ProtectedRoute';
import AdminLayout from './components/layout/AdminLayout';
import AdminProtectedRoute from './components/layout/AdminProtectedRoute';

// Public Pages
import { LandingPage } from './pages/LandingPage';
import { AboutPage } from './pages/AboutPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { FaqPage } from './pages/FaqPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { AccessibilityPage } from './pages/AccessibilityPage';
import { ElectionsPage } from './pages/ElectionsPage';
import { ElectionDetailPage } from './pages/ElectionDetailPage';
import { CandidatesPage } from './pages/CandidatesPage';
import { CandidateDetailPage } from './pages/CandidateDetailPage';
import { ResultsPage } from './pages/ResultsPage';
import { ElectionResultDetailPage } from './pages/ElectionResultDetailPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Auth Pages
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { ResetPasswordPage } from './pages/ResetPasswordPage';

// Voter Protected Pages
import { DashboardPage } from './pages/DashboardPage';
import { VotingHubPage } from './pages/VotingHubPage';
import { BallotBoothPage } from './pages/BallotBoothPage';
import { VoteConfirmationPage } from './pages/VoteConfirmationPage';
import { VoteSuccessPage } from './pages/VoteSuccessPage';
import { VotingHistoryPage } from './pages/VotingHistoryPage';
import { ProfilePage } from './pages/ProfilePage';
import { EditProfilePage } from './pages/EditProfilePage';
import { SettingsPage } from './pages/SettingsPage';
import { HelpCenterPage } from './pages/HelpCenterPage';
import { NotificationsPage } from './pages/NotificationsPage';

// Admin Suite Pages
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminElectionsPage } from './pages/admin/AdminElectionsPage';
import { AdminElectionCreatePage } from './pages/admin/AdminElectionCreatePage';
import { AdminElectionDetailPage } from './pages/admin/AdminElectionDetailPage';
import { AdminElectionEditPage } from './pages/admin/AdminElectionEditPage';
import { AdminCandidatesPage } from './pages/admin/AdminCandidatesPage';
import { AdminCandidateCreatePage } from './pages/admin/AdminCandidateCreatePage';
import { AdminCandidateDetailPage } from './pages/admin/AdminCandidateDetailPage';
import { AdminCandidateEditPage } from './pages/admin/AdminCandidateEditPage';
import { AdminResultsPage } from './pages/admin/AdminResultsPage';
import { AdminVotersPage } from './pages/admin/AdminVotersPage';
import { AdminNotificationsPage } from './pages/admin/AdminNotificationsPage';
import { AdminAuditPage } from './pages/admin/AdminAuditPage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AdminAuthProvider>
          <NotificationProvider>
            <VotingProvider>
              <Routes>
                {/* Admin Auth Portal (Independent of public layout) */}
                <Route path="/admin/login" element={<AdminLoginPage />} />

                {/* Administration Protected Console */}
                <Route
                  path="/admin"
                  element={
                    <AdminProtectedRoute>
                      <AdminLayout />
                    </AdminProtectedRoute>
                  }
                >
                  <Route index element={<Navigate to="/admin/dashboard" replace />} />
                  <Route path="dashboard" element={<AdminDashboardPage />} />
                  <Route path="elections" element={<AdminElectionsPage />} />
                  <Route path="elections/new" element={<AdminElectionCreatePage />} />
                  <Route path="elections/:id" element={<AdminElectionDetailPage />} />
                  <Route path="elections/:id/edit" element={<AdminElectionEditPage />} />
                  <Route path="candidates" element={<AdminCandidatesPage />} />
                  <Route path="candidates/new" element={<AdminCandidateCreatePage />} />
                  <Route path="candidates/:id" element={<AdminCandidateDetailPage />} />
                  <Route path="candidates/:id/edit" element={<AdminCandidateEditPage />} />
                  <Route path="results" element={<AdminResultsPage />} />
                  <Route path="results/:electionId" element={<AdminResultsPage />} />
                  <Route path="voters" element={<AdminVotersPage />} />
                  <Route path="notifications" element={<AdminNotificationsPage />} />
                  <Route path="audit" element={<AdminAuditPage />} />
                  <Route path="settings" element={<AdminSettingsPage />} />
                </Route>

                {/* Public & Voter Shell */}
                <Route element={<AppLayout />}>
                  {/* Public Information Portal */}
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/how-it-works" element={<HowItWorksPage />} />
                  <Route path="/faq" element={<FaqPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/privacy" element={<PrivacyPage />} />
                  <Route path="/terms" element={<TermsPage />} />
                  <Route path="/accessibility" element={<AccessibilityPage />} />

                  {/* Public Directories */}
                  <Route path="/elections" element={<ElectionsPage />} />
                  <Route path="/elections/:id" element={<ElectionDetailPage />} />
                  <Route path="/candidates" element={<CandidatesPage />} />
                  <Route path="/candidates/:id" element={<CandidateDetailPage />} />
                  <Route path="/results" element={<ResultsPage />} />
                  <Route path="/results/:electionId" element={<ElectionResultDetailPage />} />

                  {/* Voter Authentication */}
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                  <Route path="/reset-password" element={<ResetPasswordPage />} />

                  {/* Voter Protected Portal */}
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
                    path="/voting/:electionId/instructions"
                    element={
                      <ProtectedRoute>
                        <BallotBoothPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/voting/:electionId/candidates"
                    element={
                      <ProtectedRoute>
                        <BallotBoothPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/voting/:electionId/review"
                    element={
                      <ProtectedRoute>
                        <BallotBoothPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/voting/:electionId/confirmation"
                    element={
                      <ProtectedRoute>
                        <BallotBoothPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/voting/:electionId/success"
                    element={
                      <ProtectedRoute>
                        <VoteSuccessPage />
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
                    path="/voting-history"
                    element={
                      <ProtectedRoute>
                        <VotingHistoryPage />
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
                  <Route
                    path="/profile/edit"
                    element={
                      <ProtectedRoute>
                        <EditProfilePage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/settings"
                    element={
                      <ProtectedRoute>
                        <SettingsPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/help"
                    element={
                      <ProtectedRoute>
                        <HelpCenterPage />
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

                  {/* 404 Error Route */}
                  <Route path="/404" element={<NotFoundPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Route>
              </Routes>
            </VotingProvider>
          </NotificationProvider>
        </AdminAuthProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
