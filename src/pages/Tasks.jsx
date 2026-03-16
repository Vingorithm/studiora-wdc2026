import { useState, useEffect, useRef, useCallback } from "react";
import usePageTitle from "../hooks/usePageTitle";
import useFocusTrap from "../hooks/useFocusTrap";
import TaskCard from "../components/TaskCard";
import { IoSearchSharp } from "react-icons/io5";
import {
  FaCalendarAlt,
  FaClipboard,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { useToast } from "../context/ToastContext";

const STORAGE_KEY = "studiora_tasks";

const defaultTasks = [
  {
    id: 1,
    title: "Calculus Problem Set 3",
    description: "Complete exercises 4.1–4.8 on integration",
    subject: "Mathematics",
    priority: "High",
    status: "In Progress",
    deadline: new Date(Date.now() + 86400000).toISOString().split("T")[0],
  },
  {
    id: 2,
    title: "Literature Essay Draft",
    description: "Write 1500-word analysis of Hamlet",
    subject: "English",
    priority: "Medium",
    status: "To Do",
    deadline: new Date(Date.now() + 3 * 86400000).toISOString().split("T")[0],
  },
  {
    id: 3,
    title: "Physics Lab Report",
    description: "Analyze pendulum experiment data",
    subject: "Physics",
    priority: "High",
    status: "To Do",
    deadline: new Date(Date.now() + 2 * 86400000).toISOString().split("T")[0],
  },
  {
    id: 4,
    title: "Read Chapter 7-9",
    description: "History of the Renaissance",
    subject: "History",
    priority: "Low",
    status: "Done",
    deadline: "",
  },
  {
    id: 5,
    title: "Group Project Slides",
    description: "Create presentation for Marketing class",
    subject: "Marketing",
    priority: "Medium",
    status: "To Do",
    deadline: new Date(Date.now() + 5 * 86400000).toISOString().split("T")[0],
  },
  {
    id: 6,
    title: "Statistics Assignment",
    description: "Chapter 9: Hypothesis testing problems",
    subject: "Statistics",
    priority: "Medium",
    status: "In Progress",
    deadline: new Date(Date.now() + 86400000).toISOString().split("T")[0],
  },
];

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const HOURS = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const PRIORITY_COLORS = {
  High: {
    block: "bg-red-50    text-red-600    border-l-[3px] border-red-400",
    dot: "bg-red-400",
  },
  Medium: {
    block: "bg-amber-50  text-amber-600  border-l-[3px] border-amber-400",
    dot: "bg-amber-400",
  },
  Low: {
    block: "bg-emerald-50 text-emerald-600 border-l-[3px] border-emerald-500",
    dot: "bg-emerald-400",
  },
  default: {
    block: "bg-blue-50   text-blue-600   border-l-[3px] border-blue-400",
    dot: "bg-blue-400",
  },
};

// ─── Accessible TaskModal ──────────────────────────────────────────────────
function TaskModal({ task, onSave, onClose }) {
  const modalRef = useRef(null);
  const [form, setForm] = useState(
    task || {
      title: "",
      description: "",
      subject: "",
      priority: "Medium",
      status: "To Do",
      deadline: "",
    },
  );
  useFocusTrap(modalRef, true, onClose);
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
      aria-hidden="true"
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="task-modal-title"
        className="bg-white rounded-3xl shadow-xl w-full max-w-md p-6 animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2
            id="task-modal-title"
            className="font-bold font-poppins text-darkText text-lg"
          >
            {task ? "Edit Task" : "New Task"}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors"
          >
            ×
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="task-title"
              className="text-xs font-semibold text-slate-500 font-inter uppercase tracking-wide mb-1.5 block"
            >
              Title *
            </label>
            <input
              id="task-title"
              className="input-field"
              placeholder="Task title..."
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="task-desc"
              className="text-xs font-semibold text-slate-500 font-inter uppercase tracking-wide mb-1.5 block"
            >
              Description
            </label>
            <textarea
              id="task-desc"
              className="input-field resize-none"
              rows={2}
              placeholder="Brief description..."
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="task-subject"
                className="text-xs font-semibold text-slate-500 font-inter uppercase tracking-wide mb-1.5 block"
              >
                Subject
              </label>
              <input
                id="task-subject"
                className="input-field"
                placeholder="e.g. Math"
                value={form.subject}
                onChange={(e) => set("subject", e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="task-deadline"
                className="text-xs font-semibold text-slate-500 font-inter uppercase tracking-wide mb-1.5 block"
              >
                Deadline
              </label>
              <input
                id="task-deadline"
                type="date"
                className="input-field"
                value={form.deadline}
                onChange={(e) => set("deadline", e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="task-priority"
                className="text-xs font-semibold text-slate-500 font-inter uppercase tracking-wide mb-1.5 block"
              >
                Priority
              </label>
              <select
                id="task-priority"
                className="input-field"
                value={form.priority}
                onChange={(e) => set("priority", e.target.value)}
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="task-status"
                className="text-xs font-semibold text-slate-500 font-inter uppercase tracking-wide mb-1.5 block"
              >
                Status
              </label>
              <select
                id="task-status"
                className="input-field"
                value={form.status}
                onChange={(e) => set("status", e.target.value)}
              >
                <option>To Do</option>
                <option>In Progress</option>
                <option>Done</option>
              </select>
            </div>
          </div>
        </div>
        <div className="flex gap-3 mt-6">
          <button onClick={onClose} className="btn-secondary flex-1">
            Cancel
          </button>
          <button
            onClick={() => form.title.trim() && onSave(form)}
            className="btn-primary flex-1"
            disabled={!form.title.trim()}
            aria-disabled={!form.title.trim()}
          >
            {task ? "Save Changes" : "Add Task"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Calendar Legend ───────────────────────────────────────────────────────
function CalendarLegend() {
  return (
    <div className="flex items-center gap-4 flex-wrap">
      {[
        { label: "High", dot: "bg-red-400" },
        { label: "Medium", dot: "bg-amber-400" },
        { label: "Low", dot: "bg-emerald-400" },
      ].map(({ label, dot }) => (
        <div key={label} className="flex items-center gap-1.5">
          <div
            className={`w-2.5 h-2.5 rounded-full ${dot}`}
            aria-hidden="true"
          />
          <span className="text-xs text-slate-500 font-inter">{label}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────
export default function Tasks() {
  usePageTitle("Tasks");
  const toast = useToast();

  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [view, setView] = useState("board");
  const [search, setSearch] = useState("");
  // weekOffset: 0 = current week, 1 = next week, -1 = last week, etc.
  const [weekOffset, setWeekOffset] = useState(0);
  // Tooltip state for calendar block hover
  const [tooltip, setTooltip] = useState(null); // { taskId, x, y }

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
      setTasks(stored || defaultTasks);
    } catch {
      setTasks(defaultTasks);
    }
  }, []);

  const save = (t) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(t));
    setTasks(t);
  };

  const handleSave = (form) => {
    if (editTask) {
      save(
        tasks.map((t) =>
          t.id === editTask.id ? { ...form, id: editTask.id } : t,
        ),
      );
      toast("Task updated successfully", "success");
    } else {
      save([...tasks, { ...form, id: Date.now() }]);
      toast("Task added!", "success");
    }
    setModalOpen(false);
    setEditTask(null);
  };

  const handleDelete = (id) => {
    const deletedTask = tasks.find((t) => t.id === id);
    const remaining = tasks.filter((t) => t.id !== id);
    save(remaining);
    toast(`"${deletedTask?.title || "Task"}" deleted`, "info", 5000, () =>
      save([...remaining, deletedTask]),
    );
  };

  const handleStatusChange = (id, status) => {
    save(tasks.map((t) => (t.id === id ? { ...t, status } : t)));
    toast(`Moved to ${status}`, "success");
  };

  // ── Week date calculation (respects weekOffset) ──────────────────────────
  const getWeekDates = useCallback((offset = 0) => {
    const today = new Date();
    const dow = today.getDay();
    const mondayDiff = dow === 0 ? -6 : 1 - dow;
    const monday = new Date(today);
    monday.setDate(today.getDate() + mondayDiff + offset * 7);
    monday.setHours(0, 0, 0, 0);
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      return d;
    });
  }, []);

  const weekDates = getWeekDates(weekOffset);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // ── Month label for header (handles month spanning e.g. "June – July 2025") ──
  const startMonth = weekDates[0].getMonth();
  const endMonth = weekDates[6].getMonth();
  const year = weekDates[0].getFullYear();
  const monthLabel =
    startMonth === endMonth
      ? `${MONTHS[startMonth]} ${year}`
      : `${MONTHS[startMonth]} – ${MONTHS[endMonth]} ${year}`;

  // ── Calendar blocks — ALL tasks with deadline, not just active ───────────
  const calendarBlocks = tasks
    .filter((t) => t.deadline)
    .flatMap((task) => {
      const deadline = new Date(task.deadline + "T00:00:00");
      const colIndex = weekDates.findIndex(
        (d) =>
          d.getFullYear() === deadline.getFullYear() &&
          d.getMonth() === deadline.getMonth() &&
          d.getDate() === deadline.getDate(),
      );
      if (colIndex === -1) return [];
      // Assign hour slot: spread multiple tasks on the same day across hours
      const sameDay = tasks.filter(
        (t2) => t2.deadline === task.deadline && t2.status !== "Done",
      );
      const slotIdx = sameDay.findIndex((t2) => t2.id === task.id);
      const hour = 9 + (slotIdx % HOURS.length);
      const colors = PRIORITY_COLORS[task.priority] || PRIORITY_COLORS.default;
      return [
        {
          day: colIndex,
          hour: HOURS.includes(hour) ? hour : 9,
          label: task.title,
          color: colors.block,
          dot: colors.dot,
          status: task.status,
          taskId: task.id,
          subject: task.subject,
          deadline: task.deadline,
          priority: task.priority,
        },
      ];
    });

  // ── Filters & counts ─────────────────────────────────────────────────────
  const filters = ["All", "To Do", "In Progress", "Done"];
  const filtered = tasks
    .filter((t) => filter === "All" || t.status === filter)
    .filter(
      (t) =>
        !search ||
        t.title.toLowerCase().includes(search.toLowerCase()) ||
        (t.subject || "").toLowerCase().includes(search.toLowerCase()),
    );

  const counts = {
    All: tasks.length,
    "To Do": tasks.filter((t) => t.status === "To Do").length,
    "In Progress": tasks.filter((t) => t.status === "In Progress").length,
    Done: tasks.filter((t) => t.status === "Done").length,
  };

  // ── "Today" button: snap back to current week ────────────────────────────
  const isCurrentWeek = weekOffset === 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      {/* ── Page Header ──────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="section-title mb-1">Task Manager</h1>
          <p className="text-sm text-slate-500 font-inter">
            {tasks.filter((t) => t.status !== "Done").length} active tasks
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          {/* View toggle */}
          <div
            className="flex rounded-xl border border-slate-200 overflow-hidden"
            role="group"
            aria-label="View toggle"
          >
            <button
              onClick={() => setView("board")}
              aria-pressed={view === "board"}
              className={`px-4 py-2 text-sm font-inter font-medium transition-colors flex items-center gap-1.5
                ${view === "board" ? "bg-primary text-white" : "text-slate-500 hover:bg-slate-50"}`}
            >
              <FaClipboard size={12} /> Board
            </button>
            <button
              onClick={() => setView("calendar")}
              aria-pressed={view === "calendar"}
              className={`px-4 py-2 text-sm font-inter font-medium transition-colors flex items-center gap-1.5
                ${view === "calendar" ? "bg-primary text-white" : "text-slate-500 hover:bg-slate-50"}`}
            >
              <FaCalendarAlt size={12} /> Calendar
            </button>
          </div>
          <button
            onClick={() => {
              setEditTask(null);
              setModalOpen(true);
            }}
            className="btn-primary text-sm py-2.5 px-5"
          >
            + Add Task
          </button>
        </div>
      </div>

      {/* ── Board View ───────────────────────────────────────────────────── */}
      {view === "board" ? (
        <>
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative">
              <span
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm"
                aria-hidden="true"
              >
                <IoSearchSharp />
              </span>
              <input
                className="input-field pl-9 w-full sm:w-72"
                placeholder="Search tasks..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Search tasks"
              />
            </div>
            <div
              className="flex gap-2 flex-wrap"
              role="group"
              aria-label="Filter tasks"
            >
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  aria-pressed={filter === f}
                  className={`px-4 py-2 rounded-xl text-sm font-medium font-inter transition-all duration-200
                    ${
                      filter === f
                        ? "bg-primary text-white shadow-soft"
                        : "bg-white text-slate-500 border border-slate-200 hover:border-primary/30"
                    }`}
                >
                  {f} <span className="ml-1.5 opacity-70">{counts[f]}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {["To Do", "In Progress", "Done"].map((col) => {
              const colTasks = filtered.filter((t) => t.status === col);
              const colColors = {
                "To Do": "bg-slate-400",
                "In Progress": "bg-primary",
                Done: "bg-success",
              };
              return (
                <div key={col} role="region" aria-label={`${col} column`}>
                  <div className="flex items-center gap-2 mb-4">
                    <div
                      className={`w-2.5 h-2.5 rounded-full ${colColors[col]}`}
                      aria-hidden="true"
                    />
                    <h2 className="font-bold font-poppins text-darkText text-sm">
                      {col}
                    </h2>
                    <span className="ml-auto bg-slate-100 text-slate-500 text-xs font-semibold font-inter px-2 py-0.5 rounded-lg">
                      {colTasks.length}
                    </span>
                  </div>
                  <div className="space-y-3 min-h-[100px]">
                    {colTasks.map((task) => (
                      <TaskCard
                        key={task.id}
                        task={task}
                        onEdit={(t) => {
                          setEditTask(t);
                          setModalOpen(true);
                        }}
                        onDelete={handleDelete}
                        onStatusChange={handleStatusChange}
                      />
                    ))}
                    {colTasks.length === 0 && (
                      <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center text-slate-300 text-sm font-inter">
                        No tasks here
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        /* ── Calendar View ───────────────────────────────────────────────────── */
        <div className="card overflow-hidden">
          {/* ── Toolbar ──────────────────────────────────────────────────────── */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setWeekOffset((o) => o - 1)}
                className="w-8 h-8 rounded-xl border border-slate-200 hover:bg-slate-50
            flex items-center justify-center text-slate-500 hover:text-primary transition-all"
                aria-label="Previous week"
              >
                <FaChevronLeft size={11} />
              </button>

              <h2 className="font-bold font-poppins text-darkText text-base min-w-[200px] text-center">
                {(() => {
                  const s = weekDates[0],
                    e = weekDates[6];
                  const yr = s.getFullYear();
                  return s.getMonth() === e.getMonth()
                    ? `${MONTHS[s.getMonth()]} ${yr}`
                    : `${MONTHS[s.getMonth()]} – ${MONTHS[e.getMonth()]} ${yr}`;
                })()}
              </h2>

              <button
                onClick={() => setWeekOffset((o) => o + 1)}
                className="w-8 h-8 rounded-xl border border-slate-200 hover:bg-slate-50
            flex items-center justify-center text-slate-500 hover:text-primary transition-all"
                aria-label="Next week"
              >
                <FaChevronRight size={11} />
              </button>

              {weekOffset !== 0 && (
                <button
                  onClick={() => setWeekOffset(0)}
                  className="text-xs font-semibold font-inter text-primary
              bg-primary/10 hover:bg-primary/20 px-3 py-1.5 rounded-lg transition-colors"
                >
                  Today
                </button>
              )}
            </div>

            {/* Legend */}
            <div className="flex items-center gap-4">
              {[
                { label: "High", dot: "bg-red-400" },
                { label: "Medium", dot: "bg-amber-400" },
                { label: "Low", dot: "bg-emerald-400" },
              ].map(({ label, dot }) => (
                <div key={label} className="flex items-center gap-1.5">
                  <div
                    className={`w-2 h-2 rounded-full ${dot}`}
                    aria-hidden="true"
                  />
                  <span className="text-xs text-slate-400 font-inter">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Calendar Grid ────────────────────────────────────────────────── */}
          <div
            className="overflow-x-auto"
            role="region"
            aria-label="Weekly calendar"
            tabIndex={0}
          >
            <div className="min-w-[560px]">
              {/* Day columns */}
              <div className="grid grid-cols-7 gap-2">
                {DAYS.map((dayName, i) => {
                  const date = weekDates[i];
                  const todayDate = new Date();
                  todayDate.setHours(0, 0, 0, 0);
                  const isToday = date.getTime() === todayDate.getTime();
                  const isPast = date < todayDate;
                  const isSun = i === 6;
                  const isSat = i === 5;

                  // All tasks whose deadline falls on this day
                  const dayTasks = calendarBlocks.filter((b) => b.day === i);

                  return (
                    <div key={dayName} className="flex flex-col gap-2">
                      {/* ── Day header ─────────────────────────────────────── */}
                      <div className="flex flex-col items-center gap-1 pb-2 border-b border-slate-100">
                        <span
                          className={`text-xs font-semibold font-inter uppercase tracking-wide
                    ${isToday ? "text-primary" : isPast ? "text-slate-300" : isSat || isSun ? "text-slate-400" : "text-slate-400"}`}
                        >
                          {dayName}
                        </span>
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center
                    text-sm font-bold font-poppins transition-all select-none
                    ${
                      isToday
                        ? "bg-primary text-white shadow-soft"
                        : isPast
                          ? "text-slate-300"
                          : isSat || isSun
                            ? "text-slate-400 bg-slate-50"
                            : "text-darkText hover:bg-primary/8"
                    }`}
                        >
                          {date.getDate()}
                        </div>
                      </div>

                      {/* ── Task cards for this day ─────────────────────────── */}
                      <div
                        className={`flex flex-col gap-1.5 min-h-[120px] rounded-xl p-1.5 transition-colors
                    ${isToday ? "bg-primary/[0.03] ring-1 ring-primary/10" : ""}
                    ${!isPast ? "hover:bg-slate-50/80 cursor-pointer" : ""}`}
                        onClick={() => {
                          // Click empty area → open modal pre-filled with this date
                          if (!isPast && dayTasks.length === 0) {
                            setEditTask({
                              title: "",
                              description: "",
                              subject: "",
                              priority: "Medium",
                              status: "To Do",
                              deadline: date.toISOString().split("T")[0],
                            });
                            setModalOpen(true);
                          }
                        }}
                        role={!isPast ? "button" : undefined}
                        aria-label={
                          !isPast && dayTasks.length === 0
                            ? `Add task on ${date.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`
                            : undefined
                        }
                      >
                        {dayTasks.length === 0 && !isPast && (
                          <div className="flex items-center justify-center h-full min-h-[80px]">
                            <span className="text-xs text-slate-200 font-inter select-none">
                              + add
                            </span>
                          </div>
                        )}

                        {dayTasks.map((block) => {
                          const COLORS = {
                            High: {
                              bg: "bg-red-50    border-red-200    text-red-700",
                              dot: "bg-red-400",
                            },
                            Medium: {
                              bg: "bg-amber-50  border-amber-200  text-amber-700",
                              dot: "bg-amber-400",
                            },
                            Low: {
                              bg: "bg-emerald-50 border-emerald-200 text-emerald-700",
                              dot: "bg-emerald-500",
                            },
                            default: {
                              bg: "bg-blue-50   border-blue-200   text-blue-700",
                              dot: "bg-blue-400",
                            },
                          };
                          const c = COLORS[block.priority] || COLORS.default;
                          const isDone = block.status === "Done";

                          return (
                            <button
                              key={block.taskId}
                              onClick={(e) => {
                                e.stopPropagation();
                                const t = tasks.find(
                                  (t) => t.id === block.taskId,
                                );
                                if (t) {
                                  setEditTask(t);
                                  setModalOpen(true);
                                }
                              }}
                              className={`w-full text-left rounded-lg border px-2 py-1.5
                          transition-all duration-150 hover:shadow-sm hover:-translate-y-px
                          group ${c.bg} ${isDone ? "opacity-50" : ""}`}
                              aria-label={`${block.label}, ${block.priority} priority${isDone ? ", done" : ""}`}
                            >
                              <div className="flex items-start gap-1.5">
                                <div
                                  className={`w-1.5 h-1.5 rounded-full mt-1 flex-shrink-0 ${c.dot}`}
                                />
                                <div className="min-w-0 flex-1">
                                  <p
                                    className={`text-xs font-semibold font-poppins leading-snug
                              truncate group-hover:text-opacity-80
                              ${isDone ? "line-through" : ""}`}
                                  >
                                    {block.label}
                                  </p>
                                  {block.subject && (
                                    <p className="text-xs font-inter opacity-60 truncate mt-0.5">
                                      {block.subject}
                                    </p>
                                  )}
                                </div>
                                {isDone && (
                                  <span className="text-xs flex-shrink-0 opacity-60">
                                    ✓
                                  </span>
                                )}
                              </div>
                            </button>
                          );
                        })}

                        {/* "+ add" button when day already has tasks */}
                        {dayTasks.length > 0 && !isPast && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditTask({
                                title: "",
                                description: "",
                                subject: "",
                                priority: "Medium",
                                status: "To Do",
                                deadline: date.toISOString().split("T")[0],
                              });
                              setModalOpen(true);
                            }}
                            className="w-full text-xs text-slate-300 font-inter hover:text-primary
                        hover:bg-primary/5 rounded-lg py-1 transition-colors text-center"
                            aria-label={`Add another task on ${date.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`}
                          >
                            + add
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Scroll hint mobile */}
          <p
            className="mt-3 text-xs text-slate-300 font-inter sm:hidden text-center"
            aria-hidden="true"
          >
            ← Swipe to see full week →
          </p>

          {/* ── Deadline summary strip ────────────────────────────────────────── */}
          {calendarBlocks.filter((b) => b.status !== "Done").length > 0 && (
            <div className="mt-5 pt-4 border-t border-slate-100">
              <p className="text-xs font-semibold text-slate-400 font-inter uppercase tracking-wide mb-3">
                Deadlines this week
              </p>
              <div className="flex flex-wrap gap-2">
                {calendarBlocks
                  .filter((b) => b.status !== "Done")
                  .sort((a, b) => a.day - b.day)
                  .map((b) => {
                    const todayMs = new Date().setHours(0, 0, 0, 0);
                    const daysLeft = Math.ceil(
                      (new Date(b.deadline + "T00:00:00") - todayMs) / 86400000,
                    );
                    const DOTS = {
                      High: "bg-red-400",
                      Medium: "bg-amber-400",
                      Low: "bg-emerald-400",
                      default: "bg-blue-400",
                    };
                    return (
                      <button
                        key={b.taskId}
                        onClick={() => {
                          const t = tasks.find((t) => t.id === b.taskId);
                          if (t) {
                            setEditTask(t);
                            setModalOpen(true);
                          }
                        }}
                        className="flex items-center gap-2 bg-slate-50 hover:bg-white
                    border border-slate-100 hover:border-slate-200 hover:shadow-sm
                    rounded-xl px-3 py-2 text-left transition-all group"
                      >
                        <div
                          className={`w-2 h-2 rounded-full flex-shrink-0
                    ${DOTS[b.priority] || DOTS.default}`}
                        />
                        <div>
                          <p
                            className="text-xs font-semibold font-poppins text-darkText
                      group-hover:text-primary transition-colors truncate max-w-[140px]"
                          >
                            {b.label}
                          </p>
                          <p
                            className={`text-xs font-inter
                      ${
                        daysLeft < 0
                          ? "text-danger"
                          : daysLeft === 0
                            ? "text-danger font-semibold"
                            : daysLeft <= 2
                              ? "text-amber-500"
                              : "text-slate-400"
                      }`}
                          >
                            {daysLeft < 0
                              ? `${Math.abs(daysLeft)}d overdue`
                              : daysLeft === 0
                                ? "Due today"
                                : daysLeft === 1
                                  ? "Due tomorrow"
                                  : `${daysLeft}d left`}
                          </p>
                        </div>
                      </button>
                    );
                  })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── Modal ────────────────────────────────────────────────────────── */}
      {modalOpen && (
        <TaskModal
          task={editTask}
          onSave={handleSave}
          onClose={() => {
            setModalOpen(false);
            setEditTask(null);
          }}
        />
      )}
    </div>
  );
}
