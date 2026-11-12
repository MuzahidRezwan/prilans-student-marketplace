import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Star,
  Award,
  CheckCircle2,
  MessageSquare
} from 'lucide-react';

export default function ReviewModal() {
  const {
    reviewTargetApp,
    setReviewTargetApp,
    setActiveModal,
    submitReview
  } = useApp();

  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');

  if (!reviewTargetApp) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) {
      alert('Please enter a review testimonial.');
      return;
    }

    submitReview({
      projectId: reviewTargetApp.projectId,
      projectTitle: reviewTargetApp.projectTitle,
      studentId: reviewTargetApp.studentId,
      studentName: reviewTargetApp.studentName,
      rating,
      comment,
    });

    setReviewTargetApp(null);
    setActiveModal(null);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-amber-50/50">
          <div>
            <span className="text-[10px] font-bold tracking-wider uppercase text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
              Feature: Rating & Review System (5 Marks)
            </span>
            <h2 className="text-xl font-bold text-slate-900 mt-1">
              Leave Review for {reviewTargetApp.studentName}
            </h2>
          </div>
          <button
            onClick={() => { setReviewTargetApp(null); setActiveModal(null); }}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="text-center py-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              Select Rating (1 to 5 Stars)
            </label>
            <div className="flex items-center justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => {
                const isFilled = (hoverRating || rating) >= star;
                return (
                  <button
                    type="button"
                    key={star}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(star)}
                    className="p-1 text-2xl transition-transform hover:scale-125 focus:outline-none"
                  >
                    <Star
                      className={`w-8 h-8 ${
                        isFilled
                          ? 'fill-amber-400 text-amber-500 drop-shadow-sm'
                          : 'text-slate-300'
                      }`}
                    />
                  </button>
                );
              })}
            </div>
            <span className="text-sm font-extrabold text-amber-700 block mt-2">
              {rating} of 5 Stars
            </span>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
              Review Testimonial
            </label>
            <textarea
              rows={4}
              required
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Describe the student's communication, quality of delivery, and technical expertise..."
              className="w-full p-3 text-sm text-slate-800 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none resize-none leading-relaxed"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => { setReviewTargetApp(null); setActiveModal(null); }}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-2"
            >
              <Award className="w-4 h-4" />
              <span>Submit Review</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
