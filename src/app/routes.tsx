import { createBrowserRouter, Navigate } from "react-router";
import { Layout } from "./components/Layout";
import Home from "./pages/Home";
import MyTeam from "./pages/MyTeam";
import Standings from "./pages/Standings";
import Market from "./pages/Market";
import Calendar from "./pages/Calendar";
import Settings from "./pages/Settings";
import Auth from "./pages/Auth";
import { useAuth } from "./contexts/AuthContext";

// Componente per proteggere le route
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Caricamento...</div>;
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children} </>;
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, element: <ProtectedRoute><Home /></ProtectedRoute> },
      { path: "squadra", element: <ProtectedRoute><MyTeam /></ProtectedRoute> },
      { path: "classifica", element: <ProtectedRoute><Standings /></ProtectedRoute> },
      { path: "mercato", element: <ProtectedRoute><Market /></ProtectedRoute> },
      { path: "calendario", element: <ProtectedRoute><Calendar /></ProtectedRoute> },
    ],
  },
  { path: "/impostazioni", element: <ProtectedRoute><Settings /></ProtectedRoute> },
  { path: "/auth", Component: Auth },
]);
