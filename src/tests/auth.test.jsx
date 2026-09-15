import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { AuthProvider, useAuth } from '../context/AuthContext';

// Test consumer component
const TestAuthConsumer = () => {
  const { user, isAuthenticated, login, logout, verifyPin, registerVoter } = useAuth();

  return (
    <div>
      <div data-testid="auth-status">{isAuthenticated ? 'authenticated' : 'unauthenticated'}</div>
      <div data-testid="user-name">{user ? user.name : 'no-user'}</div>
      <div data-testid="voter-id">{user ? user.voterId : 'no-id'}</div>
      <button onClick={() => login('eleanor.vance@example.gov', 'password123')}>Login Eleanor</button>
      <button onClick={() => logout()}>Logout</button>
      <button
        onClick={() => {
          const valid = verifyPin('1234');
          document.getElementById('pin-result').textContent = valid ? 'valid' : 'invalid';
        }}
      >
        Verify 1234
      </button>
      <span id="pin-result"></span>
      <button
        onClick={() => {
          const res = registerVoter({
            name: 'New Registered Voter',
            email: 'newvoter@example.org',
            password: 'secretpassword',
            pin: '5678',
            district: 'District 2'
          });
          document.getElementById('reg-result').textContent = res.success ? 'registered' : 'failed';
        }}
      >
        Register
      </button>
      <span id="reg-result"></span>
    </div>
  );
};

describe('AuthContext Integration Test Suite', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('provides default authenticated demo voter or initial state', () => {
    render(
      <AuthProvider>
        <TestAuthConsumer />
      </AuthProvider>
    );

    const authStatus = screen.getByTestId('auth-status');
    expect(authStatus.textContent).toBe('authenticated');
    const voterId = screen.getByTestId('voter-id');
    expect(voterId.textContent).toContain('VS-');
  });

  it('verifies 4-digit voting PIN successfully', () => {
    render(
      <AuthProvider>
        <TestAuthConsumer />
      </AuthProvider>
    );

    const btn = screen.getByText('Verify 1234');
    act(() => {
      btn.click();
    });

    const result = document.getElementById('pin-result');
    expect(result.textContent).toBe('valid');
  });

  it('logs out and transitions to unauthenticated state', () => {
    render(
      <AuthProvider>
        <TestAuthConsumer />
      </AuthProvider>
    );

    const logoutBtn = screen.getByText('Logout');
    act(() => {
      logoutBtn.click();
    });

    expect(screen.getByTestId('auth-status').textContent).toBe('unauthenticated');
  });

  it('registers a new voter and issues a formatted official Voter ID', () => {
    render(
      <AuthProvider>
        <TestAuthConsumer />
      </AuthProvider>
    );

    const regBtn = screen.getByText('Register');
    act(() => {
      regBtn.click();
    });

    expect(document.getElementById('reg-result').textContent).toBe('registered');
    expect(screen.getByTestId('user-name').textContent).toBe('New Registered Voter');
  });
});
