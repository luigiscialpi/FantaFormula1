import { createBrowserRouter, Navigate } from "react-router";
import { Layout } from "./components/Layout";
import Home from "./pages/Home";
import MyTeam from "./pages/MyTeam";
import Standings from "./pages/Standings";
import Market from "./pages/Market";
import Calendar from "./pages/Calendar";
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

  return <>{ children } </>;
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "squadra", Component: MyTeam },
      { path: "classifica", Component: Standings },
      { path: "mercato", Component: Market },
      { path: "calendario", Component: Calendar },
    ],
  },
  { path: "/auth", Component: Auth },
]);
