import { useState } from "react";
import { motion } from "motion/react";
import { TrendingUp, TrendingDown, Minus, Trophy, Medal } from "lucide-react";
import { leagueStandings, userStats } from "../data/league";
import { drivers } from "../data/drivers";

const tabs = ["Lega", "Piloti F1", "Costruttori F1"];

function TrendIcon({ trend, value }: { trend: string; value: number }) {
  if (trend === "up")
    return (
      <div className="flex items-center gap-0.5">
        <TrendingUp size={12} style={{ color: "#4CAF50" }} />
        <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 11, color: "#4CAF50" }}>
          +{value}
        </span>
      </div>
    );
  if (trend === "down")
    return (
      <div className="flex items-center gap-0.5">
        <TrendingDown size={12} style={{ color: "#E10600" }} />
        <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 11, color: "#E10600" }}>
          -{value}
        </span>
      </div>
    );
  return <Minus size={12} style={{ color: "#555555" }} />;
}

function RankBadge({ rank }: { rank: number }) {
  const colors: Record<number, { bg: string; color: string }> = {
    1: { bg: "rgba(255,215,0,0.15)", color: "#FFD700" },
    2: { bg: "rgba(192,192,192,0.15)", color: "#C0C0C0" },
    3: { bg: "rgba(205,127,50,0.15)", color: "#CD7F32" },
  };
  const style = colors[rank] || { bg: "rgba(255,255,255,0.05)", color: "#555555" };
  return (
    <div
      className="flex items-center justify-center rounded-lg"
      style={{
        width: 32,
        height: 32,
        background: style.bg,
        border: rank <= 3 ? `1px solid ${style.color}40` : "none",
      }}
    >
      {rank === 1 ? (
        <Trophy size={14} style={{ color: style.color }} />
      ) : rank === 2 || rank === 3 ? (
        <Medal size={14} style={{ color: style.color }} />
      ) : (
        <span
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: 14,
            fontWeight: 800,
            color: style.color,
          }}
        >
          {rank}
        </span>
      )}
    </div>
  );
}

// F1 Driver standings (sorted by points)
const f1DriverStandings = [...drivers]
  .sort((a, b) => b.points - a.points)
  .map((d, i) => ({ ...d, rank: i + 1 }));

