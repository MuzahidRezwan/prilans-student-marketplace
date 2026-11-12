import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldCheck,
  Users,
  Briefcase,
  FileText,
  DollarSign,
  TrendingUp,
  CheckCircle2,
  Trash2,
  AlertTriangle,
  Award,
  Sparkles,
  BarChart3,
  Layers
} from 'lucide-react';

export default function AdminDashboardPage() {
  const {
    users,
    projects,
    applications,
    reviews,
    deleteProject,
    showToast
  } = useApp();

  const [activeAdminTab, setActiveAdminTab] = useState('overview'); // 'overview' | 'users' | 'projects'

  const students = users.filter(u => u.role === 'student');
  const clients = users.filter(u => u.role === 'client');
  const completedProjects = applications.filter(a => a.status === 'Completed').length;
  const placementRate = applications.length > 0
    ? Math.round((applications.filter(a => a.status === 'Accepted' || a.status === 'Completed').length / applications.length) * 100)
    : 85;

  const categoryCounts = projects.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Admin Dashboard & Platform Operations
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time analytics, user verification, job moderation, and platform performance.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
          <button
            onClick={() => setActiveAdminTab('overview')}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              activeAdminTab === 'overview' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            KPI Overview
          </button>
          <button
            onClick={() => setActiveAdminTab('users')}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              activeAdminTab === 'users' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Users ({users.length})
          </button>
          <button
            onClick={() => setActiveAdminTab('projects')}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              activeAdminTab === 'projects' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Job Moderation ({projects.length})
          </button>
        </div>
      </div>

      {/* KPI Overview Tab */}
      {activeAdminTab === 'overview' && (
        <div className="space-y-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Active Students
              </span>
              <div className="text-2xl font-black text-slate-900">{students.length}</div>
              <span className="text-[10px] font-semibold text-emerald-600">Verified Talent</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Verified Clients
              </span>
              <div className="text-2xl font-black text-slate-900">{clients.length}</div>
              <span className="text-[10px] font-semibold text-blue-600">Global Employers</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Published Jobs
              </span>
              <div className="text-2xl font-black text-slate-900">{projects.length}</div>
              <span className="text-[10px] font-semibold text-slate-500">Live Marketplace</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Total Proposals
              </span>
              <div className="text-2xl font-black text-slate-900">{applications.length}</div>
              <span className="text-[10px] font-semibold text-purple-600">Student Bids</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Completed Jobs
              </span>
              <div className="text-2xl font-black text-emerald-600">{completedProjects}</div>
              <span className="text-[10px] font-semibold text-emerald-600">Delivered & Rated</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Placement Rate
              </span>
              <div className="text-2xl font-black text-blue-600">{placementRate}%</div>
              <span className="text-[10px] font-semibold text-emerald-600">High Success</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-900 text-sm">Job Distribution by Category</h3>
                <BarChart3 className="w-4 h-4 text-slate-400" />
              </div>

              <div className="space-y-3 pt-2">
                {Object.entries(categoryCounts).map(([cat, count]) => {
                  const percent = Math.round((count / projects.length) * 100);
                  return (
                    <div key={cat} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="font-semibold text-slate-700">{cat}</span>
                        <span className="text-slate-400">{count} projects ({percent}%)</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-900 text-sm">Real-time Platform Audit Log</h3>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  Live
                </span>
              </div>

              <div className="space-y-3 pt-1">
                {applications.slice(0, 4).map(app => (
                  <div key={app.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-slate-900">{app.studentName}</span>
                      <span className="text-slate-500"> applied to </span>
                      <span className="font-semibold text-blue-600 truncate max-w-xs inline-block align-bottom">{app.projectTitle}</span>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700">
                      {app.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Users Management Tab */}
      {activeAdminTab === 'users' && (
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-base">All Registered Platform Users</h3>
            <span className="text-xs text-slate-500 font-medium">{users.length} Total Users</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-100">
                <tr>
                  <th className="px-6 py-3">User</th>
                  <th className="px-6 py-3">Role</th>
                  <th className="px-6 py-3">Affiliation</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                {users.map(u => (
                  <tr key={u.id} className="hover:bg-slate-50/50">
                    <td className="px-6 py-4 flex items-center gap-3">
                      <img src={u.avatar} alt={u.name} className="w-9 h-9 rounded-full object-cover" />
                      <div>
                        <span className="font-bold text-slate-900 block">{u.name}</span>
                        <span className="text-[11px] text-slate-400">{u.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                        u.role === 'student' ? 'bg-blue-100 text-blue-800' :
                        u.role === 'client' ? 'bg-emerald-100 text-emerald-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {u.university || u.company || 'Platform Admin'}
                    </td>
                    <td className="px-6 py-4">
                      <span className="flex items-center gap-1 font-bold text-slate-900">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                        Verified ({u.rating || 5.0}★)
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => showToast(`User account ${u.name} verified.`)}
                        className="text-xs font-semibold text-blue-600 hover:text-blue-800 cursor-pointer"
                      >
                        Verify / Inspect
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Project Moderation Tab */}
      {activeAdminTab === 'projects' && (
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-base">Project Moderation</h3>
            <span className="text-xs text-slate-500 font-medium">{projects.length} Active Listings</span>
          </div>

          <div className="divide-y divide-slate-100">
            {projects.map(p => (
              <div key={p.id} className="p-6 flex items-center justify-between gap-4 hover:bg-slate-50/50">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                      {p.category}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-500">
                      Posted by {p.clientName} ({p.location})
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">{p.title}</h4>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-1">{p.description}</p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs font-bold text-slate-900">
                    ${p.rate} {p.type === 'Hourly' ? '/hr' : 'Fixed'}
                  </span>
                  <button
                    onClick={() => deleteProject(p.id)}
                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                    title="Moderate / Delete Job"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
