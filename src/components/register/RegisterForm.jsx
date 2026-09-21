import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  User, 
  Mail, 
  Phone, 
  Hash, 
  ArrowRight, 
  Loader2, 
  Eye, 
  EyeOff, 
  Lock, 
  AlertCircle,
  Info
} from 'lucide-react';
import RegisterRoleSelector from './RegisterRoleSelector';
import FormInput from './FormInput';
import DepartmentSelect from './DepartmentSelect';
import PasswordStrength from './PasswordStrength';
import SuccessCard from './SuccessCard';
import UniversityLogo from '../common/UniversityLogo';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/useApp';
import { departmentApi } from '../../services/departmentApi';

export default function RegisterForm() {
  const { register } = useAuth();
  const { showToast } = useApp();
  const [role, setRole] = useState('student');
  const [departmentsList, setDepartmentsList] = useState([]);

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    identifier: '', // Student ID or Employee ID
    email: '',
    phone: '',
    department: '',
    year: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [termsModalOpen, setTermsModalOpen] = useState(false);

  useEffect(() => {
    async function loadDepts() {
      try {
        const res = await departmentApi.getDepartments();
        if (res?.items) {
          setDepartmentsList(res.items);
        }
      } catch {
        // Fallback to static list in DepartmentSelect
      }
    }
    loadDepts();
  }, []);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const handleRoleChange = (newRole) => {
    setRole(newRole);
    setFormData((prev) => ({
      ...prev,
      department: '',
      year: newRole === 'student' ? '1st Year' : '',
    }));
    setErrors({});
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Please enter your full name.';
    }

    if (!formData.identifier.trim()) {
      newErrors.identifier =
        role === 'student'
          ? 'Please enter your student ID.'
          : 'Please enter your employee ID.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.department) {
      newErrors.department =
        role === 'student'
          ? 'Please select your department / branch.'
          : 'Please select your department.';
    }

    if (role === 'student' && !formData.year) {
      newErrors.year = 'Please select your academic year.';
    }

    if (!formData.password) {
      newErrors.password = 'Please enter your password.';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must contain at least 8 characters.';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password.';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'Please accept the Terms of Service and Privacy Policy.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError(null);

    if (!validate()) {
      return;
    }

    setSubmitting(true);

    try {
      // Find matching department ID if available
      const matchedDept = departmentsList.find(
        (d) => d.name.toLowerCase() === formData.department.toLowerCase() ||
               d.department_code?.toLowerCase() === formData.department.toLowerCase()
      );

      const payload = {
        full_name: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || undefined,
        password: formData.password,
        role: role === 'student' ? 'STUDENT' : 'DEPARTMENT_STAFF',
        department_id: matchedDept?.id,
        ...(role === 'student'
          ? {
              student_id: formData.identifier.trim(),
              course: 'B.Tech',
              branch: formData.department,
              year: parseInt(formData.year) || 1,
            }
          : {
              employee_id: formData.identifier.trim(),
              designation: 'Department Staff',
            }),
      };

      await register(payload);
      setSubmitting(false);
      setIsSuccess(true);
      showToast('Account created successfully.', 'success');
    } catch (err) {
      setSubmitting(false);
      if (err?.status === 409) {
        setApiError(err?.message || 'An account with this email or ID already exists.');
      } else if (err?.isNetworkError) {
        setApiError('Unable to connect to Smart Campus server. Please try again.');
      } else {
        setApiError(err?.message || 'Failed to create account. Please check your information.');
      }
    }
  };

  if (isSuccess) {
    return (
      <div className="w-full lg:w-[55%] min-h-screen bg-[#07121A] flex flex-col justify-center items-center p-6 sm:p-10 lg:p-12">
        <SuccessCard userName={formData.fullName} role={role} />
      </div>
    );
  }

  return (
    <div className="w-full lg:w-[55%] min-h-screen bg-[#07121A] flex flex-col justify-between p-6 sm:p-10 lg:p-12 overflow-y-auto">
      
      {/* Mobile Banner */}
      <div className="lg:hidden mb-6 rounded-2xl overflow-hidden relative border border-white/10 shadow-lg max-h-32">
        <img
          src={campusHeroImage}
          alt="Smart Campus visual"
          className="w-full h-32 object-cover filter brightness-[0.7]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07121A] via-[#07121A]/60 to-transparent" />
        <div className="absolute bottom-3 left-4">
          <span className="text-xs font-bold uppercase tracking-wider text-[#D4A84F]">
            Smart Campus Registration
          </span>
          <p className="text-[11px] text-[#F5F5F0]/90 font-medium">
            Join the digital campus community
          </p>
        </div>
      </div>

      <div className="max-w-xl w-full mx-auto space-y-6">
        
        {/* Header & Logo */}
        <div>
          <div className="mb-6">
            <UniversityLogo variant="auth" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#F5F5F0] tracking-tight">

            Create Your Account
          </h2>
          <p className="text-sm text-[#A8B3B0] mt-1.5">
            Join the Smart Campus complaint management platform.
          </p>
        </div>

        {/* Account Type Selector (Student vs Staff) */}
        <RegisterRoleSelector
          selectedRole={role}
          onSelectRole={handleRoleChange}
        />

        {/* Staff Verification Notice */}
        {role === 'staff' && (
          <div className="p-3.5 rounded-xl bg-[#315C3A]/15 border border-[#315C3A]/50 flex items-start gap-2.5 text-xs text-[#F5F5F0]">
            <Info className="w-4 h-4 text-[#D4A84F] shrink-0 mt-0.5" />
            <span>Staff accounts may require administrator verification.</span>
          </div>
        )}

        {/* API Error Alert */}
        {apiError && (
          <div className="p-4 rounded-xl bg-red-950/40 border border-red-800/60 text-[#F5F5F0] flex items-center gap-3 animate-fadeIn shadow-lg">
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
            <div className="text-xs">
              <span className="font-bold text-red-300 block">Registration Notice</span>
              <span className="text-[#F5F5F0]/85">{apiError}</span>
            </div>
          </div>
        )}

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Row 1: Full Name & Identifier */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormInput
              label="Full Name"
              name="fullName"
              value={formData.fullName}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
              placeholder="Enter your full name"
              icon={User}
              error={errors.fullName}
            />

            <FormInput
              label={role === 'student' ? 'Student ID' : 'Employee ID'}
              name="identifier"
              value={formData.identifier}
              onChange={(e) => handleInputChange('identifier', e.target.value)}
              placeholder={role === 'student' ? 'e.g. 2024CSB1042' : 'e.g. EMP-4091'}
              icon={Hash}
              error={errors.identifier}
            />
          </div>

          {/* Row 2: Email & Phone Number */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormInput
              label={role === 'student' ? 'College Email' : 'Official Email'}
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder={role === 'student' ? 'student@college.edu' : 'staff@college.edu'}
              icon={Mail}
              error={errors.email}
            />

            <FormInput
              label="Phone Number"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              placeholder="Enter your phone number"
              icon={Phone}
              required={false}
              helperText="(Optional)"
            />
          </div>

          {/* Row 3: Department and Year Dropdowns */}
          <DepartmentSelect
            role={role}
            department={formData.department}
            onDepartmentChange={(val) => handleInputChange('department', val)}
            year={formData.year}
            onYearChange={(val) => handleInputChange('year', val)}
            departmentError={errors.department}
            yearError={errors.year}
          />

          {/* Row 4: Password & Confirm Password */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Password */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#A8B3B0] mb-1.5">
                Password <span className="text-[#D4A84F]">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#71844A]">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  placeholder="Create password"
                  className={`w-full bg-[#050A0C] border ${
                    errors.password
                      ? 'border-red-500/80 focus:border-red-500 focus:ring-1 focus:ring-red-500/30'
                      : 'border-white/10 focus:border-[#D4A84F] focus:ring-1 focus:ring-[#D4A84F]/30'
                  } rounded-xl pl-10 pr-11 py-2.5 text-sm text-[#F5F5F0] placeholder-[#A8B3B0]/40 outline-none transition-all`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#A8B3B0] hover:text-[#F5F5F0] transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 shrink-0" />
                  <span>{errors.password}</span>
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#A8B3B0] mb-1.5">
                Confirm Password <span className="text-[#D4A84F]">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#71844A]">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  placeholder="Repeat password"
                  className={`w-full bg-[#050A0C] border ${
                    errors.confirmPassword
                      ? 'border-red-500/80 focus:border-red-500 focus:ring-1 focus:ring-red-500/30'
                      : 'border-white/10 focus:border-[#D4A84F] focus:ring-1 focus:ring-[#D4A84F]/30'
                  } rounded-xl pl-10 pr-11 py-2.5 text-sm text-[#F5F5F0] placeholder-[#A8B3B0]/40 outline-none transition-all`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label="Toggle confirm password visibility"
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#A8B3B0] hover:text-[#F5F5F0] transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 shrink-0" />
                  <span>{errors.confirmPassword}</span>
                </p>
              )}
            </div>

          </div>

          {/* Password Strength Indicator */}
          <PasswordStrength password={formData.password} />

          {/* Terms Checkbox */}
          <div className="pt-2">
            <label className="flex items-start gap-2.5 cursor-pointer text-xs text-[#A8B3B0] select-none">
              <input
                type="checkbox"
                checked={formData.agreeTerms}
                onChange={(e) => handleInputChange('agreeTerms', e.target.checked)}
                className="w-4 h-4 mt-0.5 rounded bg-[#050A0C] border-white/20 text-[#D4A84F] focus:ring-0 focus:ring-offset-0 focus:outline-none accent-[#D4A84F]"
              />
              <span>
                I agree to the{' '}
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setTermsModalOpen(true);
                  }}
                  className="text-[#D4A84F] hover:underline font-medium"
                >
                  Terms of Service
                </button>{' '}
                and{' '}
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setTermsModalOpen(true);
                  }}
                  className="text-[#D4A84F] hover:underline font-medium"
                >
                  Privacy Policy
                </button>
                .
              </span>
            </label>
            {errors.agreeTerms && (
              <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                <AlertCircle className="w-3 h-3 shrink-0" />
                <span>{errors.agreeTerms}</span>
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-3">
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 px-6 rounded-xl font-bold text-sm bg-[#D4A84F] text-[#07121A] hover:bg-[#E5BF6E] hover:shadow-lg hover:shadow-[#D4A84F]/25 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-2 shadow-md shadow-black/40 disabled:opacity-75 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-[#07121A]" />
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </>
              )}
            </button>
          </div>

        </form>

        {/* Login Link Footer */}
        <div className="text-center pt-2 text-xs text-[#A8B3B0]">
          <span>Already have an account? </span>
          <Link
            to="/login"
            className="font-bold text-[#D4A84F] hover:text-[#E5BF6E] underline underline-offset-4 transition-colors"
          >
            Sign In
          </Link>
        </div>

      </div>

      {/* Minimal Footer */}
      <div className="text-center pt-8 text-[11px] text-[#A8B3B0]/50">
        &copy; {new Date().getFullYear()} Smart Campus Complaint & Analytics System.
      </div>

      {/* Simple Terms & Privacy Dialog */}
      {termsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#0D1B22] border border-[#315C3A] rounded-2xl max-w-md w-full p-6 space-y-4">
            <h4 className="text-lg font-bold text-[#F5F5F0]">Terms of Service & Privacy</h4>
            <p className="text-xs text-[#A8B3B0] leading-relaxed">
              Smart Campus protects student and staff grievance reports with institutional encryption. All submitted data is solely utilized for resolution tracking, departmental SLA enforcement, and campus analytics.
            </p>
            <div className="text-right">
              <button
                type="button"
                onClick={() => setTermsModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#315C3A] text-[#F5F5F0]"
              >
                Understood
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
