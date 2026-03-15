// src/data/seedData.js
// ─────────────────────────────────────────────────────────────────────────────
// Studiora — Realistic Dummy Data + Auto-Seeder
// Run seedAllData() once on app init (checks a flag to avoid re-seeding).
// Compatible with your existing useStudyData.js storage schema.
// ─────────────────────────────────────────────────────────────────────────────

// ── Helpers ──────────────────────────────────────────────────────────────────

/** Returns ISO date string offset from today by `n` days */
function daysFromNow(n) {
  const d = new Date()
  d.setDate(d.getDate() + n)
  return d.toISOString().split('T')[0]
}

/** Returns ISO date string for a given Mon-offset (0=Mon … 6=Sun) this week */
function thisWeekDate(mondayOffset) {
  const today  = new Date()
  const dow    = today.getDay()
  const monday = new Date(today)
  monday.setDate(today.getDate() - (dow === 0 ? 6 : dow - 1))
  const target = new Date(monday)
  target.setDate(monday.getDate() + mondayOffset)
  return target.toISOString().split('T')[0]
}

// ── 1. TASKS (Kanban) ─────────────────────────────────────────────────────────
export const tasks = [
  // ── To Do ──────────────────────────────────────────────────────────────────
  {
    id: 101,
    title: 'Implement Binary Search Tree',
    description: 'Code insert, delete, and traversal methods in Python. Add unit tests for edge cases.',
    subject: 'Programming',
    priority: 'High',
    status: 'To Do',
    deadline: daysFromNow(3),
  },
  {
    id: 102,
    title: 'Research Paper Outline — Climate Policy',
    description: 'Draft a 500-word outline covering intro, three main arguments, and conclusion structure.',
    subject: 'Political Science',
    priority: 'High',
    status: 'To Do',
    deadline: daysFromNow(4),
  },
  {
    id: 103,
    title: 'Problem Set 5: Linear Algebra',
    description: 'Eigenvalues, eigenvectors, and diagonalisation. Problems 1–12 from Chapter 6.',
    subject: 'Mathematics',
    priority: 'High',
    status: 'To Do',
    deadline: daysFromNow(2),
  },
  {
    id: 104,
    title: 'UI Wireframes for Group Project',
    description: 'Create low-fidelity wireframes for the mobile app screens. Use Figma. Minimum 6 screens.',
    subject: 'Design',
    priority: 'Medium',
    status: 'To Do',
    deadline: daysFromNow(5),
  },
  {
    id: 105,
    title: 'Read: "The Innovators" Chapters 8–11',
    description: 'Focus on the emergence of software as an industry. Take notes on key figures.',
    subject: 'History of Technology',
    priority: 'Low',
    status: 'To Do',
    deadline: daysFromNow(7),
  },
  {
    id: 106,
    title: 'Revise Organic Chemistry: Reactions',
    description: 'Cover substitution, elimination, and addition reactions. Flashcards for mechanisms.',
    subject: 'Chemistry',
    priority: 'High',
    status: 'To Do',
    deadline: daysFromNow(1),
  },

  // ── In Progress ─────────────────────────────────────────────────────────────
  {
    id: 201,
    title: 'REST API Integration — Weather App',
    description: 'Connect frontend to OpenWeatherMap API. Handle loading states and error responses.',
    subject: 'Programming',
    priority: 'High',
    status: 'In Progress',
    deadline: daysFromNow(2),
  },
  {
    id: 202,
    title: 'Statistics Assignment: Hypothesis Testing',
    description: 'Complete t-test and chi-square problems. Show all working. Submit as PDF.',
    subject: 'Statistics',
    priority: 'Medium',
    status: 'In Progress',
    deadline: daysFromNow(3),
  },
  {
    id: 203,
    title: 'Literature Review: Machine Learning in Healthcare',
    description: 'Synthesise at least 8 peer-reviewed papers. Identify research gaps for the intro section.',
    subject: 'Research',
    priority: 'High',
    status: 'In Progress',
    deadline: daysFromNow(6),
  },
  {
    id: 204,
    title: 'Group Project: Backend API Endpoints',
    description: 'Build /users, /products, /orders routes in Express. Coordinate with Aisha on auth.',
    subject: 'Group Project',
    priority: 'High',
    status: 'In Progress',
    deadline: daysFromNow(4),
  },
  {
    id: 205,
    title: 'Essay: Postcolonialism in Contemporary Fiction',
    description: 'Draft body paragraphs 2 and 3. Focus on Chimamanda Adichie\'s narrative techniques.',
    subject: 'English Literature',
    priority: 'Medium',
    status: 'In Progress',
    deadline: daysFromNow(5),
  },

  // ── Done ────────────────────────────────────────────────────────────────────
  {
    id: 301,
    title: 'Calculus Problem Set 4',
    description: 'Integration by parts and partial fractions. All 15 problems completed and checked.',
    subject: 'Mathematics',
    priority: 'High',
    status: 'Done',
    deadline: daysFromNow(-1),
  },
  {
    id: 302,
    title: 'Set Up Dev Environment',
    description: 'Installed Node 20, configured ESLint + Prettier, set up Git hooks with Husky.',
    subject: 'Programming',
    priority: 'Medium',
    status: 'Done',
    deadline: daysFromNow(-3),
  },
  {
    id: 303,
    title: 'Read: Hobbes "Leviathan" Part I',
    description: 'Annotated chapters 13–15 on the state of nature. Wrote 300-word response.',
    subject: 'Philosophy',
    priority: 'Medium',
    status: 'Done',
    deadline: daysFromNow(-2),
  },
  {
    id: 304,
    title: 'Lab Report: Titration Experiment',
    description: 'Wrote up results, error analysis, and conclusion. Submitted via portal.',
    subject: 'Chemistry',
    priority: 'High',
    status: 'Done',
    deadline: daysFromNow(-4),
  },
  {
    id: 305,
    title: 'Weekly Reading: Microeconomics Ch. 9–10',
    description: 'Game theory and oligopoly models. Summarised key concepts in notebook.',
    subject: 'Economics',
    priority: 'Low',
    status: 'Done',
    deadline: daysFromNow(-2),
  },
  {
    id: 306,
    title: 'Prepare Presentation Slides: Data Structures',
    description: '12-slide deck covering stacks, queues, and linked lists. Presented in tutorial.',
    subject: 'Programming',
    priority: 'Medium',
    status: 'Done',
    deadline: daysFromNow(-5),
  },
  {
    id: 307,
    title: 'Group Meeting Notes — Marketing Project',
    description: 'Documented decisions: brand strategy, target demographic (18–25), launch timeline.',
    subject: 'Group Project',
    priority: 'Low',
    status: 'Done',
    deadline: daysFromNow(-3),
  },
  {
    id: 308,
    title: 'Flashcard Set: Neuroscience Terminology',
    description: '48 cards covering synaptic transmission, neurotransmitters, and brain regions.',
    subject: 'Neuroscience',
    priority: 'Medium',
    status: 'Done',
    deadline: daysFromNow(-6),
  },
]

