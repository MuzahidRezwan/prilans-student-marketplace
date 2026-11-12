import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Search,
  Users,
  Briefcase,
  FileText,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  PlusCircle,
  Award,
  Layers,
  LogOut
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
    logoutUser,
    users
  } = useApp();

  const isStudent = currentUser?.role === 'student';
  const isClient = currentUser?.role === 'client';
  const isAdmin = currentUser?.role === 'admin';

  // Counts specific to user role
  const myProposalsCount = applications.filter(a => a.studentId === currentUser?.id).length;
  const unreadMessagesCount = messages.filter(m => m.toId === currentUser?.id && !m.read).length;

  return (
    <aside className="w-64 bg-white border-r border-slate-200 min-h-screen flex flex-col justify-between shrink-0 select-none">
      <div>
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div
            onClick={() => setCurrentView('find-projects')}
            className="flex items-center gap-2.5 cursor-pointer"
          >
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

        {/* User Profile Card with Quick Logout */}
        <div className="p-3.5 mx-3 my-3 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-between gap-2">
          <div
            onClick={() => isStudent ? setCurrentView('profile') : null}
            className="flex items-center gap-2.5 overflow-hidden min-w-0 cursor-pointer group flex-1"
            title="View Profile"
          >
            <img
              src={currentUser?.avatar}
              alt={currentUser?.name}
              className="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow-sm shrink-0"
            />
            <div className="overflow-hidden min-w-0">
              <div className="flex items-center gap-1.5">
                <h4 className="text-xs font-bold text-slate-900 truncate group-hover:text-blue-600">
                  {currentUser?.name}
                </h4>
              </div>
              <span className={`text-[9px] font-extrabold px-1.5 py-0.2 rounded uppercase tracking-wider ${
                isStudent ? 'bg-blue-100 text-blue-700' :
                isClient ? 'bg-emerald-100 text-emerald-700' :
                'bg-purple-100 text-purple-700'
              }`}>
                {currentUser?.role}
              </span>
            </div>
          </div>

          <button
            onClick={logoutUser}
            title="Log Out"
            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer shrink-0"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>

        {/* Role-Based Navigation Menu */}
        <div className="px-3 py-1 space-y-1">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-3 mb-2">
            {isStudent ? 'Student Workspace' : isClient ? 'Employer Workspace' : 'Admin Operations'}
          </div>

          {/* 1. STUDENT VIEW */}
          {isStudent && (
            <>
              <button
                onClick={() => setCurrentView('find-projects')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                  currentView === 'find-projects'
                    ? 'bg-blue-50 text-blue-600 font-semibold shadow-sm shadow-blue-100/50'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Search className="w-4 h-4" />
                  <span>Find Projects</span>
                </div>
              </button>

              <button
                onClick={() => setCurrentView('my-proposals')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
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

              <button
                onClick={() => setCurrentView('find-students')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                  currentView === 'find-students'
                    ? 'bg-blue-50 text-blue-600 font-semibold'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Users className="w-4 h-4" />
                  <span>Student Directory</span>
                </div>
              </button>

              <button
                onClick={() => setCurrentView('profile')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                  currentView === 'profile'
                    ? 'bg-blue-50 text-blue-600 font-semibold'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Award className="w-4 h-4" />
                  <span>My Profile & Portfolio</span>
                </div>
              </button>
            </>
          )}

          {/* 2. CLIENT / EMPLOYER VIEW */}
          {isClient && (
            <>
              <button
                onClick={() => setCurrentView('my-projects')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                  currentView === 'my-projects'
                    ? 'bg-blue-50 text-blue-600 font-semibold'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Briefcase className="w-4 h-4 text-emerald-600" />
                  <span>My Jobs & Candidates</span>
                </div>
              </button>

              <button
                onClick={() => setCurrentView('find-students')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                  currentView === 'find-students'
                    ? 'bg-blue-50 text-blue-600 font-semibold'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Users className="w-4 h-4" />
                  <span>Hire Students</span>
                </div>
              </button>

              <button
                onClick={() => setCurrentView('find-projects')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                  currentView === 'find-projects'
                    ? 'bg-blue-50 text-blue-600 font-semibold'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Search className="w-4 h-4" />
                  <span>Browse Market</span>
                </div>
              </button>
            </>
          )}

          {/* 3. ADMIN VIEW */}
          {isAdmin && (
            <>
              <button
                onClick={() => setCurrentView('admin')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                  currentView === 'admin'
                    ? 'bg-purple-50 text-purple-700 font-semibold'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-4 h-4 text-purple-600" />
                  <span>Admin Dashboard</span>
                </div>
              </button>

              <button
                onClick={() => setCurrentView('my-projects')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                  currentView === 'my-projects'
                    ? 'bg-blue-50 text-blue-600 font-semibold'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Briefcase className="w-4 h-4 text-emerald-600" />
                  <span>All Projects & Review</span>
                </div>
              </button>

              <button
                onClick={() => setCurrentView('find-students')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                  currentView === 'find-students'
                    ? 'bg-blue-50 text-blue-600 font-semibold'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Users className="w-4 h-4" />
                  <span>All Students</span>
                </div>
              </button>
            </>
          )}

          {/* Common Messages Tab */}
          <button
            onClick={() => setCurrentView('messages')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
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
        </div>

        {/* Quick Action Button for Clients & Admin */}
        {(isClient || isAdmin) && (
          <div className="px-3 pt-3">
            <button
              onClick={() => setActiveModal('postJob')}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold rounded-xl shadow-sm transition-all cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Post a Project</span>
            </button>
          </div>
        )}
      </div>

      {/* Footer / Switch Account & Logout */}
      <div className="p-3 border-t border-slate-100 space-y-3">
        {/* Switch Account for easy testing between Student and Client */}
        <div className="pt-1">
          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1 px-1">
            Test Switch Persona:
          </label>
          <select
            value={currentUser?.id}
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

        {/* Logout Button */}
        <button
          onClick={logoutUser}
          className="w-full py-2 px-3 flex items-center justify-center gap-2 text-xs font-bold text-rose-600 hover:text-rose-700 hover:bg-rose-50 border border-rose-200 rounded-xl transition-all cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Log Out</span>
        </button>
      </div>
    </aside>
  );
}
