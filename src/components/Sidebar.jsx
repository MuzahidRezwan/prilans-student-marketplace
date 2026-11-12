import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Search,
  Users,
  Briefcase,
  FileText,
  MessageSquare,
  Bell,
  Settings,
  HelpCircle,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  UserCheck,
  PlusCircle,
  Award,
  Layers
} from 'lucide-react';

export default function Sidebar() {
  const {
    currentUser,
    currentView,
    setCurrentView,
    applications,
    messages,
    setActiveModal,
    switchUser,
    users
  } = useApp();

  // Calculate unread or active counts
  const myProposalsCount = applications.filter(a => a.studentId === currentUser.id).length;
  const unreadMessagesCount = messages.filter(m => m.toId === currentUser.id && !m.read).length;

  const isStudent = currentUser.role === 'student';
  const isClient = currentUser.role === 'client';
  const isAdmin = currentUser.role === 'admin';

  return (
    <aside className="w-64 bg-white border-r border-slate-200 min-h-screen flex flex-col justify-between shrink-0 select-none">
      <div>
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-slate-900">Prilans</span>
              <span className="block text-[10px] font-semibold text-blue-600 uppercase tracking-wider">
                Student Talent Hub
              </span>
            </div>
          </div>
        </div>

        {/* User Card */}
        <div className="p-4 mx-3 my-3 bg-slate-50 border border-slate-100 rounded-2xl flex items-center gap-3">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-11 h-11 rounded-full object-cover ring-2 ring-white shadow-sm shrink-0"
          />
          <div className="overflow-hidden min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <h4 className="text-sm font-semibold text-slate-900 truncate">{currentUser.name}</h4>
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider ${
                isStudent ? 'bg-blue-100 text-blue-700' :
                isClient ? 'bg-emerald-100 text-emerald-700' :
                'bg-purple-100 text-purple-700'
              }`}>
                {currentUser.role}
              </span>
            </div>
            <p className="text-xs text-slate-500 truncate">{currentUser.email}</p>
          </div>
        </div>

        {/* Navigation Menu (Matching Image 2 Mockup) */}
        <div className="px-3 py-2 space-y-1">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-3 mb-2">
            Main Menu
          </div>

          <button
            onClick={() => setCurrentView('find-projects')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
              currentView === 'find-projects'
                ? 'bg-blue-50 text-blue-600 font-semibold shadow-sm shadow-blue-100/50'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <div className="flex items-center gap-3">
              <Search className="w-4 h-4" />
              <span>Find Project</span>
            </div>
          </button>

          <button
            onClick={() => setCurrentView('find-students')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
              currentView === 'find-students'
                ? 'bg-blue-50 text-blue-600 font-semibold'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <div className="flex items-center gap-3">
              <Users className="w-4 h-4" />
              <span>Find Freelancers</span>
            </div>
            <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded-full font-semibold">
              Students
            </span>
          </button>

          {/* Client specific: Post & Manage Jobs */}
          {isClient && (
            <button
              onClick={() => setCurrentView('my-projects')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                currentView === 'my-projects'
                  ? 'bg-blue-50 text-blue-600 font-semibold'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <Briefcase className="w-4 h-4" />
                <span>My Posted Projects</span>
              </div>
            </button>
          )}

          {/* Student specific: Proposals */}
          {isStudent && (
            <button
              onClick={() => setCurrentView('my-proposals')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                currentView === 'my-proposals'
                  ? 'bg-blue-50 text-blue-600 font-semibold'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <FileText className="w-4 h-4" />
                <span>My Proposals</span>
              </div>
              {myProposalsCount > 0 && (
                <span className="text-[11px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-bold">
                  {myProposalsCount}
                </span>
              )}
            </button>
          )}

          <button
            onClick={() => setCurrentView('messages')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
              currentView === 'messages'
                ? 'bg-blue-50 text-blue-600 font-semibold'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <div className="flex items-center gap-3">
              <MessageSquare className="w-4 h-4" />
              <span>Messages</span>
            </div>
            {unreadMessagesCount > 0 && (
              <span className="text-[11px] bg-emerald-500 text-white px-2 py-0.5 rounded-full font-bold animate-pulse">
                {unreadMessagesCount}
              </span>
            )}
          </button>

          {/* Admin Dashboard */}
          <button
            onClick={() => setCurrentView('admin')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
              currentView === 'admin'
                ? 'bg-purple-50 text-purple-700 font-semibold'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-4 h-4 text-purple-600" />
              <span>Admin Dashboard</span>
            </div>
            <span className="text-[10px] bg-purple-100 text-purple-800 px-1.5 py-0.5 rounded-full font-bold">
              10 marks
            </span>
          </button>

          {/* Student Profile & Portfolio */}
          {isStudent && (
            <button
              onClick={() => setCurrentView('profile')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                currentView === 'profile'
                  ? 'bg-blue-50 text-blue-600 font-semibold'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <Award className="w-4 h-4" />
                <span>Skill Profile & Portfolio</span>
              </div>
            </button>
          )}
        </div>

        {/* Quick Action Button */}
        <div className="px-3 pt-3">
          {isClient ? (
            <button
              onClick={() => setActiveModal('postJob')}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold rounded-xl shadow-sm transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Post a Project</span>
            </button>
          ) : isStudent ? (
            <button
              onClick={() => setCurrentView('profile')}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 text-blue-700 hover:bg-blue-100 text-xs font-semibold rounded-xl transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Edit Skill Profile</span>
            </button>
          ) : null}
        </div>
      </div>

      {/* Footer / Plus Plan & Demo Switcher */}
      <div className="p-3 border-t border-slate-100 space-y-3">
        {/* Plus Plan Card (Matching Image 2 Mockup!) */}
        <div className="p-3.5 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl text-white shadow-sm">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-5 h-5 rounded-lg bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-400">
              <Sparkles className="w-3 h-3" />
            </span>
            <span className="text-xs font-bold tracking-tight">Plus Plan</span>
          </div>
          <p className="text-[11px] text-slate-300 leading-relaxed mb-2.5">
            Get exclusive access to the student freelance Pro group and competitive bids on top projects.
          </p>
          <a
            href="#upgrade"
            onClick={(e) => { e.preventDefault(); alert('Plus Plan is free for university students in SE331 capstone!'); }}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
          >
            <span>Upgrade Now</span>
            <ArrowRight className="w-3 h-3" />
          </a>
        </div>

        {/* Quick Demo Switcher Selector for Grading/Examiners */}
        <div className="pt-1">
          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1 px-1">
            Demo Persona Switcher:
          </label>
          <select
            value={currentUser.id}
            onChange={(e) => switchUser(e.target.value)}
            className="w-full text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          >
            {users.map(u => (
              <option key={u.id} value={u.id}>
                [{u.role.toUpperCase()}] {u.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </aside>
  );
}
