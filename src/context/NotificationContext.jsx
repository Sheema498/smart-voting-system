import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockNotifications } from '../data/mockNotifications';

const NotificationContext = createContext(null);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState(() => {
    try {
      const saved = localStorage.getItem('votesphere_notifications');
      return saved ? JSON.parse(saved) : mockNotifications;
    } catch (e) {
      console.error('Error reading notifications from localStorage', e);
      return mockNotifications;
    }
  });

  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    try {
      localStorage.setItem('votesphere_notifications', JSON.stringify(notifications));
    } catch (e) {
      console.error('Error saving notifications to localStorage', e);
    }
  }, [notifications]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(item => (item.id === id ? { ...item, read: true } : item))
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(item => ({ ...item, read: true })));
    showToast('Success', 'All notifications marked as read', 'success');
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(item => item.id !== id));
    showToast('Removed', 'Notification deleted', 'info');
  };

  const addNotification = ({ title, message, category = 'system', type = 'info', link, actionText }) => {
    const newNotif = {
      id: `notif-${Date.now()}`,
      title,
      message,
      category,
      type,
      timestamp: new Date().toISOString(),
      read: false,
      link,
      actionText
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const showToast = (title, message, type = 'info', duration = 4000) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    const newToast = { id, title, message, type };
    setToasts(prev => [...prev, newToast]);

    setTimeout(() => {
      removeToast(id);
    }, duration);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return (
    <NotificationContext.Provider value={{
      notifications,
      unreadCount,
      markAsRead,
      markAllAsRead,
      deleteNotification,
      addNotification,
      toasts,
      showToast,
      removeToast
    }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};
