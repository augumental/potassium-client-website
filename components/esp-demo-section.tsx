"use client"

import { useRef, useState, useCallback } from "react"

const MODULES = [
  { name: "Triggerbot", category: "Combat", enabled: true, key: "R" },
  { name: "WTap", category: "Combat", enabled: true, key: "W" },
  { name: "AutoStun", category: "Combat", enabled: false, key: "S" },
  { name: "JumpReset", category: "Movement", enabled: true, key: "J" },
  { name: "FastPlace", category: "Movement", enabled: true, key: "F" },
  { name: "FastXP", category: "Movement", enabled: false, key: "X" },
  { name: "ESP", category: "Render", enabled: true, key: "E" },
  { name: "Tracers", category: "Render", enabled: false, key: "T" },
  { name: "AutoPotRefill", category: "Utility", enabled: true, key: "P" },
  { name: "SmartMend", category: "Utility", enabled: true, key: "M" },
]

const CATEGORIES = ["Combat", "Movement", "Render", "Utility"]

export default function EspDemoSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const [username, setUsername] = useState("")
  const [activeCategory, setActiveCategory] = useState("Combat")
  const [modules, setModules] = useState(MODULES)

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isUnlocked || !containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const x = (e.clientY - centerY) / 25
      const y = (e.clientX - centerX) / 25
      setRotation({ x: Math.max(-15, Math.min(15, -x)), y: Math.max(-15, Math.min(15, y)) })
    },
    [isUnlocked]
  )

  const handleMouseLeave = useCallback(() => {
    setRotation({ x: 0, y: 0 })
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = inputValue.trim()
    if (trimmed) {
      setUsername(trimmed)
      setIsUnlocked(true)
    }
  }

  const toggleModule = (name: string) => {
    setModules((prev) =>
      prev.map((m) => (m.name === name ? { ...m, enabled: !m.enabled } : m))
    )
  }

  const headUrl = username
    ? `https://mc-heads.net/avatar/${encodeURIComponent(username)}/64`
    : ""

  return (
    <section id="demo" className="py-24 px-6 relative">
      <div
        className="absolute right-0 top-0 w-[500px] h-[500px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, oklch(0.60 0.30 310 / 0.08) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-xs tracking-widest uppercase text-primary mb-3">Interactive Preview</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white text-balance">
            Experience the Client
          </h2>
          <p className="text-muted-foreground mt-3 text-sm max-w-md mx-auto">
            Move your mouse around to explore the GUI in 3D. Enter your username to personalize the experience.
          </p>
        </div>

        {/* 3D GUI Container */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative flex items-center justify-center rounded-3xl overflow-hidden"
          style={{
            height: "520px",
            perspective: "1200px",
            background: "oklch(0.06 0.02 290 / 0.5)",
            border: "1px solid oklch(0.35 0.15 300 / 0.3)",
          }}
        >
          {/* Background grid */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(oklch(0.25 0.10 300 / 0.08) 1px, transparent 1px), linear-gradient(90deg, oklch(0.25 0.10 300 / 0.08) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />

          {/* Blurred overlay when locked */}
          {!isUnlocked && (
            <div
              className="absolute inset-0 z-30 flex flex-col items-center justify-center"
              style={{
                backdropFilter: "blur(16px)",
                background: "oklch(0.06 0.03 290 / 0.85)",
              }}
            >
              <div className="glass-card rounded-2xl p-6 md:p-8 max-w-sm mx-4 text-center">
                <div
                  className="w-16 h-16 mx-auto mb-5 rounded-xl flex items-center justify-center"
                  style={{
                    background: "oklch(0.18 0.12 300 / 0.6)",
                    border: "1px solid oklch(0.55 0.22 300 / 0.5)",
                    boxShadow: "0 0 30px oklch(0.65 0.28 300 / 0.3)",
                  }}
                >
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="oklch(0.78 0.28 300)"
                    strokeWidth={1.5}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
                    />
                  </svg>
                </div>
                <h3
                  className="text-2xl font-bold text-white mb-2"
                  style={{ fontFamily: "var(--font-minecraft)" }}
                >
                  Unlock Preview
                </h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Enter your Minecraft username to preview the Potassium Client GUI.
                </p>
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    maxLength={16}
                    placeholder="Enter username..."
                    autoFocus
                    className="w-full outline-none text-sm text-white py-3 px-4 rounded-xl placeholder:text-muted-foreground"
                    style={{
                      fontFamily: "var(--font-minecraft)",
                      caretColor: "oklch(0.72 0.28 300)",
                      background: "oklch(0.10 0.04 290 / 0.7)",
                      border: "1px solid oklch(0.45 0.18 300 / 0.5)",
                    }}
                  />
                  <button
                    type="submit"
                    disabled={!inputValue.trim()}
                    className="btn-primary rounded-xl px-5 py-3 text-sm font-bold text-white disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
                    style={{ fontFamily: "var(--font-minecraft)" }}
                  >
                    Open GUI
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* 3D Turnable GUI */}
          <div
            className="relative transition-transform duration-150 ease-out"
            style={{
              transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
              transformStyle: "preserve-3d",
              width: "min(90vw, 560px)",
            }}
          >
            {/* Main GUI Panel */}
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                background: "oklch(0.10 0.05 290 / 0.92)",
                border: "1px solid oklch(0.50 0.22 300 / 0.5)",
                boxShadow:
                  "0 0 60px oklch(0.65 0.28 300 / 0.25), 0 25px 50px oklch(0 0 0 / 0.5), inset 0 1px 0 oklch(1 0 0 / 0.05)",
                backdropFilter: "blur(24px)",
              }}
            >
              {/* Title Bar */}
              <div
                className="flex items-center justify-between px-4 py-3"
                style={{
                  background: "linear-gradient(180deg, oklch(0.18 0.10 300 / 0.8), oklch(0.12 0.06 290 / 0.8))",
                  borderBottom: "1px solid oklch(0.50 0.22 300 / 0.4)",
                }}
              >
                <div className="flex items-center gap-3">
                  {/* Player head */}
                  {username && (
                    <div
                      className="w-8 h-8 rounded overflow-hidden"
                      style={{
                        border: "1px solid oklch(0.55 0.22 300 / 0.6)",
                        boxShadow: "0 0 10px oklch(0.65 0.28 300 / 0.3)",
                        imageRendering: "pixelated",
                      }}
                    >
                      <img
                        src={headUrl}
                        alt={username}
                        crossOrigin="anonymous"
                        className="w-full h-full"
                        style={{ imageRendering: "pixelated" }}
                      />
                    </div>
                  )}
                  <div>
                    <h3
                      className="text-white text-sm font-bold tracking-wide"
                      style={{ fontFamily: "var(--font-minecraft)" }}
                    >
                      Potassium Client
                    </h3>
                    <p
                      className="text-xs"
                      style={{ color: "oklch(0.60 0.15 300)", fontFamily: "var(--font-minecraft)", fontSize: 9 }}
                    >
                      v2.4.1 | {username}
                    </p>
                  </div>
                </div>
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full" style={{ background: "oklch(0.65 0.28 100)" }} />
                  <div className="w-3 h-3 rounded-full" style={{ background: "oklch(0.70 0.28 85)" }} />
                  <div className="w-3 h-3 rounded-full" style={{ background: "oklch(0.65 0.28 25)" }} />
                </div>
              </div>

              {/* Content */}
              <div className="flex" style={{ minHeight: 340 }}>
                {/* Sidebar - Categories */}
                <div
                  className="w-32 flex-shrink-0 py-3 px-2 flex flex-col gap-1"
                  style={{
                    background: "oklch(0.08 0.04 290 / 0.6)",
                    borderRight: "1px solid oklch(0.40 0.18 300 / 0.3)",
                  }}
                >
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className="w-full text-left px-3 py-2 rounded-lg transition-all"
                      style={{
                        fontFamily: "var(--font-minecraft)",
                        fontSize: 11,
                        color: activeCategory === cat ? "white" : "oklch(0.60 0.12 300)",
                        background:
                          activeCategory === cat
                            ? "linear-gradient(135deg, oklch(0.45 0.22 300 / 0.6), oklch(0.35 0.18 310 / 0.6))"
                            : "transparent",
                        border: activeCategory === cat ? "1px solid oklch(0.60 0.25 300 / 0.5)" : "1px solid transparent",
                        boxShadow: activeCategory === cat ? "0 0 12px oklch(0.65 0.28 300 / 0.3)" : "none",
                      }}
                    >
                      {cat}
                    </button>
                  ))}

                  <div className="flex-1" />

                  {/* Settings button */}
                  <button
                    className="w-full text-left px-3 py-2 rounded-lg transition-all flex items-center gap-2"
                    style={{
                      fontFamily: "var(--font-minecraft)",
                      fontSize: 11,
                      color: "oklch(0.55 0.10 300)",
                      background: "transparent",
                      border: "1px solid transparent",
                    }}
                  >
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Settings
                  </button>
                </div>

                {/* Module Grid */}
                <div className="flex-1 p-4">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {modules
                      .filter((m) => m.category === activeCategory)
                      .map((mod) => (
                        <button
                          key={mod.name}
                          onClick={() => toggleModule(mod.name)}
                          className="relative text-left p-3 rounded-xl transition-all group"
                          style={{
                            background: mod.enabled
                              ? "linear-gradient(135deg, oklch(0.35 0.20 300 / 0.5), oklch(0.28 0.16 310 / 0.5))"
                              : "oklch(0.12 0.04 290 / 0.5)",
                            border: mod.enabled
                              ? "1px solid oklch(0.60 0.25 300 / 0.6)"
                              : "1px solid oklch(0.35 0.12 300 / 0.3)",
                            boxShadow: mod.enabled ? "0 0 15px oklch(0.65 0.28 300 / 0.25)" : "none",
                          }}
                        >
                          {/* Status indicator */}
                          <div
                            className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full"
                            style={{
                              background: mod.enabled ? "oklch(0.70 0.30 160)" : "oklch(0.40 0.10 300)",
                              boxShadow: mod.enabled ? "0 0 8px oklch(0.70 0.30 160)" : "none",
                            }}
                          />

                          <div
                            className="text-xs font-bold mb-0.5"
                            style={{
                              fontFamily: "var(--font-minecraft)",
                              color: mod.enabled ? "white" : "oklch(0.55 0.10 300)",
                            }}
                          >
                            {mod.name}
                          </div>
                          <div
                            className="text-xs"
                            style={{
                              fontFamily: "var(--font-minecraft)",
                              fontSize: 9,
                              color: mod.enabled ? "oklch(0.70 0.15 300)" : "oklch(0.45 0.08 300)",
                            }}
                          >
                            [{mod.key}]
                          </div>
                        </button>
                      ))}
                  </div>

                  {/* Module info panel */}
                  <div
                    className="mt-4 p-3 rounded-xl"
                    style={{
                      background: "oklch(0.08 0.03 290 / 0.6)",
                      border: "1px solid oklch(0.35 0.15 300 / 0.3)",
                    }}
                  >
                    <div
                      className="text-xs mb-1"
                      style={{ fontFamily: "var(--font-minecraft)", color: "oklch(0.55 0.12 300)" }}
                    >
                      Active Modules
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {modules
                        .filter((m) => m.enabled)
                        .map((m) => (
                          <span
                            key={m.name}
                            className="px-2 py-0.5 rounded text-xs"
                            style={{
                              fontFamily: "var(--font-minecraft)",
                              fontSize: 9,
                              background: "oklch(0.40 0.20 300 / 0.4)",
                              color: "oklch(0.85 0.15 300)",
                              border: "1px solid oklch(0.55 0.20 300 / 0.4)",
                            }}
                          >
                            {m.name}
                          </span>
                        ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div
                className="flex items-center justify-between px-4 py-2"
                style={{
                  background: "oklch(0.08 0.04 290 / 0.6)",
                  borderTop: "1px solid oklch(0.40 0.18 300 / 0.3)",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-minecraft)",
                    fontSize: 9,
                    color: "oklch(0.50 0.10 300)",
                  }}
                >
                  potassium.gg
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-minecraft)",
                    fontSize: 9,
                    color: "oklch(0.65 0.20 160)",
                  }}
                >
                  UNDETECTED
                </span>
              </div>
            </div>

            {/* 3D shadow layer */}
            <div
              className="absolute -z-10 inset-0 rounded-2xl"
              style={{
                transform: "translateZ(-40px)",
                background: "oklch(0.65 0.28 300 / 0.15)",
                filter: "blur(30px)",
              }}
            />
          </div>

          {/* Instruction */}
          {isUnlocked && (
            <div
              className="absolute bottom-4 left-1/2 -translate-x-1/2"
              style={{ zIndex: 10 }}
            >
              <span
                className="text-xs px-4 py-1.5 rounded-full glass-card"
                style={{
                  fontFamily: "var(--font-minecraft)",
                  fontSize: 10,
                  color: "oklch(0.55 0.15 300)",
                }}
              >
                move mouse to rotate | click modules to toggle
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
