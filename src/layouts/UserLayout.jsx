import { useState, useRef, useEffect } from 'react';
import { Outlet, NavLink, Link } from 'react-router-dom';
import { Home, Search, Map as MapIcon, Calendar, User, ChevronDown, LogOut } from 'lucide-react';

const NavItem = ({ to, icon: Icon, label }) => (
  <NavLink
    to={to}
    end={to === '/'}
    className={({ isActive }) =>
      `flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${
        isActive
          ? 'text-[var(--color-guzo-yellow-800)] font-bold bg-[var(--color-guzo-yellow-100)]'
          : 'text-[var(--color-guzo-yellow-700)] hover:bg-[var(--color-guzo-yellow-50)]'
      }`
    }
  >
    <Icon size={22} />
    <span className="text-xs">{label}</span>
  </NavLink>
);

const UserLayout = () => {
  const isAuthenticated = localStorage.getItem('guzo_auth') === 'true';
  const userName = localStorage.getItem('guzo_user_name') || 'User';
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('guzo_auth');
    localStorage.removeItem('guzo_user_name');
    window.location.href = '/';
  };

  return (
    <div className="flex flex-col h-screen bg-white overflow-hidden">
      {/* Top Header */}
      <header className="bg-white text-[var(--color-guzo-yellow-950)] px-4 py-3 shadow-sm flex justify-between items-center z-20 shrink-0 border-b-2 border-[var(--color-guzo-yellow-400)]">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-9 h-9 bg-[var(--color-guzo-yellow-500)] rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-sm">
            ጉ
          </div>
          <h1 className="text-xl font-bold tracking-tight hidden sm:block text-[var(--color-guzo-yellow-950)]">ጉዞ Smart</h1>
          <h1 className="text-xl font-bold tracking-tight sm:hidden text-[var(--color-guzo-yellow-950)]">ጉዞ</h1>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden sm:flex space-x-1 items-center">
          {[
            { to: '/', label: 'Home' },
            { to: '/search', label: 'Routes' },
            { to: '/map', label: 'Live Map' },
            { to: '/plan', label: 'Plan Trip' },
          ].map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${
                  isActive
                    ? 'bg-[var(--color-guzo-yellow-500)] text-white'
                    : 'text-[var(--color-guzo-yellow-950)] hover:bg-[var(--color-guzo-yellow-50)]'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>

        {/* Auth Section - Desktop */}
        <div className="hidden sm:flex items-center space-x-3">
          {isAuthenticated ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-2 bg-[var(--color-guzo-yellow-50)] border border-[var(--color-guzo-yellow-200)] rounded-xl px-3 py-2 hover:bg-[var(--color-guzo-yellow-100)] transition-colors"
              >
                <div className="w-7 h-7 bg-[var(--color-guzo-yellow-500)] rounded-full flex items-center justify-center text-white font-bold text-xs">
                  {userName.charAt(0).toUpperCase()}
                </div>
                <span className="font-bold text-sm text-[var(--color-guzo-yellow-950)]">{userName}</span>
                <ChevronDown size={16} className={`text-[var(--color-guzo-yellow-700)] transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-[var(--color-guzo-yellow-100)] overflow-hidden z-50">
                  <div className="px-4 py-3 border-b border-[var(--color-guzo-yellow-100)]">
                    <p className="text-xs text-[var(--color-guzo-yellow-700)] font-medium">Signed in as</p>
                    <p className="font-bold text-sm text-[var(--color-guzo-yellow-950)] truncate">{userName}</p>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="w-full flex items-center space-x-2 px-4 py-3 text-sm font-bold text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut size={16} />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="font-bold text-sm text-[var(--color-guzo-yellow-950)] hover:text-[var(--color-guzo-yellow-700)] transition-colors">
                Sign In
              </Link>
              <Link
                to="/signup"
                className="bg-[var(--color-guzo-yellow-500)] hover:bg-[var(--color-guzo-yellow-600)] text-white px-4 py-2 rounded-xl font-bold text-sm transition-colors shadow-sm"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Auth Icon */}
        <div className="sm:hidden">
          {isAuthenticated ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-9 h-9 bg-[var(--color-guzo-yellow-500)] rounded-full flex items-center justify-center text-white font-bold"
              >
                {userName.charAt(0).toUpperCase()}
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-lg border border-[var(--color-guzo-yellow-100)] overflow-hidden z-50">
                  <div className="px-4 py-3 border-b border-[var(--color-guzo-yellow-100)]">
                    <p className="font-bold text-sm text-[var(--color-guzo-yellow-950)] truncate">{userName}</p>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="w-full flex items-center space-x-2 px-4 py-3 text-sm font-bold text-red-600 hover:bg-red-50"
                  >
                    <LogOut size={16} />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-[var(--color-guzo-yellow-500)] text-white px-3 py-1.5 text-sm rounded-lg font-bold"
            >
              Sign In
            </Link>
          )}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto relative pb-16 sm:pb-0 w-full max-w-7xl mx-auto bg-white">
        <Outlet />
      </main>

      {/* Bottom Navigation - Mobile Only */}
      <nav className="sm:hidden fixed bottom-0 left-0 w-full h-16 bg-white border-t-2 border-[var(--color-guzo-yellow-400)] shadow-[0_-2px_10px_rgba(0,0,0,0.08)] flex z-50">
        <NavItem to="/" icon={Home} label="Home" />
        <NavItem to="/search" icon={Search} label="Routes" />
        <NavItem to="/map" icon={MapIcon} label="Map" />
        <NavItem to="/plan" icon={Calendar} label="Plan" />
      </nav>
    </div>
  );
};

export default UserLayout;
