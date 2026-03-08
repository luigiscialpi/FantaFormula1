import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Star,
  Shield,
  ChevronRight,
  Wallet,
  RotateCcw,
  Check,
  X,
} from "lucide-react";
import { drivers, constructors, myDrivers, myConstructor } from "../data/drivers";
import { userStats } from "../data/league";

const tabs = ["Formazione", "Modifica Squadra"];

function DriverSlot({
  driver,
  position,
  onSetCaptain,
  onSetViceCaptain,
}: {
  driver: (typeof myDrivers)[0];
  position: string;
  onSetCaptain: (id: string) => void;
  onSetViceCaptain: (id: string) => void;
}) {
  const [showActions, setShowActions] = useState(false);

  return (
    <div className="relative">
      <motion.div
        layout
        className="rounded-xl overflow-hidden cursor-pointer"
        style={{
          background: "var(--ff-surface)",
          border: `1.5px solid ${driver.isCaptain
              ? "rgba(225,6,0,0.5)"
              : driver.isViceCaptain
                ? "rgba(255,140,0,0.5)"
                : "var(--ff-surface-border)"
            }`,
        }}
        onClick={() => setShowActions(!showActions)}
      >
        {/* Team color stripe */}
        <div
          className="h-0.5 w-full"
          style={{ background: driver.teamColor }}
        />
        <div className="p-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="flex items-center justify-center rounded-lg"
              style={{
                width: 40,
                height: 40,
                background: `${driver.teamColor}18`,
                border: `1.5px solid ${driver.teamColor}40`,
                position: "relative",
              }}
            >
              <span
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: 16,
                  fontWeight: 900,
                  color: driver.teamColor,
                }}
              >
                {driver.number}
              </span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
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
                  <div
                    className="flex items-center justify-center rounded"
                    style={{
                      width: 18,
                      height: 18,
                      background: "#E10600",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontSize: 10,
                        fontWeight: 900,
                        color: "white",
                      }}
                    >
                      C
                    </span>
                  </div>
                )}
                {driver.isViceCaptain && (
                  <div
                    className="flex items-center justify-center rounded"
                    style={{
                      width: 18,
                      height: 18,
                      background: "#FF8C00",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontSize: 10,
                        fontWeight: 900,
                        color: "white",
                      }}
                    >
                      VC
                    </span>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2">
                <span
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: 11,
                    color: driver.teamColor,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  {driver.team}
                </span>
                <span
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: 10,
                    color: "var(--ff-text-tertiary)",
                  }}
                >
                  {position}
                </span>
              </div>
            </div>
          </div>

          <div className="text-right">
            <p
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: 20,
                fontWeight: 800,
                color: "var(--ff-text-primary)",
                lineHeight: 1,
              }}
            >
              {driver.points}
            </p>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 10,
                color: "var(--ff-text-tertiary)",
              }}
            >
              punti
            </p>
            <p
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: 12,
                color: "var(--ff-text-secondary)",
              }}
            >
              €{driver.price}M
            </p>
          </div>
        </div>

        {/* Action row */}
        <AnimatePresence>
          {showActions && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{ overflow: "hidden", borderTop: "1px solid var(--ff-divider)" }}
            >
              <div className="flex gap-2 p-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSetCaptain(driver.id);
                    setShowActions(false);
                  }}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg"
                  style={{
                    background: driver.isCaptain
                      ? "rgba(225,6,0,0.2)"
                      : "rgba(225,6,0,0.08)",
                    border: `1px solid ${driver.isCaptain ? "#E10600" : "rgba(225,6,0,0.2)"}`,
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: 12,
                    fontWeight: 700,
                    color: driver.isCaptain ? "#E10600" : "var(--ff-text-secondary)",
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                  }}
                >
                  <Star size={12} />
                  Capitano
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSetViceCaptain(driver.id);
                    setShowActions(false);
                  }}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg"
                  style={{
                    background: driver.isViceCaptain
                      ? "rgba(255,140,0,0.2)"
                      : "rgba(255,140,0,0.08)",
                    border: `1px solid ${driver.isViceCaptain ? "#FF8C00" : "rgba(255,140,0,0.2)"}`,
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: 12,
                    fontWeight: 700,
                    color: driver.isViceCaptain ? "#FF8C00" : "var(--ff-text-secondary)",
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                  }}
                >
                  <Shield size={12} />
                  Vice Cap.
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default function MyTeam() {
  const [activeTab, setActiveTab] = useState(0);
  const [teamDrivers, setTeamDrivers] = useState(myDrivers);
  const [captain, setCaptain] = useState(
    myDrivers.find((d) => d.isCaptain)?.id || ""
  );
  const [viceCaptain, setViceCaptain] = useState(
    myDrivers.find((d) => d.isViceCaptain)?.id || ""
  );
  const [selectedForTransfer, setSelectedForTransfer] = useState<string | null>(null);

  const positions = ["P1", "P2", "P3", "P4", "P5"];

  const handleSetCaptain = (id: string) => {
    setCaptain(id);
    if (viceCaptain === id) setViceCaptain("");
  };

  const handleSetViceCaptain = (id: string) => {
    setViceCaptain(id);
    if (captain === id) setCaptain("");
  };

  const driversWithRoles = teamDrivers.map((d) => ({
    ...d,
    isCaptain: d.id === captain,
    isViceCaptain: d.id === viceCaptain,
  }));

  const availableDrivers = drivers.filter(
    (d) => !d.owned && d.id !== selectedForTransfer
  );

  const driverToTransfer = teamDrivers.find((d) => d.id === selectedForTransfer);

  return (
    <div
      className="min-h-screen pb-24"
      style={{ background: "var(--ff-bg)", fontFamily: "'Inter', sans-serif" }}
    >
      {/* Budget Bar */}
      <div
        className="mx-4 mt-4 rounded-2xl p-4"
        style={{
          background: "var(--ff-surface)",
          border: "1px solid var(--ff-surface-border)",
        }}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Wallet size={16} style={{ color: "#4CAF50" }} />
            <span
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: 13,
                color: "var(--ff-text-secondary)",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              Budget Rimanente
            </span>
          </div>
          <span
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: 20,
              fontWeight: 800,
              color: "#4CAF50",
            }}
          >
            €{userStats.budget}M
          </span>
        </div>
        <div
          className="rounded-full overflow-hidden"
          style={{ height: 6, background: "var(--ff-bar-inactive)" }}
        >
          <div
            className="h-full rounded-full"
            style={{
              width: `${(userStats.budget / userStats.totalBudget) * 100}%`,
              background: "linear-gradient(90deg, #4CAF50, #8BC34A)",
            }}
          />
        </div>
        <div className="flex justify-between mt-1">
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: "var(--ff-text-tertiary)" }}>
            Usato: €{(userStats.totalBudget - userStats.budget).toFixed(1)}M
          </span>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: "var(--ff-text-tertiary)" }}>
            Totale: €{userStats.totalBudget}M
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex mx-4 mt-3 rounded-xl overflow-hidden" style={{ background: "var(--ff-surface)", border: "1px solid var(--ff-surface-border)", padding: 4, gap: 4 }}>
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
              color: activeTab === i ? "white" : "var(--ff-text-tertiary)",
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 0 ? (
          <motion.div
            key="formazione"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.2 }}
            className="mx-4 mt-3 space-y-2"
          >
            {/* Legend */}
            <div className="flex items-center gap-3 mb-3">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded flex items-center justify-center" style={{ background: "#E10600" }}>
                  <span style={{ fontSize: 7, fontWeight: 900, color: "white", fontFamily: "'Barlow Condensed', sans-serif" }}>C</span>
                </div>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: "var(--ff-text-secondary)" }}>Capitano (x2)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded flex items-center justify-center" style={{ background: "#FF8C00" }}>
                  <span style={{ fontSize: 7, fontWeight: 900, color: "white", fontFamily: "'Barlow Condensed', sans-serif" }}>VC</span>
                </div>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: "var(--ff-text-secondary)" }}>Vice (x1.5)</span>
              </div>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: "var(--ff-text-tertiary)" }}>Tocca per cambiare</span>
            </div>

            {/* Drivers */}
            {driversWithRoles.map((driver, i) => (
              <DriverSlot
                key={driver.id}
                driver={driver}
                position={positions[i]}
                onSetCaptain={handleSetCaptain}
                onSetViceCaptain={handleSetViceCaptain}
              />
            ))}

            {/* Constructor */}
            <div
              className="rounded-xl overflow-hidden"
              style={{
                background: "var(--ff-surface)",
                border: "1px solid var(--ff-surface-border)",
              }}
            >
              <div
                className="h-0.5 w-full"
                style={{ background: myConstructor.color }}
              />
              <div className="p-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="flex items-center justify-center rounded-lg"
                    style={{
                      width: 40,
                      height: 40,
                      background: `${myConstructor.color}18`,
                      border: `1.5px solid ${myConstructor.color}40`,
                    }}
                  >
                    <span style={{ fontSize: 16 }}>🏎️</span>
                  </div>
                  <div>
                    <span
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 13,
                        fontWeight: 600,
                        color: "var(--ff-text-primary)",
                      }}
                    >
                      {myConstructor.name}
                    </span>
                    <p
                      style={{
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontSize: 11,
                        color: "var(--ff-text-tertiary)",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                      }}
                    >
                      Costruttore
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p
                    style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontSize: 20,
                      fontWeight: 800,
                      color: "var(--ff-text-primary)",
                      lineHeight: 1,
                    }}
                  >
                    {myConstructor.points}
                  </p>
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 10,
                      color: "var(--ff-text-tertiary)",
                    }}
                  >
                    punti
                  </p>
                  <p
                    style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontSize: 12,
                      color: "var(--ff-text-secondary)",
                    }}
                  >
                    €{myConstructor.price}M
                  </p>
                </div>
              </div>
            </div>

            {/* Save button */}
            <button
              className="w-full py-4 rounded-xl mt-2 flex items-center justify-center gap-2"
              style={{
                background: "linear-gradient(135deg, #E10600, #8B0000)",
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: 16,
                fontWeight: 800,
                color: "white",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              <Check size={18} />
              Salva Formazione
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="modifica"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
            className="mx-4 mt-3"
          >
            {/* Transfers info */}
            <div
              className="rounded-xl p-3 mb-3 flex items-center justify-between"
              style={{
                background: "rgba(255,140,0,0.08)",
                border: "1px solid rgba(255,140,0,0.2)",
              }}
            >
              <div className="flex items-center gap-2">
                <RotateCcw size={14} style={{ color: "#FF8C00" }} />
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 13,
                    color: "#FF8C00",
                    fontWeight: 500,
                  }}
                >
                  Trasferimenti liberi rimasti:
                </span>
              </div>
              <span
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: 22,
                  fontWeight: 800,
                  color: "#FF8C00",
                }}
              >
                {userStats.transfersAvailable}
              </span>
            </div>

            {/* Select driver to transfer */}
            <p
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: 13,
                color: "var(--ff-text-secondary)",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                marginBottom: 8,
              }}
            >
              Seleziona pilota da sostituire:
            </p>

            <div className="space-y-2 mb-4">
              {teamDrivers.map((driver) => (
                <button
                  key={driver.id}
                  onClick={() =>
                    setSelectedForTransfer(
                      selectedForTransfer === driver.id ? null : driver.id
                    )
                  }
                  className="w-full rounded-xl flex items-center justify-between p-3 transition-all"
                  style={{
                    background:
                      selectedForTransfer === driver.id
                        ? "rgba(225,6,0,0.12)"
                        : "var(--ff-surface)",
                    border: `1px solid ${selectedForTransfer === driver.id
                        ? "rgba(225,6,0,0.5)"
                        : "var(--ff-surface-border)"
                      }`,
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ background: driver.teamColor }}
                    />
                    <span
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 13,
                        fontWeight: 600,
                        color:
                          selectedForTransfer === driver.id
                            ? "#E10600"
                            : "var(--ff-text-primary)",
                      }}
                    >
                      {driver.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      style={{
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontSize: 14,
                        color: "var(--ff-text-secondary)",
                      }}
                    >
                      €{driver.price}M
                    </span>
                    {selectedForTransfer === driver.id ? (
                      <X size={16} style={{ color: "#E10600" }} />
                    ) : (
                      <ChevronRight size={16} style={{ color: "var(--ff-text-tertiary)" }} />
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* Available drivers */}
            {selectedForTransfer && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <p
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: 13,
                    color: "var(--ff-text-secondary)",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    marginBottom: 8,
                  }}
                >
                  Scegli il sostituto:
                </p>
                <div className="space-y-2">
                  {availableDrivers
                    .filter(
                      (d) =>
                        d.price <=
                        (driverToTransfer?.price || 0) + userStats.budget
                    )
                    .sort((a, b) => b.points - a.points)
                    .map((driver) => (
                      <div
                        key={driver.id}
                        className="rounded-xl flex items-center justify-between p-3"
                        style={{
                          background: "var(--ff-surface)",
                          border: "1px solid var(--ff-surface-border)",
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className="w-2 h-2 rounded-full"
                            style={{ background: driver.teamColor }}
                          />
                          <div>
                            <p
                              style={{
                                fontFamily: "'Inter', sans-serif",
                                fontSize: 13,
                                fontWeight: 600,
                                color: "var(--ff-text-primary)",
                              }}
                            >
                              {driver.name}
                            </p>
                            <p
                              style={{
                                fontFamily: "'Barlow Condensed', sans-serif",
                                fontSize: 11,
                                color: driver.teamColor,
                              }}
                            >
                              {driver.team}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <p
                              style={{
                                fontFamily: "'Barlow Condensed', sans-serif",
                                fontSize: 14,
                                fontWeight: 700,
                                color: "var(--ff-text-primary)",
                              }}
                            >
                              {driver.points} pts
                            </p>
                            <p
                              style={{
                                fontFamily: "'Barlow Condensed', sans-serif",
                                fontSize: 12,
                                color:
                                  driver.price > (driverToTransfer?.price || 0)
                                    ? "#E10600"
                                    : "#4CAF50",
                              }}
                            >
                              €{driver.price}M
                            </p>
                          </div>
                          <button
                            className="px-3 py-2 rounded-lg"
                            style={{
                              background: "#E10600",
                              fontFamily: "'Barlow Condensed', sans-serif",
                              fontSize: 12,
                              fontWeight: 800,
                              color: "white",
                              letterSpacing: "0.05em",
                              textTransform: "uppercase",
                            }}
                            onClick={() => setSelectedForTransfer(null)}
                          >
                            IN
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
