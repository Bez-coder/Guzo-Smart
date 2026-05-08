import { Outlet, NavLink } from 'react-router-dom';
import { Home, Search, Map as MapIcon, Calendar, User } from 'lucide-react';

const NavItem = ({ to, icon: Icon, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${
        isActive ? 'text-[var(--color-anbessa-red)] font-semibold' : 'text-gray-500 hover:text-gray-800'
      }`
    }
  >
    <Icon size={24} />
    <span className="text-xs">{label}</span>
  </NavLink>
);

const UserLayout = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-50 overflow-hidden">
      {/* Top Header - Desktop & Mobile */}
      <header className="bg-[var(--color-anbessa-yellow)] text-[var(--color-charcoal)] px-4 py-3 shadow-md flex justify-between items-center z-10 shrink-0">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-[var(--color-anbessa-red)] rounded-full flex items-center justify-center text-white font-bold">
            A
          </div>
          <h1 className="text-xl font-bold tracking-tight hidden sm:block">Addis Bus Tracker</h1>
          <h1 className="text-xl font-bold tracking-tight sm:hidden">AddisBus</h1>
        </div>
        <div className="hidden sm:flex space-x-6">
          <NavLink to="/" className="font-medium hover:text-[var(--color-anbessa-red)]">Home</NavLink>
          <NavLink to="/search" className="font-medium hover:text-[var(--color-anbessa-red)]">Routes</NavLink>
          <NavLink to="/map" className="font-medium hover:text-[var(--color-anbessa-red)]">Live Map</NavLink>
          <NavLink to="/plan" className="font-medium hover:text-[var(--color-anbessa-red)]">Plan Trip</NavLink>
        </div>
        <button className="sm:hidden p-2">
          <User size={24} />
        </button>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto relative pb-16 sm:pb-0 w-full max-w-7xl mx-auto">
        <Outlet />
      </main>

      {/* Bottom Navigation - Mobile Only */}
      <nav className="sm:hidden fixed bottom-0 left-0 w-full h-16 bg-white border-t border-gray-200 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] flex z-50 pb-safe">
        <NavItem to="/" icon={Home} label="Home" />
        <NavItem to="/search" icon={Search} label="Routes" />
        <NavItem to="/map" icon={MapIcon} label="Map" />
        <NavItem to="/plan" icon={Calendar} label="Plan" />
      </nav>
    </div>
  );
};

export default UserLayout;
