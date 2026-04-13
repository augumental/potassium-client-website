const features = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.955 11.955 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    title: "Fully Undetected",
    desc: "Engineered to stay ahead of anti-cheat systems with regular stealth updates and zero detection history.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7.864 4.243A7.5 7.5 0 0119.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 004.5 10.5a7.464 7.464 0 01-1.15 3.993m1.989 3.559A11.209 11.209 0 008.25 10.5a3.75 3.75 0 117.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 01-3.6 9.75m6.633-4.596a18.666 18.666 0 01-2.485 5.33" />
      </svg>
    ),
    title: "Screenshare Bypass",
    desc: "Bypasses both manual screenshares and Ocean-based detection. Play confidently in any environment.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    title: "Lightweight & Optimized",
    desc: "Minimal CPU & RAM footprint. Zero FPS loss — built for peak performance on every machine.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
      </svg>
    ),
    title: "Constant Updates",
    desc: "Our team pushes updates regularly to stay ahead of patches. You never fall behind.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0H3" />
      </svg>
    ),
    title: "User-Friendly Interface",
    desc: "Clean, intuitive in-game GUI. Configure everything in seconds — no tech expertise required.",
  },
]

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 px-6 relative">
      {/* Background glow */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, oklch(0.55 0.28 300 / 0.07) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-6xl mx-auto relative">
        <div className="text-center mb-16">
          <p className="text-xs tracking-widest uppercase text-primary mb-3">Why Potassium</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white text-balance">
            Everything you need,
            <br />
            <span className="text-muted-foreground font-light">nothing you don&apos;t.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <div
              key={i}
              className="glass-card glass-card-hover rounded-2xl p-6 glow-border group"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
                style={{
                  background: "oklch(0.55 0.28 300 / 0.15)",
                  border: "1px solid oklch(0.65 0.28 300 / 0.25)",
                  color: "oklch(0.75 0.28 300)",
                }}
              >
                {f.icon}
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">{f.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}

          {/* Span card — CTA */}
          <div
            className="glass-card-hover rounded-2xl p-6 flex flex-col justify-center items-center text-center md:col-span-2 lg:col-span-1 glow-border"
            style={{
              background: "oklch(0.55 0.28 300 / 0.08)",
              border: "1px solid oklch(0.65 0.28 300 / 0.3)",
              backdropFilter: "blur(20px)",
            }}
          >
            <p className="text-4xl font-bold text-white mb-1">7+</p>
            <p className="text-muted-foreground text-sm">Pricing tiers to fit every budget</p>
            <a
              href="#pricing"
              className="mt-4 btn-primary text-white text-xs font-semibold px-6 py-2.5 rounded-full"
            >
              See Plans
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
