import { Users, Bus, Map as MapIcon, AlertTriangle } from 'lucide-react';
import { ROUTES, INITIAL_BUSES } from '../../services/mockData';

const StatCard = ({ title, value, icon: Icon, colorClass }) => (
  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center justify-between">
    <div>
      <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
      <h3 className="text-3xl font-bold text-gray-800">{value}</h3>
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
          colorClass="bg-blue-100 text-blue-600" 
        />
        <StatCard 
          title="Active Routes" 
          value={ROUTES.length} 
          icon={MapIcon} 
          colorClass="bg-green-100 text-green-600" 
        />
        <StatCard 
          title="Total Passengers" 
          value="12,450" 
          icon={Users} 
          colorClass="bg-purple-100 text-purple-600" 
        />
        <StatCard 
          title="Reported Delays" 
          value="3" 
          icon={AlertTriangle} 
          colorClass="bg-red-100 text-red-600" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Routes Performance */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 col-span-2 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-bold text-lg">Route Performance</h3>
            <button className="text-sm text-[var(--color-anbessa-red)] font-medium">View All</button>
          </div>
          <div className="p-0">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                  <th className="px-6 py-4 font-medium">Route</th>
                  <th className="px-6 py-4 font-medium">Active Buses</th>
                  <th className="px-6 py-4 font-medium">Avg Delay</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {ROUTES.map(route => (
                  <tr key={route.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded text-white flex items-center justify-center font-bold text-xs" style={{backgroundColor: route.color}}>
                          {route.id}
                        </div>
                        <span className="font-medium text-gray-800">{route.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {INITIAL_BUSES.filter(b => b.routeId === route.id).length}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      +2 mins
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
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
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col">
          <div className="px-6 py-5 border-b border-gray-100">
            <h3 className="font-bold text-lg">Recent Alerts</h3>
          </div>
          <div className="p-6 flex-1 overflow-y-auto space-y-4">
            <div className="flex space-x-4">
              <div className="w-2 h-2 mt-2 rounded-full bg-red-500 shrink-0"></div>
              <div>
                <p className="font-medium text-sm text-gray-800">Traffic Congestion</p>
                <p className="text-xs text-gray-500 mt-1">Heavy traffic reported near Meskel Square affecting Route R-10.</p>
                <p className="text-xs text-gray-400 mt-2">10 mins ago</p>
              </div>
            </div>
            <div className="flex space-x-4">
              <div className="w-2 h-2 mt-2 rounded-full bg-yellow-500 shrink-0"></div>
              <div>
                <p className="font-medium text-sm text-gray-800">Bus Maintenance</p>
                <p className="text-xs text-gray-500 mt-1">Bus B3 (Route R-10) marked for maintenance tonight.</p>
                <p className="text-xs text-gray-400 mt-2">1 hour ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
