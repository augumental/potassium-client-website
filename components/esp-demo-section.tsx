"use client"

import { useRef, useEffect, useState, useCallback } from "react"

export default function EspDemoSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [dragging, setDragging] = useState(false)
  const dragOffset = useRef({ x: 0, y: 0 })
  const initialized = useRef(false)

  // Center on mount
  useEffect(() => {
    if (containerRef.current && !initialized.current) {
      initialized.current = true
      const rect = containerRef.current.getBoundingClientRect()
      setPos({ x: rect.width / 2 - 50, y: rect.height / 2 - 90 })
    }
  }, [])

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    setDragging(true)
    dragOffset.current = { x: e.clientX - pos.x, y: e.clientY - pos.y }
  }, [pos])

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    const t = e.touches[0]
    setDragging(true)
    dragOffset.current = { x: t.clientX - pos.x, y: t.clientY - pos.y }
  }, [pos])

  useEffect(() => {
    if (!dragging) return

    const onMove = (e: MouseEvent | TouchEvent) => {
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const newX = Math.min(Math.max(0, clientX - dragOffset.current.x), rect.width - 100)
      const newY = Math.min(Math.max(0, clientY - dragOffset.current.y), rect.height - 180)
      setPos({ x: newX, y: newY })
    }

    const onUp = () => setDragging(false)

    window.addEventListener("mousemove", onMove)
    window.addEventListener("mouseup", onUp)
    window.addEventListener("touchmove", onMove)
    window.addEventListener("touchend", onUp)
    return () => {
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("mouseup", onUp)
      window.removeEventListener("touchmove", onMove)
      window.removeEventListener("touchend", onUp)
    }
  }, [dragging])

  return (
    <section id="demo" className="py-24 px-6 relative">
      <div
        className="absolute right-0 top-0 w-[500px] h-[500px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, oklch(0.60 0.30 310 / 0.08) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs tracking-widest uppercase text-primary mb-3">Interactive Demo</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white text-balance">
            See the ESP in action
          </h2>
          <p className="text-muted-foreground mt-3 text-sm max-w-md mx-auto">
            Drag the hitbox around to simulate the ESP overlay. Precise, responsive, and real-time.
          </p>
        </div>

        <div
          ref={containerRef}
          className="relative glass-card rounded-3xl overflow-hidden glow-border"
          style={{
            height: "420px",
            background: "oklch(0.10 0.03 290 / 0.6)",
            backgroundImage:
              "linear-gradient(oklch(0.25 0.08 290 / 0.1) 1px, transparent 1px), linear-gradient(90deg, oklch(0.25 0.08 290 / 0.1) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            cursor: dragging ? "grabbing" : "default",
          }}
        >
          {/* ESP tag top-left */}
          <div className="absolute top-4 left-4 glass-card rounded-lg px-3 py-1 text-xs font-mono" style={{ color: "oklch(0.72 0.28 300)" }}>
            ESP v2.4 — ACTIVE
          </div>

          {/* FPS counter */}
          <div className="absolute top-4 right-4 text-xs font-mono text-green-400 glass-card rounded-lg px-3 py-1">
            420 FPS
          </div>

          {/* Draggable hitbox */}
          <div
            onMouseDown={onMouseDown}
            onTouchStart={onTouchStart}
            className="absolute select-none"
            style={{
              left: pos.x,
              top: pos.y,
              width: 100,
              cursor: dragging ? "grabbing" : "grab",
            }}
          >
            {/* ESP box */}
            <div
              className="relative"
              style={{
                width: 100,
                height: 180,
                border: "2px solid oklch(0.72 0.28 300 / 0.9)",
                borderRadius: 4,
                boxShadow: "0 0 16px oklch(0.65 0.28 300 / 0.5), inset 0 0 16px oklch(0.65 0.28 300 / 0.05)",
              }}
            >
              {/* Corner accents */}
              {[
                "top-0 left-0 border-t-2 border-l-2",
                "top-0 right-0 border-t-2 border-r-2",
                "bottom-0 left-0 border-b-2 border-l-2",
                "bottom-0 right-0 border-b-2 border-r-2",
              ].map((cls, i) => (
                <div
                  key={i}
                  className={`absolute w-3 h-3 ${cls}`}
                  style={{ borderColor: "oklch(0.85 0.28 300)", margin: -2 }}
                />
              ))}

              {/* Minecraft-style character */}
              <div className="flex flex-col items-center justify-center h-full gap-0.5 pointer-events-none">
                {/* Head */}
                <div
                  className="w-9 h-9 rounded-sm flex items-center justify-center text-lg"
                  style={{
                    background: "oklch(0.72 0.15 50)",
                    border: "1px solid oklch(0.55 0.12 50)",
                  }}
                >
                  <span style={{ fontSize: 20 }}>😐</span>
                </div>
                {/* Body */}
                <div
                  className="w-8 h-10 rounded-sm"
                  style={{
                    background: "oklch(0.35 0.18 250)",
                    border: "1px solid oklch(0.28 0.14 250)",
                  }}
                />
                {/* Legs */}
                <div className="flex gap-0.5">
                  <div
                    className="w-3.5 h-8 rounded-sm"
                    style={{
                      background: "oklch(0.30 0.16 240)",
                      border: "1px solid oklch(0.24 0.12 240)",
                    }}
                  />
                  <div
                    className="w-3.5 h-8 rounded-sm"
                    style={{
                      background: "oklch(0.30 0.16 240)",
                      border: "1px solid oklch(0.24 0.12 240)",
                    }}
                  />
                </div>
              </div>

              {/* Health bar */}
              <div
                className="absolute -bottom-6 left-0 right-0"
                style={{ width: 100 }}
              >
                <div className="text-center text-xs font-mono mb-0.5" style={{ color: "oklch(0.72 0.28 300)", fontSize: 9 }}>
                  HP 100/100
                </div>
                <div
                  className="h-1 rounded-full overflow-hidden"
                  style={{ background: "oklch(0.25 0.08 290 / 0.5)" }}
                >
                  <div className="h-full rounded-full" style={{ width: "100%", background: "oklch(0.65 0.28 160)" }} />
                </div>
              </div>
            </div>

            {/* Name tag */}
            <div
              className="text-center mt-7 text-xs font-mono whitespace-nowrap px-1.5 py-0.5 rounded-sm mx-auto w-fit"
              style={{
                color: "white",
                background: "oklch(0.10 0.03 290 / 0.7)",
                fontSize: 10,
              }}
            >
              Player_2847
            </div>
          </div>

          {/* Crosshair */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <div className="relative w-5 h-5">
              <div className="absolute top-1/2 left-0 right-0 h-px bg-white opacity-70" />
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white opacity-70" />
              <div
                className="absolute inset-0 m-auto w-1.5 h-1.5 rounded-full border"
                style={{ borderColor: "oklch(0.72 0.28 300)", boxShadow: "0 0 4px oklch(0.72 0.28 300)" }}
              />
            </div>
          </div>

          {/* Bottom instruction */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center">
            <span className="text-xs text-muted-foreground">
              Drag the hitbox to simulate ESP tracking
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
