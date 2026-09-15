import React, { useState } from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import { Logo } from '../common/Logo';
import { Button } from '../common/Button';
import { 
  Vote, 
  User, 
  Bell, 
  LogOut, 
  Menu, 
  X, 
  LayoutDashboard, 
  CheckCircle2, 
  BarChart3, 
  Users, 
  Calendar, 
  Info,
  ShieldCheck
} from 'lucide-react';

export const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { unreadCount } = useNotifications();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
    setProfileDropdownOpen(false);
    navigate('/');
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const navLinkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors duration-150 px-3 py-1.5 rounded-lg flex items-center gap-1.5 ${
      isActive
        ? 'text-brand-600 bg-brand-50/80 font-semibold'
        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
    }`;

  const mobileNavLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
      isActive
        ? 'bg-brand-50 text-brand-700 font-semibold'
        : 'text-slate-700 hover:bg-slate-100'
    }`;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <Logo size="md" showTagline={false} />
          </div>

          {/* Desktop Global Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>
            <NavLink to="/elections" className={navLinkClass}>
              Elections
            </NavLink>
            <NavLink to="/candidates" className={navLinkClass}>
              Candidates
            </NavLink>
            <NavLink to="/voting" className={navLinkClass}>
              Voting
            </NavLink>
            <NavLink to="/results" className={navLinkClass}>
              Results
            </NavLink>
            <NavLink to="/about" className={navLinkClass}>
              About
            </NavLink>
          </nav>

          {/* Right Action Area */}
          <div className="hidden lg:flex items-center gap-3">
            {isAuthenticated ? (
              <>
                {/* Notifications Bell */}
                <Link
                  to="/notifications"
                  className="relative p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
                  aria-label={`Notifications (${unreadCount} unread)`}
                >
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white shadow-sm ring-2 ring-white">
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                  )}
                </Link>

                {/* Dashboard Shortcut */}
                <Link to="/dashboard">
                  <Button variant="outline" size="sm" leftIcon={<LayoutDashboard className="w-4 h-4" />}>
                    Dashboard
                  </Button>
                </Link>

                {/* Profile Dropdown / Area */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full hover:bg-slate-100 border border-slate-200 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500"
                    aria-expanded={profileDropdownOpen}
                  >
                    <div className={`w-7 h-7 rounded-full ${user.avatarBg || 'bg-brand-600'} text-white flex items-center justify-center text-xs font-bold`}>
                      {user.avatarInitials || 'VR'}
                    </div>
                    <span className="text-xs font-semibold text-slate-800 max-w-[100px] truncate">
                      {user.name.split(' ')[0]}
                    </span>
                  </button>

                  {/* Dropdown Menu */}
                  {profileDropdownOpen && (
                    <div 
                      className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-1 z-50 animate-in fade-in slide-in-from-top-2"
                      onMouseLeave={() => setProfileDropdownOpen(false)}
                    >
                      <div className="px-4 py-3 border-b border-slate-100">
                        <p className="text-xs font-medium text-slate-500">Signed in as</p>
                        <p className="text-sm font-bold text-slate-900 truncate">{user.name}</p>
                        <div className="mt-1 flex items-center gap-1.5 text-[11px] text-emerald-600 font-medium">
                          <ShieldCheck className="w-3 h-3" />
                          <span>{user.voterId}</span>
                        </div>
                      </div>

                      <div className="py-1">
                        <Link
                          to="/dashboard"
                          onClick={() => setProfileDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                        >
                          <LayoutDashboard className="w-4 h-4 text-slate-400" />
                          Dashboard
                        </Link>
                        <Link
                          to="/profile"
                          onClick={() => setProfileDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                        >
                          <User className="w-4 h-4 text-slate-400" />
                          Voter Profile
                        </Link>
                        <Link
                          to="/notifications"
                          onClick={() => setProfileDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-slate-900 justify-between"
                        >
                          <div className="flex items-center gap-2.5">
                            <Bell className="w-4 h-4 text-slate-400" />
                            Notifications
                          </div>
                          {unreadCount > 0 && (
                            <span className="bg-rose-100 text-rose-700 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                              {unreadCount}
                            </span>
                          )}
                        </Link>
                      </div>

                      <div className="border-t border-slate-100 py-1">
                        <button
                          type="button"
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 transition-colors text-left"
                        >
                          <LogOut className="w-4 h-4" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2.5">
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="primary" size="sm">
                    Register to Vote
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            {isAuthenticated && (
              <Link
                to="/notifications"
                className="relative p-2 text-slate-500 hover:text-slate-700"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-rose-500 text-[9px] font-bold text-white">
                    {unreadCount}
                  </span>
                )}
              </Link>
            )}

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 bg-white shadow-xl animate-in slide-in-from-top duration-200">
          <div className="px-4 pt-3 pb-6 space-y-3">
            
            {/* User status card if logged in */}
            {isAuthenticated && (
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between mb-2">
                <div className="flex items-center gap-2.5">
                  <div className={`w-8 h-8 rounded-full ${user.avatarBg || 'bg-brand-600'} text-white flex items-center justify-center text-xs font-bold`}>
                    {user.avatarInitials || 'VR'}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">{user.name}</p>
                    <p className="text-[11px] text-slate-500 font-mono">{user.voterId}</p>
                  </div>
                </div>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded-full">
                  Verified
                </span>
              </div>
            )}

            {/* Navigation links */}
            <div className="space-y-1">
              <NavLink to="/" className={mobileNavLinkClass} onClick={closeMobileMenu}>
                <Vote className="w-4 h-4 text-slate-400" />
                Home
              </NavLink>
              
              {isAuthenticated && (
                <NavLink to="/dashboard" className={mobileNavLinkClass} onClick={closeMobileMenu}>
                  <LayoutDashboard className="w-4 h-4 text-slate-400" />
                  Dashboard
                </NavLink>
              )}

              <NavLink to="/elections" className={mobileNavLinkClass} onClick={closeMobileMenu}>
                <Calendar className="w-4 h-4 text-slate-400" />
                Elections
              </NavLink>

              <NavLink to="/candidates" className={mobileNavLinkClass} onClick={closeMobileMenu}>
                <Users className="w-4 h-4 text-slate-400" />
                Candidates
              </NavLink>

              <NavLink to="/voting" className={mobileNavLinkClass} onClick={closeMobileMenu}>
                <CheckCircle2 className="w-4 h-4 text-slate-400" />
                Voting Booth
              </NavLink>

              <NavLink to="/results" className={mobileNavLinkClass} onClick={closeMobileMenu}>
                <BarChart3 className="w-4 h-4 text-slate-400" />
                Election Results
              </NavLink>

              <NavLink to="/about" className={mobileNavLinkClass} onClick={closeMobileMenu}>
                <Info className="w-4 h-4 text-slate-400" />
                About VoteSphere
              </NavLink>

              {isAuthenticated && (
                <>
                  <NavLink to="/profile" className={mobileNavLinkClass} onClick={closeMobileMenu}>
                    <User className="w-4 h-4 text-slate-400" />
                    Voter Profile
                  </NavLink>
                  <NavLink to="/notifications" className={mobileNavLinkClass} onClick={closeMobileMenu}>
                    <Bell className="w-4 h-4 text-slate-400" />
                    Notifications {unreadCount > 0 && `(${unreadCount})`}
                  </NavLink>
                </>
              )}
            </div>

            {/* Action buttons */}
            <div className="pt-3 border-t border-slate-100">
              {isAuthenticated ? (
                <Button
                  variant="danger"
                  fullWidth
                  onClick={handleLogout}
                  leftIcon={<LogOut className="w-4 h-4" />}
                >
                  Sign Out
                </Button>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <Link to="/login" onClick={closeMobileMenu}>
                    <Button variant="outline" fullWidth size="sm">
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/register" onClick={closeMobileMenu}>
                    <Button variant="primary" fullWidth size="sm">
                      Register
                    </Button>
                  </Link>
                </div>
              )}
            </div>

          </div>
        </div>
      )}
    </header>
  );
};
