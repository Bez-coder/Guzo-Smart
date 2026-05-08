import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, Bus, Map, Calendar, LogOut } from 'lucide-react';

const AdminLayout = () => {
  const location = useLocation();
  const titles = {
    '/admin': 'Overview',
    '/admin/buses': 'Bus Management',
    '/admin/routes': 'Route Management',
    '/admin/schedules': 'Schedule Management',
  };
  const pageTitle = titles[location.pathname] || 'Admin';

  return (
    <div className="flex h-screen bg-white overflow-hidden font-sans">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-[var(--color-guzo-yellow-950)] text-[var(--color-guzo-yellow-50)] flex flex-col shrink-0">
        <div className="p-6 border-b border-[var(--color-guzo-yellow-800)]">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-[var(--color-guzo-yellow-500)] rounded-lg flex items-center justify-center font-bold text-white text-xl">
              ጉ
            </div>
            <div>
              <h1 className="font-bold text-lg tracking-tight leading-tight">Admin Portal</h1>
              <p className="text-xs text-[var(--color-guzo-yellow-400)]">ጉዞ Smart</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-3">
            {[
              { to: '/admin', icon: LayoutDashboard, label: 'Dashboard', end: true },
              { to: '/admin/buses', icon: Bus, label: 'Buses', end: false },
              { to: '/admin/routes', icon: Map, label: 'Routes', end: false },
              { to: '/admin/schedules', icon: Calendar, label: 'Schedules', end: false },
            ].map(({ to, icon: Icon, label, end }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={end}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors font-bold ${
                      isActive
                        ? 'bg-[var(--color-guzo-yellow-500)] text-white'
                        : 'text-[var(--color-guzo-yellow-100)] hover:bg-[var(--color-guzo-yellow-800)]'
                    }`
                  }
                >
                  <Icon size={20} />
                  <span>{label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-[var(--color-guzo-yellow-800)]">
          <button className="flex items-center space-x-3 text-[var(--color-guzo-yellow-100)] hover:text-white w-full px-4 py-3 rounded-xl hover:bg-[var(--color-guzo-yellow-800)] transition-colors font-bold">
            <LogOut size={20} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="bg-white border-b-2 border-[var(--color-guzo-yellow-400)] px-8 py-4 flex justify-between items-center z-10 shrink-0 shadow-sm">
          <h2 className="text-xl font-bold text-[var(--color-guzo-yellow-950)]">{pageTitle}</h2>
          <div className="flex items-center space-x-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-[var(--color-guzo-yellow-950)]">Admin User</p>
              <p className="text-xs text-[var(--color-guzo-yellow-600)]">System Administrator</p>
            </div>
            <div className="w-10 h-10 bg-[var(--color-guzo-yellow-500)] rounded-full border-2 border-white shadow-sm flex items-center justify-center font-bold text-white">
              AU
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 bg-white">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
