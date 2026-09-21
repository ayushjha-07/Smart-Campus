import React, { useState } from 'react';
import { 
  FileEdit, 
  FileText, 
  MapPin, 
  Calendar, 
  Save, 
  ArrowRight, 
  Loader2, 
  AlertCircle, 
  RotateCcw,
  CheckCircle2,
  Edit3
} from 'lucide-react';
import ComplaintCategory from './ComplaintCategory';
import ImageUploader from './ImageUploader';

const DRAFT_STORAGE_KEY = 'smart_campus_complaint_draft_v1';

export default function ComplaintForm({ onDescriptionChange, onSubmitSuccess }) {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    location: '',
    dateTime: new Date().toISOString().slice(0, 16),
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [draftToast, setDraftToast] = useState(false);
  const [hasDraftAvailable, setHasDraftAvailable] = useState(() => {
    try {
      return Boolean(localStorage.getItem(DRAFT_STORAGE_KEY));
    } catch {
      return false;
    }
  });

  const handleFieldChange = (field, value) => {
    setFormData((prev) => {
      const next = { ...prev, [field]: value };
      if (field === 'description' || field === 'category') {
        onDescriptionChange(next.description, next.category);
      }
      return next;
    });

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  // Draft operations
  const handleSaveDraft = () => {
    try {
      localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(formData));
      setDraftToast(true);
      setHasDraftAvailable(false);
      setTimeout(() => setDraftToast(false), 3000);
    } catch {
      // Ignore localStorage errors
    }
  };

  const handleContinueDraft = () => {
    try {
      const saved = localStorage.getItem(DRAFT_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setFormData(parsed);
        onDescriptionChange(parsed.description, parsed.category);
        setHasDraftAvailable(false);
      }
    } catch {
      // Ignore localStorage errors
    }
  };

  const handleDiscardDraft = () => {
    try {
      localStorage.removeItem(DRAFT_STORAGE_KEY);
      setHasDraftAvailable(false);
    } catch {
      // Ignore localStorage errors
    }
  };

  const handleResetForm = () => {
    setFormData({
      title: '',
      category: '',
      description: '',
      location: '',
      dateTime: new Date().toISOString().slice(0, 16),
    });
    setImageFile(null);
    setImagePreview(null);
    setErrors({});
    onDescriptionChange('', '');
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Please enter a complaint title.';
    }

    if (!formData.category) {
      newErrors.category = 'Please select a category.';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Please describe the issue in detail.';
    } else if (formData.description.trim().length < 15) {
      newErrors.description = 'Description must contain at least 15 characters.';
    } else if (formData.description.length > 500) {
      newErrors.description = 'Description cannot exceed 500 characters.';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Please specify the campus location.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setSubmitting(true);

    try {
      try {
        localStorage.removeItem(DRAFT_STORAGE_KEY);
      } catch {
        // Ignore localStorage errors
      }
      await onSubmitSuccess(formData, imageFile);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white dark:bg-[#0D1B22]/90 border border-[#DDE7E2] dark:border-white/10 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-lg relative space-y-6">
      
      {/* Draft Notification Banner */}
      {hasDraftAvailable && (
        <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 flex flex-col sm:flex-row items-center justify-between gap-3 animate-fadeIn">
          <div className="flex items-center gap-2 text-xs text-amber-900 dark:text-amber-200">
            <Save className="w-4 h-4 text-[#D4A84F] shrink-0" />
            <span>You have an unsubmitted complaint draft saved. Continue where you left off?</span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleContinueDraft}
              className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-[#168A5B] text-white hover:bg-[#0B5D3B] transition-colors"
            >
              Continue
            </button>
            <button
              type="button"
              onClick={handleDiscardDraft}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-[#64748B] dark:text-[#A8B3B0] hover:text-[#E5484D] transition-colors"
            >
              Discard
            </button>
          </div>
        </div>
      )}

      {/* Draft Saved Toast Confirmation */}
      {draftToast && (
        <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-[#168A5B] text-xs flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-[#168A5B] shrink-0" />
          <span>Draft saved successfully to local browser storage.</span>
        </div>
      )}

      {/* Card Header matching reference */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#DDE7E2] dark:border-white/10 gap-3">
        <div className="flex items-center gap-3.5">
          {/* Emerald Green Icon inside rounded square */}
          <div className="w-12 h-12 rounded-2xl bg-[#168A5B] text-white flex items-center justify-center shrink-0 shadow-sm">
            <FileEdit className="w-6 h-6 stroke-[2.2]" />
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#14213D] dark:text-[#F5F5F0] tracking-tight">
              Tell Us About the Issue
            </h2>
            <p className="text-xs text-[#64748B] dark:text-[#A8B3B0] mt-0.5">
              Fill out the details below. Our AI evaluates priority and routes directly to the officer-in-charge.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleSaveDraft}
          className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-[#64748B] dark:text-[#A8B3B0] hover:text-[#14213D] dark:hover:text-[#F5F5F0] bg-white dark:bg-[#0D1B22] hover:bg-[#F5F8F6] dark:hover:bg-white/5 border border-[#DDE7E2] dark:border-white/10 transition-colors shadow-xs"
        >
          <Save className="w-3.5 h-3.5 text-[#D4A84F]" />
          <span>Save as Draft</span>
        </button>
      </div>

      {/* The Complaint Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        
        {/* Field 1: Complaint Title */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#64748B] dark:text-[#A8B3B0]">
              Complaint Title <span className="text-[#E5484D]">*</span>
            </label>
            <span className="text-[10px] text-[#94A3B8] dark:text-[#64748B]">Concise summary</span>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#168A5B]">
              <FileText className="w-4 h-4" />
            </div>
            <input
              type="text"
              maxLength={100}
              value={formData.title}
              onChange={(e) => handleFieldChange('title', e.target.value)}
              placeholder="Enter a short title for your complaint (e.g. Water supply issue in Hostel Block B)"
              className={`w-full bg-[#F8FAF9] dark:bg-[#041118]/60 border ${
                errors.title
                  ? 'border-[#E5484D] focus:border-[#E5484D] ring-1 ring-[#E5484D]/20'
                  : 'border-[#DDE7E2] dark:border-white/10 focus:border-[#168A5B] focus:ring-1 focus:ring-[#168A5B]/20'
              } rounded-xl pl-10 pr-16 py-2.5 text-sm text-[#14213D] dark:text-[#F5F5F0] placeholder-[#94A3B8] dark:placeholder-[#64748B] focus:bg-white dark:focus:bg-[#041118] outline-none transition-all`}
            />
            <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-[10px] font-mono text-[#94A3B8] dark:text-[#64748B]">
              {formData.title.length} / 100
            </div>
          </div>
          {errors.title && (
            <p className="mt-1.5 text-xs text-[#E5484D] flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.title}</span>
            </p>
          )}
        </div>

        {/* Field 2 & 3: Category and Occurrence Date/Time */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ComplaintCategory
            value={formData.category}
            onChange={(val) => handleFieldChange('category', val)}
            error={errors.category}
          />

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#64748B] dark:text-[#A8B3B0]">
                Occurrence Date & Time
              </label>
              <span className="text-[10px] text-[#94A3B8] dark:text-[#64748B]">Exact incident time</span>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#168A5B]">
                <Calendar className="w-4 h-4" />
              </div>
              <input
                type="datetime-local"
                value={formData.dateTime}
                onChange={(e) => handleFieldChange('dateTime', e.target.value)}
                className="w-full bg-[#F8FAF9] dark:bg-[#041118]/60 border border-[#DDE7E2] dark:border-white/10 focus:border-[#168A5B] focus:bg-white dark:focus:bg-[#041118] rounded-xl pl-10 pr-3 py-2.5 text-sm text-[#14213D] dark:text-[#F5F5F0] outline-none transition-all cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Field 4: Description with Character Counter */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#64748B] dark:text-[#A8B3B0]">
              Description <span className="text-[#E5484D]">*</span>
            </label>
            <span
              className={`text-[11px] font-mono ${
                formData.description.length > 500
                  ? 'text-[#E5484D] font-bold'
                  : 'text-[#94A3B8] dark:text-[#64748B]'
              }`}
            >
              {formData.description.length} / 500
            </span>
          </div>
          <div className="relative">
            <div className="absolute top-3 left-3.5 pointer-events-none text-[#168A5B]">
              <Edit3 className="w-4 h-4" />
            </div>
            <textarea
              rows={4}
              maxLength={500}
              value={formData.description}
              onChange={(e) => handleFieldChange('description', e.target.value)}
              placeholder="Describe the issue in detail. Include relevant information such as location, timing, and impact."
              className={`w-full bg-[#F8FAF9] dark:bg-[#041118]/60 border ${
                errors.description
                  ? 'border-[#E5484D] focus:border-[#E5484D] ring-1 ring-[#E5484D]/20'
                  : 'border-[#DDE7E2] dark:border-white/10 focus:border-[#168A5B] focus:ring-1 focus:ring-[#168A5B]/20'
              } rounded-xl p-3.5 pl-10 text-sm text-[#14213D] dark:text-[#F5F5F0] placeholder-[#94A3B8] dark:placeholder-[#64748B] focus:bg-white dark:focus:bg-[#041118] outline-none transition-all resize-none leading-relaxed h-32`}
            />
          </div>
          {errors.description && (
            <p className="mt-1.5 text-xs text-[#E5484D] flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.description}</span>
            </p>
          )}
        </div>

        {/* Field 5: Campus Location */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#64748B] dark:text-[#A8B3B0]">
              Campus Location <span className="text-[#E5484D]">*</span>
            </label>
            <span className="text-[10px] text-[#94A3B8] dark:text-[#64748B]">Specific block/room</span>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#168A5B]">
              <MapPin className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => handleFieldChange('location', e.target.value)}
              placeholder="Enter location (e.g. Academic Block A, Room 203)"
              className={`w-full bg-[#F8FAF9] dark:bg-[#041118]/60 border ${
                errors.location
                  ? 'border-[#E5484D] focus:border-[#E5484D] ring-1 ring-[#E5484D]/20'
                  : 'border-[#DDE7E2] dark:border-white/10 focus:border-[#168A5B] focus:ring-1 focus:ring-[#168A5B]/20'
              } rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#14213D] dark:text-[#F5F5F0] placeholder-[#94A3B8] dark:placeholder-[#64748B] focus:bg-white dark:focus:bg-[#041118] outline-none transition-all`}
            />
          </div>
          {errors.location && (
            <p className="mt-1.5 text-xs text-[#E5484D] flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.location}</span>
            </p>
          )}
        </div>

        {/* Field 6: Image Uploader */}
        <ImageUploader
          imageFile={imageFile}
          imagePreview={imagePreview}
          onImageSelect={(file, preview) => {
            setImageFile(file);
            setImagePreview(preview);
          }}
          onImageRemove={() => {
            setImageFile(null);
            setImagePreview(null);
          }}
        />

        {/* Action Buttons Row */}
        <div className="pt-4 border-t border-[#DDE7E2] dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleResetForm}
              className="px-4 py-3 rounded-xl text-xs font-semibold text-[#64748B] dark:text-[#A8B3B0] hover:text-[#14213D] dark:hover:text-[#F5F5F0] hover:bg-slate-100 dark:hover:bg-white/5 transition-colors flex items-center justify-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear Fields</span>
            </button>

            <button
              type="button"
              onClick={handleSaveDraft}
              className="px-4 py-3 rounded-xl text-xs font-semibold text-[#64748B] dark:text-[#A8B3B0] hover:text-[#14213D] dark:hover:text-[#F5F5F0] hover:bg-slate-100 dark:hover:bg-white/5 border border-[#DDE7E2] dark:border-white/10 transition-colors flex items-center justify-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5 text-[#D4A84F]" />
              <span>Save as Draft</span>
            </button>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm bg-[#168A5B] text-white hover:bg-[#0B5D3B] hover:shadow-lg hover:shadow-[#168A5B]/25 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-2 shadow-md shadow-[#168A5B]/20 disabled:opacity-75 disabled:cursor-not-allowed cursor-pointer"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span>Submitting Complaint...</span>
              </>
            ) : (
              <>
                <span>Submit Complaint</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </>
            )}
          </button>
        </div>

      </form>

    </div>
  );
}
