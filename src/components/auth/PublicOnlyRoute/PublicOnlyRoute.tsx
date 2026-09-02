import { Navigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth.ts";

type PublicOnlyRouteProps = {
  children: React.ReactNode;
};

export default function PublicOnlyRoute({ children }: PublicOnlyRouteProps) {
  const { user, loading } = useAuth();

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (user) {
    return <Navigate to="/" replace />;
  }
  return children;
}
