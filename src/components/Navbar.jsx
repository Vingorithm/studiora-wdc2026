import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { FaTasks } from "react-icons/fa";
import { LuNotebook } from "react-icons/lu";
import { RiFocus3Line } from "react-icons/ri";

const navLinks = [
  { to: '/dashboard', label: 'Dashboard', icon: <TbLayoutDashboardFilled /> },
  { to: '/tasks', label: 'Tasks', icon: <FaTasks /> },
  { to: '/notes', label: 'Notes', icon: <LuNotebook /> },
  { to: '/focus', label: 'Focus', icon: <RiFocus3Line /> },
]


export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-xl bg-aurora flex items-center justify-center text-white font-bold text-lg font-poppins shadow-soft group-hover:shadow-glow transition-shadow duration-300">
              S
            </div>
            <span className="text-xl font-bold font-poppins text-darkText">
              Studi<span className="aurora-text">ora</span>
            </span>
          </NavLink>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1 flex-1 justify-center">
            {navLinks.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 font-inter ${isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-slate-500 hover:text-primary hover:bg-primary/5'
                  }`
                }
              >
                <span className="text-base">{link.icon}</span>
                {link.label}
              </NavLink>
            ))}
          </div>


          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-xl text-slate-500 hover:bg-slate-100 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-5 flex flex-col gap-1.5">
              <span className={`block h-0.5 bg-slate-600 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block h-0.5 bg-slate-600 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 bg-slate-600 transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 animate-slide-up">
            {navLinks.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium mb-1 transition-all font-inter ${isActive ? 'bg-primary/10 text-primary' : 'text-slate-600 hover:bg-slate-50'
                  }`
                }
              >
                <span>{link.icon}</span> {link.label}
              </NavLink>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}