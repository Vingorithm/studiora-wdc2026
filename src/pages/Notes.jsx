import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NoteViewModal from "../components/NoteViewModal";
import { IoSearchSharp } from "react-icons/io5";
import NewNoteModal from "../components/NewNoteModal";

const STORAGE_KEY = "studiora_notes";

const defaultNotes = [
  {
    id: 1,
    title: "Integration Techniques",
    subject: "Mathematics",
    content:
      "<p>Key methods: substitution, integration by parts, partial fractions.</p><p>Remember: ∫uv dx = u∫v dx – ∫(u′∫v dx)dx. Practice the LIATE rule for choosing u in integration by parts.</p>",
    tags: ["calculus", "exam"],
    highlighted: true,
    checklist: [
      { text: "Review substitution method", done: true },
      { text: "Practice integration by parts", done: false },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 2,
    title: "Hamlet Analysis – Key Themes",
    subject: "English",
    content:
      "<p>Major themes: mortality (<em>To be or not to be</em>), revenge vs. justice, corruption in the Danish court.</p>",
    tags: ["literature", "essay"],
    highlighted: false,
    checklist: [],
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 3,
    title: "Newton's Laws Summary",
    subject: "Physics",
    content:
      "<p><strong>1st Law:</strong> An object at rest stays at rest unless acted upon by a net force.</p><p><strong>2nd Law:</strong> F = ma. <strong>3rd Law:</strong> For every action there is an equal and opposite reaction.</p>",
    tags: ["mechanics", "lab"],
    highlighted: false,
    checklist: [],
    createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 86400000).toISOString(),
  },
  {
    id: 4,
    title: "Marketing Mix – 4Ps",
    subject: "Marketing",
    content:
      "<p><strong>Product, Price, Place, Promotion.</strong></p><p>For group project: focus on digital promotion strategies. Research Nike's 4Ps as case study.</p>",
    tags: ["group-project", "framework"],
    highlighted: true,
    checklist: [],
    createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 3 * 86400000).toISOString(),
  },
];

const accentPalette = [
  { bar: "from-blue-400 to-indigo-500" },
  { bar: "from-purple-400 to-fuchsia-500" },
  { bar: "from-emerald-400 to-teal-500" },
  { bar: "from-amber-400 to-orange-500" },
  { bar: "from-rose-400 to-pink-500" },
  { bar: "from-sky-400 to-cyan-500" },
];

function getAccent(subject) {
  if (!subject) return accentPalette[0];
  let hash = 0;
  for (let i = 0; i < subject.length; i++)
    hash = subject.charCodeAt(i) + ((hash << 5) - hash);
  return accentPalette[Math.abs(hash) % accentPalette.length];
}

function stripHtml(html) {
  if (!html) return "";
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
}