// ── 2. CALENDAR EVENTS ────────────────────────────────────────────────────────
export const calendarEvents = [
  // Study sessions
  {
    id: 'evt-001',
    title: 'Linear Algebra — Revision Block',
    type: 'study',
    subject: 'Mathematics',
    date: thisWeekDate(0),   // Monday
    startTime: '09:00',
    duration: 120,
    location: 'Library, Floor 3',
    notes: 'Focus on Chapter 6 eigenvalue problems before the assignment due date.',
  },
  {
    id: 'evt-002',
    title: 'Programming Lab Session',
    type: 'study',
    subject: 'Programming',
    date: thisWeekDate(0),
    startTime: '14:00',
    duration: 90,
    location: 'CS Building, Lab 2B',
    notes: 'Finish BST implementation. Bring laptop charger.',
  },
  {
    id: 'evt-003',
    title: 'Research Deep-Dive: ML Healthcare Papers',
    type: 'study',
    subject: 'Research',
    date: thisWeekDate(1),   // Tuesday
    startTime: '10:00',
    duration: 150,
    location: 'Home desk',
    notes: 'Target: read and annotate 3 papers minimum.',
  },
  {
    id: 'evt-004',
    title: 'Chemistry Exam Prep',
    type: 'study',
    subject: 'Chemistry',
    date: thisWeekDate(1),
    startTime: '19:00',
    duration: 90,
    location: 'Home',
    notes: 'Organic reactions — mechanism flashcards + past paper Q3.',
  },

  // Deadlines / Assignments
  {
    id: 'evt-005',
    title: 'Statistics Assignment Due',
    type: 'deadline',
    subject: 'Statistics',
    date: daysFromNow(3),
    startTime: '23:59',
    duration: 0,
    location: 'Online Portal',
    notes: 'Submit PDF. Double-check chi-square working.',
  },
  {
    id: 'evt-006',
    title: 'Linear Algebra Problem Set 5 Due',
    type: 'deadline',
    subject: 'Mathematics',
    date: daysFromNow(2),
    startTime: '17:00',
    duration: 0,
    location: 'Department Drop Box',
    notes: 'Hardcopy submission only — print before 4pm.',
  },
  {
    id: 'evt-007',
    title: 'Research Paper Draft Due',
    type: 'deadline',
    subject: 'Political Science',
    date: daysFromNow(4),
    startTime: '23:59',
    duration: 0,
    location: 'Turnitin',
    notes: 'Outline already done. Need intro + arg 1 completed.',
  },

  // Group meetings
  {
    id: 'evt-008',
    title: 'Group Project Sprint Sync',
    type: 'meeting',
    subject: 'Group Project',
    date: thisWeekDate(2),   // Wednesday
    startTime: '13:00',
    duration: 60,
    location: 'Zoom — link in group chat',
    notes: 'Review API progress, assign frontend tasks for next sprint.',
  },
  {
    id: 'evt-009',
    title: 'Study Group: Statistics',
    type: 'meeting',
    subject: 'Statistics',
    date: thisWeekDate(3),   // Thursday
    startTime: '15:00',
    duration: 90,
    location: 'Campus Café',
    notes: 'Work through hypothesis testing problems together with Lena and Dan.',
  },
  {
    id: 'evt-010',
    title: 'Design Critique Session',
    type: 'meeting',
    subject: 'Design',
    date: thisWeekDate(4),   // Friday
    startTime: '11:00',
    duration: 45,
    location: 'Arts Building, Room 14',
    notes: 'Bring printed wireframes. Prepare to justify UX decisions.',
  },

  // Exams
  {
    id: 'evt-011',
    title: 'Organic Chemistry Mid-Term',
    type: 'exam',
    subject: 'Chemistry',
    date: daysFromNow(8),
    startTime: '09:30',
    duration: 120,
    location: 'Exam Hall B',
    notes: 'Covers chapters 7–11. No notes permitted. Bring student ID.',
  },
  {
    id: 'evt-012',
    title: 'Programming Practical Exam',
    type: 'exam',
    subject: 'Programming',
    date: daysFromNow(12),
    startTime: '14:00',
    duration: 90,
    location: 'CS Lab 1A',
    notes: 'Live coding on Python. Past practicals available on Moodle.',
  },

  // Revision blocks
  {
    id: 'evt-013',
    title: 'Pomodoro Sprint: Essay Draft',
    type: 'study',
    subject: 'English Literature',
    date: thisWeekDate(2),
    startTime: '09:00',
    duration: 100,
    location: 'Home',
    notes: '4× 25-min sessions. Target: 600 words on postcolonialism argument.',
  },
  {
    id: 'evt-014',
    title: 'Economics — Flashcard Review',
    type: 'study',
    subject: 'Economics',
    date: thisWeekDate(5),   // Saturday
    startTime: '10:30',
    duration: 60,
    location: 'Home',
    notes: 'Game theory models. Use Anki deck from last semester.',
  },
  {
    id: 'evt-015',
    title: 'Weekend Catch-Up Block',
    type: 'study',
    subject: 'General',
    date: thisWeekDate(6),   // Sunday
    startTime: '14:00',
    duration: 180,
    location: 'Library',
    notes: 'Clear any leftover tasks from the week. Plan next week.',
  },
]

