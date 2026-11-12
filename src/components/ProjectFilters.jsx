import React from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, RotateCcw, Filter, Check } from 'lucide-react';

const CATEGORIES = [
  'All',
  'Web Development',
  'UI/UX Design',
  'Graphic Design',
  'AI & Data Science',
  'Mobile App Development',
  'Content Writing',
  'WordPress'
];

const EXPERIENCE_LEVELS = [
  { label: 'Any', count: 2450 },
  { label: 'Entry Level', count: 930 },
  { label: 'Intermediate', count: 1150 },
  { label: 'Expert', count: 370 },
];

const BUDGET_RANGES = [
  { label: 'Any', count: 865 },
  { label: 'Less than $100', count: 245 },
  { label: '$100 to $500', count: 191 },
  { label: '$500 to $1k', count: 78 },
  { label: '$1k to $5k', count: 20 },
  { label: '$5k+', count: 8 },
];

const PROPOSAL_RANGES = [
  { label: 'Any', count: 'All' },
  { label: 'Less than 5', count: 12 },
  { label: '5 to 10', count: 8 },
  { label: '10 to 15', count: 7 },
  { label: '15 to 20', count: 9 },
];

export default function ProjectFilters() {
  const { filters, setFilters, currentUser } = useApp();

  const resetFilters = () => {
    setFilters({
      searchQuery: '',
      location: '',
      category: 'All',
      experienceLevel: 'Any',
      projectType: 'All',
      budgetRange: 'Any',
      proposalsRange: 'Any',
      sortBy: 'Newest',
      viewMode: filters.viewMode,
    });
  };

  const isStudent = currentUser.role === 'student';

  return (
    <div className="w-full lg:w-72 bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs shrink-0 self-start">
      {/* Filter Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-700" />
          <h3 className="font-bold text-slate-900 text-base">Filters</h3>
        </div>
        <button
          onClick={resetFilters}
          className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
        >
          Reset
        </button>
      </div>

      {/* Advanced Feature 1: Skill-based Recommendation Toggle */}
      {isStudent && (
        <div className="mt-4 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-blue-600 shrink-0" />
              <span className="text-xs font-bold text-blue-900">Skill Match Filter</span>
            </div>
            <span className="text-[9px] bg-blue-200 text-blue-800 font-extrabold px-1.5 py-0.5 rounded">
              5 MARKS
            </span>
          </div>
          <p className="text-[11px] text-blue-700 mt-1 mb-2">
            Match jobs against your <strong>{currentUser.skills ? currentUser.skills.length : 0} skills</strong>.
          </p>
          <button
            onClick={() => {
              setFilters(prev => ({
                ...prev,
                sortBy: prev.sortBy === 'Best Skill Match' ? 'Newest' : 'Best Skill Match'
              }));
            }}
            className={`w-full py-1.5 px-3 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
              filters.sortBy === 'Best Skill Match'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white border border-blue-200 text-blue-700 hover:bg-blue-50'
            }`}
          >
            {filters.sortBy === 'Best Skill Match' ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Showing Top Matches First</span>
              </>
            ) : (
              <span>Sort By Best Skill Match</span>
            )}
          </button>
        </div>
      )}

      {/* Category Filter */}
      <div className="py-4 border-b border-slate-100">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
          Category
        </label>
        <select
          value={filters.category}
          onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
          className="w-full text-sm font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {CATEGORIES.map(cat => (
            <option key={cat} value={cat}>
              {cat === 'All' ? 'Select category (All)' : cat}
            </option>
          ))}
        </select>
      </div>

      {/* Experience Level */}
      <div className="py-4 border-b border-slate-100">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
          Experience Level
        </label>
        <div className="space-y-2">
          {EXPERIENCE_LEVELS.map(level => {
            const isChecked = filters.experienceLevel === level.label;
            return (
              <label
                key={level.label}
                className="flex items-center justify-between text-xs font-medium text-slate-700 hover:text-slate-900 cursor-pointer group"
              >
                <div className="flex items-center gap-2.5">
                  <input
                    type="radio"
                    name="experienceLevel"
                    checked={isChecked}
                    onChange={() => setFilters(prev => ({ ...prev, experienceLevel: level.label }))}
                    className="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500 cursor-pointer"
                  />
                  <span>{level.label}</span>
                </div>
                <span className="text-[11px] text-slate-400 group-hover:text-slate-600">
                  {level.count}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Project Type */}
      <div className="py-4 border-b border-slate-100">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
          Project Type
        </label>
        <div className="grid grid-cols-2 gap-2 mb-3">
          <button
            onClick={() => setFilters(prev => ({ ...prev, projectType: prev.projectType === 'Hourly' ? 'All' : 'Hourly' }))}
            className={`py-1.5 px-3 rounded-lg text-xs font-semibold text-center transition-all ${
              filters.projectType === 'Hourly'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            Hourly
          </button>
          <button
            onClick={() => setFilters(prev => ({ ...prev, projectType: prev.projectType === 'Fixed Price' ? 'All' : 'Fixed Price' }))}
            className={`py-1.5 px-3 rounded-lg text-xs font-semibold text-center transition-all ${
              filters.projectType === 'Fixed Price'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            Fixed Price
          </button>
        </div>

        {/* Budget Ranges */}
        <div className="space-y-2">
          {BUDGET_RANGES.map(range => {
            const isChecked = filters.budgetRange === range.label;
            return (
              <label
                key={range.label}
                className="flex items-center justify-between text-xs font-medium text-slate-700 hover:text-slate-900 cursor-pointer group"
              >
                <div className="flex items-center gap-2.5">
                  <input
                    type="radio"
                    name="budgetRange"
                    checked={isChecked}
                    onChange={() => setFilters(prev => ({ ...prev, budgetRange: range.label }))}
                    className="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500 cursor-pointer"
                  />
                  <span>{range.label}</span>
                </div>
                <span className="text-[11px] text-slate-400 group-hover:text-slate-600">
                  {range.count}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Number of Proposals */}
      <div className="pt-4">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
          Number of Proposals
        </label>
        <div className="space-y-2">
          {PROPOSAL_RANGES.map(prop => {
            const isChecked = filters.proposalsRange === prop.label;
            return (
              <label
                key={prop.label}
                className="flex items-center justify-between text-xs font-medium text-slate-700 hover:text-slate-900 cursor-pointer group"
              >
                <div className="flex items-center gap-2.5">
                  <input
                    type="radio"
                    name="proposalsRange"
                    checked={isChecked}
                    onChange={() => setFilters(prev => ({ ...prev, proposalsRange: prop.label }))}
                    className="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500 cursor-pointer"
                  />
                  <span>{prop.label}</span>
                </div>
                <span className="text-[11px] text-slate-400 group-hover:text-slate-600">
                  {prop.count}
                </span>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
}
