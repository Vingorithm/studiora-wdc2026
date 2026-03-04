import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const benefits = [
  {
    icon: '🧠',
    label: 'Sharper Concentration',
    desc: 'Short, time-boxed sprints train your brain to enter deep focus faster with every session.',
  },
  {
    icon: '🔋',
    label: 'Prevents Burnout',
    desc: 'Mandatory breaks restore mental energy — so you can study longer without hitting a wall.',
  },
  {
    icon: '📈',
    label: 'Builds Consistency',
    desc: 'Daily Pomodoro streaks create a rhythm your brain begins to crave, turning study into habit.',
  },
  {
    icon: '⚡',
    label: 'Beats Procrastination',
    desc: 'Committing to just 25 minutes eliminates the resistance of starting a daunting task.',
  },
]

function TimerMockup({ pulse }) {
  const radius = 88
  const circumference = 2 * Math.PI * radius
  const progress = 0.62
  const dashOffset = circumference - progress * circumference

  return (
    <div className="relative flex items-center justify-center">
      {/* Outer glow rings */}
      <div
        className="absolute w-72 h-72 rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, #5D8BF4 0%, transparent 70%)',
          animation: 'pulseGlow 3s ease-in-out infinite',
        }}
      />
      <div
        className="absolute w-56 h-56 rounded-full opacity-15"
        style={{
          background: 'radial-gradient(circle, #C4B5FD 0%, transparent 70%)',
          animation: 'pulseGlow 3s ease-in-out infinite 1s',
        }}
      />

      {/* Card shell */}
      <div
        className="relative z-10 rounded-3xl p-8 flex flex-col items-center gap-6"
        style={{
          background: 'linear-gradient(145deg, #1e1b4b 0%, #1e3a5f 60%, #0f172a 100%)',
          boxShadow: '0 32px 64px rgba(93,139,244,0.35), 0 0 0 1px rgba(196,181,253,0.1)',
          minWidth: 280,
        }}
      >
        {/* Mode badge */}
        <div className="flex gap-2 bg-white/10 rounded-xl p-1">
          <span className="px-4 py-1.5 rounded-lg bg-white text-primary text-xs font-bold font-inter shadow-sm">Focus</span>
          <span className="px-4 py-1.5 rounded-lg text-white/50 text-xs font-semibold font-inter">Break</span>
        </div>

        {/* SVG ring timer */}
        <div className="relative flex items-center justify-center">
          <svg width="220" height="220" style={{ filter: 'drop-shadow(0 0 20px rgba(93,139,244,0.5))' }}>
            <circle cx="110" cy="110" r={radius} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="7" />
            <circle
              cx="110" cy="110" r={radius}
              fill="none"
              stroke="url(#timerGrad)"
              strokeWidth="7"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              transform="rotate(-90 110 110)"
              style={{ transition: 'stroke-dashoffset 1s ease' }}
            />
            <defs>
              <linearGradient id="timerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#5D8BF4" />
                <stop offset="100%" stopColor="#C4B5FD" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className="text-5xl font-extrabold font-poppins text-white tracking-tight">15:32</span>
            <span className="text-xs font-semibold font-inter text-blue-300 uppercase tracking-widest mt-1">Focus Time</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white/60 text-base">↺</div>
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl text-white"
            style={{ background: 'linear-gradient(135deg, #5D8BF4, #C4B5FD)', boxShadow: '0 8px 24px rgba(93,139,244,0.5)' }}
          >
            ⏸
          </div>
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white/60 text-base">⏭</div>
        </div>

        {/* Session dots */}
        <div className="flex items-center gap-2">
          {[0, 1, 2, 3].map(i => (
            <div
              key={i}
              className="w-2.5 h-2.5 rounded-full transition-all duration-300"
              style={{ background: i < 2 ? '#5D8BF4' : 'rgba(255,255,255,0.15)' }}
            />
          ))}
          <span className="text-white/40 text-xs font-inter ml-2">2 sessions done</span>
        </div>
      </div>
    </div>
  )
}

