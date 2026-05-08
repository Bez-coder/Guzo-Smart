// Mock data for Addis Ababa public transport

export const BUS_STOPS = {
  1: { id: 1, name: "Piassa", lat: 9.0315, lng: 38.7523 },
  2: { id: 2, name: "Stadium", lat: 9.0145, lng: 38.7562 },
  3: { id: 3, name: "Meskel Square", lat: 9.0105, lng: 38.7618 },
  4: { id: 4, name: "Dembel City Center", lat: 9.0028, lng: 38.7675 },
  5: { id: 5, name: "Bole Medhanialem", lat: 8.9897, lng: 38.7891 },
  6: { id: 6, name: "Megenagna", lat: 9.0205, lng: 38.8021 },
  7: { id: 7, name: "Signal", lat: 9.0245, lng: 38.8181 },
  8: { id: 8, name: "CMC", lat: 9.0255, lng: 38.8471 },
  9: { id: 9, name: "Ayat", lat: 9.0185, lng: 38.8681 },
};

export const ROUTES = [
  {
    id: "R-10",
    name: "Piassa - Bole",
    color: "#eab308", // Yellow 500
    stops: [1, 2, 3, 4, 5],
    path: [
      [9.0315, 38.7523],
      [9.0225, 38.7542],
      [9.0145, 38.7562],
      [9.0105, 38.7618],
      [9.0065, 38.7645],
      [9.0028, 38.7675],
      [8.9950, 38.7780],
      [8.9897, 38.7891],
    ],
    estimatedTime: 45, // mins
  },
  {
    id: "R-22",
    name: "Megenagna - Ayat",
    color: "#facc15", // Yellow 400
    stops: [6, 7, 8, 9],
    path: [
      [9.0205, 38.8021],
      [9.0225, 38.8101],
      [9.0245, 38.8181],
      [9.0250, 38.8321],
      [9.0255, 38.8471],
      [9.0225, 38.8571],
      [9.0185, 38.8681],
    ],
    estimatedTime: 30, // mins
  }
];

export const INITIAL_BUSES = [
  { id: "B1", routeId: "R-10", status: "active", capacity: 60, passengers: 45, pathProgress: 0.1, direction: "forward" },
  { id: "B2", routeId: "R-10", status: "active", capacity: 60, passengers: 30, pathProgress: 0.6, direction: "forward" },
  { id: "B3", routeId: "R-10", status: "active", capacity: 60, passengers: 55, pathProgress: 0.8, direction: "backward" },
  { id: "B4", routeId: "R-22", status: "active", capacity: 80, passengers: 70, pathProgress: 0.2, direction: "forward" },
  { id: "B5", routeId: "R-22", status: "active", capacity: 80, passengers: 20, pathProgress: 0.7, direction: "backward" },
];
