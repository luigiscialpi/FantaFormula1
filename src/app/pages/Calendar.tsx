import { useState } from "react";
import { motion } from "motion/react";
import { Flag, Clock, Zap, ChevronDown, ChevronUp, Check } from "lucide-react";
import { races } from "../data/races";

export default function Calendar() {
  const [expandedRace, setExpandedRace] = useState<string | null>("china");

  return (
    <div
      className="min-h-screen pb-24"
      style={{ background: "var(--ff-bg)", fontFamily: "'Inter', sans-serif" }}
    >
      {/* Header Stats */}
      <div className="grid grid-cols-3 gap-3 mx-4 mt-4">
        {[
          { label: "Gare Totali", value: 25, color: "var(--ff-text-primary)" },
          { label: "Completate", value: 3, color: "#4CAF50" },
          { label: "Rimanenti", value: 22, color: "var(--ff-text-secondary)" },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-xl py-3 px-2 flex flex-col items-center"
            style={{
              background: "var(--ff-surface)",
              border: "1px solid var(--ff-surface-border)",
            }}
          >
            <span
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: 28,
                fontWeight: 900,
                color: s.color,
                lineHeight: 1,
              }}
            >
              {s.value}
            </span>
            <span
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: 10,
                color: "var(--ff-text-tertiary)",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                textAlign: "center",
                marginTop: 4,
              }}
            >
              {s.label}
            </span>
          </div>
        ))}
      </div>

      {/* Race List */}
      <div className="mx-4 mt-4 space-y-2">
        {races.map((race, idx) => {
          const isExpanded = expandedRace === race.id;
          const isNext = race.status === "next";
          const isCompleted = race.status === "completed";

          return (
            <motion.div
              key={race.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.025, duration: 0.2 }}
              className="rounded-xl overflow-hidden"
              style={{
                background: isNext
                  ? "rgba(225,6,0,0.06)"
                  : isCompleted
                    ? "var(--ff-surface)"
                    : "var(--ff-surface)",
                border: `1px solid ${isNext
                    ? "rgba(225,6,0,0.35)"
                    : isCompleted
                      ? "var(--ff-surface-border)"
                      : "var(--ff-surface-border)"
                  }`,
                opacity: isCompleted ? 0.8 : 1,
              }}
            >
              {isNext && (
                <div
                  className="h-0.5 w-full"
                  style={{
                    background:
                      "linear-gradient(90deg, #E10600, transparent)",
                  }}
                />
              )}

              <button
                className="w-full text-left"
                onClick={() =>
                  setExpandedRace(isExpanded ? null : race.id)
                }
              >
                <div className="flex items-center gap-3 px-3 py-3">
                  {/* Round badge */}
                  <div
                    className="flex items-center justify-center rounded-lg flex-shrink-0"
                    style={{
                      width: 32,
                      height: 32,
                      background: isCompleted
                        ? "rgba(76,175,80,0.12)"
                        : isNext
                          ? "rgba(225,6,0,0.15)"
                          : "var(--ff-badge-bg)",
                      border: `1px solid ${isCompleted
                          ? "rgba(76,175,80,0.25)"
                          : isNext
                            ? "rgba(225,6,0,0.3)"
                            : "transparent"
                        }`,
                    }}
                  >
                    {isCompleted ? (
                      <Check size={14} style={{ color: "#4CAF50" }} />
                    ) : (
                      <span
                        style={{
                          fontFamily: "'Barlow Condensed', sans-serif",
                          fontSize: 13,
                          fontWeight: 800,
                          color: isNext ? "#E10600" : "var(--ff-text-tertiary)",
                        }}
                      >
                        {race.round}
                      </span>
                    )}
                  </div>

                  {/* Flag */}
                  <span style={{ fontSize: 24, lineHeight: 1, flexShrink: 0 }}>
                    {race.flag}
                  </span>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <p
                        style={{
                          fontFamily: "'Barlow Condensed', sans-serif",
                          fontSize: 14,
                          fontWeight: 800,
                          color: isCompleted ? "var(--ff-text-secondary)" : "var(--ff-text-primary)",
                          textTransform: "uppercase",
                          letterSpacing: "0.02em",
                        }}
                      >
                        {race.country}
                      </p>
                      {isNext && (
                        <span
                          className="px-1.5 py-0.5 rounded-full"
                          style={{
                            background: "rgba(225,6,0,0.2)",
                            fontFamily: "'Barlow Condensed', sans-serif",
                            fontSize: 9,
                            fontWeight: 900,
                            color: "#E10600",
                            letterSpacing: "0.1em",
                          }}
                        >
                          PROSSIMA
                        </span>
                      )}
                      {race.sprintDate && (
                        <span
                          className="px-1.5 py-0.5 rounded-full flex items-center gap-0.5"
                          style={{
                            background: "rgba(255,140,0,0.12)",
                            fontFamily: "'Barlow Condensed', sans-serif",
                            fontSize: 9,
                            fontWeight: 900,
                            color: "#FF8C00",
                          }}
                        >
                          <Zap size={8} />
                          SPRINT
                        </span>
                      )}
                    </div>
                    <p
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 11,
                        color: "var(--ff-text-tertiary)",
                      }}
                    >
                      {race.date} · {race.city}
                    </p>
                  </div>

                  {/* Points or chevron */}
                  <div className="flex items-center gap-2">
                    {isCompleted && race.myPoints !== undefined && (
                      <span
                        style={{
                          fontFamily: "'Barlow Condensed', sans-serif",
                          fontSize: 18,
                          fontWeight: 900,
                          color: "#4CAF50",
                        }}
                      >
                        +{race.myPoints}
                      </span>
                    )}
                    {isExpanded ? (
                      <ChevronUp size={16} style={{ color: "var(--ff-text-tertiary)" }} />
                    ) : (
                      <ChevronDown size={16} style={{ color: "var(--ff-text-tertiary)" }} />
                    )}
                  </div>
                </div>
              </button>

              {/* Expanded Details */}
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    borderTop: "1px solid var(--ff-divider)",
                    overflow: "hidden",
                  }}
                >
                  <div className="px-3 py-3">
                    {/* Circuit */}
                    <p
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 12,
                        color: "var(--ff-text-secondary)",
                        marginBottom: 12,
                      }}
                    >
                      🏁 {race.circuit}
                    </p>

                    {/* Schedule */}
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      <div
                        className="rounded-lg p-2"
                        style={{
                          background: "var(--ff-status-bg)",
                        }}
                      >
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
                          {race.qualifyingDate}
                        </p>
                      </div>
                      <div
                        className="rounded-lg p-2"
                        style={{
                          background: "var(--ff-status-bg)",
                        }}
                      >
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
                          {race.date}
                        </p>
                      </div>
                      {race.sprintDate && (
                        <div
                          className="rounded-lg p-2"
                          style={{
                            background: "rgba(255,140,0,0.06)",
                            border: "1px solid rgba(255,140,0,0.15)",
                          }}
                        >
                          <p
                            style={{
                              fontFamily: "'Barlow Condensed', sans-serif",
                              fontSize: 10,
                              color: "#FF8C00",
                              textTransform: "uppercase",
                              letterSpacing: "0.08em",
                            }}
                          >
                            Sprint Race
                          </p>
                          <p
                            style={{
                              fontFamily: "'Inter', sans-serif",
                              fontSize: 13,
                              color: "var(--ff-text-on-surface)",
                              fontWeight: 500,
                            }}
                          >
                            {race.sprintDate}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Results if completed */}
                    {isCompleted && race.winner && (
                      <div
                        className="rounded-lg p-3"
                        style={{
                          background: "rgba(76,175,80,0.06)",
                          border: "1px solid rgba(76,175,80,0.15)",
                        }}
                      >
                        <div className="flex items-center justify-between">
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
                              Vincitore
                            </p>
                            <p
                              style={{
                                fontFamily: "'Inter', sans-serif",
                                fontSize: 14,
                                fontWeight: 600,
                                color: "var(--ff-text-primary)",
                              }}
                            >
                              🏆 {race.winner}
                            </p>
                            <p
                              style={{
                                fontFamily: "'Barlow Condensed', sans-serif",
                                fontSize: 12,
                                color: race.winnerTeamColor,
                              }}
                            >
                              {race.winnerTeam}
                            </p>
                          </div>
                          <div className="text-right">
                            <p
                              style={{
                                fontFamily: "'Barlow Condensed', sans-serif",
                                fontSize: 10,
                                color: "var(--ff-text-tertiary)",
                                textTransform: "uppercase",
                                letterSpacing: "0.08em",
                              }}
                            >
                              I Tuoi Punti
                            </p>
                            <p
                              style={{
                                fontFamily: "'Barlow Condensed', sans-serif",
                                fontSize: 32,
                                fontWeight: 900,
                                color: "#4CAF50",
                                lineHeight: 1,
                              }}
                            >
                              +{race.myPoints}
                            </p>
                          </div>
                        </div>
                        {race.fastestLap && (
                          <div className="flex items-center gap-1.5 mt-2">
                            <div
                              className="w-3 h-3 rounded-full flex items-center justify-center"
                              style={{ background: "#7C4DFF" }}
                            />
                            <span
                              style={{
                                fontFamily: "'Inter', sans-serif",
                                fontSize: 11,
                                color: "var(--ff-text-secondary)",
                              }}
                            >
                              Giro Veloce:{" "}
                              <span style={{ color: "#B39DDB" }}>
                                {race.fastestLap}
                              </span>
                            </span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Upcoming: Set Lineup CTA */}
                    {isNext && (
                      <button
                        className="w-full py-3 rounded-xl flex items-center justify-center gap-2"
                        style={{
                          background: "#E10600",
                          fontFamily: "'Barlow Condensed', sans-serif",
                          fontSize: 15,
                          fontWeight: 800,
                          color: "white",
                          letterSpacing: "0.06em",
                          textTransform: "uppercase",
                        }}
                      >
                        <Flag size={16} />
                        Imposta Formazione
                      </button>
                    )}
                  </div>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
