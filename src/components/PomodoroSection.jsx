import { motion } from 'framer-motion';

/**
 * PomodoroSection Component
 * 
 * Design Philosophy: Aurora Design System
 * - Showcases Focus Mode feature with Pomodoro timer
 * - Uses gradient backgrounds and glassmorphism
 * - Includes interactive timer visualization
 */

export default function PomodoroSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-[#F5F3FF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="section-title mb-3">Focus Mode: Your Productivity Superpower</h2>
          <p className="text-slate-500 font-inter max-w-xl mx-auto">
            Harness the Pomodoro Technique with our distraction-free timer. 25 minutes of deep focus, followed by rejuvenating breaks.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Timer Visualization */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <div className="relative w-64 h-64">
              {/* Outer glow */}
              <div className="absolute inset-0 rounded-full blur-2xl opacity-40"
                style={{ background: 'radial-gradient(circle, rgba(93,139,244,0.4), transparent 70%)' }} />

              {/* Timer circle */}
              <div className="absolute inset-0 rounded-full"
                style={{
                  background: 'linear-gradient(135deg, #5D8BF4, #C4B5FD)',
                  boxShadow: '0 24px 64px rgba(93,139,244,0.25)',
                }} />

              {/* Inner white circle */}
              <div className="absolute inset-4 rounded-full bg-white flex items-center justify-center flex-col gap-2">
                <div className="text-5xl font-extrabold text-[#5D8BF4]">25</div>
                <div className="text-sm font-inter text-slate-400">minutes</div>
              </div>

              {/* Animated progress ring */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 256 256">
                <circle cx="128" cy="128" r="120" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
                <motion.circle
                  cx="128"
                  cy="128"
                  r="120"
                  fill="none"
                  stroke="rgba(255,255,255,0.8)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 120}`}
                  strokeDashoffset={`${2 * Math.PI * 120 * 0.3}`}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{ duration: 25, repeat: Infinity }}
                  style={{ transform: 'rotate(-90deg)', transformOrigin: '128px 128px' }}
                />
              </svg>
            </div>
          </motion.div>

          {/* Right: Features */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {[
              {
                icon: '⏱️',
                title: 'Scientifically Proven',
                desc: 'The Pomodoro Technique is backed by decades of productivity research. 25 minutes of focused work followed by 5-minute breaks maximizes cognitive performance.',
              },
              {
                icon: '🎯',
                title: 'Zero Distractions',
                desc: 'Enter Focus Mode and block all notifications. Your phone, emails, and messages disappear. Only you and your work exist.',
              },
              {
                icon: '📈',
                title: 'Track Your Progress',
                desc: 'Every completed Pomodoro counts toward your daily goal. Watch your focus streaks grow and celebrate your consistency.',
              },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex gap-4"
              >
                <div className="text-3xl flex-shrink-0">{feature.icon}</div>
                <div>
                  <h3 className="font-bold text-[#1E293B] mb-1">{feature.title}</h3>
                  <p className="text-sm text-slate-500 font-inter leading-relaxed">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
