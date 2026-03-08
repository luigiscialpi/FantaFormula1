import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, SlidersHorizontal, TrendingUp, ShoppingCart, X, Check } from "lucide-react";
import { drivers, constructors } from "../data/drivers";
import { userStats } from "../data/league";

type SortKey = "points" | "price" | "name" | "lastRace";
type FilterTeam = "all" | string;

const tabs = ["Piloti", "Costruttori"];

export default function Market() {
  const [activeTab, setActiveTab] = useState(0);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<SortKey>("points");
  const [filterTeam, setFilterTeam] = useState<FilterTeam>("all");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState<string | null>(null);
  const [budget, setBudget] = useState(userStats.budget);

  const teams = ["all", ...new Set(drivers.map((d) => d.team))];

  const filteredDrivers = useMemo(() => {
    return drivers
      .filter((d) => {
        const matchSearch =
          d.name.toLowerCase().includes(search.toLowerCase()) ||
          d.team.toLowerCase().includes(search.toLowerCase()) ||
          d.shortName.toLowerCase().includes(search.toLowerCase());
        const matchTeam = filterTeam === "all" || d.team === filterTeam;
        return matchSearch && matchTeam;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "points":
            return b.points - a.points;
          case "price":
            return b.price - a.price;
          case "name":
            return a.name.localeCompare(b.name);
          case "lastRace":
            return b.lastRacePoints - a.lastRacePoints;
          default:
            return 0;
        }
      });
  }, [search, sortBy, filterTeam]);

  const filteredConstructors = useMemo(() => {
    return constructors
      .filter((c) =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.shortName.toLowerCase().includes(search.toLowerCase())
      )
      .sort((a, b) => {
        if (sortBy === "price") return b.price - a.price;
        if (sortBy === "lastRace") return b.lastRacePoints - a.lastRacePoints;
        return b.points - a.points;
      });
  }, [search, sortBy]);

  const selectedDriverData = drivers.find((d) => d.id === selectedDriver);

  return (
    <div
      className="min-h-screen pb-24"
      style={{ background: "#0A0A0A", fontFamily: "'Inter', sans-serif" }}
    >
      {/* Budget Header */}
      <div
        className="mx-4 mt-4 rounded-2xl p-4 flex items-center justify-between"
        style={{
          background: "linear-gradient(135deg, #001A00 0%, #0D0D0D 100%)",
          border: "1px solid rgba(76,175,80,0.2)",
        }}
      >
        <div>
          <p
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: 11,
              color: "#555555",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            Budget disponibile
          </p>
          <p
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: 30,
              fontWeight: 900,
              color: "#4CAF50",
              lineHeight: 1.1,
            }}
          >
            €{budget.toFixed(1)}M
          </p>
        </div>
        <div className="text-right">
          <p
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: 11,
              color: "#555555",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            Squadra
          </p>
          <p
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: 18,
              fontWeight: 800,
              color: "#FFFFFF",
            }}
          >
            5 Piloti + 1 Cost.
          </p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: "#444444" }}>
            Max 3 per team
          </p>
        </div>
      </div>

      {/* Search + Filter */}
      <div className="mx-4 mt-3 flex gap-2">
        <div
          className="flex-1 flex items-center gap-2 px-3 py-2.5 rounded-xl"
          style={{
            background: "#141414",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <Search size={16} style={{ color: "#555555" }} />
          <input
            type="text"
            placeholder="Cerca pilota o team..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent outline-none"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 14,
              color: "#FFFFFF",
            }}
          />
          {search && (
            <button onClick={() => setSearch("")}>
              <X size={14} style={{ color: "#555555" }} />
            </button>
          )}
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center justify-center rounded-xl px-3"
          style={{
            background: showFilters ? "rgba(225,6,0,0.15)" : "#141414",
            border: `1px solid ${showFilters ? "rgba(225,6,0,0.4)" : "rgba(255,255,255,0.08)"}`,
            color: showFilters ? "#E10600" : "#888888",
          }}
        >
          <SlidersHorizontal size={18} />
        </button>
      </div>

      {/* Filters */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mx-4 mt-2 overflow-hidden"
          >
            <div
              className="rounded-xl p-3"
              style={{
                background: "#141414",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <p
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: 11,
                  color: "#555555",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  marginBottom: 8,
                }}
              >
                Ordina per
              </p>
              <div className="flex flex-wrap gap-2 mb-3">
                {[
                  { key: "points" as SortKey, label: "Punti" },
                  { key: "price" as SortKey, label: "Prezzo" },
                  { key: "lastRace" as SortKey, label: "Ultimo GP" },
                  { key: "name" as SortKey, label: "Nome" },
                ].map((s) => (
                  <button
                    key={s.key}
                    onClick={() => setSortBy(s.key)}
                    className="px-3 py-1.5 rounded-lg"
                    style={{
                      background: sortBy === s.key ? "#E10600" : "rgba(255,255,255,0.06)",
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontSize: 12,
                      fontWeight: 700,
                      color: sortBy === s.key ? "white" : "#888888",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {s.label}
                  </button>
                ))}
              </div>

              {activeTab === 0 && (
                <>
                  <p
                    style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontSize: 11,
                      color: "#555555",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      marginBottom: 8,
                    }}
                  >
                    Filtra per Team
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {teams.slice(0, 6).map((t) => (
                      <button
                        key={t}
                        onClick={() => setFilterTeam(t)}
                        className="px-3 py-1.5 rounded-lg"
                        style={{
                          background: filterTeam === t ? "#E10600" : "rgba(255,255,255,0.06)",
                          fontFamily: "'Barlow Condensed', sans-serif",
                          fontSize: 11,
                          fontWeight: 700,
                          color: filterTeam === t ? "white" : "#888888",
                        }}
                      >
                        {t === "all" ? "Tutti" : t}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
              fontSize: 13,
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

      {/* Driver List */}
      {activeTab === 0 && (
        <div className="mx-4 mt-3 space-y-2">
          {filteredDrivers.map((driver, idx) => (
            <motion.div
              key={driver.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.03, duration: 0.2 }}
              className="rounded-xl overflow-hidden cursor-pointer"
              style={{
                background: driver.owned ? "rgba(225,6,0,0.05)" : "#141414",
                border: `1px solid ${
                  selectedDriver === driver.id
                    ? "rgba(225,6,0,0.5)"
                    : driver.owned
                    ? "rgba(225,6,0,0.15)"
                    : "rgba(255,255,255,0.05)"
                }`,
              }}
              onClick={() =>
                setSelectedDriver(
                  selectedDriver === driver.id ? null : driver.id
                )
              }
            >
              <div className="h-0.5" style={{ background: driver.teamColor }} />
              <div className="flex items-center gap-3 px-3 py-3">
                <div
                  className="flex items-center justify-center rounded-lg"
                  style={{
                    width: 38,
                    height: 38,
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
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <p
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 13,
                        fontWeight: 600,
                        color: "#FFFFFF",
                      }}
                    >
                      {driver.name}
                    </p>
                    {driver.owned && (
                      <span
                        className="px-1.5 py-0.5 rounded"
                        style={{
                          background: "rgba(225,6,0,0.2)",
                          fontFamily: "'Barlow Condensed', sans-serif",
                          fontSize: 9,
                          fontWeight: 800,
                          color: "#E10600",
                          letterSpacing: "0.05em",
                        }}
                      >
                        IN SQUADRA
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      style={{
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontSize: 11,
                        color: driver.teamColor,
                      }}
                    >
                      {driver.team}
                    </span>
                    <span style={{ color: "#333333", fontSize: 10 }}>•</span>
                    <span
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 11,
                        color: "#555555",
                      }}
                    >
                      Media: {driver.avgPoints.toFixed(1)} pts/GP
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1">
                  <div className="flex items-center gap-2">
                    <div className="text-right">
                      <p
                        style={{
                          fontFamily: "'Barlow Condensed', sans-serif",
                          fontSize: 18,
                          fontWeight: 800,
                          color: "#FFFFFF",
                          lineHeight: 1,
                        }}
                      >
                        {driver.points}
                      </p>
                      <p
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: 9,
                          color: "#555555",
                        }}
                      >
                        pts
                      </p>
                    </div>
                    <div
                      className="rounded-lg px-2 py-1 text-right"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                      }}
                    >
                      <p
                        style={{
                          fontFamily: "'Barlow Condensed', sans-serif",
                          fontSize: 15,
                          fontWeight: 800,
                          color: driver.price > budget ? "#E10600" : "#4CAF50",
                          lineHeight: 1,
                        }}
                      >
                        €{driver.price}M
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Row */}
              <AnimatePresence>
                {selectedDriver === driver.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    style={{
                      overflow: "hidden",
                      borderTop: "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    <div className="flex items-center justify-between px-3 py-3">
                      <div>
                        <div className="flex gap-4">
                          <div>
                            <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 10, color: "#555555", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                              Ultimo GP
                            </p>
                            <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 18, fontWeight: 800, color: "#FFFFFF" }}>
                              {driver.lastRacePoints} pts
                            </p>
                          </div>
                          <div>
                            <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 10, color: "#555555", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                              Media/GP
                            </p>
                            <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 18, fontWeight: 800, color: "#FFFFFF" }}>
                              {driver.avgPoints.toFixed(1)}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {driver.owned ? (
                          <button
                            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl"
                            style={{
                              background: "rgba(225,6,0,0.15)",
                              border: "1px solid rgba(225,6,0,0.4)",
                              fontFamily: "'Barlow Condensed', sans-serif",
                              fontSize: 13,
                              fontWeight: 800,
                              color: "#E10600",
                              letterSpacing: "0.04em",
                              textTransform: "uppercase",
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedDriver(null);
                            }}
                          >
                            <X size={14} />
                            Vendi
                          </button>
                        ) : (
                          <button
                            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl"
                            style={{
                              background:
                                driver.price > budget
                                  ? "rgba(255,255,255,0.05)"
                                  : "#E10600",
                              border:
                                driver.price > budget
                                  ? "1px solid rgba(255,255,255,0.1)"
                                  : "none",
                              fontFamily: "'Barlow Condensed', sans-serif",
                              fontSize: 13,
                              fontWeight: 800,
                              color:
                                driver.price > budget ? "#555555" : "white",
                              letterSpacing: "0.04em",
                              textTransform: "uppercase",
                              cursor:
                                driver.price > budget ? "not-allowed" : "pointer",
                            }}
                            disabled={driver.price > budget}
                            onClick={(e) => {
                              e.stopPropagation();
                              if (driver.price <= budget) {
                                setBudget((b) => b - driver.price);
                                setSelectedDriver(null);
                              }
                            }}
                          >
                            <ShoppingCart size={14} />
                            {driver.price > budget ? "Budget insuff." : "Acquista"}
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      )}

      {/* Constructor List */}
      {activeTab === 1 && (
        <div className="mx-4 mt-3 space-y-2">
          {filteredConstructors.map((c, idx) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.04, duration: 0.2 }}
              className="rounded-xl overflow-hidden"
              style={{
                background: c.owned ? "rgba(225,6,0,0.05)" : "#141414",
                border: `1px solid ${c.owned ? "rgba(225,6,0,0.15)" : "rgba(255,255,255,0.05)"}`,
              }}
            >
              <div className="h-0.5" style={{ background: c.color }} />
              <div className="flex items-center gap-3 px-3 py-3">
                <div
                  className="flex items-center justify-center rounded-lg"
                  style={{
                    width: 40,
                    height: 40,
                    background: `${c.color}18`,
                    border: `1.5px solid ${c.color}40`,
                    fontSize: 20,
                    flexShrink: 0,
                  }}
                >
                  🏎️
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 14,
                        fontWeight: 600,
                        color: "#FFFFFF",
                      }}
                    >
                      {c.name}
                    </p>
                    {c.owned && (
                      <span
                        className="px-1.5 py-0.5 rounded"
                        style={{
                          background: "rgba(225,6,0,0.2)",
                          fontFamily: "'Barlow Condensed', sans-serif",
                          fontSize: 9,
                          fontWeight: 800,
                          color: "#E10600",
                        }}
                      >
                        IN SQUADRA
                      </span>
                    )}
                  </div>
                  <p
                    style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontSize: 11,
                      color: "#555555",
                    }}
                  >
                    Ultimo GP: {c.lastRacePoints} pts
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p
                      style={{
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontSize: 20,
                        fontWeight: 800,
                        color: "#FFFFFF",
                        lineHeight: 1,
                      }}
                    >
                      {c.points}
                    </p>
                    <p
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 9,
                        color: "#555555",
                      }}
                    >
                      pts
                    </p>
                  </div>
                  <div
                    className="rounded-lg px-2 py-1 text-right"
                    style={{ background: "rgba(255,255,255,0.04)" }}
                  >
                    <p
                      style={{
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontSize: 15,
                        fontWeight: 800,
                        color: c.price > budget ? "#E10600" : "#4CAF50",
                        lineHeight: 1,
                      }}
                    >
                      €{c.price}M
                    </p>
                  </div>
                  {c.owned ? (
                    <button
                      className="px-3 py-2 rounded-lg"
                      style={{
                        background: "rgba(225,6,0,0.15)",
                        border: "1px solid rgba(225,6,0,0.3)",
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontSize: 11,
                        fontWeight: 800,
                        color: "#E10600",
                      }}
                    >
                      <X size={14} />
                    </button>
                  ) : (
                    <button
                      className="px-3 py-2 rounded-lg"
                      style={{
                        background: c.price > budget ? "rgba(255,255,255,0.04)" : "#E10600",
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontSize: 11,
                        fontWeight: 800,
                        color: c.price > budget ? "#555555" : "white",
                      }}
                      disabled={c.price > budget}
                    >
                      <ShoppingCart size={14} />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