export default function Standings() {
  const [activeTab, setActiveTab] = useState(0);
  const userEntry = leagueStandings.find((p) => p.isUser);

  return (
    <div
      className="min-h-screen pb-24"
      style={{ background: "#0A0A0A", fontFamily: "'Inter', sans-serif" }}
    >
      {/* User's position card */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="mx-4 mt-4 rounded-2xl p-4"
        style={{
          background: "linear-gradient(135deg, #1A0000 0%, #130000 100%)",
          border: "1px solid rgba(225,6,0,0.3)",
        }}
      >
        <p
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: 11,
            color: "#888888",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            marginBottom: 6,
          }}
        >
          La tua posizione
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="flex items-center justify-center rounded-xl"
              style={{
                width: 48,
                height: 48,
                background: "linear-gradient(135deg, #E10600, #8B0000)",
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: 22,
                fontWeight: 900,
                color: "white",
              }}
            >
              #{userStats.rank}
            </div>
            <div>
              <p
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: 18,
                  fontWeight: 800,
                  color: "#FFFFFF",
                }}
              >
                {userStats.teamName}
              </p>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 12,
                  color: "#888888",
                }}
              >
                su {userStats.totalPlayers} squadre
              </p>
            </div>
          </div>
          <div className="text-right">
            <p
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: 32,
                fontWeight: 900,
                color: "#FFFFFF",
                lineHeight: 1,
              }}
            >
              {userStats.totalPoints}
            </p>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 11,
                color: "#555555",
              }}
            >
              punti totali
            </p>
          </div>
        </div>
        <div
          className="flex gap-4 mt-3 pt-3"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div>
            <p
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: 10,
                color: "#555555",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              Migliore posizione
            </p>
            <p
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: 16,
                fontWeight: 700,
                color: "#FFD700",
              }}
            >
              #{userStats.seasonBest}
            </p>
          </div>
          <div>
            <p
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: 10,
                color: "#555555",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              Punti ultimo GP
            </p>
            <p
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: 16,
                fontWeight: 700,
                color: "#4CAF50",
              }}
            >
              +{userStats.pointsThisMonth}
            </p>
          </div>
          <div>
            <p
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: 10,
                color: "#555555",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              Rank settimana
            </p>
            <p
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: 16,
                fontWeight: 700,
                color: "#FFFFFF",
              }}
            >
              #{userStats.weeklyRank}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <div
        className="flex mx-4 mt-3 rounded-xl overflow-hidden"
        style={{
          background: "#141414",
          border: "1px solid rgba(255,255,255,0.06)",
          padding: 4,
          gap: 4,
        }}
      >
        {tabs.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActiveTab(i)}
            className="flex-1 py-2.5 rounded-lg transition-all"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              background: activeTab === i ? "#E10600" : "transparent",
              color: activeTab === i ? "white" : "#555555",
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* League Standings */}
      {activeTab === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mx-4 mt-3 space-y-2"
        >
          {leagueStandings.map((player, idx) => (
            <motion.div
              key={player.rank}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.04, duration: 0.25 }}
              className="rounded-xl overflow-hidden"
              style={{
                background: player.isUser ? "rgba(225,6,0,0.06)" : "#141414",
                border: player.isUser
                  ? "1.5px solid rgba(225,6,0,0.3)"
                  : "1px solid rgba(255,255,255,0.05)",
              }}
            >
              {player.isUser && (
                <div className="h-0.5 w-full" style={{ background: "#E10600" }} />
              )}
              <div className="flex items-center gap-3 px-3 py-3">
                <RankBadge rank={player.rank} />

                <div
                  className="flex items-center justify-center rounded-full"
                  style={{
                    width: 34,
                    height: 34,
                    background: player.isUser
                      ? "linear-gradient(135deg, #E10600, #8B0000)"
                      : "rgba(255,255,255,0.06)",
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: 15,
                    fontWeight: 800,
                    color: "white",
                    flexShrink: 0,
                  }}
                >
                  {player.avatar}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 13,
                        fontWeight: player.isUser ? 700 : 600,
                        color: player.isUser ? "#FFFFFF" : "#DDDDDD",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {player.teamName}
                    </p>
                    {player.isUser && (
                      <span
                        className="px-1.5 py-0.5 rounded"
                        style={{
                          background: "#E10600",
                          fontFamily: "'Barlow Condensed', sans-serif",
                          fontSize: 8,
                          fontWeight: 900,
                          color: "white",
                          letterSpacing: "0.05em",
                          textTransform: "uppercase",
                          flexShrink: 0,
                        }}
                      >
                        TU
                      </span>
                    )}
                  </div>
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 11,
                      color: "#555555",
                    }}
                  >
                    {player.name}
                  </p>
                </div>

                <div className="flex flex-col items-end gap-1">
                  <span
                    style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontSize: 20,
                      fontWeight: 900,
                      color: player.isUser ? "#FFFFFF" : "#CCCCCC",
                      lineHeight: 1,
                    }}
                  >
                    {player.points}
                  </span>
                  <TrendIcon trend={player.trend} value={player.trendValue} />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* F1 Driver Standings */}
      {activeTab === 1 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mx-4 mt-3 space-y-2"
        >
          {f1DriverStandings.map((driver, idx) => (
            <motion.div
              key={driver.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.03, duration: 0.2 }}
              className="rounded-xl overflow-hidden"
              style={{
                background: "#141414",
                border: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              <div className="h-0.5" style={{ background: driver.teamColor }} />
              <div className="flex items-center gap-3 px-3 py-3">
                <span
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: 14,
                    fontWeight: 800,
                    color:
                      driver.rank === 1
                        ? "#FFD700"
                        : driver.rank === 2
                        ? "#C0C0C0"
                        : driver.rank === 3
                        ? "#CD7F32"
                        : "#555555",
                    width: 24,
                    textAlign: "center",
                  }}
                >
                  {driver.rank}
                </span>

                <div
                  className="flex items-center justify-center rounded-lg"
                  style={{
                    width: 36,
                    height: 36,
                    background: `${driver.teamColor}18`,
                    border: `1.5px solid ${driver.teamColor}40`,
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: 15,
                    fontWeight: 900,
                    color: driver.teamColor,
                    flexShrink: 0,
                  }}
                >
                  {driver.number}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span style={{ fontSize: 12 }}>{driver.flag}</span>
                    <p
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 13,
                        fontWeight: 600,
                        color: "#FFFFFF",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {driver.name}
                    </p>
                  </div>
                  <p
                    style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontSize: 11,
                      color: driver.teamColor,
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {driver.team}
                  </p>
                </div>

                <div className="flex flex-col items-end">
                  <span
                    style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontSize: 20,
                      fontWeight: 900,
                      color: "#FFFFFF",
                      lineHeight: 1,
                    }}
                  >
                    {driver.points}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 10,
                      color: "#555555",
                    }}
                  >
                    pts
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Constructor Standings */}
      {activeTab === 2 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mx-4 mt-3 space-y-2"
        >
          {[
            { name: "McLaren", points: 390, color: "#FF8000" },
            { name: "Ferrari", points: 354, color: "#E8002D" },
            { name: "Red Bull", points: 316, color: "#3671C6" },
            { name: "Mercedes", points: 228, color: "#27F4D2" },
            { name: "Aston Martin", points: 126, color: "#229971" },
            { name: "Williams", points: 98, color: "#64C4FF" },
            { name: "Alpine", points: 76, color: "#FF87BC" },
            { name: "Racing Bulls", points: 54, color: "#6692FF" },
            { name: "Haas", points: 38, color: "#B6BABD" },
            { name: "Sauber", points: 22, color: "#52E252" },
          ].map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04, duration: 0.2 }}
              className="rounded-xl overflow-hidden"
              style={{
                background: "#141414",
                border: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              <div className="h-0.5" style={{ background: c.color }} />
              <div className="flex items-center gap-3 px-3 py-3">
                <span
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: 14,
                    fontWeight: 800,
                    color:
                      i === 0 ? "#FFD700" : i === 1 ? "#C0C0C0" : i === 2 ? "#CD7F32" : "#555555",
                    width: 24,
                    textAlign: "center",
                  }}
                >
                  {i + 1}
                </span>
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ background: c.color }}
                />
                <p
                  className="flex-1"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 14,
                    fontWeight: 600,
                    color: "#FFFFFF",
                  }}
                >
                  {c.name}
                </p>
                <div className="text-right">
                  <span
                    style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontSize: 22,
                      fontWeight: 900,
                      color: "#FFFFFF",
                    }}
                  >
                    {c.points}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 11,
                      color: "#555555",
                      marginLeft: 4,
                    }}
                  >
                    pts
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
