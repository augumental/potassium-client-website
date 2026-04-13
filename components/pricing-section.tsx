const plans = [
  { duration: "1 Day", price: "$2.50", popular: false },
  { duration: "3 Days", price: "$5.00", popular: false },
  { duration: "5 Days", price: "$7.50", popular: false },
  { duration: "10 Days", price: "$13.00", popular: true },
  { duration: "20 Days", price: "$20.00", popular: false },
  { duration: "30 Days", price: "$25.00", popular: false },
  { duration: "Lifetime", price: "$50.00", popular: false },
]

export default function PricingSection() {
  return (
    <section id="pricing" className="py-24 px-6 relative">
      {/* Glow */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, oklch(0.55 0.28 300 / 0.08) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-6xl mx-auto relative">
        <div className="text-center mb-6">
          <p className="text-xs tracking-widest uppercase text-primary mb-3">Pricing</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white text-balance">
            Best Value Pricing
          </h2>
          <p className="text-muted-foreground mt-3 text-sm">
            You Choose the Duration
          </p>
        </div>

        {/* Preorder banner */}
        <div
          className="flex items-center justify-center gap-3 mb-10 glass-card rounded-2xl px-6 py-4 max-w-xl mx-auto border"
          style={{ borderColor: "oklch(0.65 0.28 300 / 0.3)" }}
        >
          <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ color: "oklch(0.65 0.28 300)" }}>
            <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
          </svg>
          <div>
            <span className="text-white font-semibold text-sm">Preorders Available Now</span>
            <p className="text-muted-foreground text-xs">
              Handled through our Discord —{" "}
              <a
                href="https://discord.gg/mgclient"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 transition-colors"
                style={{ color: "oklch(0.72 0.28 300)" }}
              >
                discord.gg/mgclient
              </a>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`glass-card glass-card-hover rounded-2xl p-5 flex flex-col items-center text-center relative overflow-hidden ${
                plan.popular ? "glow-border" : ""
              }`}
              style={
                plan.popular
                  ? {
                      borderColor: "oklch(0.65 0.28 300 / 0.6)",
                      background: "oklch(0.55 0.28 300 / 0.12)",
                    }
                  : {}
              }
            >
              {plan.popular && (
                <div
                  className="absolute top-0 left-0 right-0 text-center text-xs font-semibold py-1 tracking-wider"
                  style={{
                    background: "linear-gradient(135deg, oklch(0.55 0.28 300), oklch(0.65 0.30 310))",
                    color: "white",
                  }}
                >
                  POPULAR
                </div>
              )}
              <div className={plan.popular ? "mt-4" : ""}>
                <p className="text-muted-foreground text-xs mb-2 tracking-wide uppercase">{plan.duration}</p>
                <p
                  className="text-3xl font-bold text-white"
                  style={plan.popular ? { color: "oklch(0.82 0.28 300)" } : {}}
                >
                  {plan.price}
                </p>
              </div>
              <a
                href="https://discord.gg/mgclient"
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-4 w-full text-xs font-semibold py-2 rounded-xl text-center transition-all duration-300 ${
                  plan.popular ? "btn-primary text-white" : "btn-secondary text-white"
                }`}
              >
                Buy Now
              </a>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-muted-foreground mt-8">
          All purchases are handled via Discord. Join{" "}
          <a
            href="https://discord.gg/mgclient"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2"
            style={{ color: "oklch(0.72 0.28 300)" }}
          >
            discord.gg/mgclient
          </a>{" "}
          to get started.
        </p>
      </div>
    </section>
  )
}
