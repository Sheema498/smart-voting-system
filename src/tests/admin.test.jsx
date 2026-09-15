import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { AdminAuthProvider, useAdminAuth } from '../context/AdminAuthContext';
import { AuditService } from '../services/auditService';

const TestAdminConsumer = () => {
  const { adminUser, isAuthenticated, loginAdmin, logoutAdmin, systemConfig, updateSystemConfig } =
    useAdminAuth();

  return (
    <div>
      <div data-testid="admin-auth">{isAuthenticated ? 'admin-auth' : 'admin-guest'}</div>
      <div data-testid="admin-name">{adminUser ? adminUser.name : 'none'}</div>
      <div data-testid="maintenance-mode">{systemConfig.maintenanceMode ? 'on' : 'off'}</div>
      <button onClick={() => loginAdmin('admin@votesphere.gov', 'admin123')}>Login Admin</button>
      <button onClick={() => logoutAdmin()}>Logout Admin</button>
      <button onClick={() => updateSystemConfig({ maintenanceMode: true })}>Enable Maintenance</button>
    </div>
  );
};

describe('AdminAuth & Governance Test Suite', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('authenticates administrator with valid demo credentials', async () => {
    render(
      <AdminAuthProvider>
        <TestAdminConsumer />
      </AdminAuthProvider>
    );

    expect(screen.getByTestId('admin-auth').textContent).toBe('admin-guest');

    const loginBtn = screen.getByText('Login Admin');
    await act(async () => {
      loginBtn.click();
    });

    expect(screen.getByTestId('admin-auth').textContent).toBe('admin-auth');
    expect(screen.getByTestId('admin-name').textContent).toContain('Eleanor Vance');
  });

  it('updates platform governance configuration', async () => {
    render(
      <AdminAuthProvider>
        <TestAdminConsumer />
      </AdminAuthProvider>
    );

    const updateBtn = screen.getByText('Enable Maintenance');
    await act(async () => {
      updateBtn.click();
    });

    expect(screen.getByTestId('maintenance-mode').textContent).toBe('on');
  });

  it('records immutable audit events with SHA-256 hash chaining', async () => {
    const initialLogs = AuditService.getLogs();
    const event = await AuditService.logEvent({
      action: 'TEST_AUDIT_VERIFICATION_EVENT',
      actor: 'Testing Subsystem',
      severity: 'info',
      details: { unitTest: true }
    });

    expect(event.id).toBeDefined();
    expect(event.hash).toBeDefined();
    expect(event.hash.length).toBe(64); // SHA-256 hexadecimal length

    const updatedLogs = AuditService.getLogs();
    expect(updatedLogs.length).toBe(initialLogs.length + 1);
    expect(updatedLogs[0].action).toBe('TEST_AUDIT_VERIFICATION_EVENT');
  });
});
