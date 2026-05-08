import { useState } from 'react';
import { Plus, Clock, Trash2 } from 'lucide-react';
import { ROUTES, BUS_STOPS } from '../../services/mockData';

const mockSchedules = [
  { id: 1, routeId: 'R-10', stopId: 1, departure: '06:00', frequency: '20 mins' },
  { id: 2, routeId: 'R-10', stopId: 5, departure: '06:45', frequency: '20 mins' },
  { id: 3, routeId: 'R-22', stopId: 6, departure: '06:30', frequency: '15 mins' },
  { id: 4, routeId: 'R-22', stopId: 9, departure: '07:00', frequency: '15 mins' },
];

const AdminSchedules = () => {
  const [schedules, setSchedules] = useState(mockSchedules);
  const [showForm, setShowForm] = useState(false);

  const handleDelete = (id) => setSchedules(schedules.filter(s => s.id !== id));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[var(--color-guzo-yellow-950)]">Schedule Management</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center space-x-2 bg-[var(--color-guzo-yellow-500)] hover:bg-[var(--color-guzo-yellow-600)] text-white font-bold px-4 py-2.5 rounded-xl shadow-sm transition-colors"
        >
          <Plus size={18} />
          <span>Add Schedule</span>
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-2xl p-6 border border-[var(--color-guzo-yellow-200)] shadow-sm space-y-4">
          <h3 className="font-bold text-lg text-[var(--color-guzo-yellow-950)]">Add Departure Schedule</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-bold text-[var(--color-guzo-yellow-950)] mb-1">Route</label>
              <select className="w-full px-4 py-2.5 rounded-xl border border-[var(--color-guzo-yellow-200)] focus:outline-none focus:ring-2 focus:ring-[var(--color-guzo-yellow-400)] bg-[var(--color-guzo-yellow-50)] text-[var(--color-guzo-yellow-950)]">
                {ROUTES.map(r => <option key={r.id}>{r.id} - {r.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-[var(--color-guzo-yellow-950)] mb-1">Departure Stop</label>
              <select className="w-full px-4 py-2.5 rounded-xl border border-[var(--color-guzo-yellow-200)] focus:outline-none focus:ring-2 focus:ring-[var(--color-guzo-yellow-400)] bg-[var(--color-guzo-yellow-50)] text-[var(--color-guzo-yellow-950)]">
                {Object.values(BUS_STOPS).map(s => <option key={s.id}>{s.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-[var(--color-guzo-yellow-950)] mb-1">First Departure</label>
              <input type="time" className="w-full px-4 py-2.5 rounded-xl border border-[var(--color-guzo-yellow-200)] focus:outline-none focus:ring-2 focus:ring-[var(--color-guzo-yellow-400)] bg-[var(--color-guzo-yellow-50)] text-[var(--color-guzo-yellow-950)]" />
            </div>
          </div>
          <div className="flex justify-end space-x-3 pt-2">
            <button onClick={() => setShowForm(false)} className="px-4 py-2 rounded-xl border border-[var(--color-guzo-yellow-200)] font-bold text-[var(--color-guzo-yellow-950)] hover:bg-[var(--color-guzo-yellow-50)] transition-colors">Cancel</button>
            <button className="px-4 py-2 bg-[var(--color-guzo-yellow-500)] hover:bg-[var(--color-guzo-yellow-600)] text-white font-bold rounded-xl transition-colors">Save Schedule</button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-[var(--color-guzo-yellow-100)] overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[var(--color-guzo-yellow-50)] text-[var(--color-guzo-yellow-800)] text-xs uppercase tracking-wider font-bold">
              <th className="px-6 py-4">Route</th>
              <th className="px-6 py-4">Stop</th>
              <th className="px-6 py-4">First Departure</th>
              <th className="px-6 py-4">Frequency</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--color-guzo-yellow-100)]">
            {schedules.map(s => (
              <tr key={s.id} className="hover:bg-[var(--color-guzo-yellow-50)] transition-colors">
                <td className="px-6 py-4">
                  <span className="bg-[var(--color-guzo-yellow-100)] text-[var(--color-guzo-yellow-950)] font-bold px-2 py-1 rounded-lg text-sm">{s.routeId}</span>
                </td>
                <td className="px-6 py-4 font-medium text-[var(--color-guzo-yellow-950)]">{BUS_STOPS[s.stopId]?.name}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2 font-bold text-[var(--color-guzo-yellow-950)]">
                    <Clock size={16} className="text-[var(--color-guzo-yellow-600)]" />
                    <span>{s.departure}</span>
                  </div>
                </td>
                <td className="px-6 py-4 font-medium text-[var(--color-guzo-yellow-800)]">Every {s.frequency}</td>
                <td className="px-6 py-4">
                  <button onClick={() => handleDelete(s.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminSchedules;