// ── 3. FOCUS TIMER HISTORY ────────────────────────────────────────────────────
export const focusHistory = [
  // Today
  {
    id: 'f-001',
    date: daysFromNow(0),
    startTime: '08:30',
    duration: 25,
    subject: 'Mathematics',
    task: 'Eigenvalue problem practice',
    completed: true,
    mood: 'focused',
  },
  {
    id: 'f-002',
    date: daysFromNow(0),
    startTime: '09:00',
    duration: 25,
    subject: 'Mathematics',
    task: 'Eigenvalue problem practice',
    completed: true,
    mood: 'focused',
  },
  {
    id: 'f-003',
    date: daysFromNow(0),
    startTime: '09:35',
    duration: 25,
    subject: 'Programming',
    task: 'BST insert method',
    completed: false,  // interrupted
    mood: 'distracted',
    interruptedAt: 17,  // minutes into session
  },

  // Yesterday
  {
    id: 'f-004',
    date: daysFromNow(-1),
    startTime: '10:00',
    duration: 45,
    subject: 'Research',
    task: 'Reading ML healthcare papers',
    completed: true,
    mood: 'deep-work',
  },
  {
    id: 'f-005',
    date: daysFromNow(-1),
    startTime: '11:00',
    duration: 45,
    subject: 'Research',
    task: 'Annotating papers + notes',
    completed: true,
    mood: 'deep-work',
  },
  {
    id: 'f-006',
    date: daysFromNow(-1),
    startTime: '14:00',
    duration: 25,
    subject: 'Chemistry',
    task: 'Organic reactions flashcards',
    completed: true,
    mood: 'focused',
  },
  {
    id: 'f-007',
    date: daysFromNow(-1),
    startTime: '14:30',
    duration: 25,
    subject: 'Chemistry',
    task: 'Organic reactions flashcards',
    completed: true,
    mood: 'focused',
  },
  {
    id: 'f-008',
    date: daysFromNow(-1),
    startTime: '19:30',
    duration: 60,
    subject: 'English Literature',
    task: 'Essay body paragraphs draft',
    completed: true,
    mood: 'creative',
  },

  // 2 days ago
  {
    id: 'f-009',
    date: daysFromNow(-2),
    startTime: '09:00',
    duration: 25,
    subject: 'Statistics',
    task: 'T-test problems',
    completed: true,
    mood: 'focused',
  },
  {
    id: 'f-010',
    date: daysFromNow(-2),
    startTime: '09:30',
    duration: 25,
    subject: 'Statistics',
    task: 'Chi-square problems',
    completed: true,
    mood: 'focused',
  },
  {
    id: 'f-011',
    date: daysFromNow(-2),
    startTime: '10:05',
    duration: 25,
    subject: 'Statistics',
    task: 'Chi-square problems',
    completed: false,
    mood: 'tired',
    interruptedAt: 9,
  },
  {
    id: 'f-012',
    date: daysFromNow(-2),
    startTime: '15:00',
    duration: 60,
    subject: 'Programming',
    task: 'API integration — weather app',
    completed: true,
    mood: 'deep-work',
  },

  // 3 days ago
  {
    id: 'f-013',
    date: daysFromNow(-3),
    startTime: '08:00',
    duration: 45,
    subject: 'Mathematics',
    task: 'Linear algebra revision',
    completed: true,
    mood: 'focused',
  },
  {
    id: 'f-014',
    date: daysFromNow(-3),
    startTime: '09:00',
    duration: 45,
    subject: 'Mathematics',
    task: 'Practice exam questions',
    completed: true,
    mood: 'focused',
  },
  {
    id: 'f-015',
    date: daysFromNow(-3),
    startTime: '10:00',
    duration: 45,
    subject: 'Mathematics',
    task: 'Practice exam questions',
    completed: true,
    mood: 'deep-work',
  },
  {
    id: 'f-016',
    date: daysFromNow(-3),
    startTime: '14:30',
    duration: 25,
    subject: 'Writing',
    task: 'Research paper outline',
    completed: true,
    mood: 'focused',
  },
  {
    id: 'f-017',
    date: daysFromNow(-3),
    startTime: '15:00',
    duration: 25,
    subject: 'Writing',
    task: 'Research paper intro paragraph',
    completed: false,
    mood: 'distracted',
    interruptedAt: 21,
  },
]

