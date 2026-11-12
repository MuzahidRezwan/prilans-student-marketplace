import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Users,
  Search,
  Star,
  GraduationCap,
  Sparkles,
  ExternalLink,
  Mail,
  DollarSign,
  Award
} from 'lucide-react';

export default function FindStudentsPage() {
  const { users, sendMessage, setCurrentView } = useApp();

  const [search, setSearch] = useState('');
  const [levelFilter, setLevelFilter] = useState('All');

  const students = users.filter(u => u.role === 'student');

  const filteredStudents = students.filter(student => {
    if (search.trim()) {
      const q = search.toLowerCase();
      const nameMatch = student.name.toLowerCase().includes(q);
      const skillMatch = (student.skills || []).some(s => s.toLowerCase().includes(q));
      const uniMatch = (student.university || '').toLowerCase().includes(q);
      const deptMatch = (student.department || '').toLowerCase().includes(q);
      if (!nameMatch && !skillMatch && !uniMatch && !deptMatch) return false;
    }

    if (levelFilter !== 'All') {
      if ((student.experienceLevel || '').toLowerCase() !== levelFilter.toLowerCase()) {
        return false;
      }
    }

    return true;
  });

  const handleContact = (student) => {
    sendMessage({
      toId: student.id,
      toName: student.name,
      projectTitle: 'Direct Talent Inquiry',
      content: `Hello ${student.name}! We were impressed by your student profile and skills on Prilans. We would love to discuss an upcoming project opportunity with you.`
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Find Student Freelancers & University Talent
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Connect with skilled university students specializing in web development, UI/UX, graphic design, and software engineering.
          </p>
        </div>

        {/* Filter controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by skill or university..."
              className="pl-9 pr-3 py-2 text-xs font-medium bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none w-full sm:w-64"
            />
          </div>

          <select
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value)}
            className="px-3 py-2 text-xs font-semibold bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="All">All Levels</option>
            <option value="Entry Level">Entry Level</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Expert">Expert</option>
          </select>
        </div>
      </div>

      {/* Student Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStudents.map(student => (
          <div
            key={student.id}
            className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              {/* Top Avatar & Rating */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <img
                    src={student.avatar}
                    alt={student.name}
                    className="w-14 h-14 rounded-2xl object-cover ring-2 ring-blue-50 shadow-xs"
                  />
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-base">{student.name}</h3>
                    <p className="text-xs text-slate-500">{student.headline || 'Student Developer'}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-xs font-black text-amber-600 bg-amber-50 px-2.5 py-1 rounded-xl border border-amber-200">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  <span>{student.rating || 5.0}</span>
                </div>
              </div>

              {/* University details */}
              <div className="text-xs text-slate-600 mb-3 space-y-1">
                <div className="flex items-center gap-1.5 font-medium">
                  <GraduationCap className="w-4 h-4 text-blue-600 shrink-0" />
                  <span className="truncate">{student.university}</span>
                </div>
                <div className="text-[11px] text-slate-400 pl-5">
                  {student.department} · {student.experienceLevel || 'Intermediate'}
                </div>
              </div>

              {/* Bio summary */}
              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                {student.bio}
              </p>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {(student.skills || []).slice(0, 5).map(skill => (
                  <span
                    key={skill}
                    className="text-[10px] font-semibold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg"
                  >
                    {skill}
                  </span>
                ))}
                {(student.skills || []).length > 5 && (
                  <span className="text-[10px] font-semibold bg-slate-100 text-slate-500 px-2 py-1 rounded-lg">
                    +{(student.skills || []).length - 5}
                  </span>
                )}
              </div>
            </div>

            {/* Bottom: Rate & Contact Button */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Rate</span>
                <span className="text-base font-black text-slate-900">${student.hourlyRate || 20}/hr</span>
              </div>

              <button
                onClick={() => handleContact(student)}
                className="px-4 py-2 bg-slate-900 hover:bg-blue-600 text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Contact Student</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
