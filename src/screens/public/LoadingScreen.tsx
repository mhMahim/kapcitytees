const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background overflow-hidden">
      {/* Ambient glow — uses primary color */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 50% 50%, color-mix(in oklch, var(--primary) 18%, transparent) 0%, transparent 70%)",
        }}
      />

      {/* ── Spinner ── */}
      <div
        className="relative flex items-center justify-center"
        style={{ width: 112, height: 112 }}
      >
        {/* Outer ring — primary color */}
        <span
          className="absolute rounded-full border-2 animate-spin"
          style={{
            width: 112,
            height: 112,
            borderColor: "var(--primary) transparent transparent transparent",
            animationDuration: "1.1s",
            animationTimingFunction: "cubic-bezier(0.4,0,0.2,1)",
          }}
        />

        {/* Mid ring — ring color */}
        <span
          className="absolute rounded-full border-2 animate-spin"
          style={{
            width: 80,
            height: 80,
            borderColor: "transparent var(--ring) transparent transparent",
            animationDuration: "1.6s",
            animationTimingFunction: "cubic-bezier(0.4,0,0.2,1)",
            animationDirection: "reverse",
          }}
        />

        {/* Inner ring — secondary-foreground */}
        <span
          className="absolute rounded-full border animate-spin"
          style={{
            width: 50,
            height: 50,
            borderColor:
              "var(--secondary-foreground) transparent transparent transparent",
            animationDuration: "2.2s",
            animationTimingFunction: "linear",
          }}
        />

        {/* Core dot */}
        <span
          className="absolute rounded-full animate-pulse"
          style={{
            width: 14,
            height: 14,
            background: "var(--primary)",
            boxShadow:
              "0 0 16px 4px color-mix(in oklch, var(--primary) 55%, transparent)",
            animationDuration: "1.4s",
          }}
        />
      </div>

      {/* ── Label ── */}
      <div className="mt-8 flex items-center gap-2">
        <span
          className="font-inter text-xs font-semibold uppercase tracking-[0.3em]"
          style={{ color: "var(--muted-foreground)" }}
        >
          Loading
        </span>

        {/* Bouncing dots */}
        <span className="flex items-end gap-[3px] pb-[1px]">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="block rounded-full animate-bounce"
              style={{
                width: 4,
                height: 4,
                background: "var(--primary)",
                animationDelay: `${i * 0.18}s`,
                animationDuration: "0.9s",
              }}
            />
          ))}
        </span>
      </div>

      {/* Progress bar strip at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[2px]"
        style={{ background: "var(--border)" }}
      >
        <div
          className="h-full"
          style={{
            background: `linear-gradient(90deg, var(--primary), var(--ring))`,
            animation: "progressBar 1.8s ease-in-out infinite",
            transformOrigin: "left center",
          }}
        />
      </div>

      <style>{`
        @keyframes progressBar {
          0%   { width: 0%;   margin-left: 0%; }
          50%  { width: 60%;  margin-left: 20%; }
          100% { width: 0%;   margin-left: 100%; }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
