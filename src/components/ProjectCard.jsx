import React from 'react';
import { useApp } from '../context/AppContext';
import { calculateMatchScore } from '../utils/matchingAlgorithm';
import {
  CheckCircle2,
  Clock,
  MapPin,
  MoreVertical,
  Bookmark,
  DollarSign,
  FileText,
  Sparkles,
  ExternalLink,
  Users
} from 'lucide-react';

export default function ProjectCard({ project }) {
  const {
    currentUser,
    applications,
    setSelectedProject,
    setActiveModal
  } = useApp();

  // Check if student has applied
  const existingApp = applications.find(
    a => a.projectId === project.id && a.studentId === currentUser.id
  );

  // Skill match calculation for students
  const matchResult = currentUser.role === 'student'
    ? calculateMatchScore(currentUser.skills || [], project.requiredSkills || [])
    : null;

  const handleOpenDetails = () => {
    setSelectedProject(project);
    setActiveModal('projectDetails');
  };

  const handleApplyClick = (e) => {
    e.stopPropagation();
    if (existingApp) return;
    setSelectedProject(project);
    setActiveModal('apply');
  };

  const handleTalentMatchClick = (e) => {
    e.stopPropagation();
    setSelectedProject(project);
    setActiveModal('talentMatcher');
  };

  const levelColor =
    project.experienceLevel === 'Entry Level' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
    project.experienceLevel === 'Intermediate' ? 'bg-blue-50 text-blue-700 border-blue-200' :
    'bg-purple-50 text-purple-700 border-purple-200';

  return (
    <div
      onClick={handleOpenDetails}
      className="bg-white border border-slate-200/80 hover:border-blue-400 rounded-2xl p-5 sm:p-6 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group relative"
    >
      <div>
        {/* Top Meta Header */}
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <div className="flex items-center gap-2">
            <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${levelColor}`}>
              {project.experienceLevel}
            </span>
            {matchResult && matchResult.score >= 50 && (
              <span className="flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-100 to-orange-100 text-orange-800 border border-orange-200">
                <Sparkles className="w-3 h-3 text-orange-600" />
                <span>{matchResult.score}% Match</span>
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>{project.postedTime}</span>
            <button
              onClick={(e) => { e.stopPropagation(); }}
              className="text-slate-400 hover:text-slate-600 p-0.5"
            >
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Project Title */}
        <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2">
          {project.title}
        </h3>

        {/* Client & Location Row */}
        <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-slate-500 mt-2 mb-3">
          <div className="flex items-center gap-1 text-slate-700 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span>Verified</span>
          </div>

          <div className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>{project.location}</span>
          </div>

          <div className="flex items-center gap-1 text-slate-600">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>{project.hiringStatus}</span>
          </div>
        </div>

        {/* Description Excerpt */}
        <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed mb-4">
          {project.description}
        </p>

        {/* Skills Tag Pills (Matching Image 2) */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.requiredSkills.map(skill => {
            const isMatched = matchResult?.matchedSkills?.some(
              s => s.toLowerCase() === skill.toLowerCase()
            );
            return (
              <span
                key={skill}
                className={`text-[11px] font-medium px-2.5 py-1 rounded-lg transition-colors ${
                  isMatched
                    ? 'bg-blue-100/80 text-blue-800 font-semibold border border-blue-200'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {skill}
              </span>
            );
          })}
        </div>
      </div>

      {/* Card Footer: Rate, Proposals & Apply Button */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
        {/* Price & Proposals */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
          <div className="text-sm sm:text-base font-extrabold text-slate-900">
            {project.type === 'Hourly' ? (
              <span>${project.rate.toFixed(2)}<span className="text-xs font-normal text-slate-500">/hour</span></span>
            ) : (
              <span>${project.rate.toFixed(0)} <span className="text-xs font-normal text-slate-500">Fixed</span></span>
            )}
          </div>

          <div className="flex items-center gap-1 text-xs text-slate-500">
            <FileText className="w-3.5 h-3.5 text-slate-400" />
            <span>{project.proposalsCount} proposals</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-2">
          {/* Bonus Challenge Quick Trigger for Clients / Admins */}
          {(currentUser.role === 'client' || currentUser.role === 'admin') && (
            <button
              onClick={handleTalentMatchClick}
              title="Bonus Challenge: AI Student Matching Mechanism"
              className="px-2.5 py-2 text-xs font-semibold bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200 rounded-xl transition-all flex items-center gap-1"
            >
              <Users className="w-3.5 h-3.5 text-purple-600" />
              <span className="hidden xl:inline">Talent Match</span>
            </button>
          )}

          {existingApp ? (
            <span className="px-4 py-2 bg-slate-100 text-slate-500 text-xs font-semibold rounded-xl border border-slate-200 cursor-default">
              Applied ({existingApp.status})
            </span>
          ) : (
            <button
              onClick={handleApplyClick}
              className="px-5 py-2 bg-slate-900 hover:bg-blue-600 text-white text-xs font-semibold rounded-xl transition-all shadow-xs cursor-pointer"
            >
              Apply Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
