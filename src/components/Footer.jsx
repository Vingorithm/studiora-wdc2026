import { NavLink, useNavigate } from 'react-router-dom'
import { TbLayoutDashboardFilled } from 'react-icons/tb'
import { FaTasks, FaGithub, FaTwitter, FaInstagram } from 'react-icons/fa'
import { LuNotebook } from 'react-icons/lu'
import { RiFocus3Line } from 'react-icons/ri'
import logo from '/icon.png'

const navLinks = [
  { to: '/dashboard', label: 'Dashboard', icon: <TbLayoutDashboardFilled /> },
  { to: '/tasks',     label: 'Tasks',     icon: <FaTasks /> },
  { to: '/notes',     label: 'Notes',     icon: <LuNotebook /> },
  { to: '/focus',     label: 'Focus',     icon: <RiFocus3Line /> },
]

const resources = [
  { label: 'Getting Started', href: '#' },
  { label: 'Study Guides',    href: '#' },
  { label: 'Pomodoro Technique', href: '#' },
  { label: 'Keyboard Shortcuts', href: '#' },
]

const social = [
  { icon: <FaTwitter />,   href: '#', label: 'Twitter'  },
  { icon: <FaInstagram />, href: '#', label: 'Instagram' },
  { icon: <FaGithub />,    href: '#', label: 'GitHub'   },
]

export default function Footer() {
  // mt-16 gives breathing room from page content on all inner pages
  const navigate = useNavigate()

  return (
    <footer className="bg-darkText text-white mt-16">
      {/* Main footer body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="lg:col-span-1">
            <NavLink to="/" className="flex items-center gap-2.5 mb-4 group">
              {logo
                ? <img src={logo} alt="Studiora" className="w-9 h-9 rounded-xl shadow-soft group-hover:shadow-glow transition-shadow duration-300" />
                : <div className="w-9 h-9 rounded-xl bg-aurora flex items-center justify-center text-white font-bold text-lg font-poppins">S</div>
              }
              <span className="text-xl font-bold font-poppins">
                Studi<span style={{ background: 'linear-gradient(135deg,#5D8BF4,#C4B5FD)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>ora</span>
              </span>
            </NavLink>
            <p className="text-slate-400 font-inter text-sm leading-relaxed mb-5">
              The all-in-one study companion for university students. Organize, focus, and excel.
            </p>
            {/* Socials */}
            <div className="flex gap-3">
              {social.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-xl bg-white/5 hover:bg-primary/20 border border-white/10 hover:border-primary/40 flex items-center justify-center text-slate-400 hover:text-primary transition-all duration-200"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-xs font-semibold font-inter text-slate-500 uppercase tracking-widest mb-4">Navigation</p>
            <ul className="space-y-3">
              {navLinks.map(link => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      `flex items-center gap-2 text-sm font-inter transition-colors duration-200 ${isActive ? 'text-primary' : 'text-slate-400 hover:text-white'}`
                    }
                  >
                    <span className="text-base opacity-70">{link.icon}</span>
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <p className="text-xs font-semibold font-inter text-slate-500 uppercase tracking-widest mb-4">Resources</p>
            <ul className="space-y-3">
              {resources.map(r => (
                <li key={r.label}>
                  <a href={r.href} className="text-sm font-inter text-slate-400 hover:text-white transition-colors duration-200">
                    {r.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Stats / Tagline card */}
          <div>
            <p className="text-xs font-semibold font-inter text-slate-500 uppercase tracking-widest mb-4">By the Numbers</p>
            <div className="space-y-3">
              {[
                { value: '10K+',  label: 'Active Students' },
                { value: '500K+', label: 'Tasks Completed' },
                { value: '4.9★',  label: 'Average Rating'  },
              ].map(stat => (
                <div key={stat.label} className="flex items-center justify-between py-2 border-b border-white/5">
                  <span className="text-sm font-inter text-slate-400">{stat.label}</span>
                  <span className="text-sm font-bold font-poppins"
                    style={{ background: 'linear-gradient(135deg,#5D8BF4,#C4B5FD)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-slate-500 font-inter text-xs">© 2026 Studiora. All rights reserved.</p>
          <p className="text-slate-600 font-inter text-xs tracking-wider">Organize · Focus · Excel</p>
          <div className="flex gap-5">
            {['Privacy', 'Terms', 'Contact'].map(item => (
              <a key={item} href="#" className="text-slate-500 hover:text-slate-300 font-inter text-xs transition-colors duration-200">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}