import { Link } from 'react-router-dom';
import { Search, MapPin, Clock, Navigation } from 'lucide-react';
import { ROUTES, INITIAL_BUSES, BUS_STOPS } from '../../services/mockData';

const Home = () => {
  const activeBuses = INITIAL_BUSES.filter(b => b.status === 'active').length;
  
  return (
    <div className="p-4 space-y-6 sm:p-8">
      {/* Hero / Search Section */}
      <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold mb-4">Where are you going?</h2>
        <div className="space-y-3">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MapPin className="text-gray-400" size={20} />
            </div>
            <input 
              type="text" 
              placeholder="Start location (e.g., Piassa)" 
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-anbessa-yellow)] focus:border-transparent transition-all bg-gray-50"
            />
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Navigation className="text-[var(--color-anbessa-red)]" size={20} />
            </div>
            <input 
              type="text" 
              placeholder="Destination (e.g., Bole)" 
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-anbessa-yellow)] focus:border-transparent transition-all bg-gray-50"
            />
          </div>
          <Link to="/plan" className="block w-full text-center bg-[var(--color-anbessa-red)] hover:bg-[var(--color-anbessa-red-dark)] text-white font-bold py-3 rounded-xl transition-colors shadow-md">
            Find Route
          </Link>
        </div>
      </section>

      {/* Quick Stats Grid */}
      <section className="grid grid-cols-2 gap-4">
        <Link to="/map" className="bg-[var(--color-bus-blue)] text-white p-4 rounded-2xl shadow-sm flex flex-col justify-between hover:brightness-110 transition-all">
          <Navigation size={28} className="mb-2 opacity-80" />
          <div>
            <p className="text-3xl font-bold">{activeBuses}</p>
            <p className="text-sm font-medium opacity-90">Active Buses</p>
          </div>
        </Link>
        <Link to="/search" className="bg-[var(--color-anbessa-yellow)] text-[var(--color-charcoal)] p-4 rounded-2xl shadow-sm flex flex-col justify-between hover:brightness-110 transition-all">
          <MapPin size={28} className="mb-2 opacity-80" />
          <div>
            <p className="text-3xl font-bold">{ROUTES.length}</p>
            <p className="text-sm font-medium opacity-90">City Routes</p>
          </div>
        </Link>
      </section>

      {/* Nearby Stops */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">Nearby Stops</h3>
          <button className="text-sm text-[var(--color-anbessa-red)] font-medium">View Map</button>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden divide-y divide-gray-100">
          {[1, 2, 3].map(stopId => {
            const stop = BUS_STOPS[stopId];
            return (
              <div key={stopId} className="p-4 flex justify-between items-center hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="bg-gray-100 p-2 rounded-full">
                    <MapPin size={20} className="text-[var(--color-bus-green)]" />
                  </div>
                  <div>
                    <p className="font-semibold">{stop?.name || "Stop Name"}</p>
                    <p className="text-xs text-gray-500">200m away</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-[var(--color-anbessa-red)]">3 min</p>
                  <p className="text-xs text-gray-500">Route 10</p>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Popular Routes */}
      <section>
        <h3 className="text-lg font-bold mb-4">Popular Routes</h3>
        <div className="space-y-3">
          {ROUTES.map(route => (
            <Link key={route.id} to={`/search?q=${route.id}`} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4 hover:border-[var(--color-anbessa-yellow)] transition-all cursor-pointer">
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg"
                style={{ backgroundColor: route.color }}
              >
                {route.id}
              </div>
              <div className="flex-1">
                <h4 className="font-bold">{route.name}</h4>
                <p className="text-sm text-gray-500 flex items-center mt-1">
                  <Clock size={14} className="mr-1" /> {route.estimatedTime} mins average
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
