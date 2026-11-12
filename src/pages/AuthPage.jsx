import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Lock,
  Mail,
  User,
  GraduationCap,
  Building,
  Briefcase,
  Check,
  X,
  ArrowRight,
  UserPlus,
  Layers,
  Key,
  Eye,
  EyeOff,
  Globe
} from 'lucide-react';

export default function AuthPage() {
  const {
    loginUser,
    registerUser,
    loginWithGoogle,
    showToast
  } = useApp();

  // First is Sign In, second is Sign Up
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'signup'
  const [role, setRole] = useState('student'); // 'student' | 'client'

  // Show / Hide password toggles
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showRegPassword, setShowRegPassword] = useState(false);

  // Sign In inputs
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Sign Up inputs
  const [name, setName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Student specific inputs
  const [university, setUniversity] = useState('Faculty of Science and IT (FSIT)');
  const [department, setDepartment] = useState('Dept. of Software Engineering');
  const [studentId, setStudentId] = useState('SE-2024-8841');
  const [skills, setSkills] = useState('React, UI Design, WordPress, Figma');

  // Client specific inputs
  const [company, setCompany] = useState('');
  const [industry, setIndustry] = useState('Technology & Digital Media');

  // Strong Password validation criteria
  const hasMinLength = regPassword.length >= 8;
  const hasUpper = /[A-Z]/.test(regPassword);
  const hasLower = /[a-z]/.test(regPassword);
  const hasNumber = /[0-9]/.test(regPassword);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(regPassword);

  const criteriaCount = [hasMinLength, hasUpper, hasLower, hasNumber, hasSpecial].filter(Boolean).length;
  const isPasswordStrong = hasMinLength && hasUpper && hasLower && hasNumber && hasSpecial;

  const getStrengthLabel = () => {
    if (regPassword.length === 0) return { label: 'Empty', color: 'bg-slate-200', text: 'text-slate-400' };
    if (criteriaCount <= 2) return { label: 'Weak', color: 'bg-rose-500', text: 'text-rose-600' };
    if (criteriaCount <= 4) return { label: 'Medium', color: 'bg-amber-500', text: 'text-amber-600' };
    return { label: 'Strong', color: 'bg-emerald-500', text: 'text-emerald-600' };
  };

  const strength = getStrengthLabel();

  // Handle Sign In Submit
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!loginEmail.trim() || !loginPassword.trim()) {
      showToast('Please enter both email and password.', 'error');
      return;
    }
    loginUser(loginEmail, loginPassword);
  };

  // Handle Sign Up Submit
  const handleSignUpSubmit = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      showToast('Please enter your full name.', 'error');
      return;
    }

    if (!regEmail.trim()) {
      showToast(role === 'student' ? 'Please enter your student email.' : 'Please enter your business email.', 'error');
      return;
    }

    if (role === 'client' && !company.trim()) {
      showToast('Please enter your Company / Organization name.', 'error');
      return;
    }

    if (!isPasswordStrong) {
      showToast('Password is too weak. It must be at least 8 characters with uppercase, lowercase, number, and symbol.', 'error');
      return;
    }

    if (regPassword !== confirmPassword) {
      showToast('Passwords do not match. Please verify your password.', 'error');
      return;
    }

    const skillsArray = skills.split(',').map(s => s.trim()).filter(Boolean);

    const newUser = registerUser({
      name,
      email: regEmail,
      password: regPassword,
      role,
      university: role === 'student' ? university : undefined,
      department: role === 'student' ? department : undefined,
      studentId: role === 'student' ? studentId : undefined,
      skills: role === 'student' ? skillsArray : [],
      company: role === 'client' ? company : undefined,
      industry: role === 'client' ? industry : undefined,
      hourlyRate: 20,
      experienceLevel: 'Entry Level',
      availability: 'Part-Time',
    });

    if (newUser) {
      // Pre-fill email for sign in and switch to sign in view
      setLoginEmail(regEmail);
      setLoginPassword(regPassword);
      setAuthMode('login');
      showToast('Account registered successfully! Now click Sign In to continue.', 'success');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 flex flex-col justify-center py-10 px-4 sm:px-6 lg:px-8">
      {/* Brand Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-6">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-blue-700 text-white shadow-xl shadow-blue-500/20 mb-3">
          <Layers className="w-7 h-7" />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Prilans
        </h1>
        <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mt-1">
          Student Talent & Freelance Marketplace
        </p>
        <p className="text-sm text-slate-500 mt-2">
          {authMode === 'login'
            ? 'Sign in to access your projects, proposals, and dashboard'
            : 'Create your account to start hiring or offering services'}
        </p>
      </div>

      {/* Main Authentication Card */}
      <div className="sm:mx-auto sm:w-full sm:max-w-lg">
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xl p-6 sm:p-8">
          {/* Top Segmented Controls: Left = Sign In, Right = Sign Up */}
          <div className="grid grid-cols-2 p-1.5 bg-slate-100/90 rounded-2xl mb-6">
            <button
              type="button"
              onClick={() => setAuthMode('login')}
              className={`py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                authMode === 'login'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setAuthMode('signup')}
              className={`py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                authMode === 'signup'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Google Sign In / Sign Up Option */}
          <button
            type="button"
            onClick={() => loginWithGoogle(role)}
            className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-slate-200 hover:border-slate-300 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all shadow-xs cursor-pointer mb-5"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>{authMode === 'login' ? 'Sign in with Google' : 'Sign up with Google'}</span>
          </button>

          <div className="relative mb-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white px-3 text-slate-400 font-medium">
                Or continue with email
              </span>
            </div>
          </div>

          {/* ======================================================== */}
          {/* TAB 1: SIGN IN FORM                                      */}
          {/* ======================================================== */}
          {authMode === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="e.g. yourname@mail.com"
                    className="w-full pl-10 pr-4 py-2.5 text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Password *
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type={showLoginPassword ? 'text' : 'password'}
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-10 py-2.5 text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded text-blue-600 focus:ring-blue-500" />
                  <span>Remember me</span>
                </label>
                <button
                  type="button"
                  onClick={() => showToast('Password reset link has been dispatched to your email.', 'info')}
                  className="text-blue-600 font-semibold hover:underline cursor-pointer"
                >
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer mt-5"
              >
                <span>Sign In to Prilans</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-xs text-center text-slate-500 mt-4">
                Don't have an account yet?{' '}
                <button
                  type="button"
                  onClick={() => setAuthMode('signup')}
                  className="text-blue-600 font-bold hover:underline cursor-pointer"
                >
                  Sign Up here
                </button>
              </p>
            </form>
          )}

          {/* ======================================================== */}
          {/* TAB 2: SIGN UP FORM                                      */}
          {/* ======================================================== */}
          {authMode === 'signup' && (
            <form onSubmit={handleSignUpSubmit} className="space-y-4">
              {/* Account Role Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Select Account Type *
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setRole('student')}
                    className={`p-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      role === 'student'
                        ? 'border-blue-600 bg-blue-50/80 text-blue-700 shadow-xs ring-1 ring-blue-500'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <GraduationCap className="w-4 h-4 text-blue-600" />
                    <span>University Student</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('client')}
                    className={`p-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      role === 'client'
                        ? 'border-blue-600 bg-blue-50/80 text-blue-700 shadow-xs ring-1 ring-blue-500'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Building className="w-4 h-4 text-indigo-600" />
                    <span>Client / Employer</span>
                  </button>
                </div>
              </div>

              {/* Full Name & Role-Specific Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Shakib Ahmed"
                      className="w-full pl-9 pr-3 py-2 text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    {role === 'student' ? 'Student Email *' : 'Work / Company Email *'}
                  </label>
                  <div className="relative">
                    <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="email"
                      required
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      placeholder={
                        role === 'student'
                          ? 'e.g. shakib@student.edu'
                          : 'e.g. contact@business.com'
                      }
                      className="w-full pl-9 pr-3 py-2 text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* ROLE SPECIFIC FIELDS */}
              {role === 'student' ? (
                /* Student Academic Info & Skills */
                <div className="space-y-3 p-3.5 bg-blue-50/50 rounded-2xl border border-blue-100">
                  <div className="text-[11px] font-bold text-blue-700 uppercase tracking-wider flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5" />
                    <span>University Student Verification</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-slate-600 mb-1">
                        University
                      </label>
                      <input
                        type="text"
                        value={university}
                        onChange={(e) => setUniversity(e.target.value)}
                        className="w-full px-2.5 py-1.5 text-xs font-medium bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase text-slate-600 mb-1">
                        Department
                      </label>
                      <input
                        type="text"
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        className="w-full px-2.5 py-1.5 text-xs font-medium bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase text-slate-600 mb-1">
                        Student ID
                      </label>
                      <input
                        type="text"
                        value={studentId}
                        onChange={(e) => setStudentId(e.target.value)}
                        className="w-full px-2.5 py-1.5 text-xs font-medium bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase text-slate-600 mb-1">
                      Key Skills (Comma-separated)
                    </label>
                    <input
                      type="text"
                      value={skills}
                      onChange={(e) => setSkills(e.target.value)}
                      placeholder="React, Figma, Python, UI Design..."
                      className="w-full px-3 py-1.5 text-xs font-medium bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>
              ) : (
                /* Client / Company Info */
                <div className="space-y-3 p-3.5 bg-indigo-50/50 rounded-2xl border border-indigo-100">
                  <div className="text-[11px] font-bold text-indigo-700 uppercase tracking-wider flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5" />
                    <span>Company & Organization Details</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-slate-600 mb-1">
                        Company Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="e.g. Apex Tech Ventures"
                        className="w-full px-3 py-2 text-xs font-medium bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase text-slate-600 mb-1">
                        Industry / Sector
                      </label>
                      <input
                        type="text"
                        value={industry}
                        onChange={(e) => setIndustry(e.target.value)}
                        placeholder="e.g. Software, E-Commerce, Design"
                        className="w-full px-3 py-2 text-xs font-medium bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Password & Confirm Password */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                      Password *
                    </label>
                    <span className={`text-[10px] font-extrabold ${strength.text}`}>
                      {regPassword.length > 0 && `(${strength.label})`}
                    </span>
                  </div>
                  <div className="relative">
                    <Lock className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type={showRegPassword ? 'text' : 'password'}
                      required
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      placeholder="Min 8 chars, A-Z, 0-9, symbol"
                      className="w-full pl-8 pr-8 py-2 text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowRegPassword(!showRegPassword)}
                      className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      {showRegPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Confirm Password *
                  </label>
                  <div className="relative">
                    <Key className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type={showRegPassword ? 'text' : 'password'}
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Re-enter exact password"
                      className="w-full pl-8 pr-3 py-2 text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Password Strength Checklist */}
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 space-y-2">
                <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${strength.color}`}
                    style={{ width: `${(criteriaCount / 5) * 100}%` }}
                  />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-1 gap-x-2 text-[10px]">
                  <span className={`flex items-center gap-1 ${hasMinLength ? 'text-emerald-600 font-bold' : 'text-slate-400'}`}>
                    {hasMinLength ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />} 8+ Characters
                  </span>
                  <span className={`flex items-center gap-1 ${hasUpper ? 'text-emerald-600 font-bold' : 'text-slate-400'}`}>
                    {hasUpper ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />} Uppercase (A-Z)
                  </span>
                  <span className={`flex items-center gap-1 ${hasLower ? 'text-emerald-600 font-bold' : 'text-slate-400'}`}>
                    {hasLower ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />} Lowercase (a-z)
                  </span>
                  <span className={`flex items-center gap-1 ${hasNumber ? 'text-emerald-600 font-bold' : 'text-slate-400'}`}>
                    {hasNumber ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />} Number (0-9)
                  </span>
                  <span className={`flex items-center gap-1 ${hasSpecial ? 'text-emerald-600 font-bold' : 'text-slate-400'}`}>
                    {hasSpecial ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />} Special Symbol
                  </span>
                </div>
              </div>

              <button
                type="submit"
                disabled={!isPasswordStrong}
                className={`w-full py-3 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 mt-4 cursor-pointer ${
                  isPasswordStrong
                    ? 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 shadow-blue-500/20'
                    : 'bg-slate-300 cursor-not-allowed opacity-70 shadow-none'
                }`}
              >
                <UserPlus className="w-4 h-4" />
                <span>Create Account & Continue</span>
              </button>

              <p className="text-xs text-center text-slate-500 mt-3">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setAuthMode('login')}
                  className="text-blue-600 font-bold hover:underline cursor-pointer"
                >
                  Sign In here
                </button>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
