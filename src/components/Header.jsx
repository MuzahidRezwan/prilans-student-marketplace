import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Search,
  MapPin,
  X,
  Sparkles,
  PlusCircle,
  RotateCcw,
  User,
  GraduationCap,
  LogIn
} from 'lucide-react';

export default function Header() {
  const {
    filters,
    setFilters,
    currentUser,
    setActiveModal,
    setCurrentView,
    resetDemoData
  } = useApp();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setCurrentView('find-projects');
  };

  const clearSearch = () => {
    setFilters(prev => ({ ...prev, searchQuery: '' }));
  };

  return (
    <div className="bg-white border-b border-slate-200">
      {/* Top University Course Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white px-6 py-2 flex flex-wrap items-center justify-between text-xs font-medium border-b border-slate-800">
        <div className="flex items-center gap-2">
          <GraduationCap className="w-4 h-4 text-blue-400" />
          <span className="text-slate-200">
            <strong>SE331:</strong> Software Engineering Design Capstone Project — Assessment 2 (150 min)
          </span>
          <span className="hidden md:inline bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full text-[10px] font-semibold border border-blue-400/30">
            Full 88/88 Marks Architecture
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Prominent Login / Register Button */}
          <button
            onClick={() => setCurrentView('auth')}
            className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg text-xs font-bold transition-all shadow-xs"
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Login / Register (8m)</span>
          </button>
          <span className="text-slate-600">|</span>
          <button
            onClick={resetDemoData}
            title="Reset to default seed state"
            className="flex items-center gap-1 text-slate-400 hover:text-amber-300 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset Demo</span>
          </button>
        </div>
      </div>

      {/* Main Hero Header (Exact layout from Image 2 Mockup!) */}
      <div className="px-8 py-8 max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Find Millions of Projects Here!
          </h1>
          <p className="text-slate-500 text-sm sm:text-base mt-1.5">
            Explore our newest project opportunities and apply for the top positions available today.
          </p>
        </div>

        {/* Search Bar Container */}
        <form onSubmit={handleSearchSubmit} className="bg-white border border-slate-300/80 rounded-2xl shadow-sm p-2 flex flex-col md:flex-row items-stretch gap-2 transition-all focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
          {/* Keyword Search */}
          <div className="flex-1 flex items-center gap-3 px-3 py-1.5">
            <Search className="w-5 h-5 text-slate-400 shrink-0" />
            <input
              type="text"
              value={filters.searchQuery}
              onChange={(e) => setFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
              placeholder="Web Design, React, Figma, WordPress, Python..."
              className="w-full text-sm font-medium text-slate-800 placeholder-slate-400 bg-transparent focus:outline-none"
            />
            {filters.searchQuery && (
              <button
                type="button"
                onClick={clearSearch}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="hidden md:block w-px bg-slate-200 my-1 self-stretch" />

          {/* Location / Remote Filter */}
          <div className="w-full md:w-64 flex items-center gap-2.5 px-3 py-1.5">
            <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
            <input
              type="text"
              value={filters.location}
              onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
              placeholder="City, state, or country..."
              className="w-full text-sm font-medium text-slate-800 placeholder-slate-400 bg-transparent focus:outline-none"
            />
          </div>

          {/* Submit Button (Matching dark button in Image 2) */}
          <button
            type="submit"
            className="bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white font-semibold text-sm px-7 py-3 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 shrink-0 cursor-pointer"
          >
            <span>Find Projects</span>
          </button>
        </form>
      </div>
    </div>
  );
}
