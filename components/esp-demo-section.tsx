"use client"

import { useRef, useEffect, useState, useCallback } from "react"

const DEFAULT_USERNAME = "Notch"
const BOX_W = 104
const BOX_H = 196
const ENTITY_H = 220 // box + name tag below

export default function EspDemoSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [dragging, setDragging] = useState(false)
  const dragOffset = useRef({ x: 0, y: 0 })
  const initialized = useRef(false)

  const [username, setUsername] = useState(DEFAULT_USERNAME)
  const [inputValue, setInputValue] = useState(DEFAULT_USERNAME)

  // Crafatar body render URL — updates when username changes
  const bodyUrl = `https://crafatar.com/renders/body/${encodeURIComponent(username)}?scale=6&overlay`

  const [imgError, setImgError] = useState(false)
  const [hp] = useState(() => Math.floor(Math.random() * 60) + 40)
  const [distance, setDistance] = useState(12)

  // Recompute distance as player moves
  useEffect(() => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const cx = rect.width / 2
    const cy = rect.height / 2
    const px = pos.x + BOX_W / 2
    const py = pos.y + BOX_H / 2
    const px_dist = Math.sqrt((px - cx) ** 2 + (py - cy) ** 2)
    setDistance(Math.max(1, Math.round(px_dist / 8)))
  }, [pos])

  // Center on mount
  useEffect(() => {
    if (containerRef.current && !initialized.current) {
      initialized.current = true
      const rect = containerRef.current.getBoundingClientRect()
      setPos({ x: rect.width / 2 - BOX_W / 2, y: rect.height / 2 - BOX_H / 2 })
    }
  }, [])

  const onMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      setDragging(true)
      dragOffset.current = { x: e.clientX - pos.x, y: e.clientY - pos.y }
    },
    [pos]
  )

  const onTouchStart = useCallback(
    (e: React.TouchEvent) => {
      e.preventDefault()
      const t = e.touches[0]
      setDragging(true)
      dragOffset.current = { x: t.clientX - pos.x, y: t.clientY - pos.y }
    },
    [pos]
  )

  useEffect(() => {
    if (!dragging) return

    const onMove = (e: MouseEvent | TouchEvent) => {
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const newX = Math.min(Math.max(0, clientX - rect.left - dragOffset.current.x), rect.width - BOX_W)
      const newY = Math.min(Math.max(0, clientY - rect.top - dragOffset.current.y), rect.height - ENTITY_H)
      setPos({ x: newX, y: newY })
    }

    const onUp = () => setDragging(false)

    window.addEventListener("mousemove", onMove)
    window.addEventListener("mouseup", onUp)
    window.addEventListener("touchmove", onMove, { passive: false })
    window.addEventListener("touchend", onUp)
    return () => {
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("mouseup", onUp)
      window.removeEventListener("touchmove", onMove)
      window.removeEventListener("touchend", onUp)
    }
  }, [dragging])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = inputValue.trim()
    if (trimmed) {
      setImgError(false)
      setUsername(trimmed)
    }
  }

  const hpPercent = Math.min(100, Math.max(0, hp))
  const hpColor =
    hpPercent > 60
      ? "oklch(0.65 0.28 160)"
      : hpPercent > 30
      ? "oklch(0.75 0.28 80)"
      : "oklch(0.65 0.28 25)"

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
        <div className="text-center mb-10">
          <p className="text-xs tracking-widest uppercase text-primary mb-3">Interactive Demo</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white text-balance">
            See the ESP in action
          </h2>
          <p className="text-muted-foreground mt-3 text-sm max-w-md mx-auto">
            Enter any Minecraft username to load their skin, then drag the hitbox around the game world.
          </p>
        </div>

        {/* Username input */}
        <form onSubmit={handleSubmit} className="flex justify-center gap-2 mb-8">
          <div
            className="flex items-center glass-card rounded-xl overflow-hidden"
            style={{ border: "1px solid oklch(0.55 0.20 300 / 0.4)" }}
          >
            <span className="px-3 text-xs font-mono text-muted-foreground select-none border-r"
              style={{ borderColor: "oklch(0.45 0.18 300 / 0.3)", paddingRight: "0.75rem", paddingTop: "0.5rem", paddingBottom: "0.5rem" }}>
              IGN
            </span>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              maxLength={16}
              placeholder="Enter username…"
              className="bg-transparent outline-none text-sm font-mono text-white py-2 px-3 w-44 placeholder:text-muted-foreground"
              style={{ caretColor: "oklch(0.72 0.28 300)" }}
            />
          </div>
          <button
            type="submit"
            className="btn-primary rounded-xl px-5 py-2 text-sm font-semibold text-white"
          >
            Load Skin
          </button>
        </form>

        {/* Game viewport */}
        <div
          ref={containerRef}
          className="relative rounded-3xl overflow-hidden glow-border select-none"
          style={{
            height: "460px",
            background: "oklch(0.10 0.03 290 / 0.85)",
            backgroundImage:
              "linear-gradient(oklch(0.28 0.08 290 / 0.10) 1px, transparent 1px), linear-gradient(90deg, oklch(0.28 0.08 290 / 0.10) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            cursor: dragging ? "grabbing" : "default",
            border: "1px solid oklch(0.45 0.18 300 / 0.3)",
          }}
        >
          {/* HUD: ESP status */}
          <div
            className="absolute top-3 left-3 glass-card rounded-lg px-3 py-1.5 font-mono text-xs flex items-center gap-2"
            style={{ color: "oklch(0.72 0.28 300)", zIndex: 10 }}
          >
            <span
              className="inline-block w-1.5 h-1.5 rounded-full"
              style={{
                background: "oklch(0.65 0.28 160)",
                boxShadow: "0 0 6px oklch(0.65 0.28 160)",
              }}
            />
            ESP ACTIVE
          </div>

          {/* HUD: FPS */}
          <div
            className="absolute top-3 right-3 glass-card rounded-lg px-3 py-1.5 font-mono text-xs"
            style={{ color: "oklch(0.65 0.28 160)", zIndex: 10 }}
          >
            420 FPS
          </div>

          {/* Crosshair */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{ zIndex: 5 }}
          >
            <div className="relative w-5 h-5">
              <div className="absolute top-1/2 left-0 right-0 h-px bg-white/70" />
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/70" />
              <div
                className="absolute inset-0 m-auto w-2 h-2 rounded-full border"
                style={{
                  borderColor: "oklch(0.72 0.28 300)",
                  boxShadow: "0 0 6px oklch(0.72 0.28 300)",
                }}
              />
            </div>
          </div>

          {/* Draggable ESP entity */}
          <div
            onMouseDown={onMouseDown}
            onTouchStart={onTouchStart}
            className="absolute"
            style={{
              left: pos.x,
              top: pos.y,
              width: BOX_W,
              cursor: dragging ? "grabbing" : "grab",
              zIndex: 20,
              touchAction: "none",
            }}
          >
            {/* ESP bounding box */}
            <div
              className="relative"
              style={{
                width: BOX_W,
                height: BOX_H,
                border: "1.5px solid oklch(0.72 0.28 300 / 0.9)",
                borderRadius: 3,
                boxShadow:
                  "0 0 18px oklch(0.65 0.28 300 / 0.45), inset 0 0 18px oklch(0.65 0.28 300 / 0.04)",
              }}
            >
              {/* Corner brackets */}
              {(
                [
                  { style: { top: -2, left: -2 }, bt: true, bl: true },
                  { style: { top: -2, right: -2 }, bt: true, br: true },
                  { style: { bottom: -2, left: -2 }, bb: true, bl: true },
                  { style: { bottom: -2, right: -2 }, bb: true, br: true },
                ] as const
              ).map((c, i) => (
                <div
                  key={i}
                  className="absolute w-3 h-3"
                  style={{
                    ...c.style,
                    borderTop: c.bt ? "2px solid oklch(0.88 0.28 300)" : undefined,
                    borderBottom: c.bb ? "2px solid oklch(0.88 0.28 300)" : undefined,
                    borderLeft: c.bl ? "2px solid oklch(0.88 0.28 300)" : undefined,
                    borderRight: c.br ? "2px solid oklch(0.88 0.28 300)" : undefined,
                  }}
                />
              ))}

              {/* Player skin render from Crafatar */}
              <div className="flex items-end justify-center h-full pb-1 pointer-events-none overflow-hidden">
                {imgError ? (
                  <div className="flex flex-col items-center justify-center gap-1 opacity-50 pb-4">
                    <div
                      className="w-10 h-16 rounded"
                      style={{ background: "oklch(0.30 0.08 290 / 0.6)" }}
                    />
                    <span className="text-xs font-mono" style={{ color: "oklch(0.55 0.15 300)", fontSize: 9 }}>
                      not found
                    </span>
                  </div>
                ) : (
                  <img
                    key={bodyUrl}
                    src={bodyUrl}
                    alt={`${username} skin`}
                    crossOrigin="anonymous"
                    onError={() => setImgError(true)}
                    style={{
                      height: "182px",
                      width: "auto",
                      imageRendering: "pixelated",
                      filter: "drop-shadow(0 0 10px oklch(0.65 0.28 300 / 0.5))",
                    }}
                  />
                )}
              </div>

              {/* HP bar */}
              <div className="absolute left-1.5 right-1.5" style={{ bottom: 5 }}>
                <div
                  className="h-1 rounded-full overflow-hidden"
                  style={{ background: "oklch(0.18 0.06 290 / 0.8)" }}
                >
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${hpPercent}%`, background: hpColor }}
                  />
                </div>
              </div>
            </div>

            {/* Name tag + distance */}
            <div className="mt-1 flex flex-col items-center gap-0.5">
              <div
                className="px-2 py-0.5 rounded text-center font-mono whitespace-nowrap"
                style={{
                  fontSize: 10,
                  background: "oklch(0.08 0.03 290 / 0.85)",
                  color: "white",
                  border: "1px solid oklch(0.45 0.18 300 / 0.4)",
                  maxWidth: 130,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {username}
              </div>
              <div
                className="px-1.5 py-px rounded font-mono"
                style={{
                  fontSize: 9,
                  color: "oklch(0.65 0.20 300)",
                  background: "oklch(0.08 0.03 290 / 0.7)",
                }}
              >
                {distance}m
              </div>
            </div>
          </div>

          {/* Bottom hint */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2" style={{ zIndex: 10 }}>
            <span
              className="text-xs font-mono px-3 py-1 rounded-lg glass-card"
              style={{ color: "oklch(0.55 0.15 300)" }}
            >
              drag the hitbox to track the player
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
