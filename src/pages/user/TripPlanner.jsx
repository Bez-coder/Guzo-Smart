import { useState } from 'react';
import { MapPin, Navigation, ArrowDownUp, Clock, CreditCard, ChevronRight } from 'lucide-react';

const TripPlanner = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    setIsSearching(true);
    // Simulate API call
    setTimeout(() => {
      setResults([
        { id: 1, route: 'R-10', type: 'Direct', time: '45 mins', cost: '5 ETB', wait: '3 mins' },
        { id: 2, route: 'R-22 + R-10', type: '1 Transfer', time: '65 mins', cost: '10 ETB', wait: '10 mins' },
      ]);
      setIsSearching(false);
    }, 1500);
  };

  return (
    <div className="p-4 sm:p-8 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-[var(--color-guzo-yellow-950)]">Plan Your Trip</h2>
      
      <div className="bg-white rounded-2xl p-6 shadow-md border border-[var(--color-guzo-yellow-100)] mb-8 relative">
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MapPin className="text-[var(--color-guzo-yellow-600)]" size={20} />
            </div>
            <input 
              type="text" 
              required
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              placeholder="Origin (e.g. Megenagna)" 
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-[var(--color-guzo-yellow-100)] focus:outline-none focus:ring-2 focus:ring-[var(--color-guzo-yellow-500)] transition-all bg-[var(--color-guzo-yellow-50)] text-[var(--color-guzo-yellow-950)] placeholder-gray-400"
            />
          </div>
          
          <div className="absolute right-8 top-[3.2rem] bg-white border border-[var(--color-guzo-yellow-100)] p-2 rounded-full shadow-sm text-[var(--color-guzo-yellow-600)] hover:text-[var(--color-guzo-yellow-950)] cursor-pointer z-10 transition-colors">
            <ArrowDownUp size={16} />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Navigation className="text-[var(--color-guzo-yellow-800)]" size={20} />
            </div>
            <input 
              type="text" 
              required
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Destination (e.g. Piassa)" 
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-[var(--color-guzo-yellow-100)] focus:outline-none focus:ring-2 focus:ring-[var(--color-guzo-yellow-500)] transition-all bg-[var(--color-guzo-yellow-50)] text-[var(--color-guzo-yellow-950)] placeholder-gray-400"
            />
          </div>

          <button 
            type="submit" 
            disabled={isSearching}
            className="w-full bg-[var(--color-guzo-yellow-950)] hover:bg-[var(--color-guzo-yellow-800)] text-[var(--color-guzo-yellow-400)] font-bold py-3 rounded-xl transition-colors shadow-md mt-2 flex justify-center items-center"
          >
            {isSearching ? (
              <span className="flex items-center"><Navigation className="animate-spin mr-2" size={20} /> Searching...</span>
            ) : (
              'Find Best Route'
            )}
          </button>
        </form>
      </div>

      {results && (
        <div className="space-y-4 animate-fade-in">
          <h3 className="font-bold text-lg mb-4 text-[var(--color-guzo-yellow-950)]">Suggested Routes</h3>
          {results.map((res, idx) => (
            <div key={res.id} className={`bg-white rounded-2xl p-5 border shadow-sm transition-all cursor-pointer ${idx === 0 ? 'border-[var(--color-guzo-yellow-500)] ring-1 ring-[var(--color-guzo-yellow-500)]' : 'border-[var(--color-guzo-yellow-100)] hover:border-[var(--color-guzo-yellow-400)]'}`}>
              {idx === 0 && (
                <div className="text-xs font-bold text-[var(--color-guzo-yellow-600)] uppercase tracking-wider mb-2">Recommended &bull; Fastest</div>
              )}
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-2">
                  <div className="bg-[var(--color-guzo-yellow-800)] text-white px-3 py-1 rounded-lg font-bold text-sm">
                    {res.route}
                  </div>
                  <span className="text-sm font-bold text-[var(--color-guzo-yellow-800)] bg-[var(--color-guzo-yellow-100)] px-2 py-1 rounded-md">{res.type}</span>
                </div>
                <div className="text-right">
                  <div className="font-bold text-lg text-[var(--color-guzo-yellow-950)]">{res.time}</div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 py-3 border-t border-[var(--color-guzo-yellow-50)] text-sm">
                <div className="flex items-center font-medium text-[var(--color-guzo-yellow-800)]">
                  <Clock size={16} className="mr-2 text-[var(--color-guzo-yellow-600)]" /> Wait: {res.wait}
                </div>
                <div className="flex items-center font-medium text-[var(--color-guzo-yellow-800)]">
                  <CreditCard size={16} className="mr-2 text-[var(--color-guzo-yellow-600)]" /> {res.cost}
                </div>
              </div>
              
              <button className="w-full mt-2 py-2 flex items-center justify-center text-[var(--color-guzo-yellow-950)] font-bold hover:bg-[var(--color-guzo-yellow-100)] rounded-lg transition-colors">
                View Turn-by-Turn Directions <ChevronRight size={18} className="ml-1" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TripPlanner;
