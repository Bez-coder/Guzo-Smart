import { useState } from 'react';
import { Plus, Edit, Trash2, CheckCircle, XCircle } from 'lucide-react';
import { INITIAL_BUSES, ROUTES } from '../../services/mockData';

const AdminBuses = () => {
  const [buses, setBuses] = useState(INITIAL_BUSES);
  const [showForm, setShowForm] = useState(false);

  const handleDelete = (id) => setBuses(buses.filter(b => b.id !== id));

  const toggleStatus = (id) => {
    setBuses(buses.map(b =>
      b.id === id ? { ...b, status: b.status === 'active' ? 'inactive' : 'active' } : b
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[var(--color-guzo-yellow-950)]">Bus Management</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center space-x-2 bg-[var(--color-guzo-yellow-500)] hover:bg-[var(--color-guzo-yellow-600)] text-white font-bold px-4 py-2.5 rounded-xl shadow-sm transition-colors"
        >
          <Plus size={18} />
          <span>Add Bus</span>
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-2xl p-6 border border-[var(--color-guzo-yellow-200)] shadow-sm space-y-4">
          <h3 className="font-bold text-lg text-[var(--color-guzo-yellow-950)]">Add New Bus</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-[var(--color-guzo-yellow-950)] mb-1">Bus ID</label>
              <input type="text" placeholder="e.g. B6" className="w-full px-4 py-2.5 rounded-xl border border-[var(--color-guzo-yellow-200)] focus:outline-none focus:ring-2 focus:ring-[var(--color-guzo-yellow-400)] bg-[var(--color-guzo-yellow-50)] text-[var(--color-guzo-yellow-950)]" />
            </div>
            <div>
              <label className="block text-sm font-bold text-[var(--color-guzo-yellow-950)] mb-1">Assign Route</label>
              <select className="w-full px-4 py-2.5 rounded-xl border border-[var(--color-guzo-yellow-200)] focus:outline-none focus:ring-2 focus:ring-[var(--color-guzo-yellow-400)] bg-[var(--color-guzo-yellow-50)] text-[var(--color-guzo-yellow-950)]">
                <option>-- Select Route --</option>
                {ROUTES.map(r => <option key={r.id}>{r.id} - {r.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-[var(--color-guzo-yellow-950)] mb-1">Capacity</label>
              <input type="number" placeholder="e.g. 60" className="w-full px-4 py-2.5 rounded-xl border border-[var(--color-guzo-yellow-200)] focus:outline-none focus:ring-2 focus:ring-[var(--color-guzo-yellow-400)] bg-[var(--color-guzo-yellow-50)] text-[var(--color-guzo-yellow-950)]" />
            </div>
          </div>
          <div className="flex justify-end space-x-3 pt-2">
            <button onClick={() => setShowForm(false)} className="px-4 py-2 rounded-xl border border-[var(--color-guzo-yellow-200)] font-bold text-[var(--color-guzo-yellow-950)] hover:bg-[var(--color-guzo-yellow-50)] transition-colors">Cancel</button>
            <button className="px-4 py-2 bg-[var(--color-guzo-yellow-500)] hover:bg-[var(--color-guzo-yellow-600)] text-white font-bold rounded-xl transition-colors">Save Bus</button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-[var(--color-guzo-yellow-100)] overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[var(--color-guzo-yellow-50)] text-[var(--color-guzo-yellow-800)] text-xs uppercase tracking-wider font-bold">
              <th className="px-6 py-4">Bus ID</th>
              <th className="px-6 py-4">Route</th>
              <th className="px-6 py-4">Occupancy</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--color-guzo-yellow-100)]">
            {buses.map(bus => (
              <tr key={bus.id} className="hover:bg-[var(--color-guzo-yellow-50)] transition-colors">
                <td className="px-6 py-4 font-bold text-[var(--color-guzo-yellow-950)]">Bus {bus.id}</td>
                <td className="px-6 py-4">
                  <span className="bg-[var(--color-guzo-yellow-100)] text-[var(--color-guzo-yellow-950)] font-bold px-2 py-1 rounded-lg text-sm">{bus.routeId}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-[var(--color-guzo-yellow-100)] rounded-full h-2 w-24">
                      <div
                        className="bg-[var(--color-guzo-yellow-500)] h-2 rounded-full"
                        style={{ width: `${(bus.passengers / bus.capacity) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-[var(--color-guzo-yellow-950)]">{bus.passengers}/{bus.capacity}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <button onClick={() => toggleStatus(bus.id)} className="flex items-center space-x-1">
                    {bus.status === 'active'
                      ? <><CheckCircle size={16} className="text-green-500" /><span className="text-xs font-bold text-green-700">Active</span></>
                      : <><XCircle size={16} className="text-gray-400" /><span className="text-xs font-bold text-gray-500">Inactive</span></>
                    }
                  </button>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-[var(--color-guzo-yellow-700)] hover:bg-[var(--color-guzo-yellow-100)] rounded-lg transition-colors"><Edit size={16} /></button>
                    <button onClick={() => handleDelete(bus.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={16} /></button>
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

export default AdminBuses;
