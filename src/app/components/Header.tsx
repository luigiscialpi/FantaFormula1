import { Bell, Settings } from "lucide-react";
import { userStats } from "../data/league";

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
}

export function Header({ title }: HeaderProps) {
  return (
    <header
      className="sticky top-0 z-40 flex items-center justify-between px-4 py-3"
      style={{
        background: "rgba(10,10,10,0.92)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      {/* Logo / Title */}
      <div className="flex items-center gap-2">
        {title ? (
          <span
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: 20,
              fontWeight: 800,
              color: "#FFFFFF",
              letterSpacing: "0.02em",
              textTransform: "uppercase",
            }}
          >
            {title}
          </span>
        ) : (
          <div className="flex items-center gap-2">
            <div
              className="flex items-center justify-center rounded"
              style={{
                width: 28,
                height: 28,
                background: "#E10600",
              }}
            >
              <span style={{ fontSize: 14 }}>🏎️</span>
            </div>
            <span
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: 20,
                fontWeight: 900,
                color: "#FFFFFF",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              Fanta<span style={{ color: "#E10600" }}>F1</span>
            </span>
          </div>
        )}
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-3">
        <button
          className="relative"
          style={{ color: "#888888" }}
        >
          <Bell size={20} strokeWidth={1.8} />
          <span
            className="absolute -top-1 -right-1 flex items-center justify-center rounded-full"
            style={{
              width: 16,
              height: 16,
              background: "#E10600",
              fontSize: 9,
              fontWeight: 700,
              color: "white",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            3
          </span>
        </button>
        <div
          className="flex items-center justify-center rounded-full"
          style={{
            width: 32,
            height: 32,
            background: "linear-gradient(135deg, #E10600, #8B0000)",
            fontSize: 13,
            fontWeight: 700,
            color: "white",
            fontFamily: "'Barlow Condensed', sans-serif",
          }}
        >
          {userStats.avatar}
        </div>
      </div>
    </header>
  );
}