// ── 4. NOTES ──────────────────────────────────────────────────────────────────
export const notes = [
  {
    id: 'n-001',
    title: 'Linear Algebra — Eigenvalues Cheat Sheet',
    subject: 'Mathematics',
    content: `<p><strong>Finding eigenvalues:</strong> Solve det(A − λI) = 0 (characteristic equation).</p>
<p><strong>Finding eigenvectors:</strong> For each λ, solve (A − λI)v = 0.</p>
<p><strong>Diagonalisation:</strong> A = PDP⁻¹ where D is diagonal matrix of eigenvalues, P is matrix of eigenvectors. Only possible if A has n linearly independent eigenvectors.</p>
<p><strong>Key insight:</strong> Repeated eigenvalues don't always mean non-diagonalisable — check the eigenspace dimension.</p>
<p>Common exam mistake: forgetting to check if the matrix is actually diagonalisable before attempting P.</p>`,
    tags: ['mathematics', 'exam-prep', 'linear-algebra'],
    highlighted: true,
    checklist: [
      { text: 'Practice 5 eigenvalue problems', done: true },
      { text: 'Memorise characteristic equation steps', done: true },
      { text: 'Do past paper Q4 (diagonalisation)', done: false },
    ],
    createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 'n-002',
    title: 'REST API Design — Key Principles',
    subject: 'Programming',
    content: `<p><strong>Statelessness:</strong> Every request must contain all info needed to process it. No server-side session state.</p>
<p><strong>Uniform interface:</strong> Use standard HTTP methods — GET (read), POST (create), PUT/PATCH (update), DELETE.</p>
<p><strong>Status codes that trip people up:</strong></p>
<ul>
  <li>201 Created — use after POST that creates a resource</li>
  <li>204 No Content — use after DELETE</li>
  <li>422 Unprocessable Entity — validation errors (not 400)</li>
  <li>409 Conflict — duplicate resource</li>
</ul>
<p><strong>Personal rule:</strong> Always version your API (v1/users, not /users). You'll thank yourself in 6 months.</p>`,
    tags: ['programming', 'api', 'backend', 'reference'],
    highlighted: false,
    checklist: [],
    createdAt: new Date(Date.now() - 4 * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 4 * 86400000).toISOString(),
  },
  {
    id: 'n-003',
    title: 'Postcolonialism Essay — Argument Map',
    subject: 'English Literature',
    content: `<p><strong>Thesis:</strong> Adichie uses narrative fragmentation to mirror the fractured identities of postcolonial subjects, resisting the Western impulse to unify "African" experience.</p>
<p><strong>Argument 1:</strong> Multiple narrators in <em>Half of a Yellow Sun</em> refuse a single authoritative voice — connects to Bhabha's concept of hybridity.</p>
<p><strong>Argument 2:</strong> Language choice (English as the coloniser's tongue) is itself political — characters who code-switch signal resistance.</p>
<p><strong>Argument 3:</strong> Silence and omission as narrative tools — what is NOT said about the war reflects trauma theory (Caruth).</p>
<p><em>Counter-argument to address:</em> Is framing Adichie purely through Western theory itself a form of epistemic colonialism?</p>`,
    tags: ['essay', 'english-lit', 'postcolonialism', 'adichie'],
    highlighted: true,
    checklist: [
      { text: 'Write argument 1 paragraph', done: true },
      { text: 'Write argument 2 paragraph', done: false },
      { text: 'Write argument 3 paragraph', done: false },
      { text: 'Address counter-argument in conclusion', done: false },
    ],
    createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 'n-004',
    title: 'Organic Chemistry — Reaction Mechanisms',
    subject: 'Chemistry',
    content: `<p><strong>SN2 (Bimolecular Nucleophilic Substitution):</strong> One step, inversion of configuration (Walden inversion). Favoured by primary substrates, strong nucleophiles, polar aprotic solvents.</p>
<p><strong>SN1 (Unimolecular):</strong> Two steps, carbocation intermediate, racemisation. Favoured by tertiary substrates, weak nucleophiles, polar protic solvents.</p>
<p><strong>E2 vs E1:</strong> E2 is concerted, requires anti-periplanar geometry. E1 goes via carbocation, less stereospecific.</p>
<p><strong>Memory trick:</strong> "SN2 = backside attack, SN1 = front AND back" — racemisation means 50/50 mixture of enantiomers.</p>
<p>Exam tip: always draw the mechanism arrows clearly. Marks are given for arrow-pushing, not just the product.</p>`,
    tags: ['chemistry', 'organic', 'mechanisms', 'exam'],
    highlighted: false,
    checklist: [
      { text: 'Drill SN1 vs SN2 decision chart', done: true },
      { text: 'Practice 10 mechanism problems', done: false },
    ],
    createdAt: new Date(Date.now() - 5 * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 86400000).toISOString(),
  },
  {
    id: 'n-005',
    title: 'Group Project — Sprint 2 Meeting Notes',
    subject: 'Group Project',
    content: `<p><strong>Date:</strong> ${new Date(Date.now() - 86400000).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
<p><strong>Attendees:</strong> Me, Aisha, Daniel, Priya</p>
<p><strong>Decisions made:</strong></p>
<ul>
  <li>Using PostgreSQL not MongoDB — Aisha prefers relational for user data</li>
  <li>Authentication via JWT, refresh token rotation on every request</li>
  <li>MVP deadline: 10 days from now. Features to cut: notifications, dark mode</li>
  <li>Daniel owns frontend, I own API, Priya handles deployment (Railway)</li>
</ul>
<p><strong>Blockers:</strong> Need API keys approved by lecturer before Thursday. Aisha to send email.</p>
<p><strong>Next meeting:</strong> Friday 13:00 on Zoom. Everyone reviews each other's PRs before then.</p>`,
    tags: ['group-project', 'meeting-notes', 'sprint'],
    highlighted: false,
    checklist: [
      { text: 'Set up PostgreSQL schema', done: true },
      { text: 'Build /auth endpoints', done: true },
      { text: 'Build /products endpoints', done: false },
      { text: 'Review Aisha\'s PR', done: false },
    ],
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 'n-006',
    title: 'Quick Reminder — Exam Logistics',
    subject: 'Admin',
    content: `<p>Things I always forget to check before exams:</p>
<ul>
  <li>Student ID in wallet — not just phone</li>
  <li>Arrive 20 min early (exam hall fills up fast)</li>
  <li>Bring TWO pens + pencil for diagrams</li>
  <li>Check if calculator is permitted (Chem exam — YES, Maths — NO)</li>
  <li>Drink water before, not during (wastes time walking out)</li>
</ul>
<p>Organic Chemistry mid-term: Hall B, 09:30. Bus leaves at 08:50 to be safe.</p>`,
    tags: ['reminder', 'exam', 'logistics'],
    highlighted: false,
    checklist: [
      { text: 'Check student ID is in wallet', done: true },
      { text: 'Print exam timetable confirmation', done: false },
    ],
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'n-007',
    title: 'Research Idea — Federated Learning & Privacy',
    subject: 'Research',
    content: `<p>Potential dissertation angle: <em>Can federated learning adequately address data privacy concerns in clinical AI without sacrificing model performance?</em></p>
<p><strong>Why interesting:</strong> GDPR makes centralising patient data illegal in many EU contexts. FL trains locally, shares only gradients. But gradient inversion attacks show it's not perfectly private.</p>
<p><strong>Key papers to find:</strong></p>
<ul>
  <li>McMahan et al. (2017) — original FedAvg paper</li>
  <li>Carlini et al. on gradient leakage</li>
  <li>Any 2023–2024 work on differential privacy + FL</li>
</ul>
<p>Might be too niche for undergrad dissertation — talk to Dr. Osei about scope.</p>`,
    tags: ['research', 'dissertation-ideas', 'machine-learning', 'privacy'],
    highlighted: true,
    checklist: [
      { text: 'Find McMahan 2017 paper', done: true },
      { text: 'Talk to Dr. Osei about feasibility', done: false },
    ],
    createdAt: new Date(Date.now() - 6 * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 6 * 86400000).toISOString(),
  },
  {
    id: 'n-008',
    title: 'Statistics Lecture — Hypothesis Testing Summary',
    subject: 'Statistics',
    content: `<p><strong>The framework (always the same 5 steps):</strong></p>
<ol>
  <li>State H₀ and H₁ clearly</li>
  <li>Choose significance level α (usually 0.05)</li>
  <li>Compute test statistic</li>
  <li>Find p-value or critical value</li>
  <li>Reject or fail to reject H₀ — NEVER "accept H₀"</li>
</ol>
<p><strong>T-test vs Z-test:</strong> Use t when sample size is small (n &lt; 30) OR population σ is unknown (which is almost always). Use Z for large samples with known σ.</p>
<p><strong>Type I error:</strong> Rejecting a true H₀ (false positive) — probability = α.</p>
<p><strong>Type II error:</strong> Failing to reject a false H₀ (false negative) — probability = β.</p>
<p>Lecturer tip: "In real research, nobody really uses α = 0.05 anymore. But in exams, they do."</p>`,
    tags: ['statistics', 'lecture-notes', 'hypothesis-testing'],
    highlighted: false,
    checklist: [],
    createdAt: new Date(Date.now() - 7 * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 7 * 86400000).toISOString(),
  },
]

