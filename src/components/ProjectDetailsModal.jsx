import React from 'react';
import { useApp } from '../context/AppContext';
import { calculateMatchScore } from '../utils/matchingAlgorithm';
import {
  X,
  CheckCircle2,
  MapPin,
  Clock,
  DollarSign,
  FileText,
  Sparkles,
  Award,
  Users,
  Send,
  Building,
  Check
} from 'lucide-react';

export default function ProjectDetailsModal() {
  const {
    selectedProject,
    setSelectedProject,
    setActiveModal,
    currentUser,
    applications,
    deleteProject
  } = useApp();

  if (!selectedProject) return null;

  const existingApp = applications.find(
    a => a.projectId === selectedProject.id && a.studentId === currentUser.id
  );

  const match = currentUser.role === 'student'
    ? calculateMatchScore(currentUser.skills || [], selectedProject.requiredSkills || [])
    : null;

  const handleApply = () => {
    setActiveModal('apply');
  };

  const handleOpenTalentMatch = () => {
    setActiveModal('talentMatcher');
  };

  const isOwner = selectedProject.clientId === currentUser.id || currentUser.role === 'admin';

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-start justify-between gap-4 bg-slate-50/50">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700">
                {selectedProject.category}
              </span>
              <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                {selectedProject.experienceLevel}
              </span>
              <span className="text-xs text-slate-400">
                Posted {selectedProject.postedTime}
              </span>
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 leading-tight">
              {selectedProject.title}
            </h2>
          </div>

          <button
            onClick={() => { setSelectedProject(null); setActiveModal(null); }}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Client & Budget Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <div>
              <span className="block text-xs text-slate-400 font-medium">Budget / Rate</span>
              <span className="text-base font-extrabold text-slate-900">
                {selectedProject.type === 'Hourly' ? `$${selectedProject.rate}/hr` : `$${selectedProject.rate} Fixed`}
              </span>
            </div>

            <div>
              <span className="block text-xs text-slate-400 font-medium">Project Duration</span>
              <span className="text-sm font-bold text-slate-800">
                {selectedProject.deadline || '2-4 weeks'}
              </span>
            </div>

            <div>
              <span className="block text-xs text-slate-400 font-medium">Client Location</span>
              <span className="text-sm font-bold text-slate-800 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                {selectedProject.location}
              </span>
            </div>

            <div>
              <span className="block text-xs text-slate-400 font-medium">Proposals Received</span>
              <span className="text-sm font-bold text-blue-600">
                {selectedProject.proposalsCount} applications
              </span>
            </div>
          </div>

          {/* Skill-Based Recommendation Score (Advanced Feature 1) */}
          {match && (
            <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-blue-600" />
                  <h4 className="text-sm font-bold text-blue-900">
                    Skill Match Compatibility Analysis
                  </h4>
                </div>
                <span className="text-sm font-extrabold text-blue-700 bg-white px-2.5 py-1 rounded-full border border-blue-200">
                  {match.score}% Matched
                </span>
              </div>
              <p className="text-xs text-blue-800 leading-relaxed mb-3">
                {match.score >= 70
                  ? "🎉 You have high overlap with this project's technical requirements! Applying is strongly recommended."
                  : "💡 You have some matching skills. Review the missing tags below to see if your experience aligns."}
              </p>

              <div className="flex flex-wrap gap-2 text-xs">
                {match.matchedSkills.map(s => (
                  <span key={s} className="flex items-center gap-1 bg-emerald-100 text-emerald-800 font-semibold px-2.5 py-1 rounded-lg">
                    <Check className="w-3.5 h-3.5" />
                    {s} (Matched)
                  </span>
                ))}
                {match.missingSkills.map(s => (
                  <span key={s} className="bg-slate-200/70 text-slate-700 px-2.5 py-1 rounded-lg">
                    {s} (Learn/Missing)
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Detailed Job Description */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-2">
              Project Overview & Requirements
            </h4>
            <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
              {selectedProject.description}
            </p>
          </div>

          {/* Required Skills */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-2.5">
              Required Skills & Technologies
            </h4>
            <div className="flex flex-wrap gap-2">
              {selectedProject.requiredSkills.map(skill => (
                <span
                  key={skill}
                  className="bg-slate-100 text-slate-800 font-medium text-xs px-3 py-1.5 rounded-xl border border-slate-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Client Bio & Verification */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-200 flex items-center justify-center font-bold text-slate-700">
                <Building className="w-5 h-5 text-slate-600" />
              </div>
              <div>
                <h5 className="text-sm font-bold text-slate-900">{selectedProject.clientName}</h5>
                <p className="text-xs text-slate-500 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                  Payment Verified Client · {selectedProject.location}
                </p>
              </div>
            </div>

            {/* Bonus matching trigger for clients/instructors */}
            <button
              onClick={handleOpenTalentMatch}
              className="text-xs font-semibold px-3 py-2 rounded-xl bg-purple-50 text-purple-700 border border-purple-200 hover:bg-purple-100 transition-colors flex items-center gap-1.5"
            >
              <Users className="w-4 h-4 text-purple-600" />
              <span>AI Student Matcher</span>
            </button>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-5 border-t border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            {isOwner && (
              <button
                onClick={() => {
                  deleteProject(selectedProject.id);
                  setSelectedProject(null);
                  setActiveModal(null);
                }}
                className="text-xs font-semibold text-rose-600 hover:text-rose-700"
              >
                Delete / Moderate Job
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => { setSelectedProject(null); setActiveModal(null); }}
              className="px-5 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
            >
              Close
            </button>

            {existingApp ? (
              <div className="px-5 py-2.5 bg-slate-200 text-slate-600 text-xs font-semibold rounded-xl">
                Proposal Submitted ({existingApp.status})
              </div>
            ) : (
              <button
                onClick={handleApply}
                className="px-6 py-2.5 bg-slate-900 hover:bg-blue-600 text-white text-xs font-semibold rounded-xl transition-all shadow-sm flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Apply for this Project</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
