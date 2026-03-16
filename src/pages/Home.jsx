import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import PomodoroSection from "../components/PomodoroSection";
import { ContainerScroll } from "../components/ContainerScrollAnimation";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { FaTasks } from "react-icons/fa";
import { LuNotebook } from "react-icons/lu";
import { RiFocus3Line } from "react-icons/ri";
import { FaCircleCheck } from "react-icons/fa6";
import { FaCalendarAlt, FaClipboard } from "react-icons/fa";
import { IoBarChart } from "react-icons/io5";
import { MdAccessTimeFilled } from "react-icons/md";
import { BsFire } from "react-icons/bs";
import usePageTitle from "../hooks/usePageTitle";

import logo from "/icon.png";
import marcus from "/Marcus.jpg";
import priya from "/Priya.png";
import sarah from "/Sarah.jpg";

/* ─── Data ───────────────────────────────────────────────────────────── */

const features = [
  {
    icon: <FaCircleCheck />,
    title: "Smart Task Manager",
    desc: "Create, prioritize, and track tasks with deadlines. Visual urgency indicators keep you ahead of every deadline.",
    color: "text-blue-900 from-blue-400 to-primary",
  },
  {
    icon: <FaCalendarAlt />,
    title: "Study Planner",
    desc: "Weekly calendar view with time-blocking UI. Visualize your study sessions and stay organized all week.",
    color: "text-purple-900 from-secondary to-purple-400",
  },
  {
    icon: <FaClipboard />,
    title: "Smart Notes",
    desc: "Organize notes by subject with tags, highlights, and checklists. Never lose an important idea again.",
    color: "text-orange-900 from-accent to-orange-400",
  },
  {
    icon: <RiFocus3Line />,
    title: "Focus Mode",
    desc: "Distraction-free Pomodoro timer. 25 minutes of deep focus followed by rejuvenating breaks.",
    color: "text-teal-900 from-emerald-400 to-teal-500",
  },
  {
    icon: <IoBarChart />,
    title: "Progress Analytics",
    desc: "Track study hours, completed tasks, and productivity streaks. See your growth in beautiful charts.",
    color: "text-pink-900 from-rose-400 to-pink-500",
  },
];

const testimonials = [
  {
    name: "Sarah K.",
    major: "Computer Science",
    text: "Studiora helped me go from overwhelmed to organized in one week. My GPA improved this semester!",
    avatar: sarah,
  },
  {
    name: "Marcus L.",
    major: "Medicine",
    text: "The focus timer is a game-changer. I can finally study for 3 hours without checking my phone.",
    avatar: marcus,
  },
  {
    name: "Priya R.",
    major: "Business",
    text: "The weekly planner lets me see exactly when I'm studying and where I need to improve.",
    avatar: priya,
  },
];

