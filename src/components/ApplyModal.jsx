import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Send,
  Sparkles,
  DollarSign,
  Clock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export default function ApplyModal() {
  const {
    selectedProject,
    setActiveModal,
    currentUser,
    submitApplication,
    showToast,
    applications
  } = useApp();

  const existingApp = selectedProject && currentUser
    ? applications.find(a => a.projectId === selectedProject.id && a.studentId === currentUser.id)
    : null;

  const [proposedRate, setProposedRate] = useState(
    existingApp ? existingApp.proposedRate : (selectedProject ? selectedProject.rate : 20)
  );
  const [deliveryDays, setDeliveryDays] = useState(
    existingApp ? existingApp.deliveryDays : 7
  );
  const [coverLetter, setCoverLetter] = useState(
    existingApp ? existingApp.coverLetter : "I have reviewed your project requirements and I have the right skill set to build this with high quality and fast turnaround."
  );
  const [selectedPortfolios, setSelectedPortfolios] = useState(
    existingApp ? (existingApp.portfolioSamples || []) : []
  );

  if (!selectedProject) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    const finalLetter = coverLetter.trim() || "I have reviewed your project requirements and I have the right skill set to build this with high quality and fast turnaround.";

    const result = submitApplication({
      projectId: selectedProject.id,
      proposedRate: Number(proposedRate) || selectedProject.rate,
      deliveryDays: Number(deliveryDays) || 7,
      coverLetter: finalLetter,
      portfolioSamples: selectedPortfolios,
    });

    if (result) {
      setActiveModal(null);
    }
  };

  const togglePortfolio = (title) => {
    if (selectedPortfolios.includes(title)) {
      setSelectedPortfolios(prev => prev.filter(t => t !== title));
    } else {
      setSelectedPortfolios(prev => [...prev, title]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              {existingApp ? 'Update Your Proposal' : 'Submit Project Proposal'}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Project: <span className="font-semibold text-slate-700">{selectedProject.title}</span>
            </p>
          </div>
          <button
            type="button"
            onClick={() => setActiveModal(null)}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-200 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {existingApp && (
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-800 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
              <span>You previously submitted a proposal. Submitting again will update your bid and details.</span>
            </div>
          )}

          {/* Rate & Timeline Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Proposed {selectedProject.type === 'Hourly' ? 'Hourly Rate ($/hr)' : 'Fixed Bid ($)'}
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-slate-400 text-sm">$</span>
                <input
                  type="number"
                  min="5"
                  step="1"
                  required
                  value={proposedRate}
                  onChange={(e) => setProposedRate(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 text-sm font-semibold text-slate-800 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <span className="text-[11px] text-slate-400 mt-1 block">
                Client's budget: ${selectedProject.rate} {selectedProject.type === 'Hourly' ? '/hr' : 'Fixed'}
              </span>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Estimated Delivery (Days)
              </label>
              <div className="relative">
                <Clock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="number"
                  min="1"
                  max="90"
                  required
                  value={deliveryDays}
                  onChange={(e) => setDeliveryDays(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm font-semibold text-slate-800 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <span className="text-[11px] text-slate-400 mt-1 block">
                Target timeline: {selectedProject.deadline || '7-14 days'}
              </span>
            </div>
          </div>

          {/* Cover Letter */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
              Cover Letter & Pitch
            </label>
            <textarea
              rows={4}
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              placeholder="Introduce yourself, highlight your skills, and describe your approach to delivering this project..."
              className="w-full p-3 text-sm text-slate-800 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none leading-relaxed"
            />
          </div>

          {/* Attach Portfolio Samples */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                Attach Portfolio Works (Optional)
              </label>
              <span className="text-[11px] text-blue-600 font-medium">
                {selectedPortfolios.length} selected
              </span>
            </div>

            {currentUser?.portfolio && currentUser.portfolio.length > 0 ? (
              <div className="space-y-2">
                {currentUser.portfolio.map(p => {
                  const isChecked = selectedPortfolios.includes(p.title);
                  return (
                    <div
                      key={p.id}
                      onClick={() => togglePortfolio(p.title)}
                      className={`p-3 rounded-xl border text-xs flex items-center justify-between cursor-pointer transition-all ${
                        isChecked
                          ? 'border-blue-500 bg-blue-50/60 font-semibold text-blue-900'
                          : 'border-slate-200 bg-slate-50/50 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}}
                          className="w-4 h-4 text-blue-600 rounded"
                        />
                        <span>{p.title} ({p.category})</span>
                      </div>
                      <span className="text-[10px] text-slate-400">
                        {p.tags ? p.tags.slice(0, 2).join(', ') : ''}
                      </span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-xs text-slate-400 italic bg-slate-50 p-3 rounded-xl border border-slate-100">
                No portfolio items added yet. You can showcase projects in your profile.
              </p>
            )}
          </div>

          {/* Current User Info Box */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              Applying as <strong>{currentUser?.name}</strong> ({currentUser?.email})
            </span>
          </div>

          {/* Actions */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setActiveModal(null)}
              className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-sm transition-all flex items-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>{existingApp ? 'Update Proposal' : 'Submit Proposal'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
