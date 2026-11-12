import React from 'react';
import { useApp } from '../context/AppContext';
import ProjectFilters from '../components/ProjectFilters';
import ProjectCard from '../components/ProjectCard';
import { calculateMatchScore } from '../utils/matchingAlgorithm';
import {
  LayoutGrid,
  List,
  ChevronDown,
  Sparkles,
  Inbox,
  ArrowUpDown
} from 'lucide-react';

export default function FindProjectsPage() {
  const {
    projects,
    filters,
    setFilters,
    currentUser
  } = useApp();

  // Filter projects based on active filters
  const filteredProjects = projects.filter(project => {
    // 1. Keyword / Search
    if (filters.searchQuery.trim()) {
      const q = filters.searchQuery.toLowerCase();
      const titleMatch = project.title.toLowerCase().includes(q);
      const descMatch = project.description.toLowerCase().includes(q);
      const skillMatch = project.requiredSkills.some(s => s.toLowerCase().includes(q));
      const clientMatch = project.clientName.toLowerCase().includes(q);
      if (!titleMatch && !descMatch && !skillMatch && !clientMatch) return false;
    }

    // 2. Location
    if (filters.location.trim()) {
      const locQ = filters.location.toLowerCase();
      if (!project.location.toLowerCase().includes(locQ)) return false;
    }

    // 3. Category
    if (filters.category !== 'All') {
      if (project.category !== filters.category) return false;
    }

    // 4. Experience Level
    if (filters.experienceLevel !== 'Any') {
      if (project.experienceLevel !== filters.experienceLevel) return false;
    }

    // 5. Project Type
    if (filters.projectType !== 'All') {
      if (project.type !== filters.projectType) return false;
    }

    // 6. Budget Range
    if (filters.budgetRange !== 'Any') {
      const rate = project.rate;
      if (filters.budgetRange === 'Less than $100' && rate >= 100) return false;
      if (filters.budgetRange === '$100 to $500' && (rate < 100 || rate > 500)) return false;
      if (filters.budgetRange === '$500 to $1k' && (rate < 500 || rate > 1000)) return false;
      if (filters.budgetRange === '$1k to $5k' && (rate < 1000 || rate > 5000)) return false;
      if (filters.budgetRange === '$5k+' && rate < 5000) return false;
    }

    // 7. Proposals Range
    if (filters.proposalsRange !== 'Any') {
      const count = project.proposalsCount || 0;
      if (filters.proposalsRange === 'Less than 5' && count >= 5) return false;
      if (filters.proposalsRange === '5 to 10' && (count < 5 || count > 10)) return false;
      if (filters.proposalsRange === '10 to 15' && (count < 10 || count > 15)) return false;
      if (filters.proposalsRange === '15 to 20' && (count < 15 || count > 20)) return false;
    }

    return true;
  });

  // Sort logic
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (filters.sortBy === 'Best Skill Match' && currentUser.skills) {
      const scoreA = calculateMatchScore(currentUser.skills, a.requiredSkills).score;
      const scoreB = calculateMatchScore(currentUser.skills, b.requiredSkills).score;
      return scoreB - scoreA;
    }
    if (filters.sortBy === 'Highest Budget') {
      return b.rate - a.rate;
    }
    if (filters.sortBy === 'Most Proposals') {
      return (b.proposalsCount || 0) - (a.proposalsCount || 0);
    }
    // Default: Newest (by id or order)
    return b.id.localeCompare(a.id);
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6">
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Left Filter Sidebar (Matching Image 2) */}
        <ProjectFilters />

        {/* Right Main Content Area */}
        <div className="flex-1 w-full">
          {/* Results Bar Header (Exact UI from Image 2!) */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 mb-5 border-b border-slate-200/80 gap-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                Showing Results <span className="text-slate-400 font-normal">({sortedProjects.length})</span>
              </h2>
              {filters.sortBy === 'Best Skill Match' && (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-blue-700 mt-0.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Sorted by compatibility with your registered skills
                </span>
              )}
            </div>

            <div className="flex items-center gap-3">
              {/* Sort By Dropdown */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 font-medium">Sort by:</span>
                <select
                  value={filters.sortBy}
                  onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
                  className="text-xs font-bold text-slate-800 bg-white border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer shadow-xs"
                >
                  <option value="Newest">Newest</option>
                  <option value="Best Skill Match">Best Skill Match (5m)</option>
                  <option value="Highest Budget">Highest Budget</option>
                  <option value="Most Proposals">Most Proposals</option>
                </select>
              </div>

              {/* View Toggle Buttons (List / Grid icons from Image 2) */}
              <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
                <button
                  onClick={() => setFilters(prev => ({ ...prev, viewMode: 'list' }))}
                  className={`p-1.5 rounded-lg transition-all ${
                    filters.viewMode === 'list'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-400 hover:text-slate-700'
                  }`}
                  title="List View"
                >
                  <List className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setFilters(prev => ({ ...prev, viewMode: 'grid' }))}
                  className={`p-1.5 rounded-lg transition-all ${
                    filters.viewMode === 'grid'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-400 hover:text-slate-700'
                  }`}
                  title="Grid View"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Projects Cards Container */}
          {sortedProjects.length > 0 ? (
            <div className={`grid gap-4 ${
              filters.viewMode === 'grid'
                ? 'grid-cols-1 md:grid-cols-2'
                : 'grid-cols-1'
            }`}>
              {sortedProjects.map(project => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center shadow-xs">
              <Inbox className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-800">No Projects Found</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-4">
                No active project requests match your current filters. Try resetting or selecting a broader category.
              </p>
              <button
                onClick={() => setFilters(prev => ({
                  ...prev,
                  searchQuery: '',
                  category: 'All',
                  experienceLevel: 'Any',
                  projectType: 'All',
                  budgetRange: 'Any',
                  proposalsRange: 'Any',
                }))}
                className="px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-xl"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
