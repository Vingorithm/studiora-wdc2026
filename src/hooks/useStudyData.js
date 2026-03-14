const HOURS_KEY    = 'studiora_study_hours'
const SESSIONS_KEY = 'studiora_daily_sessions'

function todayKey() {
  return new Date().toISOString().split('T')[0]
}

/** Returns the ISO date string for a given Mon-indexed offset (0=Mon, 6=Sun) */
function getWeekDateKey(mondayOffsetIndex) {
  const today    = new Date()
  const dow      = today.getDay()                    // 0=Sun,1=Mon,...
  const monday   = new Date(today)
  monday.setDate(today.getDate() - (dow === 0 ? 6 : dow - 1))
  const target   = new Date(monday)
  target.setDate(monday.getDate() + mondayOffsetIndex)
  return target.toISOString().split('T')[0]
}

function loadMap(key) {
  try { return JSON.parse(localStorage.getItem(key) || '{}') } catch { return {} }
}

function saveMap(key, map) {
  localStorage.setItem(key, JSON.stringify(map))
}

export function getWeekHours() {
  const map = loadMap(HOURS_KEY)
  return Array.from({ length: 7 }, (_, i) => {
    const val = map[getWeekDateKey(i)] || 0
    return Math.round(val * 10) / 10   // 1 decimal max
  })
}

export function getWeekSessions() {
  const map = loadMap(SESSIONS_KEY)
  return Array.from({ length: 7 }, (_, i) => map[getWeekDateKey(i)] || 0)
}

export function addStudyMinutes(minutes) {
  const map     = loadMap(HOURS_KEY)
  const key     = todayKey()
  const current = map[key] || 0
  map[key]      = Math.round((current + minutes / 60) * 100) / 100
  saveMap(HOURS_KEY, map)
}

export function addSessionToday() {
  const map   = loadMap(SESSIONS_KEY)
  const key   = todayKey()
  map[key]    = (map[key] || 0) + 1
  saveMap(SESSIONS_KEY, map)
}

export function getWeekTotalHours() {
  return getWeekHours().reduce((a, b) => a + b, 0)
}