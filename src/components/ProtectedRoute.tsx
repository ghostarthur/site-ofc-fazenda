import { Navigate, Outlet } from 'react-router';
import { isAuthenticated } from '../utils/auth';

export function ProtectedRoute() {
  if (!isAuthenticated()) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
