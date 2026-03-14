import { Routes, Route, useLocation } from 'react-router-dom'
<<<<<<< HEAD
import Navbar        from './components/Navbar'
import Footer        from './components/Footer'
import ErrorBoundary from './components/ErrorBoundary'
import PageTransition from './components/PageTransition'
import Home          from './pages/Home'
import Dashboard     from './pages/Dashboard'
import Tasks         from './pages/Tasks'
import Notes         from './pages/Notes'
import Focus         from './pages/Focus'
import NewNote       from './pages/NewNote'
import NotFound      from './pages/NotFound'

export default function App() {
  const location   = useLocation()
  const isHome     = location.pathname === '/'
  const isFocus    = location.pathname === '/focus'
  const isNotFound = !['/', '/dashboard', '/tasks', '/notes', '/focus', '/new-note'].includes(location.pathname)

  const showNavbar = !isFocus && !isNotFound
  const showFooter = !isFocus && !isNotFound

  return (
    <div className={`font-inter flex flex-col ${isNotFound ? '' : 'min-h-screen bg-background'}`}>
      {showNavbar && <Navbar />}

      <div className={`${isNotFound ? '' : 'flex-1'} ${!isHome && !isFocus && !isNotFound ? 'flex flex-col' : ''}`}>
        <main className={`${!isHome && !isFocus && !isNotFound ? 'flex-1' : 'w-full'}`}>
          <ErrorBoundary>
            <PageTransition>
              <Routes location={location}>
                <Route path="/"          element={<Home />}      />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/tasks"     element={<Tasks />}     />
                <Route path="/notes"     element={<Notes />}     />
                <Route path="/focus"     element={<Focus />}     />
                <Route path="/new-note"  element={<NewNote />}   />
                <Route path="*"          element={<NotFound />}  />
              </Routes>
            </PageTransition>
          </ErrorBoundary>
        </main>
      </div>

      {showFooter && <Footer />}
=======
import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Tasks from './pages/Tasks'
import Notes from './pages/Notes'
import Focus from './pages/Focus'
import NewNote from './pages/NewNote'

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
            <Route path="/new-note" element={<NewNote />} />
          </Routes>
        </main>
      </div>
>>>>>>> 15eb2b3c6908e7c695a5487d330defb113f86b40
    </div>
  )
}