import { Users, Bus, Map as MapIcon, AlertTriangle } from 'lucide-react';
import { ROUTES, INITIAL_BUSES } from '../../services/mockData';

const StatCard = ({ title, value, icon: Icon, colorClass }) => (
  <div className="bg-white rounded-2xl p-6 shadow-sm border border-[var(--color-guzo-yellow-100)] flex items-center justify-between">
    <div>
      <p className="text-sm font-bold text-[var(--color-guzo-yellow-800)] mb-1">{title}</p>
      <h3 className="text-3xl font-bold text-[var(--color-guzo-yellow-950)]">{value}</h3>
    </div>
    <div className={`w-14 h-14 rounded-full flex items-center justify-center ${colorClass}`}>
      <Icon size={24} />
    </div>
  </div>
);

const AdminDashboard = () => {
  const activeBuses = INITIAL_BUSES.filter(b => b.status === 'active').length;
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Active Buses" 
          value={activeBuses} 
          icon={Bus} 
          colorClass="bg-[var(--color-guzo-yellow-100)] text-[var(--color-guzo-yellow-800)]" 
        />
        <StatCard 
          title="Active Routes" 
          value={ROUTES.length} 
          icon={MapIcon} 
          colorClass="bg-[var(--color-guzo-yellow-400)] text-[var(--color-guzo-yellow-950)]" 
        />
        <StatCard 
          title="Total Passengers" 
          value="12,450" 
          icon={Users} 
          colorClass="bg-[var(--color-guzo-yellow-500)] text-[var(--color-guzo-yellow-950)]" 
        />
        <StatCard 
          title="Reported Delays" 
          value="3" 
          icon={AlertTriangle} 
          colorClass="bg-[var(--color-guzo-yellow-800)] text-[var(--color-guzo-yellow-100)]" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Routes Performance */}
        <div className="bg-white rounded-2xl shadow-sm border border-[var(--color-guzo-yellow-100)] col-span-2 overflow-hidden">
          <div className="px-6 py-5 border-b border-[var(--color-guzo-yellow-100)] flex justify-between items-center">
            <h3 className="font-bold text-lg text-[var(--color-guzo-yellow-950)]">Route Performance</h3>
            <button className="text-sm text-[var(--color-guzo-yellow-800)] font-bold hover:underline">View All</button>
          </div>
          <div className="p-0">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[var(--color-guzo-yellow-50)] text-[var(--color-guzo-yellow-800)] text-xs uppercase tracking-wider font-bold">
                  <th className="px-6 py-4">Route</th>
                  <th className="px-6 py-4">Active Buses</th>
                  <th className="px-6 py-4">Avg Delay</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-guzo-yellow-100)]">
                {ROUTES.map((route, idx) => (
                  <tr key={route.id} className="hover:bg-[var(--color-guzo-yellow-50)] transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded text-[var(--color-guzo-yellow-950)] flex items-center justify-center font-bold text-xs" style={{backgroundColor: idx % 2 === 0 ? 'var(--color-guzo-yellow-400)' : 'var(--color-guzo-yellow-500)'}}>
                          {route.id}
                        </div>
                        <span className="font-bold text-[var(--color-guzo-yellow-950)]">{route.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-[var(--color-guzo-yellow-800)]">
                      {INITIAL_BUSES.filter(b => b.routeId === route.id).length}
                    </td>
                    <td className="px-6 py-4 font-medium text-[var(--color-guzo-yellow-800)]">
                      +2 mins
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-[var(--color-guzo-yellow-100)] text-[var(--color-guzo-yellow-800)]">
                        On Time
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Alerts */}
        <div className="bg-white rounded-2xl shadow-sm border border-[var(--color-guzo-yellow-100)] flex flex-col">
          <div className="px-6 py-5 border-b border-[var(--color-guzo-yellow-100)]">
            <h3 className="font-bold text-lg text-[var(--color-guzo-yellow-950)]">Recent Alerts</h3>
          </div>
          <div className="p-6 flex-1 overflow-y-auto space-y-4">
            <div className="flex space-x-4">
              <div className="w-2 h-2 mt-2 rounded-full bg-[var(--color-guzo-yellow-800)] shrink-0"></div>
              <div>
                <p className="font-bold text-sm text-[var(--color-guzo-yellow-950)]">Traffic Congestion</p>
                <p className="text-xs text-[var(--color-guzo-yellow-800)] mt-1 font-medium">Heavy traffic reported near Meskel Square affecting Route R-10.</p>
                <p className="text-xs text-[var(--color-guzo-yellow-600)] mt-2 font-bold">10 mins ago</p>
              </div>
            </div>
            <div className="flex space-x-4">
              <div className="w-2 h-2 mt-2 rounded-full bg-[var(--color-guzo-yellow-500)] shrink-0"></div>
              <div>
                <p className="font-bold text-sm text-[var(--color-guzo-yellow-950)]">Bus Maintenance</p>
                <p className="text-xs text-[var(--color-guzo-yellow-800)] mt-1 font-medium">Bus B3 (Route R-10) marked for maintenance tonight.</p>
                <p className="text-xs text-[var(--color-guzo-yellow-600)] mt-2 font-bold">1 hour ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
