import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuditService } from '../services/auditService';

const AdminAuthContext = createContext(null);

const DEFAULT_ADMIN = {
  id: 'ADM-2026-001',
  name: 'Eleanor Vance',
  title: 'Chief Electoral Commissioner',
  email: 'admin@votesphere.gov',
  role: 'Super Administrator',
  clearanceLevel: 'Tier-4 Root Governance',
  lastLogin: new Date().toISOString(),
  permissions: [
    'ELECTION_MANAGE',
    'CANDIDATE_MANAGE',
    'VOTER_ROLL_AUDIT',
    'CERTIFY_RESULTS',
    'SYSTEM_SETTINGS',
    'BROADCAST_NOTIFICATIONS'
  ]
};

const DEFAULT_CONFIG = {
  maintenanceMode: false,
  allowPublicAudits: true,
  voterRegistrationOpen: true,
  requirePinOnCast: true,
  autoCertifyWindowHours: 48,
  cryptographicCipher: 'SHA-256 + HMAC-256 Multi-Signature',
  platformTitle: 'VoteSphere National Democratic Exchange'
};

export const AdminAuthProvider = ({ children }) => {
  const [adminUser, setAdminUser] = useState(() => {
    try {
      const stored = localStorage.getItem('votesphere_admin_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [systemConfig, setSystemConfig] = useState(() => {
    try {
      const stored = localStorage.getItem('votesphere_system_config');
      return stored ? JSON.parse(stored) : DEFAULT_CONFIG;
    } catch {
      return DEFAULT_CONFIG;
    }
  });

  useEffect(() => {
    if (adminUser) {
      localStorage.setItem('votesphere_admin_user', JSON.stringify(adminUser));
    } else {
      localStorage.removeItem('votesphere_admin_user');
    }
  }, [adminUser]);

  useEffect(() => {
    localStorage.setItem('votesphere_system_config', JSON.stringify(systemConfig));
  }, [systemConfig]);

  const loginAdmin = async (email, password) => {
    // Simulated credential check
    if (email === 'admin@votesphere.gov' && password === 'admin123') {
      const user = { ...DEFAULT_ADMIN, lastLogin: new Date().toISOString() };
      setAdminUser(user);
      await AuditService.logEvent({
        action: 'ADMIN_SESSION_AUTHENTICATED',
        actor: user.name,
        severity: 'info',
        details: { email, clearance: user.clearanceLevel }
      });
      return { success: true, user };
    } else if (email && password && password.length >= 6) {
      // Allow flexible demo logins for testing
      const customUser = {
        ...DEFAULT_ADMIN,
        email,
        name: email.split('@')[0].replace('.', ' ').toUpperCase(),
        lastLogin: new Date().toISOString()
      };
      setAdminUser(customUser);
      await AuditService.logEvent({
        action: 'ADMIN_SESSION_AUTHENTICATED',
        actor: customUser.name,
        severity: 'info',
        details: { email, clearance: customUser.clearanceLevel }
      });
      return { success: true, user: customUser };
    }

    return {
      success: false,
      error: 'Invalid administrator credentials. Try admin@votesphere.gov / admin123'
    };
  };

  const logoutAdmin = async () => {
    if (adminUser) {
      await AuditService.logEvent({
        action: 'ADMIN_SESSION_TERMINATED',
        actor: adminUser.name,
        severity: 'info',
        details: { email: adminUser.email }
      });
    }
    setAdminUser(null);
  };

  const updateSystemConfig = async (newConfig) => {
    setSystemConfig((prev) => {
      const updated = { ...prev, ...newConfig };
      return updated;
    });

    if (adminUser) {
      await AuditService.logEvent({
        action: 'SYSTEM_CONFIGURATION_ALTERED',
        actor: adminUser.name,
        severity: 'warning',
        details: newConfig
      });
    }
  };

  return (
    <AdminAuthContext.Provider
      value={{
        adminUser,
        isAuthenticated: !!adminUser,
        systemConfig,
        loginAdmin,
        logoutAdmin,
        updateSystemConfig
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};
