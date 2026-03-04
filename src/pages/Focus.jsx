import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Timer from '../components/Timer'
import { RiFocus3Line } from 'react-icons/ri';
import { BsFire } from 'react-icons/bs';
import { MdAccessTimeFilled } from 'react-icons/md';

function useSessionStats() {
  const [sessions, setSessions] = useState(() => parseInt(localStorage.getItem('studiora_sessions') || '0'))
  const [totalMinutes, setTotalMinutes] = useState(() => parseInt(localStorage.getItem('studiora_focus_minutes') || '0'))

  const addSession = () => {
    const newSessions = sessions + 1
    const newMinutes = totalMinutes + 25
    setSessions(newSessions)
    setTotalMinutes(newMinutes)
    localStorage.setItem('studiora_sessions', String(newSessions))
    localStorage.setItem('studiora_focus_minutes', String(newMinutes))
    // Update streak
    localStorage.setItem('studiora_streak', String(parseInt(localStorage.getItem('studiora_streak') || '6') + 1))
  }

  return { sessions, totalMinutes, addSession }
}

const tips = [
  "Put your phone in another room. Out of sight, out of mind.",
  "Close unnecessary browser tabs before starting.",
  "Hydrate! Keep a water bottle at your desk.",
  "Write down what you want to accomplish this session.",
  "Short breaks are crucial — your brain needs to rest.",
  "The hardest part is starting. Once you begin, momentum builds.",
  "Review your notes after each Pomodoro to reinforce memory.",
]

export default function Focus() {
  const navigate = useNavigate()
  const { sessions, totalMinutes, addSession } = useSessionStats()
  const [tipIndex] = useState(() => Math.floor(Math.random() * tips.length))
  const [justCompleted, setJustCompleted] = useState(false)
  const chartRef = useRef(null)
  const chartInstance = useRef(null)

  // Mock daily session data
  const weekData = [2, 4, 3, 6, 5, sessions % 8 || 4, 0]

  const handleSessionComplete = () => {
    addSession()
    setJustCompleted(true)
    setTimeout(() => setJustCompleted(false), 3000)
  }

  useEffect(() => {
    if (!chartRef.current || typeof Chart === 'undefined') return
    if (chartInstance.current) chartInstance.current.destroy()

    chartInstance.current = new Chart(chartRef.current, {
      type: 'bar',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
          label: 'Sessions',
          data: weekData,
          backgroundColor: 'rgba(93, 139, 244, 0.6)',
          borderColor: '#5D8BF4',
          borderWidth: 1.5,
          borderRadius: 8,
          hoverBackgroundColor: 'rgba(196, 181, 253, 0.8)',
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: 'rgba(30,27,75,0.9)',
            titleColor: '#fff',
            bodyColor: '#A5B4FC',
            cornerRadius: 10,
            callbacks: { label: ctx => ` ${ctx.raw} sessions` }
          }
        },
        scales: {
          x: { grid: { display: false }, ticks: { color: 'rgba(255,255,255,0.4)', font: { family: 'Inter', size: 11 } } },
          y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: 'rgba(255,255,255,0.4)', font: { family: 'Inter', size: 11 } }, beginAtZero: true }
        }
      }
    })

    return () => { if (chartInstance.current) chartInstance.current.destroy() }
  }, [sessions])

  const hours = Math.floor(totalMinutes / 60)
  const mins = totalMinutes % 60

  return (
    <div className="min-h-screen focus-bg flex flex-col">
      {/* Ambient blobs */}
      <div className="fixed top-20 left-10 w-96 h-96 rounded-full opacity-10 animate-float" style={{ background: 'radial-gradient(circle, #5D8BF4, transparent)' }} />
      <div className="fixed bottom-20 right-10 w-80 h-80 rounded-full opacity-10 animate-float" style={{ background: 'radial-gradient(circle, #C4B5FD, transparent)', animationDelay: '3s' }} />

      {/* Back button */}
      <div className="relative z-10 p-6">
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-white/60 hover:text-white font-inter text-sm transition-colors"
        >
          ← Back to Dashboard
        </button>
      </div>

      {/* Main focus area */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 relative z-10">
        {/* Completion toast */}
        {justCompleted && (
          <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-success text-white px-6 py-3 rounded-2xl font-semibold font-inter text-sm shadow-lg animate-slide-up">
            🎉 Session complete! Take a well-earned break.
          </div>
        )}

        {/* Title */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold font-poppins text-white mb-2">Focus Mode</h1>
          <p className="text-white/50 font-inter text-sm">Distraction-free deep work</p>
        </div>

        {/* Timer */}
        <Timer onSessionComplete={handleSessionComplete} />

        {/* Tip */}
        <div className="mt-10 max-w-sm text-center">
          <p className="text-white/40 text-xs font-inter italic">{tips[tipIndex]}</p><br></br>
        </div>
      </div>

      {/* Stats bar */}
      <div className="relative z-10 px-6 pb-8">
        <div className="max-w-4xl mx-auto">
          {/* Stats row */}
          <div className="text-white grid grid-cols-3 gap-4 mb-6">
            {[
              { label: 'Sessions Today', value: sessions, icon: <RiFocus3Line /> },
              { label: 'Focus Time', value: `${hours}h ${mins}m`, icon: <MdAccessTimeFilled /> },
              { label: 'Study Streak', value: `${parseInt(localStorage.getItem('studiora_streak') || '7')} days`, icon: <BsFire /> },
            ].map(stat => (
              <div
                key={stat.label}
                className="bg-white/8 backdrop-blur-sm rounded-2xl p-4 border border-white/10 
             flex flex-col items-center justify-center text-center"
              >
                <p className="text-2xl mb-1">{stat.icon}</p>
                <p className="text-white font-bold font-poppins text-xl">
                  {stat.value}
                </p>
                <p className="text-white/40 font-inter text-xs mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* Sessions chart */}
          <div className="bg-white/8 backdrop-blur-sm rounded-2xl p-5 border border-white/10">
            <p className="text-white/60 font-inter text-xs font-semibold uppercase tracking-wide mb-4">Weekly Focus Sessions</p>
            <div style={{ height: '120px' }}>
              <canvas ref={chartRef} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}