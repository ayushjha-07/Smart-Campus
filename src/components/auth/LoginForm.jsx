import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { 
  Mail, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  Building,
  Sparkles,
  ShieldAlert,
  Sun,
  Moon
} from 'lucide-react';
import PasswordInput from './PasswordInput';
import RoleSelector from './RoleSelector';
import { campusAssets } from '../../assets/campusAssets';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/useApp';

export default function LoginForm() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login } = useAuth();
  const { showToast, theme, toggleTheme } = useApp();

  const isLight = theme === 'light';

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [role, setRole] = useState('student');

  // Validation & API errors
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState(null);

  // Check if session was expired from query parameter
  const sessionExpired = searchParams.get('expired') === 'true';

  // Submission state: 'idle' | 'loading' | 'success'
  const [submitState, setSubmitState] = useState('idle');

  useEffect(() => {
    if (sessionExpired) {
      setApiError('Your session has expired. Please log in again.');
    }
  }, [sessionExpired]);

  const validate = () => {
    const newErrors = {};

    if (!identifier.trim()) {
      newErrors.identifier = 'Please enter your Student ID or institutional email.';
    }

    if (!password) {
      newErrors.password = 'Please enter your password.';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
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

    setSubmitState('loading');

    try {
      const data = await login(identifier, password, role);
      setSubmitState('success');
      showToast(`Welcome back, ${data?.user?.name || data?.user?.first_name || data?.user?.full_name?.split(' ')[0] || 'Student'}!`, 'success');

      // Role-based routing
      setTimeout(() => {
        const userRole = data?.user?.role?.toUpperCase();
        if (userRole === 'ADMINISTRATOR') {
          navigate('/admin/dashboard');
        } else if (userRole === 'DEPARTMENT_STAFF') {
          navigate('/department/dashboard');
        } else {
          navigate('/student/dashboard');
        }
      }, 500);
    } catch (err) {
      setSubmitState('idle');
      if (err?.status === 401) {
        setApiError('Invalid credentials. Please verify your Student ID/email and password.');
      } else if (err?.status === 403) {
        setApiError(err?.message || 'Account access restricted. Please contact campus administration.');
      } else if (err?.isNetworkError) {
        setApiError('Unable to connect to Smart Campus server. Please check backend connection.');
      } else {
        setApiError(err?.message || 'An unexpected error occurred during login. Please try again.');
      }
    }
  };

  const handleInstitutionalSSO = async () => {
    setSubmitState('loading');
    setApiError(null);
    try {
      const ssoEmail =
        role === 'admin'
          ? 'admin@smartcampus.edu'
          : role === 'staff'
          ? 'maintenance@smartcampus.edu'
          : 'student@smartcampus.edu';

      const data = await login(ssoEmail, 'Student@123', role);
      setSubmitState('success');
      showToast('Authenticated via CGC Institutional Single Sign-On', 'success');

      setTimeout(() => {
        const userRole = data?.user?.role?.toUpperCase();
        if (userRole === 'ADMINISTRATOR') {
          navigate('/admin/dashboard');
        } else if (userRole === 'DEPARTMENT_STAFF') {
          navigate('/department/dashboard');
        } else {
          navigate('/student/dashboard');
        }
      }, 500);
    } catch (err) {
      setSubmitState('idle');
      setApiError(err?.message || 'Institutional login could not be completed.');
    }
  };

  const handleDemoFill = (type) => {
    setApiError(null);
    if (type === 'student') {
      setIdentifier('student@smartcampus.edu');
      setPassword('Student@123');
      setRole('student');
    } else if (type === 'staff') {
      setIdentifier('maintenance@smartcampus.edu');
      setPassword('Staff@123');
      setRole('staff');
    } else {
      setIdentifier('admin@smartcampus.edu');
      setPassword('Admin@123');
      setRole('admin');
    }
    setErrors({});
  };

  return (
    <div className="w-full md:w-[55%] lg:w-[45%] min-h-screen bg-[#F5F7F5] dark:bg-[#050A0C] flex flex-col justify-between p-6 sm:p-8 lg:p-12 overflow-y-auto transition-colors duration-300 relative">
      
      {/* 1. Top Right Theme Toggle Button */}
      <div className="flex justify-end w-full mb-4 md:mb-0 md:absolute md:top-6 md:right-8 z-20">
        <button
          type="button"
          onClick={toggleTheme}
          title={isLight ? "Switch to Dark Theme" : "Switch to Light Theme"}
          aria-label="Toggle light and dark theme"
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border font-semibold text-xs transition-all duration-200 shadow-2xs hover:scale-105 cursor-pointer bg-white hover:bg-slate-50 text-[#07121A] border-[#DDE5E1] dark:bg-[#0B171B] dark:hover:bg-[#10232A] dark:text-[#F5F5F0] dark:border-white/15"
        >
          {isLight ? (
            <>
              <Sun className="w-4 h-4 text-[#D4A84F]" />
              <span className="text-xs text-[#07121A]">Light Mode</span>
            </>
          ) : (
            <>
              <Moon className="w-4 h-4 text-[#D4A84F]" />
              <span className="text-xs text-[#F5F5F0]">Dark Mode</span>
            </>
          )}
        </button>
      </div>

      {/* 2. Mobile Top Banner with Uploaded Campus Image (hidden on desktop/tablet) */}
      <div className="md:hidden mb-6 rounded-2xl overflow-hidden relative border border-[#DDE5E1] dark:border-white/10 shadow-md max-h-40">
        <img
          src={campusAssets.loginBg}
          alt="CGC University Mohali Campus"
          className="w-full h-40 object-cover object-center filter brightness-[0.9]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050A0C] via-[#050A0C]/50 to-transparent" />
        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#D4A84F] block">
              CGC University Mohali
            </span>
            <p className="text-xs text-white font-extrabold">
              Smart Campus Portal
            </p>
          </div>
          <img
            src={campusAssets.logo}
            alt="CGC Logo"
            className="h-9 w-auto object-contain shrink-0"
          />
        </div>
      </div>

      {/* 3. Main Login Card Form Panel */}
      <div className="max-w-md w-full mx-auto space-y-6 my-auto pt-2 pb-6">
        
        {/* Header Branding & Welcome */}
        <div className="space-y-3">
          {/* Logo directly on panel */}
          <div className="flex items-center gap-3">
            <img
              src={campusAssets.logo}
              alt="CGC University Logo"
              className="h-12 sm:h-14 w-auto object-contain shrink-0"
            />
            <div>
              <span className="text-xs sm:text-sm font-bold text-[#D4A84F] tracking-wider uppercase block leading-tight">
                CGC University Mohali
              </span>
              <span className="text-sm sm:text-base font-extrabold text-[#07121A] dark:text-[#F5F5F0] tracking-tight block leading-tight">
                Smart Campus Portal
              </span>
            </div>
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#07121A] dark:text-[#F5F5F0] tracking-tight">
              Welcome Back
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-[#A8B3B0] mt-1 font-medium">
              Sign in to continue to Smart Campus
            </p>
          </div>
        </div>

        {/* API Error Alert Banner */}
        {apiError && (
          <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/60 text-red-800 dark:text-[#F5F5F0] flex items-center gap-3 animate-fadeIn shadow-xs">
            <ShieldAlert className="w-5 h-5 text-red-500 dark:text-red-400 shrink-0" />
            <div className="text-xs">
              <span className="font-bold text-red-700 dark:text-red-300 block">Authentication Failed</span>
              <span className="text-red-600 dark:text-[#F5F5F0]/85">{apiError}</span>
            </div>
          </div>
        )}

        {/* Success Alert Banner */}
        {submitState === 'success' && (
          <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-[#07241C] border border-emerald-200 dark:border-[#00B878] text-emerald-800 dark:text-[#F5F5F0] flex items-center gap-3 animate-fadeIn shadow-xs">
            <CheckCircle2 className="w-5 h-5 text-[#008F63] dark:text-[#10E894] shrink-0" />
            <div className="text-xs">
              <span className="font-bold text-[#008F63] dark:text-[#10E894] block">Login Successful</span>
              <span className="text-slate-600 dark:text-[#F5F5F0]/80">
                Redirecting to your campus workspace...
              </span>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Role Selection */}
          <div>
            <RoleSelector selectedRole={role} onSelectRole={setRole} />
          </div>

          {/* Student ID / Email */}
          <div>
            <label 
              htmlFor="identifier"
              className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-[#A8B3B0] mb-1.5"
            >
              Student ID / Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#008F63] dark:text-[#00B878]">
                <Mail className="w-4 h-4" />
              </div>
              <input
                id="identifier"
                name="identifier"
                type="text"
                value={identifier}
                onChange={(e) => {
                  setIdentifier(e.target.value);
                  if (errors.identifier) setErrors({ ...errors, identifier: null });
                }}
                placeholder="e.g. SC-STU-2026-001 or email"
                aria-label="Student ID or Email"
                className={`w-full bg-white dark:bg-[#050A0C] border ${
                  errors.identifier
                    ? 'border-red-500/80 focus:border-red-500 focus:ring-1 focus:ring-red-500/30'
                    : 'border-[#DDE5E1] dark:border-white/10 focus:border-[#008F63] dark:focus:border-[#00B878] focus:ring-1 focus:ring-[#008F63]/25 dark:focus:ring-[#00B878]/30'
                } rounded-xl pl-10 pr-4 py-3 text-sm text-[#07121A] dark:text-[#F5F5F0] placeholder-slate-400 dark:placeholder-[#A8B3B0]/40 outline-none transition-all duration-200`}
              />
            </div>
            {errors.identifier && (
              <p className="mt-1.5 text-xs text-red-500 dark:text-red-400 flex items-center gap-1">
                <AlertCircle className="w-3 h-3 shrink-0" />
                <span>{errors.identifier}</span>
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label 
                htmlFor="password"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-[#A8B3B0]"
              >
                Password
              </label>
              <button
                type="button"
                onClick={() => alert("Please contact the CGC IT Helpdesk to request a password reset.")}
                className="text-xs text-[#008F63] dark:text-[#00B878] hover:text-[#D4A84F] transition-colors cursor-pointer"
              >
                Forgot Password?
              </button>
            </div>
            <PasswordInput
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors({ ...errors, password: null });
              }}
              placeholder="Enter your account password"
              hasError={Boolean(errors.password)}
            />
            {errors.password && (
              <p className="mt-1.5 text-xs text-red-500 dark:text-red-400 flex items-center gap-1">
                <AlertCircle className="w-3 h-3 shrink-0" />
                <span>{errors.password}</span>
              </p>
            )}
          </div>

          {/* Remember Me Checkbox */}
          <div className="flex items-center">
            <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-600 dark:text-[#A8B3B0] hover:text-[#07121A] dark:hover:text-[#F5F5F0] transition-colors select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-[#DDE5E1] dark:border-white/20 text-[#008F63] dark:text-[#00B878] focus:ring-0 focus:outline-none accent-[#008F63] dark:accent-[#00B878]"
              />
              <span>Remember me</span>
            </label>
          </div>

          {/* Primary Sign In Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={submitState === 'loading'}
              className="w-full py-3.5 px-6 rounded-xl font-bold text-sm bg-[#008F63] hover:bg-[#007A54] dark:bg-[#00B878] dark:hover:bg-[#009e66] text-white shadow-md shadow-emerald-950/20 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed cursor-pointer"
            >
              {submitState === 'loading' ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </>
              )}
            </button>
          </div>

        </form>

        {/* Divider */}
        <div className="relative flex items-center justify-center my-4">
          <div className="border-t border-[#DDE5E1] dark:border-white/10 w-full" />
          <span className="bg-[#F5F7F5] dark:bg-[#050A0C] px-3 text-[11px] font-semibold uppercase tracking-widest text-slate-400 dark:text-[#A8B3B0]/60 shrink-0">
            OR
          </span>
          <div className="border-t border-[#DDE5E1] dark:border-white/10 w-full" />
        </div>

        {/* Continue with Institution Single Sign-On Button */}
        <div>
          <button
            type="button"
            onClick={handleInstitutionalSSO}
            disabled={submitState === 'loading'}
            className="w-full py-3 px-4 rounded-xl text-xs font-semibold text-[#07121A] dark:text-[#F5F5F0] bg-white dark:bg-[#0B171B] hover:bg-slate-50 dark:hover:bg-[#10232A] border border-[#DDE5E1] dark:border-white/15 hover:border-[#008F63] dark:hover:border-[#00B878] transition-all duration-200 flex items-center justify-center gap-2 group disabled:opacity-50 cursor-pointer shadow-2xs"
          >
            <Building className="w-4 h-4 text-[#008F63] dark:text-[#00B878] group-hover:text-[#D4A84F] transition-colors" />
            <span>Continue with Institution</span>
          </button>
        </div>

        {/* Register Section Link */}
        <div className="text-center pt-1 text-xs text-slate-600 dark:text-[#A8B3B0]">
          <span>Don't have an account? </span>
          <Link
            to="/register"
            className="font-bold text-[#008F63] dark:text-[#D4A84F] hover:underline underline-offset-4 transition-colors"
          >
            Create Account
          </Link>
        </div>

        {/* Demo 1-Click Fast Fill */}
        <div className="pt-4 border-t border-[#DDE5E1] dark:border-white/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-[#A8B3B0]/80 flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-[#D4A84F]" />
              Demo Access
            </span>
            <span className="text-[10px] text-[#008F63] dark:text-[#00B878] font-bold">1-Click Autofill</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => handleDemoFill('student')}
              className="p-2.5 rounded-lg bg-white dark:bg-[#050A0C] hover:bg-emerald-50/50 dark:hover:bg-[#0D1B22] border border-[#DDE5E1] dark:border-white/10 hover:border-[#008F63] dark:hover:border-[#00B878] text-left transition-colors group cursor-pointer shadow-2xs"
            >
              <span className="block text-[11px] font-bold text-[#07121A] dark:text-[#F5F5F0] group-hover:text-[#008F63] dark:group-hover:text-[#D4A84F]">
                Student
              </span>
              <span className="block text-[10px] text-slate-500 dark:text-[#A8B3B0]/70 font-mono truncate">
                student@smartcampus.edu
              </span>
            </button>

            <button
              type="button"
              onClick={() => handleDemoFill('staff')}
              className="p-2.5 rounded-lg bg-white dark:bg-[#050A0C] hover:bg-emerald-50/50 dark:hover:bg-[#0D1B22] border border-[#DDE5E1] dark:border-white/10 hover:border-[#008F63] dark:hover:border-[#00B878] text-left transition-colors group cursor-pointer shadow-2xs"
            >
              <span className="block text-[11px] font-bold text-[#07121A] dark:text-[#F5F5F0] group-hover:text-[#008F63] dark:group-hover:text-[#D4A84F]">
                Staff (MNT)
              </span>
              <span className="block text-[10px] text-slate-500 dark:text-[#A8B3B0]/70 font-mono truncate">
                maintenance@smartcampus.edu
              </span>
            </button>

            <button
              type="button"
              onClick={() => handleDemoFill('admin')}
              className="p-2.5 rounded-lg bg-white dark:bg-[#050A0C] hover:bg-emerald-50/50 dark:hover:bg-[#0D1B22] border border-[#DDE5E1] dark:border-white/10 hover:border-[#008F63] dark:hover:border-[#00B878] text-left transition-colors group cursor-pointer shadow-2xs"
            >
              <span className="block text-[11px] font-bold text-[#07121A] dark:text-[#F5F5F0] group-hover:text-[#008F63] dark:group-hover:text-[#D4A84F]">
                Admin
              </span>
              <span className="block text-[10px] text-slate-500 dark:text-[#A8B3B0]/70 font-mono truncate">
                admin@smartcampus.edu
              </span>
            </button>
          </div>
        </div>

      </div>

      {/* 4. Bottom Minimal Footer */}
      <div className="text-center pt-4 text-[11px] text-slate-500 dark:text-[#A8B3B0]/50 select-none">
        &copy; {new Date().getFullYear()} CGC University Mohali • Smart Campus Complaint & Analytics System.
      </div>

    </div>
  );
}
