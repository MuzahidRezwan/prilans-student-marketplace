import React from 'react';
import { useApp } from '../context/AppContext';
import { getRecommendedStudentsForProject } from '../utils/matchingAlgorithm';
import {
  X,
  Sparkles,
  Award,
  Star,
  CheckCircle2,
  Mail,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  UserCheck
} from 'lucide-react';

export default function TalentMatcherModal() {
  const {
    selectedProject,
    setActiveModal,
    users,
    sendMessage,
    setCurrentView,
    setSelectedStudent
  } = useApp();

  if (!selectedProject) return null;

  const students = users.filter(u => u.role === 'student');
  const matchedStudents = getRecommendedStudentsForProject(selectedProject, students);

  const handleInvite = (student) => {
    sendMessage({
      toId: student.id,
      toName: student.name,
      projectTitle: selectedProject.title,
      content: `Hello ${student.name}! We saw your profile and skills in ${selectedProject.requiredSkills.slice(0, 3).join(', ')}. We would love to invite you to apply for our project "${selectedProject.title}".`
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-white">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span className="text-[10px] font-bold tracking-wider uppercase text-amber-300 bg-amber-400/20 px-2 py-0.5 rounded border border-amber-300/30">
                Bonus Challenge (5 Marks): AI Skill Talent Matcher
              </span>
            </div>
            <h2 className="text-xl font-extrabold text-white mt-1">
              Recommended Students for "{selectedProject.title}"
            </h2>
            <p className="text-xs text-slate-300 mt-1">
              Matching university students against required skills: {selectedProject.requiredSkills.join(', ')}
            </p>
          </div>

          <button
            onClick={() => setActiveModal(null)}
            className="p-1.5 text-slate-300 hover:text-white rounded-full hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content List */}
        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto bg-slate-50/50">
          <div className="bg-white p-3.5 rounded-xl border border-purple-100 flex items-center justify-between text-xs text-purple-900">
            <span className="font-semibold">
              Algorithm: 60% Skill Overlap + 20% Verified Student Rating + 20% Portfolio Activity
            </span>
            <span className="font-bold bg-purple-100 px-2 py-0.5 rounded-md">
              {matchedStudents.length} Students Evaluated
            </span>
          </div>

          {matchedStudents.map(({ student, matchScore, compositeScore, matchedSkills, missingSkills, recommendationReason }, index) => {
            return (
              <div
                key={student.id}
                className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-purple-300 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                {/* Left: Avatar & Bio */}
                <div className="flex items-start gap-4">
                  <div className="relative shrink-0">
                    <img
                      src={student.avatar}
                      alt={student.name}
                      className="w-13 h-13 rounded-2xl object-cover ring-2 ring-purple-100"
                    />
                    <span className="absolute -top-1.5 -left-1.5 w-5 h-5 bg-purple-600 text-white rounded-full text-[10px] font-black flex items-center justify-center">
                      #{index + 1}
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-slate-900 text-base">{student.name}</h4>
                      <span className="flex items-center gap-0.5 text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                        <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                        <span>{student.rating || 5.0}</span>
                      </span>
                    </div>

                    <p className="text-xs text-slate-500 mt-0.5">
                      {student.university} · {student.department}
                    </p>

                    {/* Recommendation reason */}
                    <p className="text-xs font-medium text-purple-800 mt-2 bg-purple-50/60 px-2.5 py-1 rounded-lg border border-purple-100">
                      {recommendationReason}
                    </p>

                    {/* Matched skills chips */}
                    <div className="flex flex-wrap gap-1.5 mt-2.5">
                      {matchedSkills.map(s => (
                        <span key={s} className="text-[10px] font-semibold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-md border border-emerald-200">
                          ✓ {s}
                        </span>
                      ))}
                      {missingSkills.map(s => (
                        <span key={s} className="text-[10px] bg-slate-100 text-slate-400 px-2 py-0.5 rounded-md">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right: Score & Actions */}
                <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-3 shrink-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                  <div className="text-left sm:text-right">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      Match Compatibility
                    </span>
                    <span className="text-2xl font-black text-purple-700">
                      {compositeScore}%
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleInvite(student)}
                      className="px-3.5 py-2 bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-1.5"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Invite to Project</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 flex items-center justify-end bg-slate-50">
          <button
            onClick={() => setActiveModal(null)}
            className="px-5 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-200 rounded-xl transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
