import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import { AdminAuthProvider } from '../context/AdminAuthContext';
import ProtectedRoute from '../components/layout/ProtectedRoute';
import AdminProtectedRoute from '../components/layout/AdminProtectedRoute';
import { NotFoundPage } from '../pages/NotFoundPage';

describe('Routing & Access Guards Test Suite', () => {
  it('renders 404 page content for unmatched routes', () => {
    render(
      <MemoryRouter initialEntries={['/unknown-route']}>
        <NotFoundPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/404/i)).toBeInTheDocument();
    expect(screen.getByText(/Return Home/i)).toBeInTheDocument();
  });

  it('renders protected child content when authenticated', () => {
    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <AuthProvider>
          <Routes>
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <div data-testid="protected-voter-content">Secure Elector Portal</div>
                </ProtectedRoute>
              }
            />
          </Routes>
        </AuthProvider>
      </MemoryRouter>
    );

    expect(screen.getByTestId('protected-voter-content')).toBeInTheDocument();
  });

  it('redirects unauthenticated users in AdminProtectedRoute', () => {
    render(
      <MemoryRouter initialEntries={['/admin/dashboard']}>
        <AdminAuthProvider>
          <Routes>
            <Route path="/admin/login" element={<div>Admin Login Destination</div>} />
            <Route
              path="/admin/dashboard"
              element={
                <AdminProtectedRoute>
                  <div data-testid="admin-secret-dashboard">Admin Secret Console</div>
                </AdminProtectedRoute>
              }
            />
          </Routes>
        </AdminAuthProvider>
      </MemoryRouter>
    );

    expect(screen.getByText('Admin Login Destination')).toBeInTheDocument();
    expect(screen.queryByTestId('admin-secret-dashboard')).toBeNull();
  });
});