function NoteCard({ note, onView, onDelete }) {
  const accent = getAccent(note.subject);
  const preview = stripHtml(note.content).slice(0, 130);
  const date = new Date(note.createdAt || note.updatedAt).toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    },
  );

  return (
    <div className="group relative flex flex-col bg-white rounded-2xl shadow-card border border-slate-100 overflow-hidden transition-all duration-300 hover:shadow-soft hover:-translate-y-1">
      <div
        className={`h-1 w-full bg-gradient-to-r ${accent.bar} flex-shrink-0`}
      />
      <div className="flex flex-col flex-1 p-5">
        {note.subject && (
          <span
            className={`inline-block text-xs font-semibold font-inter px-2.5 py-1 rounded-lg mb-3 self-start text-white bg-gradient-to-r ${accent.bar}`}
          >
            {note.subject}
          </span>
        )}
        {!note.subject && <div className="mb-3" />}

        <h3 className="font-bold font-poppins text-darkText text-base leading-snug mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-200">
          {note.title || "Untitled Note"}
        </h3>

        <p className="text-sm text-slate-500 font-inter leading-relaxed line-clamp-3 flex-1 mb-4">
          {preview || (
            <span className="italic text-slate-300">No content yet.</span>
          )}
        </p>

        {note.tags && note.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {note.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-xs font-medium font-inter px-2 py-0.5 rounded-full"
                style={{
                  background: "#F5F3FF",
                  color: "#7C3AED",
                  border: "1px solid #C4B5FD44",
                }}
              >
                #{tag}
              </span>
            ))}
            {note.tags.length > 3 && (
              <span className="text-xs text-slate-400 font-inter">
                +{note.tags.length - 3}
              </span>
            )}
          </div>
        )}

        <div className="flex items-center justify-between pt-3 border-t border-slate-50">
          <span className="text-xs text-slate-400 font-inter">{date}</span>
          <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={() => onView(note)}
              className="text-xs font-semibold font-inter px-3 py-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all duration-200"
            >
              View
            </button>
            <button
              onClick={() => onDelete(note.id)}
              className="text-xs font-semibold font-inter px-2.5 py-1.5 rounded-lg text-slate-400 hover:bg-danger/10 hover:text-danger transition-all duration-200"
            >
              🗑
            </button>
          </div>
        </div>
      </div>

      {note.highlighted && (
        <div className="absolute top-3 right-3">
          <span className="text-sm" title="Highlighted">
            ✨
          </span>
        </div>
      )}
    </div>
  );
}

function EmptyState({ onNew }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center animate-fade-in">
      <div className="w-32 h-32 rounded-3xl bg-aurora-soft flex items-center justify-center shadow-soft mb-8">
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
          <rect
            x="10"
            y="8"
            width="44"
            height="48"
            rx="6"
            fill="#EEF2FF"
            stroke="#C4B5FD"
            strokeWidth="2"
          />
          <rect x="18" y="18" width="28" height="3" rx="1.5" fill="#C4B5FD" />
          <rect
            x="18"
            y="25"
            width="20"
            height="2.5"
            rx="1.25"
            fill="#DDD6FE"
          />
          <rect
            x="18"
            y="31"
            width="24"
            height="2.5"
            rx="1.25"
            fill="#DDD6FE"
          />
          <rect
            x="18"
            y="37"
            width="16"
            height="2.5"
            rx="1.25"
            fill="#DDD6FE"
          />
          <circle cx="48" cy="48" r="10" fill="url(#eg)" />
          <path
            d="M44 48h8M48 44v8"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient
              id="eg"
              x1="38"
              y1="38"
              x2="58"
              y2="58"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#5D8BF4" />
              <stop offset="1" stopColor="#C4B5FD" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <h3 className="text-xl font-bold font-poppins text-darkText mb-2">
        No notes yet
      </h3>
      <p className="text-slate-400 font-inter text-sm max-w-xs mb-8 leading-relaxed">
        Start capturing your ideas. Notes help you retain knowledge and ace your
        exams.
      </p>
      <button onClick={onNew} className="btn-primary px-8 py-3 text-sm">
        ✍️ Write your first note
      </button>
    </div>
  );
}

