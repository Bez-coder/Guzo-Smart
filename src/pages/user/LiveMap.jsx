import { useSearchParams } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import { ROUTES, BUS_STOPS } from '../../services/mockData';
import { useBusSimulation } from '../../services/simulationEngine';
import { RefreshCw, Navigation } from 'lucide-react';

// Custom icons
const busIcon = new L.DivIcon({
  className: 'custom-bus-icon',
  html: `<div style="background-color: var(--color-guzo-yellow-800); width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; border: 3px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/></svg>
         </div>`,
  iconSize: [30, 30],
  iconAnchor: [15, 15]
});

const stopIcon = new L.DivIcon({
  className: 'custom-stop-icon',
  html: `<div style="background-color: white; width: 14px; height: 14px; border-radius: 50%; border: 3px solid var(--color-guzo-yellow-600); box-shadow: 0 1px 3px rgba(0,0,0,0.3);"></div>`,
  iconSize: [14, 14],
  iconAnchor: [7, 7]
});

const LiveMap = () => {
  const [searchParams] = useSearchParams();
  const routeFilter = searchParams.get('route');
  const buses = useBusSimulation(3000);

  const displayRoutes = routeFilter 
    ? ROUTES.filter(r => r.id === routeFilter)
    : ROUTES;

  const displayBuses = routeFilter
    ? buses.filter(b => b.routeId === routeFilter)
    : buses;

  const center = [9.015, 38.765];

  return (
    <div className="relative h-full w-full flex flex-col">
      {/* Top Floating Panel */}
      <div className="absolute top-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-80 z-[1000]">
        <div className="bg-white rounded-2xl shadow-lg border border-[var(--color-guzo-yellow-100)] p-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-bold text-lg text-[var(--color-guzo-yellow-950)]">Live Tracker</h2>
            <div className="flex items-center text-xs text-[var(--color-guzo-yellow-950)] bg-[var(--color-guzo-yellow-400)] px-2 py-1 rounded-full font-bold">
              <RefreshCw size={12} className="mr-1 animate-spin-slow" /> Live
            </div>
          </div>
          <p className="text-sm font-medium text-[var(--color-guzo-yellow-800)] mb-3">
            {routeFilter ? `Showing Route ${routeFilter}` : 'Showing all active routes'}
          </p>
          <div className="flex items-center justify-between text-sm border-t border-[var(--color-guzo-yellow-50)] pt-3">
            <span className="font-bold text-[var(--color-guzo-yellow-950)]">{displayBuses.length} Buses Active</span>
            <button className="text-[var(--color-guzo-yellow-800)] font-bold flex items-center hover:underline">
              <Navigation size={14} className="mr-1" /> My Location
            </button>
          </div>
        </div>
      </div>

      {/* The Map */}
      <div className="flex-1 w-full h-full">
        <MapContainer 
          center={center} 
          zoom={13} 
          scrollWheelZoom={true} 
          style={{ height: '100%', width: '100%' }}
          zoomControl={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          />
          
          {/* Render Routes */}
          {displayRoutes.map(route => (
            <Polyline 
              key={route.id}
              positions={route.path}
              color={route.color}
              weight={5}
              opacity={0.7}
            />
          ))}

          {/* Render Stops */}
          {displayRoutes.map(route => 
            route.stops.map(stopId => {
              const stop = BUS_STOPS[stopId];
              if (!stop) return null;
              return (
                <Marker 
                  key={`stop-${stopId}`} 
                  position={[stop.lat, stop.lng]} 
                  icon={stopIcon}
                >
                  <Popup>
                    <div className="font-bold text-[var(--color-guzo-yellow-950)]">{stop.name}</div>
                    <div className="text-xs text-[var(--color-guzo-yellow-800)] font-medium">Stop ID: {stop.id}</div>
                  </Popup>
                </Marker>
              );
            })
          )}

          {/* Render Buses */}
          {displayBuses.map(bus => (
            <Marker 
              key={bus.id} 
              position={bus.position} 
              icon={busIcon}
            >
              <Popup className="bus-popup">
                <div className="text-center p-1">
                  <div className="bg-[var(--color-guzo-yellow-400)] text-[var(--color-guzo-yellow-950)] font-bold px-2 py-1 rounded text-sm inline-block mb-2 shadow-sm">
                    {bus.routeId}
                  </div>
                  <div className="font-bold text-[var(--color-guzo-yellow-950)]">Bus {bus.id}</div>
                  <div className="text-xs font-medium text-[var(--color-guzo-yellow-800)] mt-1">Status: {bus.status}</div>
                  <div className="mt-2 pt-2 border-t border-[var(--color-guzo-yellow-50)] flex justify-between text-xs">
                    <span className="font-medium text-[var(--color-guzo-yellow-800)]">Occupancy</span>
                    <span className="font-bold text-[var(--color-guzo-yellow-950)]">{bus.passengers}/{bus.capacity}</span>
                  </div>
                  <div className="mt-1 text-xs text-[var(--color-guzo-yellow-800)] font-bold">Next stop in ~2 mins</div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default LiveMap;
