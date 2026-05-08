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
      <h2 className="text-2xl font-bold mb-6">Plan Your Trip</h2>
      
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8 relative">
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MapPin className="text-gray-400" size={20} />
            </div>
            <input 
              type="text" 
              required
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              placeholder="Origin (e.g. Megenagna)" 
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-anbessa-yellow)] transition-all bg-gray-50"
            />
          </div>
          
          <div className="absolute right-8 top-[3.2rem] bg-white border border-gray-200 p-2 rounded-full shadow-sm text-gray-500 hover:text-[var(--color-anbessa-red)] cursor-pointer z-10">
            <ArrowDownUp size={16} />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Navigation className="text-[var(--color-anbessa-red)]" size={20} />
            </div>
            <input 
              type="text" 
              required
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Destination (e.g. Piassa)" 
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-anbessa-yellow)] transition-all bg-gray-50"
            />
          </div>

          <button 
            type="submit" 
            disabled={isSearching}
            className="w-full bg-[var(--color-charcoal)] hover:bg-black text-white font-bold py-3 rounded-xl transition-colors shadow-md mt-2 flex justify-center items-center"
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
          <h3 className="font-bold text-lg mb-4">Suggested Routes</h3>
          {results.map((res, idx) => (
            <div key={res.id} className={`bg-white rounded-2xl p-5 border shadow-sm transition-all cursor-pointer ${idx === 0 ? 'border-[var(--color-anbessa-yellow)] ring-1 ring-[var(--color-anbessa-yellow)]' : 'border-gray-100 hover:border-gray-300'}`}>
              {idx === 0 && (
                <div className="text-xs font-bold text-[var(--color-anbessa-yellow-dark)] uppercase tracking-wider mb-2">Recommended &bull; Fastest</div>
              )}
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-2">
                  <div className="bg-[var(--color-charcoal)] text-white px-3 py-1 rounded-lg font-bold text-sm">
                    {res.route}
                  </div>
                  <span className="text-sm font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-md">{res.type}</span>
                </div>
                <div className="text-right">
                  <div className="font-bold text-lg">{res.time}</div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 py-3 border-t border-gray-100 text-sm">
                <div className="flex items-center text-gray-600">
                  <Clock size={16} className="mr-2 text-gray-400" /> Wait: {res.wait}
                </div>
                <div className="flex items-center text-gray-600">
                  <CreditCard size={16} className="mr-2 text-gray-400" /> {res.cost}
                </div>
              </div>
              
              <button className="w-full mt-2 py-2 flex items-center justify-center text-[var(--color-anbessa-red)] font-semibold hover:bg-red-50 rounded-lg transition-colors">
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
