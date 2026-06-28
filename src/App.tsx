import { useState, useEffect, useRef } from "react";

const LOADING_MESSAGES = [
  "Verifying memes...",
  "Checking brain cells...",
  "Scanning suspicious activities...",
  "Contacting FBI...",
  "Finding your last brain cell...",
];

const RANDOM_RESULTS = [
  {
    title: "😂 Login Successful",
    message: "Welcome back, Professional Procrastinator.",
    color: "#22c55e",
    bg: "from-green-400 to-emerald-500",
  },
  {
    title: "🤣 Login Failed",
    message: "Incorrect password. Hint: It's still not 'password123'.",
    color: "#f97316",
    bg: "from-orange-400 to-red-400",
  },
  {
    title: "💀 Account Suspended",
    message: "Too many cringe reels detected.",
    color: "#6366f1",
    bg: "from-indigo-400 to-purple-500",
  },
  {
    title: "🚔 Access Denied",
    message: "FBI is already watching you.",
    color: "#3b82f6",
    bg: "from-blue-400 to-cyan-400",
  },
  {
    title: "🐵 Human Verification Failed",
    message: "Our AI thinks you're a monkey.",
    color: "#ec4899",
    bg: "from-pink-400 to-rose-500",
  },
];

const BUBBLES = [
  { size: 90, top: "8%", left: "5%", delay: "0s", duration: "6s", color: "#bfdbfe" },
  { size: 60, top: "70%", left: "3%", delay: "1s", duration: "8s", color: "#ddd6fe" },
  { size: 110, top: "15%", left: "88%", delay: "0.5s", duration: "7s", color: "#bbf7d0" },
  { size: 50, top: "80%", left: "85%", delay: "2s", duration: "5s", color: "#fde68a" },
  { size: 75, top: "50%", left: "92%", delay: "1.5s", duration: "9s", color: "#fecdd3" },
  { size: 40, top: "35%", left: "1%", delay: "3s", duration: "6.5s", color: "#a5f3fc" },
  { size: 65, top: "90%", left: "45%", delay: "0.8s", duration: "7.5s", color: "#d9f99d" },
  { size: 55, top: "5%", left: "55%", delay: "2.5s", duration: "8.5s", color: "#fbcfe8" },
  { size: 45, top: "60%", left: "75%", delay: "1.2s", duration: "6s", color: "#e9d5ff" },
  { size: 80, top: "25%", left: "20%", delay: "3.5s", duration: "9s", color: "#bae6fd" },
];

