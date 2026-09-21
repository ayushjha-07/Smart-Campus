import React, { useState } from 'react';
import { Star, Lock, Send, CheckCircle2, MessageSquareHeart } from 'lucide-react';

export default function FeedbackSection({ status = 'In Progress', onFeedbackSubmit }) {
  const isResolved = status === 'Resolved';
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0) return;
    setSubmitted(true);
    if (onFeedbackSubmit) {
      onFeedbackSubmit({ rating, comment });
    }
  };

  if (!isResolved) {
    return (
      <div className="bg-white dark:bg-[#0D1B22]/90 border border-[#DDE7E2] dark:border-white/10 rounded-3xl p-5 sm:p-6 shadow-xs dark:shadow-xl backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-[#07121A] border border-[#DDE7E2] dark:border-white/10 flex items-center justify-center text-[#64748B] dark:text-[#A8B3B0]/60 shrink-0">
            <Lock className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#14213D] dark:text-[#F5F5F0]">
              Resolution Feedback
            </h4>
            <p className="text-xs text-[#64748B] dark:text-[#A8B3B0]">
              Feedback will be available once the complaint is resolved.
            </p>
          </div>
        </div>

        <span className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-[#07121A] border border-[#DDE7E2] dark:border-white/5 text-[11px] text-[#64748B] dark:text-[#A8B3B0]/60 font-mono">
          Locked until resolution
        </span>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-[#0D1B22]/90 border border-[#DDE7E2] dark:border-[#315C3A]/60 rounded-3xl p-5 sm:p-7 shadow-xs dark:shadow-2xl backdrop-blur-xl space-y-4">
      <div className="flex items-center gap-2.5 border-b border-[#DDE7E2] dark:border-white/5 pb-3">
        <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-[#D4A84F]/15 border border-amber-200 dark:border-[#D4A84F]/40 flex items-center justify-center text-[#D4A84F]">
          <MessageSquareHeart className="w-4 h-4" />
        </div>
        <div>
          <h4 className="text-sm sm:text-base font-bold text-[#14213D] dark:text-[#F5F5F0]">
            How was your experience?
          </h4>
          <span className="text-xs text-[#64748B] dark:text-[#A8B3B0]">
            Your rating helps improve campus facilities and staff responsiveness
          </span>
        </div>
      </div>

      {submitted ? (
        <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-[#315C3A]/20 border border-emerald-200 dark:border-emerald-500/30 text-center space-y-2 animate-fadeIn">
          <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-[#168A5B] dark:text-emerald-400 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-6 h-6 stroke-[2.5]" />
          </div>
          <h5 className="text-sm font-bold text-[#14213D] dark:text-[#F5F5F0]">
            Thank you for your feedback!
          </h5>
          <p className="text-xs text-[#64748B] dark:text-[#A8B3B0] max-w-sm mx-auto">
            You rated this resolution {rating} out of 5 stars. Your response has been logged for quality audit.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Star Rating */}
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase font-bold tracking-wider text-[#64748B] dark:text-[#A8B3B0]/70 block">
              Rating (1 to 5 Stars)
            </label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => {
                const filled = (hoverRating || rating) >= star;
                return (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1 text-2xl transition-transform hover:scale-110 focus:outline-none"
                    aria-label={`Rate ${star} star`}
                  >
                    <Star
                      className={`w-6 h-6 ${
                        filled
                          ? 'text-[#D4A84F] fill-[#D4A84F]'
                          : 'text-slate-300 dark:text-white/20'
                      }`}
                    />
                  </button>
                );
              })}
              {rating > 0 && (
                <span className="ml-2 text-xs font-mono text-[#D4A84F] font-bold">
                  {rating} / 5 Stars
                </span>
              )}
            </div>
          </div>

          {/* Comment Textarea */}
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase font-bold tracking-wider text-[#64748B] dark:text-[#A8B3B0]/70 block">
              Comments (Optional)
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Tell us about your experience..."
              rows={3}
              className="w-full bg-[#F8FAFC] dark:bg-[#07121A] border border-[#DDE7E2] dark:border-white/10 focus:border-[#168A5B] dark:focus:border-[#D4A84F] rounded-2xl p-3 text-xs text-[#14213D] dark:text-[#F5F5F0] placeholder-[#94A3B8] dark:placeholder-[#A8B3B0]/50 outline-none resize-none transition-colors"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={rating === 0}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-[#168A5B] dark:bg-[#D4A84F] hover:bg-[#127049] dark:hover:bg-[#E5BF6E] text-white dark:text-[#07121A] disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-md"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Submit Feedback</span>
          </button>
        </form>
      )}
    </div>
  );
}
