import { useState, useEffect, useRef } from 'react'

export default function Timer({ onSessionComplete }) {
  const [mode, setMode] = useState('focus') // 'focus' | 'break'
  const [timeLeft, setTimeLeft] = useState(25 * 60)
  const [isRunning, setIsRunning] = useState(false)
  const [sessions, setSessions] = useState(0)
  const intervalRef = useRef(null)

  const totalTime = mode === 'focus' ? 25 * 60 : 5 * 60
  const progress = ((totalTime - timeLeft) / totalTime) * 100

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(t => {
          if (t <= 1) {
            clearInterval(intervalRef.current)
            setIsRunning(false)
            if (mode === 'focus') {
              setSessions(s => s + 1)
              if (onSessionComplete) onSessionComplete()
              setMode('break')
              return 5 * 60
            } else {
              setMode('focus')
              return 25 * 60
            }
          }
          return t - 1
        })
      }, 1000)
    }
    return () => clearInterval(intervalRef.current)
  }, [isRunning, mode])

  const toggle = () => setIsRunning(r => !r)
  const reset = () => {
    clearInterval(intervalRef.current)
    setIsRunning(false)
    setTimeLeft(mode === 'focus' ? 25 * 60 : 5 * 60)
  }
  const switchMode = (m) => {
    clearInterval(intervalRef.current)
    setIsRunning(false)
    setMode(m)
    setTimeLeft(m === 'focus' ? 25 * 60 : 5 * 60)
  }

  const mm = String(Math.floor(timeLeft / 60)).padStart(2, '0')
  const ss = String(timeLeft % 60).padStart(2, '0')

  // SVG circle
  const radius = 110
  const circumference = 2 * Math.PI * radius
  const dashOffset = circumference - (progress / 100) * circumference

  return (
    <div className="flex flex-col items-center gap-8">
      {/* Mode tabs */}
      <div className="flex gap-2 bg-white/10 rounded-2xl p-1.5">
        {['focus', 'break'].map(m => (
          <button
            key={m}
            onClick={() => switchMode(m)}
            className={`px-6 py-2.5 rounded-xl text-sm font-semibold font-inter transition-all duration-300 capitalize ${
              mode === m
                ? 'bg-white text-primary shadow-soft'
                : 'text-white/70 hover:text-white'
            }`}
          >
            {m === 'focus' ? '🎯 Focus' : '☕ Break'}
          </button>
        ))}
      </div>

      {/* Timer circle */}
      <div className="relative flex items-center justify-center">
        <svg width="280" height="280" className={isRunning ? 'timer-ring-active' : 'timer-ring'}>
          {/* Background circle */}
          <circle
            cx="140" cy="140" r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="8"
          />
          {/* Progress circle */}
          <circle
            cx="140" cy="140" r={radius}
            fill="none"
            stroke={mode === 'focus' ? '#5D8BF4' : '#C4B5FD'}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            transform="rotate(-90 140 140)"
            style={{ transition: 'stroke-dashoffset 0.5s ease' }}
          />
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className="text-6xl font-bold font-poppins text-white tracking-tight">
            {mm}:{ss}
          </span>
          <span className={`text-sm font-semibold font-inter mt-1 uppercase tracking-widest ${mode === 'focus' ? 'text-blue-300' : 'text-purple-300'}`}>
            {mode === 'focus' ? 'Focus Time' : 'Break Time'}
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4">
        <button
          onClick={reset}
          className="w-12 h-12 rounded-2xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all duration-200 text-lg"
        >
          ↺
        </button>
        <button
          onClick={toggle}
          className={`w-20 h-20 rounded-3xl flex items-center justify-center text-2xl font-bold transition-all duration-300 shadow-glow ${
            isRunning
              ? 'bg-white text-primary hover:bg-white/90 scale-105'
              : 'bg-primary hover:bg-primary/90 text-white'
          }`}
        >
          {isRunning ? '⏸' : '▶'}
        </button>
        <button
          onClick={() => switchMode(mode === 'focus' ? 'break' : 'focus')}
          className="w-12 h-12 rounded-2xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all duration-200 text-lg"
        >
          ⏭
        </button>
      </div>

      {/* Session counter */}
      <div className="flex items-center gap-3">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              i < sessions % 4
                ? 'bg-primary scale-110'
                : 'bg-white/20'
            }`}
          />
        ))}
        <span className="text-white/60 text-sm font-inter ml-2">
          {sessions} session{sessions !== 1 ? 's' : ''} completed
        </span>
      </div>
    </div>
  )
}