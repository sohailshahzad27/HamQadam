import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export function AuthRoute({ children }: { children: JSX.Element }) {
  const { currentUser } = useAuth();

  if (currentUser) {
    // User is authenticated, redirect to home
    return <Navigate to="/" replace />;
  }

  // User is not authenticated, show the auth page
  return children;
}