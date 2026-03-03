import { useNavigate } from 'react-router-dom'
import PomodoroSection from '../components/PomodoroSection'

const features = [
  {
    icon: '✅',
    title: 'Smart Task Manager',
    desc: 'Create, prioritize, and track tasks with deadlines. Visual urgency indicators keep you ahead of every deadline.',
    color: 'from-blue-400 to-primary',
  },
  {
    icon: '📅',
    title: 'Study Planner',
    desc: 'Weekly calendar view with time-blocking UI. Visualize your study sessions and stay organized all week.',
    color: 'from-secondary to-purple-400',
  },
  {
    icon: '📝',
    title: 'Smart Notes',
    desc: 'Organize notes by subject with tags, highlights, and checklists. Never lose an important idea again.',
    color: 'from-accent to-orange-400',
  },
  {
    icon: '🎯',
    title: 'Focus Mode',
    desc: 'Distraction-free Pomodoro timer. 25 minutes of deep focus followed by rejuvenating breaks.',
    color: 'from-emerald-400 to-teal-500',
  },
  {
    icon: '📊',
    title: 'Progress Analytics',
    desc: 'Track study hours, completed tasks, and productivity streaks. See your growth in beautiful charts.',
    color: 'from-rose-400 to-pink-500',
  },
]

const testimonials = [
  { name: 'Sarah K.', major: 'Computer Science', text: 'Studiora helped me go from overwhelmed to organized in one week. My GPA improved this semester!', avatar: '👩‍💻' },
  { name: 'Marcus L.', major: 'Medicine', text: 'The focus timer is a game-changer. I can finally study for 3 hours without checking my phone.', avatar: '👨‍⚕️' },
  { name: 'Priya R.', major: 'Business', text: "The weekly planner lets me see exactly when I'm studying and where I need to improve.", avatar: '👩‍💼' },
]

