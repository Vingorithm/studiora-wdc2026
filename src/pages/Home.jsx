import { useNavigate } from 'react-router-dom'
import PomodoroSection from '../components/PomodoroSection'
import { ContainerScroll } from '../components/ContainerScrollAnimation'
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { FaTasks } from "react-icons/fa";
import { LuNotebook } from "react-icons/lu";
import { RiFocus3Line } from "react-icons/ri";

import logo from "/icon.png";

/* ─── Data ─────────────────────────────────────────────────────────── */

const features = [
  { icon: '✅', title: 'Smart Task Manager', desc: 'Create, prioritize, and track tasks with deadlines. Visual urgency indicators keep you ahead of every deadline.', color: 'from-blue-400 to-primary' },
  { icon: '📅', title: 'Study Planner', desc: 'Weekly calendar view with time-blocking UI. Visualize your study sessions and stay organized all week.', color: 'from-secondary to-purple-400' },
  { icon: '📝', title: 'Smart Notes', desc: 'Organize notes by subject with tags, highlights, and checklists. Never lose an important idea again.', color: 'from-accent to-orange-400' },
  { icon: '🎯', title: 'Focus Mode', desc: 'Distraction-free Pomodoro timer. 25 minutes of deep focus followed by rejuvenating breaks.', color: 'from-emerald-400 to-teal-500' },
  { icon: '📊', title: 'Progress Analytics', desc: 'Track study hours, completed tasks, and productivity streaks. See your growth in beautiful charts.', color: 'from-rose-400 to-pink-500' },
]

const testimonials = [
  { name: 'Sarah K.', major: 'Computer Science', text: 'Studiora helped me go from overwhelmed to organized in one week. My GPA improved this semester!', avatar: '👩‍💻' },
  { name: 'Marcus L.', major: 'Medicine', text: 'The focus timer is a game-changer. I can finally study for 3 hours without checking my phone.', avatar: '👨‍⚕️' },
  { name: 'Priya R.', major: 'Business', text: "The weekly planner lets me see exactly when I'm studying and where I need to improve.", avatar: '👩‍💼' },
]

/* ─── Dashboard Mockup (rendered inside the 3-D card) ──────────────── */