// ── 5. DASHBOARD DATA ─────────────────────────────────────────────────────────
export const dashboardData = {
  greeting: 'Good morning',
  weeklyStats: {
    totalStudyHours: 18.5,
    tasksCompleted:  8,
    currentStreak:   6,          // days
    focusSessions:   14,
    productivityScore: 78,       // out of 100
  },
  upcomingDeadlines: [
    { title: 'Linear Algebra Problem Set 5', subject: 'Mathematics',   daysLeft: 2, priority: 'High'   },
    { title: 'Statistics Assignment',        subject: 'Statistics',    daysLeft: 3, priority: 'Medium' },
    { title: 'Research Paper Draft',         subject: 'Pol. Science',  daysLeft: 4, priority: 'High'   },
    { title: 'UI Wireframes',                subject: 'Design',        daysLeft: 5, priority: 'Medium' },
  ],
  // Daily study hours this week (Mon–Sun) — used by line chart
  weeklyStudyHours: [2.5, 3.5, 1.0, 4.0, 3.5, 2.5, 1.5],
  // Daily sessions this week — used by bar chart
  weeklyFocusSessions: [2, 3, 1, 4, 2, 2, 0],
  // Task completions per day
  weeklyTaskCompletions: [1, 2, 0, 2, 2, 1, 0],
}

