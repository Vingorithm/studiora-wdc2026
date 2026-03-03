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
  { name: 'Priya R.', major: 'Business', text: 'The weekly planner lets me see exactly when I\'m studying and where I need to improve.', avatar: '👩‍💼' },
]

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-aurora-soft">
        {/* Background blobs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/15 rounded-full blur-3xl animate-float" />
        <div className="absolute top-40 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-10 left-1/2 w-64 h-64 bg-accent/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-card border border-primary/15 mb-8 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse-slow" />
            <span className="text-sm font-semibold text-slate-600 font-inter">Designed for university students</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold font-poppins text-darkText mb-6 leading-tight animate-slide-up">
            Organize Your Study.<br />
            <span className="aurora-text">Illuminate Your Future.</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-500 font-inter max-w-2xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Studiora is your all-in-one academic productivity platform. Manage tasks, block study time, take smart notes, and focus deeper — all in one beautiful dashboard.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <button
              onClick={() => navigate('/dashboard')}
              className="btn-primary text-base px-8 py-4 shadow-glow"
            >
              🚀 Start Organizing — It's Free
            </button>
            <button
              onClick={() => navigate('/focus')}
              className="btn-secondary text-base px-8 py-4"
            >
              🎯 Try Focus Mode
            </button>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap justify-center gap-8 mt-16 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            {[
              { value: '10K+', label: 'Students' },
              { value: '500K+', label: 'Tasks Completed' },
              { value: '98%', label: 'Satisfaction' },
              { value: '4.9★', label: 'App Rating' },
            ].map(stat => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-bold font-poppins aurora-text">{stat.value}</p>
                <p className="text-sm text-slate-500 font-inter mt-1">{stat.label}</p>
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

        {/* Mock Dashboard */}
        <div className="card p-0 overflow-hidden shadow-glow">
          {/* Mock header bar */}
          <div className="bg-aurora p-4 flex items-center gap-3">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-white/40" />
              <div className="w-3 h-3 rounded-full bg-white/40" />
              <div className="w-3 h-3 rounded-full bg-white/40" />
            </div>
            <div className="flex-1 text-center text-white/80 text-sm font-inter">studiora.app/dashboard</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-0 bg-slate-50">
            {/* Sidebar */}
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

            {/* Main */}
            <div className="col-span-3 p-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
                {[
                  { label: 'Total Tasks', value: '24', icon: '✓', color: 'bg-primary/10 text-primary' },
                  { label: 'Focus Hours', value: '12h', icon: '⏱', color: 'bg-purple-50 text-purple-500' },
                  { label: 'Streak', value: '7🔥', icon: '', color: 'bg-amber-50 text-amber-500' },
                  { label: 'Done Today', value: '5', icon: '⭐', color: 'bg-emerald-50 text-emerald-500' },
                ].map(s => (
                  <div key={s.label} className="bg-white rounded-xl p-3 shadow-card">
                    <div className={`text-xl font-bold font-poppins ${s.color.split(' ')[1]}`}>{s.value}</div>
                    <div className="text-xs text-slate-400 font-inter mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
              {/* Mini chart placeholder */}
              <div className="bg-white rounded-xl p-4 shadow-card">
                <p className="text-xs font-semibold font-inter text-slate-500 mb-3">Weekly Study Hours</p>
                <div className="flex items-end gap-2 h-16">
                  {[4, 6, 5, 8, 7, 9, 6].map((h, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <div
                        className="w-full rounded-t-md bg-gradient-to-t from-primary to-secondary opacity-80"
                        style={{ height: `${(h / 9) * 100}%` }}
                      />
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
      <section className="py-20 bg-aurora-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="section-title mb-3">Everything You Need to Excel</h2>
            <p className="text-slate-500 font-inter max-w-xl mx-auto">Five powerful tools, one seamless experience. Designed with students, for students.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div
                key={f.title}
                className="card card-hover group animate-slide-up"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
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
                <div className="w-10 h-10 rounded-2xl bg-aurora-soft flex items-center justify-center text-2xl">
                  {t.avatar}
                </div>
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