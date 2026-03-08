import { useNavigate } from "react-router";
import { motion } from "motion/react";
import {
  TrendingUp,
  TrendingDown,
  Minus,
  ChevronRight,
  Zap,
  Flag,
  Clock,
} from "lucide-react";
import { userStats, weeklyPointsHistory } from "../data/league";
import { myDrivers, myConstructor } from "../data/drivers";
import { nextRace, races } from "../data/races";

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div
        className="flex items-center justify-center rounded-lg"
        style={{
          width: 48,
          height: 48,
          background: "var(--ff-countdown-bg)",
          border: "1px solid var(--ff-countdown-border)",
          fontFamily: "'Barlow Condensed', sans-serif",
          fontSize: 24,
          fontWeight: 800,
          color: "var(--ff-countdown-text)",
        }}
      >
        {String(value).padStart(2, "0")}
      </div>
      <span
        style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontSize: 10,
          color: "var(--ff-text-tertiary)",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          marginTop: 4,
        }}
      >
        {label}
      </span>
    </div>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const completedRaces = races.filter((r) => r.status === "completed");

  return (
    <div
      className="min-h-screen pb-24"
      style={{ background: "var(--ff-bg)", fontFamily: "'Inter', sans-serif" }}
    >
      {/* Hero: Next Race */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative overflow-hidden mx-4 mt-4 rounded-2xl"
        style={{
          background: "var(--ff-hero-gradient)",
          border: "1px solid var(--ff-hero-border)",
        }}
      >
        {/* BG decoration */}
        <div
          className="absolute inset-0"
          style={{
            opacity: "var(--ff-hero-pattern-opacity)",
            backgroundImage:
              "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(225,6,0,0.15) 10px, rgba(225,6,0,0.15) 11px)",
          }}
        />
        <div
          className="absolute top-0 right-0 w-48 h-48 rounded-full"
          style={{
            opacity: "var(--ff-hero-glow-opacity)",
            background: "#E10600",
            filter: "blur(40px)",
            transform: "translate(30%, -30%)",
          }}
        />

        <div className="relative p-5">
          {/* Badge */}
          <div className="flex items-center gap-2 mb-4">
            <div
              className="flex items-center gap-1 px-2 py-1 rounded-full"
              style={{
                background: "rgba(225,6,0,0.15)",
                border: "1px solid rgba(225,6,0,0.3)",
              }}
            >
              <Clock size={10} style={{ color: "#E10600" }} />
              <span
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#E10600",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                Prossima Gara
              </span>
            </div>
            {nextRace.sprintDate && (
              <div
                className="flex items-center gap-1 px-2 py-1 rounded-full"
                style={{
                  background: "rgba(255,140,0,0.12)",
                  border: "1px solid rgba(255,140,0,0.25)",
                }}
              >
                <Zap size={10} style={{ color: "#FF8C00" }} />
                <span
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: 11,
                    fontWeight: 700,
                    color: "#FF8C00",
                    letterSpacing: "0.1em",
                  }}
                >
                  SPRINT
                </span>
              </div>
            )}
          </div>

          <div className="flex items-start justify-between mb-4">
            <div>
              <p
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: 13,
                  color: "var(--ff-text-secondary)",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  marginBottom: 2,
                }}
              >
                Round {nextRace.round} — {nextRace.flag} {nextRace.country}
              </p>
              <h2
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: 26,
                  fontWeight: 800,
                  color: "var(--ff-text-primary)",
                  lineHeight: 1.1,
                  letterSpacing: "0.01em",
                  textTransform: "uppercase",
                }}
              >
                {nextRace.name.replace("Gran Premio ", "")}
              </h2>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 12,
                  color: "var(--ff-text-secondary)",
                  marginTop: 4,
                }}
              >
                {nextRace.circuit}
              </p>
            </div>
            <span style={{ fontSize: 42, lineHeight: 1 }}>{nextRace.flag}</span>
          </div>

          {/* Countdown */}
          <div className="flex items-center gap-3 mb-4">
            <CountdownUnit value={14} label="Giorni" />
            <span
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: 24,
                color: "var(--ff-colon-color)",
                fontWeight: 800,
                marginBottom: 12,
              }}
            >
              :
            </span>
            <CountdownUnit value={7} label="Ore" />
            <span
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: 24,
                color: "var(--ff-colon-color)",
                fontWeight: 800,
                marginBottom: 12,
              }}
            >
              :
            </span>
            <CountdownUnit value={23} label="Min" />
          </div>

          {/* Race date info */}
          <div
            className="flex gap-4 pt-4"
            style={{ borderTop: "1px solid var(--ff-divider)" }}
          >
            <div>
              <p
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: 10,
                  color: "var(--ff-text-tertiary)",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                Qualifiche
              </p>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 13,
                  color: "var(--ff-text-on-surface)",
                  fontWeight: 500,
                }}
              >
                {nextRace.qualifyingDate}
              </p>
            </div>
            <div>
              <p
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: 10,
                  color: "var(--ff-text-tertiary)",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                Gara
              </p>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 13,
                  color: "var(--ff-text-on-surface)",
                  fontWeight: 500,
                }}
              >
                {nextRace.date}
              </p>
            </div>
            <div>
              <p
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: 10,
                  color: "var(--ff-text-tertiary)",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                Trasf. rimasti
              </p>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 13,
                  color: userStats.transfersAvailable > 0 ? "#4CAF50" : "#E10600",
                  fontWeight: 600,
                }}
              >
                {userStats.transfersAvailable}/{3}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Row */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="grid grid-cols-3 gap-3 mx-4 mt-3"
      >
        {[
          {
            label: "Posizione",
            value: `#${userStats.rank}`,
            sub: `su ${userStats.totalPlayers}`,
            color: "#E10600",
          },
          {
            label: "Punti Totali",
            value: userStats.totalPoints,
            sub: "stagione",
            color: "var(--ff-points-value)",
          },
          {
            label: "Ultimo GP",
            value: `+${userStats.pointsThisMonth}`,
            sub: "Australia",
            color: "#4CAF50",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl p-4 flex flex-col items-center"
            style={{
              background: "var(--ff-surface)",
              border: "1px solid var(--ff-surface-border)",
            }}
          >
            <span
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: 24,
                fontWeight: 800,
                color: stat.color,
                lineHeight: 1,
              }}
            >
              {stat.value}
            </span>
            <span
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: 10,
                color: "var(--ff-text-tertiary)",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginTop: 4,
                textAlign: "center",
              }}
            >
              {stat.label}
            </span>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 10,
                color: "var(--ff-text-tertiary)",
                textAlign: "center",
              }}
            >
              {stat.sub}
            </span>
          </div>
        ))}
      </motion.div>

      {/* Points History */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="mx-4 mt-3 rounded-2xl p-4"
        style={{
          background: "var(--ff-surface)",
          border: "1px solid var(--ff-surface-border)",
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <span
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: 14,
              fontWeight: 700,
              color: "var(--ff-text-primary)",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            Punti per Gara
          </span>
          <TrendingUp size={16} style={{ color: "#4CAF50" }} />
        </div>
        <div className="flex items-end gap-2" style={{ height: 60 }}>
          {weeklyPointsHistory.map((item, i) => {
            const maxPts = Math.max(...weeklyPointsHistory.map((x) => x.points));
            const height = maxPts > 0 ? (item.points / maxPts) * 100 : 10;
            const isNext = item.points === 0;
            return (
              <div key={item.race} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full rounded-t-sm relative"
                  style={{
                    height: `${isNext ? 10 : height}%`,
                    background: isNext
                      ? "var(--ff-bar-inactive)"
                      : i === weeklyPointsHistory.length - 2
                        ? "#E10600"
                        : "var(--ff-bar-active)",
                    minHeight: 8,
                    transition: "height 0.5s ease",
                  }}
                >
                  {!isNext && (
                    <span
                      className="absolute -top-5 left-1/2 -translate-x-1/2"
                      style={{
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontSize: 11,
                        fontWeight: 700,
                        color: i === weeklyPointsHistory.length - 2 ? "#E10600" : "var(--ff-text-secondary)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {item.points}
                    </span>
                  )}
                </div>
                <span
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: 10,
                    color: isNext ? "var(--ff-text-tertiary)" : "var(--ff-text-secondary)",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  {item.race}
                </span>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* My Team Quick View */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="mx-4 mt-3"
      >
        <div className="flex items-center justify-between mb-3">
          <span
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: 16,
              fontWeight: 800,
              color: "var(--ff-text-primary)",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            La Mia Squadra
          </span>
          <button
            onClick={() => navigate("/squadra")}
            className="flex items-center gap-1"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: 13,
              color: "#E10600",
              fontWeight: 600,
            }}
          >
            Vedi tutto <ChevronRight size={14} />
          </button>
        </div>

        <div className="space-y-2">
          {myDrivers.slice(0, 3).map((driver) => (
            <div
              key={driver.id}
              className="flex items-center justify-between px-4 py-3 rounded-xl"
              style={{
                background: "var(--ff-surface)",
                border: `1px solid ${driver.isCaptain ? "var(--ff-surface-border-accent)" : "var(--ff-surface-border)"}`,
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="flex items-center justify-center rounded-lg"
                  style={{
                    width: 36,
                    height: 36,
                    background: `${driver.teamColor}20`,
                    border: `1.5px solid ${driver.teamColor}50`,
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: 15,
                    fontWeight: 900,
                    color: driver.teamColor,
                  }}
                >
                  {driver.number}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 13,
                        fontWeight: 600,
                        color: "var(--ff-text-primary)",
                      }}
                    >
                      {driver.name}
                    </span>
                    {driver.isCaptain && (
                      <span
                        className="px-1.5 py-0.5 rounded"
                        style={{
                          background: "#E10600",
                          fontFamily: "'Barlow Condensed', sans-serif",
                          fontSize: 9,
                          fontWeight: 800,
                          color: "white",
                          letterSpacing: "0.05em",
                        }}
                      >
                        C
                      </span>
                    )}
                    {driver.isViceCaptain && (
                      <span
                        className="px-1.5 py-0.5 rounded"
                        style={{
                          background: "#FF8C00",
                          fontFamily: "'Barlow Condensed', sans-serif",
                          fontSize: 9,
                          fontWeight: 800,
                          color: "white",
                        }}
                      >
                        VC
                      </span>
                    )}
                  </div>
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 11,
                      color: driver.teamColor,
                    }}
                  >
                    {driver.team}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: 18,
                    fontWeight: 800,
                    color: "var(--ff-text-primary)",
                  }}
                >
                  {driver.isCaptain ? driver.lastRacePoints * 2 : driver.lastRacePoints}
                </span>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 10,
                    color: "var(--ff-text-tertiary)",
                  }}
                >
                  ultimo GP
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Last Races */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.25 }}
        className="mx-4 mt-4 mb-2"
      >
        <div className="flex items-center justify-between mb-3">
          <span
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: 16,
              fontWeight: 800,
              color: "var(--ff-text-primary)",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            Ultime Gare
          </span>
          <button
            onClick={() => navigate("/calendario")}
            className="flex items-center gap-1"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: 13,
              color: "#E10600",
              fontWeight: 600,
            }}
          >
            Tutte <ChevronRight size={14} />
          </button>
        </div>

        <div className="space-y-2">
          {completedRaces
            .slice()
            .reverse()
            .map((race) => (
              <div
                key={race.id}
                className="flex items-center justify-between px-4 py-3 rounded-xl"
                style={{
                  background: "var(--ff-surface)",
                  border: "1px solid var(--ff-surface-border)",
                }}
              >
                <div className="flex items-center gap-3">
                  <span style={{ fontSize: 24 }}>{race.flag}</span>
                  <div>
                    <p
                      style={{
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontSize: 14,
                        fontWeight: 700,
                        color: "var(--ff-text-primary)",
                        textTransform: "uppercase",
                        letterSpacing: "0.02em",
                      }}
                    >
                      {race.country}
                    </p>
                    <p
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 11,
                        color: "var(--ff-text-tertiary)",
                      }}
                    >
                      {race.winner} —{" "}
                      <span style={{ color: race.winnerTeamColor }}>
                        {race.winnerTeam}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span
                    style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontSize: 20,
                      fontWeight: 800,
                      color: "#4CAF50",
                    }}
                  >
                    +{race.myPoints}
                  </span>
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 10,
                      color: "var(--ff-text-tertiary)",
                    }}
                  >
                    i tuoi punti
                  </p>
                </div>
              </div>
            ))}
        </div>
      </motion.div>
    </div>
  );
}
