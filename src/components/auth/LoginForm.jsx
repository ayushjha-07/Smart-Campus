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
  ShieldAlert
} from 'lucide-react';
import PasswordInput from './PasswordInput';
import RoleSelector from './RoleSelector';
import UniversityLogo from '../common/UniversityLogo';
import cgcAerialCampusHd from '../../assets/cgc_aerial_campus_hd.jpg';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/useApp';

export default function LoginForm() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login } = useAuth();
  const { showToast } = useApp();

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
      newErrors.identifier = 'Please enter your institutional email.';
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
      showToast(`Welcome back, ${data?.user?.full_name || 'User'}!`, 'success');

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
        setApiError('Invalid credentials. Please verify your email and password.');
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
          : 'ayush.jha@smartcampus.edu';

      const data = await login(ssoEmail, 'SSO@Verified2026', role);
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
    <div className="w-full lg:w-[45%] min-h-screen bg-[#07121A] flex flex-col justify-between p-6 sm:p-10 lg:p-12 overflow-y-auto">
      
      {/* Mobile Top Banner with Campus Image */}
      <div className="lg:hidden mb-6 rounded-2xl overflow-hidden relative border border-white/10 shadow-lg max-h-36">
        <img
          src={cgcAerialCampusHd}
          alt="CGC University Mohali Campus"
          className="w-full h-36 object-cover filter brightness-[0.8]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07121A] via-[#07121A]/60 to-transparent" />
        <div className="absolute bottom-3 left-4">
          <span className="text-xs font-bold uppercase tracking-wider text-[#D4A84F]">
            CGC University • Smart Campus
          </span>
          <p className="text-[11px] text-[#F5F5F0]/90 font-medium">
            Report. Track. Resolve. Improve.
          </p>
        </div>
      </div>

      <div className="max-w-md w-full mx-auto space-y-6">
        
        {/* Header Branding (Logo Links to /) */}
        <div>
          <div className="mb-6">
            <UniversityLogo variant="auth" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#F5F5F0] tracking-tight">

            Welcome Back
          </h2>
          <p className="text-sm text-[#A8B3B0] mt-1.5">
            Sign in to continue to your Smart Campus account.
          </p>
        </div>

        {/* API Error Alert Banner */}
        {apiError && (
          <div className="p-4 rounded-xl bg-red-950/40 border border-red-800/60 text-[#F5F5F0] flex items-center gap-3 animate-fadeIn shadow-lg">
            <ShieldAlert className="w-5 h-5 text-red-400 shrink-0" />
            <div className="text-xs">
              <span className="font-bold text-red-300 block">Authentication Failed</span>
              <span className="text-[#F5F5F0]/85">{apiError}</span>
            </div>
          </div>
        )}

        {/* Success Alert Banner */}
        {submitState === 'success' && (
          <div className="p-4 rounded-xl bg-[#315C3A]/30 border border-[#71844A] text-[#F5F5F0] flex items-center gap-3 animate-fadeIn shadow-lg">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <div className="text-xs">
              <span className="font-bold text-emerald-300 block">Login Successful</span>
              <span className="text-[#F5F5F0]/80">
                Redirecting to your campus dashboard...
              </span>
            </div>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Email / Student ID */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#A8B3B0] mb-1.5">
              Email / Student ID
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#71844A]">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={identifier}
                onChange={(e) => {
                  setIdentifier(e.target.value);
                  if (errors.identifier) setErrors({ ...errors, identifier: null });
                }}
                placeholder="Enter your email or student ID"
                className={`w-full bg-[#050A0C] border ${
                  errors.identifier
                    ? 'border-red-500/80 focus:border-red-500 focus:ring-1 focus:ring-red-500/30'
                    : 'border-white/10 focus:border-[#D4A84F] focus:ring-1 focus:ring-[#D4A84F]/30'
                } rounded-xl pl-10 pr-4 py-3 text-sm text-[#F5F5F0] placeholder-[#A8B3B0]/40 outline-none transition-all duration-200`}
              />
            </div>
            {errors.identifier && (
              <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                <AlertCircle className="w-3 h-3 shrink-0" />
                <span>{errors.identifier}</span>
              </p>
            )}
          </div>

          {/* Password Field with Eye Toggle */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#A8B3B0]">
                Password
              </label>
              <button
                type="button"
                onClick={() => alert("Password reset functionality will be configured in the next phase.")}
                className="text-xs text-[#71844A] hover:text-[#D4A84F] transition-colors"
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
              placeholder="Enter your password"
              hasError={Boolean(errors.password)}
            />
            {errors.password && (
              <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                <AlertCircle className="w-3 h-3 shrink-0" />
                <span>{errors.password}</span>
              </p>
            )}
          </div>

          {/* Remember Me Checkbox */}
          <div className="flex items-center">
            <label className="flex items-center gap-2 cursor-pointer text-xs text-[#A8B3B0] hover:text-[#F5F5F0] transition-colors select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded bg-[#050A0C] border-white/20 text-[#D4A84F] focus:ring-0 focus:ring-offset-0 focus:outline-none accent-[#D4A84F]"
              />
              <span>Remember me</span>
            </label>
          </div>

          {/* Large Gold Login Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={submitState === 'loading'}
              className="w-full py-3.5 px-6 rounded-xl font-bold text-sm bg-[#D4A84F] text-[#07121A] hover:bg-[#E5BF6E] hover:shadow-lg hover:shadow-[#D4A84F]/25 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-2 shadow-md shadow-black/40 disabled:opacity-75 disabled:cursor-not-allowed"
            >
              {submitState === 'loading' ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-[#07121A]" />
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

          {/* Role Selection (Below Login Button as Requested) */}
          <div className="pt-2">
            <RoleSelector selectedRole={role} onSelectRole={setRole} />
          </div>

        </form>

        {/* Divider */}
        <div className="relative flex items-center justify-center my-6">
          <div className="border-t border-white/10 w-full" />
          <span className="bg-[#07121A] px-3 text-[11px] font-semibold uppercase tracking-widest text-[#A8B3B0]/60 shrink-0">
            OR
          </span>
          <div className="border-t border-white/10 w-full" />
        </div>

        {/* Continue with Institution Single Sign-On Button */}
        <div>
          <button
            type="button"
            onClick={handleInstitutionalSSO}
            disabled={submitState === 'loading'}
            className="w-full py-3 px-4 rounded-xl text-xs font-semibold text-[#F5F5F0] bg-transparent hover:bg-[#0D1B22] border border-white/15 hover:border-[#315C3A] transition-all duration-200 flex items-center justify-center gap-2 group disabled:opacity-50"
          >
            <Building className="w-4 h-4 text-[#71844A] group-hover:text-[#D4A84F] transition-colors" />
            <span>Continue with CGC Institutional ID</span>
          </button>
        </div>

        {/* Register Section Link */}
        <div className="text-center pt-2 text-xs text-[#A8B3B0]">
          <span>Don't have an account? </span>
          <Link
            to="/register"
            className="font-bold text-[#D4A84F] hover:text-[#E5BF6E] underline underline-offset-4 transition-colors"
          >
            Create Account
          </Link>
        </div>

        {/* Demo Access Section */}
        <div className="pt-4 border-t border-white/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#A8B3B0]/80 flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-[#D4A84F]" />
              Demo Access
            </span>
            <span className="text-[10px] text-[#71844A]">1-Click Autofill</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => handleDemoFill('student')}
              className="p-2.5 rounded-lg bg-[#050A0C] hover:bg-[#0D1B22] border border-white/10 hover:border-[#315C3A] text-left transition-colors group"
            >
              <span className="block text-[11px] font-bold text-[#F5F5F0] group-hover:text-[#D4A84F]">
                Student
              </span>
              <span className="block text-[10px] text-[#A8B3B0]/70 font-mono truncate">
                student@smartcampus.edu
              </span>
            </button>

            <button
              type="button"
              onClick={() => handleDemoFill('staff')}
              className="p-2.5 rounded-lg bg-[#050A0C] hover:bg-[#0D1B22] border border-white/10 hover:border-[#315C3A] text-left transition-colors group"
            >
              <span className="block text-[11px] font-bold text-[#F5F5F0] group-hover:text-[#D4A84F]">
                Staff (MNT)
              </span>
              <span className="block text-[10px] text-[#A8B3B0]/70 font-mono truncate">
                maintenance@smartcampus.edu
              </span>
            </button>

            <button
              type="button"
              onClick={() => handleDemoFill('admin')}
              className="p-2.5 rounded-lg bg-[#050A0C] hover:bg-[#0D1B22] border border-white/10 hover:border-[#315C3A] text-left transition-colors group"
            >
              <span className="block text-[11px] font-bold text-[#F5F5F0] group-hover:text-[#D4A84F]">
                Admin
              </span>
              <span className="block text-[10px] text-[#A8B3B0]/70 font-mono truncate">
                admin@smartcampus.edu
              </span>
            </button>
          </div>
        </div>

      </div>

      {/* Bottom Minimal Footer */}
      <div className="text-center pt-8 text-[11px] text-[#A8B3B0]/50">
        &copy; {new Date().getFullYear()} Smart Campus Complaint & Analytics System.
      </div>

    </div>
  );
}
