import { Outlet, NavLink, Link } from 'react-router-dom';
import { Home, Search, Map as MapIcon, Calendar, User } from 'lucide-react';

const NavItem = ({ to, icon: Icon, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${
        isActive ? 'text-[var(--color-guzo-yellow-800)] font-bold bg-[var(--color-guzo-yellow-100)]' : 'text-[var(--color-guzo-yellow-800)] hover:bg-[var(--color-guzo-yellow-50)]'
      }`
    }
  >
    <Icon size={24} />
    <span className="text-xs">{label}</span>
  </NavLink>
);

const UserLayout = () => {
  const isAuthenticated = localStorage.getItem('guzo_auth') === 'true';

  return (
    <div className="flex flex-col h-screen bg-[var(--color-guzo-yellow-50)] overflow-hidden">
      {/* Top Header - Desktop & Mobile */}
      <header className="bg-[var(--color-guzo-yellow-400)] text-[var(--color-guzo-yellow-950)] px-4 py-3 shadow-md flex justify-between items-center z-10 shrink-0 border-b border-[var(--color-guzo-yellow-500)]">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-[var(--color-guzo-yellow-950)] rounded-full flex items-center justify-center text-[var(--color-guzo-yellow-400)] font-bold">
            ጉ
          </div>
          <h1 className="text-xl font-bold tracking-tight hidden sm:block">ጉዞ Smart</h1>
          <h1 className="text-xl font-bold tracking-tight sm:hidden">ጉዞ</h1>
        </Link>
        <div className="hidden sm:flex space-x-6 items-center">
          <NavLink to="/" className="font-semibold hover:text-[var(--color-guzo-yellow-800)]">Home</NavLink>
          <NavLink to="/search" className="font-semibold hover:text-[var(--color-guzo-yellow-800)]">Routes</NavLink>
          <NavLink to="/map" className="font-semibold hover:text-[var(--color-guzo-yellow-800)]">Live Map</NavLink>
          <NavLink to="/plan" className="font-semibold hover:text-[var(--color-guzo-yellow-800)]">Plan Trip</NavLink>
        </div>
        <div className="hidden sm:flex space-x-3 items-center border-l border-[var(--color-guzo-yellow-600)] pl-4">
          {isAuthenticated ? (
            <button 
              onClick={() => { localStorage.removeItem('guzo_auth'); window.location.reload(); }}
              className="font-bold text-[var(--color-guzo-yellow-950)] hover:underline"
            >
              Sign Out
            </button>
          ) : (
            <>
              <Link to="/login" className="font-bold text-[var(--color-guzo-yellow-950)] hover:underline">Sign In</Link>
              <Link to="/signup" className="bg-[var(--color-guzo-yellow-950)] text-[var(--color-guzo-yellow-400)] px-4 py-2 rounded-xl font-bold hover:bg-[var(--color-guzo-yellow-800)] transition-colors shadow-sm">
                Sign Up
              </Link>
            </>
          )}
        </div>
        <div className="sm:hidden flex space-x-2">
          {!isAuthenticated ? (
            <Link to="/login" className="bg-[var(--color-guzo-yellow-950)] text-[var(--color-guzo-yellow-400)] px-3 py-1.5 text-sm rounded-lg font-bold">
              Sign In
            </Link>
          ) : (
            <button className="p-2 bg-[var(--color-guzo-yellow-500)] rounded-full">
              <User size={20} />
            </button>
          )}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto relative pb-16 sm:pb-0 w-full max-w-7xl mx-auto">
        <Outlet />
      </main>

      {/* Bottom Navigation - Mobile Only */}
      <nav className="sm:hidden fixed bottom-0 left-0 w-full h-16 bg-[var(--color-guzo-yellow-400)] border-t border-[var(--color-guzo-yellow-500)] shadow-[0_-2px_10px_rgba(0,0,0,0.1)] flex z-50 pb-safe">
        <NavItem to="/" icon={Home} label="Home" />
        <NavItem to="/search" icon={Search} label="Routes" />
        <NavItem to="/map" icon={MapIcon} label="Map" />
        <NavItem to="/plan" icon={Calendar} label="Plan" />
      </nav>
    </div>
  );
};

export default UserLayout;