function DashboardMockup() {
  const tasks = [
    { title: 'Calculus Problem Set', priority: 'High', done: false, dot: '#F87171' },
    { title: 'Physics Lab Report', priority: 'Medium', done: false, dot: '#FDBA74' },
    { title: 'Literature Essay Draft', priority: 'Medium', done: false, dot: '#FDBA74' },
    { title: 'Read Chapter 7–9', priority: 'Low', done: true, dot: '#22C55E' },
  ]

  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
  const bars = [4, 6, 5, 8, 7, 9, 6]

  return (
    <div className="w-full h-full" style={{ background: '#F8FAFC', fontFamily: 'Inter, sans-serif' }}>
      {/* Window chrome */}
      <div className="flex items-center gap-2 px-5 py-3" style={{ background: 'linear-gradient(135deg, #5D8BF4, #C4B5FD)' }}>
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-white/40" />
          <div className="w-3 h-3 rounded-full bg-white/40" />
          <div className="w-3 h-3 rounded-full bg-white/40" />
        </div>
        <div className="flex-1 text-center text-white/80 text-xs font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>
          studiora.app/dashboard
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-green-300" />
          <span className="text-white/70 text-xs">Live</span>
        </div>
      </div>

      {/* App layout */}
      <div className="flex" style={{ minHeight: 520 }}>

        {/* Sidebar */}
        <div className="hidden md:flex flex-col gap-1 p-4 border-r border-slate-100" style={{ width: 180, background: '#fff', flexShrink: 0 }}>
          <div className="flex items-center gap-2 mb-5 px-1">
            <div className="w-7 h-7 rounded-xl flex items-center justify-center text-white text-xs font-bold"
              style={{ background: 'linear-gradient(135deg, #5D8BF4, #C4B5FD)' }}>S</div>
            <span className="text-sm font-bold" style={{ fontFamily: 'Poppins, sans-serif', color: '#1E293B' }}>Studiora</span>
          </div>
          {[
            { icon: <TbLayoutDashboardFilled />, label: 'Dashboard', active: true },
            { icon: <FaTasks />, label: 'Tasks' },
            { icon: <LuNotebook />, label: 'Notes' },
            { icon: <RiFocus3Line />, label: 'Focus' },
          ].map(item => (
            <div key={item.label}
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-medium transition-colors"
              style={{
                background: item.active ? 'rgba(93,139,244,0.10)' : 'transparent',
                color: item.active ? '#5D8BF4' : '#94A3B8',
              }}>
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </div>
          ))}
        </div>

        {/* Main content */}
        <div className="flex-1 p-5 overflow-hidden">

          {/* Greeting + date */}
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-base font-bold" style={{ fontFamily: 'Poppins, sans-serif', color: '#1E293B' }}>Good morning! </h2>
              <p className="text-xs mt-0.5" style={{ color: '#94A3B8' }}>
                {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              </p>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-white"
              style={{ background: 'linear-gradient(135deg, #5D8BF4, #C4B5FD)', fontFamily: 'Inter, sans-serif' }}>
              + New Task
            </div>
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-4 gap-3 mb-5">
            {[
              { icon: '📋', val: '24', label: 'Total Tasks', color: '#5D8BF4', bg: '#EEF2FF' },
              { icon: '⏱', val: '12h', label: 'Focus Hours', color: '#7C3AED', bg: '#F5F3FF' },
              { icon: '🔥', val: '7', label: 'Day Streak', color: '#F97316', bg: '#FFF7ED' },
              { icon: '✅', val: '5', label: 'Done Today', color: '#22C55E', bg: '#F0FDF4' },
            ].map(s => (
              <div key={s.label} className="rounded-2xl p-3.5" style={{ background: '#fff', boxShadow: '0 2px 12px rgba(30,41,59,0.06)', border: '1px solid #F1F5F9' }}>
                <div className="w-8 h-8 rounded-xl flex items-center justify-center text-base mb-2" style={{ background: s.bg }}>
                  {s.icon}
                </div>
                <p className="text-xl font-extrabold" style={{ fontFamily: 'Poppins, sans-serif', color: s.color }}>{s.val}</p>
                <p className="text-xs mt-0.5" style={{ color: '#94A3B8' }}>{s.label}</p>
              </div>
            ))}
          </div>

          {/* Two-column: tasks + chart */}
          <div className="grid grid-cols-5 gap-4">

            {/* Tasks */}
            <div className="col-span-3 rounded-2xl p-4" style={{ background: '#fff', boxShadow: '0 2px 12px rgba(30,41,59,0.06)', border: '1px solid #F1F5F9' }}>
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-bold" style={{ fontFamily: 'Poppins, sans-serif', color: '#1E293B' }}>Today's Tasks</p>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-lg" style={{ background: '#EEF2FF', color: '#5D8BF4' }}>4 active</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {tasks.map((task, i) => (
                  <div key={i} className="flex items-center gap-3 p-2.5 rounded-xl" style={{ background: '#F8FAFC' }}>
                    <div className="w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center"
                      style={{ borderColor: task.dot, background: task.done ? task.dot : 'transparent' }}>
                      {task.done && <span style={{ fontSize: 8, color: '#fff', lineHeight: 1 }}>✓</span>}
                    </div>
                    <span className="flex-1 text-xs font-medium" style={{ color: task.done ? '#94A3B8' : '#1E293B', textDecoration: task.done ? 'line-through' : 'none' }}>
                      {task.title}
                    </span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-lg"
                      style={{ background: task.dot + '18', color: task.dot }}>
                      {task.priority}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Chart + timer */}
            <div className="col-span-2 flex flex-col gap-3">
              {/* Mini bar chart */}
              <div className="rounded-2xl p-4 flex-1" style={{ background: '#fff', boxShadow: '0 2px 12px rgba(30,41,59,0.06)', border: '1px solid #F1F5F9' }}>
                <p className="text-xs font-semibold mb-3" style={{ color: '#64748B' }}>Weekly Study Hours</p>
                <div className="flex items-end gap-1.5" style={{ height: 56 }}>
                  {bars.map((h, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <div className="w-full rounded-t-md" style={{
                        height: `${(h / 9) * 100}%`,
                        background: i === 5 ? 'linear-gradient(to top, #5D8BF4, #C4B5FD)' : 'linear-gradient(to top, #5D8BF4CC, #C4B5FDCC)',
                        opacity: i === 5 ? 1 : 0.6,
                      }} />
                      <span className="text-xs" style={{ color: '#CBD5E1', fontSize: 9 }}>{days[i]}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pomodoro strip */}
              <div className="rounded-2xl p-3.5 flex items-center gap-3" style={{ background: 'linear-gradient(135deg, #1e1b4b, #1e3a5f)' }}>
                <div style={{ position: 'relative', width: 36, height: 36, flexShrink: 0 }}>
                  <svg width="36" height="36" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="14" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="3" />
                    <circle cx="18" cy="18" r="14" fill="none" stroke="#5D8BF4" strokeWidth="3"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 14}`}
                      strokeDashoffset={`${2 * Math.PI * 14 * 0.38}`}
                      transform="rotate(-90 18 18)" />
                  </svg>
                  <span style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>🎯</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold" style={{ color: '#fff' }}>Focus Session</p>
                  <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 10, marginTop: 2 }}>15:32 remaining</p>
                </div>
                <div className="w-7 h-7 rounded-xl flex items-center justify-center text-sm"
                  style={{ background: 'linear-gradient(135deg, #5D8BF4, #C4B5FD)' }}>⏸</div>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-4 rounded-2xl p-4" style={{ background: '#fff', boxShadow: '0 2px 12px rgba(30,41,59,0.06)', border: '1px solid #F1F5F9' }}>
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-semibold" style={{ color: '#64748B' }}>Daily Goal Progress</span>
              <span className="text-xs font-bold" style={{ color: '#5D8BF4' }}>72%</span>
            </div>
            <div className="h-2 rounded-full" style={{ background: '#F1F5F9', overflow: 'hidden' }}>
              <div className="h-full rounded-full" style={{ width: '72%', background: 'linear-gradient(90deg, #5D8BF4, #C4B5FD)' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── Hero Title (passed into ContainerScroll) ─────────────────────── */

function HeroTitle({ navigate }) {
  return (
    <div className="flex flex-col items-center gap-8">

      {/* Live badge */}
      <div className="inline-flex items-center gap-2.5 bg-white/80 backdrop-blur-sm rounded-full px-5 py-2.5 border border-primary/12 animate-fade-in"
        style={{ boxShadow: '0 4px 20px rgba(93,139,244,0.10)' }}>
        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse-slow flex-shrink-0" />
        <span className="text-sm font-semibold text-slate-600 font-inter">Designed for University Students</span>
      </div>

      {/* Headline */}
      <div className="animate-slide-up">
        <h1 className="font-poppins font-extrabold text-center leading-[1.06] tracking-tight"
          style={{ fontSize: 'clamp(2.4rem, 6vw, 5rem)' }}>
          <span style={{
            background: 'linear-gradient(135deg, #5D8BF4, #818CF8)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            display: 'inline',
          }}>Organize</span>
          <span className="text-darkText"> Your Study.</span>
          <br />
          <span className="text-darkText">Illuminate </span>
          <span style={{
            background: 'linear-gradient(135deg, #C4B5FD, #A78BFA)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            display: 'inline',
          }}>Your Future.</span>
        </h1>
      </div>

      {/* Sub-headline */}
      <p className="font-inter text-slate-500 text-center max-w-2xl leading-relaxed animate-slide-up"
        style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', animationDelay: '0.1s' }}>
        Studiora transforms your chaotic academic life into a{' '}
        <strong className="text-darkText font-semibold">structured</strong>,{' '}
        <strong className="text-darkText font-semibold">focused</strong>, and{' '}
        <strong className="text-darkText font-semibold">inspiring</strong>{' '}
        study journey — all in one elegant dashboard.
      </p>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-center animate-slide-up" style={{ animationDelay: '0.18s' }}>
        <button
          onClick={() => navigate('/dashboard')}
          className="inline-flex items-center justify-center gap-2.5 font-bold font-poppins text-base text-white px-8 py-4 rounded-full hover:scale-105 active:scale-95 transition-all duration-300"
          style={{ background: 'linear-gradient(135deg, #5D8BF4 0%, #C4B5FD 100%)', boxShadow: '0 8px 32px rgba(93,139,244,0.35)' }}
        >
          Start Organizing
        </button>
        <button
          onClick={() => navigate('/focus')}
          className="inline-flex items-center justify-center gap-2 font-semibold font-inter text-base text-slate-600 bg-white/70 backdrop-blur-sm border border-slate-200 px-8 py-4 rounded-full hover:bg-white hover:border-primary/30 hover:text-primary transition-all duration-300"
          style={{ boxShadow: '0 2px 12px rgba(30,41,59,0.06)' }}
        >
          Try Focus Mode
        </button>
      </div>
    </div>
  )
}

/* ─── Page ──────────────────────────────────────────────────────────── */

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen">

      {/* ── HERO with Scroll Animation ─── */}
      <section className="relative overflow-hidden" style={{ background: 'linear-gradient(160deg, #EEF2FF 0%, #F8FAFC 35%, #F5F3FF 70%, #FFF7ED 100%)' }}>

        {/* Ambient blobs */}
        <div className="absolute -top-32 -left-32 w-[560px] h-[560px] rounded-full blur-3xl opacity-40 pointer-events-none animate-float"
          style={{ background: 'radial-gradient(circle, rgba(93,139,244,0.22), transparent 70%)' }} />
        <div className="absolute top-1/4 -right-40 w-[600px] h-[600px] rounded-full blur-3xl opacity-30 pointer-events-none animate-float"
          style={{ background: 'radial-gradient(circle, rgba(196,181,253,0.28), transparent 70%)', animationDelay: '2.5s' }} />
        <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] rounded-full blur-3xl opacity-25 pointer-events-none animate-float"
          style={{ background: 'radial-gradient(circle, rgba(253,186,116,0.20), transparent 70%)', animationDelay: '4s' }} />

        {/* Dot grid */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: 'radial-gradient(rgba(93,139,244,0.055) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }} />

        <ContainerScroll
          className="relative z-10"
          titleComponent={<HeroTitle navigate={navigate} />}
        >
          <DashboardMockup />
        </ContainerScroll>

        {/* Fade into next section */}
        <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent, #F8FAFC)' }} />
      </section>

      {/* ── Stats strip ─── */}
      <section className="bg-white border-y border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-0 sm:divide-x divide-slate-100">
            {[
              { value: '10K+', label: 'Active Students' },
              { value: '500K+', label: 'Tasks Completed' },
              { value: '98%', label: 'Satisfaction Rate' },
              { value: '4.9★', label: 'Average Rating' },
            ].map(stat => (
              <div key={stat.label} className="text-center sm:px-8">
                <p className="text-3xl font-extrabold font-poppins" style={{
                  background: 'linear-gradient(135deg, #5D8BF4, #C4B5FD)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>{stat.value}</p>
                <p className="text-sm text-slate-400 font-inter mt-1">{stat.label}</p>
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
            <p className="text-slate-500 font-inter max-w-xl mx-auto">Five powerful tools, one seamless experience. Designed with students, for students.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div key={f.title} className="card card-hover group animate-slide-up" style={{ animationDelay: `${i * 0.08}s` }}>
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center text-2xl mb-4 shadow-soft group-hover:scale-110 transition-transform duration-300`}>
                  {f.icon}
                </div>
                <h3 className="font-bold font-poppins text-darkText mb-2">{f.title}</h3>
                <p className="text-sm text-slate-500 font-inter leading-relaxed">{f.desc}</p>
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
          <p className="text-slate-500 font-inter">Real results from real students.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={t.name} className="card card-hover animate-slide-up" style={{ animationDelay: `${i * 0.1}s` }}>
              <p className="text-sm text-slate-600 font-inter italic leading-relaxed mb-4">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-aurora-soft flex items-center justify-center text-2xl">{t.avatar}</div>
                <div>
                  <p className="font-semibold font-poppins text-darkText text-sm">{t.name}</p>
                  <p className="text-xs text-slate-400 font-inter">{t.major}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA Banner ─── */}
      <section className="py-20 bg-aurora">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-extrabold font-poppins text-white mb-4">
            Ready to Transform How You Study?
          </h2>
          <p className="text-white/80 font-inter mb-8 text-lg">
            Join thousands of students who turned their academic stress into structured success.
          </p>
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-white text-primary font-bold font-poppins px-10 py-4 rounded-2xl shadow-glow hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-lg"
          >
            Get Started Free →
          </button>
        </div>
      </section>

      {/* ── Footer ─── */}
      <footer className="bg-darkText text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {logo ?
              <img className="w-8 h-8 rounded-xl bg-white flex items-center justify-center shadow-soft group-hover:shadow-glow transition-shadow duration-300" src={logo} alt="studiora-logo" /> :
              <div className="w-8 h-8 rounded-xl bg-aurora flex items-center justify-center text-white font-bold text-lg font-poppins shadow-soft group-hover:shadow-glow transition-shadow duration-300">
                S
              </div>}
            <span className="font-bold font-poppins">Studiora</span>
          </div>
          <p className="text-slate-400 font-inter text-sm">© 2026 Studiora. Built for the Web Design Competition 2026.</p>
          <p className="text-slate-500 text-xs font-inter">Organize. Focus. Excel.</p>
        </div>
      </footer>
    </div>
  )
}
