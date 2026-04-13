"use client"

import { useState, useEffect } from "react"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handler)
    return () => window.removeEventListener("scroll", handler)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass-card border-b"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full btn-primary flex items-center justify-center text-white font-bold text-sm">
            K
          </div>
          <span className="text-white font-semibold tracking-wide">Potassium</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {["Features", "Demo", "Pricing", "Discord"].map((item) => (
            <a
              key={item}
              href={item === "Discord" ? "https://discord.gg/mgclient" : `#${item.toLowerCase()}`}
              target={item === "Discord" ? "_blank" : undefined}
              rel={item === "Discord" ? "noopener noreferrer" : undefined}
              className="text-sm text-muted-foreground hover:text-white transition-colors duration-200"
            >
              {item}
            </a>
          ))}
        </div>

        <a
          href="#pricing"
          className="btn-primary text-white text-sm font-medium px-5 py-2 rounded-full"
        >
          Get Access
        </a>
      </div>
    </nav>
  )
}
