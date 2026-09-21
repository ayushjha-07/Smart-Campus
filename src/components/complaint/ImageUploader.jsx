import React, { useRef, useState } from 'react';
import { UploadCloud, Image as ImageIcon, X, AlertCircle } from 'lucide-react';

export default function ImageUploader({ imageFile, imagePreview, onImageSelect, onImageRemove }) {
  const fileInputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  const handleFileChange = (file) => {
    setUploadError(null);
    if (!file) return;

    // Validate type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!validTypes.includes(file.type)) {
      setUploadError('Please select a valid image file (JPG, JPEG, or PNG).');
      return;
    }

    // Validate size (5 MB)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('Image size exceeds maximum limit of 5 MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      onImageSelect(file, e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#64748B] dark:text-[#A8B3B0]">
          Add Photos <span className="text-[10px] text-[#94A3B8] dark:text-[#64748B] font-normal normal-case">(Optional)</span>
        </label>
        <span className="text-[10px] text-[#94A3B8] dark:text-[#64748B]">Supports JPG, PNG (Max 5MB)</span>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/png, image/jpeg, image/jpg"
        onChange={(e) => handleFileChange(e.target.files[0])}
        className="hidden"
      />

      {imagePreview ? (
        /* Image Preview Box */
        <div className="relative rounded-2xl overflow-hidden border border-[#168A5B]/50 bg-white dark:bg-[#0D1B22] p-3 flex items-center gap-4 shadow-sm">
          <img
            src={imagePreview}
            alt="Complaint Attachment Preview"
            className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-xl border border-[#DDE7E2] dark:border-white/10"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-[#168A5B]" />
              <span className="text-xs font-bold text-[#14213D] dark:text-[#F5F5F0] truncate">
                {imageFile?.name || 'Attached Photo'}
              </span>
            </div>
            <span className="text-[11px] text-[#64748B] dark:text-[#A8B3B0] block mt-0.5 font-mono">
              {(imageFile?.size / 1024 / 1024).toFixed(2)} MB • Ready to dispatch
            </span>
          </div>
          <button
            type="button"
            onClick={onImageRemove}
            className="p-2 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-[#E5484D] hover:bg-red-100 dark:hover:bg-red-500/20 transition-colors"
            aria-label="Remove image"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        /* Drag & Drop Area */
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrop}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`rounded-2xl border-2 border-dashed p-6 sm:p-7 text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center gap-2 ${
            dragActive
              ? 'border-[#168A5B] bg-emerald-50/50 dark:bg-emerald-500/10'
              : 'border-[#DDE7E2] dark:border-white/10 bg-[#F8FAF9] dark:bg-white/5 hover:border-[#168A5B] hover:bg-white dark:hover:bg-[#0D1B22]'
          }`}
        >
          <div className="w-11 h-11 rounded-full bg-white dark:bg-[#0D1B22] border border-[#DDE7E2] dark:border-white/10 flex items-center justify-center text-[#168A5B] shadow-xs">
            <UploadCloud className="w-5 h-5 stroke-[2.2]" />
          </div>

          <div>
            <span className="text-xs sm:text-sm font-bold text-[#14213D] dark:text-[#F5F5F0] block">
              Drag & drop images here or click to upload
            </span>
            <span className="text-[11px] text-[#64748B] dark:text-[#A8B3B0] block mt-0.5">
              Supports JPG, PNG (Max 5MB each)
            </span>
          </div>
        </div>
      )}

      {uploadError && (
        <p className="mt-1.5 text-xs text-[#E5484D] flex items-center gap-1">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{uploadError}</span>
        </p>
      )}
    </div>
  );
}
