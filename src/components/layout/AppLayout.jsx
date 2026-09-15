import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { ToastContainer } from '../common/Toast';

export const AppLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-brand-100 selection:text-brand-900">
      <Navbar />
      <main className="flex-1 w-full">
        <Outlet />
      </main>
      <ToastContainer />
      <Footer />
    </div>
  );
};
