import { Outlet, useLocation } from "react-router";
import { Header } from "./Header";
import { BottomNav } from "./BottomNav";

const pageTitles: Record<string, string | undefined> = {
  "/": undefined,
  "/squadra": "La Mia Squadra",
  "/classifica": "Classifica",
  "/mercato": "Mercato",
  "/calendario": "Calendario",
};

export function Layout() {
  const location = useLocation();
  const title = pageTitles[location.pathname];

  return (
    <div
      className="flex justify-center min-h-screen"
      style={{ background: "#050505" }}
    >
      <div
        className="w-full max-w-md relative flex flex-col min-h-screen"
        style={{ background: "#0A0A0A" }}
      >
        <Header title={title} />
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
        <BottomNav />
      </div>
    </div>
  );
}
