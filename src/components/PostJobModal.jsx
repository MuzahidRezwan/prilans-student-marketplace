import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  PlusCircle,
  Briefcase,
  DollarSign,
  Clock,
  Layers,
  Sparkles,
  Trash2
} from 'lucide-react';

const CATEGORIES = [
  'Web Development',
  'UI/UX Design',
  'Graphic Design',
  'AI & Data Science',
  'Mobile App Development',
  'Content Writing',
  'WordPress'
];

const COMMON_SKILLS = [
  'React',
  'Figma',
  'UI Design',
  'Web Design',
  'Landing Page',
  'Web Development',
  'WordPress',
  'Graphic Design',
  'Python',
  'Tailwind CSS',
  'Logo Design',
  'Prototyping',
  'Data Visualization'
];

export default function PostJobModal() {
  const { setActiveModal, createProject, currentUser, setCurrentView } = useApp();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Web Development');
  const [experienceLevel, setExperienceLevel] = useState('Entry Level');
  const [type, setType] = useState('Hourly');
  const [rate, setRate] = useState(20);
  const [deadline, setDeadline] = useState('2 weeks');
  const [description, setDescription] = useState('');
  const [selectedSkills, setSelectedSkills] = useState(['Web Design', 'UI Design']);
  const [customSkillInput, setCustomSkillInput] = useState('');

  const handleAddSkill = (skill) => {
    if (!skill.trim()) return;
    if (!selectedSkills.includes(skill.trim())) {
      setSelectedSkills(prev => [...prev, skill.trim()]);
    }
    setCustomSkillInput('');
  };

  const handleRemoveSkill = (skill) => {
    setSelectedSkills(prev => prev.filter(s => s !== skill));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedSkills.length === 0) {
      alert('Please add at least one required skill.');
      return;
    }

    const budgetRange =
      Number(rate) < 100 ? 'Less than $100' :
      Number(rate) <= 500 ? '$100 to $500' :
      Number(rate) <= 1000 ? '$500 to $1k' :
      '$1k to $5k';

    createProject({
      title,
      category,
      experienceLevel,
      type,
      rate: Number(rate),
      budgetRange,
      deadline,
      description,
      requiredSkills: selectedSkills,
    });

    setActiveModal(null);
    setCurrentView('find-projects');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div>
            <span className="text-[10px] font-bold tracking-wider uppercase text-blue-600 bg-blue-100 px-2 py-0.5 rounded">
              Feature: Publish a Project / Job Request (8 Marks)
            </span>
            <h2 className="text-xl font-bold text-slate-900 mt-1">
              Create New Job Request for Students
            </h2>
          </div>
          <button
            onClick={() => setActiveModal(null)}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* Job Title */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
              Project Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Build/Edit Landing Page for Online Course"
              className="w-full px-3.5 py-2.5 text-sm font-semibold text-slate-800 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Category & Experience Level */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm font-semibold text-slate-800 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                {CATEGORIES.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Experience Level Needed
              </label>
              <select
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm font-semibold text-slate-800 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="Entry Level">Entry Level (Great for 1st/2nd yr students)</option>
                <option value="Intermediate">Intermediate (3rd/4th yr students)</option>
                <option value="Expert">Expert (Advanced/Graduating seniors)</option>
              </select>
            </div>
          </div>

          {/* Type, Rate & Deadline */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Payment Type
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm font-semibold text-slate-800 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="Hourly">Hourly Rate</option>
                <option value="Fixed Price">Fixed Price Budget</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                {type === 'Hourly' ? 'Rate ($/hr)' : 'Total Budget ($)'}
              </label>
              <input
                type="number"
                min="5"
                required
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm font-semibold text-slate-800 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Target Deadline
              </label>
              <input
                type="text"
                required
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                placeholder="e.g. 2 weeks"
                className="w-full px-3.5 py-2.5 text-sm font-semibold text-slate-800 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
              Project Description & Scope <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={4}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe deliverables, required tech stack, expectations, and how students will work with your team..."
              className="w-full p-3.5 text-sm text-slate-800 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none leading-relaxed"
            />
          </div>

          {/* Required Skills */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
              Required Skills Tags <span className="text-red-500">*</span>
            </label>

            {/* Selected Skills Chips */}
            <div className="flex flex-wrap gap-2 mb-3">
              {selectedSkills.map(skill => (
                <span
                  key={skill}
                  className="bg-blue-100 text-blue-800 font-semibold text-xs px-3 py-1 rounded-lg flex items-center gap-1.5 border border-blue-200"
                >
                  <span>{skill}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="hover:text-red-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
            </div>

            {/* Custom Skill Input */}
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={customSkillInput}
                onChange={(e) => setCustomSkillInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddSkill(customSkillInput);
                  }
                }}
                placeholder="Type a skill and click Add or press Enter..."
                className="flex-1 px-3 py-2 text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => handleAddSkill(customSkillInput)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold rounded-xl"
              >
                Add Tag
              </button>
            </div>

            {/* Quick Suggestions */}
            <div className="flex flex-wrap gap-1.5">
              <span className="text-[11px] text-slate-400 py-0.5">Quick add:</span>
              {COMMON_SKILLS.map(skill => (
                <button
                  type="button"
                  key={skill}
                  onClick={() => handleAddSkill(skill)}
                  className="text-[11px] bg-slate-100 hover:bg-slate-200 text-slate-700 px-2 py-0.5 rounded-md transition-colors"
                >
                  +{skill}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setActiveModal(null)}
              className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-sm transition-all flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Publish Project</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