// ── 6. ANALYTICS DATA ─────────────────────────────────────────────────────────
export const analyticsData = {
  // Study time by subject (hours this month)
  subjectBreakdown: [
    { subject: 'Mathematics',       hours: 14.5, color: '#5D8BF4' },
    { subject: 'Programming',       hours: 12.0, color: '#C4B5FD' },
    { subject: 'Research',          hours: 9.5,  color: '#34D399' },
    { subject: 'Chemistry',         hours: 8.0,  color: '#F87171' },
    { subject: 'English Lit',       hours: 6.5,  color: '#FDBA74' },
    { subject: 'Statistics',        hours: 5.5,  color: '#818CF8' },
    { subject: 'Economics',         hours: 3.0,  color: '#6EE7B7' },
    { subject: 'Other',             hours: 2.5,  color: '#CBD5E1' },
  ],
  // Weekly productivity trend (last 8 weeks, 0–100)
  weeklyProductivityTrend: [
    { week: 'Week 1', score: 58 },
    { week: 'Week 2', score: 62 },
    { week: 'Week 3', score: 55 },   // low — had a cold
    { week: 'Week 4', score: 71 },
    { week: 'Week 5', score: 74 },
    { week: 'Week 6', score: 68 },   // group project stress
    { week: 'Week 7', score: 80 },
    { week: 'Week 8', score: 78 },   // current week
  ],
  focusStats: {
    totalSessions:     47,
    completedSessions: 39,
    interruptedSessions: 8,
    completionRate:    83,    // percent
    averageSessionLength: 34, // minutes
    totalFocusHours:   26.8,
  },
  mostProductiveDay: {
    day:         'Thursday',
    avgHours:    4.1,
    avgSessions: 3.8,
  },
  leastProductiveDay: {
    day:         'Wednesday',
    avgHours:    1.2,
    avgSessions: 1.0,
  },
  // Focus session length distribution
  sessionLengthDistribution: [
    { label: '25 min',  count: 28 },
    { label: '45 min',  count: 13 },
    { label: '60 min',  count:  6 },
  ],
  streakHistory: {
    currentStreak: 6,
    longestStreak: 11,
    totalDaysStudied: 34,
  },
}

