import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  FileText,
  Clock,
  DollarSign,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Inbox
} from 'lucide-react';

const STATUS_TABS = ['All', 'Submitted', 'In Review', 'Shortlisted', 'Accepted', 'Completed'];

export default function MyProposalsPage() {
  const {
    applications,
    currentUser,
    setSelectedProject,
    setActiveModal,
    projects
  } = useApp();

  const [activeTab, setActiveTab] = useState('All');

  const myApps = applications.filter(a => a.studentId === currentUser?.id);

  const filteredApps = myApps.filter(a => {
    if (activeTab === 'All') return true;
    return a.status.toLowerCase() === activeTab.toLowerCase();
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Accepted':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'Shortlisted':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'In Review':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Completed':
        return 'bg-teal-100 text-teal-800 border-teal-300';
      case 'Declined':
        return 'bg-rose-100 text-rose-800 border-rose-300';
      default:
        return 'bg-amber-100 text-amber-800 border-amber-300';
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200 gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            My Submitted Proposals & Applications
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Track real-time responses, client shortlisting, acceptance, and milestones.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 overflow-x-auto">
          {STATUS_TABS.map(tab => {
            const count = tab === 'All'
              ? myApps.length
              : myApps.filter(a => a.status.toLowerCase() === tab.toLowerCase()).length;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === tab
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {tab} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Applications List */}
      {filteredApps.length > 0 ? (
        <div className="space-y-4">
          {filteredApps.map(app => {
            const project = projects.find(p => p.id === app.projectId);
            return (
              <div
                key={app.id}
                className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs hover:border-blue-400 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
              >
                <div className="space-y-3 flex-1">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className={`text-xs font-black uppercase px-2.5 py-0.5 rounded-full border ${getStatusBadge(app.status)}`}>
                      ● {app.status}
                    </span>
                    <span className="text-xs text-slate-400">
                      Applied {new Date(app.appliedAt).toLocaleDateString()}
                    </span>
                    {app.matchScore && (
                      <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
                        {app.matchScore}% Skill Match
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-slate-900">
                    {app.projectTitle}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-2 italic bg-slate-50 p-3 rounded-xl border border-slate-100">
                    "{app.coverLetter}"
                  </p>

                  {/* Client response feedback */}
                  {app.clientFeedback && (
                    <div className="text-xs text-slate-700 bg-blue-50/70 p-3 rounded-xl border border-blue-200/60 flex items-start gap-2">
                      <Sparkles className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-blue-900">Client Feedback: </span>
                        <span>{app.clientFeedback}</span>
                      </div>
                    </div>
                  )}

                  {/* Attached Portfolios */}
                  {app.portfolioSamples && app.portfolioSamples.length > 0 && (
                    <div className="flex items-center gap-2 text-[11px] text-slate-500">
                      <span className="font-semibold">Attached works:</span>
                      {app.portfolioSamples.map(sample => (
                        <span key={sample} className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-medium">
                          {sample}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Right: Proposal Financials & Action */}
                <div className="flex md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-3 shrink-0 pt-4 md:pt-0 border-t md:border-t-0 border-slate-100">
                  <div className="text-left md:text-right">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      Proposed Bid
                    </span>
                    <span className="text-xl font-extrabold text-slate-900">
                      ${app.proposedRate} {app.rateType === 'hourly' ? '/hr' : 'Fixed'}
                    </span>
                    <span className="text-xs text-slate-500 block">
                      {app.deliveryDays} Days Delivery
                    </span>
                  </div>

                  {project && (
                    <button
                      onClick={() => {
                        setSelectedProject(project);
                        setActiveModal('projectDetails');
                      }}
                      className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-all cursor-pointer"
                    >
                      View Project Specs
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center shadow-xs">
          <Inbox className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">No Proposals in this Status</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-4">
            You haven't submitted any proposals under "{activeTab}". Browse open projects and apply to start collaborating.
          </p>
        </div>
      )}
    </div>
  );
}
