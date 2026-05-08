import { useState } from 'react';
import { Plus, Edit, Trash2, MapPin } from 'lucide-react';
import { ROUTES, BUS_STOPS } from '../../services/mockData';

const AdminRoutes = () => {
  const [routes, setRoutes] = useState(ROUTES);
  const [showForm, setShowForm] = useState(false);

  const handleDelete = (id) => {
    setRoutes(routes.filter(r => r.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[var(--color-guzo-yellow-950)]">Route Management</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center space-x-2 bg-[var(--color-guzo-yellow-500)] hover:bg-[var(--color-guzo-yellow-600)] text-white font-bold px-4 py-2.5 rounded-xl shadow-sm transition-colors"
        >
          <Plus size={18} />
          <span>Add Route</span>
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-2xl p-6 border border-[var(--color-guzo-yellow-200)] shadow-sm space-y-4">
          <h3 className="font-bold text-lg text-[var(--color-guzo-yellow-950)]">Add New Route</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-[var(--color-guzo-yellow-950)] mb-1">Route ID</label>
              <input type="text" placeholder="e.g. R-35" className="w-full px-4 py-2.5 rounded-xl border border-[var(--color-guzo-yellow-200)] focus:outline-none focus:ring-2 focus:ring-[var(--color-guzo-yellow-400)] bg-[var(--color-guzo-yellow-50)] text-[var(--color-guzo-yellow-950)]" />
            </div>
            <div>
              <label className="block text-sm font-bold text-[var(--color-guzo-yellow-950)] mb-1">Route Name</label>
              <input type="text" placeholder="e.g. Bole - Gotera" className="w-full px-4 py-2.5 rounded-xl border border-[var(--color-guzo-yellow-200)] focus:outline-none focus:ring-2 focus:ring-[var(--color-guzo-yellow-400)] bg-[var(--color-guzo-yellow-50)] text-[var(--color-guzo-yellow-950)]" />
            </div>
            <div>
              <label className="block text-sm font-bold text-[var(--color-guzo-yellow-950)] mb-1">Est. Time (mins)</label>
              <input type="number" placeholder="e.g. 35" className="w-full px-4 py-2.5 rounded-xl border border-[var(--color-guzo-yellow-200)] focus:outline-none focus:ring-2 focus:ring-[var(--color-guzo-yellow-400)] bg-[var(--color-guzo-yellow-50)] text-[var(--color-guzo-yellow-950)]" />
            </div>
            <div>
              <label className="block text-sm font-bold text-[var(--color-guzo-yellow-950)] mb-1">Assign Bus</label>
              <select className="w-full px-4 py-2.5 rounded-xl border border-[var(--color-guzo-yellow-200)] focus:outline-none focus:ring-2 focus:ring-[var(--color-guzo-yellow-400)] bg-[var(--color-guzo-yellow-50)] text-[var(--color-guzo-yellow-950)]">
                <option>-- Select Bus --</option>
                <option>Bus B6</option>
                <option>Bus B7</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end space-x-3 pt-2">
            <button onClick={() => setShowForm(false)} className="px-4 py-2 rounded-xl border border-[var(--color-guzo-yellow-200)] font-bold text-[var(--color-guzo-yellow-950)] hover:bg-[var(--color-guzo-yellow-50)] transition-colors">Cancel</button>
            <button className="px-4 py-2 bg-[var(--color-guzo-yellow-500)] hover:bg-[var(--color-guzo-yellow-600)] text-white font-bold rounded-xl transition-colors">Save Route</button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-[var(--color-guzo-yellow-100)] overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[var(--color-guzo-yellow-50)] text-[var(--color-guzo-yellow-800)] text-xs uppercase tracking-wider font-bold">
              <th className="px-6 py-4">Route</th>
              <th className="px-6 py-4">Stops</th>
              <th className="px-6 py-4">Duration</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--color-guzo-yellow-100)]">
            {routes.map((route, idx) => (
              <tr key={route.id} className="hover:bg-[var(--color-guzo-yellow-50)] transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm text-[var(--color-guzo-yellow-950)]" style={{ backgroundColor: route.color }}>
                      {route.id}
                    </div>
                    <span className="font-bold text-[var(--color-guzo-yellow-950)]">{route.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-1 flex-wrap gap-y-1">
                    {route.stops.map(id => (
                      <span key={id} className="text-xs bg-[var(--color-guzo-yellow-100)] text-[var(--color-guzo-yellow-800)] px-2 py-0.5 rounded-full font-medium flex items-center">
                        <MapPin size={10} className="mr-1" />{BUS_STOPS[id]?.name}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 font-medium text-[var(--color-guzo-yellow-950)]">{route.estimatedTime} mins</td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-[var(--color-guzo-yellow-700)] hover:bg-[var(--color-guzo-yellow-100)] rounded-lg transition-colors">
                      <Edit size={16} />
                    </button>
                    <button onClick={() => handleDelete(route.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminRoutes;
