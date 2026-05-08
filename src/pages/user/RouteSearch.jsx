import { useState } from 'react';
import { Search, Map as MapIcon, ChevronRight } from 'lucide-react';
import { ROUTES, BUS_STOPS } from '../../services/mockData';
import { Link } from 'react-router-dom';

const RouteSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRoutes = ROUTES.filter(route => 
    route.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    route.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-8 max-w-3xl mx-auto space-y-6">
      <div className="bg-white sticky top-0 z-10 pt-4 pb-2 border-b border-gray-100 mb-6">
        <h2 className="text-2xl font-bold mb-4">Find a Route</h2>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="text-gray-400" size={20} />
          </div>
          <input 
            type="text" 
            placeholder="Search by route number or name..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-anbessa-yellow)] transition-all bg-gray-50"
          />
        </div>
      </div>

      <div className="space-y-4">
        {filteredRoutes.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            <p>No routes found matching "{searchTerm}"</p>
          </div>
        ) : (
          filteredRoutes.map(route => (
            <div key={route.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-4 border-b border-gray-50 flex justify-between items-center bg-gray-50">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold"
                    style={{ backgroundColor: route.color }}
                  >
                    {route.id}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{route.name}</h3>
                    <p className="text-sm text-gray-500">Avg. time: {route.estimatedTime} mins</p>
                  </div>
                </div>
                <Link to={`/map?route=${route.id}`} className="p-2 text-[var(--color-anbessa-red)] hover:bg-red-50 rounded-full transition-colors">
                  <MapIcon size={20} />
                </Link>
              </div>
              <div className="p-4">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Bus Stops Sequence</p>
                <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-hide">
                  {route.stops.map((stopId, idx) => (
                    <div key={stopId} className="flex items-center shrink-0">
                      <div className="flex flex-col items-center">
                        <div className="w-2 h-2 rounded-full bg-[var(--color-anbessa-yellow-dark)]"></div>
                        <span className="text-xs mt-1 font-medium">{BUS_STOPS[stopId]?.name}</span>
                      </div>
                      {idx < route.stops.length - 1 && (
                        <div className="w-8 h-[2px] bg-gray-200 mx-2 -mt-4"></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="px-4 py-3 bg-gray-50 flex justify-between items-center text-sm">
                <span className="text-[var(--color-bus-green)] font-medium">Buses Active: {Math.floor(Math.random() * 5) + 1}</span>
                <button className="flex items-center text-[var(--color-anbessa-red)] font-semibold hover:underline">
                  Route Details <ChevronRight size={16} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RouteSearch;
