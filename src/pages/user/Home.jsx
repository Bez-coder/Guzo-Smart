import { Link } from 'react-router-dom';
import { MapPin, Clock, Navigation } from 'lucide-react';
import { ROUTES, INITIAL_BUSES, BUS_STOPS } from '../../services/mockData';

const Home = () => {
  const activeBuses = INITIAL_BUSES.filter(b => b.status === 'active').length;
  
  return (
    <div className="p-4 space-y-6 sm:p-8 bg-white min-h-full">
      {/* Hero / Search Section */}
      <section className="bg-white rounded-2xl p-6 shadow-md border border-[var(--color-guzo-yellow-100)]">
        <h2 className="text-2xl font-bold mb-4 text-[var(--color-guzo-yellow-950)]">Where are you going?</h2>
        <div className="space-y-3">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MapPin className="text-[var(--color-guzo-yellow-600)]" size={20} />
            </div>
            <input 
              type="text" 
              placeholder="Start location (e.g., Piassa)" 
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-guzo-yellow-500)] focus:border-transparent transition-all bg-gray-50 text-[var(--color-guzo-yellow-950)]"
            />
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Navigation className="text-[var(--color-guzo-yellow-800)]" size={20} />
            </div>
            <input 
              type="text" 
              placeholder="Destination (e.g., Bole)" 
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-guzo-yellow-500)] focus:border-transparent transition-all bg-gray-50 text-[var(--color-guzo-yellow-950)]"
            />
          </div>
          <Link to="/plan" className="block w-full text-center bg-[var(--color-guzo-yellow-500)] hover:bg-[var(--color-guzo-yellow-600)] text-white font-bold py-3 rounded-xl transition-colors shadow-sm">
            Find Route
          </Link>
        </div>
      </section>

      {/* Quick Stats Grid */}
      <section className="grid grid-cols-2 gap-4">
        <Link to="/map" className="bg-[var(--color-guzo-yellow-600)] text-white p-5 rounded-2xl shadow-md flex flex-col justify-between hover:brightness-110 transition-all">
          <Navigation size={28} className="mb-2 opacity-90" />
          <div>
            <p className="text-3xl font-bold">{activeBuses}</p>
            <p className="text-sm font-medium opacity-90">Active Buses</p>
          </div>
        </Link>
        <Link to="/search" className="bg-[var(--color-guzo-yellow-400)] text-[var(--color-guzo-yellow-950)] p-5 rounded-2xl shadow-md flex flex-col justify-between hover:brightness-110 transition-all">
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
          <h3 className="text-lg font-bold text-[var(--color-guzo-yellow-950)]">Nearby Stops</h3>
          <button className="text-sm text-[var(--color-guzo-yellow-800)] font-bold hover:underline">View Map</button>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-[var(--color-guzo-yellow-100)] overflow-hidden divide-y divide-[var(--color-guzo-yellow-50)]">
          {[1, 2, 3].map(stopId => {
            const stop = BUS_STOPS[stopId];
            return (
              <div key={stopId} className="p-4 flex justify-between items-center hover:bg-[var(--color-guzo-yellow-50)] transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="bg-[var(--color-guzo-yellow-100)] p-2 rounded-full">
                    <MapPin size={20} className="text-[var(--color-guzo-yellow-800)]" />
                  </div>
                  <div>
                    <p className="font-semibold text-[var(--color-guzo-yellow-950)]">{stop?.name || "Stop Name"}</p>
                    <p className="text-xs text-[var(--color-guzo-yellow-600)] font-medium">200m away</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-[var(--color-guzo-yellow-800)]">3 min</p>
                  <p className="text-xs text-[var(--color-guzo-yellow-600)] font-medium">Route 10</p>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Popular Routes */}
      <section>
        <h3 className="text-lg font-bold mb-4 text-[var(--color-guzo-yellow-950)]">Popular Routes</h3>
        <div className="space-y-3">
          {ROUTES.map((route, idx) => (
            <Link key={route.id} to={`/search?q=${route.id}`} className="bg-white p-4 rounded-2xl shadow-sm border border-[var(--color-guzo-yellow-100)] flex items-center space-x-4 hover:border-[var(--color-guzo-yellow-500)] transition-all cursor-pointer">
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center text-[var(--color-guzo-yellow-950)] font-bold text-lg"
                style={{ backgroundColor: idx % 2 === 0 ? 'var(--color-guzo-yellow-400)' : 'var(--color-guzo-yellow-500)' }}
              >
                {route.id}
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-[var(--color-guzo-yellow-950)]">{route.name}</h4>
                <p className="text-sm text-[var(--color-guzo-yellow-800)] flex items-center mt-1 font-medium">
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