function HeroDashboardMockup() {
  return (
    <div className="relative w-full max-w-lg mx-auto lg:mx-0 animate-float" style={{ animationDelay: '0.5s' }}>
      {/* Glow halo behind card stack */}
      <div className="absolute inset-0 rounded-3xl blur-3xl opacity-30"
        style={{ background: 'radial-gradient(ellipse at 60% 40%, #5D8BF4 0%, #C4B5FD 60%, transparent 100%)', transform: 'scale(1.15)' }} />

      {/* Back card – depth layer */}
      <div className="absolute top-6 left-6 right-0 bottom-0 rounded-3xl"
        style={{ background: 'rgba(255,255,255,0.4)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.6)', boxShadow: '0 8px 32px rgba(93,139,244,0.12)' }} />

      {/* Mid card */}
      <div className="absolute top-3 left-3 right-2 bottom-1 rounded-3xl"
        style={{ background: 'rgba(255,255,255,0.65)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.7)', boxShadow: '0 12px 40px rgba(93,139,244,0.14)' }} />

      {/* Main card */}
      <div className="relative rounded-3xl overflow-hidden"
        style={{ background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(24px)', border: '1px solid rgba(255,255,255,0.9)', boxShadow: '0 24px 64px rgba(93,139,244,0.18), 0 0 0 1px rgba(93,139,244,0.08)' }}>

        {/* Card header */}
        <div className="px-5 pt-5 pb-4 flex items-center justify-between border-b border-slate-100/80">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-xl flex items-center justify-center text-white text-xs font-bold font-poppins"
              style={{ background: 'linear-gradient(135deg, #5D8BF4, #C4B5FD)' }}>S</div>
            <span className="text-sm font-bold font-poppins text-darkText">Studiora</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-success animate-pulse-slow" />
            <span className="text-xs text-slate-400 font-inter">Live</span>
          </div>
        </div>

        <div className="p-5 space-y-4">
          {/* Stat row */}
          <div className="grid grid-cols-3 gap-2.5">
            {[
              { val: '12', label: 'Tasks', color: '#5D8BF4', bg: '#EEF2FF' },
              { val: '7🔥', label: 'Streak', color: '#F97316', bg: '#FFF7ED' },
              { val: '4.5h', label: 'Focus', color: '#7C3AED', bg: '#F5F3FF' },
            ].map(s => (
              <div key={s.label} className="rounded-xl px-3 py-2.5 text-center" style={{ background: s.bg }}>
                <p className="text-base font-extrabold font-poppins" style={{ color: s.color }}>{s.val}</p>
                <p className="text-xs text-slate-400 font-inter mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Task items */}
          <div className="space-y-2">
            {[
              { title: 'Calculus Problem Set', priority: 'High', done: false, color: '#F87171' },
              { title: 'Physics Lab Report', priority: 'Medium', done: false, color: '#FDBA74' },
              { title: 'Read Chapter 7–9', priority: 'Low', done: true, color: '#22C55E' },
            ].map((task, i) => (
              <div key={i} className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50/80">
                <div className="w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors"
                  style={{ borderColor: task.color, background: task.done ? task.color : 'transparent' }}>
                  {task.done && <span style={{ fontSize: '8px', color: 'white' }}>✓</span>}
                </div>
                <span className={`text-xs font-inter flex-1 ${task.done ? 'line-through text-slate-400' : 'text-slate-600'}`}>{task.title}</span>
                <span className="text-xs font-semibold font-inter px-2 py-0.5 rounded-lg"
                  style={{ background: task.color + '18', color: task.color }}>{task.priority}</span>
              </div>
            ))}
          </div>

          {/* Mini focus timer strip */}
          <div className="rounded-2xl p-3.5 flex items-center gap-4"
            style={{ background: 'linear-gradient(135deg, #1e1b4b, #1e3a5f)' }}>
            <div className="relative w-10 h-10 flex-shrink-0">
              <svg width="40" height="40" viewBox="0 0 40 40">
                <circle cx="20" cy="20" r="16" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="3.5" />
                <circle cx="20" cy="20" r="16" fill="none" stroke="#5D8BF4" strokeWidth="3.5"
                  strokeLinecap="round" strokeDasharray={`${2 * Math.PI * 16}`}
                  strokeDashoffset={`${2 * Math.PI * 16 * 0.38}`} transform="rotate(-90 20 20)" />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-white font-bold font-poppins" style={{ fontSize: '9px' }}>🎯</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-xs font-semibold font-inter">Focus Session</p>
              <p className="text-white/50 text-xs font-inter mt-0.5">15:32 remaining</p>
            </div>
            <div className="w-7 h-7 rounded-xl flex items-center justify-center text-sm"
              style={{ background: 'linear-gradient(135deg, #5D8BF4, #C4B5FD)' }}>⏸</div>
          </div>

          {/* Progress bar */}
          <div>
            <div className="flex justify-between text-xs font-inter text-slate-400 mb-1.5">
              <span>Daily Goal</span><span>72% complete</span>
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full rounded-full" style={{ width: '72%', background: 'linear-gradient(90deg, #5D8BF4, #C4B5FD)' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Floating badge – top right */}
      <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-soft border border-slate-100 px-3.5 py-2.5 flex items-center gap-2 animate-float" style={{ animationDelay: '1s' }}>
        <span className="text-lg">⭐</span>
        <div>
          <p className="text-xs font-bold font-poppins text-darkText leading-none">4.9 Rating</p>
          <p className="text-xs text-slate-400 font-inter">10K+ students</p>
        </div>
      </div>

      {/* Floating badge – bottom left */}
      <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-soft border border-slate-100 px-3.5 py-2.5 flex items-center gap-2 animate-float" style={{ animationDelay: '2.5s' }}>
        <span className="text-lg">✅</span>
        <div>
          <p className="text-xs font-bold font-poppins text-darkText leading-none">500K+ Tasks</p>
          <p className="text-xs text-slate-400 font-inter">Completed this month</p>
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen">

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">

        {/* Background gradient base */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(145deg, #EEF2FF 0%, #F8FAFC 35%, #F5F3FF 70%, #FFF7ED 100%)'
        }} />

        {/* Radial glow center */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse 80% 60% at 65% 50%, rgba(93,139,244,0.10) 0%, rgba(196,181,253,0.08) 50%, transparent 100%)'
        }} />

        {/* Floating blobs */}
        <div className="absolute -top-24 -left-24 w-[480px] h-[480px] rounded-full blur-3xl opacity-40 animate-float pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(93,139,244,0.22), transparent 70%)' }} />
        <div className="absolute top-1/3 -right-32 w-[520px] h-[520px] rounded-full blur-3xl opacity-35 animate-float pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(196,181,253,0.28), transparent 70%)', animationDelay: '2.5s' }} />
        <div className="absolute -bottom-20 left-1/3 w-[360px] h-[360px] rounded-full blur-3xl opacity-30 animate-float pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(253,186,116,0.20), transparent 70%)', animationDelay: '4s' }} />

        {/* Grid texture overlay – very subtle */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: 'radial-gradient(rgba(93,139,244,0.06) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }} />

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-0 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* ── LEFT: Text ── */}
            <div className="flex flex-col gap-8 text-center lg:text-left">

              {/* Badge */}
              <div className="flex justify-center lg:justify-start animate-fade-in">
                <div className="inline-flex items-center gap-2.5 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-card border border-primary/12">
                  <span className="w-2 h-2 rounded-full bg-success animate-pulse-slow flex-shrink-0" />
                  <span className="text-sm font-semibold text-slate-600 font-inter">Designed for university students</span>
                </div>
              </div>

              {/* Headline */}
              <div className="animate-slide-up">
                <h1 className="text-5xl sm:text-6xl lg:text-[64px] font-extrabold font-poppins text-darkText leading-[1.08] tracking-tight">
                  <span className="block">
                    <span style={{
                      background: 'linear-gradient(135deg, #5D8BF4, #818CF8)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}>Organize</span>{' '}
                    <span className="text-darkText">Your Study.</span>
                  </span>
                  <span className="block mt-2">
                    <span className="text-darkText">Illuminate </span>
                    <span style={{
                      background: 'linear-gradient(135deg, #C4B5FD, #E879F9)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}>Your Future.</span>
                  </span>
                </h1>
              </div>

              {/* Sub-headline */}
              <p className="text-lg text-slate-500 font-inter leading-relaxed max-w-xl mx-auto lg:mx-0 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                Studiora transforms your chaotic academic life into a{' '}
                <span className="text-darkText font-semibold">structured</span>,{' '}
                <span className="text-darkText font-semibold">focused</span>, and{' '}
                <span className="text-darkText font-semibold">inspiring</span>{' '}
                study journey — all in one elegant dashboard.
              </p>

              {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start animate-slide-up" style={{ animationDelay: '0.18s' }}>
                <button
                  onClick={() => navigate('/dashboard')}
                  className="inline-flex items-center justify-center gap-2.5 font-bold font-poppins text-base text-white px-8 py-4 rounded-full shadow-glow hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300"
                  style={{ background: 'linear-gradient(135deg, #5D8BF4 0%, #C4B5FD 100%)' }}
                >
                  <span>🚀</span> Start Organizing
                </button>
                <button
                  onClick={() => {
                    const el = document.getElementById('features')
                    el ? el.scrollIntoView({ behavior: 'smooth' }) : navigate('/dashboard')
                  }}
                  className="inline-flex items-center justify-center gap-2 font-semibold font-inter text-base text-slate-600 bg-white/70 backdrop-blur-sm border border-slate-200 px-8 py-4 rounded-full hover:bg-white hover:border-primary/30 hover:text-primary transition-all duration-300 shadow-card"
                >
                  Explore Features
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>

              {/* Social proof avatars + stat */}
              <div className="flex items-center gap-4 justify-center lg:justify-start animate-fade-in" style={{ animationDelay: '0.28s' }}>
                <div className="flex -space-x-2.5">
                  {['👩‍💻', '👨‍⚕️', '👩‍💼', '👨‍🎓', '👩‍🔬'].map((a, i) => (
                    <div key={i} className="w-9 h-9 rounded-full bg-white border-2 border-white shadow-card flex items-center justify-center text-base"
                      style={{ zIndex: 5 - i }}>
                      {a}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1 mb-0.5">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill="#FDBA74">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-xs text-slate-500 font-inter"><span className="font-semibold text-darkText">10,000+</span> students trust Studiora</p>
                </div>
              </div>
            </div>

            {/* ── RIGHT: Dashboard Mockup ── */}
            <div className="flex justify-center lg:justify-end animate-fade-in" style={{ animationDelay: '0.22s' }}>
              <HeroDashboardMockup />
            </div>
          </div>
        </div>

        {/* Bottom fade into next section */}
        <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent, #F8FAFC)' }} />
      </section>

      {/* Stats strip */}
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
                <p className="text-3xl font-extrabold font-poppins"
                  style={{ background: 'linear-gradient(135deg, #5D8BF4, #C4B5FD)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  {stat.value}
                </p>
                <p className="text-sm text-slate-400 font-inter mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mock Dashboard Preview */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="section-title mb-3">Your Productivity Command Center</h2>
          <p className="text-slate-500 font-inter">Everything you need, elegantly organized.</p>
        </div>

        <div className="card p-0 overflow-hidden shadow-glow">
          <div className="bg-aurora p-4 flex items-center gap-3">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-white/40" />
              <div className="w-3 h-3 rounded-full bg-white/40" />
              <div className="w-3 h-3 rounded-full bg-white/40" />
            </div>
            <div className="flex-1 text-center text-white/80 text-sm font-inter">studiora.app/dashboard</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-0 bg-slate-50">
            <div className="bg-white border-r border-slate-100 p-4 hidden md:block">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-7 h-7 rounded-lg bg-aurora flex items-center justify-center text-white text-sm font-bold">S</div>
                <span className="font-bold text-sm font-poppins text-darkText">Studiora</span>
              </div>
              {['Dashboard', 'Tasks', 'Notes', 'Focus', 'Analytics'].map((item, i) => (
                <div key={item} className={`flex items-center gap-2 px-3 py-2.5 rounded-xl mb-1 text-xs font-inter font-medium ${i === 0 ? 'bg-primary/10 text-primary' : 'text-slate-400'}`}>
                  <span>{['⬡', '✓', '📝', '🎯', '📊'][i]}</span> {item}
                </div>
              ))}
            </div>

            <div className="col-span-3 p-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
                {[
                  { label: 'Total Tasks', value: '24', color: 'text-primary' },
                  { label: 'Focus Hours', value: '12h', color: 'text-purple-500' },
                  { label: 'Streak', value: '7🔥', color: 'text-amber-500' },
                  { label: 'Done Today', value: '5', color: 'text-emerald-500' },
                ].map(s => (
                  <div key={s.label} className="bg-white rounded-xl p-3 shadow-card">
                    <div className={`text-xl font-bold font-poppins ${s.color}`}>{s.value}</div>
                    <div className="text-xs text-slate-400 font-inter mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
              <div className="bg-white rounded-xl p-4 shadow-card">
                <p className="text-xs font-semibold font-inter text-slate-500 mb-3">Weekly Study Hours</p>
                <div className="flex items-end gap-2 h-16">
                  {[4, 6, 5, 8, 7, 9, 6].map((h, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <div className="w-full rounded-t-md bg-gradient-to-t from-primary to-secondary opacity-80"
                        style={{ height: `${(h / 9) * 100}%` }} />
                      <span className="text-xs text-slate-300 font-inter">{['M','T','W','T','F','S','S'][i]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
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

      {/* Pomodoro Section */}
      <PomodoroSection />

      {/* Testimonials */}
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

      {/* CTA Banner */}
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

      {/* Footer */}
      <footer className="bg-darkText text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-aurora flex items-center justify-center text-white font-bold text-sm">S</div>
            <span className="font-bold font-poppins">Studiora</span>
          </div>
          <p className="text-slate-400 font-inter text-sm">© 2026 Studiora. Built for the Web Design Competition 2026.</p>
          <p className="text-slate-500 text-xs font-inter">Organize. Focus. Excel.</p>
        </div>
      </footer>
    </div>
  )
}