/* ─── Cosmic Star Field (light version) ─────────────────────────────── */
function HeroStarField() {
  const ref = useRef(null);
  useEffect(() => {
    const container = ref.current;
    if (!container) return;
    container.innerHTML = "";
    for (let i = 0; i < 90; i++) {
      const star = document.createElement("div");
      const size = Math.random() * 3 + 1;
      const dur = 2.5 + Math.random() * 4;
      const op = 0.15 + Math.random() * 0.5;
      const delay = Math.random() * 6;
      // Use blue/purple tones for stars to match aurora palette
      const colors = [
        "rgba(93,139,244,VAR)",
        "rgba(196,181,253,VAR)",
        "rgba(167,139,250,VAR)",
        "rgba(129,140,248,VAR)",
      ];
      const color = colors[Math.floor(Math.random() * colors.length)].replace(
        "VAR",
        op,
      );
      star.style.cssText = `
        position:absolute;
        width:${size}px;height:${size}px;
        border-radius:50%;
        background:${color};
        top:${Math.random() * 100}%;
        left:${Math.random() * 100}%;
        opacity:0;
        animation:heroTwinkle ${dur}s ease-in-out ${delay}s infinite;
        --op:${op};
      `;
      container.appendChild(star);
    }
  }, []);
  return (
    <div
      ref={ref}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
}

/* ─── Dashboard Mockup ───────────────────────────────────────────────── */
function DashboardMockup() {
  const tasks = [
    {
      title: "Calculus Problem Set",
      priority: "High",
      done: false,
      dot: "#F87171",
    },
    {
      title: "Physics Lab Report",
      priority: "Medium",
      done: false,
      dot: "#FDBA74",
    },
    {
      title: "Literature Essay Draft",
      priority: "Medium",
      done: false,
      dot: "#FDBA74",
    },
    { title: "Read Chapter 7–9", priority: "Low", done: true, dot: "#22C55E" },
  ];
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  const bars = [4, 6, 5, 8, 7, 9, 6];

  return (
    <div
      className="w-full h-full"
      style={{ background: "#F8FAFC", fontFamily: "Inter, sans-serif" }}
    >
      <div
        className="flex items-center gap-2 px-5 py-3"
        style={{ background: "linear-gradient(135deg, #5D8BF4, #C4B5FD)" }}
      >
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-white/40" />
          <div className="w-3 h-3 rounded-full bg-white/40" />
          <div className="w-3 h-3 rounded-full bg-white/40" />
        </div>
        <div className="flex-1 text-center text-white/80 text-xs font-medium">
          studiora.app/dashboard
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-green-300" />
          <span className="text-white/70 text-xs">Live</span>
        </div>
      </div>

      <div className="flex" style={{ minHeight: 520 }}>
        <div
          className="hidden md:flex flex-col gap-1 p-4 border-r border-slate-100"
          style={{ width: 180, background: "#fff", flexShrink: 0 }}
        >
          <div className="flex items-center gap-2 mb-5 px-1">
            {logo ? (
              <img
                className="w-8 h-8 rounded-xl shadow-soft"
                src={logo}
                alt="studiora-logo"
              />
            ) : (
              <div
                className="w-7 h-7 rounded-xl flex items-center justify-center text-white text-xs font-bold"
                style={{
                  background: "linear-gradient(135deg,#5D8BF4,#C4B5FD)",
                }}
              >
                S
              </div>
            )}
            <span
              className="text-sm font-bold"
              style={{ fontFamily: "Poppins,sans-serif", color: "#1E293B" }}
            >
              Studiora
            </span>
          </div>
          {[
            {
              icon: <TbLayoutDashboardFilled />,
              label: "Dashboard",
              active: true,
            },
            { icon: <FaTasks />, label: "Tasks" },
            { icon: <LuNotebook />, label: "Notes" },
            { icon: <RiFocus3Line />, label: "Focus" },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-medium"
              style={{
                background: item.active
                  ? "rgba(93,139,244,0.10)"
                  : "transparent",
                color: item.active ? "#5D8BF4" : "#94A3B8",
              }}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </div>
          ))}
        </div>

        <div className="flex-1 p-5 overflow-hidden">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2
                className="text-base font-bold"
                style={{ fontFamily: "Poppins,sans-serif", color: "#1E293B" }}
              >
                Good morning!{" "}
              </h2>
              <p className="text-xs mt-0.5" style={{ color: "#94A3B8" }}>
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            <div
              className="px-3 py-2 rounded-xl text-xs font-semibold text-white"
              style={{ background: "linear-gradient(135deg,#5D8BF4,#C4B5FD)" }}
            >
              + New Task
            </div>
          </div>

          <div className="grid grid-cols-4 gap-3 mb-5">
            {[
              {
                icon: <LuNotebook />,
                val: "24",
                label: "Total Tasks",
                color: "#5D8BF4",
                bg: "#EEF2FF",
              },
              {
                icon: <MdAccessTimeFilled />,
                val: "12h",
                label: "Focus Hours",
                color: "#7C3AED",
                bg: "#F5F3FF",
              },
              {
                icon: <BsFire />,
                val: "7",
                label: "Day Streak",
                color: "#F97316",
                bg: "#FFF7ED",
              },
              {
                icon: <FaCircleCheck />,
                val: "5",
                label: "Done Today",
                color: "#22C55E",
                bg: "#F0FDF4",
              },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-2xl p-3.5"
                style={{
                  background: "#fff",
                  boxShadow: "0 2px 12px rgba(30,41,59,0.06)",
                  border: "1px solid #F1F5F9",
                }}
              >
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center text-base mb-2"
                  style={{ background: s.bg, color: s.color }}
                >
                  {s.icon}
                </div>
                <p
                  className="text-xl font-extrabold"
                  style={{ fontFamily: "Poppins,sans-serif", color: s.color }}
                >
                  {s.val}
                </p>
                <p className="text-xs mt-0.5" style={{ color: "#94A3B8" }}>
                  {s.label}
                </p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-5 gap-4">
            <div
              className="col-span-3 rounded-2xl p-4"
              style={{
                background: "#fff",
                boxShadow: "0 2px 12px rgba(30,41,59,0.06)",
                border: "1px solid #F1F5F9",
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <p
                  className="text-sm font-bold"
                  style={{ fontFamily: "Poppins,sans-serif", color: "#1E293B" }}
                >
                  Today's Tasks
                </p>
                <span
                  className="text-xs font-semibold px-2.5 py-1 rounded-lg"
                  style={{ background: "#EEF2FF", color: "#5D8BF4" }}
                >
                  4 active
                </span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {tasks.map((task, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-2.5 rounded-xl"
                    style={{ background: "#F8FAFC" }}
                  >
                    <div
                      className="w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center"
                      style={{
                        borderColor: task.dot,
                        background: task.done ? task.dot : "transparent",
                      }}
                    >
                      {task.done && (
                        <span
                          style={{ fontSize: 8, color: "#fff", lineHeight: 1 }}
                        >
                          ✓
                        </span>
                      )}
                    </div>
                    <span
                      className="flex-1 text-xs font-medium"
                      style={{
                        color: task.done ? "#94A3B8" : "#1E293B",
                        textDecoration: task.done ? "line-through" : "none",
                      }}
                    >
                      {task.title}
                    </span>
                    <span
                      className="text-xs font-semibold px-2 py-0.5 rounded-lg"
                      style={{ background: task.dot + "18", color: task.dot }}
                    >
                      {task.priority}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-span-2 flex flex-col gap-3">
              <div
                className="rounded-2xl p-4 flex-1"
                style={{
                  background: "#fff",
                  boxShadow: "0 2px 12px rgba(30,41,59,0.06)",
                  border: "1px solid #F1F5F9",
                }}
              >
                <p
                  className="text-xs font-semibold mb-3"
                  style={{ color: "#64748B" }}
                >
                  Weekly Study Hours
                </p>
                <div className="flex items-end gap-1.5" style={{ height: 56 }}>
                  {bars.map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 flex flex-col items-center gap-1"
                    >
                      <div
                        className="w-full rounded-t-md"
                        style={{
                          height: `${(h / 9) * 100}%`,
                          background:
                            i === 5
                              ? "linear-gradient(to top,#5D8BF4,#C4B5FD)"
                              : "linear-gradient(to top,#5D8BF4CC,#C4B5FDCC)",
                          opacity: i === 5 ? 1 : 0.6,
                        }}
                      />
                      <span style={{ color: "#CBD5E1", fontSize: 9 }}>
                        {days[i]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div
                className="rounded-2xl p-3.5 flex items-center gap-3"
                style={{
                  background: "linear-gradient(135deg,#1e1b4b,#1e3a5f)",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    width: 36,
                    height: 36,
                    flexShrink: 0,
                  }}
                >
                  <svg width="36" height="36" viewBox="0 0 36 36">
                    <circle
                      cx="18"
                      cy="18"
                      r="14"
                      fill="none"
                      stroke="rgba(255,255,255,0.1)"
                      strokeWidth="3"
                    />
                    <circle
                      cx="18"
                      cy="18"
                      r="14"
                      fill="none"
                      stroke="#5D8BF4"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 14}`}
                      strokeDashoffset={`${2 * Math.PI * 14 * 0.38}`}
                      transform="rotate(-90 18 18)"
                    />
                  </svg>
                  <span
                    className="bg-white text-red-500 rounded-full"
                    style={{
                      position: "absolute",
                      inset: 6,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <RiFocus3Line />
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className="text-xs font-semibold"
                    style={{ color: "#fff" }}
                  >
                    Focus Session
                  </p>
                  <p
                    style={{
                      color: "rgba(255,255,255,0.45)",
                      fontSize: 10,
                      marginTop: 2,
                    }}
                  >
                    15:32 remaining
                  </p>
                </div>
                <div
                  className="w-7 h-7 rounded-xl flex items-center justify-center text-sm"
                  style={{
                    background: "linear-gradient(135deg,#5D8BF4,#C4B5FD)",
                  }}
                >
                  ⏸
                </div>
              </div>
            </div>
          </div>

          <div
            className="mt-4 rounded-2xl p-4"
            style={{
              background: "#fff",
              boxShadow: "0 2px 12px rgba(30,41,59,0.06)",
              border: "1px solid #F1F5F9",
            }}
          >
            <div className="flex justify-between items-center mb-2">
              <span
                className="text-xs font-semibold"
                style={{ color: "#64748B" }}
              >
                Daily Goal Progress
              </span>
              <span className="text-xs font-bold" style={{ color: "#5D8BF4" }}>
                72%
              </span>
            </div>
            <div
              className="h-2 rounded-full"
              style={{ background: "#F1F5F9", overflow: "hidden" }}
            >
              <div
                className="h-full rounded-full"
                style={{
                  width: "72%",
                  background: "linear-gradient(90deg,#5D8BF4,#C4B5FD)",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Hero Title ─────────────────────────────────────────────────────── */
function HeroTitle({ navigate }) {
  return (
    // pt-10 sm:pt-14 pushes content away from the sticky Navbar (64px) on all screen sizes
    <div className="flex flex-col items-center gap-6 sm:gap-8 pt-10 sm:pt-14 px-4">
      {/* Headline */}
      <div className="hero-slide-up">
        <h1
          className="font-poppins font-extrabold text-center leading-[1.06] tracking-tight"
          style={{ fontSize: "clamp(2.2rem, 6vw, 5rem)" }}
        >
          <span
            style={{
              background: "linear-gradient(135deg,#5D8BF4,#818CF8)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              display: "inline",
            }}
          >
            Organize
          </span>
          <span className="text-darkText"> Your Study.</span>
          <br />
          <span className="text-darkText">Illuminate </span>
          <span
            style={{
              background: "linear-gradient(135deg,#C4B5FD,#A78BFA)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              display: "inline",
            }}
          >
            Your Future.
          </span>
        </h1>
      </div>

      {/* Sub-headline */}
      <p
        className="font-inter text-slate-500 text-center max-w-2xl leading-relaxed hero-slide-up"
        style={{ fontSize: "clamp(1rem, 2vw, 1.2rem)", animationDelay: "0.1s" }}
      >
        Studiora helps you{" "}
        <strong className="text-darkText font-semibold">manage tasks</strong>,{" "}
        <strong className="text-darkText font-semibold">
          track focus sessions
        </strong>
        , and{" "}
        <strong className="text-darkText font-semibold">
          build better study habits
        </strong>{" "}
        — all in one simple dashboard.
      </p>

      {/* CTAs */}
      <div
        className="flex flex-col sm:flex-row gap-3 items-center justify-center hero-slide-up"
        style={{ animationDelay: "0.18s" }}
      >
        <button
          onClick={() => navigate("/dashboard")}
          className="inline-flex items-center justify-center gap-2.5 font-bold font-poppins text-base text-white px-8 py-4 rounded-full hover:scale-105 active:scale-95 transition-all duration-300 w-full sm:w-auto"
          style={{
            background: "linear-gradient(135deg,#5D8BF4 0%,#C4B5FD 100%)",
            boxShadow: "0 8px 32px rgba(93,139,244,0.35)",
          }}
        >
          Start Organizing
        </button>
        <button
          onClick={() => navigate("/focus")}
          className="inline-flex items-center justify-center gap-2 font-semibold font-inter text-base text-slate-600 bg-white/70 backdrop-blur-sm border border-slate-200 px-8 py-4 rounded-full hover:bg-white hover:border-primary/30 hover:text-primary transition-all duration-300 w-full sm:w-auto"
          style={{ boxShadow: "0 2px 12px rgba(30,41,59,0.06)" }}
        >
          Try Focus Mode
        </button>
      </div>
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────────────────── */
export default function Home() {
  usePageTitle(null);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <style>{`
        /* Hero animations */
        @keyframes heroTwinkle {
          0%,100% { opacity:0; transform:scale(.8); }
          50% { opacity:var(--op,.5); transform:scale(1.3); }
        }
        @keyframes heroFloat {
          0%,100% { transform:translateY(0) scale(1); }
          50% { transform:translateY(-22px) scale(1.03); }
        }
        @keyframes heroOrbit {
          from { transform:translate(-50%,-50%) rotate(0deg); }
          to { transform:translate(-50%,-50%) rotate(360deg); }
        }
        @keyframes heroOrbitReverse {
          from { transform:translate(-50%,-50%) rotate(0deg); }
          to { transform:translate(-50%,-50%) rotate(-360deg); }
        }
        @keyframes heroPulse {
          0%,100% { opacity:.5; transform:scale(1); }
          50% { opacity:.9; transform:scale(1.08); }
        }
        @keyframes heroFadeInUp {
          from { opacity:0; transform:translateY(24px); }
          to { opacity:1; transform:translateY(0); }
        }
        @keyframes heroShimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .hero-slide-up {
          animation: heroFadeInUp .7s ease both;
        }
        /* Orbit rings positioned inside hero */
        .hero-orbit {
          position:absolute;
          border-radius:50%;
          top:50%; left:50%;
          pointer-events:none;
        }
        /* Responsive hero: make stars/orbits respect overflow:hidden */
        .hero-cosmic-section {
          position:relative;
          overflow:hidden;
        }
      `}</style>

      {/* ── HERO with Cosmic Animation ─── */}
      <section
        className="hero-cosmic-section"
        style={{
          background:
            "linear-gradient(160deg,#EEF2FF 0%,#F8FAFC 30%,#F5F3FF 65%,#FFF7ED 100%)",
        }}
      >
        {/* === COSMIC LAYER (z-index 1-3) === */}

        {/* Star field — blue/purple dots matching aurora palette */}
        <HeroStarField />

        {/* Orbit ring 1 — soft blue */}
        <div
          className="hero-orbit"
          style={{
            width: "min(700px, 120vw)",
            height: "min(700px, 120vw)",
            border: "1px solid rgba(93,139,244,0.12)",
            animation: "heroOrbit 40s linear infinite",
            zIndex: 2,
          }}
        >
          {/* Orbiting dot */}
          <div
            style={{
              position: "absolute",
              top: -5,
              left: "50%",
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: "linear-gradient(135deg,#5D8BF4,#C4B5FD)",
              marginLeft: -5,
              boxShadow: "0 0 16px rgba(93,139,244,0.6)",
              animation: "heroPulse 2s ease-in-out infinite",
            }}
          />
        </div>

        {/* Orbit ring 2 — soft purple, reverse */}
        <div
          className="hero-orbit"
          style={{
            width: "min(1000px, 160vw)",
            height: "min(1000px, 160vw)",
            border: "1px solid rgba(196,181,253,0.10)",
            animation: "heroOrbitReverse 60s linear infinite",
            zIndex: 2,
          }}
        >
          {/* Second orbiting dot */}
          <div
            style={{
              position: "absolute",
              top: -4,
              left: "50%",
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#C4B5FD",
              marginLeft: -4,
              boxShadow: "0 0 12px rgba(196,181,253,0.7)",
            }}
          />
        </div>

        {/* Orbit ring 3 — innermost, amber accent */}
        <div
          className="hero-orbit"
          style={{
            width: "min(400px, 80vw)",
            height: "min(400px, 80vw)",
            border: "1px dashed rgba(253,186,116,0.18)",
            animation: "heroOrbit 25s linear infinite",
            zIndex: 2,
          }}
        />

        {/* Ambient blobs — light & airy, matching rest of site */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: "-10%",
            left: "-8%",
            width: "clamp(300px, 50vw, 600px)",
            height: "clamp(300px, 50vw, 600px)",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(93,139,244,0.18), transparent 70%)",
            animation: "heroFloat 7s ease-in-out infinite",
            zIndex: 1,
            filter: "blur(2px)",
          }}
        />
        <div
          className="absolute pointer-events-none"
          style={{
            top: "20%",
            right: "-10%",
            width: "clamp(250px, 45vw, 550px)",
            height: "clamp(250px, 45vw, 550px)",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(196,181,253,0.22), transparent 70%)",
            animation: "heroFloat 9s ease-in-out 2.5s infinite",
            zIndex: 1,
            filter: "blur(2px)",
          }}
        />
        <div
          className="absolute pointer-events-none"
          style={{
            bottom: "5%",
            left: "30%",
            width: "clamp(200px, 35vw, 420px)",
            height: "clamp(200px, 35vw, 420px)",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(253,186,116,0.15), transparent 70%)",
            animation: "heroFloat 11s ease-in-out 4s infinite",
            zIndex: 1,
            filter: "blur(2px)",
          }}
        />

        {/* Dot grid — unchanged from original */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(rgba(93,139,244,0.07) 1.5px, transparent 1.5px)",
            backgroundSize: "32px 32px",
            zIndex: 1,
          }}
        />

        {/* === CONTENT (z-index 10+) === */}
        <div style={{ position: "relative", zIndex: 10 }}>
          <ContainerScroll titleComponent={<HeroTitle navigate={navigate} />}>
            <DashboardMockup />
          </ContainerScroll>
        </div>

        {/* Fade into next section */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, transparent, #F8FAFC)",
            zIndex: 11,
          }}
        />
      </section>

      {/* ── Stats strip ─── */}
      <section className="bg-white border-y border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-0 sm:divide-x divide-slate-100">
            {[
              { value: "10K+", label: "Active Students" },
              { value: "500K+", label: "Tasks Completed" },
              { value: "98%", label: "Satisfaction Rate" },
              { value: "4.9★", label: "Average Rating" },
            ].map((stat) => (
              <div key={stat.label} className="text-center sm:px-8">
                <p
                  className="text-3xl font-extrabold font-poppins"
                  style={{
                    background: "linear-gradient(135deg,#5D8BF4,#C4B5FD)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {stat.value}
                </p>
                <p className="text-sm text-slate-400 font-inter mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ─── */}
      <section id="features" className="py-20 bg-aurora-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="section-title mb-3">Everything You Need to Excel</h2>
            <p className="text-slate-500 font-inter max-w-xl mx-auto">
              Five powerful tools, one seamless experience. Designed with
              students, for students.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div
                key={f.title}
                className="card card-hover group animate-slide-up"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center text-2xl mb-4 shadow-soft group-hover:scale-110 transition-transform duration-300`}
                >
                  {f.icon}
                </div>
                <h3 className="font-bold font-poppins text-darkText mb-2">
                  {f.title}
                </h3>
                <p className="text-sm text-slate-500 font-inter leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pomodoro Section ─── */}
      <PomodoroSection />

      {/* ── Testimonials ─── */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="section-title mb-3">Loved by Students Worldwide</h2>
          <p className="text-slate-500 font-inter">
            Real results from real students.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className="card card-hover animate-slide-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <p className="text-sm text-slate-600 font-inter italic leading-relaxed mb-4">
                "{t.text}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center">
                  <img className="rounded-2xl" src={t.avatar} alt={t.name} />
                </div>
                <div>
                  <p className="font-semibold font-poppins text-darkText text-sm">
                    {t.name}
                  </p>
                  <p className="text-xs text-slate-400 font-inter">{t.major}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
