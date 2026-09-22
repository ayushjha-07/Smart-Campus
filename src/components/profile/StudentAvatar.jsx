import React, { useRef, useState } from 'react';
import { Camera, Trash2, User, AlertCircle, Upload } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function StudentAvatar({
  onAvatarChange,
  onToast,
  size = 'large',
  showControls = true,
  className = '',
}) {
  const { currentUser, profilePhoto, updateProfilePhoto, removeProfilePhoto } = useAuth();
  const fileInputRef = useRef(null);
  const [validationError, setValidationError] = useState(null);

  // Trigger system file picker
  const handleTriggerPicker = () => {
    setValidationError(null);
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
    if (onAvatarChange) {
      onAvatarChange();
    }
  };

  // Handle file selection, validation, and preview
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reset input value so selecting the same file triggers change again
    e.target.value = '';

    // 1. Validation: Supported file formats (JPG, JPEG, PNG, WEBP)
    const validMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];
    const fileName = (file.name || '').toLowerCase();
    const validExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
    const hasValidExtension = validExtensions.some((ext) => fileName.endsWith(ext));
    const hasValidMime = validMimeTypes.includes(file.type);

    if (!hasValidMime && !hasValidExtension) {
      const errMsg = 'Please upload a JPG, PNG, or WEBP image.';
      setValidationError(errMsg);
      if (onToast) onToast(errMsg, 'error');
      return;
    }

    // 2. Validation: Maximum file size 5 MB (5 * 1024 * 1024 bytes)
    const maxSizeBytes = 5 * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      const errMsg = 'Image size must be less than 5 MB.';
      setValidationError(errMsg);
      if (onToast) onToast(errMsg, 'error');
      return;
    }

    // Clear validation error on successful selection
    setValidationError(null);

    // 3. Immediate preview and base64 Data URL persistence
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result;
      if (typeof dataUrl === 'string') {
        updateProfilePhoto(dataUrl);
        if (onToast) {
          onToast('Profile photo updated successfully!', 'success');
        }
      }
    };
    reader.onerror = () => {
      const errMsg = 'Failed to read image file. Please try again.';
      setValidationError(errMsg);
      if (onToast) onToast(errMsg, 'error');
    };
    reader.readAsDataURL(file);
  };

  // Remove photo and restore default avatar
  const handleRemovePhoto = () => {
    removeProfilePhoto();
    setValidationError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    if (onToast) {
      onToast('Profile photo removed.', 'success');
    }
  };

  const isLarge = size === 'large';
  const avatarDimensions = isLarge ? 'w-24 h-24 sm:w-28 sm:h-28' : 'w-12 h-12';
  const iconSize = isLarge ? 'w-12 h-12 sm:w-14 sm:h-14' : 'w-6 h-6';

  return (
    <div className={`flex flex-col items-center gap-2.5 shrink-0 ${className}`}>
      {/* Hidden File Input strictly accepting JPG, JPEG, PNG, WEBP */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileChange}
        className="hidden"
        aria-label="Upload profile photo"
      />

      {/* Circular Profile Photo Area */}
      <div className="relative group select-none shrink-0">
        <div
          onClick={handleTriggerPicker}
          title={profilePhoto ? 'Click to change photo' : 'Click to upload photo'}
          className={`${avatarDimensions} rounded-full overflow-hidden border-2 sm:border-[2.5px] border-[#078A5A] dark:border-[#00B87A] ring-4 ring-[#078A5A]/15 dark:ring-[#00B87A]/20 shadow-md bg-[#0F2826] flex items-center justify-center cursor-pointer transition-all duration-300 group-hover:ring-[#078A5A]/30 dark:group-hover:ring-[#00B87A]/40`}
        >
          {profilePhoto ? (
            <img
              src={profilePhoto}
              alt={currentUser?.name || 'Student Profile'}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#0F2826] via-[#14352F] to-[#0A1A18] text-[#078A5A] dark:text-[#00B87A]">
              <User className={`${iconSize} stroke-[1.75]`} />
            </div>
          )}

          {/* Quick hover overlay for desktop */}
          <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-200 pointer-events-none">
            <Camera className="w-6 h-6 text-white drop-shadow-md" />
          </div>
        </div>

        {/* Camera Icon Overlay Badge */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleTriggerPicker();
          }}
          title={profilePhoto ? 'Change photo' : 'Upload photo'}
          aria-label={profilePhoto ? 'Change photo' : 'Upload photo'}
          className="absolute bottom-0 right-0 p-2 rounded-full bg-[#078A5A] hover:bg-[#06744C] dark:bg-[#00B87A] dark:hover:bg-[#009E69] text-white border-2 border-white dark:border-[#0B2027] shadow-md transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer focus:outline-hidden"
        >
          <Camera className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </button>
      </div>

      {/* Photo Controls: Upload/Change & Remove Photo */}
      {showControls && (
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleTriggerPicker}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#078A5A] hover:bg-[#06744C] dark:bg-[#00B87A] dark:hover:bg-[#009E69] text-white shadow-xs transition-all duration-200 hover:shadow-md cursor-pointer active:scale-95"
          >
            {profilePhoto ? (
              <>
                <Camera className="w-3.5 h-3.5" />
                <span>Change Photo</span>
              </>
            ) : (
              <>
                <Upload className="w-3.5 h-3.5" />
                <span>Upload Photo</span>
              </>
            )}
          </button>

          {profilePhoto && (
            <button
              type="button"
              onClick={handleRemovePhoto}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-50 hover:bg-red-100 dark:bg-red-950/40 dark:hover:bg-red-900/60 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/50 shadow-2xs transition-all duration-200 cursor-pointer active:scale-95"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Remove Photo</span>
            </button>
          )}
        </div>
      )}

      {/* Inline Validation Error Notice */}
      {validationError && (
        <div className="flex items-center gap-1.5 text-xs text-red-600 dark:text-red-400 font-medium bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 px-2.5 py-1 rounded-lg animate-fadeIn max-w-[280px]">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{validationError}</span>
        </div>
      )}
    </div>
  );
}