// ── 7. SEEDER — writes data into localStorage ─────────────────────────────────
// Compatible with your useStudyData.js HOURS_KEY + SESSIONS_KEY schema.

export function seedAllData(force = false) {
  const SEED_FLAG = 'studiora_seeded_v1'
  if (!force && localStorage.getItem(SEED_FLAG)) return  // already seeded

  // ── Seed tasks ──────────────────────────────────────────────────────────────
  if (!localStorage.getItem('studiora_tasks')) {
    localStorage.setItem('studiora_tasks', JSON.stringify(tasks))
  }

  // ── Seed notes ──────────────────────────────────────────────────────────────
  if (!localStorage.getItem('studiora_notes')) {
    localStorage.setItem('studiora_notes', JSON.stringify(notes))
  }

  // ── Seed weekly study hours (useStudyData.js HOURS_KEY schema) ──────────────
  // studiora_study_hours: { "YYYY-MM-DD": hoursFloat }
  const existingHours = JSON.parse(localStorage.getItem('studiora_study_hours') || '{}')
  const hoursMap = { ...existingHours }
  dashboardData.weeklyStudyHours.forEach((h, i) => {
    const key = thisWeekDate(i)
    if (!hoursMap[key]) hoursMap[key] = h   // don't overwrite real data
  })
  localStorage.setItem('studiora_study_hours', JSON.stringify(hoursMap))

  // ── Seed weekly focus sessions (useStudyData.js SESSIONS_KEY schema) ────────
  // studiora_daily_sessions: { "YYYY-MM-DD": count }
  const existingSessions = JSON.parse(localStorage.getItem('studiora_daily_sessions') || '{}')
  const sessionsMap = { ...existingSessions }
  dashboardData.weeklyFocusSessions.forEach((s, i) => {
    const key = thisWeekDate(i)
    if (!sessionsMap[key]) sessionsMap[key] = s
  })
  localStorage.setItem('studiora_daily_sessions', JSON.stringify(sessionsMap))

  // ── Seed streak + session counters ──────────────────────────────────────────
  if (!localStorage.getItem('studiora_streak')) {
    localStorage.setItem('studiora_streak', String(analyticsData.streakHistory.currentStreak))
  }
  if (!localStorage.getItem('studiora_sessions')) {
    localStorage.setItem('studiora_sessions', String(analyticsData.focusStats.totalSessions))
  }
  if (!localStorage.getItem('studiora_focus_minutes')) {
    const totalMins = Math.round(analyticsData.focusStats.totalFocusHours * 60)
    localStorage.setItem('studiora_focus_minutes', String(totalMins))
  }

  // ── Mark as seeded ───────────────────────────────────────────────────────────
  localStorage.setItem(SEED_FLAG, 'true')
  console.info('[Studiora] Demo data seeded successfully.')
}

// ── 8. SEED RESET (for dev / judging demos) ───────────────────────────────────
// Call resetAndReseed() from browser console to restore demo state.
export function resetAndReseed() {
  const keys = [
    'studiora_tasks', 'studiora_notes',
    'studiora_study_hours', 'studiora_daily_sessions',
    'studiora_streak', 'studiora_sessions',
    'studiora_focus_minutes', 'studiora_seeded_v1',
  ]
  keys.forEach(k => localStorage.removeItem(k))
  seedAllData(true)
  console.info('[Studiora] All data reset and reseeded.')
}