import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  User,
  GraduationCap,
  Award,
  Star,
  Plus,
  Trash2,
  ExternalLink,
  Github,
  DollarSign,
  Clock,
  Sparkles,
  Edit3,
  CheckCircle2,
  Briefcase,
  Layers,
  LogOut
} from 'lucide-react';

export default function StudentProfilePage() {
  const {
    currentUser,
    logoutUser,
    updateUserProfile,
    addPortfolioItem,
    deletePortfolioItem,
    reviews
  } = useApp();

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isAddingPortfolio, setIsAddingPortfolio] = useState(false);

  // Profile Form state
  const [headline, setHeadline] = useState(currentUser?.headline || '');
  const [bio, setBio] = useState(currentUser?.bio || '');
  const [hourlyRate, setHourlyRate] = useState(currentUser?.hourlyRate || 20);
  const [availability, setAvailability] = useState(currentUser?.availability || 'Part-Time (20 hrs/week)');
  const [experienceLevel, setExperienceLevel] = useState(currentUser?.experienceLevel || 'Intermediate');
  const [university, setUniversity] = useState(currentUser?.university || '');
  const [department, setDepartment] = useState(currentUser?.department || '');
  const [studentId, setStudentId] = useState(currentUser?.studentId || '');
  const [newSkill, setNewSkill] = useState('');

  // Portfolio Form state
  const [portTitle, setPortTitle] = useState('');
  const [portCategory, setPortCategory] = useState('Web Development');
  const [portDescription, setPortDescription] = useState('');
  const [portLiveUrl, setPortLiveUrl] = useState('');
  const [portGithubUrl, setPortGithubUrl] = useState('');
  const [portImage, setPortImage] = useState('');
  const [portTags, setPortTags] = useState('React, Tailwind CSS');

  const studentReviews = reviews.filter(r => r.studentId === currentUser?.id);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateUserProfile(currentUser.id, {
      headline,
      bio,
      hourlyRate: Number(hourlyRate),
      availability,
      experienceLevel,
      university,
      department,
      studentId,
    });
    setIsEditingProfile(false);
  };

  const handleAddSkillTag = (e) => {
    e.preventDefault();
    if (!newSkill.trim()) return;
    const current = currentUser?.skills || [];
    if (!current.includes(newSkill.trim())) {
      updateUserProfile(currentUser.id, {
        skills: [...current, newSkill.trim()]
      });
    }
    setNewSkill('');
  };

  const handleRemoveSkillTag = (skillToRemove) => {
    const updated = (currentUser?.skills || []).filter(s => s !== skillToRemove);
    updateUserProfile(currentUser.id, { skills: updated });
  };

  const handleCreatePortfolio = (e) => {
    e.preventDefault();
    addPortfolioItem(currentUser.id, {
      title: portTitle,
      category: portCategory,
      description: portDescription,
      liveUrl: portLiveUrl,
      githubUrl: portGithubUrl,
      image: portImage || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80',
      tags: portTags.split(',').map(t => t.trim()).filter(Boolean),
    });

    setPortTitle('');
    setPortDescription('');
    setPortLiveUrl('');
    setPortGithubUrl('');
    setPortImage('');
    setIsAddingPortfolio(false);
  };

  if (!currentUser) return null;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 py-8 space-y-8">
      {/* Main Student Header Card */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div className="flex items-start sm:items-center gap-5">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover ring-4 ring-blue-50 shadow-md shrink-0"
            />
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-black text-slate-900">{currentUser.name}</h1>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 uppercase">
                  {currentUser.role}
                </span>
                <span className="flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  <span>{currentUser.rating || 5.0} ({studentReviews.length} reviews)</span>
                </span>
              </div>

              <p className="text-sm font-semibold text-slate-700 mt-1">
                {currentUser.headline || 'Student Developer & Creative Specialist'}
              </p>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 mt-2">
                <span className="flex items-center gap-1">
                  <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
                  {currentUser.university || 'Department of Software Engineering'}
                </span>
                <span>•</span>
                <span>ID: {currentUser.studentId || 'SE-2023-7841'}</span>
                <span>•</span>
                <span className="font-semibold text-emerald-600">{currentUser.availability}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start sm:items-end gap-3 w-full sm:w-auto">
            <div className="text-left sm:text-right">
              <span className="text-xs text-slate-400 font-medium">Hourly Rate</span>
              <div className="text-2xl font-black text-slate-900">${currentUser.hourlyRate}/hr</div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsEditingProfile(!isEditingProfile)}
                className="px-4 py-2 text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>{isEditingProfile ? 'Cancel Edit' : 'Edit Profile'}</span>
              </button>

              <button
                onClick={logoutUser}
                className="px-4 py-2 text-xs font-bold bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log Out</span>
              </button>
            </div>
          </div>
        </div>

        {/* Edit Profile Form Drawer */}
        {isEditingProfile && (
          <form onSubmit={handleSaveProfile} className="mt-6 p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
            <h3 className="font-bold text-slate-900 text-sm">Update Profile Details</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Professional Headline</label>
                <input
                  type="text"
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  className="w-full px-3 py-2 text-xs font-medium bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Hourly Rate ($/hr)</label>
                <input
                  type="number"
                  min="5"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(e.target.value)}
                  className="w-full px-3 py-2 text-xs font-medium bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">University / Faculty</label>
                <input
                  type="text"
                  value={university}
                  onChange={(e) => setUniversity(e.target.value)}
                  className="w-full px-3 py-2 text-xs font-medium bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Department</label>
                <input
                  type="text"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full px-3 py-2 text-xs font-medium bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Bio / Coursework Summary</label>
              <textarea
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full px-3 py-2 text-xs font-medium bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsEditingProfile(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-200 rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-xs cursor-pointer"
              >
                Save Profile Changes
              </button>
            </div>
          </form>
        )}

        {/* Bio Section */}
        <div className="pt-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">About & Academic Background</h3>
          <p className="text-sm text-slate-700 leading-relaxed max-w-4xl">
            {currentUser.bio || 'Passionate student working on real-world industry projects alongside university coursework.'}
          </p>
        </div>

        {/* Skills Management Section */}
        <div className="pt-6 border-t border-slate-100 mt-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Technical & Creative Skills ({currentUser.skills ? currentUser.skills.length : 0})
            </h3>
            <span className="text-[11px] text-blue-600 font-semibold">
              Powering your job recommendations
            </span>
          </div>

          {/* Current Skills Chips */}
          <div className="flex flex-wrap gap-2 mb-4">
            {currentUser.skills && currentUser.skills.map(skill => (
              <span
                key={skill}
                className="bg-blue-50 text-blue-800 text-xs font-semibold px-3 py-1.5 rounded-xl border border-blue-200 flex items-center gap-1.5 group"
              >
                <span>{skill}</span>
                <button
                  onClick={() => handleRemoveSkillTag(skill)}
                  className="text-blue-400 hover:text-red-500 ml-0.5 cursor-pointer"
                  title="Remove Skill"
                >
                  ×
                </button>
              </span>
            ))}
          </div>

          {/* Add Skill Form */}
          <form onSubmit={handleAddSkillTag} className="flex gap-2 max-w-md">
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="Add skill (e.g. Next.js, Node.js, Video Editing)..."
              className="flex-1 px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl flex items-center gap-1 shrink-0 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Skill</span>
            </button>
          </form>
        </div>
      </div>

      {/* Student Portfolio Management */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-purple-600" />
              <h2 className="text-xl font-black text-slate-900">
                Portfolio Showcase
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Demonstrate coursework, client projects, and deployed web apps to potential employers.
            </p>
          </div>

          <button
            onClick={() => setIsAddingPortfolio(!isAddingPortfolio)}
            className="px-4 py-2.5 text-xs font-bold bg-purple-600 hover:bg-purple-700 text-white rounded-xl shadow-xs transition-all flex items-center gap-2 self-start sm:self-auto cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Portfolio Work</span>
          </button>
        </div>

        {/* Add Portfolio Modal Drawer */}
        {isAddingPortfolio && (
          <form onSubmit={handleCreatePortfolio} className="my-6 p-6 bg-purple-50/50 rounded-2xl border border-purple-200 space-y-4">
            <h3 className="font-bold text-purple-950 text-sm">Add New Project to Portfolio</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Project Title *</label>
                <input
                  type="text"
                  required
                  value={portTitle}
                  onChange={(e) => setPortTitle(e.target.value)}
                  placeholder="e.g. EduTrack Learning Portal"
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
                <select
                  value={portCategory}
                  onChange={(e) => setPortCategory(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none"
                >
                  <option value="Web Development">Web Development</option>
                  <option value="UI/UX Design">UI/UX Design</option>
                  <option value="Graphic Design">Graphic Design</option>
                  <option value="AI & Data Science">AI & Data Science</option>
                  <option value="WordPress">WordPress</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Live URL (optional)</label>
                <input
                  type="url"
                  value={portLiveUrl}
                  onChange={(e) => setPortLiveUrl(e.target.value)}
                  placeholder="https://myproject.vercel.app"
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">GitHub Repo URL (optional)</label>
                <input
                  type="url"
                  value={portGithubUrl}
                  onChange={(e) => setPortGithubUrl(e.target.value)}
                  placeholder="https://github.com/myname/repo"
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Description</label>
              <textarea
                rows={2}
                required
                value={portDescription}
                onChange={(e) => setPortDescription(e.target.value)}
                placeholder="Key accomplishments, challenges overcome, and technologies applied..."
                className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Cover Image URL (optional)</label>
                <input
                  type="url"
                  value={portImage}
                  onChange={(e) => setPortImage(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Tech Stack Tags (Comma separated)</label>
                <input
                  type="text"
                  value={portTags}
                  onChange={(e) => setPortTags(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsAddingPortfolio(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-200 rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-bold bg-purple-600 hover:bg-purple-700 text-white rounded-xl shadow-xs cursor-pointer"
              >
                Publish to Portfolio
              </button>
            </div>
          </form>
        )}

        {/* Portfolio Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
          {currentUser.portfolio && currentUser.portfolio.length > 0 ? (
            currentUser.portfolio.map(item => (
              <div
                key={item.id}
                className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="h-44 w-full overflow-hidden bg-slate-200 relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-3 left-3 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-900/80 text-white backdrop-blur-xs">
                      {item.category}
                    </span>
                  </div>

                  <div className="p-5">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h4 className="font-bold text-slate-900 text-base">{item.title}</h4>
                      <button
                        onClick={() => deletePortfolioItem(currentUser.id, item.id)}
                        className="text-slate-400 hover:text-red-500 p-1 transition-colors cursor-pointer"
                        title="Delete Item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-3">
                      {item.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {item.tags && item.tags.map(tag => (
                        <span key={tag} className="text-[10px] font-semibold bg-white border border-slate-200 text-slate-700 px-2 py-0.5 rounded-md">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-white border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-slate-400">{item.date}</span>
                  <div className="flex items-center gap-3">
                    {item.githubUrl && (
                      <a
                        href={item.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-slate-600 hover:text-slate-900 flex items-center gap-1 font-semibold"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>Code</span>
                      </a>
                    )}
                    {item.liveUrl && (
                      <a
                        href={item.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 hover:text-blue-800 flex items-center gap-1 font-semibold"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Demo</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-10 text-center text-slate-400 italic">
              No portfolio works added yet. Click "Add Portfolio Work" above to upload case studies.
            </div>
          )}
        </div>
      </div>

      {/* Verified Reviews Section */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
          <div>
            <h2 className="text-xl font-black text-slate-900">Client Reviews & Testimonials</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Verified evaluations submitted by employers upon completed projects.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {studentReviews.map(rev => (
            <div key={rev.id} className="p-5 bg-slate-50 rounded-2xl border border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-slate-900 text-sm">{rev.clientName}</span>
                <div className="flex items-center gap-1 text-amber-500">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
              <p className="text-xs text-slate-700 italic leading-relaxed mb-3">
                "{rev.comment}"
              </p>
              <div className="flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-200/60 pt-2">
                <span>Project: {rev.projectTitle}</span>
                <span>{rev.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
