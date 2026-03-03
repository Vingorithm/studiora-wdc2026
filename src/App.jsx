import { Routes, Route, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Tasks from './pages/Tasks'
import Notes from './pages/Notes'
import Focus from './pages/Focus'

export default function App() {
  const location = useLocation()
  const isHome = location.pathname === '/'
  const isFocus = location.pathname === '/focus'

  return (
    <div className="min-h-screen bg-background font-inter">
      {!isFocus && <Navbar />}
      <div className={!isHome && !isFocus ? 'flex' : ''}>
        <main className={!isHome && !isFocus ? 'flex-1 min-h-screen' : ''}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/focus" element={<Focus />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}