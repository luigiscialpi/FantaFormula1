import { useLocation, useNavigate } from "react-router";
import { Home, Users, Trophy, ShoppingCart, Calendar } from "lucide-react";

const navItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: Users, label: "Squadra", path: "/squadra" },
  { icon: Trophy, label: "Classifica", path: "/classifica" },
  { icon: ShoppingCart, label: "Mercato", path: "/mercato" },
  { icon: Calendar, label: "Calendario", path: "/calendario" },
];

export function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 flex justify-center"
      style={{ background: "transparent" }}
    >
      <div
        className="w-full max-w-md"
        style={{
          background: "linear-gradient(to top, #0A0A0A, #0A0A0A)",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div className="flex items-center justify-around px-2 py-2 pb-safe">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className="flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-200"
                style={{
                  color: isActive ? "#E10600" : "#555555",
                  background: isActive
                    ? "rgba(225,6,0,0.08)"
                    : "transparent",
                  minWidth: 56,
                }}
              >
                <Icon
                  size={22}
                  strokeWidth={isActive ? 2.2 : 1.8}
                  style={{
                    filter: isActive
                      ? "drop-shadow(0 0 6px rgba(225,6,0,0.5))"
                      : "none",
                  }}
                />
                <span
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: 10,
                    fontWeight: isActive ? 700 : 500,
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                  }}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