export default function PomodoroSection() {
  const navigate = useNavigate()

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(160deg, #EEF2FF 0%, #F8FAFC 40%, #F5F3FF 100%)' }} />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary/20 to-transparent" />

      {/* Decorative blobs */}
      <div className="absolute top-10 right-1/4 w-80 h-80 bg-primary/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-64 h-64 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section label */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 bg-white border border-primary/15 rounded-full px-4 py-2 shadow-card">
            <span className="text-sm">🍅</span>
            <span className="text-xs font-bold font-inter text-primary uppercase tracking-widest">The Pomodoro Technique</span>
          </div>
        </div>

        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl sm:text-5xl font-extrabold font-poppins text-darkText leading-tight mb-4">
            Master Your Focus with the{' '}
            <span className="aurora-text">Pomodoro Technique</span>
          </h2>
          <p className="text-lg text-slate-500 font-inter leading-relaxed">
            A scientifically backed time management method that helps you work smarter — not longer.
          </p>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* LEFT: Text content */}
          <div className="flex flex-col gap-8 animate-slide-up">

            {/* Technique explanation */}
            <div className="bg-white rounded-2xl p-6 shadow-card border border-slate-100">
              <p className="text-slate-600 font-inter leading-relaxed text-base mb-4">
                Developed by Francesco Cirillo in the late 1980s, the Pomodoro Technique breaks your work into focused intervals — each one sharpening your mind like a lens focusing light.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <div
                  className="flex-1 flex items-center gap-3 rounded-xl px-4 py-3"
                  style={{ background: 'linear-gradient(135deg, #EFF6FF, #EEF2FF)' }}
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-xl"
                    style={{ background: 'linear-gradient(135deg, #5D8BF4, #818CF8)' }}>
                    ⏱
                  </div>
                  <div>
                    <p className="text-xs font-semibold font-inter text-slate-500 uppercase tracking-wide">Focus Sprint</p>
                    <p className="text-lg font-extrabold font-poppins text-primary">25 minutes</p>
                  </div>
                </div>
                <div className="flex items-center justify-center text-slate-300 font-bold text-xl hidden sm:flex">+</div>
                <div
                  className="flex-1 flex items-center gap-3 rounded-xl px-4 py-3"
                  style={{ background: 'linear-gradient(135deg, #F5F3FF, #FDF4FF)' }}
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-xl"
                    style={{ background: 'linear-gradient(135deg, #C4B5FD, #E879F9)' }}>
                    ☕
                  </div>
                  <div>
                    <p className="text-xs font-semibold font-inter text-slate-500 uppercase tracking-wide">Rest Break</p>
                    <p className="text-lg font-extrabold font-poppins text-purple-500">5 minutes</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {benefits.map((b, i) => (
                <div
                  key={b.label}
                  className="flex gap-3 p-4 bg-white rounded-2xl shadow-card border border-slate-100 hover:shadow-soft hover:-translate-y-0.5 transition-all duration-200 animate-slide-up"
                  style={{ animationDelay: `${i * 0.07}s` }}
                >
                  <div className="w-10 h-10 rounded-xl bg-aurora-soft flex items-center justify-center text-xl flex-shrink-0">
                    {b.icon}
                  </div>
                  <div>
                    <p className="font-bold font-poppins text-darkText text-sm mb-0.5">{b.label}</p>
                    <p className="text-xs text-slate-400 font-inter leading-relaxed">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div>
              <button
                onClick={() => navigate('/focus')}
                className="group inline-flex items-center gap-3 text-white font-bold font-poppins px-8 py-4 rounded-full shadow-glow hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 text-base"
                style={{ background: 'linear-gradient(135deg, #5D8BF4 0%, #C4B5FD 100%)' }}
              >
                <span className="text-xl group-hover:animate-float inline-block">🎯</span>
                Start Your First Focus Session
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" className="group-hover:translate-x-1 transition-transform duration-200">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
              <p className="text-xs text-slate-400 font-inter mt-3 ml-1">No setup needed. Start focusing in seconds.</p>
            </div>
          </div>

          {/* RIGHT: Timer mockup */}
          <div className="flex items-center justify-center animate-float" style={{ animationDelay: '1s' }}>
            <TimerMockup />
          </div>
        </div>

        {/* Bottom stat strip */}
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { value: '52%', label: 'More tasks completed', icon: '📈' },
            { value: '3×', label: 'Faster deep focus onset', icon: '⚡' },
            { value: '40%', label: 'Reduced mental fatigue', icon: '🔋' },
            { value: '89%', label: 'Students report less stress', icon: '😌' },
          ].map(stat => (
            <div
              key={stat.label}
              className="bg-white rounded-2xl p-5 shadow-card border border-slate-100 text-center hover:shadow-soft hover:-translate-y-0.5 transition-all duration-200"
            >
              <p className="text-2xl mb-1">{stat.icon}</p>
              <p className="text-2xl font-extrabold font-poppins aurora-text">{stat.value}</p>
              <p className="text-xs text-slate-400 font-inter mt-1 leading-snug">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes pulseGlow {
          0%, 100% { transform: scale(1); opacity: 0.2; }
          50% { transform: scale(1.12); opacity: 0.35; }
        }
      `}</style>
    </section>
  )
}