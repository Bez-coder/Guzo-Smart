import { Outlet, NavLink } from 'react-router-dom';
import { LayoutDashboard, Bus, Map, Calendar, LogOut } from 'lucide-react';

const AdminLayout = () => {
  return (
    <div className="flex h-screen bg-[var(--color-guzo-yellow-50)] overflow-hidden font-sans">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-[var(--color-guzo-yellow-950)] text-[var(--color-guzo-yellow-50)] flex flex-col transition-all duration-300">
        <div className="p-6 border-b border-[var(--color-guzo-yellow-800)]">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-[var(--color-guzo-yellow-400)] rounded-lg flex items-center justify-center font-bold text-[var(--color-guzo-yellow-950)] text-xl">
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
            <li>
              <NavLink to="/admin" end className={({isActive}) => `flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${isActive ? 'bg-[var(--color-guzo-yellow-400)] text-[var(--color-guzo-yellow-950)]' : 'text-[var(--color-guzo-yellow-100)] hover:bg-[var(--color-guzo-yellow-800)] hover:text-white'}`}>
                <LayoutDashboard size={20} />
                <span className="font-bold">Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/buses" className={({isActive}) => `flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${isActive ? 'bg-[var(--color-guzo-yellow-400)] text-[var(--color-guzo-yellow-950)]' : 'text-[var(--color-guzo-yellow-100)] hover:bg-[var(--color-guzo-yellow-800)] hover:text-white'}`}>
                <Bus size={20} />
                <span className="font-bold">Buses</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/routes" className={({isActive}) => `flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${isActive ? 'bg-[var(--color-guzo-yellow-400)] text-[var(--color-guzo-yellow-950)]' : 'text-[var(--color-guzo-yellow-100)] hover:bg-[var(--color-guzo-yellow-800)] hover:text-white'}`}>
                <Map size={20} />
                <span className="font-bold">Routes</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/schedules" className={({isActive}) => `flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${isActive ? 'bg-[var(--color-guzo-yellow-400)] text-[var(--color-guzo-yellow-950)]' : 'text-[var(--color-guzo-yellow-100)] hover:bg-[var(--color-guzo-yellow-800)] hover:text-white'}`}>
                <Calendar size={20} />
                <span className="font-bold">Schedules</span>
              </NavLink>
            </li>
          </ul>
        </nav>
        
        <div className="p-4 border-t border-[var(--color-guzo-yellow-800)]">
          <button className="flex items-center space-x-3 text-[var(--color-guzo-yellow-100)] hover:text-white w-full px-4 py-3 rounded-xl hover:bg-[var(--color-guzo-yellow-800)] transition-colors">
            <LogOut size={20} />
            <span className="font-bold">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="bg-white shadow-sm px-8 py-4 flex justify-between items-center z-10 shrink-0 border-b border-[var(--color-guzo-yellow-100)]">
          <h2 className="text-xl font-bold text-[var(--color-guzo-yellow-950)]">Overview</h2>
          <div className="flex items-center space-x-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-[var(--color-guzo-yellow-950)]">Admin User</p>
              <p className="text-xs text-[var(--color-guzo-yellow-600)]">System Administrator</p>
            </div>
            <div className="w-10 h-10 bg-[var(--color-guzo-yellow-400)] rounded-full border-2 border-white shadow-sm flex items-center justify-center font-bold text-[var(--color-guzo-yellow-950)]">
              AU
            </div>
          </div>
        </header>
        
        <div className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
