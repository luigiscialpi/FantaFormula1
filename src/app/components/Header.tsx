import { Bell, Sun, Moon } from "lucide-react";
import { userStats } from "../data/league";
import { useTheme } from "../contexts/ThemeContext";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router";

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
}

export function Header({ title, showBack, onBack }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const { profile } = useAuth();
  const navigate = useNavigate();

  // Use profile data if available, otherwise fallback to mock data
  const avatarEmoji = profile?.avatar_emoji || userStats.avatar;

  return (
    <header
      className="sticky top-0 z-40 flex items-center justify-between px-4 py-3"
      style={{
        background: "var(--ff-header-bg)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid var(--ff-header-border)",
      }}
    >
      {/* Logo / Title / Back Button */}
      <div className="flex items-center gap-2">
        {showBack && (
          <button
            onClick={onBack}
            className="flex items-center justify-center p-1 -ml-1 mr-1"
            style={{ color: "var(--ff-text-primary)" }}
            aria-label="Indietro"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
          </button>
        )}

        {title ? (
          <span
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: 20,
              fontWeight: 800,
              color: "var(--ff-text-primary)",
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
                color: "var(--ff-text-primary)",
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
          onClick={toggleTheme}
          className="flex items-center justify-center"
          style={{ color: "var(--ff-text-secondary)" }}
          aria-label="Cambia tema"
        >
          {theme === "light" ? (
            <Moon size={18} strokeWidth={1.8} />
          ) : (
            <Sun size={18} strokeWidth={1.8} />
          )}
        </button>
        <button
          className="relative"
          style={{ color: "var(--ff-text-secondary)" }}
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
        <button
          onClick={() => navigate('/impostazioni')}
          className="flex items-center justify-center rounded-full cursor-pointer"
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
          {avatarEmoji}
        </button>
      </div>
    </header>
  );
}