export default function Notes() {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");
  const [filterTag, setFilterTag] = useState("");
  const [filterSubject, setFilterSubject] = useState("");
  const [viewNote, setViewNote] = useState(null);
  const [noteModalOpen, setNoteModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);

  useEffect(() => {
    const load = () => {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
      setNotes(stored || defaultNotes);
    };
    load();
    window.addEventListener("focus", load);
    return () => window.removeEventListener("focus", load);
  }, []);

  const saveNotes = (n) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(n));
    setNotes(n);
  };
  const handleDelete = (id) => saveNotes(notes.filter((n) => n.id !== id));

  const allTags = [...new Set(notes.flatMap((n) => n.tags || []))];
  const allSubjects = [...new Set(notes.map((n) => n.subject).filter(Boolean))];

  const filtered = notes.filter((n) => {
    const text = stripHtml(n.content);
    const matchSearch =
      !search ||
      n.title?.toLowerCase().includes(search.toLowerCase()) ||
      text.toLowerCase().includes(search.toLowerCase());
    const matchTag = !filterTag || (n.tags || []).includes(filterTag);
    const matchSubject = !filterSubject || n.subject === filterSubject;
    return matchSearch && matchTag && matchSubject;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="section-title mb-1">My Notes</h1>
          <p className="text-sm text-slate-400 font-inter">
            {notes.length} note{notes.length !== 1 ? "s" : ""} across{" "}
            {allSubjects.length} subject{allSubjects.length !== 1 ? "s" : ""}
          </p>
        </div>
          <button onClick={() => { setNoteModalOpen(true) }} className="btn-primary text-sm py-2.5 px-5">
            + Create Note
          </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
            <IoSearchSharp />
          </span>
          <input
            className="input-field pl-9 w-full sm:w-72"
            placeholder="Search notes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select
          className="input-field sm:w-44"
          value={filterSubject}
          onChange={(e) => setFilterSubject(e.target.value)}
        >
          <option value="">All Subjects</option>
          {allSubjects.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
        {filterTag && (
          <button
            onClick={() => setFilterTag("")}
            className="flex items-center gap-1.5 text-sm text-primary bg-primary/10 px-4 py-2 rounded-xl font-inter font-medium hover:bg-primary/20 transition-colors"
          >
            #{filterTag} <span className="text-primary/60">×</span>
          </button>
        )}
      </div>

      {/* Tags */}
      {allTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {allTags.map((t) => (
            <button
              key={t}
              onClick={() => setFilterTag(filterTag === t ? "" : t)}
              className={`text-xs font-semibold font-inter px-3 py-1.5 rounded-full transition-all duration-200 ${filterTag === t ? "text-white shadow-sm" : "bg-white text-slate-500 border border-slate-200 hover:border-purple-200 hover:text-purple-600"}`}
              style={
                filterTag === t
                  ? { background: "linear-gradient(135deg, #5D8BF4, #C4B5FD)" }
                  : {}
              }
            >
              #{t}
            </button>
          ))}
        </div>
      )}

      {/* Content */}
      {filtered.length === 0 && !search && !filterTag && !filterSubject ? (
        <EmptyState onNew={() => setNoteModalOpen(true)} />
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-slate-400">
          <p className="text-4xl mb-3">🔍</p>
          <p className="font-poppins font-semibold text-slate-500">
            No notes match your search
          </p>
          <button
            onClick={() => {
              setSearch("");
              setFilterTag("");
              setFilterSubject("");
            }}
            className="mt-4 text-sm text-primary font-semibold font-inter hover:underline"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((note, i) => (
            <div
              key={note.id}
              className="animate-slide-up"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <NoteCard
                note={note}
                onView={setViewNote}
                onDelete={handleDelete}
              />
            </div>
          ))}
          <button
            onClick={() => setNoteModalOpen(true)}
            className="flex flex-col items-center justify-center min-h-[200px] rounded-2xl border-2 border-dashed border-slate-200 hover:border-primary/40 hover:bg-primary/3 text-slate-300 hover:text-primary transition-all duration-300 group"
          >
            <div className="w-10 h-10 rounded-xl border-2 border-dashed border-slate-200 group-hover:border-primary/40 flex items-center justify-center mb-3 text-xl transition-colors">
              +
            </div>
            <span className="text-sm font-semibold font-inter">New Note</span>
          </button>
        </div>
      )}

      {viewNote && (
        <NoteViewModal
          note={viewNote}
          onClose={() => setViewNote(null)}
          onDelete={(id) => {
            handleDelete(id);
            setViewNote(null);
          }}
          onEdit={(note) => {
            setViewNote(null);
            setEditingNote(note);
            setNoteModalOpen(true);
          }}
        />
      )}

      <NewNoteModal
        isOpen={noteModalOpen}
        onClose={() => {
          setNoteModalOpen(false);
          setEditingNote(null);
        }}
        editNote={editingNote}
      />
    </div>
  );
}
