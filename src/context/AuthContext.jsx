import React, { createContext, useContext, useState, useEffect } from 'react';
import { defaultMockUser, demoCredentials } from '../data/mockUser';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('votesphere_user');
      return saved ? JSON.parse(saved) : defaultMockUser;
    } catch (e) {
      console.error('Failed to load user from localStorage', e);
      return defaultMockUser;
    }
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      const auth = localStorage.getItem('votesphere_auth');
      if (auth !== null) return auth === 'true';
      return true;
    } catch (e) {
      return true;
    }
  });

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('votesphere_user', JSON.stringify(user));
      }
    } catch (e) {
      console.error('Failed to persist user', e);
    }
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem('votesphere_auth', isAuthenticated ? 'true' : 'false');
    } catch (e) {
      console.error('Failed to persist auth status', e);
    }
  }, [isAuthenticated]);

  const login = (voterId, password, rememberMe = true) => {
    // Validate demo credentials or custom user
    const trimmedId = voterId.trim();
    if (!trimmedId) {
      return { success: false, error: 'Please enter your Voter ID or email address.' };
    }
    if (!password) {
      return { success: false, error: 'Please enter your password.' };
    }

    // Allow demo credentials or existing user credentials
    if (trimmedId.toLowerCase() === demoCredentials.voterId.toLowerCase() || 
        trimmedId.toLowerCase() === user.email.toLowerCase() ||
        trimmedId.toLowerCase() === user.voterId.toLowerCase()) {
      setIsAuthenticated(true);
      return { success: true, message: `Welcome back, ${user.name}!` };
    }

    // Allow flexible test voter login for testing convenience
    if (password.length >= 6) {
      const updatedUser = {
        ...user,
        voterId: trimmedId.startsWith('VS-') ? trimmedId : `VS-${Math.floor(10000 + Math.random() * 90000)}-2026`,
        email: trimmedId.includes('@') ? trimmedId : user.email,
        name: trimmedId.includes('@') ? trimmedId.split('@')[0] : user.name
      };
      setUser(updatedUser);
      setIsAuthenticated(true);
      return { success: true, message: `Logged in successfully as ${updatedUser.name}.` };
    }

    return { 
      success: false, 
      error: 'Invalid credentials. You can use the Demo Voter quick-fill buttons below.' 
    };
  };

  const register = (registrationData) => {
    const newVoterId = `VS-${Math.floor(10000 + Math.random() * 90000)}-2026`;
    const initials = registrationData.name
      ? registrationData.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
      : 'VR';

    const newUser = {
      ...defaultMockUser,
      id: `voter-usr-${Date.now()}`,
      voterId: newVoterId,
      name: registrationData.name,
      email: registrationData.email,
      district: registrationData.district || 'Metro District 1',
      phone: registrationData.phone || '+1 (555) 000-0000',
      registrationDate: new Date().toISOString().split('T')[0],
      status: 'Verified Active',
      avatarInitials: initials,
      avatarBg: 'bg-emerald-600',
      votingPin: registrationData.pin || '1234',
      votingHistory: []
    };

    setUser(newUser);
    setIsAuthenticated(true);
    return { 
      success: true, 
      message: `Registration successful! Your official Voter ID is ${newVoterId}.`,
      voterId: newVoterId 
    };
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const updateProfile = (updatedFields) => {
    setUser(prev => {
      const next = { ...prev, ...updatedFields };
      return next;
    });
    return { success: true, message: 'Profile updated successfully.' };
  };

  const verifyPin = (pin) => {
    return pin === user.votingPin || pin === '1234';
  };

  const addVoteToHistory = (historyEntry) => {
    setUser(prev => ({
      ...prev,
      votingHistory: [historyEntry, ...prev.votingHistory]
    }));
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      login,
      register,
      registerVoter: register,
      logout,
      updateProfile,
      verifyPin,
      addVoteToHistory,
      demoCredentials
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
