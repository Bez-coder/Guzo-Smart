import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import UserLayout from './layouts/UserLayout';
import AdminLayout from './layouts/AdminLayout';
import Home from './pages/user/Home';
import RouteSearch from './pages/user/RouteSearch';
import LiveMap from './pages/user/LiveMap';
import TripPlanner from './pages/user/TripPlanner';
import AdminDashboard from './pages/admin/Dashboard';
import Login from './pages/auth/Login';
import SignUp from './pages/auth/SignUp';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path="search" element={<RouteSearch />} />
          <Route path="map" element={<LiveMap />} />
          <Route path="plan" element={<TripPlanner />} />
        </Route>
        
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
        </Route>
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
