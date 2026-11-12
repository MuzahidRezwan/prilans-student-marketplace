import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Briefcase,
  PlusCircle,
  Users,
  CheckCircle2,
  Clock,
  Sparkles,
  Award,
  ChevronDown,
  ChevronUp,
  Send,
  MessageSquare,
  Star,
  Check,
  X,
  FileCheck,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';

export default function ClientProjectsPage() {
  const {
    currentUser,
    projects,
    applications,
    updateApplicationStatus,
    setActiveModal,
    setSelectedProject,
    setReviewTargetApp,
    setCurrentView,
    sendMessage
  } = useApp();

  const [expandedProjectId, setExpandedProjectId] = useState(null);

  // ACCESS CONTROL:
  // If the logged-in user is a student, they do not manage client candidates!
  if (currentUser?.role === 'student') {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Access Restricted to Employers</h2>
        <p className="text-sm text-slate-500 max-w-md mx-auto">
          As a registered student, you apply to projects and track your bids in <strong>My Proposals</strong>. Only the employer who posted a job can review and hire candidates.
        </p>
        <button
          onClick={() => setCurrentView('my-proposals')}
          className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all inline-flex items-center gap-2 cursor-pointer"
        >
          <span>Go to My Proposals</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  // STRICT AUTHORIZATION:
  // Clients ONLY see their OWN posted projects! (Admin sees all)
  const isOwnerAdmin = currentUser?.role === 'admin';
  const myProjects = isOwnerAdmin
    ? projects
    : projects.filter(p => p.clientId === currentUser?.id);

  const toggleExpand = (projectId) => {
    setExpandedProjectId(prev => prev === projectId ? null : projectId);
  };

  const handleStatusChange = (app, project, newStatus) => {
    // Verify that the logged-in user is genuinely the owner of this project or admin
    if (!isOwnerAdmin && project.clientId !== currentUser?.id) {
      alert('Unauthorized: You do not have permission to manage candidates for another employer’s project.');
      return;
    }

    updateApplicationStatus(app.id, newStatus, `Project updated to ${newStatus}`);

    // If marked Completed, immediately prompt review modal to rate student!
    if (newStatus === 'Completed') {
      setReviewTargetApp(app);
      setActiveModal('submitReview');
    }
  };

  const handleOpenTalentMatch = (project) => {
    setSelectedProject(project);
    setActiveModal('talentMatcher');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200 gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            My Posted Jobs & Candidate Review
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            {isOwnerAdmin
              ? 'Administrator Overview: Review all posted jobs and candidate proposals across the university platform.'
              : `Employer Dashboard: Managing projects posted by ${currentUser?.name || currentUser?.company}.`}
          </p>
        </div>

        <button
          onClick={() => setActiveModal('postJob')}
          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Post a Project</span>
        </button>
      </div>

      {/* Projects with Candidates List */}
      <div className="space-y-6">
        {myProjects.length > 0 ? (
          myProjects.map(project => {
            const projectApps = applications.filter(a => a.projectId === project.id);
            const isExpanded = expandedProjectId === project.id || projectApps.length > 0;
            const canManageThisProject = isOwnerAdmin || project.clientId === currentUser?.id;

            return (
              <div
                key={project.id}
                className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-6"
              >
                {/* Project Card Summary */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                        {project.category}
                      </span>
                      <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                        {project.experienceLevel}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        Posted by: {project.clientName} ({project.location})
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">{project.title}</h3>
                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <span className="font-bold text-slate-900">
                        ${project.rate} {project.type === 'Hourly' ? '/hr' : 'Fixed'}
                      </span>
                      <span>•</span>
                      <span className="font-bold text-blue-600">{projectApps.length} student proposals</span>
                      <span>•</span>
                      <span className="text-emerald-600 font-semibold">{project.status.toUpperCase()}</span>
                    </div>
                  </div>

                  {/* Right Actions */}
                  <div className="flex items-center gap-2 self-stretch md:self-auto justify-end">
                    <button
                      onClick={() => handleOpenTalentMatch(project)}
                      className="px-3 py-2 bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                      <span>AI Talent Match</span>
                    </button>

                    <button
                      onClick={() => toggleExpand(project.id)}
                      className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                    >
                      <Users className="w-3.5 h-3.5 text-blue-600" />
                      <span>Candidates ({projectApps.length})</span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {/* Received Applications Accordion */}
                {isExpanded && (
                  <div className="space-y-4 pt-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Candidate Proposals for this Job ({projectApps.length})
                    </h4>

                    {projectApps.length > 0 ? (
                      <div className="space-y-4">
                        {projectApps.map(app => (
                          <div
                            key={app.id}
                            className="bg-slate-50 border border-slate-200/90 rounded-2xl p-5 space-y-4 hover:border-blue-300 transition-all"
                          >
                            {/* Student Info & Bid */}
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                              <div className="flex items-center gap-3">
                                <img
                                  src={app.studentAvatar}
                                  alt={app.studentName}
                                  className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-xs"
                                />
                                <div>
                                  <div className="flex items-center gap-2">
                                    <h5 className="font-bold text-slate-900 text-sm">{app.studentName}</h5>
                                    <span className="text-[11px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full">
                                      {app.matchScore || 90}% Match
                                    </span>
                                    <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md ${
                                      app.status === 'Completed' ? 'bg-teal-100 text-teal-800 border border-teal-200' :
                                      app.status === 'Accepted' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' :
                                      app.status === 'Shortlisted' ? 'bg-purple-100 text-purple-800 border border-purple-200' :
                                      'bg-amber-100 text-amber-800 border border-amber-200'
                                    }`}>
                                      ● Status: {app.status}
                                    </span>
                                  </div>
                                  <span className="text-xs text-slate-500">{app.studentEmail}</span>
                                </div>
                              </div>

                              <div className="text-left sm:text-right">
                                <span className="text-sm font-black text-slate-900">
                                  ${app.proposedRate} {app.rateType === 'hourly' ? '/hr' : 'Fixed'}
                                </span>
                                <span className="text-xs text-slate-500 block">
                                  {app.deliveryDays} Days delivery
                                </span>
                              </div>
                            </div>

                            {/* Cover Letter */}
                            <div className="bg-white p-3.5 rounded-xl border border-slate-200/60 text-xs text-slate-700 leading-relaxed">
                              <span className="font-bold text-slate-900 block mb-1">Cover Pitch:</span>
                              "{app.coverLetter}"
                            </div>

                            {/* Attached Portfolio Works */}
                            {app.portfolioSamples && app.portfolioSamples.length > 0 && (
                              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600">
                                <span className="font-semibold text-slate-500">Portfolio attached:</span>
                                {app.portfolioSamples.map(sample => (
                                  <span key={sample} className="bg-white border border-slate-200 px-2.5 py-1 rounded-lg text-slate-700 font-medium">
                                    {sample}
                                  </span>
                                ))}
                              </div>
                            )}

                            {/* Actions Bar with Security Check */}
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-3 border-t border-slate-200/60">
                              <div className="text-xs font-semibold text-slate-500">
                                Applied on {new Date(app.appliedAt).toLocaleDateString()}
                              </div>

                              {/* Only the owner of this job or admin can manage the candidate */}
                              {canManageThisProject ? (
                                <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-end">
                                  <button
                                    onClick={() => handleStatusChange(app, project, 'Shortlisted')}
                                    className="px-3 py-1.5 text-xs font-bold rounded-xl bg-purple-100 hover:bg-purple-200 text-purple-800 transition-colors cursor-pointer"
                                  >
                                    Shortlist
                                  </button>

                                  <button
                                    onClick={() => handleStatusChange(app, project, 'Accepted')}
                                    className="px-3 py-1.5 text-xs font-bold rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-800 transition-colors cursor-pointer"
                                  >
                                    Accept & Hire
                                  </button>

                                  <button
                                    onClick={() => handleStatusChange(app, project, 'Completed')}
                                    className="px-4 py-2 text-xs font-bold rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
                                  >
                                    <Award className="w-4 h-4 text-amber-300" />
                                    <span>Complete Job & Leave Review</span>
                                  </button>

                                  <button
                                    onClick={() => handleStatusChange(app, project, 'Declined')}
                                    className="px-2.5 py-1.5 text-xs font-semibold rounded-xl bg-slate-200 hover:bg-rose-100 hover:text-rose-700 text-slate-600 transition-colors cursor-pointer"
                                  >
                                    Decline
                                  </button>
                                </div>
                              ) : (
                                <span className="text-xs text-slate-400 italic">
                                  Only the hiring client can update candidate status.
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-8 text-center text-xs text-slate-400 italic bg-slate-50 rounded-2xl border border-slate-100">
                        No applications received yet for this project.
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center shadow-xs">
            <Briefcase className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">No Posted Projects Found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-4">
              You haven't posted any projects under this employer account yet.
            </p>
            <button
              onClick={() => setActiveModal('postJob')}
              className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl cursor-pointer"
            >
              Post Your First Project
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