export default function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState("");
  const [, setLoadingIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [popup, setPopup] = useState<null | (typeof RANDOM_RESULTS)[0]>(null);
  const [popupVisible, setPopupVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  const handleLogin = () => {
    if (isLoading) return;
    setIsLoading(true);
    setLoadingIndex(0);
    setLoadingMsg(LOADING_MESSAGES[0]);
    setProgress(0);

    let msgIdx = 0;
    const msgInterval = 3000 / LOADING_MESSAGES.length;

    intervalRef.current = setInterval(() => {
      msgIdx = (msgIdx + 1) % LOADING_MESSAGES.length;
      setLoadingIndex(msgIdx);
      setLoadingMsg(LOADING_MESSAGES[msgIdx]);
    }, msgInterval);

    let prog = 0;
    progressRef.current = setInterval(() => {
      prog += 1;
      setProgress(prog);
      if (prog >= 100) {
        if (progressRef.current) clearInterval(progressRef.current);
      }
    }, 3000 / 100);

    setTimeout(() => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
      setProgress(100);
      setIsLoading(false);
      const result = RANDOM_RESULTS[Math.floor(Math.random() * RANDOM_RESULTS.length)];
      setPopup(result);
      setTimeout(() => setPopupVisible(true), 10);
    }, 3000);
  };

  const closePopup = () => {
    setPopupVisible(false);
    setTimeout(() => setPopup(null), 350);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <div
      style={{ fontFamily: "'Inter', sans-serif" }}
      className="relative min-h-screen overflow-hidden flex items-center justify-center"
    >
      {/* Soft blue gradient background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(135deg, #dbeafe 0%, #eff6ff 30%, #e0f2fe 60%, #f0f9ff 80%, #dbeafe 100%)",
        }}
      />

      {/* Floating background bubbles */}
      {BUBBLES.map((b, i) => (
        <div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: b.size,
            height: b.size,
            top: b.top,
            left: b.left,
            background: b.color,
            opacity: 0.55,
            animation: `floatBubble ${b.duration} ease-in-out infinite alternate`,
            animationDelay: b.delay,
            filter: "blur(2px)",
          }}
        />
      ))}

      {/* Main card */}
      <div
        className="relative z-10 flex flex-col items-center"
        style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0px) scale(1)" : "translateY(32px) scale(0.97)",
          transition: "opacity 0.7s cubic-bezier(.4,0,.2,1), transform 0.7s cubic-bezier(.4,0,.2,1)",
        }}
      >
        <div
          className="relative flex flex-col items-center px-10 py-10"
          style={{
            width: 400,
            borderRadius: 32,
            background: "rgba(255,255,255,0.68)",
            backdropFilter: "blur(24px) saturate(180%)",
            WebkitBackdropFilter: "blur(24px) saturate(180%)",
            boxShadow:
              "0 8px 48px 0 rgba(79,142,247,0.14), 0 2px 16px 0 rgba(79,142,247,0.10), 0 1.5px 0 1px rgba(255,255,255,0.85) inset",
            border: "1.5px solid rgba(255,255,255,0.80)",
          }}
        >
          {/* Gloss shine top */}
          <div
            className="absolute top-0 left-0 right-0 pointer-events-none"
            style={{
              height: 56,
              borderRadius: "32px 32px 60% 60% / 32px 32px 24px 24px",
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.0) 100%)",
            }}
          />

          {/* Logo */}
          <div
            className="mb-2 flex items-center justify-center"
            style={{
              width: 80,
              height: 80,
              borderRadius: 24,
              background: "linear-gradient(135deg, #93c5fd 0%, #4F8EF7 100%)",
              boxShadow:
                "0 8px 24px rgba(79,142,247,0.35), 0 1.5px 0 1px rgba(255,255,255,0.55) inset",
              fontSize: 38,
              animation: "floatLogo 3.5s ease-in-out infinite alternate",
            }}
          >
            😂
          </div>

          {/* Title */}
          <h1
            className="mt-5 text-center font-black tracking-tight"
            style={{
              fontSize: 26,
              color: "#1E293B",
              letterSpacing: "-0.5px",
              lineHeight: 1.2,
            }}
          >
            Welcome Back, Legend!
          </h1>
          <p
            className="mt-2 mb-7 text-center"
            style={{ color: "#64748b", fontSize: 14.5, fontWeight: 500 }}
          >
            We know you're here for something suspicious. 👀
          </p>

          {/* Username */}
          <div className="w-full mb-4">
            <label
              className="block mb-1.5 font-semibold"
              style={{ color: "#1E293B", fontSize: 13 }}
            >
              Username
            </label>
            <div className="relative">
              <span
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-lg pointer-events-none"
                style={{ lineHeight: 1 }}
              >
                🧑‍💻
              </span>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Enter your legendary name..."
                className="w-full outline-none transition-all duration-200"
                style={{
                  paddingLeft: 44,
                  paddingRight: 16,
                  paddingTop: 13,
                  paddingBottom: 13,
                  borderRadius: 16,
                  background: "rgba(234,243,255,0.75)",
                  border: "1.5px solid rgba(79,142,247,0.18)",
                  fontSize: 14.5,
                  color: "#1E293B",
                  fontFamily: "'Inter', sans-serif",
                  boxShadow: "0 2px 8px rgba(79,142,247,0.07) inset",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "rgba(79,142,247,0.6)";
                  e.currentTarget.style.background = "rgba(234,243,255,0.95)";
                  e.currentTarget.style.boxShadow =
                    "0 0 0 3px rgba(79,142,247,0.12), 0 2px 8px rgba(79,142,247,0.07) inset";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "rgba(79,142,247,0.18)";
                  e.currentTarget.style.background = "rgba(234,243,255,0.75)";
                  e.currentTarget.style.boxShadow =
                    "0 2px 8px rgba(79,142,247,0.07) inset";
                }}
              />
            </div>
          </div>

          {/* Password */}
          <div className="w-full mb-6">
            <label
              className="block mb-1.5 font-semibold"
              style={{ color: "#1E293B", fontSize: 13 }}
            >
              Password
            </label>
            <div className="relative">
              <span
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-lg pointer-events-none"
                style={{ lineHeight: 1 }}
              >
                🔒
              </span>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Definitely not 123456..."
                className="w-full outline-none transition-all duration-200"
                style={{
                  paddingLeft: 44,
                  paddingRight: 48,
                  paddingTop: 13,
                  paddingBottom: 13,
                  borderRadius: 16,
                  background: "rgba(234,243,255,0.75)",
                  border: "1.5px solid rgba(79,142,247,0.18)",
                  fontSize: 14.5,
                  color: "#1E293B",
                  fontFamily: "'Inter', sans-serif",
                  boxShadow: "0 2px 8px rgba(79,142,247,0.07) inset",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "rgba(79,142,247,0.6)";
                  e.currentTarget.style.background = "rgba(234,243,255,0.95)";
                  e.currentTarget.style.boxShadow =
                    "0 0 0 3px rgba(79,142,247,0.12), 0 2px 8px rgba(79,142,247,0.07) inset";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "rgba(79,142,247,0.18)";
                  e.currentTarget.style.background = "rgba(234,243,255,0.75)";
                  e.currentTarget.style.boxShadow =
                    "0 2px 8px rgba(79,142,247,0.07) inset";
                }}
              />
              <button
                type="button"
                tabIndex={-1}
                onClick={() => setShowPassword((p) => !p)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-base transition-transform duration-150 hover:scale-125"
                style={{ background: "none", border: "none", cursor: "pointer", lineHeight: 1 }}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            disabled={isLoading}
            className="w-full relative overflow-hidden font-bold text-white transition-all duration-200 select-none"
            style={{
              borderRadius: 18,
              padding: "14px 0",
              fontSize: 16,
              background: isLoading
                ? "linear-gradient(135deg, #93c5fd 0%, #60a5fa 100%)"
                : "linear-gradient(135deg, #60a5fa 0%, #4F8EF7 50%, #3b82f6 100%)",
              boxShadow: isLoading
                ? "0 4px 16px rgba(79,142,247,0.2)"
                : "0 6px 24px rgba(79,142,247,0.38), 0 1.5px 0 1px rgba(255,255,255,0.30) inset",
              border: "none",
              cursor: isLoading ? "not-allowed" : "pointer",
              letterSpacing: "0.01em",
            }}
            onMouseEnter={(e) => {
              if (!isLoading) {
                e.currentTarget.style.transform = "translateY(-2px) scale(1.025)";
                e.currentTarget.style.boxShadow =
                  "0 10px 32px rgba(79,142,247,0.46), 0 1.5px 0 1px rgba(255,255,255,0.30) inset";
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0) scale(1)";
              e.currentTarget.style.boxShadow = isLoading
                ? "0 4px 16px rgba(79,142,247,0.2)"
                : "0 6px 24px rgba(79,142,247,0.38), 0 1.5px 0 1px rgba(255,255,255,0.30) inset";
            }}
            onMouseDown={(e) => {
              if (!isLoading) {
                e.currentTarget.style.transform = "translateY(1px) scale(0.98)";
              }
            }}
            onMouseUp={(e) => {
              if (!isLoading) {
                e.currentTarget.style.transform = "translateY(-2px) scale(1.025)";
              }
            }}
          >
            {/* Button shine */}
            <span
              className="absolute top-0 left-0 right-0 pointer-events-none"
              style={{
                height: "50%",
                borderRadius: "18px 18px 60% 60%",
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.0) 100%)",
              }}
            />
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <span
                  className="inline-block rounded-full border-2 border-white border-t-transparent"
                  style={{
                    width: 18,
                    height: 18,
                    animation: "spin 0.7s linear infinite",
                  }}
                />
                {loadingMsg}
              </span>
            ) : (
              "🚀 Login"
            )}
          </button>

          {/* Progress bar */}
          {isLoading && (
            <div
              className="w-full mt-4 overflow-hidden"
              style={{
                height: 6,
                borderRadius: 99,
                background: "rgba(79,142,247,0.13)",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${progress}%`,
                  borderRadius: 99,
                  background: "linear-gradient(90deg, #93c5fd, #4F8EF7, #6366f1)",
                  transition: "width 0.1s linear",
                  boxShadow: "0 0 8px rgba(79,142,247,0.5)",
                }}
              />
            </div>
          )}

          {/* Divider */}
          <div className="flex items-center w-full mt-7 mb-5 gap-3">
            <div style={{ flex: 1, height: 1, background: "rgba(79,142,247,0.15)" }} />
            <span style={{ color: "#94a3b8", fontSize: 12, fontWeight: 600 }}>OR</span>
            <div style={{ flex: 1, height: 1, background: "rgba(79,142,247,0.15)" }} />
          </div>

          {/* Social Buttons */}
          <div className="flex gap-3 w-full mb-2">
            {[
              { emoji: "🔵", label: "Google" },
              { emoji: "🍎", label: "Apple" },
              { emoji: "💙", label: "Facebook" },
            ].map((s) => (
              <button
                key={s.label}
                className="flex-1 flex items-center justify-center gap-1.5 font-semibold transition-all duration-150"
                style={{
                  padding: "10px 0",
                  borderRadius: 14,
                  background: "rgba(234,243,255,0.75)",
                  border: "1.5px solid rgba(79,142,247,0.15)",
                  fontSize: 13,
                  color: "#1E293B",
                  cursor: "pointer",
                  boxShadow: "0 2px 8px rgba(79,142,247,0.06)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 6px 16px rgba(79,142,247,0.14)";
                  e.currentTarget.style.borderColor = "rgba(79,142,247,0.35)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 2px 8px rgba(79,142,247,0.06)";
                  e.currentTarget.style.borderColor = "rgba(79,142,247,0.15)";
                }}
                onMouseDown={(e) => {
                  e.currentTarget.style.transform = "scale(0.96)";
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
              >
                <span>{s.emoji}</span>
                <span>{s.label}</span>
              </button>
            ))}
          </div>

          {/* Footer */}
          <p className="mt-6 text-center" style={{ color: "#94a3b8", fontSize: 12.5 }}>
            No account?{" "}
            <span
              style={{ color: "#4F8EF7", fontWeight: 700, cursor: "pointer" }}
              onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
              onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
            >
              Sign up (it's free, like your dignity)
            </span>
          </p>
          <p className="mt-1 text-center" style={{ color: "#cbd5e1", fontSize: 11 }}>
            By logging in, you agree to let us judge you. 👀
          </p>
        </div>

        {/* Tag below card */}
        <p className="mt-5 text-center" style={{ color: "#94a3b8", fontSize: 12, fontWeight: 500 }}>
          🔒 256-bit encryption • or something like that
        </p>
      </div>

      {/* Popup Overlay */}
      {popup && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{
            background: "rgba(15,23,42,0.45)",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
            opacity: popupVisible ? 1 : 0,
            transition: "opacity 0.3s ease",
          }}
          onClick={closePopup}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: 360,
              borderRadius: 28,
              background: "rgba(255,255,255,0.92)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              boxShadow:
                "0 24px 80px rgba(0,0,0,0.20), 0 1.5px 0 1px rgba(255,255,255,0.90) inset",
              border: "1.5px solid rgba(255,255,255,0.85)",
              padding: "0 0 28px 0",
              overflow: "hidden",
              transform: popupVisible ? "scale(1) translateY(0)" : "scale(0.80) translateY(30px)",
              transition: "transform 0.35s cubic-bezier(.34,1.56,.64,1), opacity 0.3s ease",
              opacity: popupVisible ? 1 : 0,
            }}
          >
            {/* Popup header gradient */}
            <div
              className={`w-full flex items-center justify-center`}
              style={{
                background: `linear-gradient(135deg, ${popup.color}88, ${popup.color}cc)`,
                padding: "28px 0 20px",
                fontSize: 52,
              }}
            >
              {popup.title.split(" ")[0]}
            </div>

            <div className="px-8 pt-6">
              <h2
                className="text-center font-black mb-3"
                style={{ fontSize: 21, color: "#1E293B", letterSpacing: "-0.3px" }}
              >
                {popup.title.slice(popup.title.indexOf(" ") + 1)}
              </h2>
              <p
                className="text-center mb-7"
                style={{ color: "#475569", fontSize: 15, lineHeight: 1.6, fontWeight: 500 }}
              >
                {popup.message}
              </p>

              <button
                onClick={closePopup}
                className="w-full font-bold text-white transition-all duration-150"
                style={{
                  padding: "13px 0",
                  borderRadius: 16,
                  background: `linear-gradient(135deg, ${popup.color}bb, ${popup.color})`,
                  border: "none",
                  fontSize: 15,
                  cursor: "pointer",
                  boxShadow: `0 6px 20px ${popup.color}55, 0 1.5px 0 1px rgba(255,255,255,0.25) inset`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px) scale(1.02)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0) scale(1)";
                }}
                onMouseDown={(e) => {
                  e.currentTarget.style.transform = "scale(0.97)";
                }}
              >
                OK, I Accept My Fate 😔
              </button>

              <button
                onClick={() => {
                  closePopup();
                  setTimeout(handleLogin, 400);
                }}
                className="w-full font-semibold mt-2 transition-all duration-150"
                style={{
                  padding: "11px 0",
                  borderRadius: 16,
                  background: "rgba(234,243,255,0.75)",
                  border: "1.5px solid rgba(79,142,247,0.18)",
                  fontSize: 14,
                  cursor: "pointer",
                  color: "#4F8EF7",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(234,243,255,1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(234,243,255,0.75)";
                }}
              >
                🔄 Try Again (Won't Help)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Global Styles */}
      <style>{`
        * { box-sizing: border-box; }

        @keyframes floatBubble {
          0%   { transform: translateY(0px) scale(1); }
          100% { transform: translateY(-22px) scale(1.06); }
        }

        @keyframes floatLogo {
          0%   { transform: translateY(0px) rotate(-3deg); }
          100% { transform: translateY(-8px) rotate(3deg); }
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }

        input::placeholder {
          color: #b0c4de;
          font-family: 'Inter', sans-serif;
        }

        /* Scrollbar hide */
        ::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}
