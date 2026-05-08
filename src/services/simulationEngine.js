import { useState, useEffect } from 'react';
import { ROUTES, INITIAL_BUSES } from './mockData';

// Helper to interpolate position between path points
const getPositionAlongPath = (path, progress) => {
  if (!path || path.length === 0) return [0, 0];
  if (path.length === 1) return path[0];
  if (progress <= 0) return path[0];
  if (progress >= 1) return path[path.length - 1];

  const totalSegments = path.length - 1;
  const exactSegment = progress * totalSegments;
  const segmentIndex = Math.floor(exactSegment);
  const segmentProgress = exactSegment - segmentIndex;

  const startPoint = path[segmentIndex];
  const endPoint = path[segmentIndex + 1];

  if (!endPoint) return startPoint;

  const lat = startPoint[0] + (endPoint[0] - startPoint[0]) * segmentProgress;
  const lng = startPoint[1] + (endPoint[1] - startPoint[1]) * segmentProgress;

  return [lat, lng];
};

export const useBusSimulation = (refreshRateMs = 3000) => {
  const [buses, setBuses] = useState(() => 
    INITIAL_BUSES.map(bus => {
      const route = ROUTES.find(r => r.id === bus.routeId);
      const position = getPositionAlongPath(route.path, bus.pathProgress);
      return { ...bus, position };
    })
  );

  useEffect(() => {
    // 30 second updates for "real" feel, but during dev we might want it faster.
    // The requirement says "Refresh every 30 seconds indicator". 
    // We will simulate movement by bumping progress by 2% every tick.
    const interval = setInterval(() => {
      setBuses(currentBuses => 
        currentBuses.map(bus => {
          let newProgress = bus.direction === 'forward' 
            ? bus.pathProgress + 0.02 
            : bus.pathProgress - 0.02;
          
          let newDirection = bus.direction;

          if (newProgress >= 1) {
            newProgress = 1;
            newDirection = 'backward';
          } else if (newProgress <= 0) {
            newProgress = 0;
            newDirection = 'forward';
          }

          const route = ROUTES.find(r => r.id === bus.routeId);
          const position = getPositionAlongPath(route.path, newProgress);

          return {
            ...bus,
            pathProgress: newProgress,
            direction: newDirection,
            position
          };
        })
      );
    }, refreshRateMs);

    return () => clearInterval(interval);
  }, [refreshRateMs]);

  return buses;
};
