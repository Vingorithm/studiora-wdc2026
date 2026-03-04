import { useState } from 'react'
import { FaBook } from "react-icons/fa6";
import { FaCalendarAlt } from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";

const priorityStyles = {
  Low: 'bg-emerald-50 text-emerald-600',
  Medium: 'bg-amber-50 text-amber-600',
  High: 'bg-red-50 text-red-500',
}
const priorityDot = {
  Low: 'bg-emerald-400',
  Medium: 'bg-amber-400',
  High: 'bg-red-400',
}
const statusStyles = {
  'To Do': 'bg-slate-100 text-slate-500',
  'In Progress': 'bg-blue-50 text-blue-600',
  'Done': 'bg-emerald-50 text-emerald-600',
}

export default function TaskCard({ task, onEdit, onDelete, onStatusChange }) {
  const [showMenu, setShowMenu] = useState(false)

  const isOverdue = task.deadline && new Date(task.deadline) < new Date() && task.status !== 'Done'
  const daysLeft = task.deadline
    ? Math.ceil((new Date(task.deadline) - new Date()) / (1000 * 60 * 60 * 24))
    : null

  return (
    <div className={`card card-hover relative animate-fade-in ${task.status === 'Done' ? 'opacity-70' : ''}`}>
      {/* Priority indicator bar */}
      <div className={`absolute top-0 left-0 w-1 h-full rounded-l-2xl ${priorityDot[task.priority]}`} />

      <div className="pl-2">
        {/* Header */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <button
              onClick={() => onStatusChange(task.id, task.status === 'Done' ? 'To Do' : 'Done')}
              className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all duration-200 ${task.status === 'Done'
                ? 'bg-success border-success text-white'
                : 'border-slate-300 hover:border-primary'
                }`}
            >
              {task.status === 'Done' && <span className="text-xs">✓</span>}
            </button>
            <h3 className={`font-semibold font-poppins text-darkText text-sm truncate ${task.status === 'Done' ? 'line-through text-slate-400' : ''}`}>
              {task.title}
            </h3>
          </div>
          <div className="relative flex-shrink-0">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <span className="text-sm">⋯</span>
            </button>
            {showMenu && (
              <div className="absolute right-0 top-8 bg-white rounded-xl shadow-lg border border-slate-100 py-1.5 z-10 min-w-[120px] animate-slide-up">
                <button
                  onClick={() => { onEdit(task); setShowMenu(false) }}
                  className="flex items-center gap-1 w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 font-inter"
                >
                  <MdEdit /> Edit
                </button>
                <button
                  onClick={() => { onDelete(task.id); setShowMenu(false) }}
                  className="flex items-center gap-1 w-full text-left px-4 py-2 text-sm text-danger hover:bg-red-50 font-inter"
                >
                  <MdDelete /> Delete
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Description */}
        {task.description && (
          <p className="text-xs text-slate-400 font-inter mb-3 line-clamp-2">{task.description}</p>
        )}

        {/* Subject */}
        {task.subject && (
          <div className="flex items-center text-primary gap-2 mb-3">
            <FaBook />
            <p className="text-xs font-semibold font-inter">{task.subject}</p>
          </div>
        )}

        {/* Badges */}
        <div className="flex flex-wrap gap-2 items-center">
          <span className={`badge ${priorityStyles[task.priority]}`}>
            {task.priority}
          </span>
          <span className={`badge ${statusStyles[task.status]}`}>
            {task.status}
          </span>
        </div>

        {/* Deadline */}
        {task.deadline && (
          <div className={`mt-3 flex items-center gap-1.5 text-xs font-inter font-medium ${isOverdue ? 'text-danger' : daysLeft <= 2 ? 'text-amber-500' : 'text-slate-400'}`}>
            <span><FaCalendarAlt /></span>
            {isOverdue
              ? `Overdue by ${Math.abs(daysLeft)} day${Math.abs(daysLeft) !== 1 ? 's' : ''}`
              : daysLeft === 0
                ? 'Due today'
                : daysLeft === 1
                  ? 'Due tomorrow'
                  : `Due in ${daysLeft} days`
            }
          </div>
        )}
      </div>
    </div>
  )
}